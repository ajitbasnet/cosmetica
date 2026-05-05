'use client'

interface SliderInputProps {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
}

export function SliderInput({ label, value, onChange, min = 0, max = 1, step = 0.01 }: SliderInputProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div className="admin-label" style={{ marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
        <span>{label}</span>
        <span style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#0a0a0a' }}>{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%' }}
      />
    </div>
  )
}
