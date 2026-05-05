'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}>
      {children}
    </motion.div>
  )
}

export default function ExpertisePage() {
  const ex = useCMSStore(s => s.pages.expertise) ?? DEFAULT_CMS_CONTENT.pages.expertise

  return (
    <>
      <section style={{ padding: '80px 80px 100px', background: '#f5f2ec', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
          <div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className="label" style={{ marginBottom: 28 }}>{ex.heroEyebrow}</motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(50px, 5.5vw, 76px)', fontWeight: 400, lineHeight: 1.05, marginBottom: 32, whiteSpace: 'pre-line' }}>
              {ex.heroHeading}
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              style={{ fontFamily: 'DM Sans', fontSize: 16, lineHeight: 1.8, color: '#555', maxWidth: 460, marginBottom: 40 }}>
              {ex.heroBody}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
              <Link href={ex.heroCtaHref} className="btn-primary">{ex.heroCtaLabel}</Link>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1 }}
            className="img-hover" style={{ height: 580 }}>
            <img src={ex.heroImage} alt="Expertise" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        </div>
      </section>

      <section style={{ background: '#0a0a0a', padding: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, background: '#1a1a1a' }}>
          {ex.stats.map((s, i) => (
            <FadeIn key={s.id} delay={i * 0.1}>
              <motion.div whileHover={{ backgroundColor: '#111' }}
                style={{ background: '#0a0a0a', padding: '56px 40px', textAlign: 'center', transition: 'background 0.3s' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 64, fontWeight: 300, color: '#fafaf8', lineHeight: 1, marginBottom: 12 }}>{s.num}</p>
                <p className="label" style={{ color: '#666' }}>{s.label}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section style={{ padding: '100px 80px' }}>
        <FadeIn>
          <p className="label" style={{ marginBottom: 20 }}>{ex.categoriesEyebrow}</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(40px, 4.5vw, 60px)', fontWeight: 400, marginBottom: 72 }}>
            {ex.categoriesHeading}
          </h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          {ex.beautyCategories.map((cat, i) => (
            <FadeIn key={cat.id} delay={i * 0.08}>
              <motion.div whileHover="hover" style={{ position: 'relative', overflow: 'hidden', cursor: 'default' }}>
                <div style={{ height: 360, overflow: 'hidden' }}>
                  <motion.img
                    variants={{ hover: { scale: 1.06 } }}
                    transition={{ duration: 0.6 }}
                    src={cat.img} alt={cat.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '28px 28px 32px', background: '#fafaf8', borderBottom: '2px solid transparent', transition: 'border-color 0.3s' }}>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 400, marginBottom: 10 }}>{cat.title}</h3>
                  <p style={{ fontFamily: 'DM Sans', fontSize: 13, lineHeight: 1.7, color: '#666' }}>{cat.desc}</p>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section style={{ background: '#f5f2ec', padding: '100px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <FadeIn>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(40px, 4vw, 56px)', fontWeight: 400, lineHeight: 1.1 }}>
            {ex.ctaHeading}
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ fontFamily: 'DM Sans', fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 32 }}>
            {ex.ctaBody}
          </p>
          <Link href={ex.ctaButtonHref} className="btn-primary">{ex.ctaButtonLabel}</Link>
        </FadeIn>
      </section>
    </>
  )
}
