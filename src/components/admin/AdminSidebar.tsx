'use client'

import Link from 'next/link'
import { useCallback, useState } from 'react'
import { useAuthStore } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { ChevronDown, ChevronRight, LogOut, Shield } from 'lucide-react'

function SubLink({ section, current, label }: { section: string; current: string; label: string }) {
  const active = current === section
  return (
    <Link
      href={`/admin?section=${encodeURIComponent(section)}`}
      prefetch={false}
      style={{
        display: 'block',
        padding: '10px 20px 10px 32px',
        fontFamily: 'Montserrat, sans-serif',
        fontSize: 9,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#FFFFFF',
        background: active ? 'rgba(255, 255, 255, 0.18)' : 'transparent',
        borderLeft: active ? '2px solid #FFFFFF' : '2px solid transparent',
        textDecoration: 'none',
        transition: 'background 0.15s ease, color 0.15s ease',
      }}
    >
      {label}
    </Link>
  )
}

function Group({
  title,
  open,
  onToggle,
  children,
}: {
  title: string
  open: boolean
  onToggle: () => void
  children: React.ReactNode
}) {
  return (
    <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.28)' }}>
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 22px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#FFFFFF',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 10,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
        }}
      >
        {title}
        {open ? <ChevronDown size={14} color="#FFFFFF" /> : <ChevronRight size={14} color="#FFFFFF" />}
      </button>
      {open ? <div style={{ paddingBottom: 8 }}>{children}</div> : null}
    </div>
  )
}

export function AdminSidebar({ section }: { section: string }) {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [g, setG] = useState({
    pages: true,
    products: true,
    brandsNav: true,
    site: true,
    legacy: false,
    table: false,
  })
  const toggle = useCallback((k: keyof typeof g) => {
    setG(s => ({ ...s, [k]: !s[k] }))
  }, [])

  return (
    <aside
      style={{
        background: '#970747',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: 260,
        flexShrink: 0,
        borderRight: '1px solid rgba(255, 255, 255, 0.35)',
        position: 'sticky',
        top: 0,
        alignSelf: 'start',
      }}
    >
      <div style={{ padding: '28px 22px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.28)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ width: 36, height: 36, background: '#fafaf8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield size={16} color="#0a0a0a" />
          </div>
          <div>
            <p style={{ fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFFFFF' }}>CMS Admin</p>
            <p style={{ fontFamily: 'Montserrat', fontSize: 8, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#FFFFFF' }}>COSMÉTICA</p>
          </div>
        </div>
        {user ? <p style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#FFFFFF', marginTop: 6 }}>{user.email}</p> : null}
      </div>

      <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
        <Group title="Pages" open={g.pages} onToggle={() => toggle('pages')}>
          <p style={{ fontFamily: 'Montserrat', fontSize: 8, letterSpacing: '0.14em', color: '#FFFFFF', padding: '6px 22px' }}>Home</p>
          <SubLink section="home.hero" current={section} label="Hero" />
          <SubLink section="home.ticker" current={section} label="Ticker" />
          <SubLink section="home.awards" current={section} label="Awards" />
          <SubLink section="home.servicesSection" current={section} label="Services" />
          <SubLink section="home.featuredProducts" current={section} label="Featured products" />
          <SubLink section="home.weAre" current={section} label="We Are" />
          <SubLink section="home.caseStudies" current={section} label="Case studies" />
          <SubLink section="home.ctaBand" current={section} label="CTA band" />
          <p style={{ fontFamily: 'Montserrat', fontSize: 8, letterSpacing: '0.14em', color: '#FFFFFF', padding: '10px 22px 6px' }}>About</p>
          <SubLink section="about.hero" current={section} label="Hero" />
          <SubLink section="about.quote" current={section} label="Quote" />
          <SubLink section="about.principles" current={section} label="Principles" />
          <SubLink section="about.news" current={section} label="News" />
          <p style={{ fontFamily: 'Montserrat', fontSize: 8, letterSpacing: '0.14em', color: '#FFFFFF', padding: '10px 22px 6px' }}>Other pages</p>
          <SubLink section="page.expertise" current={section} label="Expertise" />
          <SubLink section="page.blog" current={section} label="Blog" />
          <SubLink section="page.contact" current={section} label="Contact" />
          <SubLink section="page.products" current={section} label="Products page copy" />
        </Group>

        <Group title="Products" open={g.products} onToggle={() => toggle('products')}>
          <SubLink section="products.catalog" current={section} label="Catalogue" />
          <SubLink section="products.order" current={section} label="Category order" />
        </Group>

        <Group title="Brands & navigation" open={g.brandsNav} onToggle={() => toggle('brandsNav')}>
          <SubLink section="brands" current={section} label="Brands" />
          <SubLink section="nav" current={section} label="Navigation" />
        </Group>

        <Group title="Site settings" open={g.site} onToggle={() => toggle('site')}>
          <SubLink section="site.logo" current={section} label="Logo & brand" />
          <SubLink section="site.footer" current={section} label="Footer" />
          <SubLink section="site.social" current={section} label="Social" />
          <SubLink section="site.cookie" current={section} label="Cookie banner" />
          <SubLink section="site.seo" current={section} label="SEO defaults" />
          <SubLink section="site.catalog" current={section} label="Catalog categories" />
        </Group>

        <Group title="Legacy" open={g.legacy} onToggle={() => toggle('legacy')}>
          <SubLink section="legacy.overview" current={section} label="Overview" />
          <SubLink section="legacy.users" current={section} label="Users" />
          <SubLink section="legacy.campaigns" current={section} label="Campaigns" />
        </Group>

        <Group title="Table" open={g.table} onToggle={() => toggle('table')}>
          <SubLink section="table.products" current={section} label="Products table" />
          <SubLink section="table.sales" current={section} label="Sales table" />
        </Group>
      </nav>

      <div style={{ padding: '18px 22px', borderTop: '1px solid rgba(255, 255, 255, 0.28)' }}>
        <button
          type="button"
          onClick={() => {
            logout()
            router.push('/')
          }}
          style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <LogOut size={14} color="#FFFFFF" />
          <span style={{ fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#FFFFFF' }}>Sign out</span>
        </button>
      </div>
    </aside>
  )
}
