'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, TrendingUp, Eye, Users, Share2 } from 'lucide-react'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay }}>
      {children}
    </motion.div>
  )
}

const results = [
  { icon: TrendingUp, value: '3.2M', label: 'Organic Impressions' },
  { icon: Eye, value: '280%', label: 'ROI on Campaign Spend' },
  { icon: Users, value: '48K', label: 'New Followers Gained' },
  { icon: Share2, value: '6.4%', label: 'Avg. Engagement Rate' },
]

export default function CaseStudyDetailPage() {
  return (
    <>
      {/* Hero */}
      <div style={{ height: '60vh', overflow: 'hidden', position: 'relative' }}>
        <motion.img initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 1.4 }}
          src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1600&q=85"
          alt="Case Study" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.4)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '64px 80px' }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="label" style={{ color: '#9b9b9b', marginBottom: 16 }}>Influencer Marketing — 2026</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 400, color: '#fafaf8', lineHeight: 1.1 }}>
            Lumière Paris — Aire IQ: The Making of a Hero Product
          </motion.h1>
        </div>
      </div>

      {/* Results Bar */}
      <div style={{ background: '#0a0a0a', padding: '0 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: '#1a1a1a' }}>
          {results.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }}
              style={{ background: '#0a0a0a', padding: '40px 32px', display: 'flex', gap: 16, alignItems: 'center' }}>
              <r.icon size={18} color="#666" />
              <div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, fontWeight: 400, color: '#fafaf8', lineHeight: 1 }}>{r.value}</p>
                <p className="label" style={{ color: '#666', marginTop: 6 }}>{r.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Content */}
      <article style={{ padding: '80px 80px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 80 }}>
          <div>
            <Link href="/work/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9b9b9b', textDecoration: 'none', marginBottom: 40 }}>
              <ArrowLeft size={12} /> All Case Studies
            </Link>

            <FadeIn>
              <p className="label" style={{ marginBottom: 16 }}>The Challenge</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 400, marginBottom: 20 }}>Launching a hero product in a crowded prestige market.</h2>
              <p style={{ fontFamily: 'DM Sans', fontSize: 15, lineHeight: 1.85, color: '#555', marginBottom: 40 }}>
                Lumière Paris had developed their most technically advanced tool to date — the Aire IQ — but needed a social strategy that would cut through category noise, drive genuine consumer excitement, and validate the product&apos;s premium positioning without relying on traditional editorial channels.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="label" style={{ marginBottom: 16 }}>Our Approach</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 400, marginBottom: 20 }}>Creator seeding + hero content strategy.</h2>
              <p style={{ fontFamily: 'DM Sans', fontSize: 15, lineHeight: 1.85, color: '#555', marginBottom: 24 }}>
                We identified 42 creators across the prestige beauty and lifestyle space — a careful mix of established voices and emerging tastemakers with highly engaged communities. Each creator received a bespoke product experience curated specifically for their content style.
              </p>
              <p style={{ fontFamily: 'DM Sans', fontSize: 15, lineHeight: 1.85, color: '#555', marginBottom: 40 }}>
                Alongside the creator strategy, we developed a parallel organic social content series: &ldquo;The Making of a Hero Product&rdquo; — giving Lumière Paris&apos;s brand account its own voice in the conversation.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 40 }}>
                <div className="img-hover" style={{ height: 280 }}>
                  <img src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div className="img-hover" style={{ height: 280 }}>
                  <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="label" style={{ marginBottom: 16 }}>The Results</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 400, marginBottom: 20 }}>Their most successful product launch to date.</h2>
              <p style={{ fontFamily: 'DM Sans', fontSize: 15, lineHeight: 1.85, color: '#555' }}>
                Within six weeks of launch, the Aire IQ surpassed Lumière Paris&apos;s previous hero product in sell-through rate — driven entirely by social and creator content. The campaign generated 3.2M organic impressions, drove a 48K net new follower gain, and achieved a 6.4% average engagement rate — well above the prestige beauty category average of 2.1%.
              </p>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div>
            <FadeIn delay={0.2}>
              <div style={{ background: '#f5f2ec', padding: '40px 32px', marginBottom: 24 }}>
                <p className="label" style={{ marginBottom: 24 }}>Project Details</p>
                {[
                  { label: 'Client', value: 'Lumière Paris' },
                  { label: 'Services', value: 'Influencer Marketing, Organic Social' },
                  { label: 'Duration', value: '3 Months' },
                  { label: 'Year', value: '2026' },
                  { label: 'Region', value: 'North America' },
                ].map((d, i) => (
                  <div key={i} style={{ padding: '14px 0', borderBottom: '1px solid #e0ddd8' }}>
                    <p className="label" style={{ marginBottom: 4 }}>{d.label}</p>
                    <p style={{ fontFamily: 'DM Sans', fontSize: 14, color: '#333' }}>{d.value}</p>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="btn-primary" style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                Start a Similar Project
              </Link>
            </FadeIn>
          </div>
        </div>
      </article>

      {/* Next Case Study CTA */}
      <section style={{ background: '#0a0a0a', padding: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="label" style={{ color: '#666', marginBottom: 12 }}>Next Case Study</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 400, color: '#fafaf8' }}>
            Maison Éclat — A Social Refresh for a Heritage Brand
          </h2>
        </div>
        <Link href="/work/case-studies/detail" className="btn-white" style={{ flexShrink: 0, marginLeft: 64 }}>View More</Link>
      </section>
    </>
  )
}
