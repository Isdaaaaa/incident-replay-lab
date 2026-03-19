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

Manual verification:
1. `npm run generate:normalized-v2`
2. `npm run dev`
3. Open `http://localhost:3000/timeline`
4. Confirm `http://localhost:3000/api/normalized_v2` returns the same normalized events used by the page
