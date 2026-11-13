//! # Core Centrifugo Client
//!
//! State manager for the plugin, built on the official
//! [`centrifuge-client`](https://github.com/centrifugal/centrifuge-rust) SDK.
//! All connection and channel events are forwarded to the frontend as Tauri
//! events with the `centrifugo:` prefix.

use crate::error::{Error, Result};
use crate::models::*;
use base64::Engine;
use base64::engine::general_purpose::STANDARD as BASE64;
use centrifuge::{
    Client, ClientEvent, ClientInfo, DeltaType, HistoryOptions, Protocol, Publication, State,
    StreamPosition, SubState, Subscription, SubscriptionEvent, TokenError, TransportEndpoint,
};
use futures_util::StreamExt;
use serde_json::{Value, json};
use std::collections::HashMap;
use std::sync::Arc;
use std::time::Duration;
use tauri::{AppHandle, Emitter, Runtime};
use tokio::sync::{RwLock, oneshot};

type Waiters = Arc<RwLock<HashMap<String, oneshot::Sender<String>>>>;

/// Key of the connection token waiter in [`Centrifugo::token_waiters`].
const CONNECTION: &str = "";

fn decode_payload(data: &str, encoding: Option<DataEncoding>) -> Result<Vec<u8>> {
    match encoding.unwrap_or(DataEncoding::Base64) {
        DataEncoding::Base64 => Ok(BASE64.decode(data)?),
        DataEncoding::RawJson => {
            let _: Value = serde_json::from_str(data)?;
            Ok(data.as_bytes().to_vec())
        }
    }
}

fn now() -> i64 {
    std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map_or(0, |d| d.as_millis() as i64)
}

fn info_json(info: &ClientInfo) -> ClientInfoData {
    ClientInfoData {
        client: info.client.clone(),
        user: info.user.clone(),
        conn_info: BASE64.encode(info.conn_info.as_deref().unwrap_or_default()),
        chan_info: BASE64.encode(info.chan_info.as_deref().unwrap_or_default()),
    }
}

fn publication_data(channel: &str, p: &Publication) -> PublicationData {
    PublicationData {
        channel: p.channel.clone().unwrap_or_else(|| channel.to_string()),
        data: BASE64.encode(&p.data),
        data_encoding: Some(DataEncoding::Base64),
        raw_json: serde_json::from_slice::<Value>(&p.data).ok(),
        offset: Some(p.offset),
        info: p.info.as_ref().map(info_json),
        tags: Some(p.tags.clone()),
        timestamp: p.time.unwrap_or_else(now),
    }
}

/// Asks the frontend for a token (`centrifugo:<event>`) and waits for
/// `provide_token` / `sub_refresh` to answer under `key`. No timeout, as in
/// centrifuge-js: the SDK ignores the result if `disconnect()` ends the
/// attempt. An empty answer means "no token" (anonymous on connect,
/// unauthorized on refresh / for a subscription).
async fn request_token<R: Runtime>(
    app: AppHandle<R>,
    waiters: Waiters,
    key: String,
    event: &'static str,
) -> std::result::Result<String, TokenError> {
    let (tx, rx) = oneshot::channel();
    waiters.write().await.insert(key.clone(), tx);
    let payload = if key.is_empty() {
        json!({ "ts": now() })
    } else {
        json!({ "channel": key, "ts": now() })
    };
    let _ = app.emit(event, payload);
    // The sender is dropped when a newer request replaces this one or on
    // disconnect: retry (with backoff), never treat it as "unauthorized".
    rx.await
        .map_err(|_| TokenError::Other("token request superseded".into()))
}

/// TLS for Android without the platform verifier's JNI setup: Mozilla's
/// roots. ponytail: user-installed CAs are not trusted; pass the SDK's
/// `android::init_with_env` path if an app needs them.
#[cfg(target_os = "android")]
fn android_tls() -> centrifuge::TlsConfig {
    let roots = rustls::RootCertStore {
        roots: webpki_roots::TLS_SERVER_ROOTS.to_vec(),
    };
    let cfg = rustls::ClientConfig::builder()
        .with_root_certificates(roots)
        .with_no_client_auth();
    centrifuge::TlsConfig::rustls_client_config(cfg)
}

/// Main Centrifugo state managed by Tauri.
pub struct Centrifugo {
    client: Arc<RwLock<Option<Client>>>,
    token_waiters: Waiters,
}

impl Centrifugo {
    pub fn new() -> Self {
        Self {
            client: Arc::new(RwLock::new(None)),
            token_waiters: Arc::new(RwLock::new(HashMap::new())),
        }
    }

