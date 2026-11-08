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

#[derive(Debug, Deserialize, Serialize, Clone, Copy, PartialEq, Eq, Default)]
#[serde(rename_all = "camelCase")]
pub enum DataEncoding {
    #[default]
    Base64,
    RawJson,
}

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
///     http_stream_url: None,
///     headers: None,
///     request_token: None,
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
    /// HTTP-streaming fallback endpoint (`.../connection/http_stream`), tried
    /// together with `url` on the first connect
    #[serde(default)]
    pub http_stream_url: Option<String>,
    /// Extra HTTP headers for the WebSocket upgrade / HTTP-stream requests
    #[serde(default)]
    pub headers: Option<std::collections::HashMap<String, String>>,
    /// Ask the frontend for the connection token (`centrifugo:need_token`,
    /// answered with `provide_token`) when `token` is not set. With `token`
    /// set, `need_token` is sent anyway before the token expires.
    #[serde(default)]
    pub request_token: Option<bool>,
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

/// Extended subscription options for dynamic subscriptions.
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct SubscribeOptions {
    pub channel: String,
    pub token: Option<String>,
    pub recoverable: Option<bool>,
    pub join_leave: Option<bool>,
    pub positioned: Option<bool>,
    /// Fossil delta compression (the server must allow it for the channel)
    #[serde(default)]
    pub delta: Option<bool>,
    /// Resume from a saved position (from the `subscribed` event's `streamPosition`)
    #[serde(default)]
    pub since: Option<StreamPositionData>,
}

impl SubscribeOptions {
    /// Options with defaults for the channel.
    pub fn channel(channel: impl Into<String>) -> Self {
        Self {
            channel: channel.into(),
            token: None,
            recoverable: None,
            join_leave: None,
            positioned: None,
            delta: None,
            since: None,
        }
    }
}

/// Position in a channel stream.
#[derive(Debug, Deserialize, Serialize, Clone, PartialEq, Eq)]
#[serde(rename_all = "camelCase")]
pub struct StreamPositionData {
    pub offset: u64,
    pub epoch: String,
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
    /// Optional encoding mode for `data` (default: base64)
    pub data_encoding: Option<DataEncoding>,
    /// Optional publish type: 0 = regular (default), 1 = map
    pub r#type: Option<i32>,
    /// Optional map key for map-style publish
    pub key: Option<String>,
    /// Optional remove flag for map-style publish
    pub removed: Option<bool>,
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
    /// Optional encoding mode for `data` (default: base64)
    pub data_encoding: Option<DataEncoding>,
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
    /// Optional encoding mode for `data` (default: base64)
    pub data_encoding: Option<DataEncoding>,
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
    /// Optional tracked items with versions
    pub items: Option<Vec<KeyedItem>>,
    /// Optional list of keys to stop tracking
    pub untrack_keys: Option<Vec<String>>,
    /// Optional sub refresh type: 0=sub_refresh, 1=track, 2=untrack
    pub r#type: Option<i32>,
    /// Optional HMAC signature for track auth
    pub signature: Option<String>,
}

/// Keyed item metadata for advanced sub refresh operations
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct KeyedItem {
    pub key: String,
    pub version: u64,
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
    /// Transport encoding for `data` field (always base64 for backward compatibility)
    pub data_encoding: Option<DataEncoding>,
    /// Optional decoded JSON representation when payload is valid JSON
    pub raw_json: Option<serde_json::Value>,
    /// Optional stream offset from Centrifugo publication
    pub offset: Option<u64>,
    /// Optional publisher info
    pub info: Option<ClientInfoData>,
    /// Optional publication tags
    pub tags: Option<std::collections::HashMap<String, String>>,
    /// Unix timestamp of the publication
    pub timestamp: i64,
}

/// Publisher/client information attached to publications.
#[derive(Debug, Deserialize, Serialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ClientInfoData {
    pub client: String,
    pub user: String,
    pub conn_info: String,
    pub chan_info: String,
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

