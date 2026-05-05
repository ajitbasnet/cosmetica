'use client'
import { useState, useRef } from 'react'
import { use } from 'react'
import { motion, useInView } from 'framer-motion'
import { notFound } from 'next/navigation'
import { Star, ShoppingBag, Heart, Truck, RotateCcw, Shield, ChevronDown } from 'lucide-react'
import { findProductBySlug, orderProductsInCategory } from '@/lib/products'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'
import Product360Viewer from '@/components/sections/Product360Viewer'
import ProductCard from '@/components/sections/ProductCard'
import TransitionLink from '@/components/ui/TransitionLink'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  )
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid #ebebeb' }}>
      <button type="button" onClick={() => setOpen(o => !o)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', background: 'none', border: 'none', cursor: 'pointer' }}>
        <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#0a0a0a' }}>{title}</span>
        <ChevronDown size={14} style={{ transition: 'transform 0.3s', transform: open ? 'rotate(180deg)' : 'none', color: '#9b9b9b' }} />
      </button>
      <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} style={{ overflow: 'hidden' }}>
        <div style={{ paddingBottom: 20, fontFamily: 'DM Sans, sans-serif', fontSize: 14, lineHeight: 1.8, color: '#555' }}>{children}</div>
      </motion.div>
    </div>
  )
}

