'use client'

import { useCallback, useEffect, useState } from 'react'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'
import { EditorShell } from '@/components/admin/EditorShell'
import { useToast } from '@/components/admin/ToastProvider'
import { useConfirm } from '@/components/admin/ConfirmDialog'
import { useSectionSave } from '@/components/admin/useSectionSave'

export function FeaturedProductsEditor() {
  const catalog = useCMSStore(s => s.products) ?? DEFAULT_CMS_CONTENT.products
  const committed = useCMSStore(s => s.pages.home.featuredProducts) ?? DEFAULT_CMS_CONTENT.pages.home.featuredProducts
  const updatePage = useCMSStore(s => s.updatePage)
  const resetSection = useCMSStore(s => s.resetSection)
  const { push } = useToast()
  const { confirm } = useConfirm()
  const { saving, showCheck, runSave } = useSectionSave()
  const [draft, setDraft] = useState<string[]>(committed)

  useEffect(() => setDraft(committed), [committed])

  const dirty = JSON.stringify(draft) !== JSON.stringify(committed)
  const handleSave = useCallback(async () => {
    if (!dirty) return
    await runSave(() => {
      updatePage('home', { featuredProducts: draft })
      push('success', 'Featured products saved')
    })
  }, [dirty, draft, runSave, updatePage, push])

  const toggle = (id: string) => {
    setDraft(cur => {
      if (cur.includes(id)) return cur.filter(x => x !== id)
      if (cur.length >= 6) return cur
      return [...cur, id]
    })
  }

  return (
    <EditorShell breadcrumb={['Admin', 'Pages', 'Home', 'Featured Products']} dirty={dirty} saving={saving} showCheck={showCheck} onSave={() => void handleSave()}>
      <h2 className="admin-section-title" style={{ marginBottom: 12 }}>Featured on home</h2>
      <p style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#666', marginBottom: 24 }}>Select up to 6 products (shown on the products page featured grid when set).</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        {draft.map(id => {
          const p = catalog.find(x => x.id === id)
          if (!p) return null
          return (
            <span key={id} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 10px', border: '1px solid #ebebeb', fontSize: 12 }}>
              {p.name}
              <button type="button" style={{ border: 'none', background: 'none', cursor: 'pointer' }} onClick={() => setDraft(d => d.filter(x => x !== id))}>×</button>
            </span>
          )
        })}
      </div>
      <div style={{ maxHeight: 360, overflowY: 'auto', border: '1px solid #ebebeb', padding: 12 }}>
        {catalog.map(p => (
          <label key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 8, cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}>
            <input type="checkbox" checked={draft.includes(p.id)} onChange={() => toggle(p.id)} disabled={!draft.includes(p.id) && draft.length >= 6} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt="" width={40} height={40} style={{ objectFit: 'cover' }} />
            <span style={{ fontSize: 14 }}>{p.name}</span>
          </label>
        ))}
      </div>
      <button type="button" className="btn-outline" style={{ marginTop: 16, cursor: 'pointer' }} onClick={async () => {
        if (!await confirm({ title: 'Reset featured?', danger: true })) return
        resetSection('home.featuredProducts')
        setDraft(useCMSStore.getState().pages.home.featuredProducts)
        push('warning', 'Reset')
      }}>Reset section</button>
    </EditorShell>
  )
}
