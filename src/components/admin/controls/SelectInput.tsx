'use client'

interface Option {
  value: string
  label: string
}

interface SelectInputProps {
  label: string
  value: string
  onChange: (v: string) => void
  options: Option[]
}

export function SelectInput({ label, value, onChange, options }: SelectInputProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label className="admin-label" style={{ display: 'block', marginBottom: 8 }}>{label}</label>
      <select className="admin-input" value={value} onChange={e => onChange(e.target.value)}>
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}
