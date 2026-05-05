'use client'

import { Check } from 'lucide-react'

interface AdminHeaderProps {
  breadcrumb: string[]
  dirty: boolean
  saving: boolean
  showCheck: boolean
  onSave: () => void
}

export function AdminHeader({ breadcrumb, dirty, saving, showCheck, onSave }: AdminHeaderProps) {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px 28px',
      borderBottom: '1px solid #ebebeb',
      background: 'rgba(250, 250, 248, 0.94)',
      backdropFilter: 'blur(8px)',
      position: 'sticky',
      top: 0,
      zIndex: 30,
      gap: 16,
    }}>
      <nav style={{ fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9b9b9b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {breadcrumb.map((b, i) => (
          <span key={i}>
            {i > 0 && <span style={{ margin: '0 8px', color: '#ccc' }}>/</span>}
            <span style={{ color: i === breadcrumb.length - 1 ? '#0a0a0a' : undefined }}>{b}</span>
          </span>
        ))}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        {dirty ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#ca8a04' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ca8a04' }} /> Unsaved changes
          </span>
        ) : null}
        <button
          type="button"
          disabled={!dirty || saving}
          onClick={onSave}
          className="btn-primary"
          style={{
            opacity: dirty ? 1 : 0.45, cursor: dirty && !saving ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: 8,
            minWidth: 120, justifyContent: 'center',
          }}
        >
          {saving ? (
            <><span className="admin-spinner" /> Saving…</>
          ) : showCheck ? (
            <><Check size={16} /> Saved</>
          ) : (
            'Save'
          )}
        </button>
      </div>
    </header>
  )
}
