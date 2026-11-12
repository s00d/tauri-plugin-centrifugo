//! End-to-end tests of the plugin core against a real Centrifugo server.
//!
//! Starts the `centrifugo` binary (or `$CENTRIFUGO_BIN`) with a temporary
//! config. Skipped when the binary isn't found. Written for Centrifugo v5
//! config keys (v5 is what the protocol floor of the SDK covers and what CI runs).

use base64::Engine;
use base64::engine::general_purpose::{STANDARD as BASE64, URL_SAFE_NO_PAD};
use hmac::{Hmac, KeyInit, Mac};
use serde_json::{Value, json};
use sha2::Sha256;
use std::net::TcpListener;
use std::process::{Child, Command, Stdio};
use std::time::Duration;
use tauri::Listener;
use tauri::test::{MockRuntime, mock_app};
use tauri_plugin_centrifugo::core::Centrifugo;
use tauri_plugin_centrifugo::error::Error;
use tauri_plugin_centrifugo::models::*;
use tokio::sync::mpsc;

const SECRET: &str = "plugin-test-secret";
const API_KEY: &str = "plugin-test-api-key";

struct Server {
    child: Child,
    port: u16,
    _dir: std::path::PathBuf,
}

impl Drop for Server {
    fn drop(&mut self) {
        let _ = self.child.kill();
        let _ = self.child.wait();
    }
}

impl Server {
    fn ws(&self) -> String {
        format!("ws://127.0.0.1:{}/connection/websocket", self.port)
    }
}

fn free_port() -> u16 {
    TcpListener::bind("127.0.0.1:0")
        .unwrap()
        .local_addr()
        .unwrap()
        .port()
}

/// `None` when no centrifugo binary is available.
async fn start(anonymous: bool) -> Option<Server> {
    let bin = std::env::var("CENTRIFUGO_BIN").unwrap_or_else(|_| "centrifugo".into());
    if Command::new(&bin).arg("version").output().is_err() {
        eprintln!("SKIP: centrifugo binary not found ({bin})");
        return None;
    }
    // `free_port` releases the port before centrifugo binds it, so a parallel
    // test can take the same one. Retry on a new port when our server exits
    // (bind failed) instead of talking to someone else's server.
    for _ in 0..5 {
        if let Some(server) = spawn_on_free_port(&bin, anonymous).await {
            return Some(server);
        }
    }
    panic!("centrifugo did not start");
}

async fn spawn_on_free_port(bin: &str, anonymous: bool) -> Option<Server> {
    let port = free_port();
    let dir = std::env::temp_dir().join(format!("tpc-{port}"));
    std::fs::create_dir_all(&dir).unwrap();
    let config = json!({
        "port": port,
        "address": "127.0.0.1",
        "token_hmac_secret_key": SECRET,
        "allow_anonymous_connect_without_token": anonymous,
        "allow_subscribe_for_client": true,
        "allow_subscribe_for_anonymous": true,
        "allow_publish_for_client": true,
        "allow_publish_for_anonymous": true,
        "allow_publish_for_subscriber": true,
        "allow_history_for_client": true,
        "allow_history_for_anonymous": true,
        "allow_presence_for_client": true,
        "allow_presence_for_anonymous": true,
        "history_size": 10,
        "history_ttl": "300s",
        "force_recovery": true,
        "presence": true,
        "join_leave": true,
        "http_stream": true,
        "allowed_origins": ["*"],
        // Server API (for server-side actions) and a personal server-side
        // subscription `personal:#<user>` for every connection with a user.
        "api_key": API_KEY,
        "user_subscribe_to_personal": true,
        "user_personal_channel_namespace": "personal",
        "namespaces": [{
            "name": "personal",
            "presence": true,
            "join_leave": true,
            "force_push_join_leave": true,
        }],
    });
    let cfg_path = dir.join("config.json");
    std::fs::write(&cfg_path, config.to_string()).unwrap();
    let child = Command::new(bin)
        .arg("--config")
        .arg(&cfg_path)
        .stdout(Stdio::null())
        .stderr(Stdio::null())
        .spawn()
        .expect("spawn centrifugo");
    let mut server = Server {
        child,
        port,
        _dir: dir,
    };
    for _ in 0..100 {
        if server.child.try_wait().unwrap().is_some() {
            return None; // exited: the port was taken
        }
        if tokio::net::TcpStream::connect(("127.0.0.1", port))
            .await
            .is_ok()
        {
            // A failed bind exits right away: make sure the listener is ours.
            tokio::time::sleep(Duration::from_millis(200)).await;
            return server.child.try_wait().unwrap().is_none().then_some(server);
        }
        tokio::time::sleep(Duration::from_millis(50)).await;
    }
    panic!("centrifugo did not start on port {port}");
}

