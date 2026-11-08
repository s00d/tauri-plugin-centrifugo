//! # Tauri Commands
//!
//! This module contains all the Tauri command handlers that bridge the frontend
//! JavaScript/TypeScript code with the Rust backend Centrifugo client.
//!
//! ## Command Overview
//!
//! Each command is a `#[tauri::command]` function that:
//! - Receives parameters from the frontend
//! - Accesses the shared Centrifugo client state
//! - Executes the requested operation
//! - Returns results or errors to the frontend
//!
//! ## State Management
//!
//! All commands access the shared `Centrifugo` instance through `window.state::<Centrifugo>()`.
//! This ensures thread-safe access to the client across multiple command invocations.
//!
//! ## Error Handling
//!
//! All commands return `Result<T>` which automatically serializes errors
//! to the frontend with meaningful error messages.

use crate::Result;
use crate::core::Centrifugo;
use crate::models::*;
use std::collections::HashMap;
use tauri::{Manager, Runtime, Window};

/// Establish a connection to Centrifugo server
///
/// Closes a previous client, creates a new one, subscribes to `config.channels`
/// and starts connecting. Returns at once; progress arrives as events, and the
/// SDK reconnects with backoff by itself.
///
/// # Parameters
///
/// - `window`: Tauri window instance for state access
/// - `config`: Connection configuration including URL, channels, and options
///
/// # Returns
///
/// - `Ok(())` once connecting has started
/// - `Err(Error)` on an invalid config (URL, header)
///
/// # Events Emitted
///
/// - `centrifugo:connecting` - Connection attempt started
/// - `centrifugo:connected` - Connection established
/// - `centrifugo:subscribed` - Channel subscriptions successful
/// - `centrifugo:error` - Connection or subscription errors
#[tauri::command]
pub async fn connect<R: Runtime>(window: Window<R>, config: StartConfig) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo
        .connect(window.app_handle().clone(), config)
        .await
}

/// Close the connection to Centrifugo server
///
/// Closes the connection and drops the client with all its subscriptions.
///
/// # Parameters
///
/// - `window`: Tauri window instance for state access
///
/// # Returns
///
/// - `Ok(())` on successful disconnection
/// - `Err(Error)` if disconnection fails
///
/// # Events Emitted
///
/// - `centrifugo:disconnected` - Connection closed
#[tauri::command]
pub async fn disconnect<R: Runtime>(window: Window<R>) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.disconnect().await
}

/// Set or update the authentication token
///
/// Replaces the connection token; the SDK uses it from the next connect
/// attempt. Fails with `NotConnected` when there is no client.
///
/// # Parameters
///
/// - `window`: Tauri window instance for state access
/// - `token`: New JWT authentication token
///
/// # Returns
///
/// - `Ok(())` on successful token update
/// - `Err(Error)` if token update fails
#[tauri::command]
pub async fn set_token<R: Runtime>(window: Window<R>, token: String) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.set_token(token).await
}

/// Answer a pending `centrifugo:need_token` request
///
/// An empty token means "no token": anonymous on connect, unauthorized on
/// refresh. Fails when no request is pending.
#[tauri::command]
pub async fn provide_token<R: Runtime>(window: Window<R>, token: String) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.provide_token(token).await
}

/// Publish a message to a specific channel
///
/// `data` is base64 unless `dataEncoding` is `rawJson`. Map publish
/// (`type`/`key`/`removed`) is rejected with `Not supported`.
///
/// # Parameters
///
/// - `window`: Tauri window instance for state access
/// - `request`: Publish request containing channel and data
///
/// # Returns
///
/// - `Ok(())` on successful publication
/// - `Err(Error)` if publication fails (e.g., not connected)
///
/// # Requirements
///
/// - Must be connected to Centrifugo server
/// - The server must allow client publishing in the channel
#[tauri::command]
pub async fn publish<R: Runtime>(window: Window<R>, request: PublishRequest) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.publish(request).await
}

