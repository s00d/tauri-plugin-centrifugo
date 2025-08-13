//! # Core Centrifugo Client
//!
//! This module contains the core logic for managing Centrifugo connections,
//! subscriptions, and real-time communication. It serves as the central
//! state manager for the plugin.
//!
//! ## Architecture
//!
//! The `Centrifugo` struct manages:
//! - WebSocket connection to Centrifugo server
//! - Channel subscriptions and their states
//! - Event emission to the frontend
//! - Connection lifecycle management
//!
//! ## State Management
//!
//! The client uses `Arc<Mutex<Option<Client>>>` to provide thread-safe
//! access to the tokio-centrifuge client across multiple async operations.
//!
//! ## Event System
//!
//! All connection state changes and channel events are emitted to the
//! frontend through Tauri's event system using the `centrifugo:` prefix.
//!
//! ## Error Handling
//!
//! Methods return `Result<T>` with custom error types that provide
//! meaningful error messages for debugging and user feedback.

use crate::models::*;
use crate::error::Result;
use base64::engine::general_purpose::STANDARD as BASE64;
use base64::Engine;
use serde_json;
use std::collections::HashMap;
use std::sync::{Arc, Mutex};
use tauri::{AppHandle, Emitter, Runtime};
use tokio::runtime::Runtime as TokioRuntime;
use tokio::task::JoinHandle;

/// Main Centrifugo client for managing connections and subscriptions
///
/// This struct encapsulates all the functionality needed to interact with
/// a Centrifugo server, including connection management, channel subscriptions,
/// and real-time message handling.
///
/// # Thread Safety
///
/// The client uses `Arc<Mutex<Option<Client>>>` to ensure thread-safe access
/// across multiple async operations. The `Mutex` is acquired only when needed
/// and released immediately after use.
///
/// # State Management
///
/// The client maintains internal state for:
/// - Connection status and configuration
/// - Active channel subscriptions
/// - Background task management
/// - Event emission handles
///
/// # Example
///
/// ```rust
/// use tauri_plugin_centrifugo::core::Centrifugo;
///
/// let centrifugo = Centrifugo::new();
/// // The client is ready to be managed by Tauri
/// ```
pub struct Centrifugo {
    runtime: Arc<TokioRuntime>,
    client_task: Arc<Mutex<Option<JoinHandle<()>>>>,
    client: Arc<Mutex<Option<tokio_centrifuge::client::Client>>>,
    subscriptions: Arc<Mutex<HashMap<String, bool>>>,
}

impl Centrifugo {
    /// Create a new Centrifugo client instance
    ///
    /// This method initializes a new client with:
    /// - A dedicated Tokio runtime for async operations
    /// - Thread-safe state containers for client and subscriptions
    /// - Background task management
    ///
    /// # Returns
    ///
    /// A new `Centrifugo` instance ready for connection management.
    ///
    /// # Panics
    ///
    /// This method will panic if it cannot create a Tokio runtime.
    /// This should only happen in environments where Tokio is not supported.
    pub fn new() -> Self {
        let runtime = Arc::new(
            TokioRuntime::new().expect("Failed to create Tokio runtime")
        );
        Self {
            runtime,
            client_task: Arc::new(Mutex::new(None)),
            client: Arc::new(Mutex::new(None)),
            subscriptions: Arc::new(Mutex::new(HashMap::new())),
        }
    }

