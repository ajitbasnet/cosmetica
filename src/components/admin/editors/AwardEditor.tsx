'use client'

import { useCallback, useEffect, useState } from 'react'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'
import type { AwardItem } from '@/lib/cms-types'
import { sanitizeSvgMarkup } from '@/lib/cms-utils'
import { EditorShell } from '@/components/admin/EditorShell'
import { DragSortList } from '@/components/admin/controls/DragSortList'
import { RichTextInput } from '@/components/admin/controls/RichTextInput'
import { useToast } from '@/components/admin/ToastProvider'
import { useConfirm } from '@/components/admin/ConfirmDialog'
import { useSectionSave } from '@/components/admin/useSectionSave'

export function AwardEditor() {
  const committed = useCMSStore(s => s.pages.home.awards) ?? DEFAULT_CMS_CONTENT.pages.home.awards
  const updatePage = useCMSStore(s => s.updatePage)
  const resetSection = useCMSStore(s => s.resetSection)
  const setHighlight = useCMSStore(s => s.setPreviewHighlight)
  const { push } = useToast()
  const { confirm } = useConfirm()
  const { saving, showCheck, runSave } = useSectionSave()
  const [draft, setDraft] = useState<AwardItem[]>(committed)

  useEffect(() => setDraft(committed), [committed])
  useEffect(() => {
    setHighlight('awards')
    return () => setHighlight(null)
  }, [setHighlight])

  const dirty = JSON.stringify(draft) !== JSON.stringify(committed)
  const handleSave = useCallback(async () => {
    if (!dirty) return
    await runSave(() => {
      const cleaned = draft.map(a => ({ ...a, logoSvg: sanitizeSvgMarkup(a.logoSvg) }))
      updatePage('home', { awards: cleaned })
      push('success', 'Awards saved')
    })
  }, [dirty, draft, runSave, updatePage, push])

  const updateAt = (id: string, patch: Partial<AwardItem>) => {
    setDraft(list => list.map(a => (a.id === id ? { ...a, ...patch } : a)))
  }

  const add = () => setDraft(list => [...list, { id: `award-${Date.now()}`, year: '', title: '', logoSvg: '<svg xmlns="http://www.w3.org/2000/svg"></svg>' }])
  const remove = async (id: string) => {
    if (!await confirm({ title: 'Remove award?', message: 'Delete this award row.', danger: true })) return
    setDraft(list => list.filter(a => a.id !== id))
  }

  return (
    <EditorShell breadcrumb={['Admin', 'Pages', 'Home', 'Award Logos']} dirty={dirty} saving={saving} showCheck={showCheck} onSave={() => void handleSave()}>
      <h2 className="admin-section-title" style={{ marginBottom: 24 }}>Award logos</h2>
      <DragSortList items={draft} onReorder={setDraft} renderItem={(a) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
          <RichTextInput label="Year" value={a.year} onChange={v => updateAt(a.id, { year: v })} />
          <RichTextInput label="Title" value={a.title} onChange={v => updateAt(a.id, { title: v })} />
          <RichTextInput label="Logo SVG" value={a.logoSvg} onChange={v => updateAt(a.id, { logoSvg: v })} multiline rows={6} />
          <button type="button" className="btn-outline" style={{ alignSelf: 'flex-start', cursor: 'pointer' }} onClick={() => void remove(a.id)}>Delete</button>
        </div>
      )} />
      <button type="button" className="btn-primary" style={{ marginTop: 16, cursor: 'pointer' }} onClick={add}>Add award</button>
      <button type="button" className="btn-outline" style={{ marginTop: 16, marginLeft: 12, cursor: 'pointer' }} onClick={async () => {
        if (!await confirm({ title: 'Reset awards?', message: 'Restore default award logos.', danger: true })) return
        resetSection('home.awards')
        setDraft(useCMSStore.getState().pages.home.awards)
        push('warning', 'Reset')
      }}>Reset section</button>
    </EditorShell>
  )
}
