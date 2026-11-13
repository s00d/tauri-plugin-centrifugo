//! Random command sequences from two apps against a real Centrifugo: after
//! every step replies, events, history and presence are compared with a
//! model. A failing sequence is shrunk to the shortest one and printed.

mod common;

use common::*;
use proptest::prelude::*;
use proptest::test_runner::{Config, TestRunner};
use std::collections::{BTreeMap, BTreeSet};

const CLIENTS: usize = 2;

/// Commands of client `c` against a real server.
#[derive(Debug, Clone)]
enum Online {
    Connect {
        c: usize,
        channels: BTreeSet<u8>,
        protobuf: bool,
    },
    Disconnect(usize),
    Subscribe {
        c: usize,
        ch: u8,
        recoverable: bool,
    },
    Unsubscribe {
        c: usize,
        ch: u8,
    },
    UnsubscribeAll(usize),
    Publish {
        c: usize,
        ch: u8,
        raw: bool,
    },
    History {
        c: usize,
        ch: u8,
    },
    Presence {
        c: usize,
        ch: u8,
    },
    /// Commands whose reply depends only on whether `c` is connected.
    Misc {
        c: usize,
        cmd: &'static str,
    },
}

fn connect(c: usize) -> impl Strategy<Value = Online> {
    (prop::collection::btree_set(0u8..3, 0..3), any::<bool>()).prop_map(
        move |(channels, protobuf)| Online::Connect {
            c,
            channels,
            protobuf,
        },
    )
}

fn online_action() -> impl Strategy<Value = Online> {
    let c = 0..CLIENTS;
    let ch = 0u8..3;
    prop_oneof![
        2 => (c.clone(), prop::collection::btree_set(0u8..3, 0..3), any::<bool>())
            .prop_map(|(c, channels, protobuf)| Online::Connect { c, channels, protobuf }),
        1 => c.clone().prop_map(Online::Disconnect),
        3 => (c.clone(), ch.clone(), any::<bool>())
            .prop_map(|(c, ch, recoverable)| Online::Subscribe { c, ch, recoverable }),
        1 => (c.clone(), ch.clone()).prop_map(|(c, ch)| Online::Unsubscribe { c, ch }),
        1 => c.clone().prop_map(Online::UnsubscribeAll),
        4 => (c.clone(), ch.clone(), any::<bool>()).prop_map(|(c, ch, raw)| Online::Publish { c, ch, raw }),
        2 => (c.clone(), ch.clone()).prop_map(|(c, ch)| Online::History { c, ch }),
        2 => (c.clone(), ch).prop_map(|(c, ch)| Online::Presence { c, ch }),
        2 => (
            c,
            prop::sample::select(vec![
                "ping", "set_token", "refresh", "sub_refresh", "provide_token", "rpc", "send_garbage", "map_publish", "track_refresh",
            ])
        )
            .prop_map(|(c, cmd)| Online::Misc { c, cmd }),
    ]
}

#[derive(Default)]
struct OnlineModel {
    /// Per client: `Some(subscribed channels)` when connected.
    clients: [Option<BTreeSet<String>>; CLIENTS],
    /// Every publication per channel, in order.
    published: BTreeMap<String, Vec<Value>>,
    next_id: u64,
}

impl OnlineModel {
    fn subscribers(&self, ch: &str) -> Vec<usize> {
        (0..CLIENTS)
            .filter(|&c| self.clients[c].as_ref().is_some_and(|s| s.contains(ch)))
            .collect()
    }
}

