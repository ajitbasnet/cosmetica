'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const site = useCMSStore(s => s.siteSettings) ?? DEFAULT_CMS_CONTENT.siteSettings

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-consent')
    if (!accepted) setTimeout(() => setVisible(true), 1500)
  }, [])

  const accept = () => { localStorage.setItem('cookie-consent', 'all'); setVisible(false) }
  const deny = () => { localStorage.setItem('cookie-consent', 'none'); setVisible(false) }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9998,
            background: '#0a0a0a', color: '#fafaf8',
            padding: '20px 48px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40,
            borderTop: '1px solid #1a1a1a',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <p style={{ fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#666', flexShrink: 0, marginTop: 2 }}>{site.cookieLabel}</p>
            <p style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#9b9b9b', lineHeight: 1.6 }}>
              {site.cookieBody}{' '}
              <Link href="/privacy" style={{ color: '#fafaf8', textDecoration: 'underline' }}>{site.cookiePrivacyLabel}</Link> for more details.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
            <button type="button" onClick={deny}
              style={{ fontFamily: 'Montserrat', fontSize: 9, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '10px 20px', background: 'transparent', color: '#666', border: '1px solid #333', cursor: 'pointer', transition: 'all 0.3s', whiteSpace: 'nowrap' }}>
              Deny All
            </button>
            <button type="button" onClick={accept}
              style={{ fontFamily: 'Montserrat', fontSize: 9, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', padding: '10px 20px', background: '#fafaf8', color: '#0a0a0a', border: '1px solid #fafaf8', cursor: 'pointer', transition: 'all 0.3s', whiteSpace: 'nowrap' }}>
              Accept All
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
