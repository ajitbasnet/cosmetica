'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'
import type { BlogCMS, BlogPost, ContactCMS, ExpertiseCMS, ProductsPageCMS } from '@/lib/cms-types'
import { EditorShell } from '@/components/admin/EditorShell'
import { RichTextInput } from '@/components/admin/controls/RichTextInput'
import { ImageInput } from '@/components/admin/controls/ImageInput'
import { DragSortList } from '@/components/admin/controls/DragSortList'
import { useToast } from '@/components/admin/ToastProvider'
import { useConfirm } from '@/components/admin/ConfirmDialog'
import { useSectionSave } from '@/components/admin/useSectionSave'

export function ExpertiseEditor() {
  const page = useCMSStore(s => s.pages.expertise) ?? DEFAULT_CMS_CONTENT.pages.expertise
  const updatePage = useCMSStore(s => s.updatePage)
  const resetSection = useCMSStore(s => s.resetSection)
  const { push } = useToast()
  const { confirm } = useConfirm()
  const { saving, showCheck, runSave } = useSectionSave()
  const [draft, setDraft] = useState<ExpertiseCMS>(page)
  useEffect(() => setDraft(page), [page])
  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(page), [draft, page])
  const handleSave = useCallback(async () => {
    if (!dirty) return
    await runSave(() => { updatePage('expertise', draft); push('success', 'Expertise saved') })
  }, [dirty, draft, runSave, updatePage, push])
  return (
    <EditorShell breadcrumb={['Admin', 'Pages', 'Expertise']} dirty={dirty} saving={saving} showCheck={showCheck} onSave={() => void handleSave()}>
      <h2 className="admin-section-title" style={{ marginBottom: 24 }}>Expertise page</h2>
      <RichTextInput label="Hero eyebrow" value={draft.heroEyebrow} onChange={v => setDraft({ ...draft, heroEyebrow: v })} />
      <RichTextInput label="Hero heading" value={draft.heroHeading} onChange={v => setDraft({ ...draft, heroHeading: v })} multiline rows={3} />
      <RichTextInput label="Hero body" value={draft.heroBody} onChange={v => setDraft({ ...draft, heroBody: v })} multiline rows={4} />
      <RichTextInput label="Hero CTA label" value={draft.heroCtaLabel} onChange={v => setDraft({ ...draft, heroCtaLabel: v })} />
      <RichTextInput label="Hero CTA href" value={draft.heroCtaHref} onChange={v => setDraft({ ...draft, heroCtaHref: v })} />
      <ImageInput label="Hero image" value={draft.heroImage} onChange={v => setDraft({ ...draft, heroImage: v })} />
      <p className="admin-label" style={{ margin: '24px 0 8px' }}>Stats</p>
      <DragSortList items={draft.stats} onReorder={stats => setDraft({ ...draft, stats })} renderItem={s => (
        <div style={{ display: 'flex', gap: 8, width: '100%' }}>
          <input className="admin-input" style={{ flex: 1 }} value={s.num} onChange={e => setDraft(d => ({ ...d, stats: d.stats.map(x => x.id === s.id ? { ...x, num: e.target.value } : x) }))} />
          <input className="admin-input" style={{ flex: 2 }} value={s.label} onChange={e => setDraft(d => ({ ...d, stats: d.stats.map(x => x.id === s.id ? { ...x, label: e.target.value } : x) }))} />
        </div>
      )} />
      <RichTextInput label="Categories eyebrow" value={draft.categoriesEyebrow} onChange={v => setDraft({ ...draft, categoriesEyebrow: v })} />
      <RichTextInput label="Categories heading" value={draft.categoriesHeading} onChange={v => setDraft({ ...draft, categoriesHeading: v })} />
      <DragSortList items={draft.beautyCategories} onReorder={beautyCategories => setDraft({ ...draft, beautyCategories })} renderItem={c => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
          <RichTextInput label="Title" value={c.title} onChange={v => setDraft(d => ({ ...d, beautyCategories: d.beautyCategories.map(x => x.id === c.id ? { ...x, title: v } : x) }))} />
          <RichTextInput label="Description" value={c.desc} onChange={v => setDraft(d => ({ ...d, beautyCategories: d.beautyCategories.map(x => x.id === c.id ? { ...x, desc: v } : x) }))} multiline rows={2} />
          <ImageInput label="Image" value={c.img} onChange={v => setDraft(d => ({ ...d, beautyCategories: d.beautyCategories.map(x => x.id === c.id ? { ...x, img: v } : x) }))} />
        </div>
      )} />
      <RichTextInput label="CTA heading" value={draft.ctaHeading} onChange={v => setDraft({ ...draft, ctaHeading: v })} multiline rows={2} />
      <RichTextInput label="CTA body" value={draft.ctaBody} onChange={v => setDraft({ ...draft, ctaBody: v })} multiline rows={3} />
      <RichTextInput label="CTA button" value={draft.ctaButtonLabel} onChange={v => setDraft({ ...draft, ctaButtonLabel: v })} />
      <RichTextInput label="CTA href" value={draft.ctaButtonHref} onChange={v => setDraft({ ...draft, ctaButtonHref: v })} />
      <button type="button" className="btn-outline" style={{ marginTop: 16, cursor: 'pointer' }} onClick={async () => {
        if (!await confirm({ title: 'Reset expertise page?', danger: true })) return
        resetSection('expertise')
        setDraft(useCMSStore.getState().pages.expertise ?? DEFAULT_CMS_CONTENT.pages.expertise)
        push('warning', 'Reset')
      }}>Reset entire page</button>
    </EditorShell>
  )
}

