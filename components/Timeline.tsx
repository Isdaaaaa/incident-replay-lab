import React, { useMemo, useState } from 'react'
import IncidentCard from './IncidentCard'
import { Event, EventKind } from '../src/models/event'

const laneOrder: EventKind[] = ['incident', 'alert', 'trace', 'deploy', 'log', 'note']

const laneColors: Record<EventKind, string> = {
  incident: '#dc2626',
  alert: '#ea580c',
  trace: '#2563eb',
  deploy: '#059669',
  log: '#7c3aed',
  note: '#64748b',
}

export default function Timeline({ events }: { events: Event[] }) {
  const [cursor, setCursor] = useState<number | null>(null)

  const sortedEvents = useMemo(
    () => [...events].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()),
    [events]
  )

  const times = sortedEvents.map((event) => new Date(event.timestamp).getTime())
  const min = times[0] ?? Date.now()
  const max = times[times.length - 1] ?? Date.now()
  const range = max - min || 1

  const lanes = laneOrder
    .map((kind) => ({ kind, events: sortedEvents.filter((event) => event.kind === kind) }))
    .filter((lane) => lane.events.length > 0)

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: 6 }}>Normalized event timeline</h2>
      <p style={{ marginTop: 0, color: '#555' }}>
        {events.length} events across {lanes.length} lanes from <code>/api/normalized_v2</code>
      </p>

      <div style={{ marginBottom: 12 }}>
        <input
          type="range"
          min={min}
          max={max}
          onChange={(event) => setCursor(Number(event.target.value))}
          value={cursor ?? max}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ display: 'grid', gap: 14 }}>
        {lanes.map((lane) => (
          <div key={lane.kind}>
            <div style={{ marginBottom: 6, fontSize: 13, fontWeight: 700, color: laneColors[lane.kind] }}>
              {lane.kind.toUpperCase()} ({lane.events.length})
            </div>
            <div
              style={{
                position: 'relative',
                minHeight: 120,
                border: '1px solid #eee',
                borderRadius: 8,
                background: '#f8fafc',
                padding: '16px 8px 8px',
                overflowX: 'auto',
              }}
            >
              {cursor !== null && (
                <div
                  style={{
                    position: 'absolute',
                    left: `${((cursor - min) / range) * 100}%`,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    background: '#0f172a',
                    opacity: 0.35,
                  }}
                />
              )}

              {lane.events.map((event) => {
                const timestamp = new Date(event.timestamp).getTime()
                const pct = ((timestamp - min) / range) * 100

                return (
                  <div
                    key={event.id}
                    style={{
                      position: 'absolute',
                      left: `clamp(0px, calc(${pct}% - 90px), calc(100% - 180px))`,
                      top: 28,
                      width: 180,
                    }}
                  >
                    <IncidentCard event={event} />
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
