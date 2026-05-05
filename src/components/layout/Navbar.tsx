'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, User, LogOut } from 'lucide-react'
import { useAuthStore } from '@/lib/auth'
import TransitionLink from '@/components/ui/TransitionLink'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'

/** Scroll blend 0 = hero (light ink), 1 = solid bar (dark ink) */
function clamp01(n: number) {
  if (!Number.isFinite(n)) return 0
  return Math.min(Math.max(n, 0), 1)
}

function mix(a: number, b: number, t: number) {
  const u = clamp01(t)
  return a + (b - a) * u
}

function rgbAt(t: number, from: [number, number, number], to: [number, number, number]) {
  const u = clamp01(t)
  const r = Math.round(from[0] + (to[0] - from[0]) * u)
  const g = Math.round(from[1] + (to[1] - from[1]) * u)
  const b = Math.round(from[2] + (to[2] - from[2]) * u)
  return `rgb(${r},${g},${b})`
}

function rgbaAt(
  t: number,
  from: [number, number, number, number],
  to: [number, number, number, number],
) {
  const u = clamp01(t)
  const r = Math.round(from[0] + (to[0] - from[0]) * u)
  const g = Math.round(from[1] + (to[1] - from[1]) * u)
  const b = Math.round(from[2] + (to[2] - from[2]) * u)
  const a = from[3] + (to[3] - from[3]) * u
  return `rgba(${r},${g},${b},${a})`
}