export function BlogEditor() {
  const page = useCMSStore(s => s.pages.blog) ?? DEFAULT_CMS_CONTENT.pages.blog
  const updatePage = useCMSStore(s => s.updatePage)
  const resetSection = useCMSStore(s => s.resetSection)
  const { push } = useToast()
  const { confirm } = useConfirm()
  const { saving, showCheck, runSave } = useSectionSave()
  const [draft, setDraft] = useState<BlogCMS>(page)
  useEffect(() => setDraft(page), [page])
  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(page), [draft, page])
  const handleSave = useCallback(async () => {
    if (!dirty) return
    await runSave(() => { updatePage('blog', draft); push('success', 'Blog saved') })
  }, [dirty, draft, runSave, updatePage, push])
  return (
    <EditorShell breadcrumb={['Admin', 'Pages', 'Blog']} dirty={dirty} saving={saving} showCheck={showCheck} onSave={() => void handleSave()}>
      <h2 className="admin-section-title" style={{ marginBottom: 24 }}>Blog</h2>
      <RichTextInput label="Header eyebrow" value={draft.headerEyebrow} onChange={v => setDraft({ ...draft, headerEyebrow: v })} />
      <RichTextInput label="Header title" value={draft.headerTitle} onChange={v => setDraft({ ...draft, headerTitle: v })} multiline rows={2} />
      <RichTextInput label="Featured label prefix" value={draft.featuredEyebrowPrefix} onChange={v => setDraft({ ...draft, featuredEyebrowPrefix: v })} />
      <p className="admin-label" style={{ margin: '24px 0 8px' }}>Posts</p>
      <DragSortList items={draft.posts} onReorder={posts => setDraft({ ...draft, posts })} renderItem={(p: BlogPost) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
          <RichTextInput label="Category" value={p.category} onChange={v => setDraft(d => ({ ...d, posts: d.posts.map(x => x.id === p.id ? { ...x, category: v } : x) }))} />
          <RichTextInput label="Title" value={p.title} onChange={v => setDraft(d => ({ ...d, posts: d.posts.map(x => x.id === p.id ? { ...x, title: v } : x) }))} />
          <RichTextInput label="Date" value={p.date} onChange={v => setDraft(d => ({ ...d, posts: d.posts.map(x => x.id === p.id ? { ...x, date: v } : x) }))} />
          <ImageInput label="Image" value={p.img} onChange={v => setDraft(d => ({ ...d, posts: d.posts.map(x => x.id === p.id ? { ...x, img: v } : x) }))} />
          <RichTextInput label="Excerpt" value={p.excerpt} onChange={v => setDraft(d => ({ ...d, posts: d.posts.map(x => x.id === p.id ? { ...x, excerpt: v } : x) }))} multiline rows={2} maxLength={220} />
          <RichTextInput label="Href" value={p.href} onChange={v => setDraft(d => ({ ...d, posts: d.posts.map(x => x.id === p.id ? { ...x, href: v } : x) }))} />
          <button type="button" className="btn-outline" style={{ cursor: 'pointer' }} onClick={() => setDraft(d => ({ ...d, posts: d.posts.filter(x => x.id !== p.id) }))}>Remove</button>
        </div>
      )} />
      <button type="button" className="btn-primary" style={{ marginTop: 12, cursor: 'pointer' }} onClick={() => setDraft(d => ({ ...d, posts: [...d.posts, { id: `post-${Date.now()}`, category: 'Insights', title: '', date: '', img: '', excerpt: '', href: '/blog/post' }] }))}>Add post</button>
      <button type="button" className="btn-outline" style={{ marginTop: 16, cursor: 'pointer' }} onClick={async () => {
        if (!await confirm({ title: 'Reset blog?', danger: true })) return
        resetSection('blog')
        setDraft(useCMSStore.getState().pages.blog ?? DEFAULT_CMS_CONTENT.pages.blog)
        push('warning', 'Reset')
      }}>Reset entire page</button>
    </EditorShell>
  )
}

