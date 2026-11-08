const COMMANDS: &[&str] = &[
    "connect",
    "disconnect",
    "set_token",
    "provide_token",
    "publish",
    "rpc",
    "presence",
    "presence_stats",
    "history",
    "send",
    "refresh",
    "sub_refresh",
    "ping",
    "is_connected",
    "get_subscriptions",
    "get_connection_state",
    "add_subscription",
    "add_subscription_with_options",
    "remove_subscription",
    "remove_all_subscriptions",
];

fn main() {
    tauri_plugin::Builder::new(COMMANDS).build();
}
