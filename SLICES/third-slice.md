Title: Unified event model + import adapters (minimal)

Goal: Define and implement a small unified event model and adapter layer so different mock signal types (logs, traces, deploys, alerts, chat notes) map to a common shape the timeline UI can consume.

Deliverables:
- src/models/event.ts: TypeScript types for the unified Event shape (id, timestamp, service, kind, severity, message, source, metadata)
- scripts/convert_mock_data.ts: small script that reads data/mock_incidents.json and outputs data/normalized_events.json in the unified format
- pages/api/events.ts: API endpoint that returns data/normalized_events.json
- Update README with how to regenerate normalized events (npm run generate:normalized)
- package.json script: "generate:normalized" to run scripts/convert_mock_data.ts

Acceptance criteria:
- scripts/convert_mock_data.ts generates data/normalized_events.json with at least 10 events spanning multiple kinds (log, trace, deploy, alert, note)
- /api/events returns the normalized events
- Timeline can be configured (later) to load /api/events instead of /api/mock-incidents

Notes:
- Keep transformations simple and deterministic; use timestamp jitter/spread to produce varied timeline positions
- Do not refactor existing timeline code yet; this slice creates the normalized data + endpoint for later swap

Report back format:
- completed work
- files changed
- verification steps
- blocker or risk
- recommended next step
