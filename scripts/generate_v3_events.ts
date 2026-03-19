import fs from 'fs'
import path from 'path'
import {
  Event,
  MockAlert,
  MockChatNote,
  MockDeploy,
  MockIncident,
  MockLog,
  MockTrace,
} from '../src/models/event'
import { normalizeMockIncidents } from '../src/adapters/mockIncidentAdapter'
import { normalizeAlerts } from '../src/adapters/alertAdapter'
import { normalizeDeploys } from '../src/adapters/deployAdapter'
import { normalizeTraces } from '../src/adapters/traceAdapter'
import { normalizeLogs } from '../src/adapters/logAdapter'
import { normalizeChatNotes } from '../src/adapters/chatAdapter'

const root = process.cwd()
const incidentsPath = path.join(root, 'data', 'mock_incidents.json')
const outputPath = path.join(root, 'data', 'normalized_events_v3.json')
const MINUTE = 60 * 1000

function addMinutes(timestamp: string, minutes: number) {
  return new Date(new Date(timestamp).getTime() + minutes * MINUTE).toISOString()
}

function loadMockIncidents(): MockIncident[] {
  return JSON.parse(fs.readFileSync(incidentsPath, 'utf8')) as MockIncident[]
}

function buildAlerts(incidents: MockIncident[]): MockAlert[] {
  return incidents.map((incident, index) => ({
    id: `alert-${incident.id}`,
    service: incident.service,
    severity: incident.severity,
    alertName: `${incident.service}-synthetic-alert-${index + 1}`,
    description: `Threshold breach linked to ${incident.message}`,
    timestamp: addMinutes(incident.timestamp, 6 + index),
  }))
}

function buildDeploys(incidents: MockIncident[]): MockDeploy[] {
  return incidents.map((incident, index) => ({
    id: `deploy-${incident.id}`,
    service: incident.service,
    severity: incident.severity === 'info' ? 'minor' : incident.severity,
    version: `2026.03.${19 + index}`,
    environment: index % 2 === 0 ? 'production' : 'staging',
    timestamp: addMinutes(incident.timestamp, 9 + index),
  }))
}

function buildTraces(incidents: MockIncident[]): MockTrace[] {
  return incidents.map((incident, index) => ({
    id: `trace-${incident.id}`,
    service: incident.service,
    severity: incident.severity,
    operation: index % 2 === 0 ? 'POST /login' : 'POST /checkout',
    durationMs: 240 + index * 110,
    timestamp: addMinutes(incident.timestamp, 12 + index),
  }))
}

function buildLogs(incidents: MockIncident[]): MockLog[] {
  return incidents.map((incident, index) => ({
    id: `log-${incident.id}`,
    service: incident.service,
    severity: incident.severity,
    summary: `Log correlation for ${incident.id}: retry_count=${index + 2}`,
    timestamp: addMinutes(incident.timestamp, 15 + index),
  }))
}

function buildChatNotes(incidents: MockIncident[]): MockChatNote[] {
  const authors = ['oncall-bot', 'sam', 'priya']

  return incidents.map((incident, index) => ({
    id: `note-${incident.id}`,
    service: incident.service,
    author: authors[index % authors.length],
    message: `Investigating ${incident.id}; latest status shared with the room.`,
    timestamp: addMinutes(incident.timestamp, 18 + index),
  }))
}

export function generateV3Events(): Event[] {
  const incidents = loadMockIncidents()

  const events = [
    ...normalizeMockIncidents(incidents),
    ...normalizeAlerts(buildAlerts(incidents)),
    ...normalizeDeploys(buildDeploys(incidents)),
    ...normalizeTraces(buildTraces(incidents)),
    ...normalizeLogs(buildLogs(incidents)),
    ...normalizeChatNotes(buildChatNotes(incidents)),
  ].sort((left, right) => new Date(left.timestamp).getTime() - new Date(right.timestamp).getTime())

  fs.writeFileSync(outputPath, JSON.stringify(events, null, 2))
  return events
}

if (require.main === module) {
  const events = generateV3Events()
  console.log(`Wrote ${events.length} events to ${outputPath}`)
}
