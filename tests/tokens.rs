//! Connection and subscription tokens that come from the frontend.

mod common;

use common::*;

/// Given a server that needs a connection token
/// When the app connects with `requestToken: true`
/// Then the plugin asks the frontend (`need_token`)
/// When the frontend answers with `provideToken`
/// Then the client connects as that user, and its publications carry the user.
#[test]
fn connection_token_comes_from_the_frontend() {
    let Some(server) = start(false) else {
        return;
    };
    let app = App::new();
    app.connect(json!({ "url": server.ws(), "channels": ["chat"], "useProtobuf": false, "requestToken": true }))
        .unwrap();
    app.wait("need_token");
    app.ok("provide_token", json!({ "token": jwt("user-42") }));
    app.wait("connected");
    app.wait_for("subscribed", |v| v["channel"] == "chat");

    let req = json!({ "request": { "channel": "chat", "data": r#"{"t":1}"#, "dataEncoding": "rawJson" } });
    app.ok("publish", req);
    let p = app.wait("publication");
    assert_eq!(
        (&p["info"]["user"], &p["rawJson"]),
        (&json!("user-42"), &json!({ "t": 1 }))
    );
    app.ok("disconnect", json!({}));
}

/// Given a client connected with a token that expires in 3 s
/// And a private channel subscribed with a token that expires in 3 s
/// When the SDK asks for new tokens (`need_token`, `need_sub_token`)
/// And the frontend answers with `refresh` and `subRefresh`
/// Then past the old expiry the client is still connected and subscribed.
#[test]
fn tokens_are_refreshed_before_they_expire() {
    let Some(server) = start(false) else {
        return;
    };
    let app = App::new();
    let token = short_jwt("u7", 3, None);
    app.connect(
        json!({ "url": server.ws(), "channels": [], "useProtobuf": false, "token": token }),
    )
    .unwrap();
    app.wait("connected");
    let token = short_jwt("u7", 3, Some("private"));
    let opts = json!({ "options": { "channel": "private", "token": token, "positioned": true } });
    app.ok("add_subscription_with_options", opts);
    let sub = app.wait_for("subscribed", |v| v["channel"] == "private");
    assert!(sub["streamPosition"]["epoch"].is_string(), "{sub}");

    let (mut conn, mut chan) = (false, false);
    let deadline = Instant::now() + Duration::from_secs(10);
    while !(conn && chan) {
        let (name, v) = app
            .events
            .recv_timeout(deadline.saturating_duration_since(Instant::now()))
            .expect("token requests");
        match name.as_str() {
            "need_token" => {
                app.ok("refresh", json!({ "request": { "token": jwt("u7") } }));
                conn = true;
            }
            "need_sub_token" => {
                assert_eq!(v["channel"], "private");
                let token = short_jwt("u7", 3600, Some("private"));
                app.ok(
                    "sub_refresh",
                    json!({ "request": { "channel": "private", "token": token } }),
                );
                chan = true;
            }
            "disconnected" | "unsubscribed" => panic!("{name} before refresh: {v}"),
            _ => {}
        }
    }
    std::thread::sleep(Duration::from_secs(4));
    assert_eq!(app.ok("is_connected", json!({})), json!(true));
    assert_eq!(
        app.ok("get_subscriptions", json!({})),
        json!({ "private": true })
    );
    for (name, v) in app.drain() {
        assert!(
            name != "disconnected" && name != "unsubscribed",
            "{name}: {v}"
        );
    }
    app.ok("disconnect", json!({}));
}
