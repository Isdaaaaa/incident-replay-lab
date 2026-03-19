import fs from 'fs'
import path from 'path'

type Incident = {
  id: string
  service: string
  severity: 'critical' | 'major' | 'minor' | 'info'
  message: string
  timestamp: string
}

function generateSampleIncidents(): Incident[] {
  const now = Date.now()
  return [
    {
      id: 'inc-001',
      service: 'auth-service',
      severity: 'critical',
      message: 'Authentication DB connection lost',
      timestamp: new Date(now - 1000 * 60 * 60 * 5).toISOString()
    },
    {
      id: 'inc-002',
      service: 'payment-gateway',
      severity: 'major',
      message: 'Payment retries increased above threshold',
      timestamp: new Date(now - 1000 * 60 * 30).toISOString()
    },
    {
      id: 'inc-003',
      service: 'search-indexer',
      severity: 'minor',
      message: 'Indexing lag detected',
      timestamp: new Date(now - 1000 * 60 * 5).toISOString()
    }
  ]
}

function writeIncidents(incidents: Incident[]) {
  const dataDir = path.resolve(process.cwd(), 'data')
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir)
  const file = path.join(dataDir, 'mock_incidents.json')
  fs.writeFileSync(file, JSON.stringify(incidents, null, 2), 'utf8')
  console.log('Wrote', file)
}

if (require.main === module) {
  const incidents = generateSampleIncidents()
  writeIncidents(incidents)
}

export { generateSampleIncidents, writeIncidents }