    async fn client(&self) -> Result<Client> {
        self.client.read().await.clone().ok_or(Error::NotConnected)
    }

    /// Creates the client, subscribes to `config.channels` and starts
    /// connecting. Returns at once; progress arrives as events. On an invalid
    /// config the previous client is kept.
    pub async fn connect<R: Runtime>(&self, app: AppHandle<R>, config: StartConfig) -> Result<()> {
        let mut endpoints = vec![TransportEndpoint::websocket(config.url)];
        if let Some(url) = config.http_stream_url {
            endpoints.push(TransportEndpoint::http_stream(url));
        }
        let mut builder = Client::builder_with_transports(endpoints)
            .runtime(tauri::async_runtime::handle().inner().clone())
            .protocol(if config.use_protobuf {
                Protocol::Protobuf
            } else {
                Protocol::Json
            });
        #[cfg(target_os = "android")]
        {
            builder = builder.tls(android_tls());
        }
        // The SDK calls `get_token` when the token is empty, and before it
        // expires. Install it only when the app uses tokens, so anonymous
        // connections never wait for the frontend.
        let request_token_cb = config.token.is_some() || config.request_token.unwrap_or(false);
        if let Some(token) = config.token {
            builder = builder.token(token);
        }
        if let Some(name) = config.name {
            builder = builder.name(name);
        }
        if let Some(version) = config.version {
            builder = builder.version(version);
        }
        if let Some(headers) = config.headers {
            let mut map = http::HeaderMap::new();
            for (k, v) in headers {
                let name = http::HeaderName::try_from(k.as_str())
                    .map_err(|e| Error::RequestError(format!("header {k}: {e}")))?;
                let value = http::HeaderValue::try_from(v.as_str())
                    .map_err(|e| Error::RequestError(format!("header {k}: {e}")))?;
                map.insert(name, value);
            }
            builder = builder.http_headers(map);
        }
        if let Some(ms) = config.read_timeout {
            builder = builder.timeout(Duration::from_millis(ms));
        }
        if request_token_cb {
            let (token_app, waiters) = (app.clone(), self.token_waiters.clone());
            builder = builder.get_token(move |_| {
                let fut = request_token(
                    token_app.clone(),
                    waiters.clone(),
                    CONNECTION.into(),
                    "centrifugo:need_token",
                );
                async move { fut.await.map(Some) }
            });
        }
        let client = builder.build()?;

        // A channel listed twice is subscribed once.
        let mut channels = config.channels;
        channels.sort();
        channels.dedup();
        for channel in channels {
            let _ = self.subscribe(&app, &client, SubscribeOptions::channel(channel))?;
        }

        let old = self.client.write().await.take();
        if let Some(old) = old {
            old.close().await;
        }
        forward_client_events(app.clone(), &client);
        client.connect()?;
        *self.client.write().await = Some(client);
        Ok(())
    }

    fn subscribe<R: Runtime>(
        &self,
        app: &AppHandle<R>,
        client: &Client,
        opts: SubscribeOptions,
    ) -> Result<Subscription> {
        let mut builder = client
            .new_subscription(opts.channel.clone())
            .recoverable(opts.recoverable.unwrap_or(false))
            .join_leave(opts.join_leave.unwrap_or(false))
            .positioned(opts.positioned.unwrap_or(false));
        if opts.delta.unwrap_or(false) {
            builder = builder.delta(DeltaType::Fossil);
        }
        if let Some(pos) = opts.since {
            builder = builder.since(StreamPosition::new(pos.offset, pos.epoch));
        }
        if let Some(token) = opts.token {
            // Private channel: when the token expires, ask the frontend for a
            // new one (`centrifugo:need_sub_token`, answered by `sub_refresh`).
            let (token_app, waiters) = (app.clone(), self.token_waiters.clone());
            builder = builder.token(token).get_token(move |ctx| {
                request_token(
                    token_app.clone(),
                    waiters.clone(),
                    ctx.channel,
                    "centrifugo:need_sub_token",
                )
            });
        }
        let sub = builder.build()?;
        forward_subscription_events(app.clone(), &sub);
        sub.subscribe();
        Ok(sub)
    }

    pub async fn disconnect(&self) -> Result<()> {
        let client = self.client.write().await.take();
        if let Some(client) = client {
            client.close().await;
        }
        self.token_waiters.write().await.clear();
        Ok(())
    }

    /// Replaces the connection token used from the next connect attempt.
    pub async fn set_token(&self, token: String) -> Result<()> {
        self.client().await?.set_token(token);
        Ok(())
    }

