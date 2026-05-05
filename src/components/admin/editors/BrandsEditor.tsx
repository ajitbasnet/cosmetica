'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'
import type { Brand } from '@/lib/cms-types'
import { EditorShell } from '@/components/admin/EditorShell'
import { RichTextInput } from '@/components/admin/controls/RichTextInput'
import { ImageInput } from '@/components/admin/controls/ImageInput'
import { useToast } from '@/components/admin/ToastProvider'
import { useConfirm } from '@/components/admin/ConfirmDialog'
import { useSectionSave } from '@/components/admin/useSectionSave'

export function BrandsEditor() {
  const brands = useCMSStore(s => s.brands) ?? DEFAULT_CMS_CONTENT.brands
  const setBrands = useCMSStore(s => s.setBrands)
  const resetSection = useCMSStore(s => s.resetSection)
  const { push } = useToast()
  const { confirm } = useConfirm()
  const { saving, showCheck, runSave } = useSectionSave()
  const [draft, setDraft] = useState<Brand[]>(brands)
  useEffect(() => setDraft(brands), [brands])
  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(brands), [draft, brands])

  const handleSave = useCallback(async () => {
    if (!dirty) return
    await runSave(() => {
      setBrands(draft)
      push('success', 'Brands saved')
    })
  }, [dirty, draft, setBrands, runSave, push])

  const syncFromStore = () => setDraft(useCMSStore.getState().brands ?? DEFAULT_CMS_CONTENT.brands)

  return (
    <EditorShell breadcrumb={['Admin', 'Brands', 'Brand Showcase']} dirty={dirty} saving={saving} showCheck={showCheck} onSave={() => void handleSave()}>
      <h2 className="admin-section-title" style={{ marginBottom: 24 }}>Brands</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
        {draft.map((b, i) => (
          <div key={b.id} style={{ border: '1px solid #ebebeb', padding: 20 }}>
            <ImageInput label="Logo" value={b.logo} onChange={v => setDraft(list => list.map((x, j) => j === i ? { ...x, logo: v } : x))} />
            <RichTextInput label="Name" value={b.name} onChange={v => setDraft(list => list.map((x, j) => j === i ? { ...x, name: v } : x))} />
            <RichTextInput label="Description" value={b.description} onChange={v => setDraft(list => list.map((x, j) => j === i ? { ...x, description: v } : x))} multiline rows={3} />
            <RichTextInput label="Website" value={b.website ?? ''} onChange={v => setDraft(list => list.map((x, j) => j === i ? { ...x, website: v } : x))} />
            <button type="button" className="btn-outline" style={{ marginTop: 8, cursor: 'pointer' }} onClick={async () => {
              if (!await confirm({ title: 'Delete brand?', danger: true })) return
              setDraft(list => list.filter((_, j) => j !== i))
            }}>Remove</button>
          </div>
        ))}
      </div>
      <button type="button" className="btn-primary" style={{ marginTop: 16, cursor: 'pointer' }} onClick={() => setDraft(list => [...list, { id: `brand-${Date.now()}`, name: '', description: '', logo: '' }])}>Add brand</button>
      <button type="button" className="btn-outline" style={{ marginTop: 16, marginLeft: 12, cursor: 'pointer' }} onClick={async () => {
        if (!await confirm({ title: 'Reset brands to defaults?', danger: true })) return
        resetSection('brands')
        syncFromStore()
        push('warning', 'Reset')
      }}>Reset brands</button>
    </EditorShell>
  )
}
