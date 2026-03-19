import React from 'react'
import { Event } from '../src/models/event'

type Props = {
  event: Event
}

const severityColor: Record<string, string> = {
  critical: '#b91c1c',
  major: '#c2410c',
  minor: '#1d4ed8',
  warning: '#a16207',
  info: '#475569',
}

export default function IncidentCard({ event }: Props) {
  const color = severityColor[event.severity ?? 'info'] ?? '#475569'

  return (
    <div
      style={{
        border: '1px solid #ddd',
        padding: 8,
        borderRadius: 6,
        background: '#fff',
        boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ fontSize: 12, color: '#666' }}>{new Date(event.timestamp).toLocaleString()}</div>
      <div style={{ fontWeight: 600 }}>
        {event.service} — <span style={{ color }}>{event.kind}</span>
      </div>
      <div style={{ fontSize: 13, color }}>{event.severity ?? 'info'}</div>
      <div style={{ fontSize: 14 }}>{event.message}</div>
      <div style={{ fontSize: 10, color: '#999' }}>{event.id}</div>
    </div>
  )
}
