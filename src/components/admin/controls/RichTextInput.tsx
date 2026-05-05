'use client'

interface RichTextInputProps {
  label: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  maxLength?: number
  rows?: number
}

export function RichTextInput({ label, value, onChange, multiline, maxLength, rows = 4 }: RichTextInputProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <span className="admin-label">{label}</span>
        {maxLength !== undefined ? (
          <span style={{ fontFamily: 'Montserrat', fontSize: 9, color: '#9b9b9b' }}>{value.length}/{maxLength}</span>
        ) : null}
      </div>
      {multiline ? (
        <textarea
          className="admin-input"
          rows={rows}
          style={{ resize: 'vertical', minHeight: 100 }}
          value={value}
          maxLength={maxLength}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <input
          className="admin-input"
          type="text"
          value={value}
          maxLength={maxLength}
          onChange={e => onChange(e.target.value)}
        />
      )}
    </div>
  )
}
