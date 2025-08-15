<script lang="ts">
  import { onMount } from 'svelte'
  import {
  connect,
  disconnect,
  setToken,
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
  onSubscribing,
  onPublication,
  helpers,
  utils
} from 'tauri-plugin-centrifugo-api'

import type { UnlistenFn } from '@tauri-apps/api/event'
import { invoke } from '@tauri-apps/api/core'

  let url = 'ws://localhost:8001/connection/websocket'
  let token = ''
  let clientName = 'test-client'
  let channels = 'test,echo'
  let useProtobuf = false
  let readTimeout = 5000
  
  let connectionStatus = 'Disconnected'
  let subscriptions: Record<string, boolean> = {}
  let eventLog = ''
  let errorLog = ''
  
  // RPC
  let rpcMethod = 'getUserInfo'
  let rpcData = '{"userId": 123}'
  let rpcResult = ''
  
  // Publishing
  let publishChannel = 'test'
  let publishText = 'Hello from Tauri!'
  let publishResult = ''
  
  // Subscription management
  let newChannel = 'info'
  let subscriptionResult = ''

  let unlisteners: UnlistenFn[] = []

  onMount(() => {
    // Wait a second for Tauri API to load
    setTimeout(async () => {
      // Setup event listeners
      await setupEventListeners()
      loadSavedConfig()
    }, 1000)
    
    return () => {
      unlisteners.forEach(unlisten => unlisten())
    }
  })

  // Remove complex waitForTauri function

  async function setupEventListeners() {
    try {
      addToLog('🔧 Setting up event listeners...')
      
      unlisteners = [
        await onConnecting((eventData) => {
          const data = eventData.payload
          connectionStatus = 'Connecting...'
          addToLog(`🔄 onConnecting: Attempting to connect to server...`)
          addToLog(`🔍 Event data: ${JSON.stringify(data)}`)
        }),
        
        await onConnected((eventData) => {
          const data = eventData.payload
          connectionStatus = 'Connected'
          addToLog(`✅ onConnected: Successfully connected to server!`)
          addToLog(`🔍 Event data: ${JSON.stringify(data)}`)
        }),
        
        await onDisconnected((eventData) => {
          const data = eventData.payload
          connectionStatus = 'Disconnected'
          addToLog(`❌ onDisconnected: Disconnected from server`)
          addToLog(`🔍 Event data: ${JSON.stringify(data)}`)
        }),
        
        await onError((eventData) => {
          const data = eventData.payload
          connectionStatus = 'Error'
          addToLog(`💥 onError: Connection error: ${data.error}`)
          addToErrorLog(`❌ Connection Error: ${data.error}`)
        }),
        
        await onSubscribed((eventData) => {
          const data = eventData.payload
          subscriptions[data.channel] = true
          subscriptions = { ...subscriptions }
          addToLog(`✅ onSubscribed: Subscription to channel ${data.channel} successfully established`)
          addToLog(`🔍 Event data: ${JSON.stringify(eventData, null, 2)}`)
        }),
        
        await onUnsubscribed((eventData) => {
          const data = eventData.payload
          subscriptions[data.channel] = false
          subscriptions = { ...subscriptions }
          addToLog(`❌ onUnsubscribed: Unsubscribed from channel ${data.channel}`)
          addToLog(`🔍 Event data: ${JSON.stringify(eventData, null, 2)}`)
        }),
        
        await onSubscribing((eventData) => {
          const data = eventData.payload
          addToLog(`🔄 onSubscribing: Attempting to subscribe to channel ${data.channel}...`)
          addToLog(`🔍 Event data: ${JSON.stringify(eventData, null, 2)}`)
        }),
        
        await onPublication((eventData) => {
          try {
            const data = eventData.payload
            addToLog(`📨 onPublication: Message received on channel ${data.channel}`)
            // addToLog(`🔍 Event data: ${JSON.stringify(eventData, null, 2)}`)
            
            // Check if there is data
            if (data.data) {
              try {
                const decodedData = utils.decodeJson(data.data)
                addToLog(`📄 Decoded data: ${JSON.stringify(decodedData, null, 2)}`)
              } catch (decodeError) {
                addToLog(`📄 Raw data (base64): ${data.data}`)
                addToLog(`📄 Decode error: ${decodeError}`)
              }
            } else {
              addToLog(`📄 No data in publication`)
            }
          } catch (error) {
            addToLog(`❌ Error processing publication: ${error}`)
            addToLog(`🔍 Raw event data: ${JSON.stringify(eventData, null, 2)}`)
          }
        }),


      ]
      
      addToLog('✅ Event listeners setup complete')
    } catch (error) {
      addToLog(`❌ Failed to setup event listeners: ${error}`)
      console.error('Event listeners setup error:', error)
    }
  }

  function loadSavedConfig() {
    const saved = localStorage.getItem('centrifugo-config')
    if (saved) {
      const config = JSON.parse(saved)
      url = config.url || url
      token = config.token || token
      clientName = config.clientName || clientName
      channels = config.channels || channels
      useProtobuf = config.useProtobuf || useProtobuf
      readTimeout = config.readTimeout || readTimeout
    }
  }

  function saveConfig() {
    const config = { url, token, clientName, channels, useProtobuf, readTimeout }
    localStorage.setItem('centrifugo-config', JSON.stringify(config))
  }

  function addToLog(message: string) {
    const timestamp = new Date().toLocaleTimeString()
    const logMessage = `[${timestamp}] ${message}`
    
          // Print to console
      console.log(logMessage)
      
      // Add to UI log
      eventLog += logMessage + '\n'
      
      // Limit log size (last 500 lines)
      const lines = eventLog.split('\n')
      if (lines.length > 500) {
        eventLog = lines.slice(-500).join('\n')
      }
  }

  function addToErrorLog(message: string) {
    const timestamp = new Date().toLocaleTimeString()
    const logMessage = `[${timestamp}] ${message}`
    
          // Print to console
      console.error(logMessage)
      
      // Add to error log UI
      errorLog += logMessage + '\n'
      
      // Limit error log size (last 200 lines)
      const lines = errorLog.split('\n')
      if (lines.length > 200) {
        errorLog = lines.slice(-200).join('\n')
      }
  }

  async function connectToCentrifugo() {
    try {
      addToLog('🔌 Starting connection to Centrifugo...')
      addToLog(`🌐 URL: ${url}`)
      addToLog(`👤 Client: ${clientName}`)
      addToLog(`📡 Channels: ${channels}`)
      addToLog(`🔧 Protobuf: ${useProtobuf}`)
      addToLog(`⏱️ Timeout: ${readTimeout}ms`)
      
      const channelList = channels.split(',').map(c => c.trim()).filter(c => c)
      addToLog(`📋 Parsed channels: [${channelList.join(', ')}]`)
      
      addToLog(`🔌 Connecting to channels: [${channelList.join(', ')}]`)
      
      await connect({
        url,
        token: token || undefined,
        name: clientName,
        channels: channelList,
        useProtobuf,
        readTimeout
      })
      
      saveConfig()
      addToLog('✅ Connection started successfully')
      
      // Check subscriptions after connection
      setTimeout(async () => {
        try {
          const subs = await getSubscriptions()
          addToLog(`📡 Current subscriptions: ${JSON.stringify(subs, null, 2)}`)
        } catch (error) {
          addToLog(`❌ Error getting subscriptions: ${error}`)
        }
      }, 1000)
    } catch (error) {
      addToLog(`❌ Failed to start connection: ${error}`)
    }
  }

  async function disconnectFromCentrifugo() {
    try {
      await disconnect()
      connectionStatus = 'Disconnected'
      subscriptions = {}
      addToLog('Connection stopped')
    } catch (error) {
      addToLog(`Failed to stop connection: ${error}`)
    }
  }

  async function setAuthToken() {
    try {
      await setToken(token)
      addToLog('Authentication token set')
    } catch (error) {
      addToLog(`Failed to set token: ${error}`)
    }
  }

  async function checkConnectionStatus() {
    try {
      const connected = await isConnected()
      connectionStatus = connected ? 'Connected' : 'Disconnected'
      addToLog(`Connection status: ${connectionStatus}`)
    } catch (error) {
      addToLog(`Failed to check connection: ${error}`)
    }
  }

  async function getConnectionStateInfo() {
    try {
      const state = await getConnectionState()
      addToLog(`Connection state: ${state}`)
    } catch (error) {
      addToLog(`Failed to get connection state: ${error}`)
    }
  }

  async function getSubscriptionsInfo() {
    try {
      const subs = await getSubscriptions()
      subscriptions = subs
      addToLog(`Subscriptions: ${JSON.stringify(subs)}`)
    } catch (error) {
      addToLog(`Failed to get subscriptions: ${error}`)
    }
  }

  async function checkAllSubscriptions() {
    try {
      addToLog('🔍 Checking all subscriptions and listeners...')
      
      const subs = await getSubscriptions()
      addToLog(`📡 Active subscriptions: ${JSON.stringify(subs, null, 2)}`)
      
      const connected = await isConnected()
      addToLog(`🔌 Connection status: ${connected}`)
      
      const state = await getConnectionState()
      addToLog(`📊 Connection state: ${state}`)
      
      addToLog(`🎧 Number of active listeners: ${unlisteners.length}`)
      
      // Check each channel
      for (const [channel, subscribed] of Object.entries(subs)) {
        if (subscribed) {
          addToLog(`✅ Channel ${channel}: subscribed`)
        } else {
          addToLog(`❌ Channel ${channel}: not subscribed`)
        }
      }
      
    } catch (error) {
      addToLog(`❌ Check error: ${error}`)
    }
  }

  async function publishMessage() {
    try {
      // Check connection status
      const connected = await isConnected()
      if (!connected) {
        addToLog('Cannot publish: not connected to server')
        return
      }
      
      const channel = publishChannel || channels.split(',')[0]?.trim() || 'test'
      const message = publishText || 'Hello from Tauri Centrifugo plugin!'
      
      addToLog(`Publishing message to channel: ${channel}`)
      addToLog(`Message content: "${message}"`)
      
      // Use helpers.publishJson for proper operation
      await helpers.publishJson(channel, { 
        text: message, 
        timestamp: Date.now(),
        client: clientName 
      })
      addToLog(`✅ Message successfully published to ${channel}`)
      publishResult = 'Message published successfully'
    } catch (error) {
      addToLog(`❌ Failed to publish: ${error}`)
      publishResult = `Error: ${error}`
    }
  }

  async function publishJsonMessage() {
    try {
      const channel = channels.split(',')[0]?.trim() || 'test'
      const data = { message: 'Hello from Tauri!', timestamp: Date.now(), client: clientName }
      
      addToLog(`Publishing JSON message to channel: ${channel}`)
      addToLog(`JSON data: ${JSON.stringify(data, null, 2)}`)
      
      await helpers.publishJson(channel, data)
      addToLog(`✅ JSON message successfully published to ${channel}`)
    } catch (error) {
      addToLog(`❌ Failed to publish JSON: ${error}`)
    }
  }

  async function executeRpc() {
    try {
      addToLog(`Executing RPC method: ${rpcMethod}`)
      addToLog(`RPC data: ${rpcData}`)
      
      // Use helpers.rpcJson for proper operation
      const data = JSON.parse(rpcData)
      const result = await helpers.rpcJson(rpcMethod, data)
      
      rpcResult = JSON.stringify(result)
      addToLog(`✅ RPC executed successfully`)
      addToLog(`RPC result: ${rpcResult}`)
    } catch (error) {
      addToLog(`❌ Failed to execute RPC: ${error}`)
    }
  }

  async function executeRpcJson() {
    try {
      const data = { userId: 123, action: 'getInfo' }
      const result = await helpers.rpcJson('getUserInfo', data)
      rpcResult = JSON.stringify(result)
      addToLog(`JSON RPC executed: ${rpcResult}`)
    } catch (error) {
      addToLog(`Failed to execute JSON RPC: ${error}`)
    }
  }

  async function addNewSubscription() {
    try {
      addToLog(`🔄 Adding subscription to channel: ${newChannel}`)
      
      await addSubscription(newChannel)
      subscriptionResult = `Subscribed to ${newChannel}`
      addToLog(`✅ Subscription to channel ${newChannel} successfully added`)
      addToLog(`🎧 Event handlers configured automatically`)
      addToLog(`📡 Expected events: onSubscribing → onSubscribed → onPublication`)
      
      // Update UI
      subscriptions[newChannel] = true
      subscriptions = { ...subscriptions }
      newChannel = ''
    } catch (error) {
      addToLog(`❌ Error adding subscription: ${error}`)
    }
  }

  async function removeSubscriptionChannel(channel: string) {
    try {
      await removeSubscription(channel)
      subscriptionResult = `Unsubscribed from ${channel}`
      addToLog(`Removed subscription from ${channel}`)
      
      // Update UI
      subscriptions[channel] = false
      subscriptions = { ...subscriptions }
      
      addToLog(`✅ Unsubscribed from channel ${channel}`)
      addToLog(`🎧 Event handlers cleared automatically`)
    } catch (error) {
      addToLog(`Failed to remove subscription: ${error}`)
    }
  }

  async function refreshSubscriptionsList() {
    try {
      addToLog('🔄 Refreshing subscriptions list...')
      
      // Check connection status
      const connected = await isConnected()
      if (!connected) {
        addToLog('❌ Not connected to server')
        return
      }
      
      // Get current subscriptions list
      const subs = await getSubscriptions()
      addToLog(`📡 Current subscriptions: ${JSON.stringify(subs, null, 2)}`)
      
      // Update UI
      subscriptions = subs
      
      addToLog('✅ Subscriptions list updated')
    } catch (error) {
      addToLog(`❌ Error updating subscriptions: ${error}`)
    }
  }

  async function testChannelMessage(channel: string) {
    try {
      addToLog(`🧪 Testing message reception on channel: ${channel}`)
      
      // Check connection status
      const connected = await isConnected()
      if (!connected) {
        addToLog('❌ Cannot test: not connected to server')
        return
      }
      
      // Publish test message to specific channel
      const testData = { 
        type: 'test', 
        message: `Test message for ${channel}`, 
        timestamp: Date.now(),
        client: clientName,
        channel: channel
      }
      
      addToLog(`📤 Publishing test message to ${channel}`)
      await helpers.publishJson(channel, testData)
      addToLog('✅ Test message published, check the log above for reception')
      
    } catch (error) {
      addToLog(`❌ Test failed: ${error}`)
    }
  }

  async function testReceiveMessage() {
    try {
      addToLog('🧪 Testing message reception...')
      
      // Check connection status
      const connected = await isConnected()
      if (!connected) {
        addToLog('❌ Cannot test: not connected to server')
        return
      }
      
      // Get current subscriptions
      const subs = await getSubscriptions()
      addToLog(`📡 Current subscriptions: ${Object.keys(subs).join(', ')}`)
      
      // Publish test message
      const channel = channels.split(',')[0]?.trim() || 'test'
      const testData = { 
        type: 'test', 
        message: 'This is a test message', 
        timestamp: Date.now(),
        client: clientName 
      }
      
      addToLog(`📤 Publishing test message to ${channel}`)
      await helpers.publishJson(channel, testData)
      addToLog('✅ Test message published, check the log above for reception')
      
    } catch (error) {
      addToLog(`❌ Test failed: ${error}`)
    }
  }

  async function startBackendSockets() {
    try {
      addToLog('🚀 Starting backend sockets...')
      const result = await invoke<string>('start_sockets')
      addToLog(`✅ ${result}`)
    } catch (error) {
      addToLog(`❌ Failed to start backend sockets: ${error}`)
    }
  }

  function clearLog() {
    eventLog = ''
  }

  function clearErrorLog() {
    errorLog = ''
  }
