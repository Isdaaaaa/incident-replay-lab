import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'
import { Event, EventKind, EventSeverity } from '../../../src/models/event'

const allKinds: EventKind[] = ['incident', 'alert', 'trace', 'deploy', 'log', 'note']
const allSeverities: EventSeverity[] = ['critical', 'major', 'minor', 'warning', 'info']

function asSingle(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'normalized_events_v3.json')

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'normalized_events_v3.json not generated yet' })
    }

    const raw = fs.readFileSync(filePath, 'utf8')
    let events: Event[] = JSON.parse(raw)

    const kind = asSingle(req.query.kind)
    const severity = asSingle(req.query.severity)

    if (kind && allKinds.includes(kind as EventKind)) {
      events = events.filter((event) => event.kind === kind)
    }

    if (severity && allSeverities.includes(severity as EventSeverity)) {
      events = events.filter((event) => event.severity === severity)
    }

    return res.status(200).json(events)
  } catch (error) {
    return res.status(500).json({ error: 'failed to read normalized v3 events' })
  }
}
