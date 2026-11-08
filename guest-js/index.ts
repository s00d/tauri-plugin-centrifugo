import { invoke } from '@tauri-apps/api/core'
import { listen, type UnlistenFn } from '@tauri-apps/api/event'

export type { UnlistenFn }

export type JsonPrimitive = string | number | boolean | null
export type JsonValue = JsonPrimitive | JsonObject | JsonArray
export interface JsonObject {
  [key: string]: JsonValue
}
export type JsonArray = JsonValue[]

export interface StartConfig {
  /** WebSocket endpoint, e.g. `ws://localhost:8000/connection/websocket` (`wss://` for TLS). */
  url: string
  /** Connection JWT. When it expires the SDK asks for a new one with `need_token`. */
  token?: string
  /** Client name sent in the connect command. */
  name?: string
  /** Client version sent in the connect command. */
  version?: string
  /** Channels to subscribe to with default options. */
  channels: string[]
  /** Protobuf instead of JSON protocol. */
  useProtobuf: boolean
  /** Command timeout in milliseconds (SDK default: 5000). */
  readTimeout?: number
  /** HTTP-streaming fallback endpoint, e.g. `http://host:8000/connection/http_stream`. */
  httpStreamUrl?: string
  /** Extra HTTP headers for the WebSocket upgrade / HTTP-stream requests. */
  headers?: Record<string, string>
  /**
   * Ask for the connection token with a `need_token` event (answer with
   * `provideToken`) when `token` is not set. With `token` set, `need_token`
   * also comes before the token expires. `provideToken('')` means "no token".
   */
  requestToken?: boolean
}

export interface PublishRequest {
  channel: string
  data: string // base64 encoded data (default transport format)
  dataEncoding?: 'base64' | 'rawJson'
  /** @deprecated Map publish is not supported by centrifuge-client; a non-zero type is rejected. */
  type?: number
  /** @deprecated Map publish is not supported by centrifuge-client. */
  key?: string
  /** @deprecated Map publish is not supported by centrifuge-client. */
  removed?: boolean
}

export interface RpcRequest {
  method: string
  data: string // base64 encoded data
  dataEncoding?: 'base64' | 'rawJson'
}

export interface PresenceRequest {
  channel: string
}

export interface PresenceStatsRequest {
  channel: string
}

export interface HistoryRequest {
  channel: string
  limit?: number
  /** @deprecated Ignored. */
  since?: string
  reverse?: boolean
}

export interface SendRequest {
  data: string // base64 encoded data
  dataEncoding?: 'base64' | 'rawJson'
}

export interface RefreshRequest {
  token: string
}

export interface SubRefreshRequest {
  channel: string
  token: string
  /** @deprecated track/untrack is not supported by centrifuge-client; rejected. */
  items?: KeyedItem[]
  /** @deprecated track/untrack is not supported by centrifuge-client; rejected. */
  untrackKeys?: string[]
  /** @deprecated Only 0 (token refresh) is supported. */
  type?: number
  /** @deprecated Ignored. */
  signature?: string
}

export interface KeyedItem {
  key: string
  version: number
}

export interface SubscribeOptions {
  channel: string
  /** Subscription JWT (private channel). When it expires the SDK asks for a new one with `need_sub_token`. */
  token?: string
  /** Recover missed publications after a reconnect (the channel needs history and recovery on the server). */
  recoverable?: boolean
  /** Receive `join` / `leave` events (the channel needs join/leave on the server). */
  joinLeave?: boolean
  /** Positioned subscription: the server checks the stream position and resubscribes on a gap. */
  positioned?: boolean
  /** Fossil delta compression (the server must allow it for the channel). */
  delta?: boolean
  /** Resume from a saved position (see `SubscribedStatus.streamPosition`). */
  since?: StreamPosition
}

export interface StreamPosition {
  offset: number
  epoch: string
}

export interface SubscribedStatus extends ChannelStatus {
  /** The subscription asked to recover (recoverable, or `since` set). */
  wasRecovering: boolean
  /** All missed publications were recovered. */
  recovered: boolean
  /** Current position in the channel stream (recoverable / positioned channels); save it for `since`. */
  streamPosition?: StreamPosition | null
}

