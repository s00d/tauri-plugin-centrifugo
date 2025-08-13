use crate::core::Centrifugo;
use crate::models::*;
use crate::Result;
use std::collections::HashMap;
use tauri::{Manager, Runtime, Window};

#[tauri::command]
pub async fn connect<R: Runtime>(
    window: Window<R>,
    config: StartConfig,
) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.connect(window.app_handle().clone(), config).await
}

#[tauri::command]
pub async fn disconnect<R: Runtime>(window: Window<R>) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.disconnect().await
}

#[tauri::command]
pub async fn set_token<R: Runtime>(
    window: Window<R>,
    token: String,
) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.set_token(token).await
}

#[tauri::command]
pub async fn publish<R: Runtime>(
    window: Window<R>,
    request: PublishRequest,
) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.publish(request).await
}

#[tauri::command]
pub async fn rpc<R: Runtime>(
    window: Window<R>,
    request: RpcRequest,
) -> Result<String> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.rpc(request).await
}

#[tauri::command]
pub async fn presence<R: Runtime>(
    window: Window<R>,
    request: PresenceRequest,
) -> Result<Vec<String>> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.presence(request).await
}

#[tauri::command]
pub async fn presence_stats<R: Runtime>(
    window: Window<R>,
    request: PresenceStatsRequest,
) -> Result<(u32, u32)> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.presence_stats(request).await
}

#[tauri::command]
pub async fn history<R: Runtime>(
    window: Window<R>,
    request: HistoryRequest,
) -> Result<Vec<PublicationData>> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.history(request).await
}

#[tauri::command]
pub async fn send<R: Runtime>(
    window: Window<R>,
    request: SendRequest,
) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.send(request).await
}

#[tauri::command]
pub async fn refresh<R: Runtime>(
    window: Window<R>,
    request: RefreshRequest,
) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.refresh(request).await
}

#[tauri::command]
pub async fn sub_refresh<R: Runtime>(
    window: Window<R>,
    request: SubRefreshRequest,
) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.sub_refresh(request).await
}

#[tauri::command]
pub async fn ping<R: Runtime>(window: Window<R>) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.ping().await
}

#[tauri::command]
pub async fn is_connected<R: Runtime>(window: Window<R>) -> Result<bool> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.is_connected().await
}

#[tauri::command]
pub async fn get_subscriptions<R: Runtime>(window: Window<R>) -> Result<HashMap<String, bool>> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.get_subscriptions().await
}

#[tauri::command]
pub async fn get_connection_state<R: Runtime>(window: Window<R>) -> Result<String> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.get_connection_state().await
}

#[tauri::command]
pub async fn add_subscription<R: Runtime>(
    window: Window<R>,
    channel: String,
) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.add_subscription(channel).await
}

#[tauri::command]
pub async fn remove_subscription<R: Runtime>(
    window: Window<R>,
    channel: String,
) -> Result<()> {
    let centrifugo = window.state::<Centrifugo>();
    centrifugo.remove_subscription(channel).await
}
