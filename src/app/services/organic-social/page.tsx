'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay }}>
      {children}
    </motion.div>
  )
}

const deliverables = [
  'Social media strategy & content calendar',
  'Platform-specific content creation',
  'Community management & engagement',
  'Monthly analytics & performance reporting',
  'Ongoing trend monitoring & adaptation',
  'Competitor analysis & benchmarking',
]

export default function OrganicSocialPage() {
  return (
    <>
      <section style={{ padding: '80px 80px 100px', background: '#f5f2ec', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', minHeight: '70vh' }}>
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="label" style={{ marginBottom: 20 }}>Services / Organic Social</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(48px, 5.5vw, 72px)', fontWeight: 400, lineHeight: 1.05, marginBottom: 28 }}>
            Organic Social
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ fontFamily: 'DM Sans', fontSize: 16, lineHeight: 1.8, color: '#555', marginBottom: 40, maxWidth: 480 }}>
            Building community through authentic content and strategic storytelling that resonates with prestige beauty consumers across all major platforms.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} style={{ display: 'flex', gap: 16 }}>
            <Link href="/contact" className="btn-primary">Get In Touch</Link>
            <Link href="/services" className="btn-outline">All Services</Link>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1 }}
          className="img-hover" style={{ height: 580 }}>
          <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&q=80" alt="Organic Social" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>
      </section>

      <section style={{ padding: '100px 80px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80 }}>
        <FadeIn>
          <p className="label" style={{ marginBottom: 20 }}>Our Approach</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 400, lineHeight: 1.1, marginBottom: 24 }}>
            Authentic community, sustained growth.
          </h2>
          <p style={{ fontFamily: 'DM Sans', fontSize: 15, lineHeight: 1.8, color: '#555', marginBottom: 24 }}>
            We approach organic social as the cornerstone of your brand&apos;s digital presence. Every caption, every story, every post is intentional — crafted to build community, drive discovery, and deepen loyalty.
          </p>
          <p style={{ fontFamily: 'DM Sans', fontSize: 15, lineHeight: 1.8, color: '#555' }}>
            Our team combines strategic thinking with genuine beauty fluency, ensuring your content feels authentic and on-brand at every touchpoint.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="label" style={{ marginBottom: 28 }}>What&apos;s Included</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {deliverables.map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '16px 0', borderBottom: '1px solid #ebebeb' }}>
                <Check size={14} style={{ color: '#0a0a0a', marginTop: 2, flexShrink: 0 }} />
                <p style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#333' }}>{d}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section style={{ background: '#0a0a0a', padding: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <FadeIn>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 300, color: '#fafaf8' }}>
            Ready to grow your social presence?
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <Link href="/contact" className="btn-white">Start a Conversation</Link>
        </FadeIn>
      </section>
    </>
  )
}
