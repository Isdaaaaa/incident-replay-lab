import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'
import { applyFilters, parseFilters } from '../../src/filters'
import { Event } from '../../src/models/event'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'normalized_events_v2.json')

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'normalized_events_v2.json not generated yet' })
    }

    const raw = fs.readFileSync(filePath, 'utf8')
    const events: Event[] = JSON.parse(raw)
    const filters = parseFilters(req.query)
    const filtered = applyFilters(events, filters)

    res.status(200).json(filtered)
  } catch (error) {
    return res.status(500).json({ error: 'failed to read normalized v2 events' })
  }
}
