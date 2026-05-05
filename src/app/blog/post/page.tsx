'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay }}>
      {children}
    </motion.div>
  )
}

export default function BlogPostPage() {
  return (
    <>
      {/* Hero Image */}
      <div style={{ height: '55vh', overflow: 'hidden', position: 'relative' }}>
        <motion.img
          initial={{ scale: 1.06 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: [0.4,0,0.2,1] }}
          src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&q=85"
          alt="Post"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(250,250,248,0.9) 100%)' }} />
      </div>

      {/* Article */}
      <article style={{ maxWidth: 760, margin: '0 auto', padding: '60px 48px 100px' }}>
        <FadeIn>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9b9b9b', textDecoration: 'none', marginBottom: 40 }}
            onMouseEnter={e => (e.currentTarget.style.color = '#0a0a0a')} onMouseLeave={e => (e.currentTarget.style.color = '#9b9b9b')}>
            <ArrowLeft size={12} /> Back to Blog
          </Link>
          <p className="label" style={{ marginBottom: 20 }}>Trend Report — April 2026</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(40px, 5vw, 60px)', fontWeight: 400, lineHeight: 1.1, marginBottom: 32 }}>
            The Rise of Quiet Luxury in Prestige Beauty Marketing
          </h1>
          <p style={{ fontFamily: 'DM Sans', fontSize: 16, lineHeight: 1.8, color: '#555', marginBottom: 32 }}>
            How less-is-more aesthetics are reshaping the way prestige beauty brands communicate on social platforms — and what it means for your 2026 strategy.
          </p>
          <div style={{ height: 1, background: '#ebebeb', marginBottom: 48 }} />
        </FadeIn>

        {[
          { heading: 'The Aesthetic Shift', body: 'Across the prestige beauty landscape, a notable shift is underway. The maximalist era of bold graphics, loud callouts, and saturated color palettes is quietly giving way to something more refined — a visual language that prioritises restraint, quality, and intentionality. This is what we\'re calling the Quiet Luxury era of beauty marketing.\n\nFor brands that have spent years competing for attention through volume and spectacle, this represents both a challenge and a significant opportunity. The brands that will win in this environment are those willing to trust their audience\'s intelligence — to say less and mean more.' },
          { heading: 'What Quiet Luxury Looks Like on Social', body: 'On Instagram and TikTok, Quiet Luxury manifests in several distinctive ways. Colour palettes shift to muted tonalities — ecru, slate, deep forest, warm stone. Typography becomes editorial. The visual pace slows. Products are held with intention rather than thrust toward the camera.\n\nContent that would have previously highlighted USPs through graphics and callouts instead allows the product to speak through demonstration, texture, and atmosphere. Voice-over becomes more like an intimate conversation than a broadcast announcement.' },
          { heading: 'The Creator Alignment Question', body: 'This aesthetic shift also has implications for influencer strategy. The creators thriving in this environment are those who have cultivated an audience through considered, curated content — often with smaller but deeply engaged followings.\n\nFor beauty brands, this means taking a more nuanced approach to creator selection — prioritising alignment over reach, and authenticity over production value. The goal is content that feels like it belongs in a creator\'s world, rather than an interruption of it.' },
        ].map((section, i) => (
          <FadeIn key={i} delay={0.1}>
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 400, marginBottom: 20 }}>{section.heading}</h2>
              {section.body.split('\n\n').map((para, j) => (
                <p key={j} style={{ fontFamily: 'DM Sans', fontSize: 15, lineHeight: 1.85, color: '#444', marginBottom: 20 }}>{para}</p>
              ))}
            </div>
          </FadeIn>
        ))}

        <FadeIn delay={0.1}>
          <div style={{ background: '#f5f2ec', padding: '40px 48px', margin: '48px 0', borderLeft: '3px solid #0a0a0a' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, fontWeight: 400, lineHeight: 1.5, fontStyle: 'italic', color: '#0a0a0a' }}>
              &ldquo;The brands redefining prestige beauty are those willing to trust restraint — to let quality speak through silence, not noise.&rdquo;
            </p>
          </div>
        </FadeIn>
      </article>

      {/* Related Posts */}
      <section style={{ background: '#f5f2ec', padding: '80px' }}>
        <FadeIn>
          <p className="label" style={{ marginBottom: 20 }}>Continue Reading</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { title: 'Micro-Influencer vs. Macro: What the Data Actually Says', category: 'Insights', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80' },
              { title: 'Building a Creator-Led Affiliate Program That Actually Converts', category: 'Strategy', img: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=80' },
              { title: 'TikTok Shop and the Future of Beauty Commerce', category: 'Trend Report', img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=80' },
            ].map((p, i) => (
              <Link key={i} href="/blog/post" style={{ textDecoration: 'none' }}>
                <div className="img-hover" style={{ height: 220, marginBottom: 20 }}>
                  <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <p className="label" style={{ marginBottom: 10 }}>{p.category}</p>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 400, color: '#0a0a0a', lineHeight: 1.3, transition: 'color 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#9b9b9b')} onMouseLeave={e => (e.currentTarget.style.color = '#0a0a0a')}>
                  {p.title}
                </h3>
              </Link>
            ))}
          </div>
        </FadeIn>
      </section>
    </>
  )
}