export default function ProductDetailPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = use(params)
  const catalog = useCMSStore(s => s.products) ?? DEFAULT_CMS_CONTENT.products
  const orderMap = useCMSStore(s => s.productOrderByCategory) ?? DEFAULT_CMS_CONTENT.productOrderByCategory
  const product = findProductBySlug(catalog, slug)
  if (!product) notFound()

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]?.value ?? '')
  const [qty, setQty] = useState(1)
  const [wished, setWished] = useState(false)
  const [added, setAdded] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const [viewMode, setViewMode] = useState<'gallery' | '360'>('gallery')

  const related = orderProductsInCategory(catalog, category, orderMap).filter(p => p.slug !== slug).slice(0, 4)

  const handleAdd = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ padding: '20px 80px', borderBottom: '1px solid #ebebeb', display: 'flex', gap: 8, alignItems: 'center' }}>
        {[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: product.category, href: `/products/${category}` },
          { label: product.name, href: '#' },
        ].map((b, i, arr) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <TransitionLink href={b.href} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: i === arr.length - 1 ? '#0a0a0a' : '#9b9b9b', textDecoration: 'none', transition: 'color 0.2s' }}>
              {b.label}
            </TransitionLink>
            {i < arr.length - 1 && <span style={{ color: '#ccc', fontSize: 10 }}>/</span>}
          </span>
        ))}
      </div>

      {/* Main product section */}
      <section style={{ padding: '56px 80px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
        {/* LEFT — Image / 360 viewer */}
        <div>
          {/* Toggle: Gallery vs 360 */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 16, border: '1px solid #ebebeb', width: 'fit-content' }}>
            {(['gallery', '360'] as const).map(mode => (
              <button key={mode} type="button" onClick={() => setViewMode(mode)}
                style={{ padding: '9px 20px', background: viewMode === mode ? '#0a0a0a' : 'transparent', color: viewMode === mode ? '#fafaf8' : '#9b9b9b', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', transition: 'all 0.25s' }}>
                {mode === '360' ? '360° View' : 'Gallery'}
              </button>
            ))}
          </div>

          {viewMode === '360' ? (
            <Product360Viewer frames={product.spin360} productName={product.name} />
          ) : (
            <div>
              {/* Main image */}
              <div className="img-hover" style={{ aspectRatio: '1', overflow: 'hidden', background: '#f5f2ec', marginBottom: 8 }}>
                <img src={product.imgs[activeImg] ?? product.img} alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              {/* Thumbnails */}
              {product.imgs.length > 1 && (
                <div style={{ display: 'flex', gap: 8 }}>
                  {product.imgs.map((img: string, i: number) => (
                    <button key={i} type="button" onClick={() => setActiveImg(i)}
                      style={{ width: 72, height: 72, overflow: 'hidden', border: `2px solid ${activeImg === i ? '#0a0a0a' : 'transparent'}`, padding: 0, cursor: 'pointer', background: 'none', flexShrink: 0 }}>
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* RIGHT — Product info */}
        <div style={{ paddingTop: 8 }}>
          {product.badge && (
            <div style={{ display: 'inline-block', background: '#0a0a0a', color: '#fafaf8', fontFamily: 'Montserrat, sans-serif', fontSize: 8, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '4px 12px', marginBottom: 20 }}>
              {product.badge}
            </div>
          )}
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9b9b9b', marginBottom: 10 }}>{product.brand}</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 400, lineHeight: 1.1, marginBottom: 16 }}>{product.name}</h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid #ebebeb' }}>
            <div style={{ display: 'flex', gap: 3 }}>
              {[1,2,3,4,5].map(s => (
                <Star key={s} size={13} fill={s <= Math.round(product.rating) ? '#0a0a0a' : 'none'} color="#0a0a0a" />
              ))}
            </div>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, color: '#9b9b9b' }}>{product.rating} ({product.reviews} reviews)</span>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 24 }}>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, fontWeight: 500 }}>${product.price}</span>
            {product.originalPrice && (
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, color: '#9b9b9b', textDecoration: 'line-through' }}>${product.originalPrice}</span>
            )}
            {product.originalPrice && (
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', color: '#22c55e', background: '#f0fdf4', padding: '3px 8px' }}>
                Save ${product.originalPrice - product.price}
              </span>
            )}
          </div>

          {/* Description */}
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 28 }}>
            {product.description}
          </p>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#0a0a0a', marginBottom: 12 }}>
                {product.variants[0].label.includes('ml') || product.variants[0].label.includes('ml') ? 'Size' : 'Shade / Option'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {product.variants.map(v => (
                  <button key={v.value} type="button" onClick={() => setSelectedVariant(v.value)}
                    style={{ padding: '9px 18px', border: '1px solid', borderColor: selectedVariant === v.value ? '#0a0a0a' : '#ebebeb', background: selectedVariant === v.value ? '#0a0a0a' : 'transparent', color: selectedVariant === v.value ? '#fafaf8' : '#0a0a0a', fontFamily: 'Montserrat, sans-serif', fontSize: 10, letterSpacing: '0.12em', cursor: 'pointer', transition: 'all 0.25s' }}>
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty + Add to cart */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ebebeb' }}>
              <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 40, height: 48, background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>−</button>
              <span style={{ width: 40, textAlign: 'center', fontFamily: 'Montserrat, sans-serif', fontSize: 13 }}>{qty}</span>
              <button type="button" onClick={() => setQty(q => q + 1)} style={{ width: 40, height: 48, background: 'none', border: 'none', cursor: 'pointer', fontSize: 16, color: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            </div>
            <button type="button" onClick={handleAdd} style={{ flex: 1, padding: '0 24px', height: 48, background: added ? '#22c55e' : '#0a0a0a', color: '#fafaf8', border: 'none', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, transition: 'background 0.3s' }}>
              <ShoppingBag size={14} />
              {added ? 'Added to Bag!' : 'Add to Bag'}
            </button>
            <button type="button" onClick={() => setWished(w => !w)} style={{ width: 48, height: 48, border: '1px solid #ebebeb', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}>
              <Heart size={16} fill={wished ? '#0a0a0a' : 'none'} color="#0a0a0a" />
            </button>
          </div>

          {/* Trust signals */}
          <div style={{ display: 'flex', gap: 20, padding: '20px 0', borderTop: '1px solid #ebebeb', borderBottom: '1px solid #ebebeb', marginBottom: 28 }}>
            {[
              { icon: Truck, text: 'Free delivery over $80' },
              { icon: RotateCcw, text: '30-day returns' },
              { icon: Shield, text: '100% authentic' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <t.icon size={13} color="#9b9b9b" />
                <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#9b9b9b' }}>{t.text}</span>
              </div>
            ))}
          </div>

          {/* Accordions */}
          <Accordion title="Key Benefits">
            <ul style={{ paddingLeft: 20, margin: 0 }}>
              {product.benefits.map((b, i) => <li key={i} style={{ marginBottom: 6 }}>{b}</li>)}
            </ul>
          </Accordion>
          <Accordion title="How To Use">{product.howToUse}</Accordion>
          <Accordion title="Key Ingredients">{product.ingredients}</Accordion>
          <Accordion title="Full Description">{product.longDescription}</Accordion>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section style={{ padding: '60px 80px 100px', background: '#f5f2ec' }}>
          <FadeIn>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 400, marginBottom: 40 }}>
              You May Also Like
            </h2>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {related.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.08}><ProductCard product={p} /></FadeIn>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
