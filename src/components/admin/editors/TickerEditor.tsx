'use client'

import { useCallback, useEffect, useState } from 'react'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'
import { EditorShell } from '@/components/admin/EditorShell'
import { ArrayEditor } from '@/components/admin/controls/ArrayEditor'
import { useToast } from '@/components/admin/ToastProvider'
import { useConfirm } from '@/components/admin/ConfirmDialog'
import { useSectionSave } from '@/components/admin/useSectionSave'

export function TickerEditor() {
  const committed = useCMSStore(s => s.pages.home.ticker) ?? DEFAULT_CMS_CONTENT.pages.home.ticker
  const updatePage = useCMSStore(s => s.updatePage)
  const resetSection = useCMSStore(s => s.resetSection)
  const setHighlight = useCMSStore(s => s.setPreviewHighlight)
  const { push } = useToast()
  const { confirm } = useConfirm()
  const { saving, showCheck, runSave } = useSectionSave()
  const [draft, setDraft] = useState(committed)

  useEffect(() => setDraft(committed), [committed])
  useEffect(() => {
    setHighlight('ticker')
    return () => setHighlight(null)
  }, [setHighlight])

  const dirty = JSON.stringify(draft) !== JSON.stringify(committed)
  const handleSave = useCallback(async () => {
    if (!dirty) return
    await runSave(() => {
      updatePage('home', { ticker: draft })
      push('success', 'Ticker saved')
    })
  }, [dirty, draft, runSave, updatePage, push])

  const onReset = async () => {
    if (!await confirm({ title: 'Reset ticker?', message: 'Restore marquee items to defaults.', danger: true })) return
    resetSection('home.ticker')
    setDraft(useCMSStore.getState().pages.home.ticker)
    push('warning', 'Reset')
  }

  return (
    <EditorShell breadcrumb={['Admin', 'Pages', 'Home', 'Ticker / Marquee']} dirty={dirty} saving={saving} showCheck={showCheck} onSave={() => void handleSave()}>
      <h2 className="admin-section-title" style={{ marginBottom: 24 }}>Ticker</h2>
      <ArrayEditor label="Marquee items" items={draft.items} onChange={items => setDraft({ items })} />
      <button type="button" className="btn-outline" style={{ marginTop: 16, cursor: 'pointer' }} onClick={() => void onReset()}>Reset section</button>
    </EditorShell>
  )
}
