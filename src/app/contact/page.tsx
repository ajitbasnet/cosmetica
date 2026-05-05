'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'

export default function ContactPage() {
  const c = useCMSStore(s => s.pages.contact) ?? DEFAULT_CMS_CONTENT.pages.contact
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', company: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = () => {
    if (form.firstName && form.email) setSent(true)
  }

  return (
    <section style={{ minHeight: '80vh', padding: '80px 80px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 120, alignItems: 'start', maxWidth: 1200 }}>
        <div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#9b9b9b', marginBottom: 24 }}>
            {c.eyebrow}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(48px, 5vw, 72px)', fontWeight: 400, lineHeight: 1.05, marginBottom: 48 }}>
            {c.heading}
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <p style={{ fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9b9b9b', marginBottom: 8 }}>{c.emailLabel}</p>
            <a href={`mailto:${c.email}`} style={{ fontFamily: 'DM Sans', fontSize: 16, color: '#0a0a0a', textDecoration: 'none' }}>{c.email}</a>
            <div style={{ marginTop: 40 }}>
              <p style={{ fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9b9b9b', marginBottom: 8 }}>{c.findUsLabel}</p>
              <p style={{ fontFamily: 'DM Sans', fontSize: 15, lineHeight: 1.7, color: '#555', whiteSpace: 'pre-line' }}>{c.address}</p>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          {sent ? (
            <div style={{ padding: '80px 0', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, marginBottom: 16 }}>{c.successHeading}</h2>
              <p style={{ fontFamily: 'DM Sans', color: '#666', fontSize: 15 }}>{c.successBody}</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div>
                <input placeholder={c.formFirstNamePlaceholder} className="input-field" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} />
              </div>
              <div>
                <input placeholder={c.formLastNamePlaceholder} className="input-field" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <input placeholder={c.formEmailPlaceholder} type="email" className="input-field" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <input placeholder={c.formCompanyPlaceholder} className="input-field" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <textarea placeholder={c.formMessagePlaceholder} className="input-field" rows={4} value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{ resize: 'none' }} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <button type="button" onClick={handleSubmit} className="btn-primary" style={{ width: '100%', marginTop: 16 }}>
                  {c.submitLabel}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
