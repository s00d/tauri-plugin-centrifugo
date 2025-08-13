//! # Tauri Plugin Centrifugo
//!
//! A Tauri plugin for real-time communication with Centrifugo server using the `tokio-centrifuge` library.
//!
//! ## Features
//!
//! - **Real-time Communication**: WebSocket-based communication with Centrifugo
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
//! - `tokio-centrifugo`: Rust client library for Centrifugo
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
            commands::remove_subscription,
        ])
        .setup(|app, _api| {
            // Initialize the Centrifugo client state
            app.manage(core::Centrifugo::new());
            Ok(())
        })
        .build()
}
