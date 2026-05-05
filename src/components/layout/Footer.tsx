'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ExternalLink, Share2 } from 'lucide-react'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'
import { useAuthStore } from '@/lib/auth'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const site = useCMSStore(s => s.siteSettings) ?? DEFAULT_CMS_CONTENT.siteSettings
  const user = useAuthStore(s => s.user)
  const isAdmin = user?.role === 'admin'

  const bg = isAdmin ? '#712E1E' : '#0a0a0a'
  const fg = '#FFFFFF'
  const borderStrong = isAdmin ? 'rgba(255, 255, 255, 0.28)' : '#222'
  const borderSoft = isAdmin ? 'rgba(255, 255, 255, 0.2)' : '#1a1a1a'
  const muted = isAdmin ? 'rgba(255, 255, 255, 0.85)' : '#9b9b9b'
  const faint = isAdmin ? 'rgba(255, 255, 255, 0.7)' : '#666'
  const inputBorder = isAdmin ? 'rgba(255, 255, 255, 0.45)' : '#444'

  return (
    <footer style={{ background: bg, color: fg }}>
      <div style={{ borderBottom: `1px solid ${borderStrong}`, padding: '80px 48px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          {!subscribed ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'end' }}>
              <div>
                <p className="label" style={{ color: muted, marginBottom: 16 }}>{site.newsletterLabel}</p>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 56, fontWeight: 300, lineHeight: 1.05, color: fg }}>
                  {site.newsletterHeadline.split('®').map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && <sup style={{ fontSize: 18 }}>®</sup>}
                    </span>
                  ))}
                </h2>
              </div>
              <div>
                <p className="label" style={{ color: muted, marginBottom: 24 }}>{site.newsletterSub}</p>
                <div style={{ display: 'flex', gap: 0 }}>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{
                      flex: 1, background: 'transparent', border: 'none', borderBottom: `1px solid ${inputBorder}`,
                      padding: '12px 0', color: fg, fontFamily: 'DM Sans', fontSize: 14,
                      outline: 'none',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => email && setSubscribed(true)}
                    style={{
                      background: '#fafaf8', color: '#0a0a0a',
                      fontFamily: 'Montserrat', fontSize: 9, fontWeight: 500, letterSpacing: '0.18em',
                      textTransform: 'uppercase', padding: '12px 24px', border: 'none', cursor: 'pointer',
                      marginLeft: 16, transition: 'all 0.3s',
                    }}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 42, color: fg }}>
                {site.newsletterThanks}
              </p>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '60px 48px', maxWidth: 1320, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 80 }}>
          <div>
            <div style={{ marginBottom: 24 }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 500, letterSpacing: '0.1em', color: fg }}>{site.footerBrandName}</p>
              <p style={{ fontFamily: 'Montserrat', fontSize: 8, letterSpacing: '0.26em', textTransform: 'uppercase', color: muted, marginTop: 4 }}>{site.footerBrandTagline}</p>
            </div>
            <div style={{ marginBottom: 32 }}>
              <p className="label" style={{ color: faint, marginBottom: 8 }}>Get In Touch</p>
              <a href={`mailto:${site.contactEmail}`} style={{ color: muted, textDecoration: 'none', fontFamily: 'DM Sans', fontSize: 14, display: 'block', marginBottom: 16, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = fg)}
                onMouseLeave={e => (e.currentTarget.style.color = muted)}>
                {site.contactEmail}
              </a>
              <p className="label" style={{ color: faint, marginBottom: 8 }}>Find Us</p>
              <p style={{ color: muted, fontFamily: 'DM Sans', fontSize: 13, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                {site.contactAddress}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <a href={site.socialInstagram} target="_blank" rel="noopener noreferrer"
                style={{ color: muted, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = fg)}
                onMouseLeave={e => (e.currentTarget.style.color = muted)}>
                <ExternalLink size={16} />
              </a>
              <a href={site.socialLinkedin} target="_blank" rel="noopener noreferrer"
                style={{ color: muted, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = fg)}
                onMouseLeave={e => (e.currentTarget.style.color = muted)}>
                <Share2 size={16} />
              </a>
            </div>
          </div>

          {site.footerColumns.map(col => (
            <div key={col.title}>
              <p className="label" style={{ color: muted, marginBottom: 24 }}>{col.title}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {col.links.map(l => (
                  <Link key={l.href} href={l.href}
                    style={{ color: faint, fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = fg)}
                    onMouseLeave={e => (e.currentTarget.style.color = faint)}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${borderSoft}`, padding: '20px 48px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: faint }}>
            {site.copyright}
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/privacy" style={{ fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: faint, textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: faint, textDecoration: 'none' }}>Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
