//! Random command sequences with no server: after every step the plugin's
//! replies and state are compared with a small model. The client, when there
//! is one, keeps connecting to a dead port.

mod common;

use common::*;
use proptest::prelude::*;
use proptest::test_runner::{Config, TestRunner};
use std::collections::{BTreeMap, BTreeSet};

/// Payload as the JS API sends it: `data` + `dataEncoding`.
#[derive(Debug, Clone)]
struct Payload {
    data: String,
    encoding: Option<&'static str>,
}

impl Payload {
    fn json(&self) -> Value {
        let mut v = json!({ "data": self.data });
        if let Some(e) = self.encoding {
            v["dataEncoding"] = json!(e);
        }
        v
    }

    /// What the plugin must say about the payload before anything else.
    fn decode_kind(&self) -> &'static str {
        if self.encoding == Some("rawJson") {
            match serde_json::from_str::<Value>(&self.data) {
                Ok(_) => "ok",
                Err(_) => "SerializationError",
            }
        } else {
            match BASE64.decode(&self.data) {
                Ok(_) => "ok",
                Err(_) => "Base64Error",
            }
        }
    }
}

fn payload() -> impl Strategy<Value = Payload> {
    let p = |data, encoding| Payload { data, encoding };
    prop_oneof![
        any::<Vec<u8>>().prop_map(move |b| p(BASE64.encode(b), None)),
        any::<Vec<u8>>().prop_map(move |b| p(BASE64.encode(b), Some("base64"))),
        ".{0,6}".prop_map(move |s| p(s, None)),
        any::<i64>().prop_map(move |n| p(n.to_string(), Some("rawJson"))),
        ".{0,6}".prop_map(move |s| p(s, Some("rawJson"))),
    ]
}

/// Commands with no server: the client, when there is one, keeps connecting.
#[derive(Debug, Clone)]
enum Offline {
    Connect {
        channels: Vec<u8>,
        bad_header: bool,
    },
    Disconnect,
    Subscribe(u8),
    Unsubscribe(u8),
    UnsubscribeAll,
    Publish {
        ch: u8,
        payload: Payload,
        r#type: Option<i32>,
        key: Option<String>,
        removed: Option<bool>,
    },
    SubRefresh {
        r#type: Option<i32>,
        items: bool,
        untrack: bool,
    },
    Send(Payload),
    Rpc(Payload),
    Query {
        cmd: &'static str,
        ch: u8,
    },
    SetToken,
    Refresh,
    ProvideToken,
    Ping,
}

fn offline_action() -> impl Strategy<Value = Offline> {
    let ch = 0u8..3;
    prop_oneof![
        (prop::collection::vec(0u8..3, 0..3), any::<bool>()).prop_map(|(channels, bad_header)| {
            Offline::Connect {
                channels,
                bad_header,
            }
        }),
        Just(Offline::Disconnect),
        ch.clone().prop_map(Offline::Subscribe),
        ch.clone().prop_map(Offline::Unsubscribe),
        Just(Offline::UnsubscribeAll),
        (
            ch.clone(),
            payload(),
            prop::option::of(0i32..3),
            prop::option::of("k?"),
            prop::option::of(any::<bool>()),
        )
            .prop_map(|(ch, payload, r#type, key, removed)| Offline::Publish {
                ch,
                payload,
                r#type,
                key,
                removed
            }),
        (prop::option::of(0i32..3), any::<bool>(), any::<bool>()).prop_map(
            |(r#type, items, untrack)| Offline::SubRefresh {
                r#type,
                items,
                untrack
            }
        ),
        payload().prop_map(Offline::Send),
        payload().prop_map(Offline::Rpc),
        (
            prop::sample::select(vec!["history", "presence", "presence_stats"]),
            ch
        )
            .prop_map(|(cmd, ch)| Offline::Query { cmd, ch }),
        Just(Offline::SetToken),
        Just(Offline::Refresh),
        Just(Offline::ProvideToken),
        Just(Offline::Ping),
    ]
}

fn chan(n: u8) -> String {
    format!("ch{n}")
}

/// `None`: no client; `Some(channels)`: a client connecting to a dead port.
type OfflineModel = Option<BTreeSet<String>>;