    pub async fn publish(&self, request: PublishRequest) -> Result<()> {
        if request.r#type.unwrap_or(0) != 0
            || request.key.as_deref().is_some_and(|k| !k.is_empty())
            || request.removed.unwrap_or(false)
        {
            return Err(Error::Unsupported("map publish (type/key/removed)"));
        }
        let data = decode_payload(&request.data, request.data_encoding)?;
        Ok(self.client().await?.publish(&request.channel, data).await?)
    }

    pub async fn is_connected(&self) -> Result<bool> {
        Ok(self
            .client
            .read()
            .await
            .as_ref()
            .is_some_and(|c| c.state() == State::Connected))
    }

    /// Channels added through this plugin; `true` when currently subscribed.
    pub async fn get_subscriptions(&self) -> Result<HashMap<String, bool>> {
        Ok(match self.client.read().await.as_ref() {
            Some(c) => c
                .subscriptions()
                .into_iter()
                .map(|(ch, s)| (ch, s.state() == SubState::Subscribed))
                .collect(),
            None => HashMap::new(),
        })
    }

    pub async fn get_connection_state(&self) -> Result<String> {
        let state = self.client.read().await.as_ref().map(Client::state);
        Ok(match state {
            Some(State::Connecting) => "connecting",
            Some(State::Connected) => "connected",
            Some(State::Closed) => "closed",
            _ => "disconnected",
        }
        .to_string())
    }

    pub async fn add_subscription<R: Runtime>(
        &self,
        app: AppHandle<R>,
        channel: String,
    ) -> Result<()> {
        self.add_subscription_with_options(app, SubscribeOptions::channel(channel))
            .await
    }

    pub async fn add_subscription_with_options<R: Runtime>(
        &self,
        app: AppHandle<R>,
        opts: SubscribeOptions,
    ) -> Result<()> {
        let client = self.client().await?;
        self.subscribe(&app, &client, opts)?;
        Ok(())
    }

    pub async fn remove_subscription<R: Runtime>(
        &self,
        _app: AppHandle<R>,
        channel: String,
    ) -> Result<()> {
        let client = self.client().await?;
        if let Some(sub) = client.get_subscription(&channel) {
            sub.unsubscribe();
            client.remove_subscription(&sub)?;
        }
        self.token_waiters.write().await.remove(&channel);
        Ok(())
    }

    pub async fn remove_all_subscriptions<R: Runtime>(&self, app: AppHandle<R>) -> Result<()> {
        let channels: Vec<String> = self.client().await?.subscriptions().into_keys().collect();
        for channel in channels {
            self.remove_subscription(app.clone(), channel).await?;
        }
        Ok(())
    }

    pub async fn rpc(&self, request: RpcRequest) -> Result<String> {
        let data = decode_payload(&request.data, request.data_encoding)?;
        let result = self.client().await?.rpc(&request.method, data).await?;
        Ok(BASE64.encode(&result.data))
    }

    pub async fn presence(&self, request: PresenceRequest) -> Result<Vec<String>> {
        let result = self.client().await?.presence(&request.channel).await?;
        Ok(result.clients.into_keys().collect())
    }

    pub async fn presence_stats(&self, request: PresenceStatsRequest) -> Result<(u32, u32)> {
        let result = self
            .client()
            .await?
            .presence_stats(&request.channel)
            .await?;
        Ok((result.num_clients, result.num_users))
    }

    pub async fn history(&self, request: HistoryRequest) -> Result<Vec<PublicationData>> {
        let mut opts = HistoryOptions::new().reverse(request.reverse.unwrap_or(false));
        if let Some(limit) = request.limit {
            opts = opts.limit(limit);
        }
        let result = self.client().await?.history(&request.channel, opts).await?;
        Ok(result
            .publications
            .iter()
            .map(|p| publication_data(&request.channel, p))
            .collect())
    }

    pub async fn send(&self, request: SendRequest) -> Result<()> {
        let data = decode_payload(&request.data, request.data_encoding)?;
        Ok(self.client().await?.send(data).await?)
    }

    /// Answers a pending `need_token` request, or sets the token for the next
    /// connect. The SDK refreshes connection tokens itself via `need_token`.
    pub async fn refresh(&self, request: RefreshRequest) -> Result<()> {
        let client = self.client().await?;
        if let Some(waiter) = self.token_waiters.write().await.remove(CONNECTION) {
            let _ = waiter.send(request.token);
        } else {
            client.set_token(request.token);
        }
        Ok(())
    }

