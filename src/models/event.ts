export type EventKind = 'incident' | 'alert' | 'deploy' | 'note' | 'metric'

export type Event = {
  id: string
  kind: EventKind
  source: string // original source or service
  severity?: 'critical' | 'major' | 'minor' | 'warning' | 'info'
  title: string
  details?: string
  timestamp: string // ISO
  meta?: Record<string, any>
}

export function isEvent(v: any): v is Event {
  return v && typeof v.id === 'string' && typeof v.kind === 'string' && typeof v.timestamp === 'string'
}
