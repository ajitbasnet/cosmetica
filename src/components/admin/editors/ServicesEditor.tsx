'use client'

import { useCallback, useEffect, useState } from 'react'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'
import type { ServiceCard } from '@/lib/cms-types'
import { EditorShell } from '@/components/admin/EditorShell'
import { DragSortList } from '@/components/admin/controls/DragSortList'
import { RichTextInput } from '@/components/admin/controls/RichTextInput'
import { useToast } from '@/components/admin/ToastProvider'
import { useConfirm } from '@/components/admin/ConfirmDialog'
import { useSectionSave } from '@/components/admin/useSectionSave'

export function ServicesEditor() {
  const committed = useCMSStore(s => s.pages.home.servicesSection) ?? DEFAULT_CMS_CONTENT.pages.home.servicesSection
  const updatePage = useCMSStore(s => s.updatePage)
  const resetSection = useCMSStore(s => s.resetSection)
  const setHighlight = useCMSStore(s => s.setPreviewHighlight)
  const { push } = useToast()
  const { confirm } = useConfirm()
  const { saving, showCheck, runSave } = useSectionSave()
  const [draft, setDraft] = useState(committed)

  useEffect(() => setDraft(committed), [committed])
  useEffect(() => {
    setHighlight('services')
    return () => setHighlight(null)
  }, [setHighlight])

  const dirty = JSON.stringify(draft) !== JSON.stringify(committed)
  const handleSave = useCallback(async () => {
    if (!dirty) return
    await runSave(() => {
      updatePage('home', { servicesSection: draft })
      push('success', 'Services saved')
    })
  }, [dirty, draft, runSave, updatePage, push])

  const patchItem = (id: string, patch: Partial<ServiceCard>) => {
    setDraft(d => ({ ...d, items: d.items.map(it => (it.id === id ? { ...it, ...patch } : it)) }))
  }

  return (
    <EditorShell breadcrumb={['Admin', 'Pages', 'Home', 'Services / What We Do']} dirty={dirty} saving={saving} showCheck={showCheck} onSave={() => void handleSave()}>
      <h2 className="admin-section-title" style={{ marginBottom: 24 }}>Services</h2>
      <RichTextInput label="Subheading" value={draft.subheading} onChange={v => setDraft({ ...draft, subheading: v })} />
      <RichTextInput label="Heading" value={draft.heading} onChange={v => setDraft({ ...draft, heading: v })} multiline rows={3} />
      <RichTextInput label="CTA label" value={draft.ctaLabel} onChange={v => setDraft({ ...draft, ctaLabel: v })} />
      <RichTextInput label="CTA href" value={draft.ctaHref} onChange={v => setDraft({ ...draft, ctaHref: v })} />
      <p className="admin-label" style={{ margin: '24px 0 12px' }}>Cards (max 6)</p>
      <DragSortList
        items={draft.items}
        onReorder={items => setDraft({ ...draft, items })}
        renderItem={row => (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
            <RichTextInput label="Number" value={row.num} onChange={v => patchItem(row.id, { num: v })} />
            <RichTextInput label="Title" value={row.title} onChange={v => patchItem(row.id, { title: v })} />
            <RichTextInput label="Description" value={row.desc} onChange={v => patchItem(row.id, { desc: v })} multiline rows={3} />
            <button type="button" className="btn-outline" style={{ alignSelf: 'flex-start', cursor: 'pointer' }} onClick={async () => {
              if (draft.items.length <= 1) return
              if (!await confirm({ title: 'Remove card?', danger: true })) return
              setDraft(d => ({ ...d, items: d.items.filter(it => it.id !== row.id) }))
            }}>Remove</button>
          </div>
        )}
      />
      <button type="button" className="btn-primary" style={{ marginTop: 12, cursor: 'pointer' }} disabled={draft.items.length >= 6} onClick={() => {
        if (draft.items.length >= 6) return
        setDraft(d => ({ ...d, items: [...d.items, { id: `svc-${Date.now()}`, num: String(d.items.length + 1).padStart(2, '0'), title: '', desc: '' }] }))
      }}>Add card</button>
      <button type="button" className="btn-outline" style={{ marginTop: 16, cursor: 'pointer' }} onClick={async () => {
        if (!await confirm({ title: 'Reset services?', danger: true })) return
        resetSection('home.servicesSection')
        setDraft(useCMSStore.getState().pages.home.servicesSection ?? DEFAULT_CMS_CONTENT.pages.home.servicesSection)
        push('warning', 'Reset')
      }}>Reset section</button>
    </EditorShell>
  )
}
