import React, { useMemo, useState } from 'react'
import IncidentCard from './IncidentCard'

type Incident = {
  id: string
  service: string
  severity: string
  message: string
  timestamp: string
}

export default function Timeline({ incidents }: { incidents: Incident[] }) {
  const [cursor, setCursor] = useState<number | null>(null)
  const times = useMemo(() => incidents.map(i => new Date(i.timestamp).getTime()).sort((a,b)=>a-b), [incidents])
  const min = times[0] ?? Date.now()
  const max = times[times.length-1] ?? Date.now()

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCursor(Number(e.target.value))
  }

  return (
    <div style={{padding:20}}>
      <h2>Incidents timeline</h2>
      <div style={{marginBottom:12}}>
        <input type="range" min={min} max={max} onChange={handleScrub} value={cursor ?? max} style={{width:'100%'}} />
      </div>
      <div style={{position:'relative', height:140, border:'1px solid #eee', background:'#f9f9f9'}}>
        {/* time cursor */}
        {cursor && <div style={{position:'absolute', left:`${((cursor - min)/(max-min||1))*100}%`, top:0, bottom:0, width:2, background:'#0070f3'}} />}

        {/* alerts lane */}
        <div style={{position:'absolute', left:0, right:0, top:10, height:120}}>
          {incidents.map(inc => {
            const t = new Date(inc.timestamp).getTime()
            const pct = ((t - min)/(max-min||1))*100
            return (
              <div key={inc.id} style={{position:'absolute', left:`calc(${pct}% - 60px)`, width:120}}>
                <IncidentCard {...inc} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