fn online_step(apps: &[App], m: &mut OnlineModel, server: &Server, case: usize, a: &Online) {
    let chan = |n: u8| format!("case{case}_{n}");
    let need = |c: usize| {
        if m.clients[c].is_some() {
            "ok"
        } else {
            "NotConnected"
        }
    };
    match *a {
        Online::Connect {
            c,
            ref channels,
            protobuf,
        } => {
            let channels: Vec<String> = channels.iter().map(|&n| chan(n)).collect();
            // Every optional field the JS API can send.
            let config = json!({
                "url": server.ws(),
                "channels": channels,
                "useProtobuf": protobuf,
                "name": "scenario",
                "version": "1.0.0",
                "readTimeout": 5000,
                "headers": { "x-test": "1" },
            });
            apps[c].connect(config).unwrap();
            let connected = apps[c].wait("connected");
            assert!(
                connected["client"].as_str().is_some_and(|s| !s.is_empty()),
                "{connected}"
            );
            for ch in &channels {
                apps[c].wait_for("subscribed", |v| v["channel"] == *ch);
            }
            m.clients[c] = Some(channels.into_iter().collect());
        }
        Online::Disconnect(c) => {
            apps[c].ok("disconnect", json!({}));
            m.clients[c] = None;
        }
        Online::Subscribe { c, ch, recoverable } => {
            let ch = chan(ch);
            // A plain subscription goes through `add_subscription`.
            let got = if recoverable {
                let opts = json!({ "options": { "channel": ch, "recoverable": true } });
                apps[c].call("add_subscription_with_options", opts)
            } else {
                apps[c].call("add_subscription", json!({ "channel": ch }))
            };
            let want = match m.clients[c].as_mut() {
                None => "NotConnected",
                Some(subs) => {
                    if subs.insert(ch.clone()) {
                        "ok"
                    } else {
                        "RequestError"
                    }
                } // duplicate
            };
            assert_eq!(kind(&got), want, "{got:?}");
            if want == "ok" {
                let sub = apps[c].wait_for("subscribed", |v| v["channel"] == ch);
                if recoverable {
                    let count = m.published.get(&ch).map_or(0, Vec::len);
                    assert_eq!(sub["streamPosition"]["offset"], json!(count), "{sub}");
                    assert!(sub["streamPosition"]["epoch"].is_string(), "{sub}");
                }
            }
        }
        Online::Unsubscribe { c, ch } => {
            let ch = chan(ch);
            let got = apps[c].call("remove_subscription", json!({ "channel": ch }));
            assert_eq!(kind(&got), need(c), "{got:?}");
            if m.clients[c].as_mut().is_some_and(|s| s.remove(&ch)) {
                apps[c].wait_for("unsubscribed", |v| v["channel"] == ch);
            }
        }
        Online::UnsubscribeAll(c) => {
            let got = apps[c].call("remove_all_subscriptions", json!({}));
            assert_eq!(kind(&got), need(c), "{got:?}");
            if let Some(subs) = m.clients[c].as_mut() {
                subs.clear();
            }
        }
        Online::Publish { c, ch, raw } => {
            let ch = chan(ch);
            m.next_id += 1;
            let value = json!({ "id": m.next_id, "from": c });
            let (data, encoding) = if raw {
                (value.to_string(), "rawJson")
            } else {
                (BASE64.encode(value.to_string()), "base64")
            };
            let req =
                json!({ "request": { "channel": ch, "data": data, "dataEncoding": encoding } });
            let got = apps[c].call("publish", req);
            assert_eq!(kind(&got), need(c), "{got:?}");
            if m.clients[c].is_none() {
                return;
            }
            let list = m.published.entry(ch.clone()).or_default();
            list.push(value.clone());
            let offset = list.len();
            for s in m.subscribers(&ch) {
                let p = apps[s].wait("publication");
                assert_eq!(
                    (&p["channel"], &p["rawJson"]),
                    (&json!(ch), &value),
                    "client {s}: {p}"
                );
                assert_eq!(
                    BASE64.decode(p["data"].as_str().unwrap()).unwrap(),
                    value.to_string().as_bytes()
                );
                assert_eq!(p["offset"], json!(offset), "{p}");
                assert_eq!(p["dataEncoding"], "base64", "{p}");
                assert_recent(&p["timestamp"]);
                assert!(
                    p["info"]["client"].as_str().is_some_and(|s| !s.is_empty()),
                    "{p}"
                );
            }
        }
        Online::History { c, ch } => {
            let ch = chan(ch);
            let got = apps[c].call(
                "history",
                json!({ "request": { "channel": ch, "limit": 100 } }),
            );
            assert_eq!(kind(&got), need(c), "{got:?}");
            if let Ok(history) = got {
                let all = m.published.get(&ch).cloned().unwrap_or_default();
                let want = &all[all.len().saturating_sub(HISTORY_SIZE)..];
                let got: Vec<Value> = history
                    .as_array()
                    .unwrap()
                    .iter()
                    .map(|p| p["rawJson"].clone())
                    .collect();
                assert_eq!(got, want);
            }
        }
        Online::Presence { c, ch } => {
            let ch = chan(ch);
            let req = json!({ "request": { "channel": ch } });
            if m.clients[c].is_none() {
                assert_eq!(kind(&apps[c].call("presence", req.clone())), "NotConnected");
                assert_eq!(kind(&apps[c].call("presence_stats", req)), "NotConnected");
                return;
            }
            // Anonymous clients share one (empty) user.
            let n = m.subscribers(&ch).len();
            let want = json!([n, usize::from(n > 0)]);
            // A left client leaves the presence a moment after its reply.
            let deadline = Instant::now() + WAIT;
            loop {
                let stats = apps[c].ok("presence_stats", req.clone());
                let clients = apps[c].ok("presence", req.clone());
                if stats == want && clients.as_array().unwrap().len() == n {
                    break;
                }
                assert!(
                    Instant::now() < deadline,
                    "presence {stats} {clients}, want {want}"
                );
                std::thread::sleep(Duration::from_millis(50));
            }
        }
        Online::Misc { c, cmd } => {
            let connected = m.clients[c].is_some();
            let (got, want) = match cmd {
                "ping" | "set_token" | "refresh" => {
                    let args = match cmd {
                        "set_token" => json!({ "token": "t" }),
                        "refresh" => json!({ "request": { "token": "t" } }),
                        _ => json!({}),
                    };
                    (apps[c].call(cmd, args), need(c))
                }
                "sub_refresh" => {
                    let req = json!({ "request": { "channel": chan(0), "token": "t" } });
                    (
                        apps[c].call(cmd, req),
                        if connected {
                            "RequestError"
                        } else {
                            "NotConnected"
                        },
                    )
                }
                "provide_token" => (apps[c].call(cmd, json!({ "token": "t" })), "RequestError"),
                // No RPC proxy on the server.
                "rpc" => {
                    let req = json!({ "request": { "method": "m", "data": BASE64.encode("{}") } });
                    (
                        apps[c].call(cmd, req),
                        if connected {
                            "CentrifugoError"
                        } else {
                            "NotConnected"
                        },
                    )
                }
                "send_garbage" => (
                    apps[c].call("send", json!({ "request": { "data": "not base64!" } })),
                    "Base64Error",
                ),
                "track_refresh" => {
                    let req = json!({ "request": { "channel": chan(0), "token": "t", "untrackKeys": ["k"] } });
                    (apps[c].call("sub_refresh", req), "Unsupported")
                }
                "map_publish" => {
                    let req = json!({ "request": { "channel": chan(0), "data": "", "key": "k" } });
                    (apps[c].call("publish", req), "Unsupported")
                }
                _ => unreachable!(),
            };
            assert_eq!(kind(&got), want, "{cmd}: {got:?}");
        }
    }
}

