import { Event, EventKind, EventSeverity } from './models/event'

export type TimelineFilters = {
  kinds: EventKind[]
  service: string
  severity: EventSeverity | 'all'
  windowMinutes: number | 'all'
  selectedEventId?: string
}

export const allEventKinds: EventKind[] = ['incident', 'alert', 'trace', 'deploy', 'log', 'note']

export const allSeverities: Array<EventSeverity | 'all'> = ['all', 'critical', 'major', 'minor', 'warning', 'info']

export const timeWindowOptions: Array<number | 'all'> = ['all', 15, 30, 60, 180]

export function defaultFilters(): TimelineFilters {
  return {
    kinds: [...allEventKinds],
    service: 'all',
    severity: 'all',
    windowMinutes: 'all',
  }
}

export function applyFilters(events: Event[], filters: TimelineFilters): Event[] {
  const sorted = [...events].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  const latest = sorted[sorted.length - 1]
  const cutoff =
    filters.windowMinutes === 'all' || !latest
      ? null
      : new Date(latest.timestamp).getTime() - filters.windowMinutes * 60 * 1000

  return sorted.filter((event) => {
    if (!filters.kinds.includes(event.kind)) return false
    if (filters.service !== 'all' && event.service !== filters.service) return false
    if (filters.severity !== 'all' && event.severity !== filters.severity) return false
    if (cutoff !== null && new Date(event.timestamp).getTime() < cutoff) return false
    return true
  })
}

export function getServices(events: Event[]): string[] {
  return Array.from(new Set(events.map((event) => event.service))).sort()
}

export function parseFilters(query: Record<string, string | string[] | undefined>): TimelineFilters {
  const defaults = defaultFilters()
  const rawKinds = typeof query.kinds === 'string' ? query.kinds.split(',').filter(Boolean) : defaults.kinds
  const kinds = rawKinds.filter((kind): kind is EventKind => allEventKinds.includes(kind as EventKind))
  const rawSeverity = typeof query.severity === 'string' ? query.severity : 'all'
  const severity = allSeverities.includes(rawSeverity as EventSeverity | 'all')
    ? (rawSeverity as EventSeverity | 'all')
    : 'all'
  const rawWindow = typeof query.windowMinutes === 'string' ? query.windowMinutes : 'all'
  const parsedWindow = rawWindow === 'all' ? 'all' : Number(rawWindow)
  const windowMinutes = parsedWindow === 'all' || Number.isFinite(parsedWindow) ? parsedWindow : 'all'
  const service = typeof query.service === 'string' && query.service.trim() ? query.service : 'all'
  const selectedEventId = typeof query.selectedEventId === 'string' ? query.selectedEventId : undefined

  return {
    kinds: kinds.length > 0 ? kinds : defaults.kinds,
    service,
    severity,
    windowMinutes: windowMinutes === 'all' ? 'all' : Number(windowMinutes),
    selectedEventId,
  }
}

export function filtersToQuery(filters: TimelineFilters): Record<string, string> {
  const query: Record<string, string> = {
    kinds: filters.kinds.join(','),
  }

  if (filters.service !== 'all') query.service = filters.service
  if (filters.severity !== 'all') query.severity = filters.severity
  if (filters.windowMinutes !== 'all') query.windowMinutes = String(filters.windowMinutes)
  if (filters.selectedEventId) query.selectedEventId = filters.selectedEventId

  return query
}
