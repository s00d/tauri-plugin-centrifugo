# Tauri Plugin Centrifugo

A Tauri plugin for real-time communication with Centrifugo server using the `tokio-centrifuge` library.

## Features

- **Real-time Communication**: WebSocket-based communication with Centrifugo
- **JSON & Protobuf Support**: Choose between JSON and Protobuf protocols
- **Event-driven Architecture**: Comprehensive event system for connection state and messages
- **Channel Management**: Subscribe/unsubscribe to channels dynamically
- **Authentication**: JWT token support for secure connections
- **Cross-platform**: Works on desktop and mobile platforms

## Installation

### Backend (Rust)

Add the plugin to your `Cargo.toml`:

```toml
[dependencies]
tauri-plugin-centrifugo = "0.1.0"
```

### Frontend (JavaScript/TypeScript)

Install the JavaScript API:

```bash
npm install tauri-plugin-centrifugo-api
# or
pnpm add tauri-plugin-centrifugo-api
```

## Usage

### Backend Setup

Initialize the plugin in your Tauri app:

```rust
use tauri_plugin_centrifugo::init;

fn main() {
    tauri::Builder::default()
        .plugin(init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### Frontend API

#### Basic Connection

```typescript
import { connect, disconnect, isConnected } from 'tauri-plugin-centrifugo-api'

// Connect to Centrifugo server
await connect({
  url: 'ws://localhost:8000/connection/websocket',
  token: 'your-jwt-token', // optional
  name: 'client-name',
  channels: ['channel1', 'channel2'],
  useProtobuf: false,
  readTimeout: 5000
})

// Check connection status
const connected = await isConnected()

// Disconnect
await disconnect()
```

#### Publishing Messages

```typescript
import { helpers } from 'tauri-plugin-centrifugo-api'

// Publish JSON message
await helpers.publishJson('channel-name', {
  message: 'Hello World',
  timestamp: Date.now()
})

// Publish raw data (base64 encoded)
await publish('channel-name', 'base64-encoded-data')
```

#### RPC Calls

```typescript
import { helpers } from 'tauri-plugin-centrifugo-api'

// Execute RPC with JSON data
const result = await helpers.rpcJson('method-name', {
  userId: 123,
  action: 'getInfo'
})

// Execute RPC with raw data
const result = await rpc('method-name', 'base64-encoded-data')
```

#### Event Listeners

```typescript
import { 
  onConnecting, 
  onConnected, 
  onDisconnected, 
  onPublication,
  onSubscribed,
  onUnsubscribed 
} from 'tauri-plugin-centrifugo-api'

// Listen to connection events
const unlistenConnecting = await onConnecting((eventData) => {
  console.log('Connecting...', eventData.payload)
})

const unlistenConnected = await onConnected((eventData) => {
  console.log('Connected!', eventData.payload)
})

const unlistenDisconnected = await onDisconnected((eventData) => {
  console.log('Disconnected:', eventData.payload)
})

// Listen to publications
const unlistenPublication = await onPublication((eventData) => {
  const { channel, data } = eventData.payload
  console.log(`Message on ${channel}:`, data)
})

// Listen to subscription events
const unlistenSubscribed = await onSubscribed((eventData) => {
  console.log('Subscribed to:', eventData.payload.channel)
})

const unlistenUnsubscribed = await onUnsubscribed((eventData) => {
  console.log('Unsubscribed from:', eventData.payload.channel)
})

// Clean up listeners
unlistenConnecting()
unlistenConnected()
unlistenDisconnected()
unlistenPublication()
unlistenSubscribed()
unlistenUnsubscribed()
```

#### Channel Management

```typescript
import { 
  addSubscription, 
  removeSubscription, 
  getSubscriptions 
} from 'tauri-plugin-centrifugo-api'

// Add new subscription
await addSubscription('new-channel')

// Remove subscription
await removeSubscription('channel-name')

// Get all subscriptions
const subscriptions = await getSubscriptions()
```

#### Utility Functions

```typescript
import { utils } from 'tauri-plugin-centrifugo-api'

// Encode data to base64
const encoded = utils.encode('Hello World')

// Decode base64 data
const decoded = utils.decode('SGVsbG8gV29ybGQ=')

// Encode JSON to base64
const jsonEncoded = utils.encodeJson({ message: 'Hello' })

// Decode base64 JSON
const jsonDecoded = utils.decodeJson(jsonEncoded)
```

### Backend Commands

You can also call Centrifugo commands directly from your Rust backend:

```rust
use tauri_plugin_centrifugo::{models::StartConfig, commands::connect};

