export type EventKind = 'incident' | 'alert' | 'deploy' | 'trace' | 'log' | 'note'

export type EventSeverity = 'critical' | 'major' | 'minor' | 'warning' | 'info'

export type EventSource = 'mock-incidents'

export type Event = {
  id: string
  timestamp: string
  service: string
  kind: EventKind
  severity?: EventSeverity
  message: string
  source: EventSource
  metadata?: Record<string, unknown>
}

export type MockIncident = {
  id: string
  service: string
  severity: EventSeverity
  message: string
  timestamp: string
}

export function isEvent(value: unknown): value is Event {
  if (!value || typeof value !== 'object') return false

  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.timestamp === 'string' &&
    typeof candidate.service === 'string' &&
    typeof candidate.kind === 'string' &&
    typeof candidate.message === 'string' &&
    typeof candidate.source === 'string'
  )
}
