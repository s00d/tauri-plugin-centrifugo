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
  url: string
  token?: string
  name?: string
  version?: string
  channels: string[]
  useProtobuf: boolean
  readTimeout?: number // milliseconds
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
  token?: string
  recoverable?: boolean
  joinLeave?: boolean
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
  wasRecovering: boolean
  recovered: boolean
  streamPosition?: StreamPosition | null
}

export interface PublicationData {
  channel: string
  data: string // base64 encoded data
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

export interface ConnectionStatus {
  ts: number
}

export interface ChannelStatus {
  channel: string
}

export interface ErrorData {
  error: string
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
 * Connect to Centrifugo
 */
export async function connect(config: StartConfig): Promise<void> {
  return await invoke('plugin:centrifugo|connect', { config })
}

/**
 * Disconnect from Centrifugo
 */
export async function disconnect(): Promise<void> {
  return await invoke('plugin:centrifugo|disconnect')
}

/**
 * Set authentication token
 */
export async function setToken(token: string): Promise<void> {
  return await invoke('plugin:centrifugo|set_token', { token })
}

export async function provideToken(token: string): Promise<void> {
  return await invoke('plugin:centrifugo|provide_token', { token })
}

/**
 * Publish message to channel
 */
export async function publish(request: PublishRequest): Promise<void> {
  return await invoke('plugin:centrifugo|publish', { request })
}

/**
 * Execute RPC call
 */
export async function rpc(request: RpcRequest): Promise<string> {
  return await invoke('plugin:centrifugo|rpc', { request })
}

/**
 * Get presence information for channel
 */
export async function presence(request: PresenceRequest): Promise<string[]> {
  return await invoke('plugin:centrifugo|presence', { request })
}

/**
 * Get presence statistics for channel
 */
export async function presenceStats(request: PresenceStatsRequest): Promise<[number, number]> {
  return await invoke('plugin:centrifugo|presence_stats', { request })
}

/**
 * Get message history for channel
 */
export async function history(request: HistoryRequest): Promise<PublicationData[]> {
  return await invoke('plugin:centrifugo|history', { request })
}

/**
 * Send message to server
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
 * Check if connected to Centrifugo
 */
export async function isConnected(): Promise<boolean> {
  return await invoke('plugin:centrifugo|is_connected')
}

/**
 * Get current subscriptions
 */
export async function getSubscriptions(): Promise<Record<string, boolean>> {
  return await invoke('plugin:centrifugo|get_subscriptions')
}

/**
 * Get connection state
 */
export async function getConnectionState(): Promise<string> {
  return await invoke('plugin:centrifugo|get_connection_state')
}

/**
 * Add new subscription to channel
 */
export async function addSubscription(channel: string): Promise<void> {
  return await invoke('plugin:centrifugo|add_subscription', { channel })
}

export async function addSubscriptionWithOptions(options: SubscribeOptions): Promise<void> {
  return await invoke('plugin:centrifugo|add_subscription_with_options', { options })
}

/**
 * Remove subscription from channel
 */
export async function removeSubscription(channel: string): Promise<void> {
  return await invoke('plugin:centrifugo|remove_subscription', { channel })
}

export async function removeAllSubscriptions(): Promise<void> {
  return await invoke('plugin:centrifugo|remove_all_subscriptions')
}

/**
 * Listen to Centrifugo events
 */
export async function onCentrifugoEvent<T = unknown>(
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
  return await listen<T>(`centrifugo:${event}`, (eventData) => callback(eventData.payload))
}

// Event listener helpers
export const onConnecting = async (callback: (data: TauriEventWrapper<ConnectionStatus>) => void): Promise<UnlistenFn> => 
  await onCentrifugoEvent('connecting', callback)

export const onConnected = async (callback: (data: TauriEventWrapper<ConnectionStatus>) => void): Promise<UnlistenFn> => 
  await onCentrifugoEvent('connected', callback)

export const onDisconnected = async (callback: (data: TauriEventWrapper<ConnectionStatus>) => void): Promise<UnlistenFn> => 
  await onCentrifugoEvent('disconnected', callback)

export const onError = async (callback: (data: TauriEventWrapper<ErrorData>) => void): Promise<UnlistenFn> => 
  await onCentrifugoEvent('error', callback)

export const onSubscribed = async (callback: (data: TauriEventWrapper<SubscribedStatus>) => void): Promise<UnlistenFn> => 
  await onCentrifugoEvent('subscribed', callback)

export const onUnsubscribed = async (callback: (data: TauriEventWrapper<ChannelStatus>) => void): Promise<UnlistenFn> => 
  await onCentrifugoEvent('unsubscribed', callback)

export const onSubscribing = async (callback: (data: TauriEventWrapper<ChannelStatus>) => void): Promise<UnlistenFn> => 
  await onCentrifugoEvent('subscribing', callback)

export const onPublication = async (callback: (data: TauriEventWrapper<PublicationData>) => void): Promise<UnlistenFn> => 
  await onCentrifugoEvent('publication', callback)

export const onNeedToken = async (
  callback: (data: TauriEventWrapper<ConnectionStatus>) => void
): Promise<UnlistenFn> => await onCentrifugoEvent('need_token', callback)

export const onNeedSubToken = async (
  callback: (data: TauriEventWrapper<ChannelStatus & { ts: number }>) => void
): Promise<UnlistenFn> => await onCentrifugoEvent('need_sub_token', callback)

export const onServerPublication = async (
  callback: (data: TauriEventWrapper<PublicationData>) => void
): Promise<UnlistenFn> => await onCentrifugoEvent('server_publication', callback)

export const onPublicationRawJson = async (
  callback: (data: { channel: string; data: unknown }) => void
): Promise<UnlistenFn> =>
  await onCentrifugoEvent('publication', (pubData: TauriEventWrapper<PublicationData>) => {
    if (pubData.payload.rawJson !== undefined) {
      callback({ channel: pubData.payload.channel, data: pubData.payload.rawJson })
    }
  })

export const onServerPublicationRawJson = async (
  callback: (data: { channel: string; data: unknown }) => void
): Promise<UnlistenFn> =>
  await onCentrifugoEvent('server_publication', (pubData: TauriEventWrapper<PublicationData>) => {
    if (pubData.payload.rawJson !== undefined) {
      callback({ channel: pubData.payload.channel, data: pubData.payload.rawJson })
    }
  })

// Convenient event listeners for messages
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
