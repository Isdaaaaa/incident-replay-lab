import React from 'react'
import { GetServerSideProps } from 'next'
import Timeline from '../components/Timeline'
import fs from 'fs'
import path from 'path'

type Incident = {
  id: string
  service: string
  severity: string
  message: string
  timestamp: string
}

export default function Page({ incidents }: { incidents: Incident[] }) {
  return (
    <div>
      <Timeline incidents={incidents} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'mock_incidents.json')
    const raw = fs.readFileSync(dataPath, 'utf8')
    const incidents: Incident[] = JSON.parse(raw)
    return { props: { incidents } }
  } catch (err) {
    // fallback to empty list if file missing or parse error
    return { props: { incidents: [] } }
  }
}