/// Execute an RPC method on the Centrifugo server
///
/// This command sends an RPC request and waits for the response.
/// The request data should be base64-encoded.
///
/// # Parameters
///
/// - `window`: Tauri window instance for state access
/// - `request`: RPC request containing method name and parameters
///
/// # Returns
///
/// - `Ok(String)` containing the base64-encoded response data
/// - `Err(Error)` if RPC execution fails
///
/// # Requirements
///
/// - Must be connected to Centrifugo server
#[tauri::command]
pub async fn rpc<R: Runtime>(window: Window<R>, request: RpcRequest) -> Result<String> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.rpc(request).await
}

/// Get presence information for a channel
///
/// Returns the client IDs currently present in the channel.
///
/// # Parameters
///
/// - `window`: Tauri window instance for state access
/// - `request`: Presence request containing channel name
///
/// # Returns
///
/// - `Ok(Vec<String>)` containing client identifiers
/// - `Err(Error)` if the request fails
#[tauri::command]
pub async fn presence<R: Runtime>(
    window: Window<R>,
    request: PresenceRequest,
) -> Result<Vec<String>> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.presence(request).await
}

/// Get presence statistics for a channel
///
/// Returns aggregated statistics about the number of clients and users
/// in a channel.
///
/// # Parameters
///
/// - `window`: Tauri window instance for state access
/// - `request`: Presence stats request containing channel name
///
/// # Returns
///
/// - `Ok((u32, u32))` containing (num_clients, num_users)
/// - `Err(Error)` if the request fails
#[tauri::command]
pub async fn presence_stats<R: Runtime>(
    window: Window<R>,
    request: PresenceStatsRequest,
) -> Result<(u32, u32)> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.presence_stats(request).await
}

/// Get message history for a channel
///
/// Retrieves publications from the channel history (`limit`, `reverse`;
/// `since` is ignored). The channel must have history enabled.
///
/// # Parameters
///
/// - `window`: Tauri window instance for state access
/// - `request`: History request with channel and filtering options
///
/// # Returns
///
/// - `Ok(Vec<PublicationData>)` containing historical publications
/// - `Err(Error)` if the request fails
#[tauri::command]
pub async fn history<R: Runtime>(
    window: Window<R>,
    request: HistoryRequest,
) -> Result<Vec<PublicationData>> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.history(request).await
}

/// Send a message directly to the server
///
/// Sends an async message to the server (not to a channel, no reply).
///
/// # Parameters
///
/// - `window`: Tauri window instance for state access
/// - `request`: Send request containing message data
///
/// # Returns
///
/// - `Ok(())` on successful send
/// - `Err(Error)` if sending fails
#[tauri::command]
pub async fn send<R: Runtime>(window: Window<R>, request: SendRequest) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.send(request).await
}

/// Answer a pending `need_token` request
///
/// Answers a pending `centrifugo:need_token` request with the token; when none
/// is pending, sets the token for the next connect. The SDK refreshes tokens
/// itself before they expire.
///
/// # Parameters
///
/// - `window`: Tauri window instance for state access
/// - `request`: Refresh request containing new token
///
/// # Returns
///
/// - `Ok(())` on successful token refresh
/// - `Err(Error)` if refresh fails
#[tauri::command]
pub async fn refresh<R: Runtime>(window: Window<R>, request: RefreshRequest) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.refresh(request).await
}

/// Answer a pending `need_sub_token` request for a channel
///
/// Answers a pending `centrifugo:need_sub_token` request for `request.channel`.
/// Fails when none is pending. Track/untrack fields are rejected with
/// `Not supported`; `signature` is ignored.
///
/// # Parameters
///
/// - `window`: Tauri window instance for state access
/// - `request`: Sub refresh request containing channel and new token
///
/// # Returns
///
/// - `Ok(())` on successful token refresh
/// - `Err(Error)` if refresh fails
#[tauri::command]
pub async fn sub_refresh<R: Runtime>(window: Window<R>, request: SubRefreshRequest) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.sub_refresh(request).await
}

