import fs from 'fs'
import path from 'path'
import { Event } from '../src/models/event'

function loadMock(): any[] {
  const p = path.join(process.cwd(), 'data', 'mock_incidents.json')
  const raw = fs.readFileSync(p, 'utf8')
  return JSON.parse(raw)
}

function transform(mock: any[]): Event[] {
  const out: Event[] = []
  let counter = 1
  for (const m of mock) {
    // base incident -> Event of kind 'incident'
    out.push({
      id: `ev-${String(counter++).padStart(3,'0')}`,
      kind: 'incident',
      source: m.service || 'unknown',
      severity: m.severity || 'info',
      title: m.message || 'incident',
      details: JSON.stringify(m),
      timestamp: m.timestamp || new Date().toISOString(),
      meta: { originalId: m.id }
    })

    // create an alert event derived from the incident
    out.push({
      id: `ev-${String(counter++).padStart(3,'0')}`,
      kind: 'alert',
      source: m.service || 'unknown',
      severity: m.severity || 'info',
      title: `${m.service} alert`,
      details: `Auto-generated alert for ${m.id}`,
      timestamp: m.timestamp || new Date().toISOString(),
      meta: { originalId: m.id }
    })

    // add a low-severity note event
    out.push({
      id: `ev-${String(counter++).padStart(3,'0')}`,
      kind: 'note',
      source: m.service || 'unknown',
      title: `Note for ${m.id}`,
      details: `Investigate: ${m.message}`,
      timestamp: new Date(new Date(m.timestamp).getTime() + 60*1000).toISOString(),
      meta: { derivedFrom: m.id }
    })
  }

  // ensure we have at least 10 events; duplicate with small time offsets if needed
  while (out.length < 10) {
    const sample = out[Math.floor(Math.random()*out.length)]
    const copy = { ...sample, id: `ev-${String(counter++).padStart(3,'0')}`, timestamp: new Date(new Date(sample.timestamp).getTime() + Math.floor(Math.random()*600000)).toISOString() }
    out.push(copy)
  }

  // sort by timestamp
  out.sort((a,b)=> new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  return out
}

function write(out: Event[]) {
  const p = path.join(process.cwd(), 'data', 'normalized_events.json')
  fs.writeFileSync(p, JSON.stringify(out, null, 2), 'utf8')
  console.log(`Wrote ${out.length} events to ${p}`)
}

function main(){
  const mock = loadMock()
  const normalized = transform(mock)
  write(normalized)
}

if (require.main === module) main()
