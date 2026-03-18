Title: Project skeleton + mock data generator

Goal: Initialize a Next.js TypeScript app with a backend route to ingest mock incident data and a script to generate realistic synthetic incidents (logs, traces, deploys, alerts, chat notes).

Deliverables:
- Next.js app scaffold (TypeScript)
- /api/mock-incidents route that returns generated incidents
- scripts/generate_incidents.ts that writes sample JSON into /data/mock_incidents.json
- package.json scripts: "dev", "build", "start", "generate:incidents"

Acceptance criteria:
- The dev server starts locally
- The script generates a sample JSON file with at least 3 incidents of varying services and severities

Notes:
- Keep implementation minimal; focus on structure and test data quality.
