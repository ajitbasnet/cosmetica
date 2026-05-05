'use client'

import { useId, useState } from 'react'
import { AlertTriangle } from 'lucide-react'

const MAX_BYTES = 2 * 1024 * 1024

interface ImageInputProps {
  label: string
  value: string
  onChange: (url: string) => void
}

export function ImageInput({ label, value, onChange }: ImageInputProps) {
  const id = useId()
  const [warn, setWarn] = useState(false)

  const onFile = (f: File | null) => {
    if (!f) return
    if (f.size > MAX_BYTES) {
      setWarn(true)
      return
    }
    setWarn(false)
    const reader = new FileReader()
    reader.onload = () => {
      const r = reader.result
      if (typeof r === 'string') onChange(r)
    }
    reader.readAsDataURL(f)
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <label htmlFor={id} className="admin-label" style={{ display: 'block', marginBottom: 8 }}>{label}</label>
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <input id={id} className="admin-input" value={value} onChange={e => onChange(e.target.value)} placeholder="https://…" />
        <label style={{ cursor: 'pointer', fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '10px 16px', background: '#0a0a0a', color: '#fafaf8', border: '1px solid #0a0a0a' }}>
          Upload
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => onFile(e.target.files?.[0] ?? null)} />
        </label>
        {value ? (
          <div style={{ width: 72, height: 72, border: '1px solid #ebebeb', overflow: 'hidden', flexShrink: 0 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        ) : null}
        {warn ? (
          <span title="Large file" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#ca8a04', fontSize: 12 }}>
            <AlertTriangle size={16} /> Over 2MB
          </span>
        ) : null}
      </div>
    </div>
  )
}
