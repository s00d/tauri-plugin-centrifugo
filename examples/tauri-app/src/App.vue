<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { attachConsole } from "@tauri-apps/plugin-log";
import {
  connect,
  disconnect,
  publish,
  rpc,
  isConnected,
  getSubscriptions,
  getConnectionState,
  addSubscription,
  removeSubscription,
  onConnecting,
  onConnected,
  onDisconnected,
  onError,
  onSubscribed,
  onUnsubscribed,
  onPublication,
  helpers,
  utils,
  type UnlistenFn,
  type JsonValue,
} from "tauri-plugin-centrifugo-api";

const url = ref("ws://localhost:8001/connection/websocket");
const token = ref("");
const clientName = ref("vue-demo-client");
const channels = ref("test,echo");
const useProtobuf = ref(false);
const readTimeout = ref(5000);

const connectionStatus = ref("Disconnected");
const isConnecting = ref(false);
const publishChannel = ref("test");
const publishText = ref("Hello from Vue!");
const rpcMethod = ref("echo");
const rpcData = ref('{"hello":"world"}');
const rpcResult = ref("");
const subscriptions = ref<Record<string, boolean>>({});
const logs = ref<string[]>([]);

let unlisteners: UnlistenFn[] = [];
let detachConsole: (() => void) | null = null;

function log(message: string): void {
  const ts = new Date().toLocaleTimeString();
  logs.value.unshift(`[${ts}] ${message}`);
  if (logs.value.length > 400) logs.value = logs.value.slice(-400);
}

function formatError(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  if (error && typeof error === "object") {
    const candidate = error as { message?: unknown; error?: unknown; code?: unknown };
    if (typeof candidate.message === "string") return candidate.message;
    if (typeof candidate.error === "string") return candidate.error;
    try {
      return JSON.stringify(error);
    } catch {
      return String(error);
    }
  }
  return String(error);
}