    /// Establish a connection to Centrifugo server
    ///
    /// This method initializes the WebSocket connection and subscribes to
    /// the specified channels. The connection state is managed internally
    /// and events are emitted to the frontend.
    ///
    /// # Parameters
    ///
    /// - `app`: Tauri app handle for event emission
    /// - `config`: Connection configuration including URL, channels, and options
    ///
    /// # Returns
    ///
    /// - `Ok(())` on successful connection initiation
    /// - `Err(Error)` if connection setup fails
    ///
    /// # Events Emitted
    ///
    /// - `centrifugo:connecting` - Connection attempt started
    /// - `centrifugo:connected` - Connection established
    /// - `centrifugo:subscribed` - Channel subscriptions successful
    /// - `centrifugo:error` - Connection or subscription errors
    ///
    /// # Background Tasks
    ///
    /// This method spawns a background task to manage the connection lifecycle.
    /// The task handles WebSocket communication, event processing, and state updates.
    pub async fn connect<R: Runtime>(
        &self,
        app: AppHandle<R>,
        config: StartConfig,
    ) -> Result<()> {
        // Останавливаем предыдущее подключение, если есть
        if let Ok(mut guard) = self.client_task.lock() {
            if let Some(handle) = guard.take() {
                handle.abort();
            }
        }

        let runtime = self.runtime.clone();
        let client_task = self.client_task.clone();
        let client = self.client.clone();
        let subscriptions = self.subscriptions.clone();
        
        let handle = runtime.spawn(async move {
            Self::run_client(app, config, client, subscriptions).await;
        });

        if let Ok(mut guard) = client_task.lock() {
            *guard = Some(handle);
        }

        Ok(())
    }

    async fn run_client<R: Runtime>(
        app: AppHandle<R>,
        config: StartConfig,
        client: Arc<Mutex<Option<tokio_centrifuge::client::Client>>>,
        subscriptions: Arc<Mutex<HashMap<String, bool>>>,
    ) {
        use tokio_centrifuge::client::Client;
        use tokio_centrifuge::config::Config as Cf;

        let url = if config.use_protobuf {
            format!("{}?format=protobuf", config.url)
        } else {
            config.url.clone()
        };

        let cf_config = if config.use_protobuf {
            Cf::new().use_protobuf()
        } else {
            Cf::new()
        };

        let cf_client = Client::new(&url, cf_config);

        // Настройка callbacks для подключения
        let app_clone = app.clone();
        cf_client.on_connecting(move || {
            println!("DEBUG: on_connecting callback called");
            let _ = app_clone.emit(
                "centrifugo:connecting",
                serde_json::json!({"ts": chrono::Utc::now().timestamp_millis()}),
            );
        });

        let app_clone = app.clone();
        cf_client.on_connected(move || {
            println!("DEBUG: on_connected callback called");
            let _ = app_clone.emit(
                "centrifugo:connected",
                serde_json::json!({"ts": chrono::Utc::now().timestamp_millis()}),
            );
        });

        let app_clone = app.clone();
        cf_client.on_disconnected(move || {
            println!("DEBUG: on_disconnected callback called");
            let _ = app_clone.emit(
                "centrifugo:disconnected",
                serde_json::json!({"ts": chrono::Utc::now().timestamp_millis()}),
            );
        });

        let app_clone = app.clone();
        cf_client.on_error(move |err| {
            println!("DEBUG: on_error callback called with error: {:?}", err);
            let _ = app_clone.emit(
                "centrifugo:error",
                serde_json::json!({"error": format!("{:?}", err)}),
            );
        });

        // Сохраняем клиент
        if let Ok(mut guard) = client.lock() {
            *guard = Some(cf_client.clone());
        }

        // Подключаемся к серверу
        let _ = cf_client.connect().await;

        // Подписываемся на каналы
        for channel in &config.channels {
            let _ = app.emit(
                "centrifugo:subscribing",
                serde_json::json!({"channel": channel}),
            );
            
            let subscription = cf_client.new_subscription(channel);
            
            let app_clone = app.clone();
            let channel_name = channel.clone();
            subscription.on_subscribed(move || {
                let _ = app_clone.emit(
                    "centrifugo:subscribed",
                    serde_json::json!({"channel": channel_name}),
                );
            });

            let app_clone = app.clone();
            let channel_name = channel.clone();
            subscription.on_unsubscribed(move || {
                let _ = app_clone.emit(
                    "centrifugo:unsubscribed",
                    serde_json::json!({"channel": channel_name}),
                );
            });

            let app_clone = app.clone();
            let channel_name = channel.clone();
            subscription.on_subscribing(move || {
                let _ = app_clone.emit(
                    "centrifugo:subscribing",
                    serde_json::json!({"channel": channel_name}),
                );
            });

            let app_clone = app.clone();
            let channel_name = channel.clone();
            subscription.on_publication(move |data| {
                let _ = app_clone.emit(
                    "centrifugo:publication",
                    serde_json::json!({
                        "channel": channel_name,
                        "data": BASE64.encode(&data.data)
                    }),
                );
            });

            // Обновляем статус подписки
            if let Ok(mut guard) = subscriptions.lock() {
                guard.insert(channel.clone(), true);
            }

            let _ = subscription.subscribe().await;
        }
    }

