'use client'

import { Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { HeroEditor } from '@/components/admin/editors/HeroEditor'
import { TickerEditor } from '@/components/admin/editors/TickerEditor'
import { AwardEditor } from '@/components/admin/editors/AwardEditor'
import { ServicesEditor } from '@/components/admin/editors/ServicesEditor'
import { FeaturedProductsEditor } from '@/components/admin/editors/FeaturedProductsEditor'
import { CTABandEditor } from '@/components/admin/editors/CTABandEditor'
import { AboutSectionEditor } from '@/components/admin/editors/AboutSectionEditor'
import { ExpertiseEditor, BlogEditor, ContactEditor, ProductsPageEditor } from '@/components/admin/editors/MiscPageEditors'
import { SiteSettingsEditor } from '@/components/admin/editors/SiteSettingsEditor'
import { NavEditor } from '@/components/admin/editors/NavEditor'
import { BrandsEditor } from '@/components/admin/editors/BrandsEditor'
import { ProductsTable } from '@/components/admin/products/ProductsTable'
import { ProductOrderEditor } from '@/components/admin/products/ProductOrderEditor'
import { SalesTable } from '@/components/admin/products/SalesTable'
import { LegacyAdminPanel, type LegacyTab } from '@/components/admin/LegacyAdminPanel'
import { WeAreEditor, CaseStudiesEditor } from '@/components/admin/editors/HomeMoreEditors'

function resolveLegacy(section: string): LegacyTab | null {
  if (section === 'legacy.overview') return 'overview'
  if (section === 'legacy.users') return 'users'
  if (section === 'legacy.campaigns') return 'campaigns'
  return null
}

function AdminSections() {
  const sp = useSearchParams()
  const section = sp.get('section') ?? 'home.hero'

  const main = useMemo(() => {
    const legacy = resolveLegacy(section)
    if (legacy) return <LegacyAdminPanel tab={legacy} />

    switch (section) {
      case 'home.hero':
        return <HeroEditor />
      case 'home.ticker':
        return <TickerEditor />
      case 'home.awards':
        return <AwardEditor />
      case 'home.servicesSection':
        return <ServicesEditor />
      case 'home.featuredProducts':
        return <FeaturedProductsEditor />
      case 'home.weAre':
        return <WeAreEditor />
      case 'home.caseStudies':
        return <CaseStudiesEditor />
      case 'home.ctaBand':
        return <CTABandEditor />
      case 'about.hero':
        return <AboutSectionEditor part="hero" />
      case 'about.quote':
        return <AboutSectionEditor part="quote" />
      case 'about.principles':
        return <AboutSectionEditor part="principles" />
      case 'about.news':
        return <AboutSectionEditor part="news" />
      case 'page.expertise':
        return <ExpertiseEditor />
      case 'page.blog':
        return <BlogEditor />
      case 'page.contact':
        return <ContactEditor />
      case 'page.products':
        return <ProductsPageEditor />
      case 'products.catalog':
        return <ProductsTable />
      case 'products.order':
        return <ProductOrderEditor />
      case 'table.products':
        return <ProductsTable />
      case 'table.sales':
        return <SalesTable />
      case 'brands':
        return <BrandsEditor />
      case 'nav':
        return <NavEditor />
      case 'site.logo':
        return <SiteSettingsEditor tab="logo" />
      case 'site.footer':
        return <SiteSettingsEditor tab="footer" />
      case 'site.social':
        return <SiteSettingsEditor tab="social" />
      case 'site.cookie':
        return <SiteSettingsEditor tab="cookie" />
      case 'site.seo':
        return <SiteSettingsEditor tab="seo" />
      case 'site.catalog':
        return <SiteSettingsEditor tab="catalog" />
      default:
        return <HeroEditor />
    }
  }, [section])

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '100vh', background: '#fafaf8' }}>
      <AdminSidebar section={section} />
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>
        {main}
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div style={{ padding: 48, fontFamily: 'DM Sans', color: '#666' }}>Loading admin…</div>}>
      <AdminSections />
    </Suspense>
  )
}