function parseChannels(): string[] {
  return channels.value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

async function setupListeners(): Promise<void> {
  unlisteners.forEach((u) => u());
  unlisteners = [];
  unlisteners.push(
    await onConnecting((e) => {
      isConnecting.value = true;
      connectionStatus.value = "Connecting";
      log(`connecting: ${JSON.stringify(e.payload)}`);
    })
  );
  unlisteners.push(
    await onConnected((e) => {
      isConnecting.value = false;
      connectionStatus.value = "Connected";
      log(`connected: ${JSON.stringify(e.payload)}`);
    })
  );
  unlisteners.push(
    await onDisconnected((e) => {
      isConnecting.value = false;
      connectionStatus.value = "Disconnected";
      log(`disconnected: ${JSON.stringify(e.payload)}`);
    })
  );
  unlisteners.push(
    await onError((e) => {
      isConnecting.value = false;
      connectionStatus.value = "Error";
      log(`error: ${e.payload.error}`);
    })
  );
  unlisteners.push(
    await onSubscribed((e) => {
      subscriptions.value[e.payload.channel] = true;
      subscriptions.value = { ...subscriptions.value };
      log(`subscribed: ${e.payload.channel}`);
    })
  );
  unlisteners.push(
    await onUnsubscribed((e) => {
      subscriptions.value[e.payload.channel] = false;
      subscriptions.value = { ...subscriptions.value };
      log(`unsubscribed: ${e.payload.channel}`);
    })
  );
  unlisteners.push(
    await onPublication(({ payload }) => {
      try {
        const decoded = payload.rawJson ?? utils.decodeJson<JsonValue>(payload.data);
        log(`publication[${payload.channel}]: ${JSON.stringify(decoded)}`);
      } catch {
        log(`publication[${payload.channel}] raw: ${payload.data}`);
      }
    })
  );
}

async function initLogging(): Promise<void> {
  try {
    // Rust logs go to the webview console. Don't also forward console.* back
    // to Rust: with the Webview target that is an endless loop.
    detachConsole = await attachConsole();
    log("logging initialized");
  } catch (e) {
    log(`logging init failed: ${formatError(e)}`);
  }
}

async function doConnect(): Promise<void> {
  if (isConnecting.value) {
    log("connect skipped: already connecting");
    return;
  }
  try {
    const alreadyConnected = await isConnected();
    if (alreadyConnected) {
      log("connect skipped: already connected");
      return;
    }
    isConnecting.value = true;
    await connect({
      url: url.value,
      token: token.value || undefined,
      name: clientName.value,
      channels: parseChannels(),
      useProtobuf: useProtobuf.value,
      readTimeout: readTimeout.value,
    });
    log("connect command sent");
  } catch (e) {
    isConnecting.value = false;
    log(`connect failed: ${formatError(e)}`);
  }
}

async function doDisconnect(): Promise<void> {
  try {
    await disconnect();
    isConnecting.value = false;
    connectionStatus.value = "Disconnected";
  } catch (e) {
    log(`disconnect failed: ${formatError(e)}`);
  }
}

async function doPublishJson(): Promise<void> {
  try {
    const connected = await helpers.waitForConnection(2000);
    if (!connected) {
      log("publish json skipped: connection is not ready");
      return;
    }
    await helpers.publishJson(publishChannel.value, {
      text: publishText.value,
      from: clientName.value,
      ts: Date.now(),
    });
    log(`published json to ${publishChannel.value}`);
  } catch (e) {
    log(`publish json failed: ${formatError(e)}`);
  }
}

async function doPublishRaw(): Promise<void> {
  try {
    const connected = await helpers.waitForConnection(2000);
    if (!connected) {
      log("publish base64 skipped: connection is not ready");
      return;
    }
    const encoded = utils.encode(JSON.stringify({ text: publishText.value, ts: Date.now() }));
    await publish({ channel: publishChannel.value, data: encoded });
    log(`published base64 to ${publishChannel.value}`);
  } catch (e) {
    log(`publish failed: ${formatError(e)}`);
  }
}

async function doRpcJson(): Promise<void> {
  try {
    const connected = await helpers.waitForConnection(2000);
    if (!connected) {
      log("rpc json skipped: connection is not ready");
      return;
    }
    const req = JSON.parse(rpcData.value) as JsonValue;
    const result = await helpers.rpcJson<JsonValue, JsonValue>(rpcMethod.value, req);
    rpcResult.value = JSON.stringify(result, null, 2);
    log(`rpc json ok: ${rpcMethod.value}`);
  } catch (e) {
    log(`rpc json failed: ${formatError(e)}`);
  }
}

async function doRpcRaw(): Promise<void> {
  try {
    const connected = await helpers.waitForConnection(2000);
    if (!connected) {
      log("rpc base64 skipped: connection is not ready");
      return;
    }
    const encoded = utils.encode(JSON.stringify({ method: rpcMethod.value, ts: Date.now() }));
    rpcResult.value = await rpc({ method: rpcMethod.value, data: encoded });
    log(`rpc raw ok: ${rpcMethod.value}`);
  } catch (e) {
    log(`rpc raw failed: ${formatError(e)}`);
  }
}

async function doAddSubscription(): Promise<void> {
  const channel = publishChannel.value.trim();
  if (!channel) return;
  if (subscriptions.value[channel]) {
    log(`add subscription skipped: ${channel} already subscribed`);
    return;
  }
  try {
    await addSubscription(channel);
    subscriptions.value[channel] = true;
    subscriptions.value = { ...subscriptions.value };
    log(`add subscription: ${channel}`);
  } catch (e) {
    log(`add subscription failed: ${formatError(e)}`);
  }
}

async function doRemoveSubscription(channel: string): Promise<void> {
  try {
    await removeSubscription(channel);
    subscriptions.value[channel] = false;
    subscriptions.value = { ...subscriptions.value };
    log(`remove subscription: ${channel}`);
  } catch (e) {
    log(`remove subscription failed: ${formatError(e)}`);
  }
}

async function refreshState(): Promise<void> {
  try {
    const connected = await isConnected();
    const state = await getConnectionState();
    subscriptions.value = await getSubscriptions();
    isConnecting.value = state === "connecting";
    connectionStatus.value = connected ? "Connected" : state;
    log("state refreshed");
  } catch (e) {
    log(`state refresh failed: ${formatError(e)}`);
  }
}

onMounted(async () => {
  await initLogging();
  await setupListeners();
  log("vue demo mounted");
});

onBeforeUnmount(() => {
  unlisteners.forEach((u) => u());
  unlisteners = [];
  if (detachConsole) detachConsole();
  detachConsole = null;
});
</script>

<template>
  <main class="wrap">
    <h1>Tauri + Vue + Centrifugo Demo</h1>

    <section class="card">
      <h2>Connection</h2>
      <input v-model="url" type="url" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="ws://localhost:8001/connection/websocket" />
      <input v-model="token" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="token (optional)" />
      <input v-model="clientName" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="client name" />
      <input v-model="channels" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="channels: test,echo" />
      <label class="row">
        <input v-model="useProtobuf" type="checkbox" />
        Use Protobuf
      </label>
      <input v-model.number="readTimeout" type="number" min="1000" placeholder="read timeout" />
      <div class="row">
        <button @click="doConnect" :disabled="isConnecting">Connect</button>
        <button @click="doDisconnect">Disconnect</button>
        <button @click="refreshState">Refresh state</button>
      </div>
      <p><b>Status:</b> {{ connectionStatus }}</p>
    </section>

    <section class="card">
      <h2>Publish / Subscription</h2>
      <input v-model="publishChannel" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="channel" />
      <input v-model="publishText" placeholder="message" />
      <div class="row">
        <button @click="doPublishJson">Publish JSON</button>
        <button @click="doPublishRaw">Publish Base64</button>
        <button @click="doAddSubscription">Add sub</button>
      </div>
      <div v-if="Object.keys(subscriptions).length">
        <div v-for="(isSub, channel) in subscriptions" :key="channel" class="row">
          <span>{{ channel }}: {{ isSub ? "on" : "off" }}</span>
          <button v-if="isSub" @click="doRemoveSubscription(channel)">Unsubscribe</button>
        </div>
      </div>
    </section>

    <section class="card">
      <h2>RPC</h2>
      <input v-model="rpcMethod" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="method" />
      <input v-model="rpcData" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder='{"hello":"world"}' />
      <div class="row">
        <button @click="doRpcJson">RPC JSON</button>
        <button @click="doRpcRaw">RPC Base64</button>
      </div>
      <pre>{{ rpcResult }}</pre>
    </section>

    <section class="card logDock">
      <div class="logHeader">
        <h2>Logs (newest first)</h2>
        <button @click="logs = []">Clear</button>
      </div>
      <pre>{{ logs.join("\n") }}</pre>
    </section>
  </main>
</template>

<style scoped>
.wrap { max-width: 980px; margin: 0 auto; padding: 20px 20px 280px; display: grid; gap: 14px; }
.card { background: #fff; border-radius: 10px; padding: 14px; box-shadow: 0 2px 8px rgba(0,0,0,.08); display: grid; gap: 10px; }
.row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
pre { max-height: 260px; overflow: auto; background: #111; color: #ddd; padding: 8px; border-radius: 8px; }
input { width: 100%; }
.logDock {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: 12px;
  max-width: 980px;
  margin: 0 auto;
  z-index: 30;
}
.logHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