#[cfg(test)]
mod tests {
    use super::*;
    use base64::Engine;
    use base64::engine::general_purpose::STANDARD as BASE64;

    #[test]
    fn start_config_serializes_camel_case_fields() {
        let cfg = StartConfig {
            url: "ws://localhost:8000/connection/websocket".to_string(),
            token: Some("t".to_string()),
            name: Some("client".to_string()),
            version: Some("1.0.0".to_string()),
            channels: vec!["news".to_string()],
            use_protobuf: true,
            read_timeout: Some(5000),
            http_stream_url: None,
            headers: None,
            request_token: None,
        };

        let value = serde_json::to_value(cfg).expect("serialize start config");
        assert!(value.get("useProtobuf").is_some());
        assert!(value.get("readTimeout").is_some());
        assert!(value.get("use_protobuf").is_none());
        assert!(value.get("read_timeout").is_none());
    }

    #[test]
    fn publication_data_serializes_new_fields_in_camel_case() {
        let publication = PublicationData {
            channel: "news".to_string(),
            data: BASE64.encode(br#"{"hello":"world"}"#),
            data_encoding: Some(DataEncoding::Base64),
            raw_json: Some(serde_json::json!({"hello":"world"})),
            offset: Some(12),
            info: Some(ClientInfoData {
                client: "c1".to_string(),
                user: "u1".to_string(),
                conn_info: BASE64.encode("conn"),
                chan_info: BASE64.encode("chan"),
            }),
            tags: Some(std::collections::HashMap::from([(
                "k".to_string(),
                "v".to_string(),
            )])),
            timestamp: 123,
        };

        let value = serde_json::to_value(publication).expect("serialize publication");
        assert!(value.get("dataEncoding").is_some());
        assert!(value.get("rawJson").is_some());
        assert!(value.get("data_encoding").is_none());
        assert!(value.get("raw_json").is_none());
    }

    #[test]
    fn base64_roundtrip_for_publication_payload() {
        let payload = br#"{"kind":"event","value":42}"#;
        let encoded = BASE64.encode(payload);
        let decoded = BASE64.decode(encoded).expect("decode base64");
        assert_eq!(decoded, payload);
    }

    #[test]
    fn publish_request_serializes_extended_fields_in_camel_case() {
        let req = PublishRequest {
            channel: "news".to_string(),
            data: "ZGF0YQ==".to_string(),
            data_encoding: Some(DataEncoding::RawJson),
            r#type: Some(1),
            key: Some("item-1".to_string()),
            removed: Some(true),
        };

        let value = serde_json::to_value(req).expect("serialize publish request");
        assert_eq!(value.get("channel").and_then(|v| v.as_str()), Some("news"));
        assert_eq!(
            value.get("dataEncoding").and_then(|v| v.as_str()),
            Some("rawJson")
        );
        assert_eq!(value.get("type").and_then(|v| v.as_i64()), Some(1));
        assert_eq!(value.get("key").and_then(|v| v.as_str()), Some("item-1"));
        assert_eq!(value.get("removed").and_then(|v| v.as_bool()), Some(true));
    }

    #[test]
    fn sub_refresh_request_serializes_extended_fields_in_camel_case() {
        let req = SubRefreshRequest {
            channel: "news".to_string(),
            token: "token".to_string(),
            items: Some(vec![KeyedItem {
                key: "item-1".to_string(),
                version: 42,
            }]),
            untrack_keys: Some(vec!["item-2".to_string()]),
            r#type: Some(2),
            signature: Some("sig".to_string()),
        };

        let value = serde_json::to_value(req).expect("serialize sub refresh request");
        assert_eq!(value.get("channel").and_then(|v| v.as_str()), Some("news"));
        assert_eq!(value.get("type").and_then(|v| v.as_i64()), Some(2));
        assert_eq!(value.get("signature").and_then(|v| v.as_str()), Some("sig"));
        assert!(value.get("items").and_then(|v| v.as_array()).is_some());
        assert!(
            value
                .get("untrackKeys")
                .and_then(|v| v.as_array())
                .is_some()
        );
    }
}
