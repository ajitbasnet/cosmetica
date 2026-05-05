'use client'
import { useRef } from 'react'
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

export default function AboutPage() {
  const about = useCMSStore(s => s.pages.about) ?? DEFAULT_CMS_CONTENT.pages.about

  return (
    <>
      <section style={{ padding: '80px 80px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, minHeight: '70vh', alignItems: 'center' }}>
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#9b9b9b', marginBottom: 32 }}>
            {about.hero.eyebrow}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(48px, 5vw, 72px)', fontWeight: 400, lineHeight: 1.05, marginBottom: 32 }}>
            {about.hero.heading}
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ fontFamily: 'DM Sans', fontSize: 16, lineHeight: 1.8, color: '#555', maxWidth: 480 }}
            dangerouslySetInnerHTML={{ __html: about.hero.bodyHtml }}
          />
        </div>
        <motion.div initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
          className="img-hover" style={{ height: 600 }}>
          <img src={about.hero.image} alt="About" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>
      </section>

      <section style={{ padding: '100px 80px', background: '#f5f2ec' }}>
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
            <div className="img-hover" style={{ height: 520 }}>
              <img src={about.quote.image} alt="Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <p className="label" style={{ marginBottom: 32 }}>{about.quote.label}</p>
              <blockquote style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 300, lineHeight: 1.6, color: '#0a0a0a', fontStyle: 'italic', marginBottom: 32 }}>
                &ldquo;{about.quote.quote}&rdquo;
              </blockquote>
              <p style={{ fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9b9b9b' }}>
                — {about.quote.attributionName}<br />
                <span style={{ marginTop: 4, display: 'block' }}>{about.quote.attributionTitle}</span>
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <section style={{ padding: '100px 80px' }}>
        <FadeIn>
          <p className="label" style={{ marginBottom: 16 }}>Our Philosophy</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(40px, 4vw, 56px)', fontWeight: 400, marginBottom: 72 }}>
            Principles That Define Us
          </h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2, background: '#ebebeb' }}>
          {about.principles.map((p, i) => (
            <motion.div key={p.id}
              whileHover={{ backgroundColor: '#f5f2ec' }}
              style={{ background: '#fafaf8', padding: '48px 28px', transition: 'background 0.3s' }}>
              <FadeIn delay={i * 0.08}>
                <p style={{ fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9b9b9b', marginBottom: 24 }}>{p.num}</p>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, marginBottom: 16 }}>{p.title}</h3>
                <p style={{ fontFamily: 'DM Sans', fontSize: 13, lineHeight: 1.7, color: '#666' }}>{p.desc}</p>
              </FadeIn>
            </motion.div>
          ))}
        </div>
      </section>

      <section style={{ padding: '100px 80px', background: '#0a0a0a' }}>
        <FadeIn>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
            <div>
              <p className="label" style={{ color: '#666', marginBottom: 20 }}>{about.newsSectionEyebrow}</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 400, color: '#fafaf8' }}>
                {about.newsSectionTitle}
              </h2>
            </div>
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          {about.news.map((n, i) => (
            <FadeIn key={n.id} delay={i * 0.1}>
              <motion.a href={n.href}
                whileHover={{ backgroundColor: '#1a1a1a' }}
                style={{ display: 'block', background: '#111', padding: '40px 48px', textDecoration: 'none', transition: 'background 0.3s', borderBottom: '1px solid #222' }}>
                <p style={{ fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#666', marginBottom: 16 }}>({n.type})</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: '#fafaf8', lineHeight: 1.4 }}>{n.title}</p>
              </motion.a>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  )
}