    /// Answers a pending `need_sub_token` request for the channel.
    pub async fn sub_refresh(&self, request: SubRefreshRequest) -> Result<()> {
        if request.r#type.unwrap_or(0) != 0
            || request.items.is_some()
            || request.untrack_keys.is_some()
        {
            return Err(Error::Unsupported("track/untrack sub refresh"));
        }
        self.client().await?;
        let waiter = self.token_waiters.write().await.remove(&request.channel);
        let waiter = waiter.ok_or_else(|| {
            Error::RequestError(format!(
                "No token request in progress for {}",
                request.channel
            ))
        })?;
        let _ = waiter.send(request.token);
        Ok(())
    }

    /// The SDK keeps the connection alive with server pings; this only checks
    /// that the client is connected.
    pub async fn ping(&self) -> Result<()> {
        if self.is_connected().await? {
            Ok(())
        } else {
            Err(Error::NotConnected)
        }
    }

    pub async fn provide_token(&self, token: String) -> Result<()> {
        let waiter = self.token_waiters.write().await.remove(CONNECTION);
        let waiter =
            waiter.ok_or_else(|| Error::RequestError("No token request in progress".into()))?;
        let _ = waiter.send(token);
        Ok(())
    }
}

impl Default for Centrifugo {
    fn default() -> Self {
        Self::new()
    }
}

fn forward_client_events<R: Runtime>(app: AppHandle<R>, client: &Client) {
    let mut events = client.events();
    tauri::async_runtime::spawn(async move {
        while let Some(event) = events.next().await {
            let (name, payload) = match event {
                ClientEvent::Connecting(e) => (
                    "connecting",
                    json!({"ts": now(), "code": e.code, "reason": e.reason}),
                ),
                ClientEvent::Connected(e) => {
                    ("connected", json!({"ts": now(), "client": e.client_id}))
                }
                ClientEvent::Disconnected(e) => (
                    "disconnected",
                    json!({"ts": now(), "code": e.code, "reason": e.reason}),
                ),
                ClientEvent::Error(e) => ("error", json!({"error": e.error.to_string()})),
                ClientEvent::ServerSubscribed(e) => {
                    ("server_subscribed", json!({"channel": e.channel}))
                }
                ClientEvent::ServerSubscribing(e) => {
                    ("server_subscribing", json!({"channel": e.channel}))
                }
                ClientEvent::ServerUnsubscribed(e) => {
                    ("server_unsubscribed", json!({"channel": e.channel}))
                }
                ClientEvent::ServerPublication(e) => (
                    "server_publication",
                    json!(publication_data(&e.channel, &e.publication)),
                ),
                ClientEvent::ServerJoin(e) => (
                    "server_join",
                    json!({"channel": e.channel, "client": e.info.client, "user": e.info.user}),
                ),
                ClientEvent::ServerLeave(e) => (
                    "server_leave",
                    json!({"channel": e.channel, "client": e.info.client, "user": e.info.user}),
                ),
                _ => continue,
            };
            let _ = app.emit(&format!("centrifugo:{name}"), payload);
        }
    });
}

fn forward_subscription_events<R: Runtime>(app: AppHandle<R>, sub: &Subscription) {
    let channel = sub.channel().to_string();
    let mut events = sub.events();
    tauri::async_runtime::spawn(async move {
        while let Some(event) = events.next().await {
            let (name, payload) = match event {
                SubscriptionEvent::Subscribing(e) => (
                    "subscribing",
                    json!({"channel": channel, "code": e.code, "reason": e.reason}),
                ),
                SubscriptionEvent::Subscribed(e) => {
                    let pos = e.stream_position.map(|p| StreamPositionData {
                        offset: p.offset,
                        epoch: p.epoch,
                    });
                    let payload = json!({
                        "channel": channel,
                        "wasRecovering": e.was_recovering,
                        "recovered": e.recovered,
                        "streamPosition": pos,
                    });
                    ("subscribed", payload)
                }
                SubscriptionEvent::Unsubscribed(e) => (
                    "unsubscribed",
                    json!({"channel": channel, "code": e.code, "reason": e.reason}),
                ),
                SubscriptionEvent::Publication(e) => (
                    "publication",
                    json!(publication_data(&channel, &e.publication)),
                ),
                SubscriptionEvent::Join(e) => (
                    "join",
                    json!({"channel": channel, "info": info_json(&e.info)}),
                ),
                SubscriptionEvent::Leave(e) => (
                    "leave",
                    json!({"channel": channel, "info": info_json(&e.info)}),
                ),
                SubscriptionEvent::Error(e) => (
                    "error",
                    json!({"channel": channel, "error": e.error.to_string()}),
                ),
                _ => continue,
            };
            let _ = app.emit(&format!("centrifugo:{name}"), payload);
        }
    });
}
