import { Event, EventKind, MockIncident } from '../models/event'

const KIND_SEQUENCE: EventKind[] = ['incident', 'alert', 'trace', 'deploy', 'note']
const MINUTE = 60 * 1000

function addMinutes(timestamp: string, minutes: number) {
  return new Date(new Date(timestamp).getTime() + minutes * MINUTE).toISOString()
}

function buildEvent(base: MockIncident, suffix: string, kind: EventKind, minuteOffset: number, message: string): Event {
  return {
    id: `${base.id}-${suffix}`,
    timestamp: addMinutes(base.timestamp, minuteOffset),
    service: base.service,
    kind,
    severity: kind === 'note' ? 'info' : base.severity,
    message,
    source: 'mock-incidents',
    metadata: {
      originalIncidentId: base.id,
      minuteOffset,
    },
  }
}

export function mockIncidentToEvents(incident: MockIncident): Event[] {
  return [
    buildEvent(incident, 'incident', 'incident', 0, incident.message),
    buildEvent(incident, 'alert', 'alert', 1, `${incident.service} alert fired for ${incident.message}`),
    buildEvent(incident, 'trace', 'trace', 2, `Trace captured for ${incident.service} around ${incident.id}`),
    buildEvent(incident, 'deploy', 'deploy', 3, `Deploy context recorded for ${incident.service}`),
    buildEvent(incident, 'note', 'note', 4, `Responder note attached to ${incident.id}`),
  ]
}

export function normalizeMockIncidents(incidents: MockIncident[]): Event[] {
  const normalized = incidents.flatMap(mockIncidentToEvents)

  normalized.sort((left, right) => {
    const byTime = new Date(left.timestamp).getTime() - new Date(right.timestamp).getTime()
    if (byTime !== 0) return byTime
    return KIND_SEQUENCE.indexOf(left.kind) - KIND_SEQUENCE.indexOf(right.kind)
  })

  return normalized
}
