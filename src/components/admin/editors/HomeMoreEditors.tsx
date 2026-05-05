'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'
import type { CaseStudy, HomeCaseStudiesSectionCMS, HomeWeAreCMS } from '@/lib/cms-types'
import { EditorShell } from '@/components/admin/EditorShell'
import { RichTextInput } from '@/components/admin/controls/RichTextInput'
import { ImageInput } from '@/components/admin/controls/ImageInput'
import { DragSortList } from '@/components/admin/controls/DragSortList'
import { useToast } from '@/components/admin/ToastProvider'
import { useConfirm } from '@/components/admin/ConfirmDialog'
import { useSectionSave } from '@/components/admin/useSectionSave'

export function WeAreEditor() {
  const committed = useCMSStore(s => s.pages.home.weAre) ?? DEFAULT_CMS_CONTENT.pages.home.weAre
  const updatePage = useCMSStore(s => s.updatePage)
  const resetSection = useCMSStore(s => s.resetSection)
  const setHighlight = useCMSStore(s => s.setPreviewHighlight)
  const { push } = useToast()
  const { confirm } = useConfirm()
  const { saving, showCheck, runSave } = useSectionSave()
  const [draft, setDraft] = useState<HomeWeAreCMS>(committed)

  useEffect(() => setDraft(committed), [committed])
  useEffect(() => {
    setHighlight('weAre')
    return () => setHighlight(null)
  }, [setHighlight])

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(committed), [draft, committed])
  const handleSave = useCallback(async () => {
    if (!dirty) return
    await runSave(() => {
      updatePage('home', { weAre: draft })
      push('success', 'We Are section saved')
    })
  }, [dirty, draft, runSave, updatePage, push])

  const handleReset = async () => {
    if (!await confirm({ title: 'Reset We Are section?', message: 'Restore defaults.', danger: true })) return
    resetSection('home.weAre')
    setDraft(useCMSStore.getState().pages.home.weAre ?? DEFAULT_CMS_CONTENT.pages.home.weAre)
    push('warning', 'Reset')
  }

  return (
    <EditorShell breadcrumb={['Admin', 'Pages', 'Home', 'We Are']} dirty={dirty} saving={saving} showCheck={showCheck} onSave={() => void handleSave()}>
      <RichTextInput label="Label" value={draft.label} onChange={v => setDraft({ ...draft, label: v })} />
      <RichTextInput label="Heading" value={draft.heading} onChange={v => setDraft({ ...draft, heading: v })} multiline rows={2} />
      <RichTextInput label="CTA label" value={draft.ctaLabel} onChange={v => setDraft({ ...draft, ctaLabel: v })} />
      <RichTextInput label="CTA href" value={draft.ctaHref} onChange={v => setDraft({ ...draft, ctaHref: v })} />
      <ImageInput label="Image" value={draft.image} onChange={v => setDraft({ ...draft, image: v })} />
      <button type="button" className="btn-outline" style={{ marginTop: 16, cursor: 'pointer' }} onClick={() => void handleReset()}>Reset section</button>
    </EditorShell>
  )
}

export function CaseStudiesEditor() {
  const committed = useCMSStore(s => s.pages.home.caseStudies) ?? DEFAULT_CMS_CONTENT.pages.home.caseStudies
  const updatePage = useCMSStore(s => s.updatePage)
  const resetSection = useCMSStore(s => s.resetSection)
  const setHighlight = useCMSStore(s => s.setPreviewHighlight)
  const { push } = useToast()
  const { confirm } = useConfirm()
  const { saving, showCheck, runSave } = useSectionSave()
  const [draft, setDraft] = useState<HomeCaseStudiesSectionCMS>(committed)

  useEffect(() => setDraft(committed), [committed])
  useEffect(() => {
    setHighlight('caseStudies')
    return () => setHighlight(null)
  }, [setHighlight])

  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(committed), [draft, committed])
  const handleSave = useCallback(async () => {
    if (!dirty) return
    await runSave(() => {
      updatePage('home', { caseStudies: draft })
      push('success', 'Case studies saved')
    })
  }, [dirty, draft, runSave, updatePage, push])

  const handleReset = async () => {
    if (!await confirm({ title: 'Reset case studies?', message: 'Restore defaults.', danger: true })) return
    resetSection('home.caseStudies')
    setDraft(useCMSStore.getState().pages.home.caseStudies ?? DEFAULT_CMS_CONTENT.pages.home.caseStudies)
    push('warning', 'Reset')
  }

  const patchItem = (id: string, patch: Partial<CaseStudy>) => {
    setDraft(d => ({ ...d, items: d.items.map(x => (x.id === id ? { ...x, ...patch } : x)) }))
  }

  return (
    <EditorShell breadcrumb={['Admin', 'Pages', 'Home', 'Case Studies']} dirty={dirty} saving={saving} showCheck={showCheck} onSave={() => void handleSave()}>
      <RichTextInput label="Section label" value={draft.label} onChange={v => setDraft({ ...draft, label: v })} />
      <RichTextInput label="Heading" value={draft.heading} onChange={v => setDraft({ ...draft, heading: v })} multiline rows={2} />
      <RichTextInput label="View more label" value={draft.viewMoreLabel} onChange={v => setDraft({ ...draft, viewMoreLabel: v })} />
      <RichTextInput label="View more href" value={draft.viewMoreHref} onChange={v => setDraft({ ...draft, viewMoreHref: v })} />
      <p className="admin-label" style={{ margin: '20px 0 8px' }}>Cards (drag to reorder)</p>
      <DragSortList items={draft.items} onReorder={items => setDraft({ ...draft, items })} renderItem={c => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
          <RichTextInput label="Brand" value={c.brand} onChange={v => patchItem(c.id, { brand: v })} />
          <RichTextInput label="Title" value={c.title} onChange={v => patchItem(c.id, { title: v })} />
          <RichTextInput label="Category" value={c.category} onChange={v => patchItem(c.id, { category: v })} />
          <RichTextInput label="Href" value={c.href} onChange={v => patchItem(c.id, { href: v })} />
          <ImageInput label="Image" value={c.img} onChange={v => patchItem(c.id, { img: v })} />
        </div>
      )} />
      <button type="button" className="btn-outline" style={{ marginTop: 16, cursor: 'pointer' }} onClick={() => void handleReset()}>Reset section</button>
    </EditorShell>
  )
}