export interface PublicationData {
  channel: string
  data: string // base64 encoded data
  /** Always `'base64'` on received publications. */
  dataEncoding?: 'base64' | 'rawJson'
  /** The data parsed as JSON, when it is valid JSON. */
  rawJson?: unknown
  /** Offset in the channel stream. */
  offset?: number
  info?: {
    client: string
    user: string
    connInfo: string
    chanInfo: string
  }
  tags?: Record<string, string>
  /** Publication time from the server, else arrival time (ms since the epoch). */
  timestamp?: number
}

export interface ConnectionStatus {
  /** Milliseconds since the Unix epoch. */
  ts: number
  /** `connecting` / `disconnected`: Centrifugo code. */
  code?: number
  /** `connecting` / `disconnected`: reason text. */
  reason?: string
  /** `connected`: client ID the server assigned. */
  client?: string
}

export interface ChannelStatus {
  channel: string
  /** `subscribing` / `unsubscribed`: Centrifugo code. */
  code?: number
  /** `subscribing` / `unsubscribed`: reason text. */
  reason?: string
}

export interface ErrorData {
  error: string
  /** Set for subscription errors. */
  channel?: string
}

// Tauri event wrapper
export interface TauriEventWrapper<T> {
  event: string
  payload: T
  id: number
}

export interface RpcResponse {
  method: string
  data: string // base64 encoded data
  timestamp: number
}

export interface PresenceResponse {
  channel: string
  clients: string[]
  timestamp: number
}

export interface PresenceStatsResponse {
  channel: string
  numClients: number
  numUsers: number
  timestamp: number
}

export interface HistoryResponse {
  channel: string
  publications: PublicationData[]
  timestamp: number
}

export interface PingResponse {
  timestamp: number
}

/**
 * Create the client, subscribe to `config.channels` and start connecting.
 * Resolves at once (closing a previous client first); progress arrives as
 * `connecting` / `connected` / `disconnected` events. The SDK reconnects
 * with backoff by itself.
 */
export async function connect(config: StartConfig): Promise<void> {
  return await invoke('plugin:centrifugo|connect', { config })
}

/**
 * Close the connection and drop the client with all its subscriptions.
 */
export async function disconnect(): Promise<void> {
  return await invoke('plugin:centrifugo|disconnect')
}

/**
 * Replace the connection token; the SDK uses it from the next connect attempt.
 * Rejects when there is no client.
 */
export async function setToken(token: string): Promise<void> {
  return await invoke('plugin:centrifugo|set_token', { token })
}

/**
 * Answer a pending `need_token` event with a connection token. `''` means
 * "no token" (anonymous on connect, unauthorized on refresh). Rejects when no
 * request is pending.
 */
export async function provideToken(token: string): Promise<void> {
  return await invoke('plugin:centrifugo|provide_token', { token })
}

/**
 * Publish `request.data` to a channel. `data` is base64 unless
 * `dataEncoding: 'rawJson'`. Map publish fields are rejected.
 */
export async function publish(request: PublishRequest): Promise<void> {
  return await invoke('plugin:centrifugo|publish', { request })
}

/**
 * Call an RPC method on the server. Resolves to the result data as base64.
 */
export async function rpc(request: RpcRequest): Promise<string> {
  return await invoke('plugin:centrifugo|rpc', { request })
}

/**
 * Client IDs currently present in the channel.
 */
export async function presence(request: PresenceRequest): Promise<string[]> {
  return await invoke('plugin:centrifugo|presence', { request })
}

/**
 * `[numClients, numUsers]` of the channel.
 */
export async function presenceStats(request: PresenceStatsRequest): Promise<[number, number]> {
  return await invoke('plugin:centrifugo|presence_stats', { request })
}

/**
 * Publications from the channel history (`limit`, `reverse`). The channel
 * must have history enabled on the server.
 */
export async function history(request: HistoryRequest): Promise<PublicationData[]> {
  return await invoke('plugin:centrifugo|history', { request })
}

/**
 * Send an asynchronous message to the server (no reply). Needs a server-side
 * handler (proxy) for messages.
 */
export async function send(request: SendRequest): Promise<void> {
  return await invoke('plugin:centrifugo|send', { request })
}

/**
 * Answer a pending `need_token` request with a fresh connection token, or,
 * when none is pending, set the token for the next connect. The SDK refreshes
 * tokens itself (it emits `need_token` before expiry).
 */
export async function refresh(request: RefreshRequest): Promise<void> {
  return await invoke('plugin:centrifugo|refresh', { request })
}

/**
 * Answer a pending `need_sub_token` request for `request.channel` (sent for
 * subscriptions created with a `token`, before it expires).
 */
