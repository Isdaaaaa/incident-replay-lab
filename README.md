Minimal Next.js TypeScript scaffold for incident-replay-lab.

Quick start (local)

1. Install dependencies

```bash
npm ci
```

2. Generate the v3 events dataset (if needed)

```bash
npm run generate:v3-events
```

3. Build and start

```bash
npm run build
npm start
```

4. Smoke check (local)

```bash
npm run smoke
# or
./scripts/smoke_check.sh http://localhost:3000
```

APIs (examples)

- List all events (v3):

```bash
curl http://localhost:3000/api/v3/events | jq '.'
```

- Filtered: events of kind=alert

```bash
curl "http://localhost:3000/api/v3/events?kind=alert" | jq '.'
```

- Filtered by multiple kinds and severity

```bash
curl "http://localhost:3000/api/v3/events?kind=incident,alert&severity=critical" | jq '.'
```

Timeline UI

- Open `http://localhost:3000/timeline` after generating v3 data
- Use the filter controls (kind, service, severity, time window) to narrow results
- Selected event pins and URL state persist across reloads

Manual verification

1. `npm run generate:v3-events`
2. `npm run dev`
3. Open `http://localhost:3000/timeline`
4. Toggle filters and confirm the URL query string updates
5. Click an event card and confirm the pinned-event panel appears and persists
6. `curl "http://localhost:3000/api/v3/events?kind=alert" | jq 'map(.kind) | unique'`

Notes

- The v3 dataset is written to `data/normalized_events_v3.json` and used by the timeline and v3 API.
- For CI or non-interactive checks, use `npm run smoke` which runs the smoke checks in `scripts/smoke_check.sh`.
