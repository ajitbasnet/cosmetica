'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type { Product } from '@/lib/cms-types'
import { SPIN360_FRAME_COUNT, buildSpin360FramesFromHero, buildSpin360FromTemplate } from '@/lib/spin360'
import { RichTextInput } from '@/components/admin/controls/RichTextInput'
import { ToggleInput } from '@/components/admin/controls/ToggleInput'
import { NumberInput } from '@/components/admin/controls/NumberInput'
import { SelectInput } from '@/components/admin/controls/SelectInput'
import { ImageInput } from '@/components/admin/controls/ImageInput'
import { ArrayEditor } from '@/components/admin/controls/ArrayEditor'

const badgeOptions = [
  { value: '', label: 'None' },
  { value: 'Best Seller', label: 'Best Seller' },
  { value: 'New', label: 'New' },
  { value: 'Fan Favourite', label: 'Fan Favourite' },
  { value: 'Award Winner', label: 'Award Winner' },
  { value: 'Limited Edition', label: 'Limited Edition' },
]

const productSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1, 'Slug required'),
  name: z.string().min(1, 'Name required'),
  brand: z.string().min(1, 'Brand required'),
  category: z.string().min(1),
  categorySlug: z.string().min(1),
  price: z.number().nonnegative(),
  originalPrice: z.number().nonnegative().optional(),
  rating: z.number().min(0).max(5),
  reviews: z.number().int().nonnegative(),
  description: z.string().min(1, 'Short description required').max(160),
  longDescription: z.string().min(1, 'Long description required'),
  benefits: z.array(z.string()).refine(arr => arr.some(s => s.trim().length > 0), { message: 'At least one benefit' }),
  howToUse: z.string().min(1),
  ingredients: z.string().min(1),
  badge: z.string().optional(),
  img: z.string().min(1, 'Main image required'),
  imgs: z.array(z.string()).length(4),
  spin360: z.array(z.string()).length(SPIN360_FRAME_COUNT),
  variants: z.array(z.object({ label: z.string(), value: z.string() })).refine(
    arr => arr.some(v => v.label.trim().length > 0 && v.value.trim().length > 0),
    { message: 'At least one variant with label and value' },
  ),
  inStock: z.boolean(),
  featured: z.boolean().optional(),
})

export type ProductFormValues = z.infer<typeof productSchema>

function padImgs(imgs: string[]): [string, string, string, string] {
  const a = [...imgs]
  while (a.length < 4) a.push('')
  return a.slice(0, 4) as [string, string, string, string]
}

function padSpin360(spin: string[], hero: string): string[] {
  const out = [...spin]
  while (out.length < SPIN360_FRAME_COUNT) out.push(hero)
  return out.slice(0, SPIN360_FRAME_COUNT)
}

function emptyProduct(): ProductFormValues {
  const hero = 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=85'
  return {
    id: `new-${Date.now()}`,
    slug: '',
    name: '',
    brand: '',
    category: 'Skincare',
    categorySlug: 'skincare',
    price: 0,
    originalPrice: undefined,
    rating: 5,
    reviews: 0,
    description: '',
    longDescription: '',
    benefits: [''],
    howToUse: '',
    ingredients: '',
    badge: '',
    img: hero,
    imgs: [hero, '', '', ''],
    spin360: buildSpin360FramesFromHero(hero),
    variants: [{ label: 'Default', value: 'default' }],
    inStock: true,
    featured: false,
  }
}

function normalizeProduct(p: Product | null): ProductFormValues {
  if (!p) return emptyProduct()
  const spin = padSpin360(p.spin360, p.img)
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: p.category,
    categorySlug: p.categorySlug,
    price: p.price,
    originalPrice: p.originalPrice,
    rating: p.rating,
    reviews: p.reviews,
    description: p.description,
    longDescription: p.longDescription,
    benefits: p.benefits.length ? p.benefits : [''],
    howToUse: p.howToUse,
    ingredients: p.ingredients,
    badge: p.badge ?? '',
    img: p.img,
    imgs: padImgs(p.imgs.length ? p.imgs : [p.img]),
    spin360: spin,
    variants: p.variants.length ? p.variants : [{ label: 'Default', value: 'default' }],
    inStock: p.inStock,
    featured: Boolean(p.featured),
  }
}

interface ProductFormModalProps {
  open: boolean
  onOpenChange: (o: boolean) => void
  initial: Product | null
  categories: { label: string; slug: string }[]
  /** Return false to keep the modal open (e.g. validation failed). */
  onSubmit: (p: Product) => void | boolean
}

