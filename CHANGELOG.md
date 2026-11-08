# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [Unreleased]

## [0.2.0] - 2026-11-08

### Changed
- **Breaking:** the client is now the official Rust SDK [`centrifuge-client`](https://github.com/centrifugal/centrifuge-rust)
  instead of the internal engine. Its modules (`client`, `config`, `protocol`, ...) are no longer re-exported;
  the SDK is available as `tauri_plugin_centrifugo::centrifuge`.
- The connection token callback (`need_token`) is installed only when `token` is set or `requestToken: true`;
  anonymous connections no longer wait for the frontend.
- `refresh` answers a pending `need_token` (else sets the token for the next connect); `subRefresh` answers
  `need_sub_token`. The SDK refreshes tokens itself before they expire.
- `subscribed` event carries `wasRecovering`, `recovered`, `streamPosition`; `connecting`/`disconnected` carry `code`/`reason`.
- guest-js is built with Vite 8 and TypeScript 6; dual ESM/CJS types; checked with publint and attw.

### Added
- `StartConfig.httpStreamUrl` (HTTP-streaming fallback), `headers`, `requestToken`.
- `SubscribeOptions.delta` (fossil) and `since` (resume from a saved position).
- `need_sub_token`, `join`, `leave` events; `onNeedSubToken` helper.
- Android: `wss://` works out of the box (Mozilla roots via `webpki-roots`).
- End-to-end tests against a real Centrifugo, CI on Linux, macOS and Windows, Android build check.

### Deprecated
- `ping` (resolves when connected; the SDK pings by itself).
- Map publish fields (`type`/`key`/`removed`) and track/untrack sub refresh fields: rejected with `Not supported`.

### Fixed
- A newer token request no longer makes the previous one fail as unauthorized (which disconnected the client for good).
- Example app: endless log loop (`attachConsole` + console forwarding) that froze the UI on Android; autocorrect on inputs.

## [0.1.x]

### Added
- Initial release of Tauri Plugin Centrifugo
- Real-time communication with Centrifugo server
- WebSocket support with JSON and Protobuf protocols
- Channel subscription management
- JWT authentication support
- Event-driven architecture for connection state and messages
- Cross-platform support (desktop and mobile)
- TypeScript/JavaScript API bindings
- Example Svelte application

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- N/A