/* ─── Nepal Time Clock ───────────────────────────────────────────────────────── */
function NepalClock({ blend }: { blend: number }) {
  const u = clamp01(blend)
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const utc = now.getTime() + now.getTimezoneOffset() * 60000
      const npt = new Date(utc + 5 * 3600000 + 45 * 60000)
      let h = npt.getHours()
      const m = String(npt.getMinutes()).padStart(2, '0')
      const ampm = h >= 12 ? 'PM' : 'AM'
      h = h % 12 || 12
      setTime(`${h}:${m} ${ampm}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const faded = rgbaAt(u, [255, 255, 255, 0.5], [10, 10, 10, 0.45])
  const main = rgbaAt(u, [255, 255, 255, 0.88], [10, 10, 10, 0.82])
  const dot = rgbAt(u, [250, 250, 248], [10, 10, 10])
  const dotStroke = mix(0.45, 0.5, u)
  const dotFill = mix(0.12, 0.14, u)

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Montserrat, sans-serif', fontSize: 10 }}>
      <span style={{ letterSpacing: '0.18em', fontSize: 9, textTransform: 'uppercase', color: faded }}>
        KATHMANDU
      </span>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <circle cx="7" cy="7" r="6" fill={dot} fillOpacity={dotFill} stroke={dot} strokeOpacity={dotStroke} strokeWidth="0.8"/>
        <line x1="7" y1="7" x2="7" y2="3.5" stroke={dot} strokeWidth="1" strokeLinecap="round"/>
        <line x1="7" y1="7" x2="9.5" y2="7" stroke={dot} strokeWidth="1" strokeLinecap="round"/>
        <circle cx="7" cy="7" r="0.8" fill={dot}/>
      </svg>
      <span style={{ color: main, fontSize: 11, letterSpacing: '0.08em' }}>{time}</span>
    </div>
  )
}

/* ─── Tumbler CSS ────────────────────────────────────────────────────────────── */
const TUMBLER_CSS = `
  .tumbler-link .letter-track {
    display: inline-flex; align-items: flex-start;
    overflow: hidden; height: 1.1em;
  }
  .letter-slot { display: inline-block; overflow: hidden; height: 1.1em; line-height: 1.1; }
  .letter-drum {
    display: flex; flex-direction: column; line-height: 1.1;
    transition: transform 0.42s cubic-bezier(0.22, 1, 0.36, 1);
    transition-delay: var(--d, 0ms);
  }
  .letter-drum span { display: block; height: 1.1em; line-height: 1.1; }
  .tumbler-link:hover .letter-drum { transform: translateY(-50%); }
  .letter-space { display: inline-block; width: 0.3em; }
  .dd-tumbler-item {
    display: block; padding: 9px 0;
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s, padding-left 0.25s ease;
  }
  .dd-tumbler-item:hover { padding-left: 8px; border-bottom-color: #ebebeb; }
  .dd-tumbler-item:hover .letter-drum { transform: translateY(-50%); }
`

/* ─── TumblerWord ────────────────────────────────────────────────────────────── */
function TumblerWord({ text, stagger = 28 }: { text: string; stagger?: number }) {
  return (
    <span className="letter-track">
      {text.split('').map((char, i) =>
        char === ' '
          ? <span key={i} className="letter-space" />
          : (
            <span key={i} className="letter-slot">
              <span className="letter-drum" style={{ '--d': `${i * stagger}ms` } as React.CSSProperties}>
                <span>{char}</span>
                <span aria-hidden="true">{char}</span>
              </span>
            </span>
          )
      )}
    </span>
  )
}

/* ─── NavLink ────────────────────────────────────────────────────────────────── */
function TumblerNavLink({ label, href, blend, isActive, hasChevron, chevronOpen, onClick }: {
  label: string; href: string; blend: number; isActive?: boolean
  hasChevron?: boolean; chevronOpen?: boolean; onClick?: () => void
}) {
  const color = rgbAt(blend, [250, 250, 248], [10, 10, 10])
  return (
    <TransitionLink href={href} className="tumbler-link" onClick={onClick}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 5, textDecoration: 'none', fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color, position: 'relative' }}>
      <TumblerWord text={label} />
      {hasChevron && (
        <ChevronDown size={10} style={{ transition: 'transform 0.3s ease', transform: chevronOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0, opacity: mix(0.72, 0.55, blend), color }} />
      )}
      {isActive && (
        <span style={{ position: 'absolute', bottom: -7, left: '50%', transform: 'translateX(-50%)', width: 3, height: 3, borderRadius: '50%', background: color }} />
      )}
    </TransitionLink>
  )
}

/* ─── Dropdown item ──────────────────────────────────────────────────────────── */
function TumblerDropdownItem({ label, href, onClick }: { label: string; href: string; onClick?: () => void }) {
  return (
    <TransitionLink href={href} className="tumbler-link dd-tumbler-item" onClick={onClick}
      style={{ textDecoration: 'none', fontFamily: 'Montserrat, sans-serif', fontSize: 10, fontWeight: 400, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#0a0a0a' }}>
      <TumblerWord text={label} stagger={22} />
    </TransitionLink>
  )
}

/* ─── NAVBAR ─────────────────────────────────────────────────────────────────── */
export default function Navbar() {
  const [scrollY, setScrollY] = useState(0)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const pathname = usePathname()
  const { user, logout } = useAuthStore()
  const nav = useCMSStore(s => s.nav) ?? DEFAULT_CMS_CONTENT.nav
  const site = useCMSStore(s => s.siteSettings) ?? DEFAULT_CMS_CONTENT.siteSettings

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrollY(Number.isFinite(y) ? y : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setActiveDropdown(null) }, [pathname])

  // Blend 0→1 with scroll (px range tweak = how far you scroll before full “solid bar” look)
  const scrollRange = 160
  const y = Number.isFinite(scrollY) ? scrollY : 0
  const t = clamp01(y / scrollRange)

  const bgAlpha = t * 0.97
  const bgBlur = t * 14
  const borderAlpha = t * 0.12
  const navBg = `rgba(250,250,248,${bgAlpha})`
  const navBorder = `rgba(10,10,10,${borderAlpha})`

  const ink = rgbAt(t, [250, 250, 248], [10, 10, 10])
  const inkMuted = rgbaAt(t, [255, 255, 255, 0.42], [10, 10, 10, 0.42])
  const inkFaint = rgbaAt(t, [255, 255, 255, 0.38], [10, 10, 10, 0.38])
  const stripBorder = rgbaAt(t, [255, 255, 255, 0.08], [10, 10, 10, 0.08])
  const authBg = rgbaAt(t, [255, 255, 255, 0.12], [10, 10, 10, 0.06])
  const authBorder = rgbaAt(t, [255, 255, 255, 0.32], [10, 10, 10, 0.18])

  const navLinks = nav.items.map(item => ({
    label: item.label,
    href: item.href,
    dropdown: item.hasDropdown ? item.id : undefined,
    items: item.hasDropdown ? item.items : undefined,
  }))

  return (
    <>
      <style>{TUMBLER_CSS}</style>

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: navBg,
        backdropFilter: bgBlur > 0 ? `blur(${bgBlur}px)` : 'none',
        borderBottom: `1px solid ${navBorder}`,
        height: 80,
      }}>
        {/* Top strip */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '5px 48px',
          borderBottom: `1px solid ${stripBorder}`,
        }}>
          <span />
          <NepalClock blend={t} />
        </div>

        {/* Main nav */}
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 48px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 18 }}>
          {/* Logo */}
          <TransitionLink href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 26, fontWeight: 500, letterSpacing: '0.14em', color: ink }}>
                {site.brandName}
              </span>
              <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 7, fontWeight: 400, letterSpacing: '0.32em', color: inkMuted, textTransform: 'uppercase', marginTop: 3 }}>
                {site.brandTagline}
              </span>
            </div>
          </TransitionLink>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden md:flex">
            {navLinks.map(link => (
              <div key={link.label} style={{ position: 'relative' }}
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.dropdown)}
                onMouseLeave={() => setActiveDropdown(null)}>
                <TumblerNavLink
                  label={link.label} href={link.href} blend={t}
                  isActive={pathname === link.href}
                  hasChevron={Boolean(link.dropdown)}
                  chevronOpen={activeDropdown === link.dropdown}
                />
                <AnimatePresence>
                  {link.dropdown && activeDropdown === link.dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scaleY: 0.95 }}
                      animate={{ opacity: 1, y: 0, scaleY: 1 }}
                      exit={{ opacity: 0, y: 10, scaleY: 0.95 }}
                      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                      style={{ transformOrigin: 'top center', position: 'absolute', top: '100%', left: -24, marginTop: 18, background: '#fafaf8', border: '1px solid #ebebeb', padding: '18px 32px 18px 24px', minWidth: 230, zIndex: 100, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }}
                    >
                      {link.items?.map((item: { label: string; href: string }) => (
                        <TumblerDropdownItem key={item.label} label={item.label} href={item.href} onClick={() => setActiveDropdown(null)} />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Auth */}
            {user ? (
              <div style={{ position: 'relative' }}
                onMouseEnter={() => setActiveDropdown('user')} onMouseLeave={() => setActiveDropdown(null)}>
                <button style={{ background: authBg, border: `1px solid ${authBorder}`, padding: '7px 16px', display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: ink }}>
                  <User size={12} /> {user.name.split(' ')[0]}
                </button>
                <AnimatePresence>
                  {activeDropdown === 'user' && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.2 }}
                      style={{ position: 'absolute', top: '100%', right: 0, marginTop: 10, background: '#fafaf8', border: '1px solid #ebebeb', padding: '14px 24px', minWidth: 170, zIndex: 100, boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
                      <TumblerDropdownItem label={user.role === 'admin' ? 'Dashboard' : 'My Account'} href={user.role === 'admin' ? '/admin' : '/dashboard'} onClick={() => setActiveDropdown(null)} />
                      <button onClick={logout} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9b9b9b', padding: '9px 0', width: '100%', textAlign: 'left', transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#0a0a0a')} onMouseLeave={e => (e.currentTarget.style.color = '#9b9b9b')}>
                        <LogOut size={10} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <TransitionLink
                href="/login"
                style={{
                  background: '#0a0a0a',
                  border: '1px solid #0a0a0a',
                  padding: '7px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  cursor: 'pointer',
                  fontFamily: 'Montserrat',
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#fafaf8',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.background = '#fafaf8'
                  el.style.color = '#0a0a0a'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.background = '#0a0a0a'
                  el.style.color = '#fafaf8'
                }}
              >
                Sign In
              </TransitionLink>
            )}
          </nav>

          {/* Mobile toggle */}
          <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden"
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: ink }}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            <span>{mobileOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: 'fixed', inset: 0, background: '#0a0a0a', zIndex: 999, padding: '100px 48px 48px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {navLinks.map((link, i) => (
                <div key={link.label}>
                  <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                    {link.dropdown ? (
                      <>
                        <button type="button" onClick={() => setMobileExpanded(mobileExpanded === link.dropdown ? null : link.dropdown!)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 400, color: '#fafaf8', padding: '12px 0', width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1a1a1a' }}>
                          {link.label}
                          <ChevronDown size={18} color="#555" style={{ transform: mobileExpanded === link.dropdown ? 'rotate(180deg)' : 'none', transition: '0.2s' }} />
                        </button>
                        <AnimatePresence>
                          {mobileExpanded === link.dropdown && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden', paddingLeft: 24 }}>
                              {link.items?.map((item: { label: string; href: string }) => (
                                <TransitionLink key={item.label} href={item.href} onClick={() => setMobileOpen(false)}
                                  style={{ display: 'block', fontFamily: 'Montserrat', fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#666', padding: '9px 0', textDecoration: 'none' }}>
                                  {item.label}
                                </TransitionLink>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <TransitionLink href={link.href} onClick={() => setMobileOpen(false)}
                        style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 400, color: '#fafaf8', padding: '12px 0', display: 'block', textDecoration: 'none', borderBottom: '1px solid #1a1a1a' }}>
                        {link.label}
                      </TransitionLink>
                    )}
                  </motion.div>
                </div>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ marginTop: 48 }}>
                <TransitionLink href={user ? (user.role === 'admin' ? '/admin' : '/dashboard') : '/login'} onClick={() => setMobileOpen(false)}
                  style={{ display: 'block', textAlign: 'center', fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '14px 28px', background: '#fafaf8', color: '#0a0a0a', textDecoration: 'none', border: '1px solid #fafaf8' }}>
                  {user ? 'Dashboard' : 'Sign In'}
                </TransitionLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
