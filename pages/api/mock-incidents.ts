import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

type Incident = {
  id: string
  service: string
  severity: 'critical' | 'major' | 'minor' | 'info'
  message: string
  timestamp: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Incident[] | { error: string }>) {
  try {
    const dataPath = path.resolve(process.cwd(), 'data', 'mock_incidents.json')
    if (!fs.existsSync(dataPath)) {
      return res.status(404).json({ error: 'mock incidents not generated yet' })
    }
    const raw = fs.readFileSync(dataPath, 'utf8')
    const incidents: Incident[] = JSON.parse(raw)
    res.setHeader('Content-Type', 'application/json')
    res.status(200).json(incidents)
  } catch (err) {
    res.status(500).json({ error: 'failed to read incidents' })
  }
}