export async function subRefresh(request: SubRefreshRequest): Promise<void> {
  return await invoke('plugin:centrifugo|sub_refresh', { request })
}

/**
 * @deprecated The SDK keeps the connection alive with server pings and has no
 * client ping. Resolves when connected, rejects otherwise.
 */
export async function ping(): Promise<void> {
  return await invoke('plugin:centrifugo|ping')
}

/**
 * `true` while the client is in the `connected` state.
 */
export async function isConnected(): Promise<boolean> {
  return await invoke('plugin:centrifugo|is_connected')
}

/**
 * Channels added through the plugin; the value is `true` while subscribed.
 */
export async function getSubscriptions(): Promise<Record<string, boolean>> {
  return await invoke('plugin:centrifugo|get_subscriptions')
}

/**
 * `'connecting'`, `'connected'`, `'closed'` or `'disconnected'` (also when
 * there is no client).
 */
export async function getConnectionState(): Promise<string> {
  return await invoke('plugin:centrifugo|get_connection_state')
}

/**
 * Subscribe to a channel with default options. Rejects when there is no
 * client (call `connect` first).
 */
export async function addSubscription(channel: string): Promise<void> {
  return await invoke('plugin:centrifugo|add_subscription', { channel })
}

/**
 * Subscribe to a channel with options: token, recovery, join/leave,
 * positioning, delta compression, resume position.
 */
export async function addSubscriptionWithOptions(options: SubscribeOptions): Promise<void> {
  return await invoke('plugin:centrifugo|add_subscription_with_options', { options })
}

/**
 * Unsubscribe from a channel and forget it. Unknown channels are ignored.
 */
export async function removeSubscription(channel: string): Promise<void> {
  return await invoke('plugin:centrifugo|remove_subscription', { channel })
}

/**
 * Unsubscribe from every channel.
 */
export async function removeAllSubscriptions(): Promise<void> {
  return await invoke('plugin:centrifugo|remove_all_subscriptions')
}

/**
 * Listen to a `centrifugo:<event>` Tauri event. The callback gets the whole
 * Tauri event (`{ event, payload, id }`); the data the backend sent is in
 * `payload`. Pass `TauriEventWrapper<Payload>` as `T`.
 */
export async function onCentrifugoEvent<T = TauriEventWrapper<unknown>>(
  event:
    | 'connecting'
    | 'connected'
    | 'disconnected'
    | 'error'
    | 'subscribed'
    | 'unsubscribed'
    | 'subscribing'
    | 'publication'
    | 'need_token'
    | 'need_sub_token'
    | 'join'
    | 'leave'
    | 'server_subscribed'
    | 'server_subscribing'
    | 'server_unsubscribed'
    | 'server_publication'
    | 'server_join'
    | 'server_leave',
  callback: (data: T) => void
): Promise<UnlistenFn> {
  return await listen(`centrifugo:${event}`, (eventData) => callback(eventData as T))
}

// Event listener helpers
/** Connection attempt started (also on every reconnect). Payload: `ts`, `code`, `reason`. */
export const onConnecting = async (callback: (data: TauriEventWrapper<ConnectionStatus>) => void): Promise<UnlistenFn> => 
  await onCentrifugoEvent('connecting', callback)

/** Connection established. Payload: `ts`, `client` (client ID). */
export const onConnected = async (callback: (data: TauriEventWrapper<ConnectionStatus>) => void): Promise<UnlistenFn> => 
  await onCentrifugoEvent('connected', callback)

/** Client is disconnected (`disconnect()` or a terminal server code); the SDK does not reconnect from this state. Payload: `ts`, `code`, `reason`. */
export const onDisconnected = async (callback: (data: TauriEventWrapper<ConnectionStatus>) => void): Promise<UnlistenFn> => 
  await onCentrifugoEvent('disconnected', callback)

/** Client or subscription error. Payload: `error`, plus `channel` for subscription errors. */
export const onError = async (callback: (data: TauriEventWrapper<ErrorData>) => void): Promise<UnlistenFn> => 
  await onCentrifugoEvent('error', callback)

/** Subscription is active. Payload: `channel`, `wasRecovering`, `recovered`, `streamPosition`. */
export const onSubscribed = async (callback: (data: TauriEventWrapper<SubscribedStatus>) => void): Promise<UnlistenFn> => 
  await onCentrifugoEvent('subscribed', callback)

