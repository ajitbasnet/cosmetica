'use client'

import { useCallback, useEffect, useState } from 'react'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'
import type { HomeHeroCMS } from '@/lib/cms-types'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { PreviewFrame } from '@/components/admin/PreviewFrame'
import { ImageInput } from '@/components/admin/controls/ImageInput'
import { RichTextInput } from '@/components/admin/controls/RichTextInput'
import { SliderInput } from '@/components/admin/controls/SliderInput'
import { SelectInput } from '@/components/admin/controls/SelectInput'
import { useToast } from '@/components/admin/ToastProvider'
import { useConfirm } from '@/components/admin/ConfirmDialog'
import { useSectionSave } from '@/components/admin/useSectionSave'

function clone<T>(v: T): T {
  return structuredClone(v)
}

export function HeroEditor() {
  const committed = useCMSStore(s => s.pages.home.hero) ?? DEFAULT_CMS_CONTENT.pages.home.hero
  const updatePage = useCMSStore(s => s.updatePage)
  const resetSection = useCMSStore(s => s.resetSection)
  const setHighlight = useCMSStore(s => s.setPreviewHighlight)
  const { push } = useToast()
  const { confirm } = useConfirm()
  const { saving, showCheck, runSave } = useSectionSave()

  const [draft, setDraft] = useState<HomeHeroCMS>(() => clone(committed))

  useEffect(() => {
    setDraft(clone(committed))
  }, [committed])

  useEffect(() => {
    setHighlight('hero')
    return () => setHighlight(null)
  }, [setHighlight])

  const dirty = JSON.stringify(draft) !== JSON.stringify(committed)

  const handleSave = useCallback(async () => {
    if (!dirty) return
    await runSave(() => {
      updatePage('home', { hero: draft })
      push('success', 'Hero section saved')
    })
  }, [dirty, draft, runSave, updatePage, push])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault()
        if (dirty) void handleSave()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleSave, dirty])

  const handleReset = async () => {
    const ok = await confirm({
      title: 'Reset hero?',
      message: 'Restore this section to default content. This cannot be undone.',
      danger: true,
      confirmLabel: 'Reset',
    })
    if (!ok) return
    resetSection('home.hero')
    const next = useCMSStore.getState().pages.home.hero ?? DEFAULT_CMS_CONTENT.pages.home.hero
    setDraft(clone(next))
    push('warning', 'Section reset to defaults')
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      <AdminHeader
        breadcrumb={['Admin', 'Pages', 'Home', 'Hero Section']}
        dirty={dirty}
        saving={saving}
        showCheck={showCheck}
        onSave={() => void handleSave()}
      />
      <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <div style={{ width: 'min(520px, 42%)', overflowY: 'auto', padding: 28, borderRight: '1px solid #ebebeb' }}>
          <h2 className="admin-section-title" style={{ marginBottom: 24 }}>Hero</h2>
          <RichTextInput label="Subheading" value={draft.subheading} onChange={v => setDraft(d => ({ ...d, subheading: v }))} />
          <RichTextInput label="Heading" value={draft.heading} onChange={v => setDraft(d => ({ ...d, heading: v }))} multiline rows={3} />
          <RichTextInput label="Body" value={draft.bodyText} onChange={v => setDraft(d => ({ ...d, bodyText: v }))} multiline rows={5} />
          <RichTextInput label="Primary CTA label" value={draft.ctaPrimaryLabel} onChange={v => setDraft(d => ({ ...d, ctaPrimaryLabel: v }))} />
          <RichTextInput label="Primary CTA href" value={draft.ctaPrimaryHref} onChange={v => setDraft(d => ({ ...d, ctaPrimaryHref: v }))} />
          <RichTextInput label="Secondary CTA label" value={draft.ctaSecondaryLabel} onChange={v => setDraft(d => ({ ...d, ctaSecondaryLabel: v }))} />
          <RichTextInput label="Secondary CTA href" value={draft.ctaSecondaryHref} onChange={v => setDraft(d => ({ ...d, ctaSecondaryHref: v }))} />
          <ImageInput label="Background image" value={draft.backgroundImage} onChange={v => setDraft(d => ({ ...d, backgroundImage: v }))} />
          <SliderInput label="Text column overlay strength" value={draft.overlayOpacity} onChange={v => setDraft(d => ({ ...d, overlayOpacity: v }))} min={0} max={1} step={0.01} />
          <SelectInput
            label="Text color"
            value={draft.textColor}
            onChange={v => setDraft(d => ({ ...d, textColor: v as HomeHeroCMS['textColor'] }))}
            options={[{ value: 'white', label: 'White' }, { value: 'black', label: 'Black' }]}
          />
          <button type="button" className="btn-outline" style={{ marginTop: 16, cursor: 'pointer' }} onClick={() => void handleReset()}>
            Reset section
          </button>
        </div>
        <PreviewFrame homePartial={{ hero: draft }} />
      </div>
    </div>
  )
}
