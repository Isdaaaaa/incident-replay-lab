Minimal Next.js TypeScript scaffold for incident-replay-lab.

Run locally:

1. npm install
2. npm run generate:incidents
3. npm run generate:normalized-v2
4. npm run dev

APIs:
- GET /api/mock-incidents
- GET /api/normalized_v2

Utilities:
- npm run generate:normalized-v2
- npm run test:normalized

Timeline UI:
- Visit `/timeline` after generating normalized data
- `/timeline` reads `data/normalized_events_v2.json` server-side so the page stays consistent with `/api/normalized_v2`
- Filter controls support event kind, service, severity, and time window
- Selected events pin context in the UI and persist in the URL query state

Manual verification:
1. `npm run generate:normalized-v2`
2. `npm run dev`
3. Open `http://localhost:3000/timeline`
4. Toggle kind filters, service, severity, and time window controls and confirm the URL query string updates
5. Click an event card and confirm the pinned-event panel appears and the selected event persists in the URL
6. Confirm `http://localhost:3000/api/normalized_v2?kinds=incident,alert&severity=critical` returns a filtered subset of events

V3 dataset + API verification:
1. `npm run generate:v3-events`
2. `npm run dev`
3. `curl http://localhost:3000/api/v3/events | jq 'length'` should return at least `20`
4. `curl "http://localhost:3000/api/v3/events?kind=alert" | jq 'map(.kind) | unique'`
5. `curl "http://localhost:3000/api/v3/events?kind=deploy" | jq '.[0]'`
6. `curl "http://localhost:3000/api/v3/events?severity=critical" | jq 'map({id,kind,severity,service})'`

The v3 dataset combines incidents, alerts, deploys, traces, logs, and chat notes into a single normalized feed written to `data/normalized_events_v3.json`.
