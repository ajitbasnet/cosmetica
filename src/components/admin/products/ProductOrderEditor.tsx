'use client'

import { useMemo, useState } from 'react'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'
import { orderProductsInCategory } from '@/lib/products'
import { EditorShell } from '@/components/admin/EditorShell'
import { DragSortList } from '@/components/admin/controls/DragSortList'
import { useToast } from '@/components/admin/ToastProvider'

export function ProductOrderEditor() {
  const products = useCMSStore(s => s.products) ?? DEFAULT_CMS_CONTENT.products
  const orderMap = useCMSStore(s => s.productOrderByCategory) ?? DEFAULT_CMS_CONTENT.productOrderByCategory
  const categories = useCMSStore(s => s.siteSettings.catalogCategories) ?? DEFAULT_CMS_CONTENT.siteSettings.catalogCategories
  const reorderProducts = useCMSStore(s => s.reorderProducts)
  const { push } = useToast()
  const [slug, setSlug] = useState(categories[0]?.slug ?? 'skincare')

  const ordered = useMemo(() => orderProductsInCategory(products, slug, orderMap), [products, slug, orderMap])

  return (
    <EditorShell breadcrumb={['Admin', 'Products', 'Category order']} dirty={false} saving={false} showCheck={false} onSave={() => {}}>
      <h2 className="admin-section-title" style={{ marginBottom: 12 }}>Drag to reorder</h2>
      <p style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#666', marginBottom: 20 }}>Order is saved as soon as you drop a row. Applies to category listing pages.</p>
      <label className="admin-label" style={{ display: 'block', marginBottom: 8 }}>Category</label>
      <select className="admin-input" value={slug} onChange={e => setSlug(e.target.value)} style={{ maxWidth: 280, marginBottom: 24 }}>
        {categories.map(c => (
          <option key={c.slug} value={c.slug}>{c.label}</option>
        ))}
      </select>
      <DragSortList
        items={ordered}
        onReorder={next => {
          reorderProducts(slug, next.map(p => p.id))
          push('success', 'Order updated')
        }}
        renderItem={p => (
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.img} alt="" width={40} height={40} style={{ objectFit: 'cover' }} />
            <div>
              <div style={{ fontWeight: 500 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: '#888' }}>{p.brand}</div>
            </div>
          </div>
        )}
      />
    </EditorShell>
  )
}
