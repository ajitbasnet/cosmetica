'use client'

import { useMemo, useState } from 'react'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'
import type { Product } from '@/lib/cms-types'
import { EditorShell } from '@/components/admin/EditorShell'
import { ProductFormModal } from '@/components/admin/products/ProductFormModal'
import { useToast } from '@/components/admin/ToastProvider'
import { useConfirm } from '@/components/admin/ConfirmDialog'
import { Search, Plus, Pencil, Copy, Trash2 } from 'lucide-react'

export function ProductsTable() {
  const products = useCMSStore(s => s.products) ?? DEFAULT_CMS_CONTENT.products
  const categories = useCMSStore(s => s.siteSettings.catalogCategories) ?? DEFAULT_CMS_CONTENT.siteSettings.catalogCategories
  const updateProduct = useCMSStore(s => s.updateProduct)
  const addProduct = useCMSStore(s => s.addProduct)
  const deleteProduct = useCMSStore(s => s.deleteProduct)
  const duplicateProduct = useCMSStore(s => s.duplicateProduct)
  const { push } = useToast()
  const { confirm } = useConfirm()

  const [q, setQ] = useState('')
  const [cat, setCat] = useState<string>('all')
  const [modal, setModal] = useState<Product | null | 'new'>(null)

  const rows = useMemo(() => {
    return products.filter(p => {
      if (cat !== 'all' && p.categorySlug !== cat) return false
      const s = `${p.name} ${p.brand} ${p.slug}`.toLowerCase()
      return s.includes(q.trim().toLowerCase())
    })
  }, [products, q, cat])

  const catOptions = useMemo(() => [{ slug: 'all', label: 'All categories' }, ...categories.map(c => ({ slug: c.slug, label: c.label }))], [categories])

  const persist = (p: Product): boolean => {
    const slugTaken = products.some(x => x.slug === p.slug && x.id !== p.id)
    if (slugTaken) {
      push('error', 'Another product already uses this slug.')
      return false
    }
    const existing = products.find(x => x.id === p.id)
    if (existing) {
      updateProduct(p.id, p)
      push('success', 'Product updated')
    } else {
      addProduct(p)
      push('success', 'Product created')
    }
    return true
  }

  return (
    <>
      <EditorShell breadcrumb={['Admin', 'Products', 'Catalogue']} dirty={false} saving={false} showCheck={false} onSave={() => {}}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
          <h2 className="admin-section-title" style={{ marginBottom: 0 }}>Product catalogue</h2>
          <button type="button" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, cursor: 'pointer' }} onClick={() => setModal('new')}>
            <Plus size={14} /> Add product
          </button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9b9b9b' }} />
            <input
              className="admin-input"
              placeholder="Search name, brand, slug…"
              value={q}
              onChange={e => setQ(e.target.value)}
              style={{ paddingLeft: 34, minWidth: 220 }}
            />
          </div>
          <select className="admin-input" value={cat} onChange={e => setCat(e.target.value)} style={{ minWidth: 180 }}>
            {catOptions.map(c => (
              <option key={c.slug} value={c.slug}>{c.label}</option>
            ))}
          </select>
        </div>
        <div style={{ border: '1px solid #ebebeb', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ebebeb', textAlign: 'left', fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9b9b9b' }}>
                <th style={{ padding: 12 }}>Thumb</th>
                <th style={{ padding: 12 }}>Name</th>
                <th style={{ padding: 12 }}>Brand</th>
                <th style={{ padding: 12 }}>Category</th>
                <th style={{ padding: 12 }}>Price</th>
                <th style={{ padding: 12 }}>Badge</th>
                <th style={{ padding: 12 }}>Stock</th>
                <th style={{ padding: 12 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                  <td style={{ padding: 10 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt="" width={44} height={44} style={{ objectFit: 'cover' }} />
                  </td>
                  <td style={{ padding: 10, fontFamily: 'DM Sans' }}>{p.name}</td>
                  <td style={{ padding: 10, color: '#666' }}>{p.brand}</td>
                  <td style={{ padding: 10, color: '#666' }}>{p.category}</td>
                  <td style={{ padding: 10 }}>${p.price.toFixed(2)}</td>
                  <td style={{ padding: 10, fontSize: 12 }}>{p.badge ?? '—'}</td>
                  <td style={{ padding: 10 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                      <input type="checkbox" checked={p.inStock} onChange={e => updateProduct(p.id, { inStock: e.target.checked })} />
                      <span style={{ fontSize: 12 }}>{p.inStock ? 'In stock' : 'Out'}</span>
                    </label>
                  </td>
                  <td style={{ padding: 10 }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button type="button" title="Edit" style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#555' }} onClick={() => setModal(p)}>
                        <Pencil size={16} />
                      </button>
                      <button type="button" title="Duplicate" style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#555' }} onClick={() => { duplicateProduct(p.id); push('success', 'Duplicated') }}>
                        <Copy size={16} />
                      </button>
                      <button
                        type="button"
                        title="Delete"
                        style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#b91c1c' }}
                        onClick={async () => {
                          if (!await confirm({ title: 'Delete product?', message: p.name, danger: true })) return
                          deleteProduct(p.id)
                          push('warning', 'Product removed')
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </EditorShell>
      <ProductFormModal
        open={modal !== null}
        onOpenChange={o => { if (!o) setModal(null) }}
        initial={modal === 'new' || modal === null ? null : modal}
        categories={categories.map(c => ({ label: c.label, slug: c.slug }))}
        onSubmit={persist}
      />
    </>
  )
}
