'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import TransitionLink from '@/components/ui/TransitionLink'
import AwardLogos from '@/components/sections/AwardLogos'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'
import { mergeDeep } from '@/lib/cms-utils'
import type { HomePageCMS } from '@/lib/cms-types'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 32 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}>
      {children}
    </motion.div>
  )
}

function highlightStyle(active: boolean): React.CSSProperties {
  return active ? { boxShadow: 'inset 0 0 0 4px rgba(59, 130, 246, 0.45)' } : {}
}

export function HomePageContent({
  hideCursor = false,
  homePartial = null,
}: {
  hideCursor?: boolean
  /** Admin preview: merge partial home CMS over store (draft) */
  homePartial?: Partial<HomePageCMS> | null
}) {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 })
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 })

  const baseHome = useCMSStore(s => s.pages.home) ?? DEFAULT_CMS_CONTENT.pages.home
  const home = homePartial
    ? (mergeDeep(
        { ...baseHome } as unknown as Record<string, unknown>,
        homePartial as unknown as Record<string, unknown>,
      ) as unknown as HomePageCMS)
    : baseHome
  const previewHighlight = useCMSStore(s => s.previewHighlight)
  const { hero, ticker, servicesSection, weAre, caseStudies, ctaBand } = home
  const hi = (id: string) => highlightStyle(previewHighlight === id)

  useEffect(() => {
    if (hideCursor) return
    const onMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
      setTimeout(() => setRingPos({ x: e.clientX, y: e.clientY }), 60)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [hideCursor])

  const textMain = hero.textColor === 'black' ? '#0a0a0a' : '#fafaf8'
  const textMuted = hero.textColor === 'black' ? 'rgba(10,10,10,0.65)' : 'rgba(255,255,255,0.7)'
  const subMuted = hero.textColor === 'black' ? 'rgba(10,10,10,0.55)' : 'rgba(255,255,255,0.55)'
  const overlayAlpha = hero.overlayOpacity

  return (
    <>
      {!hideCursor && (
        <>
          <div style={{ position: 'fixed', left: cursorPos.x - 4, top: cursorPos.y - 4, width: 8, height: 8, background: '#fafaf8', borderRadius: '50%', pointerEvents: 'none', zIndex: 99997, mixBlendMode: 'difference', transition: 'transform 0.1s' }} />
          <div style={{ position: 'fixed', left: ringPos.x - 20, top: ringPos.y - 20, width: 40, height: 40, border: '1px solid rgba(250,250,248,0.35)', borderRadius: '50%', pointerEvents: 'none', zIndex: 99996, transition: 'left 0.06s, top 0.06s' }} />
        </>
      )}

      <section data-cms-section="hero" style={{ height: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', position: 'relative', overflow: 'hidden', ...hi('hero'), transition: 'box-shadow 0.3s ease' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 64px 0 80px', position: 'relative', zIndex: 2 }}>
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, rgba(10,10,10,${overlayAlpha * 0.9}) 0%, rgba(10,10,10,${overlayAlpha * 0.35}) 80%, transparent 100%)`, zIndex: -1 }} />
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: subMuted, marginBottom: 28 }}>
            {hero.subheading}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 1, ease: [0.4, 0, 0.2, 1] }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(48px, 5.5vw, 76px)', fontWeight: 400, lineHeight: 1.06, color: textMain, marginBottom: 28 }}>
            {hero.heading}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, fontWeight: 300, lineHeight: 1.75, color: textMuted, maxWidth: 460, marginBottom: 44 }}>
            {hero.bodyText}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} style={{ display: 'flex', gap: 14 }}>
            <TransitionLink href={hero.ctaPrimaryHref} style={{ background: hero.textColor === 'black' ? '#0a0a0a' : '#fafaf8', color: hero.textColor === 'black' ? '#fafaf8' : '#0a0a0a', fontFamily: 'Montserrat', fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '13px 28px', border: `1px solid ${hero.textColor === 'black' ? '#0a0a0a' : '#fafaf8'}`, textDecoration: 'none', transition: 'all 0.3s' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = 'transparent'
                el.style.color = textMain
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.background = hero.textColor === 'black' ? '#0a0a0a' : '#fafaf8'
                el.style.color = hero.textColor === 'black' ? '#fafaf8' : '#0a0a0a'
              }}>
              {hero.ctaPrimaryLabel}
            </TransitionLink>
            <TransitionLink href={hero.ctaSecondaryHref} style={{ background: 'transparent', color: textMain, fontFamily: 'Montserrat', fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '13px 28px', border: `1px solid ${hero.textColor === 'black' ? 'rgba(10,10,10,0.35)' : 'rgba(255,255,255,0.4)'}`, textDecoration: 'none', transition: 'all 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = hero.textColor === 'black' ? 'rgba(10,10,10,0.08)' : 'rgba(255,255,255,0.1)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent' }}>
              {hero.ctaSecondaryLabel}
            </TransitionLink>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          style={{ position: 'relative', overflow: 'hidden' }}>
          <img src={hero.backgroundImage}
            alt="Prestige beauty"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s ease' }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, transparent 60%, rgba(10,10,10,0.15) 100%)' }} />
        </motion.div>
      </section>

      <div data-cms-section="ticker" style={{ background: '#0a0a0a', padding: '17px 0', overflow: 'hidden', ...hi('ticker'), transition: 'box-shadow 0.3s ease' }}>
        <div className="marquee-inner">
          {Array(10).fill(null).map((_, i) => (
            <span key={i} style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 400, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#fafaf8', marginRight: 56, whiteSpace: 'nowrap' }}>
              {ticker.items.map((t, j) => (
                <span key={j}>{t}&nbsp;&nbsp;★&nbsp;&nbsp;</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div data-cms-section="awards" style={hi('awards')}>
        <AwardLogos />
      </div>

      <section data-cms-section="services" style={{ background: '#0a0a0a', padding: '100px 80px', ...hi('services'), transition: 'box-shadow 0.3s ease' }}>
        <FadeIn>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72 }}>
            <div>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#666', marginBottom: 20 }}>{servicesSection.subheading}</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(40px, 5vw, 64px)', fontWeight: 300, color: '#fafaf8', lineHeight: 1.1, whiteSpace: 'pre-line' }}>
                {servicesSection.heading}
              </h2>
            </div>
            <TransitionLink href={servicesSection.ctaHref} style={{ background: '#fafaf8', color: '#0a0a0a', fontFamily: 'Montserrat', fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '13px 28px', border: '1px solid #fafaf8', textDecoration: 'none', transition: 'all 0.3s', flexShrink: 0 }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#fafaf8' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#fafaf8'; (e.currentTarget as HTMLAnchorElement).style.color = '#0a0a0a' }}>
              {servicesSection.ctaLabel}
            </TransitionLink>
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: '#222' }}>
          {servicesSection.items.map((s, i) => (
            <motion.div key={s.id} whileHover={{ backgroundColor: '#111' }}
              style={{ background: '#0a0a0a', padding: '48px 32px', transition: 'background 0.3s', cursor: 'default' }}>
              <FadeIn delay={i * 0.1}>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#555', marginBottom: 24 }}>{s.num}</p>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 400, color: '#fafaf8', marginBottom: 16 }}>{s.title}</h3>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, lineHeight: 1.75, color: '#777' }}>{s.desc}</p>
              </FadeIn>
            </motion.div>
          ))}
        </div>
      </section>

      <section data-cms-section="weAre" style={{ padding: '100px 80px', background: '#f5f2ec', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', ...hi('weAre'), transition: 'box-shadow 0.3s ease' }}>
        <FadeIn>
          <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#9b9b9b', marginBottom: 24 }}>{weAre.label}</p>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(42px, 5vw, 64px)', fontWeight: 400, lineHeight: 1.1, marginBottom: 32 }}>
            {weAre.heading}
          </h2>
          <TransitionLink href={weAre.ctaHref} className="btn-primary">{weAre.ctaLabel}</TransitionLink>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="img-hover" style={{ height: 500 }}>
            <img src={weAre.image} alt="About" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </FadeIn>
      </section>

      <section data-cms-section="caseStudies" style={{ padding: '100px 80px', ...hi('caseStudies'), transition: 'box-shadow 0.3s ease' }}>
        <FadeIn>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64 }}>
            <div>
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#9b9b9b', marginBottom: 20 }}>{caseStudies.label}</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(40px, 5vw, 60px)', fontWeight: 400 }}>{caseStudies.heading}</h2>
            </div>
            <TransitionLink href={caseStudies.viewMoreHref} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
              {caseStudies.viewMoreLabel} <ArrowRight size={12} />
            </TransitionLink>
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {caseStudies.items.map((cs, i) => (
            <FadeIn key={cs.id} delay={i * 0.1}>
              <TransitionLink
                href={cs.href}
                className="work-proud-card"
                aria-label={`${cs.brand}: ${cs.title}`}
              >
                <img className="work-proud-img" src={cs.img} alt="" />
                <div className="work-proud-vignette" aria-hidden />
                <div className="work-proud-overlay">
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(250,250,248,0.55)', marginBottom: 10 }}>
                    {cs.category}
                  </p>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, color: '#fafaf8', marginBottom: 8, lineHeight: 1.15 }}>{cs.brand}</p>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, lineHeight: 1.55, color: 'rgba(250,250,248,0.82)', marginBottom: 22, maxWidth: '95%' }}>
                    {cs.title}
                  </p>
                  <span className="work-proud-cta" style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#fafaf8' }}>
                    View case study <ArrowRight size={12} strokeWidth={1.75} style={{ flexShrink: 0 }} />
                  </span>
                </div>
                <div className="work-proud-bar">
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18, color: '#fafaf8' }}>{cs.brand}</p>
                  <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,250,248,0.65)', marginTop: 4 }}>{cs.category}</p>
                </div>
              </TransitionLink>
            </FadeIn>
          ))}
        </div>
      </section>

      <section data-cms-section="ctaBand" style={{ background: '#0a0a0a', padding: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', ...hi('ctaBand'), transition: 'box-shadow 0.3s ease' }}>
        <FadeIn>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 300, color: '#fafaf8', maxWidth: 600 }}>
            {ctaBand.heading}
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <TransitionLink href={ctaBand.buttonHref} style={{ background: '#fafaf8', color: '#0a0a0a', fontFamily: 'Montserrat', fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '13px 28px', border: '1px solid #fafaf8', textDecoration: 'none', transition: 'all 0.3s', flexShrink: 0 }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#fafaf8' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#fafaf8'; (e.currentTarget as HTMLAnchorElement).style.color = '#0a0a0a' }}>
            {ctaBand.buttonLabel}
          </TransitionLink>
        </FadeIn>
      </section>
    </>
  )
}
