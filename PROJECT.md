# Incident Replay Lab

Slug: incident-replay-lab

Short description: Build an MVP that turns telemetry and team events into a synchronized, explorable incident timeline. Start with synthetic incident data and focus on timeline reconstruction, evidence linking, and an explainable AI-assisted summary.

MVP scope:
- Import mock/synthetic logs, traces, deploys, alerts, and notes
- Normalize into unified event model
- Timeline replay UI with scrubber and lanes
- Exportable postmortem with cited evidence

Stack: Next.js (TS), Node.js backend routes, Postgres (JSONB), simple ingestion workers, vector/keyword indexing for notes.

Acceptance criteria:
- Working local repo with planning docs
- First slice assigned to pf-build to create the project skeleton and mock data import