/// Deprecated: check that the client is connected
///
/// The SDK keeps the connection alive with server pings and has no client
/// ping; this only fails with `NotConnected` when not connected.
///
/// # Parameters
///
/// - `window`: Tauri window instance for state access
///
/// # Returns
///
/// - `Ok(())` when connected
/// - `Err(Error::NotConnected)` otherwise
#[tauri::command]
pub async fn ping<R: Runtime>(window: Window<R>) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.ping().await
}

/// Check if currently connected to Centrifugo server
///
/// Returns the current connection status without establishing a connection.
///
/// # Parameters
///
/// - `window`: Tauri window instance for state access
///
/// # Returns
///
/// - `Ok(bool)` - `true` if connected, `false` otherwise
/// - `Err(Error)` if status check fails
#[tauri::command]
pub async fn is_connected<R: Runtime>(window: Window<R>) -> Result<bool> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.is_connected().await
}

/// Get current channel subscriptions
///
/// Returns the channels added through the plugin; the value is `true` while
/// subscribed.
///
/// # Parameters
///
/// - `window`: Tauri window instance for state access
///
/// # Returns
///
/// - `Ok(HashMap<String, bool>)` - Channel name to subscription status mapping
/// - `Err(Error)` if subscription retrieval fails
#[tauri::command]
pub async fn get_subscriptions<R: Runtime>(window: Window<R>) -> Result<HashMap<String, bool>> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.get_subscriptions().await
}

/// Get detailed connection state
///
/// One of `connecting`, `connected`, `closed`, `disconnected` (also when there
/// is no client).
///
/// # Parameters
///
/// - `window`: Tauri window instance for state access
///
/// # Returns
///
/// - `Ok(String)` - Connection state description
/// - `Err(Error)` if state retrieval fails
#[tauri::command]
pub async fn get_connection_state<R: Runtime>(window: Window<R>) -> Result<String> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.get_connection_state().await
}

/// Add a new channel subscription
///
/// Subscribes to a channel with default options. Fails with `NotConnected`
/// when there is no client.
///
/// # Parameters
///
/// - `window`: Tauri window instance for state access
/// - `channel`: Channel name to subscribe to
///
/// # Returns
///
/// - `Ok(())` on successful subscription
/// - `Err(Error)` if subscription fails
///
/// # Events Emitted
///
/// - `centrifugo:subscribing` - Subscription attempt started
/// - `centrifugo:subscribed` - Subscription successful
/// - `centrifugo:error` - Subscription errors
#[tauri::command]
pub async fn add_subscription<R: Runtime>(window: Window<R>, channel: String) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo
        .add_subscription(window.app_handle().clone(), channel)
        .await
}

/// Add a channel subscription with options
///
/// Token (private channel, refreshed via `centrifugo:need_sub_token`),
/// recovery, join/leave, positioning, fossil delta, resume position.
///
/// # Events Emitted
///
/// - `centrifugo:subscribing`, `centrifugo:subscribed`, `centrifugo:error`
#[tauri::command]
pub async fn add_subscription_with_options<R: Runtime>(
    window: Window<R>,
    options: SubscribeOptions,
) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo
        .add_subscription_with_options(window.app_handle().clone(), options)
        .await
}

/// Remove a channel subscription
///
/// Unsubscribes from a channel and forgets it. Unknown channels are ignored.
///
/// # Parameters
///
/// - `window`: Tauri window instance for state access
/// - `channel`: Channel name to unsubscribe from
///
/// # Returns
///
/// - `Ok(())` on successful unsubscription
/// - `Err(Error)` if unsubscription fails
///
/// # Events Emitted
///
/// - `centrifugo:unsubscribed` - Unsubscription successful
#[tauri::command]
pub async fn remove_subscription<R: Runtime>(window: Window<R>, channel: String) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo
        .remove_subscription(window.app_handle().clone(), channel)
        .await
}

/// Remove every channel subscription
#[tauri::command]
pub async fn remove_all_subscriptions<R: Runtime>(window: Window<R>) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo
        .remove_all_subscriptions(window.app_handle().clone())
        .await
}
