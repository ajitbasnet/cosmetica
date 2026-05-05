'use client'

import { useEffect } from 'react'
import { AdminHeader } from '@/components/admin/AdminHeader'

interface EditorShellProps {
  breadcrumb: string[]
  dirty: boolean
  saving: boolean
  showCheck: boolean
  onSave: () => void
  children: React.ReactNode
}

export function EditorShell({ breadcrumb, dirty, saving, showCheck, onSave, children }: EditorShellProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        if (dirty && !saving) onSave()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [dirty, saving, onSave])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <AdminHeader breadcrumb={breadcrumb} dirty={dirty} saving={saving} showCheck={showCheck} onSave={onSave} />
      <div style={{ flex: 1, overflowY: 'auto', padding: 28 }}>
        {children}
      </div>
    </div>
  )
}
