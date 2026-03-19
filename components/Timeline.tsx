import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import IncidentCard from './IncidentCard'
import { Event, EventKind } from '../src/models/event'
import {
  allEventKinds,
  allSeverities,
  applyFilters,
  filtersToQuery,
  getServices,
  timeWindowOptions,
  TimelineFilters,
} from '../src/filters'

const laneOrder: EventKind[] = ['incident', 'alert', 'trace', 'deploy', 'log', 'note']

const laneColors: Record<EventKind, string> = {
  incident: '#dc2626',
  alert: '#ea580c',
  trace: '#2563eb',
  deploy: '#059669',
  log: '#7c3aed',
  note: '#64748b',
}

export default function Timeline({ events, initialFilters }: { events: Event[]; initialFilters: TimelineFilters }) {
  const router = useRouter()
  const [cursor, setCursor] = useState<number | null>(null)
  const [filters, setFilters] = useState<TimelineFilters>(initialFilters)
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>(initialFilters.selectedEventId)

  useEffect(() => {
    setFilters(initialFilters)
    setSelectedEventId(initialFilters.selectedEventId)
  }, [initialFilters])

  const filteredEvents = useMemo(() => applyFilters(events, filters), [events, filters])
  const services = useMemo(() => getServices(events), [events])

  const times = filteredEvents.map((event) => new Date(event.timestamp).getTime())
  const min = times[0] ?? Date.now()
  const max = times[times.length - 1] ?? Date.now()
  const range = max - min || 1

  const lanes = laneOrder
    .map((kind) => ({ kind, events: filteredEvents.filter((event) => event.kind === kind) }))
    .filter((lane) => lane.events.length > 0)

  const selectedEvent = filteredEvents.find((event) => event.id === selectedEventId)

  function updateFilters(next: TimelineFilters, nextSelected = selectedEventId) {
    const payload = { ...next, selectedEventId: nextSelected }
    setFilters(next)
    setSelectedEventId(nextSelected)

    router.replace(
      {
        pathname: '/timeline',
        query: filtersToQuery(payload),
      },
      undefined,
      { shallow: false }
    )
  }

  function toggleKind(kind: EventKind) {
    const kinds = filters.kinds.includes(kind)
      ? filters.kinds.filter((value) => value !== kind)
      : [...filters.kinds, kind]
    updateFilters({ ...filters, kinds: kinds.length > 0 ? kinds : [...allEventKinds] }, undefined)
  }

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: 6 }}>Normalized event timeline</h2>
      <p style={{ marginTop: 0, color: '#555' }}>
        {filteredEvents.length} filtered events from <code>/api/normalized_v2</code>
      </p>

      <div
        style={{
          display: 'grid',
          gap: 12,
          padding: 12,
          marginBottom: 16,
          border: '1px solid #e2e8f0',
          borderRadius: 10,
          background: '#f8fafc',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {allEventKinds.map((kind) => (
            <label key={kind} style={{ fontSize: 13 }}>
              <input
                type="checkbox"
                checked={filters.kinds.includes(kind)}
                onChange={() => toggleKind(kind)}
              />{' '}
              {kind}
            </label>
          ))}
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <label style={{ fontSize: 13 }}>
            Service{' '}
            <select
              value={filters.service}
              onChange={(event) => updateFilters({ ...filters, service: event.target.value }, undefined)}
            >
              <option value="all">all</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </label>

          <label style={{ fontSize: 13 }}>
            Severity{' '}
            <select
              value={filters.severity}
              onChange={(event) =>
                updateFilters({ ...filters, severity: event.target.value as TimelineFilters['severity'] }, undefined)
              }
            >
              {allSeverities.map((severity) => (
                <option key={severity} value={severity}>
                  {severity}
                </option>
              ))}
            </select>
          </label>

          <label style={{ fontSize: 13 }}>
            Window{' '}
            <select
              value={String(filters.windowMinutes)}
              onChange={(event) => {
                const value = event.target.value
                updateFilters(
                  { ...filters, windowMinutes: value === 'all' ? 'all' : Number(value) },
                  undefined
                )
              }}
            >
              {timeWindowOptions.map((option) => (
                <option key={String(option)} value={String(option)}>
                  {option === 'all' ? 'all time' : `${option} min`}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

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

      {selectedEvent && (
        <div
          style={{
            marginBottom: 16,
            padding: 12,
            borderRadius: 10,
            border: '1px solid #bfdbfe',
            background: '#eff6ff',
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Pinned event</div>
          <div style={{ fontWeight: 600 }}>{selectedEvent.service}</div>
          <div style={{ fontSize: 13 }}>{selectedEvent.message}</div>
          <div style={{ fontSize: 12, color: '#475569' }}>
            {selectedEvent.kind} · {selectedEvent.severity ?? 'info'} · {new Date(selectedEvent.timestamp).toLocaleString()}
          </div>
        </div>
      )}

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
                const isSelected = event.id === selectedEventId
                const dimmed = Boolean(selectedEventId && !isSelected)

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
                    <IncidentCard
                      event={event}
                      selected={isSelected}
                      dimmed={dimmed}
                      onClick={() => updateFilters(filters, isSelected ? undefined : event.id)}
                    />
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
