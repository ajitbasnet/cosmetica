'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 48px' }}>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        style={{ fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#9b9b9b', marginBottom: 24 }}>
        404 — Page Not Found
      </motion.p>
      <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9 }}
        style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(64px, 8vw, 120px)', fontWeight: 300, lineHeight: 1, marginBottom: 32, color: '#0a0a0a' }}>
        Lost in beauty.
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
        style={{ fontFamily: 'DM Sans', fontSize: 16, color: '#666', maxWidth: 400, lineHeight: 1.7, marginBottom: 48 }}>
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to something beautiful.
      </motion.p>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} style={{ display: 'flex', gap: 16 }}>
        <Link href="/" className="btn-primary">Back to Home</Link>
        <Link href="/contact" className="btn-outline">Contact Us</Link>
      </motion.div>
    </div>
  )
}
