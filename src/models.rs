//! # Data Models
//!
//! This module contains all the data structures used for communication between
//! the frontend and the Centrifugo plugin, as well as internal data handling.
//!
//! ## Overview
//!
//! The models are designed to work with Tauri's serialization system and provide
//! type-safe communication between Rust backend and JavaScript frontend.
//!
//! ## Serialization
//!
//! All models use `serde` with `camelCase` naming convention to match JavaScript
//! conventions while maintaining Rust naming standards.

use serde::{Deserialize, Serialize};

/// Configuration for establishing a connection to Centrifugo server
///
/// This struct contains all the necessary parameters to establish and configure
/// a WebSocket connection to a Centrifugo server.
///
/// # Example
///
/// ```rust
/// use tauri_plugin_centrifugo::models::StartConfig;
///
/// let config = StartConfig {
///     url: "ws://localhost:8000/connection/websocket".to_string(),
///     token: Some("jwt-token".to_string()),
///     name: Some("my-client".to_string()),
///     version: Some("1.0.0".to_string()),
///     channels: vec!["news".to_string(), "updates".to_string()],
///     use_protobuf: false,
///     read_timeout: Some(5000),
/// };
/// ```
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct StartConfig {
    /// WebSocket URL for the Centrifugo server
    pub url: String,
    /// Optional JWT authentication token
    pub token: Option<String>,
    /// Optional client name identifier
    pub name: Option<String>,
    /// Optional client version string
    pub version: Option<String>,
    /// List of channels to subscribe to upon connection
    pub channels: Vec<String>,
    /// Whether to use Protobuf protocol instead of JSON
    pub use_protobuf: bool,
    /// Read timeout in milliseconds (optional)
    pub read_timeout: Option<u64>,
}

/// Configuration for individual channel subscription
///
/// Used when adding or configuring individual channels with specific settings.
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ChannelConfig {
    /// Channel name
    pub name: String,
    /// Optional channel-specific token for authentication
    pub token: Option<String>,
}

/// Request structure for publishing messages to channels
///
/// The `data` field should contain base64-encoded content that will be
/// sent to the specified channel.
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct PublishRequest {
    /// Target channel name
    pub channel: String,
    /// Base64-encoded message data
    pub data: String,
}

/// Request structure for RPC method calls
///
/// Used to execute remote procedure calls on the Centrifugo server.
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct RpcRequest {
    /// RPC method name to execute
    pub method: String,
    /// Base64-encoded method parameters
    pub data: String,
}

/// Request structure for presence information
///
/// Used to get information about clients currently subscribed to a channel.
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct PresenceRequest {
    /// Channel name to get presence information for
    pub channel: String,
}

/// Request structure for presence statistics
///
/// Used to get aggregated statistics about channel presence.
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct PresenceStatsRequest {
    /// Channel name to get statistics for
    pub channel: String,
}

/// Request structure for message history
///
/// Used to retrieve historical messages from a channel with optional filtering.
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct HistoryRequest {
    /// Channel name to get history for
    pub channel: String,
    /// Maximum number of messages to retrieve
    pub limit: Option<u32>,
    /// Message ID to start from (for pagination)
    pub since: Option<String>,
    /// Whether to retrieve messages in reverse chronological order
    pub reverse: Option<bool>,
}

/// Request structure for sending messages to server
///
/// Used to send messages directly to the server (not to specific channels).
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct SendRequest {
    /// Base64-encoded message data to send to server
    pub data: String,
}

/// Request structure for refreshing authentication tokens
///
/// Used to update the client's authentication token during an active session.
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct RefreshRequest {
    /// New JWT authentication token
    pub token: String,
}

/// Request structure for refreshing subscription tokens
///
/// Used to update channel-specific subscription tokens.
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct SubRefreshRequest {
    /// Channel name for the subscription
    pub channel: String,
    /// New subscription token
    pub token: String,
}

/// Connection status information
///
/// Contains timestamp information about connection state changes.
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ConnectionStatus {
    /// Unix timestamp of the status change
    pub ts: i64,
}

/// Channel subscription status
///
/// Contains information about a specific channel subscription.
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ChannelStatus {
    /// Channel name
    pub channel: String,
}

/// Error information structure
///
/// Used to convey error details from the backend to the frontend.
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ErrorData {
    /// Error message or description
    pub error: String,
}

/// Publication data received from channels
///
/// Contains message data received from subscribed channels.
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct PublicationData {
    /// Source channel name
    pub channel: String,
    /// Base64-encoded message data
    pub data: String,
    /// Unix timestamp of the publication
    pub timestamp: i64,
}

/// RPC response structure
///
/// Contains the result of an RPC method execution.
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct RpcResponse {
    /// RPC method name that was executed
    pub method: String,
    /// Base64-encoded response data
    pub data: String,
    /// Unix timestamp of the response
    pub timestamp: i64,
}

/// Presence response structure
///
/// Contains information about clients present in a channel.
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct PresenceResponse {
    /// Channel name
    pub channel: String,
    /// List of client identifiers present in the channel
    pub clients: Vec<String>,
    /// Unix timestamp of the presence information
    pub timestamp: i64,
}

/// Presence statistics response structure
///
/// Contains aggregated statistics about channel presence.
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct PresenceStatsResponse {
    /// Channel name
    pub channel: String,
    /// Number of clients in the channel
    pub num_clients: u32,
    /// Number of unique users in the channel
    pub num_users: u32,
    /// Unix timestamp of the statistics
    pub timestamp: i64,
}

/// History response structure
///
/// Contains historical messages from a channel.
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct HistoryResponse {
    /// Channel name
    pub channel: String,
    /// List of historical publications
    pub publications: Vec<PublicationData>,
    /// Unix timestamp of the history retrieval
    pub timestamp: i64,
}

/// Ping response structure
///
/// Contains server ping response information.
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct PingResponse {
    /// Unix timestamp of the ping response
    pub timestamp: i64,
}
