---
title: tauri-plugin-centrifugo
description: Centrifugo real-time messaging for Tauri 2 apps on desktop, Android and iOS, built on the official centrifuge-client SDK.
navigation: false
---

```ts [main.ts]
import { connect, onConnected, onMessage, helpers } from "tauri-plugin-centrifugo-api";

await onConnected(({ payload }) => console.log("connected, client", payload.client));
await onMessage(({ channel, data }) => console.log(channel, data));   // parsed JSON

await connect({
  url: "ws://localhost:8000/connection/websocket",
  channels: ["news"],
  useProtobuf: false,
});

await helpers.waitForConnection();
await helpers.publishJson("news", { text: "hello" });
```