    /// Close the connection to Centrifugo server
    ///
    /// This method gracefully closes the WebSocket connection and cleans up
    /// all subscriptions and event listeners. It also aborts any running
    /// background tasks related to the connection.
    ///
    /// # Returns
    ///
    /// - `Ok(())` on successful disconnection
    /// - `Err(Error)` if disconnection fails
    ///
    /// # Cleanup Operations
    ///
    /// - Aborts background connection tasks
    /// - Disconnects the tokio-centrifuge client
    /// - Clears all channel subscriptions
    /// - Resets internal client state
    ///
    /// # Events Emitted
    ///
    /// - `centrifugo:disconnected` - Connection closed
    pub async fn disconnect(&self) -> Result<()> {
        if let Ok(mut guard) = self.client_task.lock() {
            if let Some(handle) = guard.take() {
                handle.abort();
            }
        }
        let client = {
            let client_guard = self.client.lock().unwrap_or_else(|e| e.into_inner());
            if let Some(client) = &*client_guard {
                Some(client.clone())
            } else {
                None
            }
        };
        if let Some(client) = client {
            let _ = client.disconnect().await;
        }
        if let Ok(mut guard) = self.client.lock() {
            *guard = None;
        }
        if let Ok(mut guard) = self.subscriptions.lock() {
            guard.clear();
        }
        Ok(())
    }

    /// Set or update the authentication token
    ///
    /// This method allows updating the JWT token during an active session
    /// without reconnecting to the server. The token is used for subsequent
    /// operations that require authentication.
    ///
    /// # Parameters
    ///
    /// - `token`: New JWT authentication token
    ///
    /// # Returns
    ///
    /// - `Ok(())` on successful token update
    /// - `Err(Error::NotConnected)` if no active connection exists
    ///
    /// # Requirements
    ///
    /// - Must have an active connection to Centrifugo server
    /// - Token should be a valid JWT string
    ///
    /// # Usage
    ///
    /// This is useful for token refresh scenarios where you want to
    /// update authentication without disrupting the current connection.
    pub async fn set_token(&self, token: String) -> Result<()> {
        let client = {
            let client_guard = self.client.lock().unwrap_or_else(|e| e.into_inner());
            if let Some(client) = &*client_guard {
                Some(client.clone())
            } else {
                None
            }
        };
        
        if let Some(client) = client {
            client.set_token(token);
            Ok(())
        } else {
            Err(crate::error::Error::NotConnected)
        }
    }

    /// Publish a message to a specific channel
    ///
    /// This method sends a message to all clients subscribed to the specified
    /// channel. The message data should be base64-encoded and will be
    /// decoded before sending to the server.
    ///
    /// # Parameters
    ///
    /// - `request`: Publish request containing channel name and base64-encoded data
    ///
    /// # Returns
    ///
    /// - `Ok(())` on successful publication
    /// - `Err(Error::NotConnected)` if not connected to server
    /// - `Err(Error::Base64Error)` if data decoding fails
    /// - `Err(Error::RequestError)` if server request fails
    ///
    /// # Requirements
    ///
    /// - Must be connected to Centrifugo server
    /// - Channel must be subscribed to
    /// - Data must be valid base64-encoded content
    ///
    /// # Data Processing
    ///
    /// The method automatically decodes base64 data before sending to the server,
    /// ensuring proper binary data transmission.
    pub async fn publish(&self, request: PublishRequest) -> Result<()> {
        let client = {
            let client_guard = self.client.lock().unwrap_or_else(|e| e.into_inner());
            if let Some(client) = &*client_guard {
                Some(client.clone())
            } else {
                None
            }
        };
        
        if let Some(client) = client {
            // Проверяем состояние соединения
            if client.state() != tokio_centrifuge::client::State::Connected {
                return Err(crate::error::Error::NotConnected);
            }
            
            let data = BASE64.decode(&request.data)?;
            client.publish(&request.channel, data).await?;
            Ok(())
        } else {
            Err(crate::error::Error::NotConnected)
        }
    }

