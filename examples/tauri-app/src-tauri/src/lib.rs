use tauri_plugin_log::{Target, TargetKind};

// Learn more about Tauri commands at https://v2.tauri.app/develop/calling-rust/#commands
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn start_sockets(window: tauri::Window) -> Result<String, String> {
    // Start sockets through backend
    let config = tauri_plugin_centrifugo::models::StartConfig {
        url: "ws://localhost:8000/connection/websocket".to_string(),
        token: None,
        name: Some("backend-client".to_string()),
        version: Some("1.0.0".to_string()),
        channels: vec!["backend".to_string()],
        use_protobuf: false,
        read_timeout: Some(5000),
        http_stream_url: None,
        headers: None,
        request_token: None,
    };
    
    match tauri_plugin_centrifugo::commands::connect(window, config).await {
        Ok(_) => Ok("Backend sockets started successfully".to_string()),
        Err(e) => Err(format!("Failed to start backend sockets: {}", e))
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, start_sockets])
        .plugin(
            tauri_plugin_log::Builder::new()
                // The default (Trace) forwards every dependency's trace log,
                // JNI calls included, to the webview console.
                .level(tauri_plugin_log::log::LevelFilter::Info)
                .level_for("tauri_plugin_centrifugo", tauri_plugin_log::log::LevelFilter::Debug)
                .level_for("centrifuge", tauri_plugin_log::log::LevelFilter::Debug)
                .target(Target::new(TargetKind::Stdout))
                .target(Target::new(TargetKind::Webview))
                .target(Target::new(TargetKind::LogDir { file_name: Some("app".to_string()) }))
                .build(),
        )
        .plugin(tauri_plugin_centrifugo::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
