'use client'

interface ArrayEditorProps {
  label: string
  items: string[]
  onChange: (items: string[]) => void
}

export function ArrayEditor({ label, items, onChange }: ArrayEditorProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <p className="admin-label" style={{ marginBottom: 12 }}>{label}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', gap: 8 }}>
            <input className="admin-input" value={it} onChange={e => {
              const next = [...items]
              next[i] = e.target.value
              onChange(next)
            }} />
            <button type="button" className="btn-outline" style={{ padding: '0 12px', cursor: 'pointer' }} onClick={() => onChange(items.filter((_, j) => j !== i))}>Remove</button>
          </div>
        ))}
        <button type="button" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '8px 16px', cursor: 'pointer' }} onClick={() => onChange([...items, ''])}>Add line</button>
      </div>
    </div>
  )
}