</script>

<main>
  <h1>🚀 Tauri Centrifugo Plugin Demo</h1>
  
  <div class="container">
    <!-- Connection Configuration -->
    <section class="config-section">
      <h2>🔌 Connection Configuration</h2>
      <div class="form-group">
        <label for="url">WebSocket URL:</label>
        <input id="url" type="text" bind:value={url} placeholder="ws://localhost:8000/connection/websocket" />
      </div>
      
      <div class="form-group">
        <label for="token">Token (optional):</label>
        <input id="token" type="text" bind:value={token} placeholder="JWT token" />
      </div>
      
      <div class="form-group">
        <label for="clientName">Client Name:</label>
        <input id="clientName" type="text" bind:value={clientName} />
      </div>
      
      <div class="form-group">
        <label for="channels">Channels (comma-separated):</label>
        <input id="channels" type="text" bind:value={channels} placeholder="updates,chat" />
      </div>
      
      <div class="form-group">
        <label>
          <input type="checkbox" bind:checked={useProtobuf} />
          Use Protobuf
        </label>
      </div>
      
      <div class="form-group">
        <label for="readTimeout">Read Timeout (ms):</label>
        <input id="readTimeout" type="number" bind:value={readTimeout} min="1000" max="30000" />
  </div>

      <div class="button-group">
        <button on:click={connectToCentrifugo} class="btn btn-primary">Connect</button>
        <button on:click={disconnectFromCentrifugo} class="btn btn-danger">Disconnect</button>
        <button on:click={setAuthToken} class="btn btn-warning">Set Token</button>
        <button on:click={startBackendSockets} class="btn btn-info">Start Backend Sockets</button>
        <button on:click={checkConnectionStatus} class="btn btn-secondary">Check Status</button>
        <button on:click={getConnectionStateInfo} class="btn btn-secondary">Get State</button>
        <button on:click={getSubscriptionsInfo} class="btn btn-secondary">Get Subscriptions</button>
        <button on:click={checkAllSubscriptions} class="btn btn-secondary">Check All</button>
      </div>
      
      <div class="status">
        <strong>Status:</strong> {connectionStatus}
      </div>
    </section>

    <!-- Publishing -->
    <section class="action-section">
      <h2>📤 Publishing Messages</h2>
      <div class="form-group">
        <label for="publishChannel">Channel:</label>
        <input id="publishChannel" type="text" bind:value={publishChannel} placeholder="test" />
      </div>
      <div class="form-group">
        <label for="publishText">Message:</label>
        <input id="publishText" type="text" bind:value={publishText} placeholder="Hello from Tauri!" />
      </div>
      <div class="button-group">
        <button on:click={publishMessage} class="btn btn-success">Publish Message</button>
        <button on:click={publishJsonMessage} class="btn btn-success">Publish JSON</button>
        <button on:click={testReceiveMessage} class="btn btn-info">Test Receive</button>
      </div>
      {#if publishResult}
        <div class="result">
          <strong>Publish Result:</strong> {publishResult}
        </div>
      {/if}
    </section>

    <!-- RPC -->
    <section class="action-section">
      <h2>🔄 RPC Calls</h2>
      <div class="form-group">
        <label for="rpcMethod">Method:</label>
        <input id="rpcMethod" type="text" bind:value={rpcMethod} />
      </div>
      <div class="form-group">
        <label for="rpcData">Data (JSON):</label>
        <input id="rpcData" type="text" bind:value={rpcData} />
      </div>
      <div class="button-group">
        <button on:click={executeRpc} class="btn btn-info">Execute RPC</button>
        <button on:click={executeRpcJson} class="btn btn-info">Execute JSON RPC</button>
      </div>
      {#if rpcResult}
        <div class="result">
          <strong>RPC Result:</strong> <pre>{rpcResult}</pre>
        </div>
      {/if}
    </section>

    <!-- Subscription Management -->
    <section class="action-section">
      <h2>📡 Subscription Management</h2>
      <div class="info-box">
        <p><strong>ℹ️ How it works:</strong></p>
        <ul>
          <li>When adding a subscription, all event handlers are automatically configured</li>
          <li>New subscriptions immediately start receiving messages without reconnection</li>
          <li>Use the "Test" button to verify the operation of a specific channel</li>
        </ul>
      </div>
      <div class="form-group">
        <label for="newChannel">New Channel:</label>
        <input id="newChannel" type="text" bind:value={newChannel} placeholder="channel-name" />
        <button on:click={addNewSubscription} class="btn btn-success">Add Subscription</button>
        <button on:click={refreshSubscriptionsList} class="btn btn-secondary">🔄 Refresh Subscriptions List</button>
      </div>

      {#if Object.keys(subscriptions).length > 0}
        <div class="subscriptions">
          <h3>Current Subscriptions:</h3>
          {#each Object.entries(subscriptions) as [channel, subscribed]}
            <div class="subscription-item">
              <span class="channel">{channel}</span>
              <span class="status {subscribed ? 'subscribed' : 'unsubscribed'}">
                {subscribed ? '✓' : '✗'}
              </span>
              {#if subscribed}
                <button on:click={() => removeSubscriptionChannel(channel)} class="btn btn-sm btn-danger">Unsubscribe</button>
                <button on:click={() => testChannelMessage(channel)} class="btn btn-sm btn-info">Test</button>
              {/if}
            </div>
          {/each}
        </div>
      {/if}
      
      {#if subscriptionResult}
        <div class="result">
          <strong>Subscription Result:</strong> {subscriptionResult}
        </div>
      {/if}
    </section>

    <!-- Event Log -->
    <section class="log-section">
      <h2>📋 Event Log</h2>
      <div class="log-controls">
        <button on:click={clearLog} class="btn btn-secondary">Clear Log</button>
      </div>
      <div class="log-container">
        <pre class="log-content" contenteditable="true" bind:innerHTML={eventLog}></pre>
      </div>
    </section>

    <!-- Error Log -->
    <section class="log-section error-log-section">
      <h2>❌ Error Log</h2>
      <div class="log-controls">
        <button on:click={clearErrorLog} class="btn btn-danger">Clear Error Log</button>
      </div>
      <div class="log-container error-log-container">
        <pre class="log-content error-log-content" contenteditable="true" bind:innerHTML={errorLog}></pre>
      </div>
    </section>
  </div>
</main>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f5f5f5;
  }

  main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  h1 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
  }

  .container {
    display: grid;
    gap: 20px;
  }

  section {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  .config-section {
    border-left: 4px solid #007acc;
  }

  .action-section {
    border-left: 4px solid #28a745;
  }

  .log-section {
    border-left: 4px solid #ffc107;
  }

  .error-log-section {
    border-left: 4px solid #dc3545;
  }

  h2 {
    margin-top: 0;
    color: #333;
    font-size: 1.2em;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #555;
  }

  input[type="text"], input[type="number"] {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }

  .button-group {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin: 15px 0;
  }

  .btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.2s;
  }

  .btn-primary { background: #007acc; color: white; }
  .btn-primary:hover { background: #005a9e; }
  
  .btn-success { background: #28a745; color: white; }
  .btn-success:hover { background: #1e7e34; }
  
  .btn-danger { background: #dc3545; color: white; }
  .btn-danger:hover { background: #c82333; }
  
  .btn-secondary { background: #6c757d; color: white; }
  .btn-secondary:hover { background: #545b62; }
  
  .btn-info { background: #17a2b8; color: white; }
  .btn-info:hover { background: #138496; }
  
  .btn-warning { background: #ffc107; color: #212529; }
  .btn-warning:hover { background: #e0a800; }

  .btn-sm {
    padding: 4px 8px;
    font-size: 12px;
  }

  .status {
    margin-top: 15px;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 4px;
    border-left: 3px solid #007acc;
  }

  .result {
    margin-top: 15px;
    padding: 10px;
    background: #f8f9fa;
    border-radius: 4px;
    border: 1px solid #dee2e6;
  }

  .result pre {
    margin: 0;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .subscriptions {
    margin-top: 15px;
  }

  .subscription-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px;
    background: #f8f9fa;
    border-radius: 4px;
    margin-bottom: 5px;
  }

  .channel {
    font-family: monospace;
    font-weight: 500;
  }

  .status.subscribed {
    color: #28a745;
    font-weight: bold;
  }

  .status.unsubscribed {
    color: #dc3545;
    font-weight: bold;
  }

  .log-controls {
    margin-bottom: 15px;
  }

  .log-container {
    background: #1e1e1e;
    border-radius: 4px;
    padding: 15px;
    max-height: 400px;
    overflow-y: auto;
  }

  .log-container pre {
    margin: 0;
    color: #d4d4d4;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 12px;
    line-height: 1.4;
  }

  .log-content {
    margin: 0;
    padding: 10px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    line-height: 1.4;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 100%;
    box-sizing: border-box;
  }
  
  .log-content::-webkit-scrollbar {
    width: 8px;
  }
  
  .log-content::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  .log-content::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  
  .log-content::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .error-log-container {
    background: #2d1b1b;
    border: 1px solid #dc3545;
  }

  .error-log-content {
    color: #ff6b6b;
  }

  .info-box {
    background: #e3f2fd;
    border: 1px solid #2196f3;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 20px;
  }

  .info-box p {
    margin: 0 0 10px 0;
    color: #1976d2;
    font-weight: 500;
  }

  .info-box ul {
    margin: 0;
    padding-left: 20px;
    color: #424242;
  }

  .info-box li {
    margin-bottom: 5px;
  }

  @media (max-width: 768px) {
    .button-group {
      flex-direction: column;
    }
    
    .btn {
      width: 100%;
    }
  }
</style>
