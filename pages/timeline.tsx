import React from 'react'
import { GetServerSideProps } from 'next'
import fs from 'fs'
import path from 'path'
import Timeline from '../components/Timeline'
import { parseFilters, applyFilters, TimelineFilters } from '../src/filters'
import { Event } from '../src/models/event'

export default function Page({ events, initialFilters }: { events: Event[]; initialFilters: TimelineFilters }) {
  return <Timeline events={events} initialFilters={initialFilters} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'normalized_events_v2.json')
    const raw = fs.readFileSync(dataPath, 'utf8')
    const allEvents: Event[] = JSON.parse(raw)
    const initialFilters = parseFilters(context.query)
    const events = applyFilters(allEvents, initialFilters)

    return { props: { events, initialFilters } }
  } catch (error) {
    return { props: { events: [], initialFilters: parseFilters({}) } }
  }
}
