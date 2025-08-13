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

pub struct Centrifugo {
    runtime: Arc<TokioRuntime>,
    client_task: Arc<Mutex<Option<JoinHandle<()>>>>,
    client: Arc<Mutex<Option<tokio_centrifuge::client::Client>>>,
    subscriptions: Arc<Mutex<HashMap<String, bool>>>,
}

impl Centrifugo {
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

    pub async fn get_subscriptions(&self) -> Result<HashMap<String, bool>> {
        let guard = self.subscriptions.lock().unwrap_or_else(|e| e.into_inner());
        Ok(guard.clone())
    }

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

    pub async fn add_subscription(&self, channel: String) -> Result<()> {
        // В tokio-centrifuge подписки создаются при подключении
        // Здесь мы просто обновляем статус
        if let Ok(mut guard) = self.subscriptions.lock() {
            guard.insert(channel, true);
        }
        Ok(())
    }

    pub async fn remove_subscription(&self, channel: String) -> Result<()> {
        if let Ok(mut guard) = self.subscriptions.lock() {
            guard.remove(&channel);
        }
        Ok(())
    }

    // Методы, которые не поддерживаются напрямую в tokio-centrifuge
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

    // Методы, которые невозможно реализовать в tokio-centrifuge
    // Они возвращают ошибку NotImplemented
    pub async fn presence(&self, _request: PresenceRequest) -> Result<Vec<String>> {
        Err(crate::error::Error::NotImplemented("Presence not supported in tokio-centrifuge".to_string()))
    }

    pub async fn presence_stats(&self, _request: PresenceStatsRequest) -> Result<(u32, u32)> {
        Err(crate::error::Error::NotImplemented("Presence stats not supported in tokio-centrifuge".to_string()))
    }

    pub async fn history(&self, _request: HistoryRequest) -> Result<Vec<PublicationData>> {
        Err(crate::error::Error::NotImplemented("History not supported in tokio-centrifuge".to_string()))
    }

    pub async fn send(&self, _request: SendRequest) -> Result<()> {
        Err(crate::error::Error::NotImplemented("Send not supported in tokio-centrifuge".to_string()))
    }

    pub async fn refresh(&self, _request: RefreshRequest) -> Result<()> {
        Err(crate::error::Error::NotImplemented("Refresh not supported in tokio-centrifuge".to_string()))
    }

    pub async fn sub_refresh(&self, _request: SubRefreshRequest) -> Result<()> {
        Err(crate::error::Error::NotImplemented("Sub refresh not supported in tokio-centrifuge".to_string()))
    }

    pub async fn ping(&self) -> Result<()> {
        Err(crate::error::Error::NotImplemented("Ping not supported in tokio-centrifuge".to_string()))
    }
}

impl Default for Centrifugo {
    fn default() -> Self {
        Self::new()
  }
}