export function ContactEditor() {
  const page = useCMSStore(s => s.pages.contact) ?? DEFAULT_CMS_CONTENT.pages.contact
  const updatePage = useCMSStore(s => s.updatePage)
  const resetSection = useCMSStore(s => s.resetSection)
  const { push } = useToast()
  const { confirm } = useConfirm()
  const { saving, showCheck, runSave } = useSectionSave()
  const [draft, setDraft] = useState<ContactCMS>(page)
  useEffect(() => setDraft(page), [page])
  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(page), [draft, page])
  const handleSave = useCallback(async () => {
    if (!dirty) return
    await runSave(() => { updatePage('contact', draft); push('success', 'Contact saved') })
  }, [dirty, draft, runSave, updatePage, push])
  return (
    <EditorShell breadcrumb={['Admin', 'Pages', 'Contact']} dirty={dirty} saving={saving} showCheck={showCheck} onSave={() => void handleSave()}>
      <h2 className="admin-section-title" style={{ marginBottom: 24 }}>Contact</h2>
      <RichTextInput label="Eyebrow" value={draft.eyebrow} onChange={v => setDraft({ ...draft, eyebrow: v })} />
      <RichTextInput label="Heading" value={draft.heading} onChange={v => setDraft({ ...draft, heading: v })} />
      <RichTextInput label="Email label" value={draft.emailLabel} onChange={v => setDraft({ ...draft, emailLabel: v })} />
      <RichTextInput label="Email" value={draft.email} onChange={v => setDraft({ ...draft, email: v })} />
      <RichTextInput label="Find us label" value={draft.findUsLabel} onChange={v => setDraft({ ...draft, findUsLabel: v })} />
      <RichTextInput label="Address" value={draft.address} onChange={v => setDraft({ ...draft, address: v })} multiline rows={4} />
      <RichTextInput label="Success heading" value={draft.successHeading} onChange={v => setDraft({ ...draft, successHeading: v })} />
      <RichTextInput label="Success body" value={draft.successBody} onChange={v => setDraft({ ...draft, successBody: v })} multiline rows={2} />
      <RichTextInput label="First name placeholder" value={draft.formFirstNamePlaceholder} onChange={v => setDraft({ ...draft, formFirstNamePlaceholder: v })} />
      <RichTextInput label="Last name placeholder" value={draft.formLastNamePlaceholder} onChange={v => setDraft({ ...draft, formLastNamePlaceholder: v })} />
      <RichTextInput label="Email placeholder" value={draft.formEmailPlaceholder} onChange={v => setDraft({ ...draft, formEmailPlaceholder: v })} />
      <RichTextInput label="Company placeholder" value={draft.formCompanyPlaceholder} onChange={v => setDraft({ ...draft, formCompanyPlaceholder: v })} />
      <RichTextInput label="Message placeholder" value={draft.formMessagePlaceholder} onChange={v => setDraft({ ...draft, formMessagePlaceholder: v })} />
      <RichTextInput label="Submit label" value={draft.submitLabel} onChange={v => setDraft({ ...draft, submitLabel: v })} />
      <button type="button" className="btn-outline" style={{ marginTop: 16, cursor: 'pointer' }} onClick={async () => {
        if (!await confirm({ title: 'Reset contact?', danger: true })) return
        resetSection('contact')
        setDraft(useCMSStore.getState().pages.contact ?? DEFAULT_CMS_CONTENT.pages.contact)
        push('warning', 'Reset')
      }}>Reset entire page</button>
    </EditorShell>
  )
}