/** Subscription ended. Payload: `channel`, `code`, `reason`. */
export const onUnsubscribed = async (callback: (data: TauriEventWrapper<ChannelStatus>) => void): Promise<UnlistenFn> => 
  await onCentrifugoEvent('unsubscribed', callback)

/** Subscription attempt started (also on resubscribe). Payload: `channel`, `code`, `reason`. */
export const onSubscribing = async (callback: (data: TauriEventWrapper<ChannelStatus>) => void): Promise<UnlistenFn> => 
  await onCentrifugoEvent('subscribing', callback)

/** Publication in a client-side subscription. */
export const onPublication = async (callback: (data: TauriEventWrapper<PublicationData>) => void): Promise<UnlistenFn> => 
  await onCentrifugoEvent('publication', callback)

/** The SDK needs a connection token: answer with `provideToken` (or `refresh`). */
export const onNeedToken = async (
  callback: (data: TauriEventWrapper<ConnectionStatus>) => void
): Promise<UnlistenFn> => await onCentrifugoEvent('need_token', callback)

/** The SDK needs a token for a subscription created with `token`: answer with `subRefresh`. */
export const onNeedSubToken = async (
  callback: (data: TauriEventWrapper<ChannelStatus & { ts: number }>) => void
): Promise<UnlistenFn> => await onCentrifugoEvent('need_sub_token', callback)

/** Publication in a server-side subscription. */
export const onServerPublication = async (
  callback: (data: TauriEventWrapper<PublicationData>) => void
): Promise<UnlistenFn> => await onCentrifugoEvent('server_publication', callback)

/** Publications whose data is valid JSON; the callback gets `{ channel, data }` with the parsed JSON. */
export const onPublicationRawJson = async (
  callback: (data: { channel: string; data: unknown }) => void
): Promise<UnlistenFn> =>
  await onCentrifugoEvent('publication', (pubData: TauriEventWrapper<PublicationData>) => {
    if (pubData.payload.rawJson !== undefined) {
      callback({ channel: pubData.payload.channel, data: pubData.payload.rawJson })
    }
  })

/** Like `onPublicationRawJson`, for server-side subscriptions. */
export const onServerPublicationRawJson = async (
  callback: (data: { channel: string; data: unknown }) => void
): Promise<UnlistenFn> =>
  await onCentrifugoEvent('server_publication', (pubData: TauriEventWrapper<PublicationData>) => {
    if (pubData.payload.rawJson !== undefined) {
      callback({ channel: pubData.payload.channel, data: pubData.payload.rawJson })
    }
  })

// Convenient event listeners for messages
/** Every publication, decoded: parsed JSON, else the base64 string as is. The callback gets `{ channel, data }`. */
export const onMessage = async <T = unknown>(callback: (data: { channel: string; data: T | string }) => void): Promise<UnlistenFn> => 
  await onCentrifugoEvent('publication', (pubData: TauriEventWrapper<PublicationData>) => {
    if (pubData.payload.rawJson !== undefined) {
      callback({
        channel: pubData.payload.channel,
        data: pubData.payload.rawJson as T
      })
      return
    }
    try {
      const decodedData = utils.decodeJson<T>(pubData.payload.data)
      callback({
        channel: pubData.payload.channel,
        data: decodedData
      })
    } catch (error) {
              // If failed to decode JSON, return raw data
      callback({
        channel: pubData.payload.channel,
        data: pubData.payload.data
      })
    }
  })

/** Like `onMessage` for one channel; the callback gets only `data`. */
export const onChannelMessage = async <T = unknown>(channel: string, callback: (data: T | string) => void): Promise<UnlistenFn> => 
  await onCentrifugoEvent('publication', (pubData: TauriEventWrapper<PublicationData>) => {
    if (pubData.payload.channel === channel) {
      if (pubData.payload.rawJson !== undefined) {
        callback(pubData.payload.rawJson as T)
        return
      }
      try {
        const decodedData = utils.decodeJson<T>(pubData.payload.data)
        callback(decodedData)
      } catch (error) {
        // If failed to decode JSON, return raw data
        callback(pubData.payload.data)
      }
    }
  })

