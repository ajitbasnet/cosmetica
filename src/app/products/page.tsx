'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import TransitionLink from '@/components/ui/TransitionLink'
import ProductCard from '@/components/sections/ProductCard'
import { filterFeaturedProducts } from '@/lib/products'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'
import type { Product } from '@/lib/cms-types'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}>
      {children}
    </motion.div>
  )
}

export default function ProductsPage() {
  const catalog = useCMSStore(s => s.products) ?? DEFAULT_CMS_CONTENT.products
  const categoriesList = useCMSStore(s => s.siteSettings.catalogCategories) ?? DEFAULT_CMS_CONTENT.siteSettings.catalogCategories
  const productsCms = useCMSStore(s => s.pages.products) ?? DEFAULT_CMS_CONTENT.pages.products
  const featuredIds = useCMSStore(s => s.pages.home.featuredProducts) ?? DEFAULT_CMS_CONTENT.pages.home.featuredProducts

  const byIdFeatured: Product[] = featuredIds
    .map(id => catalog.find(p => p.id === id))
    .filter((p): p is Product => Boolean(p))
  const featured: Product[] = byIdFeatured.length > 0 ? byIdFeatured : filterFeaturedProducts(catalog)

  return (
    <>
      <section style={{ minHeight: '60vh', display: 'flex', alignItems: 'flex-end', position: 'relative', overflow: 'hidden' }}>
        <img src={productsCms.heroImage}
          alt="Products" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.2) 60%, transparent 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, padding: '0 80px 72px', width: '100%' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 16 }}>
            {productsCms.heroEyebrow}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(52px, 6vw, 80px)', fontWeight: 400, color: '#fafaf8', lineHeight: 1.05, maxWidth: 700 }}>
            {productsCms.heroTitle}
          </motion.h1>
        </div>
      </section>

      <section style={{ padding: '80px 80px 60px' }}>
        <FadeIn>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#9b9b9b', marginBottom: 20 }}>{productsCms.categoriesEyebrow}</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 400, marginBottom: 48 }}>{productsCms.categoriesTitle}</h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 2 }}>
          {categoriesList.map((cat, i) => (
            <FadeIn key={cat.slug} delay={i * 0.07}>
              <TransitionLink href={`/products/${cat.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <motion.div whileHover="hover" style={{ position: 'relative', overflow: 'hidden', aspectRatio: '0.75', cursor: 'pointer' }}>
                  <motion.img variants={{ hover: { scale: 1.08 } }} transition={{ duration: 0.6 }}
                    src={cat.img} alt={cat.label}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <motion.div variants={{ hover: { opacity: 1 } }} initial={{ opacity: 0 }}
                    style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.45)', transition: 'opacity 0.3s' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 16px', background: 'linear-gradient(transparent, rgba(10,10,10,0.8))' }}>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 400, color: '#fafaf8', marginBottom: 2 }}>{cat.label}</p>
                    <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Shop Now →</p>
                  </div>
                </motion.div>
              </TransitionLink>
            </FadeIn>
          ))}
        </div>
      </section>

      <section style={{ padding: '60px 80px 100px', background: '#f5f2ec' }}>
        <FadeIn>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <div>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#9b9b9b', marginBottom: 16 }}>{productsCms.featuredEyebrow}</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 400 }}>{productsCms.featuredTitle}</h2>
            </div>
            <TransitionLink href={productsCms.featuredViewAllHref} className="btn-outline" style={{ textDecoration: 'none' }}>{productsCms.featuredViewAllLabel}</TransitionLink>
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {featured.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.08}>
              <ProductCard product={p} />
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  )
}