#[tauri::command]
async fn start_backend_sockets(window: tauri::Window) -> Result<String, String> {
    let config = StartConfig {
        url: "ws://localhost:8000/connection/websocket".to_string(),
        token: None,
        name: Some("backend-client".to_string()),
        version: Some("1.0.0".to_string()),
        channels: vec!["backend".to_string()],
        use_protobuf: false,
        read_timeout: Some(5000),
    };
    
    match connect(window, config).await {
        Ok(_) => Ok("Backend sockets started successfully".to_string()),
        Err(e) => Err(format!("Failed to start backend sockets: {}", e))
    }
}

// Register the command
.invoke_handler(tauri::generate_handler![start_backend_sockets])
```

Then call it from frontend:

```typescript
import { invoke } from '@tauri-apps/api/core'

const result = await invoke<string>('start_backend_sockets')
console.log(result) // "Backend sockets started successfully"
```

## API Reference

### Core Functions

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `connect` | Establish connection to Centrifugo | `StartConfig` | `Promise<void>` |
| `disconnect` | Close connection | - | `Promise<void>` |
| `setToken` | Set authentication token | `string` | `Promise<void>` |
| `publish` | Publish message to channel | `channel: string, data: string` | `Promise<void>` |
| `rpc` | Execute RPC call | `method: string, data: string` | `Promise<any>` |

### Helper Functions

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `helpers.publishJson` | Publish JSON data | `channel: string, data: any` | `Promise<void>` |
| `helpers.rpcJson` | Execute RPC with JSON | `method: string, data: any` | `Promise<any>` |
| `helpers.subscribeToChannel` | Subscribe to channel with message listener | `channel: string, callback: Function` | `Promise<UnlistenFn>` |
| `helpers.subscribeToChannels` | Subscribe to multiple channels | `channels: string[], callback: Function` | `Promise<UnlistenFn[]>` |
| `helpers.waitForConnection` | Wait for connection with timeout | `timeout?: number` | `Promise<boolean>` |
| `helpers.getConnectionStatus` | Get connection status with retry | `retries?: number` | `Promise<string>` |

### Event Listeners

| Function | Description | Callback Parameter |
|----------|-------------|-------------------|
| `onConnecting` | Connection attempt started | `TauriEventWrapper<ConnectionStatus>` |
| `onConnected` | Connection established | `TauriEventWrapper<ConnectionStatus>` |
| `onDisconnected` | Connection closed | `TauriEventWrapper<ConnectionStatus>` |
| `onError` | Connection error | `TauriEventWrapper<ErrorData>` |
| `onSubscribed` | Channel subscription successful | `TauriEventWrapper<ChannelStatus>` |
| `onUnsubscribed` | Channel unsubscription successful | `TauriEventWrapper<ChannelStatus>` |
| `onSubscribing` | Channel subscription attempt | `TauriEventWrapper<ChannelStatus>` |
| `onPublication` | Message received on channel | `TauriEventWrapper<PublicationData>` |
| `onMessage` | Decoded message with channel info | `{ channel: string, data: any }` |
| `onChannelMessage` | Decoded message for specific channel | `any` |
| `onAnyMessage` | Decoded message with timestamp | `{ channel: string, data: any, timestamp: number }` |

### Utility Functions

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `utils.encode` | Encode string to base64 | `string` | `string` |
| `utils.decode` | Decode base64 to string | `string` | `string` |
| `utils.encodeJson` | Encode object to base64 | `any` | `string` |
| `utils.decodeJson` | Decode base64 to object | `string` | `any` |

### Status Functions

| Function | Description | Returns |
|----------|-------------|---------|
| `isConnected` | Check connection status | `Promise<boolean>` |
| `getConnectionState` | Get detailed connection state | `Promise<string>` |
| `getSubscriptions` | Get current subscriptions | `Promise<Record<string, boolean>>` |

### Advanced Functions (NotImplemented)

| Function | Description | Status |
|----------|-------------|---------|
| `presence` | Get presence information for channel | `NotImplemented` |
| `presenceStats` | Get presence statistics for channel | `NotImplemented` |
| `history` | Get message history for channel | `NotImplemented` |
| `send` | Send message to server | `NotImplemented` |
| `refresh` | Refresh authentication token | `NotImplemented` |
| `subRefresh` | Refresh subscription token | `NotImplemented` |
| `ping` | Ping server | `NotImplemented` |

## Configuration

### StartConfig

```typescript
interface StartConfig {
  url: string                    // WebSocket URL
  token?: string                 // JWT authentication token
  name?: string                  // Client name
  version?: string               // Client version
  channels: string[]             // Channels to subscribe to
  useProtobuf: boolean           // Use Protobuf protocol
  readTimeout?: number           // Read timeout in milliseconds
}
```

### Request Interfaces

```typescript
interface PublishRequest {
  channel: string
  data: string                   // base64 encoded data
}

