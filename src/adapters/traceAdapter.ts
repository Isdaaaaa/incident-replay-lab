import { Event, MockTrace } from '../models/event'

export function normalizeTraces(traces: MockTrace[]): Event[] {
  return traces.map((trace) => ({
    id: trace.id,
    timestamp: trace.timestamp,
    service: trace.service,
    kind: 'trace',
    severity: trace.severity,
    message: `${trace.operation} completed in ${trace.durationMs}ms`,
    source: 'mock-traces',
    metadata: {
      operation: trace.operation,
      durationMs: trace.durationMs,
    },
  }))
}
