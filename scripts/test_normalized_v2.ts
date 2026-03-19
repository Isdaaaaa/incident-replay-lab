import fs from 'fs'
import path from 'path'
import assert from 'assert'
import { writeNormalizedEvents } from './convert_mock_data'
import { isEvent } from '../src/models/event'

const outputPath = path.join(process.cwd(), 'data', 'normalized_events_v2.json')

function main() {
  const result = writeNormalizedEvents()
  const raw = fs.readFileSync(outputPath, 'utf8')
  const events = JSON.parse(raw) as unknown[]

  assert.ok(result.count >= 10, `expected at least 10 events, got ${result.count}`)
  assert.ok(events.every(isEvent), 'expected all entries to match Event shape')

  const kinds = new Set(events.map((event) => (event as { kind: string }).kind))
  assert.ok(kinds.size >= 4, `expected multiple kinds, got ${Array.from(kinds).join(', ')}`)

  console.log(`normalized_v2 ok: ${events.length} events across ${Array.from(kinds).join(', ')}`)
}

main()
