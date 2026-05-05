'use client'

interface ToggleInputProps {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}

export function ToggleInput({ label, checked, onChange }: ToggleInputProps) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, cursor: 'pointer' }}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          width: 44, height: 24, borderRadius: 12, border: '1px solid #ebebeb', position: 'relative',
          background: checked ? '#0a0a0a' : '#f0f0f0', transition: 'background 0.3s ease',
        }}
      >
        <span style={{
          position: 'absolute', top: 2, left: checked ? 22 : 2, width: 18, height: 18, borderRadius: '50%',
          background: '#fafaf8', transition: 'left 0.3s ease',
        }} />
      </button>
      <span className="admin-label" style={{ marginBottom: 0 }}>{label}</span>
    </label>
  )
}