    /// Check if currently connected to Centrifugo server
    ///
    /// This method returns the current connection status by checking
    /// the tokio-centrifuge client state. It does not establish a
    /// connection, only reports the current status.
    ///
    /// # Returns
    ///
    /// - `Ok(true)` if connected and ready for operations
    /// - `Ok(false)` if disconnected or no client exists
    /// - `Err(Error)` if status check fails
    ///
    /// # State Check
    ///
    /// The method checks if the client exists and if its state
    /// is `tokio_centrifuge::client::State::Connected`.
    ///
    /// # Usage
    ///
    /// Use this method before attempting operations that require
    /// an active connection, such as publishing messages or RPC calls.
    pub async fn is_connected(&self) -> Result<bool> {
        let client = {
            let client_guard = self.client.lock().unwrap_or_else(|e| e.into_inner());
            if let Some(client) = &*client_guard {
                Ok(client.state() == tokio_centrifuge::client::State::Connected)
            } else {
                Ok(false)
            }
        };
        
        client
    }

    /// Get current channel subscriptions
    ///
    /// This method returns a map of channel names to their subscription status.
    /// The status indicates whether the channel is actively subscribed to
    /// and receiving messages.
    ///
    /// # Returns
    ///
    /// - `Ok(HashMap<String, bool>)` - Channel name to subscription status mapping
    /// - `Err(Error)` if subscription retrieval fails
    ///
    /// # Subscription Status
    ///
    /// - `true` - Channel is subscribed to and active
    /// - `false` - Channel is not subscribed to
    ///
    /// # Thread Safety
    ///
    /// The method safely accesses the shared subscription state using
    /// proper locking mechanisms to prevent race conditions.
    ///
    /// # Usage
    ///
    /// Use this method to monitor which channels are currently active
    /// and to provide user feedback about subscription status.
    pub async fn get_subscriptions(&self) -> Result<HashMap<String, bool>> {
        let guard = self.subscriptions.lock().unwrap_or_else(|e| e.into_inner());
        Ok(guard.clone())
    }

    /// Get detailed connection state
    ///
    /// This method returns a human-readable string representation of the
    /// current connection state. It provides more detailed information
    /// than the boolean `is_connected()` method.
    ///
    /// # Returns
    ///
    /// - `Ok(String)` - Connection state description
    /// - `Err(Error)` if state retrieval fails
    ///
    /// # State Values
    ///
    /// - `"connected"` - Successfully connected and ready
    /// - `"connecting"` - Connection attempt in progress
    /// - `"disconnected"` - Not connected or connection failed
    ///
    /// # State Source
    ///
    /// The state is retrieved from the tokio-centrifuge client's
    /// internal state machine, providing accurate real-time information.
    ///
    /// # Usage
    ///
    /// Use this method for detailed connection monitoring and
    /// user interface state display.
    pub async fn get_connection_state(&self) -> Result<String> {
        let client = {
            let client_guard = self.client.lock().unwrap_or_else(|e| e.into_inner());
            if let Some(client) = &*client_guard {
                match client.state() {
                    tokio_centrifuge::client::State::Disconnected => Ok("disconnected".to_string()),
                    tokio_centrifuge::client::State::Connecting => Ok("connecting".to_string()),
                    tokio_centrifuge::client::State::Connected => Ok("connected".to_string()),
                }
            } else {
                Ok("disconnected".to_string())
            }
        };
        
        client
    }

