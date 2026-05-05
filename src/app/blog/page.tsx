'use client'
import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { useCMSStore } from '@/lib/cms-store'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] }}>
      {children}
    </motion.div>
  )
}

export default function BlogPage() {
  const blog = useCMSStore(s => s.pages.blog) ?? DEFAULT_CMS_CONTENT.pages.blog
  const posts = blog.posts
  const featured = posts[0] ?? null

  return (
    <>
      <section style={{ padding: '80px 80px 60px', borderBottom: '1px solid #ebebeb' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="label" style={{ marginBottom: 20 }}>{blog.headerEyebrow}</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(52px, 6vw, 80px)', fontWeight: 400, lineHeight: 1.05, maxWidth: 700 }}>
          {blog.headerTitle}
        </motion.h1>
      </section>

      {featured ? (
        <section style={{ padding: '0 80px' }}>
          <FadeIn>
            <Link href={featured.href} style={{ textDecoration: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderBottom: '1px solid #ebebeb' }}>
              <div className="img-hover" style={{ height: 520 }}>
                <img src={featured.img} alt={featured.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '80px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#f5f2ec' }}>
                <p className="label" style={{ marginBottom: 20 }}>{blog.featuredEyebrowPrefix} — {featured.category}</p>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 3.5vw, 48px)', fontWeight: 400, lineHeight: 1.15, color: '#0a0a0a', marginBottom: 20 }}>{featured.title}</h2>
                <p style={{ fontFamily: 'DM Sans', fontSize: 15, lineHeight: 1.7, color: '#666', marginBottom: 32 }}>{featured.excerpt}</p>
                <span style={{ fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#0a0a0a', textDecoration: 'underline' }}>Read More →</span>
              </div>
            </Link>
          </FadeIn>
        </section>
      ) : null}

      <section style={{ padding: '80px 80px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
          {posts.slice(featured ? 1 : 0).map((post, i) => (
            <FadeIn key={post.id} delay={i * 0.08}>
              <Link href={post.href} style={{ textDecoration: 'none', display: 'block' }}
                onMouseEnter={e => { const h = e.currentTarget.querySelector('h3') as HTMLElement; if (h) h.style.color = '#9b9b9b' }}
                onMouseLeave={e => { const h = e.currentTarget.querySelector('h3') as HTMLElement; if (h) h.style.color = '#0a0a0a' }}>
                <div className="img-hover" style={{ height: 280, marginBottom: 24 }}>
                  <img src={post.img} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <p className="label" style={{ marginBottom: 12 }}>{post.category} — {post.date}</p>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 400, lineHeight: 1.3, color: '#0a0a0a', marginBottom: 12, transition: 'color 0.3s' }}>{post.title}</h3>
                <p style={{ fontFamily: 'DM Sans', fontSize: 13, lineHeight: 1.7, color: '#888' }}>{post.excerpt}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  )
}
