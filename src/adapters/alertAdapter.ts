import { Event, MockAlert } from '../models/event'

export function normalizeAlerts(alerts: MockAlert[]): Event[] {
  return alerts.map((alert) => ({
    id: alert.id,
    timestamp: alert.timestamp,
    service: alert.service,
    kind: 'alert',
    severity: alert.severity,
    message: `${alert.alertName}: ${alert.description}`,
    source: 'mock-alerts',
    metadata: {
      alertName: alert.alertName,
      description: alert.description,
    },
  }))
}