    /// Add a new channel subscription
    ///
    /// This method adds a channel to the internal subscription tracking.
    /// Note that in tokio-centrifuge, subscriptions are created during
    /// the initial connection process, so this method only updates
    /// the internal state tracking.
    ///
    /// # Parameters
    ///
    /// - `channel`: Channel name to subscribe to
    ///
    /// # Returns
    ///
    /// - `Ok(())` on successful subscription addition
    /// - `Err(Error)` if subscription addition fails
    ///
    /// # Implementation Note
    ///
    /// This method only updates internal state tracking. For actual
    /// channel subscriptions, use the `connect()` method with the
    /// desired channels in the configuration.
    ///
    /// # Thread Safety
    ///
    /// The method safely updates the shared subscription state using
    /// proper locking mechanisms.
    pub async fn add_subscription(&self, channel: String) -> Result<()> {
        // В tokio-centrifuge подписки создаются при подключении
        // Здесь мы просто обновляем статус
        if let Ok(mut guard) = self.subscriptions.lock() {
            guard.insert(channel, true);
        }
        Ok(())
    }

    /// Remove a channel subscription
    ///
    /// This method removes a channel from the internal subscription tracking.
    /// It updates the local state but does not affect the actual
    /// tokio-centrifuge subscription.
    ///
    /// # Parameters
    ///
    /// - `channel`: Channel name to unsubscribe from
    ///
    /// # Returns
    ///
    /// - `Ok(())` on successful subscription removal
    /// - `Err(Error)` if subscription removal fails
    ///
    /// # Implementation Note
    ///
    /// This method only updates internal state tracking. For actual
    /// channel unsubscriptions, you may need to reconnect with a
    /// modified channel list.
    ///
    /// # Thread Safety
    ///
    /// The method safely updates the shared subscription state using
    /// proper locking mechanisms.
    pub async fn remove_subscription(&self, channel: String) -> Result<()> {
        if let Ok(mut guard) = self.subscriptions.lock() {
            guard.remove(&channel);
        }
        Ok(())
    }

    /// Execute an RPC method on the Centrifugo server
    ///
    /// This method sends an RPC request to the server and waits for the response.
    /// The request data should be base64-encoded and will be decoded before
    /// sending to the server.
    ///
    /// # Parameters
    ///
    /// - `request`: RPC request containing method name and base64-encoded parameters
    ///
    /// # Returns
    ///
    /// - `Ok(String)` containing the base64-encoded response data
    /// - `Err(Error::NotConnected)` if not connected to server
    /// - `Err(Error::Base64Error)` if data decoding fails
    /// - `Err(Error::RequestError)` if RPC execution fails
    ///
    /// # Requirements
    ///
    /// - Must be connected to Centrifugo server
    /// - Method name must be valid
    /// - Data must be valid base64-encoded content
    ///
    /// # Data Processing
    ///
    /// The method automatically decodes base64 request data and encodes
    /// the response data, ensuring proper binary data handling.
    ///
    /// # Usage
    ///
    /// Use this method for server-side method execution, such as
    /// user authentication, data retrieval, or business logic operations.
    ///
    /// # Example
    ///
    /// ```rust
    /// use tauri_plugin_centrifugo::models::RpcRequest;
    /// use tauri_plugin_centrifugo::core::Centrifugo;
    ///
    /// # async fn example() -> Result<(), Box<dyn std::error::Error>> {
    /// let client = Centrifugo::new();
    /// let request = RpcRequest {
    ///     method: "getUserInfo".to_string(),
    ///     data: "eyJ1c2VySWQiOiAxMjN9".to_string(), // base64 encoded
    /// };
    /// // Note: client must be connected before calling rpc
    /// // let response = client.rpc(request).await?;
    /// # Ok(())
    /// # }
    /// ```
    pub async fn rpc(&self, request: RpcRequest) -> Result<String> {
        let client = {
            let client_guard = self.client.lock().unwrap_or_else(|e| e.into_inner());
            if let Some(client) = &*client_guard {
                Some(client.clone())
            } else {
                None
            }
        };
        
        if let Some(client) = client {
            // Проверяем состояние соединения
            if client.state() != tokio_centrifuge::client::State::Connected {
                return Err(crate::error::Error::NotConnected);
            }
            
            let data = BASE64.decode(&request.data)?;
            let response = client.rpc(&request.method, data).await?;
            Ok(BASE64.encode(&response))
        } else {
            Err(crate::error::Error::NotConnected)
        }
    }