/// Calls the server HTTP API (`POST /api/<method>`); returns the JSON reply.
async fn api(port: u16, method: &str, body: Value) -> Value {
    use tokio::io::{AsyncReadExt, AsyncWriteExt};
    let body = body.to_string();
    let mut stream = tokio::net::TcpStream::connect(("127.0.0.1", port))
        .await
        .unwrap();
    let request = format!(
        "POST /api/{method} HTTP/1.1\r\nHost: 127.0.0.1\r\nX-API-Key: {API_KEY}\r\n\
         Content-Type: application/json\r\nContent-Length: {}\r\nConnection: close\r\n\r\n{body}",
        body.len()
    );
    stream.write_all(request.as_bytes()).await.unwrap();
    let mut reply = String::new();
    stream.read_to_string(&mut reply).await.unwrap();
    let (head, json) = reply.split_once("\r\n\r\n").unwrap();
    assert!(head.starts_with("HTTP/1.1 200"), "{method}: {reply}");
    let json: Value = serde_json::from_str(json).unwrap();
    assert!(json.get("error").is_none(), "{method}: {json}");
    json
}

fn jwt(sub: &str) -> String {
    sign(json!({ "sub": sub, "exp": 4_000_000_000u64 }))
}

/// Token that expires in `secs` seconds; `channel` makes it a subscription token.
fn short_jwt(sub: &str, secs: u64, channel: Option<&str>) -> String {
    let exp = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap()
        .as_secs()
        + secs;
    let mut claims = json!({ "sub": sub, "exp": exp });
    if let Some(ch) = channel {
        claims["channel"] = json!(ch);
    }
    sign(claims)
}

