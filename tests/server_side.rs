//! Presence events and server-side subscriptions (driven by the server API).

mod common;

use common::*;

/// A connected app of `user`.
fn connect_as(server: &Server, user: &str, channels: &[&str]) -> App {
    let app = App::new();
    app.connect(json!({ "url": server.ws(), "channels": channels, "useProtobuf": false, "token": jwt(user) }))
        .unwrap();
    app.wait("connected");
    app
}

/// Given u1 subscribed to `room` with join/leave
/// When u2 subscribes to `room` and then disconnects
/// Then u1 gets `join` and then `leave` of u2.
#[test]
fn others_join_and_leave_a_channel() {
    let Some(server) = start(false) else {
        return;
    };
    let app = connect_as(&server, "u1", &[]);
    app.ok(
        "add_subscription_with_options",
        json!({ "options": { "channel": "room", "joinLeave": true } }),
    );
    assert_eq!(app.wait("subscribing")["channel"], "room");
    assert_eq!(app.wait("subscribed")["channel"], "room");

    let other = connect_as(&server, "u2", &["room"]);
    // u1's own join comes first.
    let join = app.wait_for("join", |v| v["info"]["user"] == "u2");
    assert_eq!(join["channel"], "room");
    other.ok("disconnect", json!({}));
    let leave = app.wait("leave");
    assert_eq!(
        (&leave["channel"], &leave["info"]["user"]),
        (&json!("room"), &json!("u2"))
    );
    app.ok("disconnect", json!({}));
}

/// Given u1 connected (the server subscribes it to `personal:#u1`)
/// When the server publishes into the personal channel
/// Then u1 gets `server_publication`
/// When a second connection of u1 comes and goes
/// Then u1 gets `server_join` and `server_leave`.
#[test]
fn personal_server_side_channel() {
    let Some(server) = start(false) else {
        return;
    };
    let personal = "personal:#u1";
    let app = connect_as(&server, "u1", &[]);
    assert_eq!(app.wait("server_subscribed")["channel"], personal);

    server.api(
        "publish",
        json!({ "channel": personal, "data": { "n": 7 } }),
    );
    let p = app.wait("server_publication");
    assert_eq!(
        (&p["channel"], &p["rawJson"]),
        (&json!(personal), &json!({ "n": 7 }))
    );

    let same = connect_as(&server, "u1", &[]);
    let join = app.wait("server_join");
    assert_eq!(
        (&join["channel"], &join["user"]),
        (&json!(personal), &json!("u1"))
    );
    same.ok("disconnect", json!({}));
    let leave = app.wait("server_leave");
    assert_eq!(
        (&leave["channel"], &leave["user"]),
        (&json!(personal), &json!("u1"))
    );
    app.ok("disconnect", json!({}));
}

/// Given u1 with its personal server-side subscription
/// When the server drops the connection with a reconnect code (4000)
/// Then the subscription goes `server_subscribing`, then `server_subscribed`
/// When the server unsubscribes u1
/// Then u1 gets `server_unsubscribed`.
#[test]
fn server_disconnect_and_unsubscribe() {
    let Some(server) = start(false) else {
        return;
    };
    let personal = "personal:#u1";
    let app = connect_as(&server, "u1", &[]);
    assert_eq!(app.wait("server_subscribed")["channel"], personal);

    server.api(
        "disconnect",
        json!({ "user": "u1", "disconnect": { "code": 4000, "reason": "test" } }),
    );
    assert_eq!(app.wait("server_subscribing")["channel"], personal);
    assert_eq!(app.wait("server_subscribed")["channel"], personal);
    server.api("unsubscribe", json!({ "channel": personal, "user": "u1" }));
    assert_eq!(app.wait("server_unsubscribed")["channel"], personal);
    app.ok("disconnect", json!({}));
}
