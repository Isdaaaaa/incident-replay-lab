export type EventKind = 'incident' | 'alert' | 'deploy' | 'trace' | 'log' | 'note'

export type EventSeverity = 'critical' | 'major' | 'minor' | 'warning' | 'info'

export type EventSource = 'mock-incidents' | 'mock-alerts' | 'mock-deploys' | 'mock-traces' | 'mock-logs' | 'mock-chat'

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

export type MockAlert = {
  id: string
  service: string
  severity: EventSeverity
  alertName: string
  description: string
  timestamp: string
}

export type MockDeploy = {
  id: string
  service: string
  severity: Exclude<EventSeverity, 'info'>
  version: string
  environment: string
  timestamp: string
}

export type MockTrace = {
  id: string
  service: string
  severity: EventSeverity
  operation: string
  durationMs: number
  timestamp: string
}

export type MockLog = {
  id: string
  service: string
  severity: EventSeverity
  summary: string
  timestamp: string
}

export type MockChatNote = {
  id: string
  service: string
  author: string
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
