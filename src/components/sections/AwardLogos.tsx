'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'

export default function AwardLogos() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const awards = useCMSStore(s => s.pages.home.awards) ?? DEFAULT_CMS_CONTENT.pages.home.awards

  return (
    <section ref={ref} style={{ background: '#f5f2ec', padding: '80px 80px 88px', overflow: 'hidden' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 0,
        maxWidth: 1320,
        margin: '0 auto',
      }}>
        {awards.map((award, i) => (
          <motion.div
            key={award.id}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.4, 0, 0.2, 1] }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '0 20px',
              borderRight: i < awards.length - 1 ? '1px solid rgba(10,10,10,0.12)' : 'none',
            }}
          >
            <div style={{ height: 88, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}
              dangerouslySetInnerHTML={{ __html: award.logoSvg }}
            />

            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', marginBottom: 4, lineHeight: 1.6 }}>
              {award.year}
            </p>
            <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0a0a0a', lineHeight: 1.6 }}>
              {award.title}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