export function ProductsPageEditor() {
  const page = useCMSStore(s => s.pages.products) ?? DEFAULT_CMS_CONTENT.pages.products
  const updatePage = useCMSStore(s => s.updatePage)
  const resetSection = useCMSStore(s => s.resetSection)
  const { push } = useToast()
  const { confirm } = useConfirm()
  const { saving, showCheck, runSave } = useSectionSave()
  const [draft, setDraft] = useState<ProductsPageCMS>(page)
  useEffect(() => setDraft(page), [page])
  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(page), [draft, page])
  const handleSave = useCallback(async () => {
    if (!dirty) return
    await runSave(() => { updatePage('products', draft); push('success', 'Products page copy saved') })
  }, [dirty, draft, runSave, updatePage, push])
  return (
    <EditorShell breadcrumb={['Admin', 'Products', 'Shop copy']} dirty={dirty} saving={saving} showCheck={showCheck} onSave={() => void handleSave()}>
      <h2 className="admin-section-title" style={{ marginBottom: 24 }}>Products index & category chrome</h2>
      <RichTextInput label="Hero eyebrow" value={draft.heroEyebrow} onChange={v => setDraft({ ...draft, heroEyebrow: v })} />
      <RichTextInput label="Hero title" value={draft.heroTitle} onChange={v => setDraft({ ...draft, heroTitle: v })} multiline rows={2} />
      <ImageInput label="Hero image" value={draft.heroImage} onChange={v => setDraft({ ...draft, heroImage: v })} />
      <RichTextInput label="Categories eyebrow" value={draft.categoriesEyebrow} onChange={v => setDraft({ ...draft, categoriesEyebrow: v })} />
      <RichTextInput label="Categories title" value={draft.categoriesTitle} onChange={v => setDraft({ ...draft, categoriesTitle: v })} />
      <RichTextInput label="Featured eyebrow" value={draft.featuredEyebrow} onChange={v => setDraft({ ...draft, featuredEyebrow: v })} />
      <RichTextInput label="Featured title" value={draft.featuredTitle} onChange={v => setDraft({ ...draft, featuredTitle: v })} />
      <RichTextInput label="Featured view-all label" value={draft.featuredViewAllLabel} onChange={v => setDraft({ ...draft, featuredViewAllLabel: v })} />
      <RichTextInput label="Featured view-all href" value={draft.featuredViewAllHref} onChange={v => setDraft({ ...draft, featuredViewAllHref: v })} />
      <RichTextInput label="Category page eyebrow" value={draft.categoryPageEyebrow} onChange={v => setDraft({ ...draft, categoryPageEyebrow: v })} />
      <button type="button" className="btn-outline" style={{ marginTop: 16, cursor: 'pointer' }} onClick={async () => {
        if (!await confirm({ title: 'Reset products page copy?', danger: true })) return
        resetSection('products')
        setDraft(useCMSStore.getState().pages.products ?? DEFAULT_CMS_CONTENT.pages.products)
        push('warning', 'Reset')
      }}>Reset</button>
    </EditorShell>
  )
}
