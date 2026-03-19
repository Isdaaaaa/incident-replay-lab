# Deploy (manual)

This is a minimal manual deploy guide for incident-replay-lab.

1. Install dependencies

```bash
npm ci
```

2. Generate events (if needed)

```bash
npm run generate:v3-events
```

3. Build and start

```bash
npm run build
npm start
```

4. Healthcheck

```bash
curl -fsS http://localhost:3000/api/v3/events || exit 1
```

Env vars: none required for local dev. Add any production envs here.
