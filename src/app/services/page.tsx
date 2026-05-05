'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay }}>
      {children}
    </motion.div>
  )
}

const services = [
  {
    num: '01', title: 'Organic Social', href: '/services/organic-social',
    desc: 'Building community through authentic content and strategic storytelling that resonates with prestige beauty consumers.',
    detail: 'Strategy, content calendars, community management, analytics reporting, trend monitoring.',
    img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
  },
  {
    num: '02', title: 'Influencer Marketing', href: '/services/influencer-marketing',
    desc: 'Connecting your brand with the creators, experts and tastemakers who shape modern beauty culture.',
    detail: 'Talent identification, campaign strategy, contract negotiation, performance tracking.',
    img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80',
  },
  {
    num: '03', title: 'Paid Social', href: '/services/paid-social',
    desc: 'Data-driven campaigns engineered to scale revenue without sacrificing brand integrity.',
    detail: 'Meta, TikTok, Pinterest advertising, creative strategy, audience development, ROAS optimization.',
    img: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80',
  },
  {
    num: '04', title: 'Creator-Led Affiliate', href: '/services/creator-affiliate',
    desc: 'A modern approach to performance marketing — where authentic creator voices drive measurable sales.',
    detail: 'Program setup, creator recruitment, commission strategy, platform management.',
    img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80',
  },
  {
    num: '05', title: 'Content Creation', href: '/services/content-creation',
    desc: 'Visual storytelling that captures the essence of prestige beauty — beautifully shot and culturally fluent.',
    detail: 'Photography, video production, UGC, editorial-quality social assets.',
    img: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80',
  },
]

export default function ServicesPage() {
  return (
    <>
      <section style={{ padding: '80px 80px 60px' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="label" style={{ marginBottom: 20 }}>Services</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(52px, 6vw, 80px)', fontWeight: 400, lineHeight: 1.05, maxWidth: 800, marginBottom: 24 }}>
          Social, influence, commerce — built to work together.
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ fontFamily: 'DM Sans', fontSize: 16, color: '#666', maxWidth: 560, lineHeight: 1.7 }}>
          We offer a full suite of social-first services designed specifically for prestige beauty brands.
        </motion.p>
      </section>

      <section style={{ padding: '0 80px 100px' }}>
        {services.map((s, i) => (
          <FadeIn key={i} delay={0.05}>
            <motion.div whileHover={{ backgroundColor: '#f5f2ec' }}
              style={{ display: 'grid', gridTemplateColumns: '80px 1fr 1fr 200px', gap: 48, alignItems: 'center', padding: '48px 0', borderTop: '1px solid #ebebeb', transition: 'background 0.3s', cursor: 'default' }}>
              <p className="label">{s.num}</p>
              <div>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 400, marginBottom: 12 }}>{s.title}</h2>
                <p style={{ fontFamily: 'DM Sans', fontSize: 14, lineHeight: 1.7, color: '#666' }}>{s.desc}</p>
              </div>
              <p style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#9b9b9b', lineHeight: 1.6 }}>{s.detail}</p>
              <Link href={s.href} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                Learn More <ArrowRight size={12} />
              </Link>
            </motion.div>
          </FadeIn>
        ))}
        <div style={{ borderTop: '1px solid #ebebeb' }} />
      </section>
    </>
  )
}
