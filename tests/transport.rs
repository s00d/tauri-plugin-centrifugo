//! Transport failures and the HTTP-streaming fallback.

mod common;

use common::*;

/// Given no server on the port
/// When the app connects
/// Then it gets `connecting` (with the current time) and a transport `error`
/// And the state stays `connecting` (the SDK retries)
/// When the app disconnects
/// Then the state is `disconnected`.
#[test]
fn dead_server_keeps_connecting() {
    let app = App::new();
    app.connect(json!({ "url": dead_ws(), "channels": [], "useProtobuf": false }))
        .unwrap();
    assert_recent(&app.wait("connecting")["ts"]);
    assert!(!app.wait("error")["error"].as_str().unwrap().is_empty());
    assert_eq!(app.state(), "connecting");
    app.ok("disconnect", json!({}));
    assert_eq!(app.state(), "disconnected");
}

/// Given a server that needs a token
/// When the app connects without one
/// Then it gets `disconnected` with a non-zero code, and no retry.
#[test]
fn refused_connection_is_not_retried() {
    let Some(server) = start(false) else {
        return;
    };
    let app = App::new();
    app.connect(json!({ "url": server.ws(), "channels": [], "useProtobuf": false }))
        .unwrap();
    let disconnected = app.wait("disconnected");
    assert!(disconnected["code"].as_u64().unwrap() > 0, "{disconnected}");
    assert_recent(&disconnected["ts"]);
    app.wait_state("disconnected");
    app.ok("disconnect", json!({}));
}

/// Given the WebSocket endpoint is down and `httpStreamUrl` is set
/// When the app connects
/// Then it connects over HTTP streaming.
#[test]
fn http_streaming_fallback() {
    let Some(server) = start(false) else {
        return;
    };
    let app = App::new();
    let http = format!("http://127.0.0.1:{}/connection/http_stream", server.port);
    app.connect(json!({ "url": dead_ws(), "httpStreamUrl": http, "channels": [], "useProtobuf": false, "token": jwt("u1") }))
        .unwrap();
    assert_recent(&app.wait("connected")["ts"]);
    app.wait_state("connected");
    app.ok("ping", json!({}));
    app.ok("disconnect", json!({}));
}

/// Given a connected client and a server with no async-message handler
/// When the app calls `send`
/// Then the send succeeds, and the server drops the client for good (3508).
#[test]
fn send_without_a_server_handler_drops_the_client() {
    let Some(server) = start(true) else {
        return;
    };
    let app = App::new();
    app.connect(json!({ "url": server.ws(), "channels": [], "useProtobuf": false }))
        .unwrap();
    app.wait("connected");
    app.ok(
        "send",
        json!({ "request": { "data": BASE64.encode("{}") } }),
    );
    assert_eq!(app.wait("disconnected")["code"], 3508);
    app.wait_state("disconnected");
    app.ok("disconnect", json!({}));
}
