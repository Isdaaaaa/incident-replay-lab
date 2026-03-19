import React from 'react'

type Props = {
  id: string
  service: string
  severity: string
  message: string
  timestamp: string
}

export default function IncidentCard({ id, service, severity, message, timestamp }: Props) {
  return (
    <div style={{border:'1px solid #ddd', padding:8, borderRadius:6, background:'#fff'}}>
      <div style={{fontSize:12, color:'#666'}}>{new Date(timestamp).toLocaleString()}</div>
      <div style={{fontWeight:600}}>{service} — <span style={{color:'#c00'}}>{severity}</span></div>
      <div style={{fontSize:14}}>{message}</div>
      <div style={{fontSize:10, color:'#999'}}>{id}</div>
    </div>
  )
}
