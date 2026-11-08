[![npm version](https://img.shields.io/npm/v/tauri-plugin-centrifugo-api/latest?style=for-the-badge)](https://www.npmjs.com/package/tauri-plugin-centrifugo-api)
[![Crates.io](https://img.shields.io/crates/v/tauri-plugin-centrifugo?style=for-the-badge)](https://crates.io/crates/tauri-plugin-centrifugo)
[![Documentation](https://img.shields.io/badge/docs-docs.rs-blue?style=for-the-badge)](https://docs.rs/tauri-plugin-centrifugo/)
[![GitHub issues](https://img.shields.io/badge/github-issues-orange?style=for-the-badge)](https://github.com/s00d/tauri-plugin-centrifugo/issues)
[![GitHub stars](https://img.shields.io/badge/github-stars-yellow?style=for-the-badge)](https://github.com/s00d/tauri-plugin-centrifugo/stargazers)
[![Donate](https://img.shields.io/badge/Donate-Donationalerts-ff4081?style=for-the-badge)](https://www.donationalerts.com/r/s00d88)

# Tauri Plugin Centrifugo

A Tauri plugin for real-time communication with a Centrifugo server, built on the official Rust SDK
[`centrifuge-client`](https://github.com/centrifugal/centrifuge-rust).

## Features

- **Real-time Communication**: WebSocket, with an optional HTTP-streaming fallback
- **Real networks**: reconnects with backoff, ping/pong liveness, wake-from-sleep detection, OS proxy settings and trust store (from the SDK)
- **Recovery**: recoverable/positioned subscriptions, resume from a saved stream position, fossil delta compression
- **JSON & Protobuf Support**: Choose between JSON and Protobuf protocols
- **Event-driven Architecture**: Comprehensive event system for connection state and messages
- **Channel Management**: Subscribe/unsubscribe to channels dynamically
- **Authentication**: JWT token support for secure connections
- **Cross-platform**: Works on desktop and mobile platforms
- **Backward-compatible payloads**: Base64 by default with optional raw JSON mode

## Installation

### Automatic Installation (Recommended)

Use the Tauri CLI to automatically install both the Rust and JavaScript parts of the plugin:

```bash
# npm
npm run tauri add centrifugo

# yarn
yarn run tauri add centrifugo

# pnpm
pnpm tauri add centrifugo

# deno
deno task tauri add centrifugo

# bun
bun tauri add centrifugo

# cargo
cargo tauri add centrifugo
```

### Manual Installation

#### Backend (Rust)

Add the plugin using cargo:

```bash
cd ./src-tauri
cargo add tauri-plugin-centrifugo
```

#### Frontend (JavaScript/TypeScript)

Install the JavaScript API:

```bash
npm install tauri-plugin-centrifugo-api
# or
pnpm add tauri-plugin-centrifugo-api
```

## Platform Compatibility

| Platform | Supported |
| -------- | --------- |
| Linux    | ✓         |
| Windows  | ✓         |
| macOS    | ✓         |
| Android  | ✓ (TLS with Mozilla roots via `webpki-roots`; user-installed CAs are not trusted) |
| iOS      | ✓         |

Server: Centrifugo v4+ (client protocol v2); HTTP-streaming needs v5+ with `http_stream` enabled.
Tested against Centrifugo v5.4.9.

## Usage

### Backend Setup

Initialize the plugin in your Tauri app:

```rust
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_centrifugo::init())
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
  readTimeout: 5000,
  // optional:
  httpStreamUrl: 'http://localhost:8000/connection/http_stream', // fallback transport
  headers: { 'X-App': 'demo' },                                  // HTTP headers
  requestToken: false // true: ask the frontend for a token (need_token) instead of `token`
})

// Check connection status
const connected = await isConnected()

// Disconnect
await disconnect()
```

#### Publishing Messages

```typescript
import { publish, helpers } from 'tauri-plugin-centrifugo-api'

// Publish JSON message (base64 transport)
await helpers.publishJson('channel-name', {
  message: 'Hello World',
  timestamp: Date.now()
})

// Publish JSON in raw mode (optional)
await helpers.publishRawJson('channel-name', {
  message: 'Hello raw JSON'
})

// Publish raw data (base64)
await publish({ channel: 'channel-name', data: 'base64-encoded-data' })
```

#### RPC Calls

```typescript
import { rpc, helpers } from 'tauri-plugin-centrifugo-api'

// Execute RPC with JSON data (base64) and typed response
const result = await helpers.rpcJson<
  { userId: number; action: string },
  { ok: boolean; profile?: { id: number } }
>('method-name', {
  userId: 123,
  action: 'getInfo'
})

// Execute RPC with raw data (base64)
const rawResult = await rpc({ method: 'method-name', data: 'base64-encoded-data' })
```

#### Event Listeners

```typescript
import {
  onConnecting,
  onConnected,
  onDisconnected,
  onPublication,
  onSubscribed,
  onUnsubscribed,
  onNeedToken,
  onNeedSubToken,
  provideToken,
  subRefresh
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
  const { channel, data, rawJson } = eventData.payload
  console.log(`Message on ${channel}:`, rawJson ?? data)
})

// Token bridge. Sent when `requestToken: true` and no token is set, and
// before a `token` expires. provideToken('') means "no token".
const unlistenNeedToken = await onNeedToken(async () => {
  const freshToken = await fetch('/api/token').then(r => r.text())
  await provideToken(freshToken)
})

// Subscription tokens (subscriptions created with `token`): answered with subRefresh
const unlistenNeedSubToken = await onNeedSubToken(async ({ payload }) => {
  const token = await fetch(`/api/sub-token?channel=${payload.channel}`).then(r => r.text())
  await subRefresh({ channel: payload.channel, token })
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
unlistenNeedToken()
unlistenNeedSubToken()
unlistenSubscribed()
unlistenUnsubscribed()
```

#### Channel Management

```typescript
import {
  addSubscription,
  addSubscriptionWithOptions,
  removeSubscription,
  removeAllSubscriptions,
  getSubscriptions
} from 'tauri-plugin-centrifugo-api'

// Add new subscription
await addSubscription('new-channel')

// Add subscription with options
await addSubscriptionWithOptions({
  channel: 'recoverable-channel',
  recoverable: true,
  joinLeave: true,
  // token: 'sub-jwt',          // private channel; refreshed via need_sub_token
  // delta: true,               // fossil delta compression
  // since: { offset, epoch },  // resume from `subscribed` event's streamPosition
})

// Remove one subscription
await removeSubscription('channel-name')

// Remove all subscriptions
await removeAllSubscriptions()

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

## API Reference

### Core Functions

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `connect` | Establish connection to Centrifugo | `StartConfig` | `Promise<void>` |
| `disconnect` | Close connection | - | `Promise<void>` |
| `setToken` | Set authentication token | `string` | `Promise<void>` |
| `provideToken` | Answer a `need_token` request | `string` | `Promise<void>` |
| `publish` | Publish message to channel | `PublishRequest` | `Promise<void>` |
| `rpc` | Execute RPC call | `RpcRequest` | `Promise<string>` |
| `presence` | Get presence information | `PresenceRequest` | `Promise<string[]>` |
| `presenceStats` | Get presence statistics | `PresenceStatsRequest` | `Promise<[number, number]>` |
| `history` | Get message history | `HistoryRequest` | `Promise<PublicationData[]>` |
| `send` | Send message to server | `SendRequest` | `Promise<void>` |
| `refresh` | Answer a pending `need_token`, else set the token for the next connect | `RefreshRequest` | `Promise<void>` |
| `subRefresh` | Answer a `need_sub_token` request for the channel | `SubRefreshRequest` | `Promise<void>` |
| `ping` | **Deprecated**: resolves when connected (the SDK pings by itself) | - | `Promise<void>` |

The SDK refreshes connection and subscription tokens on its own, before they expire, by asking
the frontend (`need_token` / `need_sub_token`). There is no manual refresh or ping command.
Map publish (`type`/`key`/`removed`) and track/untrack sub refresh (`items`/`untrackKeys`/`type`)
are not supported by the SDK and are rejected with `Not supported: ...`; `HistoryRequest.since`
and `SubRefreshRequest.signature` are ignored.

### Helper Functions

| Function | Description | Parameters | Returns |
|----------|-------------|------------|---------|
| `helpers.publishJson` | Publish JSON data (base64) | `channel: string, data: T extends JsonValue` | `Promise<void>` |
| `helpers.publishRawJson` | Publish JSON as raw payload | `channel: string, data: T extends JsonValue` | `Promise<void>` |
| `helpers.rpcJson` | Execute RPC with JSON (base64) | `method: string, data: TReq extends JsonValue` | `Promise<TRes>` |
| `helpers.rpcRawJson` | Execute RPC with raw JSON payload | `method: string, data: TReq extends JsonValue` | `Promise<string>` |
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
| `onSubscribed` | Channel subscription successful | `TauriEventWrapper<SubscribedStatus>` (`wasRecovering`, `recovered`, `streamPosition`) |
| `onUnsubscribed` | Channel unsubscription successful | `TauriEventWrapper<ChannelStatus>` |
| `onSubscribing` | Channel subscription attempt | `TauriEventWrapper<ChannelStatus>` |
| `onPublication` | Message received on channel | `TauriEventWrapper<PublicationData>` |
| `onServerPublication` | Server-side publication push | `TauriEventWrapper<PublicationData>` |
| `onNeedToken` | Backend requests a connection token | `TauriEventWrapper<ConnectionStatus>` |
| `onNeedSubToken` | Backend requests a subscription token | `TauriEventWrapper<ChannelStatus & { ts: number }>` |
| `onPublicationRawJson` | JSON-only publication listener | `{ channel: string, data: unknown }` |
| `onServerPublicationRawJson` | JSON-only server publication listener | `{ channel: string, data: unknown }` |
| `onMessage` | Decoded message with channel info | `{ channel: string, data: T \| string }` |
| `onChannelMessage` | Decoded message for specific channel | `T \| string` |
| `onAnyMessage` | Decoded message with timestamp | `{ channel: string, data: T \| string, timestamp: number }` |

### Configuration

```typescript
interface StartConfig {
  url: string
  token?: string
  name?: string
  version?: string
  channels: string[]
  useProtobuf: boolean
  readTimeout?: number
  httpStreamUrl?: string
  headers?: Record<string, string>
  requestToken?: boolean
}

interface PublishRequest {
  channel: string
  data: string
  dataEncoding?: 'base64' | 'rawJson'
  type?: number     // deprecated, must be 0
  key?: string      // deprecated
  removed?: boolean // deprecated
}

interface RpcRequest {
  method: string
  data: string
  dataEncoding?: 'base64' | 'rawJson'
}

interface SendRequest {
  data: string
  dataEncoding?: 'base64' | 'rawJson'
}
```

### Response Interfaces

```typescript
interface PublicationData {
  channel: string
  data: string
  dataEncoding?: 'base64' | 'rawJson'
  rawJson?: unknown
  offset?: number
  info?: {
    client: string
    user: string
    connInfo: string
    chanInfo: string
  }
  tags?: Record<string, string>
}
```

## Example Application

The repository includes a Vue example application demonstrating plugin features, and a
Centrifugo config for it in `examples/server` (`centrifugo --config examples/server/centrifugo.json`).

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
pnpm build
```

### Testing

```bash
# Rust: unit tests + end-to-end tests against a real Centrifugo
# (starts the `centrifugo` binary or $CENTRIFUGO_BIN; skipped if missing)
cargo test

# guest-js: unit tests, type check, build + dist checks (publint, attw, smoke)
pnpm test
pnpm typecheck
pnpm build
```

CI runs all of it on Linux, macOS and Windows against Centrifugo v5.4.9, and builds for Android.

## Dependencies

- **Rust**: tauri 2.6.2+, [`centrifuge-client`](https://crates.io/crates/centrifuge-client), serde, thiserror
- **JavaScript**: @tauri-apps/api >=2.0.0-beta.6
- **Build Tools**: vite, typescript, vitest, publint, @arethetypeswrong/cli

## Permissions

By default all potentially dangerous plugin commands and scopes are blocked and cannot be accessed. You must modify permissions in your `capabilities` configuration to enable these.

See the [Capabilities Overview](https://v2.tauri.app/security/capabilities/) for more information and the [step by step guide](https://v2.tauri.app/learn/security/using-plugin-permissions/) to use plugin permissions.

```json title="src-tauri/capabilities/default.json" ins={4}
{
  "permissions": [
    "...",
    "centrifugo:default"
  ]
}
```

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