/// Runs one step; returns the reply kind, or `None` when the step would wait
/// for a connection that never comes (requests while connecting).
fn offline_step(
    app: &App,
    model: &mut OfflineModel,
    url: &str,
    a: &Offline,
) -> Option<(&'static str, &'static str)> {
    let need_client = |m: &OfflineModel| if m.is_some() { "ok" } else { "NotConnected" };
    Some(match a {
        Offline::Connect {
            channels,
            bad_header,
        } => {
            let channels: Vec<String> = channels.iter().map(|&c| chan(c)).collect();
            let mut config = json!({ "url": url, "channels": channels, "useProtobuf": false });
            if *bad_header {
                config["headers"] = json!({ "bad header": "x" });
            }
            let unique: BTreeSet<String> = channels.iter().cloned().collect();
            // A bad header fails the connect and keeps the old client; a
            // repeated channel is subscribed once.
            let want = if *bad_header {
                "RequestError"
            } else {
                *model = Some(unique);
                "ok"
            };
            (want, kind(&app.connect(config)))
        }
        Offline::Disconnect => {
            *model = None;
            ("ok", kind(&app.call("disconnect", json!({}))))
        }
        Offline::Subscribe(c) => {
            let want = match model {
                None => "NotConnected",
                Some(subs) => {
                    if subs.insert(chan(*c)) {
                        "ok"
                    } else {
                        "RequestError"
                    }
                } // duplicate
            };
            let opts = json!({ "options": { "channel": chan(*c), "recoverable": true } });
            (want, kind(&app.call("add_subscription_with_options", opts)))
        }
        Offline::Unsubscribe(c) => {
            if let Some(subs) = model.as_mut() {
                subs.remove(&chan(*c));
            }
            let got = app.call("remove_subscription", json!({ "channel": chan(*c) }));
            (need_client(model), kind(&got))
        }
        Offline::UnsubscribeAll => {
            if let Some(subs) = model.as_mut() {
                subs.clear();
            }
            (
                need_client(model),
                kind(&app.call("remove_all_subscriptions", json!({}))),
            )
        }
        Offline::Publish {
            ch,
            payload,
            r#type,
            key,
            removed,
        } => {
            let map = r#type.unwrap_or(0) != 0
                || key.as_deref().is_some_and(|k| !k.is_empty())
                || removed.unwrap_or(false);
            let want = if map {
                "Unsupported"
            } else if payload.decode_kind() != "ok" {
                payload.decode_kind()
            } else if model.is_some() {
                return None;
            } else {
                "NotConnected"
            };
            let mut req = payload.json();
            req["channel"] = json!(chan(*ch));
            req["type"] = json!(r#type);
            req["key"] = json!(key);
            req["removed"] = json!(removed);
            (want, kind(&app.call("publish", json!({ "request": req }))))
        }
        Offline::SubRefresh {
            r#type,
            items,
            untrack,
        } => {
            let mut req = json!({ "channel": chan(0), "token": "t", "type": r#type });
            if *items {
                req["items"] = json!([{ "key": "k", "version": 1 }]);
            }
            if *untrack {
                req["untrackKeys"] = json!(["k"]);
            }
            let want = if r#type.unwrap_or(0) != 0 || *items || *untrack {
                "Unsupported"
            } else if model.is_some() {
                "RequestError" // no token request in progress
            } else {
                "NotConnected"
            };
            (
                want,
                kind(&app.call("sub_refresh", json!({ "request": req }))),
            )
        }
        Offline::Send(p) | Offline::Rpc(p) => {
            let want = match p.decode_kind() {
                "ok" if model.is_some() => return None,
                "ok" => "NotConnected",
                bad => bad,
            };
            let (cmd, mut req) = (
                if matches!(a, Offline::Send(_)) {
                    "send"
                } else {
                    "rpc"
                },
                p.json(),
            );
            req["method"] = json!("m");
            (want, kind(&app.call(cmd, json!({ "request": req }))))
        }
        Offline::Query { cmd, ch } => {
            if model.is_some() {
                return None;
            }
            let req = json!({ "request": { "channel": chan(*ch), "limit": 10 } });
            ("NotConnected", kind(&app.call(cmd, req)))
        }
        Offline::SetToken => (
            need_client(model),
            kind(&app.call("set_token", json!({ "token": "t" }))),
        ),
        // No token request is pending: the token is kept for the next connect.
        Offline::Refresh => {
            let got = app.call("refresh", json!({ "request": { "token": "t" } }));
            (need_client(model), kind(&got))
        }
        Offline::ProvideToken => (
            "RequestError",
            kind(&app.call("provide_token", json!({ "token": "t" }))),
        ),
        Offline::Ping => ("NotConnected", kind(&app.call("ping", json!({})))),
    })
}

#[test]
fn offline_sessions_follow_the_model() {
    let url = dead_ws();
    let mut runner = TestRunner::new(Config {
        cases: 48,
        failure_persistence: None,
        ..Config::default()
    });
    runner
        .run(&prop::collection::vec(offline_action(), 1..25), |actions| {
            let app = App::new();
            let mut model: OfflineModel = None;
            for (i, a) in actions.iter().enumerate() {
                if let Some((want, got)) = offline_step(&app, &mut model, &url, a) {
                    prop_assert_eq!(want, got, "step {} {:?}", i, a);
                }
                let state = if model.is_some() {
                    "connecting"
                } else {
                    "disconnected"
                };
                prop_assert_eq!(app.state(), state, "after step {} {:?}", i, a);
                prop_assert_eq!(app.ok("is_connected", json!({})), json!(false));
                let subs: BTreeMap<String, bool> =
                    model.iter().flatten().map(|c| (c.clone(), false)).collect();
                prop_assert_eq!(
                    app.ok("get_subscriptions", json!({})),
                    json!(subs),
                    "after step {} {:?}",
                    i,
                    a
                );
            }
            app.ok("disconnect", json!({}));
            Ok(())
        })
        .unwrap();
}