interface RpcRequest {
  method: string
  data: string                   // base64 encoded data
}

interface PresenceRequest {
  channel: string
}

interface PresenceStatsRequest {
  channel: string
}

interface HistoryRequest {
  channel: string
  limit?: number
  since?: string
  reverse?: boolean
}

interface SendRequest {
  data: string                   // base64 encoded data
}

interface RefreshRequest {
  token: string
}

interface SubRefreshRequest {
  channel: string
  token: string
}
```

### Response Interfaces

```typescript
interface PublicationData {
  channel: string
  data: string                   // base64 encoded data
}

interface ConnectionStatus {
  ts: number
}

interface ChannelStatus {
  channel: string
}

interface ErrorData {
  error: string
}

interface RpcResponse {
  method: string
  data: string                   // base64 encoded data
  timestamp: number
}

interface PresenceResponse {
  channel: string
  clients: string[]
  timestamp: number
}

interface PresenceStatsResponse {
  channel: string
  numClients: number
  numUsers: number
  timestamp: number
}

interface HistoryResponse {
  channel: string
  publications: PublicationData[]
  timestamp: number
}

interface PingResponse {
  timestamp: number
}
```

### Event Data Structure

All events use the `TauriEventWrapper` structure:

```typescript
interface TauriEventWrapper<T> {
  event: string
  payload: T
  id: number
}
```

## Advanced Usage Examples

### Message Handling with Decoded Data

```typescript
import { onMessage, onChannelMessage, onAnyMessage } from 'tauri-plugin-centrifugo-api'

// Listen to all messages with automatic JSON decoding
const unlistenMessages = await onMessage(({ channel, data }) => {
  console.log(`Message on ${channel}:`, data)
})

// Listen to messages on specific channel
const unlistenChannel = await onChannelMessage('chat', (data) => {
  console.log('Chat message:', data)
})

// Listen to all messages with timestamp
const unlistenAny = await onAnyMessage(({ channel, data, timestamp }) => {
  console.log(`[${new Date(timestamp).toISOString()}] ${channel}:`, data)
})
```

### Advanced Channel Management

```typescript
import { helpers } from 'tauri-plugin-centrifugo-api'

// Subscribe to multiple channels with unified callback
const unlisteners = await helpers.subscribeToChannels(['news', 'updates'], ({ channel, data }) => {
  console.log(`${channel}:`, data)
})

// Wait for connection before proceeding
const connected = await helpers.waitForConnection(15000)
if (connected) {
  console.log('Ready to publish messages')
} else {
  console.log('Connection timeout')
}

// Get connection status with retry
const status = await helpers.getConnectionStatus(5)
console.log('Connection status:', status)
```

### Error Handling and Retry Logic

```typescript
import { connect, isConnected, helpers } from 'tauri-plugin-centrifugo-api'

async function connectWithRetry(maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Connection attempt ${attempt}/${maxRetries}`)
      
      await connect({
        url: 'ws://localhost:8000/connection/websocket',
        channels: ['test'],
        useProtobuf: false
      })
      
      // Wait for connection to stabilize
      const connected = await helpers.waitForConnection(5000)
      if (connected) {
        console.log('Successfully connected!')
        return true
      }
      
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error)
      
      if (attempt === maxRetries) {
        throw new Error(`Failed to connect after ${maxRetries} attempts`)
      }
      
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt))
    }
  }
  
  return false
}
```

## Example Application

The repository includes a complete Svelte example application demonstrating all plugin features:

- Connection management
- Message publishing
- RPC calls
- Event handling
- Channel subscriptions
- Backend command integration

To run the example:

```bash
cd examples/tauri-app
pnpm install
pnpm tauri dev
```

## Development

### Building

```bash
# Build Rust plugin
cargo build

# Build JavaScript API
cd guest-js
pnpm build

# Build example app
cd examples/tauri-app
pnpm tauri build
```

### Testing

```bash
# Test Rust code
cargo test

# Test example app
cd examples/tauri-app
pnpm tauri dev
```

## Dependencies

- **Rust**: tauri 2.6.2+, tokio-centrifugo, serde, thiserror
- **JavaScript**: @tauri-apps/api >=2.0.0-beta.6
- **Build Tools**: rollup, typescript

## License

MIT License - see LICENSE file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For issues and questions:
- Create an issue on GitHub
- Check the example application
- Review the API documentation
# tauri-plugin-centrifugo
