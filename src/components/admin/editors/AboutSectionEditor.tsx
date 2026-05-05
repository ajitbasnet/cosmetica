'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'
import type { NewsItem, PrincipleCard } from '@/lib/cms-types'
import { EditorShell } from '@/components/admin/EditorShell'
import { RichTextInput } from '@/components/admin/controls/RichTextInput'
import { ImageInput } from '@/components/admin/controls/ImageInput'
import { DragSortList } from '@/components/admin/controls/DragSortList'
import { useToast } from '@/components/admin/ToastProvider'
import { useConfirm } from '@/components/admin/ConfirmDialog'
import { useSectionSave } from '@/components/admin/useSectionSave'

export type AboutPart = 'hero' | 'quote' | 'principles' | 'news'

const labels: Record<AboutPart, string[]> = {
  hero: ['Admin', 'Pages', 'About', 'Hero'],
  quote: ['Admin', 'Pages', 'About', 'Quote Block'],
  principles: ['Admin', 'Pages', 'About', 'Principles Grid'],
  news: ['Admin', 'Pages', 'About', 'News & Awards'],
}

export function AboutSectionEditor({ part }: { part: AboutPart }) {
  const page = useCMSStore(s => s.pages.about) ?? DEFAULT_CMS_CONTENT.pages.about
  const updatePage = useCMSStore(s => s.updatePage)
  const resetSection = useCMSStore(s => s.resetSection)
  const { push } = useToast()
  const { confirm } = useConfirm()
  const { saving, showCheck, runSave } = useSectionSave()

  const [draftHero, setDraftHero] = useState(page.hero)
  const [draftQuote, setDraftQuote] = useState(page.quote)
  const [draftPrinciples, setDraftPrinciples] = useState(page.principles)
  const [draftNews, setDraftNews] = useState(page.news)
  const [draftMeta, setDraftMeta] = useState({ eyebrow: page.newsSectionEyebrow, title: page.newsSectionTitle })

  useEffect(() => {
    setDraftHero(page.hero)
    setDraftQuote(page.quote)
    setDraftPrinciples(page.principles)
    setDraftNews(page.news)
    setDraftMeta({ eyebrow: page.newsSectionEyebrow, title: page.newsSectionTitle })
  }, [page])

  const dirty = useMemo(() => {
    if (part === 'hero') return JSON.stringify(draftHero) !== JSON.stringify(page.hero)
    if (part === 'quote') return JSON.stringify(draftQuote) !== JSON.stringify(page.quote)
    if (part === 'principles') return JSON.stringify(draftPrinciples) !== JSON.stringify(page.principles)
    return JSON.stringify({ news: draftNews, ...draftMeta }) !== JSON.stringify({
      news: page.news,
      eyebrow: page.newsSectionEyebrow,
      title: page.newsSectionTitle,
    })
  }, [part, draftHero, draftQuote, draftPrinciples, draftNews, draftMeta, page])

  const handleSave = useCallback(async () => {
    if (!dirty) return
    await runSave(() => {
      if (part === 'hero') updatePage('about', { hero: draftHero })
      else if (part === 'quote') updatePage('about', { quote: draftQuote })
      else if (part === 'principles') updatePage('about', { principles: draftPrinciples })
      else updatePage('about', { news: draftNews, newsSectionEyebrow: draftMeta.eyebrow, newsSectionTitle: draftMeta.title })
      push('success', 'About section saved')
    })
  }, [dirty, part, draftHero, draftQuote, draftPrinciples, draftNews, draftMeta, runSave, updatePage, push])

  const onReset = async () => {
    if (!await confirm({ title: 'Reset section?', danger: true })) return
    resetSection(`about.${part}`)
    const p = useCMSStore.getState().pages.about ?? DEFAULT_CMS_CONTENT.pages.about
    setDraftHero(p.hero)
    setDraftQuote(p.quote)
    setDraftPrinciples(p.principles)
    setDraftNews(p.news)
    setDraftMeta({ eyebrow: p.newsSectionEyebrow, title: p.newsSectionTitle })
    push('warning', 'Reset')
  }

  return (
    <EditorShell breadcrumb={labels[part]} dirty={dirty} saving={saving} showCheck={showCheck} onSave={() => void handleSave()}>
      {part === 'hero' && (
        <>
          <h2 className="admin-section-title" style={{ marginBottom: 24 }}>About hero</h2>
          <RichTextInput label="Eyebrow" value={draftHero.eyebrow} onChange={v => setDraftHero({ ...draftHero, eyebrow: v })} />
          <RichTextInput label="Heading" value={draftHero.heading} onChange={v => setDraftHero({ ...draftHero, heading: v })} multiline rows={2} />
          <RichTextInput label="Body (HTML)" value={draftHero.bodyHtml} onChange={v => setDraftHero({ ...draftHero, bodyHtml: v })} multiline rows={6} />
          <ImageInput label="Image" value={draftHero.image} onChange={v => setDraftHero({ ...draftHero, image: v })} />
        </>
      )}
      {part === 'quote' && (
        <>
          <h2 className="admin-section-title" style={{ marginBottom: 24 }}>Quote</h2>
          <RichTextInput label="Label" value={draftQuote.label} onChange={v => setDraftQuote({ ...draftQuote, label: v })} />
          <RichTextInput label="Quote" value={draftQuote.quote} onChange={v => setDraftQuote({ ...draftQuote, quote: v })} multiline rows={5} />
          <RichTextInput label="Attribution name" value={draftQuote.attributionName} onChange={v => setDraftQuote({ ...draftQuote, attributionName: v })} />
          <RichTextInput label="Attribution title" value={draftQuote.attributionTitle} onChange={v => setDraftQuote({ ...draftQuote, attributionTitle: v })} />
          <ImageInput label="Image" value={draftQuote.image} onChange={v => setDraftQuote({ ...draftQuote, image: v })} />
        </>
      )}
      {part === 'principles' && (
        <>
          <h2 className="admin-section-title" style={{ marginBottom: 24 }}>Principles</h2>
          <DragSortList items={draftPrinciples} onReorder={setDraftPrinciples} renderItem={(row: PrincipleCard) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
              <RichTextInput label="Num" value={row.num} onChange={v => setDraftPrinciples(list => list.map(x => x.id === row.id ? { ...x, num: v } : x))} />
              <RichTextInput label="Title" value={row.title} onChange={v => setDraftPrinciples(list => list.map(x => x.id === row.id ? { ...x, title: v } : x))} />
              <RichTextInput label="Description" value={row.desc} onChange={v => setDraftPrinciples(list => list.map(x => x.id === row.id ? { ...x, desc: v } : x))} multiline rows={3} />
              <button type="button" className="btn-outline" style={{ cursor: 'pointer' }} onClick={() => setDraftPrinciples(list => list.filter(x => x.id !== row.id))}>Remove</button>
            </div>
          )} />
          <button type="button" className="btn-primary" style={{ marginTop: 12, cursor: 'pointer' }} onClick={() => setDraftPrinciples(list => [...list, { id: `p-${Date.now()}`, num: '', title: '', desc: '' }])}>Add principle</button>
        </>
      )}
      {part === 'news' && (
        <>
          <h2 className="admin-section-title" style={{ marginBottom: 24 }}>News & awards</h2>
          <RichTextInput label="Section eyebrow" value={draftMeta.eyebrow} onChange={v => setDraftMeta(m => ({ ...m, eyebrow: v }))} />
          <RichTextInput label="Section title" value={draftMeta.title} onChange={v => setDraftMeta(m => ({ ...m, title: v }))} />
          <DragSortList items={draftNews} onReorder={setDraftNews} renderItem={(row: NewsItem) => (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
              <RichTextInput label="Type" value={row.type} onChange={v => setDraftNews(list => list.map(x => x.id === row.id ? { ...x, type: v } : x))} />
              <RichTextInput label="Title" value={row.title} onChange={v => setDraftNews(list => list.map(x => x.id === row.id ? { ...x, title: v } : x))} />
              <RichTextInput label="Href" value={row.href} onChange={v => setDraftNews(list => list.map(x => x.id === row.id ? { ...x, href: v } : x))} />
              <button type="button" className="btn-outline" style={{ cursor: 'pointer' }} onClick={() => setDraftNews(list => list.filter(x => x.id !== row.id))}>Remove</button>
            </div>
          )} />
          <button type="button" className="btn-primary" style={{ marginTop: 12, cursor: 'pointer' }} onClick={() => setDraftNews(list => [...list, { id: `n-${Date.now()}`, type: 'News', title: '', href: '#' }])}>Add item</button>
        </>
      )}
      <button type="button" className="btn-outline" style={{ marginTop: 24, cursor: 'pointer' }} onClick={() => void onReset()}>Reset section</button>
    </EditorShell>
  )
}
