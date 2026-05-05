'use client'

interface NumberInputProps {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  step?: number
}

export function NumberInput({ label, value, onChange, min, step = 1 }: NumberInputProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label className="admin-label" style={{ display: 'block', marginBottom: 8 }}>{label}</label>
      <input
        type="number"
        className="admin-input"
        value={Number.isFinite(value) ? value : 0}
        min={min}
        step={step}
        onChange={e => onChange(Number(e.target.value))}
      />
    </div>
  )
}
