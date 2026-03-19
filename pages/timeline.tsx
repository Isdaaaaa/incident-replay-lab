import React from 'react'
import { GetServerSideProps } from 'next'
import fs from 'fs'
import path from 'path'
import Timeline from '../components/Timeline'
import { Event } from '../src/models/event'

export default function Page({ events }: { events: Event[] }) {
  return <Timeline events={events} />
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'normalized_events_v2.json')
    const raw = fs.readFileSync(dataPath, 'utf8')
    const events: Event[] = JSON.parse(raw)

    return { props: { events } }
  } catch (error) {
    return { props: { events: [] } }
  }
}
