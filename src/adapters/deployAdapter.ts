import { Event, MockDeploy } from '../models/event'

export function normalizeDeploys(deploys: MockDeploy[]): Event[] {
  return deploys.map((deploy) => ({
    id: deploy.id,
    timestamp: deploy.timestamp,
    service: deploy.service,
    kind: 'deploy',
    severity: deploy.severity,
    message: `Deploy ${deploy.version} to ${deploy.environment}`,
    source: 'mock-deploys',
    metadata: {
      version: deploy.version,
      environment: deploy.environment,
    },
  }))
}
