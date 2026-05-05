'use client'
import { useRef, useState } from 'react'
import { use } from 'react'
import { motion, useInView } from 'framer-motion'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/sections/ProductCard'
import { orderProductsInCategory } from '@/lib/products'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }}>
      {children}
    </motion.div>
  )
}

export default function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params)
  const categoriesList = useCMSStore(s => s.siteSettings.catalogCategories) ?? DEFAULT_CMS_CONTENT.siteSettings.catalogCategories
  const cat = categoriesList.find(c => c.slug === category)
  if (!cat) notFound()

  const catalog = useCMSStore(s => s.products) ?? DEFAULT_CMS_CONTENT.products
  const orderMap = useCMSStore(s => s.productOrderByCategory) ?? DEFAULT_CMS_CONTENT.productOrderByCategory
  const productsCms = useCMSStore(s => s.pages.products) ?? DEFAULT_CMS_CONTENT.pages.products

  const products = orderProductsInCategory(catalog, category, orderMap)
  const [sort, setSort] = useState('featured')

  const sorted = [...products].sort((a, b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    if (sort === 'rating') return b.rating - a.rating
    return 0
  })

  return (
    <>
      <section style={{ height: '52vh', position: 'relative', overflow: 'hidden' }}>
        <motion.img initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.4 }}
          src={cat.img} alt={cat.label}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '48px 80px' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 12 }}>{productsCms.categoryPageEyebrow}</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(48px, 5.5vw, 72px)', fontWeight: 400, color: '#fafaf8', lineHeight: 1.05 }}>{cat.label}</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, color: 'rgba(255,255,255,0.65)', maxWidth: 480, lineHeight: 1.7, marginTop: 12 }}>{cat.desc}</motion.p>
        </div>
      </section>

      <div style={{ padding: '24px 80px', borderBottom: '1px solid #ebebeb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9b9b9b' }}>{products.length} Products</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9b9b9b' }}>Sort:</span>
          {[{ v: 'featured', l: 'Featured' }, { v: 'price-asc', l: 'Price ↑' }, { v: 'price-desc', l: 'Price ↓' }, { v: 'rating', l: 'Top Rated' }].map(s => (
            <button key={s.v} type="button" onClick={() => setSort(s.v)}
              style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '7px 14px', border: '1px solid', borderColor: sort === s.v ? '#0a0a0a' : '#ebebeb', background: sort === s.v ? '#0a0a0a' : 'transparent', color: sort === s.v ? '#fafaf8' : '#9b9b9b', cursor: 'pointer', transition: 'all 0.25s' }}>
              {s.l}
            </button>
          ))}
        </div>
      </div>

      <section style={{ padding: '56px 80px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {sorted.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.07}><ProductCard product={p} /></FadeIn>
          ))}
        </div>
      </section>
    </>
  )
}
