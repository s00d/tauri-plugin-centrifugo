# Centrifugo Server

Server-side component for Tauri Centrifugo Plugin with gRPC API.

## Quick Start

```bash
# Installation and build
npm run setup

# Start Centrifugo server
npm run centrifugo:dev   

# In another terminal - start message sending script
npm dev
```

## Ports

- **8001** - HTTP/WebSocket (main server)
- **10001** - gRPC API
- **1420** - Tauri dev server (in allowed_origins)

## Structure

- `centrifugo.json` - Centrifugo v5 configuration
- `src/info-sender.ts` - TypeScript message sending script
- `proto/api.proto` - gRPC API definitions
- `dist/` - compiled JavaScript code

## Commands

```bash
npm run centrifugo      # Start Centrifugo
npm start               # Start script
npm run dev             # Development mode
npm run build           # TypeScript build
npm run typecheck       # Type checking
```

Detailed documentation: [README-INFO-SENDER.md](README-INFO-SENDER.md)
