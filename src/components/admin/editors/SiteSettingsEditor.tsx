'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'
import type { SiteSettings } from '@/lib/cms-types'
import { EditorShell } from '@/components/admin/EditorShell'
import { RichTextInput } from '@/components/admin/controls/RichTextInput'
import { useToast } from '@/components/admin/ToastProvider'
import { useConfirm } from '@/components/admin/ConfirmDialog'
import { useSectionSave } from '@/components/admin/useSectionSave'

export function SiteSettingsEditor({ tab }: { tab: 'logo' | 'footer' | 'social' | 'cookie' | 'seo' | 'catalog' }) {
  const site = useCMSStore(s => s.siteSettings) ?? DEFAULT_CMS_CONTENT.siteSettings
  const updateSiteSettings = useCMSStore(s => s.updateSiteSettings)
  const resetSection = useCMSStore(s => s.resetSection)
  const { push } = useToast()
  const { confirm } = useConfirm()
  const { saving, showCheck, runSave } = useSectionSave()
  const [draft, setDraft] = useState<SiteSettings>(site)
  useEffect(() => setDraft(site), [site])
  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(site), [draft, site])
  const handleSave = useCallback(async () => {
    if (!dirty) return
    await runSave(() => { updateSiteSettings(draft); push('success', 'Site settings saved') })
  }, [dirty, draft, runSave, updateSiteSettings, push])

  const crumbs: Record<typeof tab, string[]> = {
    logo: ['Admin', 'Site Settings', 'Logo & Brand Name'],
    footer: ['Admin', 'Site Settings', 'Footer Content'],
    social: ['Admin', 'Site Settings', 'Social Links'],
    cookie: ['Admin', 'Site Settings', 'Cookie Banner'],
    seo: ['Admin', 'Site Settings', 'SEO Defaults'],
    catalog: ['Admin', 'Site Settings', 'Catalog Categories'],
  }

  return (
    <EditorShell breadcrumb={crumbs[tab]} dirty={dirty} saving={saving} showCheck={showCheck} onSave={() => void handleSave()}>
      {tab === 'logo' && (
        <>
          <RichTextInput label="Brand name" value={draft.brandName} onChange={v => setDraft({ ...draft, brandName: v })} />
          <RichTextInput label="Tagline" value={draft.brandTagline} onChange={v => setDraft({ ...draft, brandTagline: v })} />
          <RichTextInput label="Top strip text" value={draft.topStripText} onChange={v => setDraft({ ...draft, topStripText: v })} />
        </>
      )}
      {tab === 'footer' && (
        <>
          <RichTextInput label="Newsletter label" value={draft.newsletterLabel} onChange={v => setDraft({ ...draft, newsletterLabel: v })} />
          <RichTextInput label="Newsletter headline" value={draft.newsletterHeadline} onChange={v => setDraft({ ...draft, newsletterHeadline: v })} multiline rows={2} />
          <RichTextInput label="Newsletter sub" value={draft.newsletterSub} onChange={v => setDraft({ ...draft, newsletterSub: v })} />
          <RichTextInput label="Thanks message" value={draft.newsletterThanks} onChange={v => setDraft({ ...draft, newsletterThanks: v })} />
          <RichTextInput label="Footer brand name" value={draft.footerBrandName} onChange={v => setDraft({ ...draft, footerBrandName: v })} />
          <RichTextInput label="Footer tagline" value={draft.footerBrandTagline} onChange={v => setDraft({ ...draft, footerBrandTagline: v })} />
          <RichTextInput label="Contact email" value={draft.contactEmail} onChange={v => setDraft({ ...draft, contactEmail: v })} />
          <RichTextInput label="Address" value={draft.contactAddress} onChange={v => setDraft({ ...draft, contactAddress: v })} multiline rows={4} />
          <RichTextInput label="Copyright" value={draft.copyright} onChange={v => setDraft({ ...draft, copyright: v })} />
        </>
      )}
      {tab === 'social' && (
        <>
          <RichTextInput label="Instagram URL" value={draft.socialInstagram} onChange={v => setDraft({ ...draft, socialInstagram: v })} />
          <RichTextInput label="LinkedIn URL" value={draft.socialLinkedin} onChange={v => setDraft({ ...draft, socialLinkedin: v })} />
        </>
      )}
      {tab === 'cookie' && (
        <>
          <RichTextInput label="Label" value={draft.cookieLabel} onChange={v => setDraft({ ...draft, cookieLabel: v })} />
          <RichTextInput label="Body" value={draft.cookieBody} onChange={v => setDraft({ ...draft, cookieBody: v })} multiline rows={3} />
          <RichTextInput label="Privacy link label" value={draft.cookiePrivacyLabel} onChange={v => setDraft({ ...draft, cookiePrivacyLabel: v })} />
        </>
      )}
      {tab === 'seo' && (
        <>
          <RichTextInput label="Default title" value={draft.seoDefaultTitle} onChange={v => setDraft({ ...draft, seoDefaultTitle: v })} />
          <RichTextInput label="Default description" value={draft.seoDefaultDescription} onChange={v => setDraft({ ...draft, seoDefaultDescription: v })} multiline rows={3} />
        </>
      )}
      {tab === 'catalog' && (
        <>
          <p className="admin-label" style={{ marginBottom: 12 }}>Categories (order + labels drive shop)</p>
          {draft.catalogCategories.map((c, i) => (
            <div key={c.slug} style={{ border: '1px solid #ebebeb', padding: 16, marginBottom: 12 }}>
              <RichTextInput label={`Label (${c.slug})`} value={c.label} onChange={v => setDraft(d => ({ ...d, catalogCategories: d.catalogCategories.map((x, j) => j === i ? { ...x, label: v } : x) }))} />
              <RichTextInput label="Description" value={c.desc} onChange={v => setDraft(d => ({ ...d, catalogCategories: d.catalogCategories.map((x, j) => j === i ? { ...x, desc: v } : x) }))} multiline rows={2} />
              <RichTextInput label="Image URL" value={c.img} onChange={v => setDraft(d => ({ ...d, catalogCategories: d.catalogCategories.map((x, j) => j === i ? { ...x, img: v } : x) }))} />
            </div>
          ))}
        </>
      )}
      <button type="button" className="btn-outline" style={{ marginTop: 24, cursor: 'pointer' }} onClick={async () => {
        if (!await confirm({ title: 'Reset all site settings?', danger: true })) return
        resetSection('siteSettings')
        setDraft(useCMSStore.getState().siteSettings ?? DEFAULT_CMS_CONTENT.siteSettings)
        push('warning', 'Reset')
      }}>Reset site settings</button>
    </EditorShell>
  )
}
