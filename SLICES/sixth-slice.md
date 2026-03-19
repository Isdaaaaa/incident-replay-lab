# SLICES/sixth-slice.md — Final polish & docs

Summary
- Final polish, documentation, deployment handoff, and smoke verification for incident-replay-lab.

Scope
- Update and finalize README with install, build, run, API examples, and known limitations.
- Add a deployment runbook (docs/deploy.md) with manual steps to deploy to a simple Node host (build → start), env var list, and healthcheck.
- Add verification scripts (scripts/smoke_check.sh or a Node script) that run key curl checks against /api/v3/events and timeline pages.
- Add a changelog entry (CHANGELOG.md) summarizing completed slices and notable commits.
- Capture 2–3 example screenshots or code snippets for README (can be small static images or inline snippets).
- Ensure package.json has helpful scripts: start, build, generate:v3-events, smoke.
- Minor code tidy: add comments called out in prior review (scripts/generate_v3_events.ts).

Files to read/update first
- README.md, STATUS.md, TODO.md
- SLICES/sixth-slice.md (this file)
- pages/api/v3/events.ts, data/normalized_events_v3.json
- scripts/generate_v3_events.ts
- deployment/ (if present) or docs/

Acceptance criteria
- README contains:
  - install (npm ci), generate (npm run generate:v3-events), build (npm run build), run (npm start)
  - curl examples for /api/v3/events including filtering (kind, severity)
  - one short deploy/run example
- docs/deploy.md (or deployment/README) with clear manual deploy steps and env var list.
- scripts/smoke_check.* executes (npm run smoke) and returns non-zero on failure; smoke runs at least:
  - curl /api/v3/events
  - curl /api/v3/events?kind=alert
  - curl the timeline page (render check)
- CHANGELOG.md updated with completed slices and PR links
- PR opened and merged into main
- PR description includes verification commands and screenshot attachments (or inline snippets)
- Post-DONE report: branch name, commit hash, PR link, files changed, verification commands

Stop condition / deliverable
- Post DONE with PR link and the required report (use DONE_REPORT_TEMPLATE.md). Only DONE or BLOCKED messages accepted.

Estimated time
- 2–4 hours (depending on screenshot capture and minor fixes)

Reviewer(s)
- Primary reviewer: pf-pm
- Secondary reviewer: pf-orch for dispatch/final acceptance

Notes / non-blocking suggestions
- If screenshots are awkward, include terminal output snippets instead.
- Prefer small smoke script that exits non-zero on failure so CI can use it later.
- Keep instructions minimal and copy-paste friendly.