fn sign(claims: Value) -> String {
    let header = URL_SAFE_NO_PAD.encode(br#"{"alg":"HS256","typ":"JWT"}"#);
    let claims = URL_SAFE_NO_PAD.encode(claims.to_string());
    let mut mac = Hmac::<Sha256>::new_from_slice(SECRET.as_bytes()).unwrap();
    mac.update(format!("{header}.{claims}").as_bytes());
    let sig = URL_SAFE_NO_PAD.encode(mac.finalize().into_bytes());
    format!("{header}.{claims}.{sig}")
}

/// Collects `centrifugo:*` events emitted by the core.
struct Events(mpsc::UnboundedReceiver<(String, Value)>);

impl Events {
    fn listen(app: &tauri::App<MockRuntime>, names: &[&str]) -> Self {
        let (tx, rx) = mpsc::unbounded_channel();
        for name in names {
            let (tx, name) = (tx.clone(), name.to_string());
            app.listen_any(format!("centrifugo:{name}"), move |e| {
                let _ = tx.send((
                    name.clone(),
                    serde_json::from_str(e.payload()).unwrap_or(Value::Null),
                ));
            });
        }
        Self(rx)
    }

    async fn wait(&mut self, name: &str) -> Value {
        self.wait_for(name, |_| true).await
    }

    /// The next `name` event whose payload matches `pred`.
    async fn wait_for(&mut self, name: &str, pred: impl Fn(&Value) -> bool) -> Value {
        let mut seen = Vec::new();
        let deadline = tokio::time::timeout(Duration::from_secs(10), async {
            loop {
                let (n, v) = self.0.recv().await.expect("events channel closed");
                if n == name && pred(&v) {
                    return v;
                }
                seen.push(format!("{n}: {v}"));
            }
        });
        match deadline.await {
            Ok(v) => v,
            Err(_) => panic!("no centrifugo:{name} event; got instead: {seen:#?}"),
        }
    }
}

fn start_config(url: String, channels: &[&str]) -> StartConfig {
    StartConfig {
        url,
        token: None,
        name: Some("plugin-test".into()),
        version: Some("1.0.0".into()),
        channels: channels.iter().map(|c| c.to_string()).collect(),
        use_protobuf: false,
        read_timeout: Some(5000),
        http_stream_url: None,
        headers: None,
        request_token: None,
    }
}

async fn wait_connected(core: &Centrifugo) {
    for _ in 0..200 {
        if core.is_connected().await.unwrap() {
            return;
        }
        tokio::time::sleep(Duration::from_millis(25)).await;
    }
    panic!("not connected");
}

#[tokio::test]
async fn anonymous_connect_subscribe_publish_history_presence() {
    for use_protobuf in [false, true] {
        let Some(server) = start(true).await else {
            return;
        };
        let app = mock_app();
        let mut events = Events::listen(&app, &["connected", "subscribed", "publication"]);
        let core = Centrifugo::new();

        let mut config = start_config(server.ws(), &["news"]);
        config.use_protobuf = use_protobuf;
        core.connect(app.handle().clone(), config).await.unwrap();

        // No token and no `request_token`: connects at once, never asks.
        events.wait("connected").await;
        let sub = events.wait("subscribed").await;
        assert_eq!(sub["channel"], "news");
        assert_eq!(core.get_connection_state().await.unwrap(), "connected");

        core.publish(PublishRequest {
            channel: "news".into(),
            data: BASE64.encode(br#"{"n":1}"#),
            data_encoding: None,
            r#type: None,
            key: None,
            removed: None,
        })
        .await
        .unwrap();
        let p = events.wait("publication").await;
        assert_eq!(p["channel"], "news");
        assert_eq!(p["rawJson"], json!({"n": 1}));
        assert!(p["offset"].as_u64().unwrap() >= 1);

        let history = core
            .history(HistoryRequest {
                channel: "news".into(),
                limit: Some(10),
                since: None,
                reverse: None,
            })
            .await
            .unwrap();
        assert_eq!(history.len(), 1);
        assert_eq!(history[0].raw_json, Some(json!({"n": 1})));

        let (clients, users) = core
            .presence_stats(PresenceStatsRequest {
                channel: "news".into(),
            })
            .await
            .unwrap();
        assert_eq!((clients, users), (1, 1));
        assert_eq!(
            core.presence(PresenceRequest {
                channel: "news".into()
            })
            .await
            .unwrap()
            .len(),
            1
        );
        assert_eq!(
            core.get_subscriptions().await.unwrap().get("news"),
            Some(&true)
        );

        core.ping().await.unwrap();
        core.disconnect().await.unwrap();
        assert!(!core.is_connected().await.unwrap());
        assert!(matches!(core.ping().await, Err(Error::NotConnected)));
    }
}

#[tokio::test]
async fn token_requested_from_frontend_and_dynamic_subscriptions() {
    let Some(server) = start(false).await else {
        return;
    };
    let app = mock_app();
    let mut events = Events::listen(
        &app,
        &[
            "need_token",
            "connected",
            "subscribed",
            "unsubscribed",
            "publication",
        ],
    );
    let core = Centrifugo::new();

    let mut config = start_config(server.ws(), &[]);
    config.request_token = Some(true);
    core.connect(app.handle().clone(), config).await.unwrap();
    events.wait("need_token").await;
    core.provide_token(jwt("user-42")).await.unwrap();
    events.wait("connected").await;

    let mut opts = SubscribeOptions::channel("chat");
    opts.recoverable = Some(true);
    opts.positioned = Some(true);
    core.add_subscription_with_options(app.handle().clone(), opts)
        .await
        .unwrap();
    let sub = events.wait("subscribed").await;
    assert_eq!(sub["channel"], "chat");
    assert!(sub["streamPosition"]["epoch"].is_string(), "{sub}");

    core.publish(PublishRequest {
        channel: "chat".into(),
        data: r#"{"text":"hi"}"#.into(),
        data_encoding: Some(DataEncoding::RawJson),
        r#type: None,
        key: None,
        removed: None,
    })
    .await
    .unwrap();
    let p = events.wait("publication").await;
    assert_eq!(p["info"]["user"], "user-42");

    core.remove_subscription(app.handle().clone(), "chat".into())
        .await
        .unwrap();
    events.wait("unsubscribed").await;
    assert!(core.get_subscriptions().await.unwrap().is_empty());

    // Unsupported legacy requests fail clearly instead of being ignored.
    let err = core
        .sub_refresh(SubRefreshRequest {
            channel: "chat".into(),
            token: "t".into(),
            items: None,
            untrack_keys: Some(vec!["k".into()]),
            r#type: Some(2),
            signature: None,
        })
        .await;
    assert!(matches!(err, Err(Error::Unsupported(_))));
    core.disconnect().await.unwrap();
}

#[tokio::test]
async fn http_stream_fallback_when_websocket_is_down() {
    let Some(server) = start(true).await else {
        return;
    };
    let app = mock_app();
    let mut events = Events::listen(&app, &["need_token", "connected"]);
    let core = Centrifugo::new();

    let mut config = start_config(
        format!("ws://127.0.0.1:{}/connection/websocket", free_port()),
        &[],
    );
    config.token = Some(jwt("u1"));
    config.http_stream_url = Some(format!(
        "http://127.0.0.1:{}/connection/http_stream",
        server.port
    ));
    core.connect(app.handle().clone(), config).await.unwrap();
    let connected = events.wait("connected").await;
    assert!(connected["client"].is_string());
    wait_connected(&core).await;
    core.disconnect().await.unwrap();
}

#[tokio::test]
async fn connection_and_subscription_tokens_are_refreshed_before_expiry() {
    let Some(server) = start(false).await else {
        return;
    };
    let app = mock_app();
    let mut events = Events::listen(
        &app,
        &[
            "connected",
            "subscribed",
            "need_token",
            "need_sub_token",
            "disconnected",
            "unsubscribed",
        ],
    );
    let core = Centrifugo::new();

    let mut config = start_config(server.ws(), &[]);
    config.token = Some(short_jwt("u7", 3, None));
    core.connect(app.handle().clone(), config).await.unwrap();
    events.wait("connected").await;

    let mut opts = SubscribeOptions::channel("private");
    opts.token = Some(short_jwt("u7", 3, Some("private")));
    core.add_subscription_with_options(app.handle().clone(), opts)
        .await
        .unwrap();
    events.wait("subscribed").await;

    // Both tokens expire in 3s: the SDK asks the frontend before that.
    let mut need = [false, false];
    while need != [true, true] {
        let (name, v) = tokio::time::timeout(Duration::from_secs(10), events.0.recv())
            .await
            .unwrap()
            .unwrap();
        match name.as_str() {
            "need_token" => {
                core.refresh(RefreshRequest { token: jwt("u7") })
                    .await
                    .unwrap();
                need[0] = true;
            }
            "need_sub_token" => {
                assert_eq!(v["channel"], "private");
                let token = short_jwt("u7", 3600, Some("private"));
                core.sub_refresh(SubRefreshRequest {
                    channel: "private".into(),
                    token,
                    items: None,
                    untrack_keys: None,
                    r#type: None,
                    signature: None,
                })
                .await
                .unwrap();
                need[1] = true;
            }
            "disconnected" | "unsubscribed" => panic!("{name} before refresh: {v}"),
            _ => {}
        }
    }
    // Past the old expiry: still connected and subscribed.
    tokio::time::sleep(Duration::from_secs(4)).await;
    assert!(core.is_connected().await.unwrap());
    assert_eq!(
        core.get_subscriptions().await.unwrap().get("private"),
        Some(&true)
    );
    while let Ok((name, v)) = events.0.try_recv() {
        assert!(
            name != "disconnected" && name != "unsubscribed",
            "{name}: {v}"
        );
    }
    core.disconnect().await.unwrap();
}

async fn wait_state(core: &Centrifugo, want: &str) {
    for _ in 0..200 {
        if core.get_connection_state().await.unwrap() == want {
            return;
        }
        tokio::time::sleep(Duration::from_millis(25)).await;
    }
    panic!(
        "state is {}, not {want}",
        core.get_connection_state().await.unwrap()
    );
}

#[tokio::test]
async fn rejected_connection_is_not_retried() {
    let Some(server) = start(false).await else {
        return;
    };
    let app = mock_app();
    let mut events = Events::listen(&app, &["connecting", "error", "disconnected"]);
    let core = Centrifugo::new();

    // No token on a server that needs one: the server refuses, for good.
    core.connect(app.handle().clone(), start_config(server.ws(), &[]))
        .await
        .unwrap();
    let connecting = events.wait("connecting").await;
    assert!(connecting["ts"].as_i64().unwrap() > 0, "{connecting}");
    let disconnected = events.wait("disconnected").await;
    assert!(disconnected["code"].as_u64().unwrap() > 0, "{disconnected}");
    // Terminal for the SDK (no reconnect); `closed` is only after close().
    wait_state(&core, "disconnected").await;
    assert!(!core.is_connected().await.unwrap());
    core.disconnect().await.unwrap();
}

#[tokio::test]
async fn join_leave_and_server_side_subscription_events() {
    let Some(server) = start(false).await else {
        return;
    };
    let app = mock_app();
    let mut events = Events::listen(
        &app,
        &[
            "subscribing",
            "subscribed",
            "join",
            "leave",
            "server_subscribed",
            "server_subscribing",
            "server_unsubscribed",
            "server_publication",
            "server_join",
            "server_leave",
        ],
    );
    let core = Centrifugo::new();
    let mut config = start_config(server.ws(), &[]);
    config.token = Some(jwt("u1"));
    core.connect(app.handle().clone(), config).await.unwrap();
    // The server subscribes every user to its personal channel.
    let personal = "personal:#u1";
    assert_eq!(events.wait("server_subscribed").await["channel"], personal);

    let mut opts = SubscribeOptions::channel("room");
    opts.join_leave = Some(true);
    core.add_subscription_with_options(app.handle().clone(), opts)
        .await
        .unwrap();
    assert_eq!(events.wait("subscribing").await["channel"], "room");
    assert_eq!(events.wait("subscribed").await["channel"], "room");

    // Another user enters and leaves the room.
    let other_app = mock_app();
    let other = Centrifugo::new();
    let mut other_config = start_config(server.ws(), &["room"]);
    other_config.token = Some(jwt("u2"));
    other
        .connect(other_app.handle().clone(), other_config)
        .await
        .unwrap();
    // Our own join comes first.
    let join = events.wait_for("join", |v| v["info"]["user"] == "u2").await;
    assert_eq!(join["channel"], "room");
    other.disconnect().await.unwrap();
    let leave = events.wait("leave").await;
    assert_eq!(
        (&leave["channel"], &leave["info"]["user"]),
        (&json!("room"), &json!("u2"))
    );

    // Server-side publication into the personal channel.
    api(
        server.port,
        "publish",
        json!({"channel": personal, "data": {"n": 7}}),
    )
    .await;
    let p = events.wait("server_publication").await;
    assert_eq!(
        (&p["channel"], &p["rawJson"]),
        (&json!(personal), &json!({"n": 7}))
    );

    // A second connection of the same user joins and leaves the personal channel.
    let same_app = mock_app();
    let same = Centrifugo::new();
    let mut same_config = start_config(server.ws(), &[]);
    same_config.token = Some(jwt("u1"));
    same.connect(same_app.handle().clone(), same_config)
        .await
        .unwrap();
    let join = events.wait("server_join").await;
    assert_eq!(
        (&join["channel"], &join["user"]),
        (&json!(personal), &json!("u1"))
    );
    same.disconnect().await.unwrap();
    let leave = events.wait("server_leave").await;
    assert_eq!(
        (&leave["channel"], &leave["user"]),
        (&json!(personal), &json!("u1"))
    );

    // The server drops the connection (with reconnect): server-side
    // subscriptions go `subscribing` until the client is back.
    api(
        server.port,
        "disconnect",
        json!({"user": "u1", "disconnect": {"code": 4000, "reason": "test"}}),
    )
    .await;
    assert_eq!(events.wait("server_subscribing").await["channel"], personal);
    assert_eq!(events.wait("server_subscribed").await["channel"], personal);
    // Then it drops the subscription.
    api(
        server.port,
        "unsubscribe",
        json!({"channel": personal, "user": "u1"}),
    )
    .await;
    assert_eq!(
        events.wait("server_unsubscribed").await["channel"],
        personal
    );
    core.disconnect().await.unwrap();
}

#[tokio::test]
async fn client_error_event_when_the_transport_fails() {
    let app = mock_app();
    let mut events = Events::listen(&app, &["error"]);
    let core = Centrifugo::new();
    let url = format!("ws://127.0.0.1:{}/connection/websocket", free_port());
    core.connect(app.handle().clone(), start_config(url, &[]))
        .await
        .unwrap();
    let error = events.wait("error").await;
    assert!(!error["error"].as_str().unwrap().is_empty(), "{error}");
    core.disconnect().await.unwrap();
}

/// A mock app with every plugin command registered, and its main webview.
fn ipc_app() -> (tauri::App<MockRuntime>, tauri::WebviewWindow<MockRuntime>) {
    use tauri_plugin_centrifugo::commands::*;
    let app = tauri::test::mock_builder()
        .manage(Centrifugo::new())
        .invoke_handler(tauri::generate_handler![
            connect,
            disconnect,
            set_token,
            provide_token,
            publish,
            rpc,
            presence,
            presence_stats,
            history,
            send,
            refresh,
            sub_refresh,
            ping,
            is_connected,
            get_subscriptions,
            get_connection_state,
            add_subscription,
            add_subscription_with_options,
            remove_subscription,
            remove_all_subscriptions,
        ])
        .build(tauri::test::mock_context(tauri::test::noop_assets()))
        .unwrap();
    let webview = tauri::WebviewWindowBuilder::new(&app, "main", Default::default())
        .build()
        .unwrap();
    (app, webview)
}

/// Invokes a command the way the JS API does; `Err` is the error text.
fn invoke(
    webview: &tauri::WebviewWindow<MockRuntime>,
    cmd: &str,
    args: Value,
) -> Result<Value, String> {
    let request = tauri::webview::InvokeRequest {
        cmd: cmd.into(),
        callback: tauri::ipc::CallbackFn(0),
        error: tauri::ipc::CallbackFn(1),
        // The app's own origin: tauri rejects app commands from others.
        url: if cfg!(windows) {
            "http://tauri.localhost"
        } else {
            "tauri://localhost"
        }
        .parse()
        .unwrap(),
        body: tauri::ipc::InvokeBody::Json(args),
        headers: Default::default(),
        invoke_key: tauri::test::INVOKE_KEY.to_string(),
    };
    tauri::test::get_ipc_response(webview, request)
        .map(|r| r.deserialize::<Value>().unwrap())
        .map_err(|e| e.to_string())
}

#[tokio::test(flavor = "multi_thread")]
async fn every_command_over_ipc() {
    let Some(server) = start(true).await else {
        return;
    };
    let (app, w) = ipc_app();
    let mut events = Events::listen(
        &app,
        &["connected", "subscribed", "unsubscribed", "publication"],
    );
    let not_connected = |r: Result<Value, String>| r.unwrap_err().contains("NotConnected");

    // Before connect.
    assert!(not_connected(invoke(
        &w,
        "set_token",
        json!({"token": "t"})
    )));
    assert!(not_connected(invoke(
        &w,
        "refresh",
        json!({"request": {"token": "t"}})
    )));
    assert!(not_connected(invoke(
        &w,
        "sub_refresh",
        json!({"request": {"channel": "news", "token": "t"}})
    )));
    assert!(
        invoke(&w, "provide_token", json!({"token": "t"}))
            .unwrap_err()
            .contains("No token request")
    );
    assert_eq!(invoke(&w, "is_connected", json!({})).unwrap(), json!(false));

    let url = server.ws();
    invoke(
        &w,
        "connect",
        json!({"config": {"url": url, "channels": ["news"], "useProtobuf": false}}),
    )
    .unwrap();
    events.wait("connected").await;
    events
        .wait_for("subscribed", |v| v["channel"] == "news")
        .await;
    assert_eq!(invoke(&w, "is_connected", json!({})).unwrap(), json!(true));
    assert_eq!(
        invoke(&w, "get_connection_state", json!({})).unwrap(),
        json!("connected")
    );
    assert_eq!(
        invoke(&w, "get_subscriptions", json!({})).unwrap(),
        json!({"news": true})
    );
    invoke(&w, "ping", json!({})).unwrap();
    invoke(&w, "set_token", json!({"token": jwt("u1")})).unwrap();
    // A connection token refresh nobody asked for is kept for the next connect.
    invoke(&w, "refresh", json!({"request": {"token": jwt("u1")}})).unwrap();
    assert!(
        invoke(
            &w,
            "sub_refresh",
            json!({"request": {"channel": "news", "token": "t"}})
        )
        .unwrap_err()
        .contains("No token request")
    );

    invoke(&w, "add_subscription", json!({"channel": "a"})).unwrap();
    events.wait_for("subscribed", |v| v["channel"] == "a").await;
    invoke(
        &w,
        "add_subscription_with_options",
        json!({"options": {"channel": "b", "recoverable": true}}),
    )
    .unwrap();
    let b = events.wait_for("subscribed", |v| v["channel"] == "b").await;
    assert!(b["streamPosition"]["epoch"].is_string(), "{b}");

    invoke(
        &w,
        "publish",
        json!({"request": {"channel": "news", "data": BASE64.encode(br#"{"n":1}"#)}}),
    )
    .unwrap();
    assert_eq!(events.wait("publication").await["rawJson"], json!({"n": 1}));
    let history = invoke(
        &w,
        "history",
        json!({"request": {"channel": "news", "limit": 10}}),
    )
    .unwrap();
    assert_eq!(history.as_array().unwrap().len(), 1, "{history}");
    assert_eq!(history[0]["rawJson"], json!({"n": 1}));

    // A second (anonymous) client in the channel: 2 clients, 1 user.
    let other_app = mock_app();
    let other = Centrifugo::new();
    let mut other_events = Events::listen(&other_app, &["subscribed"]);
    other
        .connect(
            other_app.handle().clone(),
            start_config(server.ws(), &["news"]),
        )
        .await
        .unwrap();
    other_events.wait("subscribed").await;
    assert_eq!(
        invoke(
            &w,
            "presence_stats",
            json!({"request": {"channel": "news"}})
        )
        .unwrap(),
        json!([2, 1])
    );
    assert_eq!(
        invoke(&w, "presence", json!({"request": {"channel": "news"}}))
            .unwrap()
            .as_array()
            .unwrap()
            .len(),
        2
    );
    other.disconnect().await.unwrap();

    // No RPC proxy on the server: the error comes back.
    assert!(
        invoke(
            &w,
            "rpc",
            json!({"request": {"method": "m", "data": BASE64.encode(b"{}")}})
        )
        .is_err()
    );
    assert!(invoke(&w, "send", json!({"request": {"data": "not base64!"}})).is_err());

    invoke(&w, "remove_subscription", json!({"channel": "a"})).unwrap();
    events
        .wait_for("unsubscribed", |v| v["channel"] == "a")
        .await;
    let subs = invoke(&w, "get_subscriptions", json!({})).unwrap();
    assert!(subs.get("a").is_none() && subs.get("b").is_some(), "{subs}");
    invoke(&w, "remove_all_subscriptions", json!({})).unwrap();
    assert_eq!(
        invoke(&w, "get_subscriptions", json!({})).unwrap(),
        json!({})
    );

    // Still connected here, so the checks below see `disconnect` at work.
    assert_eq!(invoke(&w, "is_connected", json!({})).unwrap(), json!(true));
    invoke(&w, "disconnect", json!({})).unwrap();
    assert_eq!(invoke(&w, "is_connected", json!({})).unwrap(), json!(false));
    assert_eq!(
        invoke(&w, "get_connection_state", json!({})).unwrap(),
        json!("disconnected")
    );
    assert!(not_connected(invoke(&w, "ping", json!({}))));

    // Last: the server has no async-message handler and drops a client that sends.
    invoke(
        &w,
        "connect",
        json!({"config": {"url": url, "channels": [], "useProtobuf": false}}),
    )
    .unwrap();
    events.wait("connected").await;
    invoke(
        &w,
        "send",
        json!({"request": {"data": BASE64.encode(b"{}")}}),
    )
    .unwrap();
    invoke(&w, "disconnect", json!({})).unwrap();
}