    /// Get presence information for a channel
    ///
    /// **Note**: This method is marked as `NotImplemented` because it's not
    /// directly supported by the tokio-centrifuge library.
    ///
    /// # Parameters
    ///
    /// - `_request`: Presence request containing channel name (unused)
    ///
    /// # Returns
    ///
    /// - `Err(Error::NotImplemented)` - Feature not supported
    ///
    /// # Implementation Status
    ///
    /// The tokio-centrifuge library does not provide direct access to
    /// presence information. This would require server-side support
    /// or alternative implementation approaches.
    ///
    /// # Alternative Solutions
    ///
    /// - Use server-side presence tracking
    /// - Implement custom presence logic
    /// - Use alternative Centrifugo client libraries
    ///
    /// # Future Considerations
    ///
    /// This method may be implemented in future versions if tokio-centrifuge
    /// adds support for presence functionality.
    pub async fn presence(&self, _request: PresenceRequest) -> Result<Vec<String>> {
        Err(crate::error::Error::NotImplemented("Presence not supported in tokio-centrifuge".to_string()))
    }

    /// Get presence statistics for a channel
    ///
    /// **Note**: This method is marked as `NotImplemented` because it's not
    /// directly supported by the tokio-centrifuge library.
    ///
    /// # Parameters
    ///
    /// - `_request`: Presence stats request containing channel name (unused)
    ///
    /// # Returns
    ///
    /// - `Err(Error::NotImplemented)` - Feature not supported
    ///
    /// # Implementation Status
    ///
    /// The tokio-centrifuge library does not provide direct access to
    /// presence statistics. This would require server-side support
    /// or alternative implementation approaches.
    ///
    /// # Alternative Solutions
    ///
    /// - Use server-side presence tracking
    /// - Implement custom presence logic
    /// - Use alternative Centrifugo client libraries
    ///
    /// # Future Considerations
    ///
    /// This method may be implemented in future versions if tokio-centrifuge
    /// adds support for presence functionality.
    pub async fn presence_stats(&self, _request: PresenceStatsRequest) -> Result<(u32, u32)> {
        Err(crate::error::Error::NotImplemented("Presence stats not supported in tokio-centrifuge".to_string()))
    }

    /// Get message history for a channel
    ///
    /// **Note**: This method is marked as `NotImplemented` because it's not
    /// directly supported by the tokio-centrifuge library.
    ///
    /// # Parameters
    ///
    /// - `_request`: History request with channel and filtering options (unused)
    ///
    /// # Returns
    ///
    /// - `Err(Error::NotImplemented)` - Feature not supported
    ///
    /// # Implementation Status
    ///
    /// The tokio-centrifuge library does not provide direct access to
    /// message history. This would require server-side support
    /// or alternative implementation approaches.
    ///
    /// # Alternative Solutions
    ///
    /// - Use server-side history tracking
    /// - Implement custom history logic
    /// - Use alternative Centrifugo client libraries
    ///
    /// # Future Considerations
    ///
    /// This method may be implemented in future versions if tokio-centrifuge
    /// adds support for history functionality.
    pub async fn history(&self, _request: HistoryRequest) -> Result<Vec<PublicationData>> {
        Err(crate::error::Error::NotImplemented("History not supported in tokio-centrifuge".to_string()))
    }

    /// Send a message directly to the server
    ///
    /// **Note**: This method is marked as `NotImplemented` because it's not
    /// directly supported by the tokio-centrifuge library.
    ///
    /// # Parameters
    ///
    /// - `_request`: Send request containing message data (unused)
    ///
    /// # Returns
    ///
    /// - `Err(Error::NotImplemented)` - Feature not supported
    ///
    /// # Implementation Status
    ///
    /// The tokio-centrifuge library does not provide direct access to
    /// server message sending. This would require server-side support
    /// or alternative implementation approaches.
    ///
    /// # Alternative Solutions
    ///
    /// - Use server-side message handling
    /// - Implement custom message logic
    /// - Use alternative Centrifugo client libraries
    ///
    /// # Future Considerations
    ///
    /// This method may be implemented in future versions if tokio-centrifuge
    /// adds support for server message functionality.
    pub async fn send(&self, _request: SendRequest) -> Result<()> {
        Err(crate::error::Error::NotImplemented("Send not supported in tokio-centrifuge".to_string()))
    }

