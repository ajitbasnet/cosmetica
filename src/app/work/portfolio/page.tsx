'use client'
import { useRef } from 'react'
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

const portfolio = [
  { img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80', brand: 'Lumière Paris', type: 'Campaign' },
  { img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80', brand: 'Maison Éclat', type: 'Content' },
  { img: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80', brand: 'Velours Beauty', type: 'Campaign' },
  { img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80', brand: 'Aurore Skincare', type: 'Editorial' },
  { img: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=80', brand: 'Soleil Cosmetics', type: 'Content' },
  { img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80', brand: 'Noir Atelier', type: 'Campaign' },
  { img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80', brand: 'Botanik Lab', type: 'Editorial' },
  { img: 'https://images.unsplash.com/photo-1607006483224-46ab71bbeabc?w=600&q=80', brand: 'Pureté Paris', type: 'Content' },
]

export default function PortfolioPage() {
  return (
    <>
      <section style={{ padding: '80px 80px 60px' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="label" style={{ marginBottom: 20 }}>Creative Portfolio</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(52px, 6vw, 80px)', fontWeight: 400, lineHeight: 1.05, maxWidth: 600, marginBottom: 20 }}>
          Visual Stories
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ fontFamily: 'DM Sans', fontSize: 16, color: '#666', maxWidth: 520, lineHeight: 1.7 }}>
          A selection of editorial and campaign content created for prestige beauty brands.
        </motion.p>
      </section>

      <section style={{ padding: '0 80px 100px' }}>
        <div style={{ columns: 3, gap: 4 }}>
          {portfolio.map((p, i) => (
            <FadeIn key={i} delay={i * 0.04}>
              <div style={{ breakInside: 'avoid', marginBottom: 4, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
                onMouseEnter={e => {
                  const ov = e.currentTarget.querySelector('.ov') as HTMLElement
                  const img = e.currentTarget.querySelector('img') as HTMLElement
                  if (ov) ov.style.opacity = '1'
                  if (img) img.style.transform = 'scale(1.05)'
                }}
                onMouseLeave={e => {
                  const ov = e.currentTarget.querySelector('.ov') as HTMLElement
                  const img = e.currentTarget.querySelector('img') as HTMLElement
                  if (ov) ov.style.opacity = '0'
                  if (img) img.style.transform = 'scale(1)'
                }}>
                <img src={p.img} alt={p.brand} style={{ width: '100%', display: 'block', transition: 'transform 0.6s ease' }} />
                <div className="ov" style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.55)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 20, opacity: 0, transition: 'opacity 0.4s' }}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, color: '#fafaf8' }}>{p.brand}</p>
                  <p className="label" style={{ color: '#9b9b9b', marginTop: 4 }}>{p.type}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  )
}
