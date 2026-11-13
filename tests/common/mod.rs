//! Shared helpers of the scenario tests: a real Centrifugo server and mock
//! apps that call the plugin over IPC, the way the JS API does.
//!
//! Server tests start `centrifugo` (or `$CENTRIFUGO_BIN`) with a temporary
//! config and are skipped when it isn't found. Written for Centrifugo v5
//! config keys (what CI runs).
#![allow(dead_code, unused_imports)] // each test binary uses a part

pub use base64::Engine;
pub use base64::engine::general_purpose::STANDARD as BASE64;
pub use serde_json::{Value, json};
pub use std::time::{Duration, Instant};

use base64::engine::general_purpose::URL_SAFE_NO_PAD;
use hmac::{Hmac, KeyInit, Mac};
use sha2::Sha256;
use std::io::{Read, Write};
use std::net::{TcpListener, TcpStream};
use std::process::{Child, Command, Stdio};
use std::sync::mpsc;
use std::time::{SystemTime, UNIX_EPOCH};
use tauri::Listener;
use tauri::test::MockRuntime;
use tauri_plugin_centrifugo::core::Centrifugo;

/// History kept per channel by the test server.
pub const HISTORY_SIZE: usize = 5;

pub const SECRET: &str = "plugin-test-secret";
pub const API_KEY: &str = "plugin-test-api-key";
/// How long to wait for an event: a local server answers in milliseconds,
/// the margin is for a loaded machine.
pub const WAIT: Duration = Duration::from_secs(5);

// ---------------------------------------------------------------- server

pub struct Server {
    pub child: Child,
    pub port: u16,
}

impl Drop for Server {
    fn drop(&mut self) {
        let _ = self.child.kill();
        let _ = self.child.wait();
    }
}

impl Server {
    pub fn ws(&self) -> String {
        format!("ws://127.0.0.1:{}/connection/websocket", self.port)
    }

    /// Calls the server HTTP API (`POST /api/<method>`).
    pub fn api(&self, method: &str, body: Value) {
        let body = body.to_string();
        let mut stream = TcpStream::connect(("127.0.0.1", self.port)).unwrap();
        write!(
            stream,
            "POST /api/{method} HTTP/1.1\r\nHost: 127.0.0.1\r\nX-API-Key: {API_KEY}\r\n\
             Content-Type: application/json\r\nContent-Length: {}\r\nConnection: close\r\n\r\n{body}",
            body.len()
        )
        .unwrap();
        let mut reply = String::new();
        stream.read_to_string(&mut reply).unwrap();
        let (head, json) = reply.split_once("\r\n\r\n").unwrap();
        assert!(head.starts_with("HTTP/1.1 200"), "{method}: {reply}");
        let json: Value = serde_json::from_str(json).unwrap();
        assert!(json.get("error").is_none(), "{method}: {json}");
    }
}

pub fn free_port() -> u16 {
    TcpListener::bind("127.0.0.1:0")
        .unwrap()
        .local_addr()
        .unwrap()
        .port()
}

pub fn dead_ws() -> String {
    format!("ws://127.0.0.1:{}/connection/websocket", free_port())
}

/// `None` when no centrifugo binary is available.
pub fn start(anonymous: bool) -> Option<Server> {
    let bin = std::env::var("CENTRIFUGO_BIN").unwrap_or_else(|_| "centrifugo".into());
    if Command::new(&bin).arg("version").output().is_err() {
        eprintln!("SKIP: centrifugo binary not found ({bin})");
        return None;
    }
    // `free_port` releases the port before centrifugo binds it, so a parallel
    // test can take the same one: retry on a new port when ours exits.
    (0..5)
        .find_map(|_| spawn_on_free_port(&bin, anonymous))
        .or_else(|| panic!("centrifugo did not start"))
}

pub fn spawn_on_free_port(bin: &str, anonymous: bool) -> Option<Server> {
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
        "history_size": HISTORY_SIZE,
        "history_ttl": "300s",
        "force_recovery": true,
        "presence": true,
        "join_leave": true,
        "http_stream": true,
        "allowed_origins": ["*"],
        // Server API, and a server-side subscription `personal:#<user>` for
        // every connection with a user.
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
    let mut server = Server { child, port };
    for _ in 0..100 {
        if server.child.try_wait().unwrap().is_some() {
            return None; // exited: the port was taken
        }
        if TcpStream::connect(("127.0.0.1", port)).is_ok() {
            // A failed bind exits right away: make sure the listener is ours.
            std::thread::sleep(Duration::from_millis(200));
            return server.child.try_wait().unwrap().is_none().then_some(server);
        }
        std::thread::sleep(Duration::from_millis(50));
    }
    panic!("centrifugo did not start on port {port}");
}

pub fn jwt(sub: &str) -> String {
    sign(json!({ "sub": sub, "exp": 4_000_000_000u64 }))
}