    /// Refresh the authentication token
    ///
    /// **Note**: This method is marked as `NotImplemented` because it's not
    /// directly supported by the tokio-centrifuge library.
    ///
    /// # Parameters
    ///
    /// - `_request`: Refresh request containing new token (unused)
    ///
    /// # Returns
    ///
    /// - `Err(Error::NotImplemented)` - Feature not supported
    ///
    /// # Implementation Status
    ///
    /// The tokio-centrifuge library does not provide direct access to
    /// token refresh functionality. This would require server-side support
    /// or alternative implementation approaches.
    ///
    /// # Alternative Solutions
    ///
    /// - Use server-side token refresh
    /// - Implement custom token logic
    /// - Use alternative Centrifugo client libraries
    ///
    /// # Future Considerations
    ///
    /// This method may be implemented in future versions if tokio-centrifuge
    /// adds support for token refresh functionality.
    pub async fn refresh(&self, _request: RefreshRequest) -> Result<()> {
        Err(crate::error::Error::NotImplemented("Refresh not supported in tokio-centrifuge".to_string()))
    }

    /// Refresh a subscription token for a specific channel
    ///
    /// **Note**: This method is marked as `NotImplemented` because it's not
    /// directly supported by the tokio-centrifuge library.
    ///
    /// # Parameters
    ///
    /// - `_request`: Sub refresh request containing channel and new token (unused)
    ///
    /// # Returns
    ///
    /// - `Err(Error::NotImplemented)` - Feature not supported
    ///
    /// # Implementation Status
    ///
    /// The tokio-centrifuge library does not provide direct access to
    /// subscription token refresh functionality. This would require server-side support
    /// or alternative implementation approaches.
    ///
    /// # Alternative Solutions
    ///
    /// - Use server-side subscription token refresh
    /// - Implement custom subscription logic
    /// - Use alternative Centrifugo client libraries
    ///
    /// # Future Considerations
    ///
    /// This method may be implemented in future versions if tokio-centrifuge
    /// adds support for subscription token refresh functionality.
    pub async fn sub_refresh(&self, _request: SubRefreshRequest) -> Result<()> {
        Err(crate::error::Error::NotImplemented("Sub refresh not supported in tokio-centrifuge".to_string()))
    }

    /// Ping the Centrifugo server
    ///
    /// **Note**: This method is marked as `NotImplemented` because it's not
    /// directly supported by the tokio-centrifuge library.
    ///
    /// # Returns
    ///
    /// - `Err(Error::NotImplemented)` - Feature not supported
    ///
    /// # Implementation Status
    ///
    /// The tokio-centrifuge library does not provide direct access to
    /// ping functionality. This would require server-side support
    /// or alternative implementation approaches.
    ///
    /// # Alternative Solutions
    ///
    /// - Use server-side ping functionality
    /// - Implement custom ping logic
    /// - Use alternative Centrifugo client libraries
    ///
    /// # Future Considerations
    ///
    /// This method may be implemented in future versions if tokio-centrifuge
    /// adds support for ping functionality.
    pub async fn ping(&self) -> Result<()> {
        Err(crate::error::Error::NotImplemented("Ping not supported in tokio-centrifuge".to_string()))
    }
}

/// Default implementation for Centrifugo client
///
/// This implementation provides a convenient way to create a new
/// Centrifugo client instance with default values.
///
/// # Example
///
/// ```rust
/// use tauri_plugin_centrifugo::core::Centrifugo;
///
/// let centrifugo = Centrifugo::default();
/// // Equivalent to Centrifugo::new()
/// ```
impl Default for Centrifugo {
    fn default() -> Self {
        Self::new()
  }
}