/** Like `onMessage` plus `timestamp` (`Date.now()` on arrival). */
export const onAnyMessage = async <T = unknown>(callback: (data: { channel: string; data: T | string; timestamp: number }) => void): Promise<UnlistenFn> => 
  await onCentrifugoEvent('publication', (pubData: TauriEventWrapper<PublicationData>) => {
    if (pubData.payload.rawJson !== undefined) {
      callback({
        channel: pubData.payload.channel,
        data: pubData.payload.rawJson as T,
        timestamp: Date.now()
      })
      return
    }
    try {
      const decodedData = utils.decodeJson<T>(pubData.payload.data)
      callback({
        channel: pubData.payload.channel,
        data: decodedData,
        timestamp: Date.now()
      })
    } catch (error) {
      callback({
        channel: pubData.payload.channel,
        data: pubData.payload.data,
        timestamp: Date.now()
      })
    }
  })

// Utility functions for base64 encoding/decoding
export const utils = {
  /**
   * Encode string to base64
   */
  encode: (data: string): string => {
    if (typeof window !== 'undefined' && window.btoa) {
      return window.btoa(data)
    }
    throw new Error('btoa not available in this environment')
  },

  /**
   * Decode base64 to string
   */
  decode: (data: string): string => {
    if (typeof window !== 'undefined' && window.atob) {
      return window.atob(data)
    }
    throw new Error('atob not available in this environment')
  },

  /**
   * Encode object to base64 JSON
   */
  encodeJson: <T extends JsonValue>(data: T): string => {
    const jsonString = JSON.stringify(data)
    return utils.encode(jsonString)
  },

  /**
   * Decode base64 JSON to object
   */
  decodeJson: <T>(data: string): T => {
    const jsonString = utils.decode(data)
    return JSON.parse(jsonString)
  }
}

// Convenience methods for common operations
export const helpers = {
  /**
   * Publish JSON data to channel (automatically encodes to base64)
   */
  publishJson: async <T extends JsonValue = JsonValue>(channel: string, data: T): Promise<void> => {
    const base64Data = utils.encodeJson(data)
    await publish({ channel, data: base64Data })
  },

  /**
   * Publish JSON as is (`dataEncoding: 'rawJson'`, no base64)
   */
  publishRawJson: async <T extends JsonValue = JsonValue>(channel: string, data: T): Promise<void> => {
    const jsonString = JSON.stringify(data)
    await publish({ channel, data: jsonString, dataEncoding: 'rawJson' })
  },

  /**
   * Execute RPC with JSON data (automatically encodes/decodes)
   */
  rpcJson: async <TReq extends JsonValue = JsonValue, TRes = unknown>(method: string, data: TReq): Promise<TRes> => {
    const base64Data = utils.encodeJson(data)
    const result = await rpc({ method, data: base64Data })
    return utils.decodeJson<TRes>(result)
  },

  /**
   * Execute RPC with raw JSON request data; resolves to the result as base64
   */
  rpcRawJson: async <TReq extends JsonValue = JsonValue>(method: string, data: TReq): Promise<string> => {
    const jsonString = JSON.stringify(data)
    return await rpc({ method, data: jsonString, dataEncoding: 'rawJson' })
  },

  /**
   * Subscribe to channel and listen for messages
   */
  subscribeToChannel: async <T = unknown>(channel: string, callback: (data: T | string) => void): Promise<UnlistenFn> => {
    await addSubscription(channel)
    return await onChannelMessage(channel, callback)
  },

  /**
   * Subscribe to multiple channels
   */
  subscribeToChannels: async <T = unknown>(channels: string[], callback: (data: { channel: string; data: T | string }) => void): Promise<UnlistenFn[]> => {
    const unlisteners: UnlistenFn[] = []
    
    for (const channel of channels) {
      await addSubscription(channel)
      const unlisten = await onChannelMessage<T>(channel, (data) => {
        callback({ channel, data })
      })
      unlisteners.push(unlisten)
    }
    
    return unlisteners
  },

  /**
   * Wait for connection to be established
   */
  waitForConnection: async (timeout: number = 10000): Promise<boolean> => {
    return new Promise((resolve) => {
      const startTime = Date.now()
      
      const checkConnection = async () => {
        try {
          const connected = await isConnected()
          if (connected) {
            resolve(true)
            return
          }
          
          if (Date.now() - startTime > timeout) {
            resolve(false)
            return
          }
          
          setTimeout(checkConnection, 100)
        } catch {
          resolve(false)
        }
      }
      
      checkConnection()
    })
  },

  /**
   * Get connection status with retry
   */
  getConnectionStatus: async (retries: number = 3): Promise<string> => {
    for (let i = 0; i < retries; i++) {
      try {
        return await getConnectionState()
      } catch (error) {
        if (i === retries - 1) throw error
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }
    throw new Error('Failed to get connection status')
  }
}