export function ProductFormModal({ open, onOpenChange, initial, categories, onSubmit }: ProductFormModalProps) {
  const [spinTemplate, setSpinTemplate] = useState('')
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: normalizeProduct(initial),
    mode: 'onSubmit',
  })

  useEffect(() => {
    if (open) {
      form.reset(normalizeProduct(initial))
      setSpinTemplate('')
    }
  }, [open, initial, form])

  const fill360FromHero = () => {
    const hero = form.getValues('img')
    form.setValue('spin360', buildSpin360FramesFromHero(hero))
  }

  const fill360FromTemplate = () => {
    const t = spinTemplate.trim()
    if (!t) return
    try {
      form.setValue('spin360', buildSpin360FromTemplate(t, SPIN360_FRAME_COUNT))
    } catch {
      /* ignore invalid template */
    }
  }

  const submit = form.handleSubmit(vals => {
    const imgs = vals.imgs.filter(Boolean)
    const p: Product = {
      id: vals.id,
      slug: vals.slug,
      name: vals.name,
      brand: vals.brand,
      category: vals.category,
      categorySlug: vals.categorySlug,
      price: vals.price,
      originalPrice: vals.originalPrice && vals.originalPrice > 0 ? vals.originalPrice : undefined,
      rating: vals.rating,
      reviews: vals.reviews,
      description: vals.description,
      longDescription: vals.longDescription,
      benefits: vals.benefits.filter(Boolean),
      howToUse: vals.howToUse,
      ingredients: vals.ingredients,
      badge: vals.badge || undefined,
      img: vals.img,
      imgs: imgs.length ? imgs : [vals.img],
      spin360: vals.spin360.some(Boolean) ? vals.spin360 : buildSpin360FramesFromHero(vals.img),
      variants: vals.variants.filter(v => v.label.trim() && v.value.trim()),
      inStock: vals.inStock,
      featured: vals.featured ? true : undefined,
    }
    const ok = onSubmit(p)
    if (ok !== false) onOpenChange(false)
  })

  const errs = form.formState.errors

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.6)', zIndex: 100010 }} />
        <Dialog.Content style={{
          position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
          background: '#fafaf8', width: 'min(720px, 96vw)', maxHeight: '90vh', overflowY: 'auto', zIndex: 100011,
          padding: 32, border: '1px solid #ebebeb',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <Dialog.Title className="admin-section-title" style={{ marginBottom: 0 }}>{initial ? 'Edit product' : 'New product'}</Dialog.Title>
            <Dialog.Close asChild>
              <button type="button" style={{ border: 'none', background: 'none', cursor: 'pointer' }} aria-label="Close"><X size={20} /></button>
            </Dialog.Close>
          </div>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <RichTextInput label="Name *" value={form.watch('name')} onChange={v => form.setValue('name', v)} />
            {errs.name ? <p style={{ color: '#b91c1c', fontSize: 12 }}>{errs.name.message}</p> : null}
            <RichTextInput label="Slug *" value={form.watch('slug')} onChange={v => form.setValue('slug', v)} />
            {errs.slug ? <p style={{ color: '#b91c1c', fontSize: 12 }}>{errs.slug.message}</p> : null}
            <RichTextInput label="Brand *" value={form.watch('brand')} onChange={v => form.setValue('brand', v)} />
            {errs.brand ? <p style={{ color: '#b91c1c', fontSize: 12 }}>{errs.brand.message}</p> : null}
            <SelectInput
              label="Category"
              value={form.watch('categorySlug')}
              onChange={slug => {
                const c = categories.find(x => x.slug === slug)
                form.setValue('categorySlug', slug)
                if (c) form.setValue('category', c.label)
              }}
              options={categories.map(c => ({ value: c.slug, label: c.label }))}
            />
            <NumberInput label="Price" value={form.watch('price')} onChange={v => form.setValue('price', v)} min={0} />
            <NumberInput
              label="Original price (optional, 0 = none)"
              value={form.watch('originalPrice') ?? 0}
              onChange={v => form.setValue('originalPrice', v <= 0 ? undefined : v)}
              min={0}
            />
            <NumberInput label="Rating" value={form.watch('rating')} onChange={v => form.setValue('rating', v)} min={0} step={0.1} />
            <NumberInput label="Reviews" value={form.watch('reviews')} onChange={v => form.setValue('reviews', v)} min={0} />
            <SelectInput label="Badge" value={form.watch('badge') ?? ''} onChange={v => form.setValue('badge', v)} options={badgeOptions} />
            <RichTextInput label="Short description * (max 160)" value={form.watch('description')} onChange={v => form.setValue('description', v)} multiline rows={3} maxLength={160} />
            {errs.description ? <p style={{ color: '#b91c1c', fontSize: 12 }}>{errs.description.message}</p> : null}
            <RichTextInput label="Long description *" value={form.watch('longDescription')} onChange={v => form.setValue('longDescription', v)} multiline rows={5} />
            {errs.longDescription ? <p style={{ color: '#b91c1c', fontSize: 12 }}>{errs.longDescription.message}</p> : null}
            <ArrayEditor label="Benefits" items={form.watch('benefits')} onChange={v => form.setValue('benefits', v)} />
            {errs.benefits ? <p style={{ color: '#b91c1c', fontSize: 12 }}>{String(errs.benefits.message ?? '')}</p> : null}
            <RichTextInput label="How to use *" value={form.watch('howToUse')} onChange={v => form.setValue('howToUse', v)} multiline rows={3} />
            <RichTextInput label="Ingredients *" value={form.watch('ingredients')} onChange={v => form.setValue('ingredients', v)} multiline rows={2} />
            <ToggleInput label="In stock" checked={form.watch('inStock')} onChange={v => form.setValue('inStock', v)} />
            <ToggleInput label="Featured" checked={Boolean(form.watch('featured'))} onChange={v => form.setValue('featured', v)} />
            <p className="admin-label" style={{ marginTop: 8 }}>Variants (label + value) *</p>
            {form.watch('variants').map((v, i) => (
              <div key={i} style={{ display: 'flex', gap: 8 }}>
                <input className="admin-input" value={v.label} onChange={e => {
                  const next = [...form.getValues('variants')]
                  next[i] = { ...next[i], label: e.target.value }
                  form.setValue('variants', next)
                }} placeholder="Label" />
                <input className="admin-input" value={v.value} onChange={e => {
                  const next = [...form.getValues('variants')]
                  next[i] = { ...next[i], value: e.target.value }
                  form.setValue('variants', next)
                }} placeholder="Value" />
              </div>
            ))}
            {errs.variants ? <p style={{ color: '#b91c1c', fontSize: 12 }}>{String(errs.variants.message ?? '')}</p> : null}
            <button type="button" className="btn-outline" style={{ cursor: 'pointer' }} onClick={() => form.setValue('variants', [...form.getValues('variants'), { label: '', value: '' }])}>Add variant</button>
            <ImageInput label="Main image *" value={form.watch('img')} onChange={v => form.setValue('img', v)} />
            {errs.img ? <p style={{ color: '#b91c1c', fontSize: 12 }}>{errs.img.message}</p> : null}
            {[0, 1, 2, 3].map(i => (
              <ImageInput key={i} label={`Gallery ${i + 1}`} value={form.watch('imgs')[i] ?? ''} onChange={v => {
                const imgs = [...form.getValues('imgs')] as [string, string, string, string]
                imgs[i] = v
                form.setValue('imgs', imgs)
              }} />
            ))}
            <div style={{ border: '1px solid #ebebeb', padding: 12, marginTop: 8 }}>
              <p className="admin-label" style={{ marginBottom: 8 }}>{`360° frames (${SPIN360_FRAME_COUNT})`}</p>
              <button type="button" className="btn-outline" style={{ marginRight: 8, cursor: 'pointer' }} onClick={fill360FromHero}>Fill all from main image</button>
              <label className="admin-label" style={{ display: 'block', marginTop: 12 }}>CDN template (use {'{n}'} for 001–036)</label>
              <input className="admin-input" style={{ marginTop: 6 }} value={spinTemplate} onChange={e => setSpinTemplate(e.target.value)} placeholder="https://cdn/…/frame_{n}.webp" />
              <button type="button" className="btn-outline" style={{ marginTop: 8, cursor: 'pointer' }} onClick={fill360FromTemplate}>Apply template</button>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginTop: 10 }}>
                {form.watch('spin360').map((u, idx) => (
                  <input key={idx} className="admin-input" style={{ fontSize: 11 }} value={u} onChange={e => {
                    const next = [...form.getValues('spin360')]
                    next[idx] = e.target.value
                    form.setValue('spin360', next)
                  }} />
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
              <button type="submit" className="btn-primary" style={{ cursor: 'pointer' }}>Save product</button>
              <Dialog.Close asChild>
                <button type="button" className="btn-outline" style={{ cursor: 'pointer' }}>Cancel</button>
              </Dialog.Close>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
