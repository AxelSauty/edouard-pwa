# Edouard PWA

The primary view for the Edouard personal assistant. Reached over Tailscale -
no public exposure. See [`Pi5-personal-assistant.md`](../Pi5-personal-assistant.md)
for the full architecture.

## Role

- Display + writes for calendar, projects, tasks, journaling, routines.
- Local speech-to-text for journaling (audio never leaves the server).
- Chat panel (later) - reaches Hermes' OpenAI-compatible API via the proxy.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 + shadcn/ui base
- recharts for data visualization
- vite-plugin-pwa (service worker + manifest)

## Development

### Local

```bash
npm install
npm run dev      # http://localhost:5173 (base: /app/)
npm run build    # outputs to dist/
```

### On the VM

The PWA is built as part of the `web` (nginx) container in
`infra/docker-compose.yml` via a multi-stage Dockerfile
(`infra/docker/web.Dockerfile`):

1. Stage 1 (`pwa-build`): `npm ci && npm run build` -> `/dist`
2. Stage 2 (`nginx`): assembles Laravel source + PWA dist into one nginx image

The PWA is served at `/app/` by nginx; Laravel API at `/`.

Source is synced to `~/agent/edouard-pwa/` (rsync from Mac until a GitHub deploy
key is set up on the VM).

```bash
cd ~/agent
docker compose build web
docker compose up -d web
```

## Structure

```
src/
  App.tsx           # Dashboard - MCP connection check + sample chart
  lib/utils.ts      # cn() helper for shadcn/ui
  index.css         # Tailwind v4 theme tokens
vite.config.ts      # Vite + Tailwind + PWA + /app/ base path
Dockerfile          # Build-only (outputs to /dist)
```
