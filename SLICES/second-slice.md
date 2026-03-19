Title: Timeline UI prototype (scrubber + lanes)

Goal: Build a minimal frontend timeline UI that can load the generated mock incidents and display them on a horizontal timeline with a scrubber. Provide lanes for service health, deploys, alerts, and annotations. The UI should allow the user to scrub through time and see event cards for the selected time window.

Deliverables:
- pages/timeline.tsx: a Next.js page that loads /api/mock-incidents and renders a horizontal timeline with a scrubber.
- components/Timeline.tsx: reusable timeline component with lanes for service health, deploys, alerts, annotations.
- components/IncidentCard.tsx: small event card component showing timestamp, service, severity, and short message, with link to source event id.
- styles (tailwind classes or simple CSS module) for basic layout.
- Update README with how to view the timeline page.

Acceptance criteria:
- Timeline page at /timeline loads data from /api/mock-incidents and renders a timeline.
- Scrubber can be moved and updates a highlighted time cursor.
- At least one lane (alerts) shows events positioned by timestamp.
- UI is minimal but functional; focus on correct data mapping and timeline interaction.

Notes:
- Keep styling minimal; no need for polished design.
- Use client-side rendering for the timeline page.
- Keep the slice small: do not implement annotations edit/save or export yet.

Report back format:
- completed work
- files changed
- verification steps
- blocker or risk
- recommended next step
