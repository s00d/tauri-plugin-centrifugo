//! # Tauri Plugin Centrifugo
//!
//! A Tauri plugin for real-time communication with Centrifugo server, built on the official
//! [`centrifuge-client`](https://github.com/centrifugal/centrifuge-rust) SDK.
//!
//! ## Features
//!
//! - **Real-time Communication**: WebSocket with HTTP-streaming fallback, proxies, OS TLS store
//! - **JSON & Protobuf Support**: Choose between JSON and Protobuf protocols
//! - **Event-driven Architecture**: Comprehensive event system for connection state and messages
//! - **Channel Management**: Subscribe/unsubscribe to channels dynamically
//! - **Authentication**: JWT token support for secure connections
//! - **Cross-platform**: Works on desktop and mobile platforms
//!
//! ## Usage
//!
//! ```rust,no_run
//! use tauri_plugin_centrifugo::init;
//!
//! // fn main() {
//! //     tauri::Builder::default()
//! //         .plugin(init())
//! //         .run(tauri::generate_context!())
//! //         .expect("error while running tauri application");
//! // }
//! ```
//!
//! ## Architecture
//!
//! The plugin consists of several modules:
//! - `commands`: Tauri command handlers for frontend communication
//! - `core`: Core Centrifugo client logic and state management
//! - `models`: Data structures for requests, responses, and configuration
//! - `error`: Custom error types and error handling
//!
//! ## Dependencies
//!
//! - `centrifuge-client`: the official Centrifugo Rust SDK
//! - `serde`: Serialization/deserialization
//! - `thiserror`: Error handling utilities
//! - `futures-util`: Async stream utilities
//!
//! ## License
//!
//! MIT License

use tauri::plugin::{Builder as PluginBuilder, TauriPlugin};
use tauri::{Manager, Runtime};

pub mod commands;
pub mod core;
pub mod error;
pub mod models;

/// The official Centrifugo Rust SDK the plugin is built on.
pub use centrifuge;
pub use error::Result;

/// Initialize the Centrifugo plugin for Tauri
///
/// This function creates and configures the plugin with all necessary command handlers
/// and state management. It should be called during Tauri app initialization.
///
/// # Example
///
/// ```rust,no_run
/// use tauri_plugin_centrifugo::init;
///
/// // fn main() {
/// //     tauri::Builder::default()
/// //         .plugin(init())
/// //         .run(tauri::generate_context!())
/// //         .expect("error while running tauri application");
/// // }
/// ```
///
/// # Returns
///
/// A configured `TauriPlugin<R>` instance that can be added to your Tauri app.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
    PluginBuilder::new("centrifugo")
        .invoke_handler(tauri::generate_handler![
            commands::connect,
            commands::disconnect,
            commands::set_token,
            commands::provide_token,
            commands::publish,
            commands::rpc,
            commands::presence,
            commands::presence_stats,
            commands::history,
            commands::send,
            commands::refresh,
            commands::sub_refresh,
            commands::ping,
            commands::is_connected,
            commands::get_subscriptions,
            commands::get_connection_state,
            commands::add_subscription,
            commands::add_subscription_with_options,
            commands::remove_subscription,
            commands::remove_all_subscriptions,
        ])
        .setup(|app, _api| {
            // Initialize the Centrifugo client state
            app.manage(core::Centrifugo::new());
            Ok(())
        })
        .build()
}

#[cfg(test)]
mod tests {
    use super::commands;
    use super::core::Centrifugo;
    use tauri::ipc::{CallbackFn, InvokeBody};
    use tauri::test::{INVOKE_KEY, get_ipc_response, mock_builder, mock_context, noop_assets};
    use tauri::webview::InvokeRequest;
    use tauri::{Builder, Runtime};

    fn build_test_app<R: Runtime>(builder: Builder<R>) -> tauri::App<R> {
        builder
            .manage(Centrifugo::new())
            .invoke_handler(tauri::generate_handler![
                commands::is_connected,
                commands::ping
            ])
            .build(mock_context(noop_assets()))
            .expect("build mock app")
    }

    fn request(cmd: &str, body: serde_json::Value) -> InvokeRequest {
        InvokeRequest {
            cmd: cmd.into(),
            callback: CallbackFn(0),
            error: CallbackFn(1),
            // The app's own (local) origin; tauri rejects app commands from others.
            url: if cfg!(windows) {
                "http://tauri.localhost"
            } else {
                "tauri://localhost"
            }
            .parse()
            .expect("valid invoke URL"),
            body: InvokeBody::Json(body),
            headers: Default::default(),
            invoke_key: INVOKE_KEY.to_string(),
        }
    }

    #[test]
    fn command_handler_is_registered_and_is_connected_returns_false_by_default() {
        let app = build_test_app(mock_builder());
        let webview = tauri::WebviewWindowBuilder::new(&app, "main", Default::default())
            .build()
            .expect("build webview");

        let response = get_ipc_response(&webview, request("is_connected", serde_json::Value::Null))
            .expect("invoke is_connected");
        let value = response.deserialize::<bool>().expect("deserialize bool");
        assert!(!value);
    }

    #[test]
    fn command_errors_are_returned_over_ipc() {
        let app = build_test_app(mock_builder());
        let webview = tauri::WebviewWindowBuilder::new(&app, "main", Default::default())
            .build()
            .expect("build webview");

        let err = get_ipc_response(&webview, request("ping", serde_json::Value::Null))
            .expect_err("ping should fail when disconnected");
        let err_msg = err.to_string();
        assert!(
            err_msg.contains("Not connected") || err_msg.contains("NotConnected"),
            "unexpected error: {err_msg}"
        );
    }
}
