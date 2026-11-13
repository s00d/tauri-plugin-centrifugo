[![npm version](https://img.shields.io/npm/v/tauri-plugin-centrifugo-api/latest?style=for-the-badge)](https://www.npmjs.com/package/tauri-plugin-centrifugo-api)
[![Crates.io](https://img.shields.io/crates/v/tauri-plugin-centrifugo?style=for-the-badge)](https://crates.io/crates/tauri-plugin-centrifugo)
[![Documentation](https://img.shields.io/badge/docs-site-blue?style=for-the-badge)](https://s00d.github.io/tauri-plugin-centrifugo/)
[![docs.rs](https://img.shields.io/docsrs/tauri-plugin-centrifugo?style=for-the-badge)](https://docs.rs/tauri-plugin-centrifugo/)
[![GitHub issues](https://img.shields.io/badge/github-issues-orange?style=for-the-badge)](https://github.com/s00d/tauri-plugin-centrifugo/issues)
[![GitHub stars](https://img.shields.io/badge/github-stars-yellow?style=for-the-badge)](https://github.com/s00d/tauri-plugin-centrifugo/stargazers)
[![Donate](https://img.shields.io/badge/Donate-Donationalerts-ff4081?style=for-the-badge)](https://www.donationalerts.com/r/s00d88)

# Tauri Plugin Centrifugo

Real-time messaging with a [Centrifugo](https://centrifugal.dev) server for Tauri 2 apps on
desktop, Android and iOS, built on the official Rust SDK
[`centrifuge-client`](https://github.com/centrifugal/centrifuge-rust).

**Documentation: https://s00d.github.io/tauri-plugin-centrifugo/**

- **Real networks:** reconnects with backoff, ping/pong liveness, wake-from-sleep detection,
  OS proxy settings and trust store (from the SDK).
- **Transports:** WebSocket with JSON or Protobuf, optional HTTP-streaming fallback, custom headers.
- **Recovery:** recoverable/positioned subscriptions, resume from a saved stream position,
  fossil delta compression.
- **Tokens:** connection and subscription JWTs, refreshed before expiry by asking your frontend.
- **Operations:** publish, RPC, send, history, presence, presence stats; base64 or raw JSON payloads.

| Platform | Supported |
|----------|-----------|
| Windows · macOS · Linux | ✅ |
| Android | ✅ (TLS with Mozilla roots via `webpki-roots`; user-installed CAs are not trusted) |
| iOS | ✅ |

Server: Centrifugo v4+ (client protocol v2); HTTP streaming needs v5+ with `http_stream` enabled.
Tested against Centrifugo v5.4.9.

## Install

```bash
pnpm tauri add centrifugo     # or: npm run tauri add centrifugo / cargo tauri add centrifugo
```

or by hand:

```bash
cargo add tauri-plugin-centrifugo --manifest-path src-tauri/Cargo.toml
pnpm add tauri-plugin-centrifugo-api
```

Register the plugin and allow it in a capability:

```rust
// src-tauri/src/lib.rs
tauri::Builder::default()
    .plugin(tauri_plugin_centrifugo::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
```

```jsonc
// src-tauri/capabilities/default.json
{ "identifier": "default", "windows": ["main"], "permissions": ["core:default", "centrifugo:default"] }
```

## Quick start

```ts
import { connect, onConnected, onPublication, helpers, utils } from "tauri-plugin-centrifugo-api";

await onConnected(({ payload }) => console.log("connected, client", payload.client));
await onPublication(({ payload }) => console.log(payload.channel, payload.rawJson ?? utils.decode(payload.data)));

await connect({
  url: "ws://localhost:8000/connection/websocket",
  token: "<connection JWT>",   // optional; or requestToken: true + onNeedToken/provideToken
  channels: ["news"],
  useProtobuf: false,
});

if (await helpers.waitForConnection()) {
  await helpers.publishJson("news", { text: "hello" });
}
```

## Documentation

| | |
|-|-|
| [Getting started](https://s00d.github.io/tauri-plugin-centrifugo/getting-started/introduction) | Install, permissions, quick start, example app |
| [Connection & config](https://s00d.github.io/tauri-plugin-centrifugo/guides/connection) | Every `connect()` option, transports, state, errors |
| [Events](https://s00d.github.io/tauri-plugin-centrifugo/guides/events) | Every `centrifugo:*` event and its payload |
| [Subscriptions](https://s00d.github.io/tauri-plugin-centrifugo/guides/subscriptions) | Recovery, `since`, delta, join/leave |
| [Tokens](https://s00d.github.io/tauri-plugin-centrifugo/guides/tokens) | `token` vs `requestToken`, `need_token` / `provideToken`, `need_sub_token` / `subRefresh` |
| [Rust backend](https://s00d.github.io/tauri-plugin-centrifugo/guides/rust) | The plugin's client and the SDK from Rust · [docs.rs](https://docs.rs/tauri-plugin-centrifugo/) |
| [Platforms](https://s00d.github.io/tauri-plugin-centrifugo/platforms/overview) | Desktop, Android TLS, iOS, Centrifugo versions |
| [API reference](https://s00d.github.io/tauri-plugin-centrifugo/reference/javascript-api) | Generated from the sources: functions, types, Tauri commands, permissions |
| [Deprecations](https://s00d.github.io/tauri-plugin-centrifugo/deprecations) | `ping`, map publish, track/untrack |
| [Changelog](https://s00d.github.io/tauri-plugin-centrifugo/changelog) | |

## Example app

[`examples/tauri-app`](examples/tauri-app) is a Vue app for desktop and mobile;
[`examples/server`](examples/server) has a Centrifugo config for it:

```bash
centrifugo --config examples/server/centrifugo.json
cd examples/tauri-app && pnpm install && pnpm tauri dev
```

## Development

```bash
cargo build && cargo test   # scenario tests over IPC, offline and against a real Centrifugo ($CENTRIFUGO_BIN or PATH; skipped if missing)
cargo mutants               # mutation testing (cargo install cargo-mutants; needs centrifugo too)
pnpm typecheck && pnpm test && pnpm build   # build also runs publint, attw and a dist smoke test
cd docs && pnpm install && pnpm dev         # documentation site
```

CI runs all of it on Linux, macOS and Windows against Centrifugo v5.4.9, and builds for Android;
cargo-mutants runs only locally.

## License

MIT, see [LICENSE](./LICENSE). If the plugin helps you, you can support it via
[DonationAlerts](https://www.donationalerts.com/r/s00d88).
