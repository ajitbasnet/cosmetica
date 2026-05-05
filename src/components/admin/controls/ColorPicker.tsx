'use client'

function normalizeHex(hex: string): string {
  if (!hex.startsWith('#')) return `#${hex}`
  if (hex.length === 4) {
    const r = hex[1]
    const g = hex[2]
    const b = hex[3]
    return `#${r}${r}${g}${g}${b}${b}`
  }
  return hex.slice(0, 7)
}

interface ColorPickerProps {
  label: string
  value: string
  onChange: (hex: string) => void
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const safe = /^#[0-9A-Fa-f]{6}$/.test(value) ? value : '#0a0a0a'
  return (
    <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
      <span className="admin-label" style={{ minWidth: 100 }}>{label}</span>
      <input type="color" value={safe} onChange={e => onChange(e.target.value)} style={{ width: 48, height: 36, border: '1px solid #ebebeb', padding: 0, cursor: 'pointer' }} />
      <input
        className="admin-input"
        style={{ maxWidth: 120 }}
        value={value}
        onChange={e => onChange(normalizeHex(e.target.value))}
      />
    </div>
  )
}
