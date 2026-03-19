import { Event, MockLog } from '../models/event'

export function normalizeLogs(logs: MockLog[]): Event[] {
  return logs.map((log) => ({
    id: log.id,
    timestamp: log.timestamp,
    service: log.service,
    kind: 'log',
    severity: log.severity,
    message: log.summary,
    source: 'mock-logs',
    metadata: {
      summary: log.summary,
    },
  }))
}
