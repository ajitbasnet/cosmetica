'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'
import type { NavItem } from '@/lib/cms-types'
import { EditorShell } from '@/components/admin/EditorShell'
import { DragSortList } from '@/components/admin/controls/DragSortList'
import { RichTextInput } from '@/components/admin/controls/RichTextInput'
import { ToggleInput } from '@/components/admin/controls/ToggleInput'
import { useToast } from '@/components/admin/ToastProvider'
import { useConfirm } from '@/components/admin/ConfirmDialog'
import { useSectionSave } from '@/components/admin/useSectionSave'

export function NavEditor() {
  const nav = useCMSStore(s => s.nav) ?? DEFAULT_CMS_CONTENT.nav
  const updateNav = useCMSStore(s => s.updateNav)
  const resetSection = useCMSStore(s => s.resetSection)
  const { push } = useToast()
  const { confirm } = useConfirm()
  const { saving, showCheck, runSave } = useSectionSave()
  const [draft, setDraft] = useState<NavItem[]>(nav.items)
  useEffect(() => setDraft(nav.items), [nav.items])
  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(nav.items), [draft, nav.items])
  const handleSave = useCallback(async () => {
    if (!dirty) return
    await runSave(() => { updateNav({ items: draft }); push('success', 'Navigation saved') })
  }, [dirty, draft, runSave, updateNav, push])

  const patch = (id: string, patch: Partial<NavItem>) => {
    setDraft(list => list.map(it => (it.id === id ? { ...it, ...patch } : it)))
  }

  const patchSub = (id: string, subIdx: number, field: 'label' | 'href', val: string) => {
    setDraft(list => list.map(it => {
      if (it.id !== id) return it
      const items = it.items.map((s, j) => (j === subIdx ? { ...s, [field]: val } : s))
      return { ...it, items }
    }))
  }

  return (
    <EditorShell breadcrumb={['Admin', 'Navigation', 'Main Nav']} dirty={dirty} saving={saving} showCheck={showCheck} onSave={() => void handleSave()}>
      <h2 className="admin-section-title" style={{ marginBottom: 24 }}>Main navigation</h2>
      <DragSortList items={draft} onReorder={setDraft} renderItem={row => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
          <RichTextInput label="Label" value={row.label} onChange={v => patch(row.id, { label: v })} />
          <RichTextInput label="Href" value={row.href} onChange={v => patch(row.id, { href: v })} />
          <ToggleInput label="Has dropdown" checked={row.hasDropdown} onChange={v => patch(row.id, { hasDropdown: v, items: v ? row.items : [] })} />
          {row.hasDropdown && row.items.map((sub, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, paddingLeft: 12, borderLeft: '2px solid #ebebeb' }}>
              <input className="admin-input" style={{ flex: 1 }} value={sub.label} onChange={e => patchSub(row.id, i, 'label', e.target.value)} placeholder="Label" />
              <input className="admin-input" style={{ flex: 1 }} value={sub.href} onChange={e => patchSub(row.id, i, 'href', e.target.value)} placeholder="Href" />
            </div>
          ))}
          {row.hasDropdown ? (
            <button type="button" className="btn-outline" style={{ alignSelf: 'flex-start', cursor: 'pointer' }} onClick={() => patch(row.id, { items: [...row.items, { label: '', href: '/' }] })}>Add dropdown item</button>
          ) : null}
        </div>
      )} />
      <button type="button" className="btn-primary" style={{ marginTop: 12, cursor: 'pointer' }} onClick={() => setDraft(list => [...list, { id: `nav-${Date.now()}`, label: 'Link', href: '/', hasDropdown: false, items: [] }])}>Add top-level item</button>
      <button type="button" className="btn-outline" style={{ marginTop: 16, cursor: 'pointer' }} onClick={async () => {
        if (!await confirm({ title: 'Reset navigation?', danger: true })) return
        resetSection('nav')
        setDraft(useCMSStore.getState().nav.items)
        push('warning', 'Reset')
      }}>Reset navigation</button>
    </EditorShell>
  )
}
