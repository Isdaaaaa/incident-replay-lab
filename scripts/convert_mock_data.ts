import fs from 'fs'
import path from 'path'
import { normalizeMockIncidents } from '../src/adapters/mockIncidentAdapter'
import { MockIncident } from '../src/models/event'

const root = process.cwd()
const sourcePath = path.join(root, 'data', 'mock_incidents.json')
const outputPath = path.join(root, 'data', 'normalized_events_v2.json')

export function loadMockIncidents(): MockIncident[] {
  return JSON.parse(fs.readFileSync(sourcePath, 'utf8')) as MockIncident[]
}

export function writeNormalizedEvents() {
  const incidents = loadMockIncidents()
  const events = normalizeMockIncidents(incidents)

  fs.writeFileSync(outputPath, JSON.stringify(events, null, 2))
  return { outputPath, count: events.length, events }
}

if (require.main === module) {
  const result = writeNormalizedEvents()
  console.log(`Wrote ${result.count} events to ${result.outputPath}`)
}
