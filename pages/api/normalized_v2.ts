import fs from 'fs'
import path from 'path'
import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = path.join(process.cwd(), 'data', 'normalized_events_v2.json')

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'normalized_events_v2.json not generated yet' })
    }

    const raw = fs.readFileSync(filePath, 'utf8')
    res.status(200).json(JSON.parse(raw))
  } catch (error) {
    return res.status(500).json({ error: 'failed to read normalized v2 events' })
  }
}
