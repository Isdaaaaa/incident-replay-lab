import path from 'path'
import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const p = path.join(process.cwd(), 'data', 'normalized_events.json')
    if (!fs.existsSync(p)) {
      return res.status(404).json({ error: 'normalized events not generated' })
    }
    const raw = fs.readFileSync(p, 'utf8')
    const events = JSON.parse(raw)
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(events)
  } catch (err) {
    res.status(500).json({ error: 'read error' })
  }
}
