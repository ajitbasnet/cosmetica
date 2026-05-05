'use client'

import { useCallback, useEffect, useState } from 'react'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'
import { EditorShell } from '@/components/admin/EditorShell'
import { RichTextInput } from '@/components/admin/controls/RichTextInput'
import { useToast } from '@/components/admin/ToastProvider'
import { useConfirm } from '@/components/admin/ConfirmDialog'
import { useSectionSave } from '@/components/admin/useSectionSave'

export function CTABandEditor() {
  const committed = useCMSStore(s => s.pages.home.ctaBand) ?? DEFAULT_CMS_CONTENT.pages.home.ctaBand
  const updatePage = useCMSStore(s => s.updatePage)
  const resetSection = useCMSStore(s => s.resetSection)
  const setHighlight = useCMSStore(s => s.setPreviewHighlight)
  const { push } = useToast()
  const { confirm } = useConfirm()
  const { saving, showCheck, runSave } = useSectionSave()
  const [draft, setDraft] = useState(committed)

  useEffect(() => setDraft(committed), [committed])
  useEffect(() => {
    setHighlight('ctaBand')
    return () => setHighlight(null)
  }, [setHighlight])

  const dirty = JSON.stringify(draft) !== JSON.stringify(committed)
  const handleSave = useCallback(async () => {
    if (!dirty) return
    await runSave(() => {
      updatePage('home', { ctaBand: draft })
      push('success', 'CTA band saved')
    })
  }, [dirty, draft, runSave, updatePage, push])

  return (
    <EditorShell breadcrumb={['Admin', 'Pages', 'Home', 'CTA Band']} dirty={dirty} saving={saving} showCheck={showCheck} onSave={() => void handleSave()}>
      <h2 className="admin-section-title" style={{ marginBottom: 24 }}>CTA band</h2>
      <RichTextInput label="Heading" value={draft.heading} onChange={v => setDraft({ ...draft, heading: v })} multiline rows={3} />
      <RichTextInput label="Button label" value={draft.buttonLabel} onChange={v => setDraft({ ...draft, buttonLabel: v })} />
      <RichTextInput label="Button href" value={draft.buttonHref} onChange={v => setDraft({ ...draft, buttonHref: v })} />
      <button type="button" className="btn-outline" style={{ marginTop: 16, cursor: 'pointer' }} onClick={async () => {
        if (!await confirm({ title: 'Reset CTA band?', danger: true })) return
        resetSection('home.ctaBand')
        setDraft(useCMSStore.getState().pages.home.ctaBand)
        push('warning', 'Reset')
      }}>Reset section</button>
    </EditorShell>
  )
}
