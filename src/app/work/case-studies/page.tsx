'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay }}>
      {children}
    </motion.div>
  )
}

const allStudies = [
  { brand: 'Lumière Paris', title: 'Hero Product Launch — 3.2M Organic Impressions', category: 'Influencer Marketing', img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80' },
  { brand: 'Maison Éclat', title: 'A Social Refresh for a Heritage Brand', category: 'Organic Social', img: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80' },
  { brand: 'Velours Beauty', title: 'A Breakout Fragrance Launch — Most Successful to Date', category: 'Paid Social', img: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80' },
  { brand: 'Aurore Skincare', title: 'Creator-Led Affiliate Program Drives 280% ROI', category: 'Creator-Led Affiliate', img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80' },
  { brand: 'Soleil Cosmetics', title: 'TikTok-First Strategy Grows Following by 400K', category: 'Organic Social', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80' },
  { brand: 'Noir Atelier', title: 'Luxury Haircare Brand Enters Top 10 on TikTok Shop', category: 'Content Creation', img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80' },
]

const categories = ['All', 'Influencer Marketing', 'Organic Social', 'Paid Social', 'Creator-Led Affiliate', 'Content Creation']

export default function CaseStudiesPage() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? allStudies : allStudies.filter(s => s.category === active)

  return (
    <>
      <section style={{ padding: '80px 80px 60px' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="label" style={{ marginBottom: 20 }}>Case Studies</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(52px, 6vw, 80px)', fontWeight: 400, lineHeight: 1.05, maxWidth: 700, marginBottom: 56 }}>
          Work We&apos;re Proud Of
        </motion.h1>

        {/* Filter */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              style={{
                fontFamily: 'Montserrat', fontSize: 9, fontWeight: 500, letterSpacing: '0.16em',
                textTransform: 'uppercase', padding: '10px 20px', border: '1px solid',
                borderColor: active === cat ? '#0a0a0a' : '#ebebeb',
                background: active === cat ? '#0a0a0a' : 'transparent',
                color: active === cat ? '#fafaf8' : '#9b9b9b',
                cursor: 'pointer', transition: 'all 0.3s',
              }}>
              {cat}
            </button>
          ))}
        </motion.div>
      </section>

      <section style={{ padding: '0 80px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          {filtered.map((cs, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <Link href="/work/case-studies/detail" style={{ textDecoration: 'none', display: 'block', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => {
                  const ov = e.currentTarget.querySelector('.ov') as HTMLElement
                  if (ov) ov.style.opacity = '1'
                }}
                onMouseLeave={e => {
                  const ov = e.currentTarget.querySelector('.ov') as HTMLElement
                  if (ov) ov.style.opacity = '0'
                }}>
                <div style={{ height: 440, overflow: 'hidden' }}>
                  <motion.img whileHover={{ scale: 1.06 }} transition={{ duration: 0.7 }}
                    src={cs.img} alt={cs.brand} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="ov" style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.65)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 32, opacity: 0, transition: 'opacity 0.4s ease' }}>
                  <p className="label" style={{ color: '#9b9b9b', marginBottom: 8 }}>{cs.category}</p>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, color: '#fafaf8', marginBottom: 6 }}>{cs.brand}</p>
                  <p style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#ccc' }}>{cs.title}</p>
                  <p style={{ fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#fafaf8', marginTop: 20, textDecoration: 'underline' }}>View More →</p>
                </div>
                <div style={{ padding: '20px 20px 24px', background: '#fafaf8', borderBottom: '2px solid #ebebeb' }}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, marginBottom: 4 }}>{cs.brand}</p>
                  <p className="label">{cs.category}</p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  )
}