/// Token that expires in `secs` seconds; `channel` makes it a subscription token.
pub fn short_jwt(sub: &str, secs: u64, channel: Option<&str>) -> String {
    let exp = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_secs()
        + secs;
    let mut claims = json!({ "sub": sub, "exp": exp });
    if let Some(ch) = channel {
        claims["channel"] = json!(ch);
    }
    sign(claims)
}

pub fn sign(claims: Value) -> String {
    let header = URL_SAFE_NO_PAD.encode(br#"{"alg":"HS256","typ":"JWT"}"#);
    let claims = URL_SAFE_NO_PAD.encode(claims.to_string());
    let mut mac = Hmac::<Sha256>::new_from_slice(SECRET.as_bytes()).unwrap();
    mac.update(format!("{header}.{claims}").as_bytes());
    let sig = URL_SAFE_NO_PAD.encode(mac.finalize().into_bytes());
    format!("{header}.{claims}.{sig}")
}

// ---------------------------------------------------------------- app

pub const EVENTS: &[&str] = &[
    "connecting",
    "connected",
    "disconnected",
    "error",
    "need_token",
    "need_sub_token",
    "subscribing",
    "subscribed",
    "unsubscribed",
    "publication",
    "join",
    "leave",
    "server_subscribed",
    "server_subscribing",
    "server_unsubscribed",
    "server_publication",
    "server_join",
    "server_leave",
];

/// A mock app with every plugin command, its webview and its events.
pub struct App {
    pub w: tauri::WebviewWindow<MockRuntime>,
    pub events: mpsc::Receiver<(String, Value)>,
    pub _app: tauri::App<MockRuntime>,
}

impl App {
    pub fn new() -> Self {
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
        let w = tauri::WebviewWindowBuilder::new(&app, "main", Default::default())
            .build()
            .unwrap();
        let (tx, events) = mpsc::channel();
        for name in EVENTS {
            let tx = tx.clone();
            app.listen_any(format!("centrifugo:{name}"), move |e| {
                let v = serde_json::from_str(e.payload()).unwrap_or(Value::Null);
                let _ = tx.send((name.to_string(), v));
            });
        }
        Self {
            w,
            events,
            _app: app,
        }
    }

    /// Invokes a command as the JS API does; `Err` is the serialized error.
    pub fn call(&self, cmd: &str, args: Value) -> Result<Value, String> {
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
        tauri::test::get_ipc_response(&self.w, request)
            .map(|r| r.deserialize::<Value>().unwrap())
            .map_err(|e| e.to_string())
    }

    pub fn ok(&self, cmd: &str, args: Value) -> Value {
        self.call(cmd, args)
            .unwrap_or_else(|e| panic!("{cmd}: {e}"))
    }

    pub fn connect(&self, config: Value) -> Result<Value, String> {
        self.call("connect", json!({ "config": config }))
    }

    /// The next `name` event whose payload matches `pred`; other events are
    /// skipped, except a `publication` nobody expects.
    pub fn wait_for(&self, name: &str, pred: impl Fn(&Value) -> bool) -> Value {
        let deadline = Instant::now() + WAIT;
        let mut seen = Vec::new();
        loop {
            let left = deadline.saturating_duration_since(Instant::now());
            match self.events.recv_timeout(left) {
                Ok((n, v)) if n == name && pred(&v) => return v,
                Ok((n, v)) => {
                    assert!(n != "publication", "unexpected publication: {v}");
                    seen.push(format!("{n}: {v}"));
                }
                Err(_) => panic!("no centrifugo:{name} event; got instead: {seen:#?}"),
            }
        }
    }

    pub fn wait(&self, name: &str) -> Value {
        self.wait_for(name, |_| true)
    }

    /// Events already received, with no wait.
    pub fn drain(&self) -> Vec<(String, Value)> {
        self.events.try_iter().collect()
    }

    pub fn state(&self) -> String {
        self.ok("get_connection_state", json!({}))
            .as_str()
            .unwrap()
            .to_string()
    }

    pub fn wait_state(&self, want: &str) {
        let deadline = Instant::now() + WAIT;
        while self.state() != want {
            assert!(
                Instant::now() < deadline,
                "state is {}, not {want}",
                self.state()
            );
            std::thread::sleep(Duration::from_millis(25));
        }
    }
}

/// The error variant of a reply (`"ok"` for success).
pub fn kind(reply: &Result<Value, String>) -> &'static str {
    let Err(e) = reply else { return "ok" };
    [
        "NotConnected",
        "Unsupported",
        "Base64Error",
        "SerializationError",
        "RequestError",
        "CentrifugoError",
    ]
    .into_iter()
    .find(|k| e.contains(k))
    .unwrap_or_else(|| panic!("unknown error: {e}"))
}

pub fn wall_ms() -> i64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap()
        .as_millis() as i64
}

pub fn assert_recent(ts: &Value) {
    let ts = ts.as_i64().unwrap_or_else(|| panic!("ts: {ts}"));
    assert!((ts - wall_ms()).abs() < 60_000, "ts {ts} is not now");
}