/// After every step: what each client reports about itself.
fn check_clients(apps: &[App], m: &OnlineModel) {
    for (c, app) in apps.iter().enumerate() {
        let subs: BTreeMap<String, bool> = m.clients[c]
            .iter()
            .flatten()
            .map(|ch| (ch.clone(), true))
            .collect();
        let connected = m.clients[c].is_some();
        assert_eq!(
            app.ok("is_connected", json!({})),
            json!(connected),
            "client {c}"
        );
        assert_eq!(
            app.state(),
            if connected {
                "connected"
            } else {
                "disconnected"
            },
            "client {c}"
        );
        assert_eq!(
            app.ok("get_subscriptions", json!({})),
            json!(subs),
            "client {c}"
        );
    }
}

#[test]
fn sessions_follow_the_model() {
    let Some(server) = start(true) else {
        return;
    };
    let case = std::cell::Cell::new(0);
    let mut runner = TestRunner::new(Config {
        cases: 24,
        failure_persistence: None,
        // Each shrink attempt of a broken run waits out event timeouts.
        max_shrink_time: 15_000,
        ..Config::default()
    });
    runner
        // Both clients connect first; later steps may drop and reconnect them.
        .run(
            &(
                connect(0),
                connect(1),
                prop::collection::vec(online_action(), 1..30),
            ),
            |(c0, c1, rest)| {
                let actions: Vec<Online> = [c0, c1].into_iter().chain(rest).collect();
                case.set(case.get() + 1);
                let apps: Vec<App> = (0..CLIENTS).map(|_| App::new()).collect();
                let mut m = OnlineModel::default();
                for (i, a) in actions.iter().enumerate() {
                    eprintln!("case {} step {i}: {a:?}", case.get());
                    online_step(&apps, &mut m, &server, case.get(), a);
                    check_clients(&apps, &m);
                }
                for app in &apps {
                    app.ok("disconnect", json!({}));
                    let stray: Vec<_> = app
                        .drain()
                        .into_iter()
                        .filter(|(n, _)| n == "publication")
                        .collect();
                    assert!(stray.is_empty(), "publications nobody expected: {stray:?}");
                }
                Ok(())
            },
        )
        .unwrap();
}
