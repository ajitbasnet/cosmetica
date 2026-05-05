import type { AwardItem, Brand, CMSContentState, NavItem } from '@/lib/cms-types'
import { SEED_CATALOG_CATEGORIES, SEED_PRODUCTS } from '@/lib/seed-catalog'

function buildProductOrderSeed(): Record<string, string[]> {
  const map: Record<string, string[]> = {}
  for (const cat of SEED_CATALOG_CATEGORIES) {
    map[cat.slug] = SEED_PRODUCTS.filter(p => p.categorySlug === cat.slug).map(p => p.id)
  }
  return map
}

const DEFAULT_AWARDS: AwardItem[] = [
  {
    id: 'award-1',
    year: '2025, 2024 & 2023',
    title: 'Digital Agency Of The Year',
    logoSvg: `<svg viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="0" y="30" font-family="Georgia, serif" font-size="24" font-weight="700" fill="#0a0a0a" letter-spacing="-0.5">NEXT</text><text x="60" y="30" font-family="Georgia, serif" font-size="20" font-weight="700" fill="#0a0a0a">GEN</text><text x="0" y="48" font-family="Georgia, serif" font-size="11" font-style="italic" fill="#0a0a0a">the</text><text x="18" y="48" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#0a0a0a" letter-spacing="0.3">PRNet</text></svg>`,
  },
  {
    id: 'award-2',
    year: '2025 & 2024',
    title: 'Best Social Media + Influencer Agency Finalist',
    logoSvg: `<svg viewBox="0 0 140 72" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="70" y="14" font-family="Arial, sans-serif" font-size="8" font-weight="400" fill="#0a0a0a" text-anchor="middle" letter-spacing="3">FINALIST</text><text x="2" y="26" font-family="Arial, sans-serif" font-size="7" font-weight="400" fill="#0a0a0a" letter-spacing="1.2">BEAUTYMATTER</text><text x="0" y="60" font-family="Georgia, serif" font-size="44" font-weight="800" fill="#0a0a0a" letter-spacing="-2">NEXT</text><text x="0" y="72" font-family="Arial, sans-serif" font-size="7" font-weight="300" fill="#0a0a0a" letter-spacing="0.8">AWARDS + SUMMIT</text></svg>`,
  },
  {
    id: 'award-3',
    year: '2023',
    title: 'Top 15 Boutique Agencies In The US',
    logoSvg: `<svg viewBox="0 0 168 58" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="0" y="28" font-family="Arial Black, Arial, sans-serif" font-size="27" font-weight="900" fill="#0a0a0a" letter-spacing="-0.3">BUSINESS</text><text x="0" y="54" font-family="Arial Black, Arial, sans-serif" font-size="27" font-weight="900" fill="#0a0a0a" letter-spacing="-0.3">INSIDER</text></svg>`,
  },
  {
    id: 'award-4',
    year: '2022',
    title: 'Best Social Media + Influencer Agency',
    logoSvg: `<svg viewBox="0 0 140 72" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="2" y="14" font-family="Arial, sans-serif" font-size="7" font-weight="400" fill="#0a0a0a" letter-spacing="1.2">BEAUTYMATTER</text><text x="0" y="58" font-family="Georgia, serif" font-size="44" font-weight="800" fill="#0a0a0a" letter-spacing="-2">NEXT</text><text x="0" y="72" font-family="Arial, sans-serif" font-size="7" font-weight="300" fill="#0a0a0a" letter-spacing="0.8">AWARDS</text></svg>`,
  },
  {
    id: 'award-5',
    year: '2021',
    title: 'Top 100 Agencies',
    logoSvg: `<svg viewBox="0 0 130 64" fill="none" xmlns="http://www.w3.org/2000/svg"><text x="0" y="20" font-family="Georgia, serif" font-size="15" font-style="italic" font-weight="400" fill="#0a0a0a">the</text><text x="28" y="20" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#0a0a0a" letter-spacing="0.3">PRNet</text><text x="0" y="54" font-family="Georgia, serif" font-size="38" font-weight="400" fill="#0a0a0a" letter-spacing="-1">100</text><text x="88" y="28" font-family="Arial, sans-serif" font-size="7" fill="#0a0a0a">2</text><text x="88" y="38" font-family="Arial, sans-serif" font-size="7" fill="#0a0a0a">0</text><text x="88" y="48" font-family="Arial, sans-serif" font-size="7" fill="#0a0a0a">2</text><text x="88" y="58" font-family="Arial, sans-serif" font-size="7" fill="#0a0a0a">1</text></svg>`,
  },
]

const DEFAULT_NAV_ITEMS: NavItem[] = [
  {
    id: 'nav-products',
    label: 'Products',
    href: '/products',
    hasDropdown: true,
    items: [
      { label: 'All Products', href: '/products' },
      { label: 'Skincare', href: '/products/skincare' },
      { label: 'Haircare', href: '/products/haircare' },
      { label: 'Make-Up', href: '/products/makeup' },
      { label: 'Brushes', href: '/products/brushes' },
      { label: 'Fragrance', href: '/products/fragrance' },
      { label: 'Body Care', href: '/products/bodycare' },
    ],
  },
  {
    id: 'nav-collections',
    label: 'Collections',
    href: '/products',
    hasDropdown: true,
    items: [
      { label: 'New Arrivals', href: '/products' },
      { label: 'Best Sellers', href: '/products' },
      { label: 'Gift Sets', href: '/products' },
    ],
  },
  {
    id: 'nav-about',
    label: 'About',
    href: '/about',
    hasDropdown: true,
    items: [
      { label: 'Our Story', href: '/about' },
      { label: 'Expertise', href: '/expertise' },
      { label: 'Journal', href: '/blog' },
    ],
  },
  { id: 'nav-journal', label: 'Journal', href: '/blog', hasDropdown: false, items: [] },
  { id: 'nav-contact', label: 'Contact', href: '/contact', hasDropdown: false, items: [] },
]

function defaultBrands(): Brand[] {
  const seen = new Set<string>()
  const out: Brand[] = []
  for (const p of SEED_PRODUCTS) {
    if (seen.has(p.brand)) continue
    seen.add(p.brand)
    out.push({
      id: `brand-${out.length + 1}`,
      name: p.brand,
      description: `Prestige beauty house behind ${p.name} and more.`,
      logo: p.img,
      website: 'https://example.com',
    })
  }
  return out
}

const featuredIds = SEED_PRODUCTS.filter(p => p.featured).slice(0, 6).map(p => p.id)

export const DEFAULT_CMS_CONTENT: CMSContentState = {
  previewHighlight: null,
  productOrderByCategory: buildProductOrderSeed(),
  products: structuredClone(SEED_PRODUCTS),
  brands: defaultBrands(),
  nav: { items: structuredClone(DEFAULT_NAV_ITEMS) },
  siteSettings: {
    brandName: 'COSMÉTICA',
    brandTagline: 'Prestige Beauty',
    topStripText: 'Prestige Beauty ★ Est. 2018',
    newsletterLabel: 'Newsletter',
    newsletterHeadline: "Don't Miss A Thing With COSMÉTICA®",
    newsletterSub: 'Expert Insights Direct To Your Inbox',
    newsletterThanks: "You're in! Thanks for subscribing!",
    footerBrandName: 'COSMÉTICA',
    footerBrandTagline: 'Prestige Beauty',
    contactEmail: 'hello@cosmetica.com',
    contactAddress: 'NYC / LA\n6 St Johns Ln\nNew York, NY 10013',
    copyright: '©2026 COSMÉTICA, LLC',
    footerColumns: [
      { title: 'Company', links: [{ label: 'About', href: '/about' }, { label: 'Expertise', href: '/expertise' }, { label: 'Contact', href: '/contact' }, { label: 'Blog', href: '/blog' }] },
      { title: 'Services', links: [{ label: 'Organic Social', href: '/services/organic-social' }, { label: 'Influencer Marketing', href: '/services/influencer-marketing' }, { label: 'Paid Social', href: '/services/paid-social' }, { label: 'Content Creation', href: '/services/content-creation' }] },
      { title: 'Work', links: [{ label: 'Case Studies', href: '/work/case-studies' }, { label: 'Portfolio', href: '/work/portfolio' }, { label: 'Login', href: '/login' }, { label: 'Sign Up', href: '/signup' }] },
    ],
    socialInstagram: 'https://instagram.com',
    socialLinkedin: 'https://linkedin.com',
    cookieLabel: '(Cookie Policy)',
    cookieBody: 'We use cookies to enhance site navigation, analyze site usage, and assist in our marketing efforts.',
    cookiePrivacyLabel: 'View our Privacy Policy',
    seoDefaultTitle: 'COSMÉTICA | The Social-First Beauty Agency',
    seoDefaultDescription: 'The social-first agency for prestige beauty. Social, influence, commerce — built to work together, designed to move your brand forward.',
    catalogCategories: structuredClone(SEED_CATALOG_CATEGORIES),
  },
  pages: {
    home: {
      hero: {
        subheading: 'We Are',
        heading: 'The social-first agency for prestige beauty.',
        bodyText:
          'Social is the world your brand lives in — where content, commerce, and influence intersect. We build social-first ecosystems powered by the creators and tastemakers who shape beauty.',
        ctaPrimaryLabel: 'About Us',
        ctaPrimaryHref: '/about',
        ctaSecondaryLabel: 'Get In Touch',
        ctaSecondaryHref: '/contact',
        backgroundImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1400&q=90',
        overlayOpacity: 0.55,
        textColor: 'white',
      },
      ticker: {
        items: [
          'Social-First Beauty Agency',
          'Prestige Beauty',
          'Influencer Marketing',
          'Content Creation',
        ],
      },
      awards: structuredClone(DEFAULT_AWARDS),
      servicesSection: {
        subheading: 'What We Do',
        heading: 'Social, influence, commerce —\nbuilt to work together.',
        items: [
          { id: 'svc-1', num: '01', title: 'Organic Social', desc: 'Building community through authentic content and strategic storytelling that resonates with prestige beauty consumers.' },
          { id: 'svc-2', num: '02', title: 'Influencer Marketing', desc: 'Connecting your brand with the creators, experts and tastemakers who shape modern beauty culture.' },
          { id: 'svc-3', num: '03', title: 'Paid Social', desc: 'Data-driven campaigns engineered to scale revenue without sacrificing brand integrity.' },
          { id: 'svc-4', num: '04', title: 'Content Creation', desc: 'Visual storytelling that captures the essence of prestige beauty — beautifully shot, culturally fluent.' },
        ],
        ctaLabel: 'Our Services',
        ctaHref: '/services',
      },
      featuredProducts: featuredIds,
      weAre: {
        label: 'We Are COSMÉTICA',
        heading: 'Social-first, beauty-fluent, influence-led.',
        ctaLabel: 'Our Expertise',
        ctaHref: '/expertise',
        image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80',
      },
      caseStudies: {
        label: 'Case Studies',
        heading: "Work We're Proud Of",
        viewMoreLabel: 'View More Work',
        viewMoreHref: '/work/case-studies',
        items: [
          { id: 'cs-1', brand: 'Lumière Paris', title: 'Hero Product Launch — 3.2M Impressions', category: 'Influencer Marketing', img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80', href: '/work/case-studies/detail' },
          { id: 'cs-2', brand: 'Maison Éclat', title: 'A Social Refresh for a Heritage Brand', category: 'Organic Social', img: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80', href: '/work/case-studies/detail' },
          { id: 'cs-3', brand: 'Velours Beauty', title: 'A Breakout Fragrance Launch', category: 'Paid Social', img: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80', href: '/work/case-studies/detail' },
        ],
      },
      ctaBand: {
        heading: 'Ready to grow your prestige beauty brand?',
        buttonLabel: 'Get In Touch',
        buttonHref: '/contact',
      },
    },
    about: {
      hero: {
        eyebrow: 'About Us',
        heading: 'Made For Prestige Beauty',
        bodyHtml:
          "COSMÉTICA was founded with a clear mission: to build an agency for prestige beauty that empowers brands to thrive in a social-first world.<br /><br />We're not an influencer-only shop or a full-service machine. We're a team of beauty specialists and social-first experts — deeply invested in the work and the brands behind it.",
        image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=900&q=80',
      },
      quote: {
        label: 'Who We Are',
        quote:
          'In prestige beauty, the brands redefining the space are taking a social-first approach — leveraging the power of social and influence to build community, deepen loyalty, drive sales, and create enduring brand equity.',
        attributionName: 'Elena Moreau',
        attributionTitle: 'Founder & CEO',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
      },
      principles: [
        { id: 'p1', num: '01', title: 'A Higher Standard', desc: 'We are results oriented, goal driven, and always raising the bar. We believe in "kaizen" — the art of perfection and continuous improvement.' },
        { id: 'p2', num: '02', title: 'Beauty at the Core', desc: "Beauty is not surface. It's our lens, our language, and the foundation of everything we create." },
        { id: 'p3', num: '03', title: 'Always Leading, Never Following', desc: "We don't just know what's happening now. We know what's coming next." },
        { id: 'p4', num: '04', title: 'Relationships Driven', desc: 'From clients to influencers to makeup artists, our long-standing relationships have fostered a network of friends and insiders.' },
        { id: 'p5', num: '05', title: 'Professional Always', desc: 'Our dedication to professionalism means we are reliable, dependable, and accountable.' },
      ],
      newsSectionEyebrow: 'Latest',
      newsSectionTitle: 'News & Accolades',
      news: [
        { id: 'n1', type: 'News', title: 'Founder Shares Insights on the Future of Beauty Marketing', href: '#' },
        { id: 'n2', type: 'News', title: 'Named One of The Best Agencies Working in Beauty in 2025', href: '#' },
        { id: 'n3', type: 'News', title: 'Founder Featured in Vogue Business On How AI Will Change Beauty', href: '#' },
        { id: 'n4', type: 'Award', title: 'Named Best Digital Agency for Third Year in a Row', href: '#' },
      ],
    },
    expertise: {
      heroEyebrow: 'Our Expertise',
      heroHeading: 'Beauty-Fluent.\nSocial-First.',
      heroBody:
        "We don't just understand beauty — we live it. Our team brings deep category expertise across every prestige beauty vertical, from skincare to fragrance to haircare.",
      heroCtaLabel: 'Work With Us',
      heroCtaHref: '/contact',
      heroImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&q=80',
      stats: [
        { id: 's1', num: '150+', label: 'Prestige Beauty Brands' },
        { id: 's2', num: '8B+', label: 'Organic Impressions Generated' },
        { id: 's3', num: '12K+', label: 'Creator Relationships' },
        { id: 's4', num: '96%', label: 'Client Retention Rate' },
      ],
      categoriesEyebrow: 'Categories',
      categoriesHeading: 'Every Corner of Beauty',
      beautyCategories: [
        { id: 'bc-sk', title: 'Skincare', desc: 'From serums to SPF, we understand the science and storytelling behind high-performance skincare.', img: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80' },
        { id: 'bc-mk', title: 'Makeup', desc: 'Color cosmetics, textures, finishes — we speak the language of beauty consumers fluently.', img: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&q=80' },
        { id: 'bc-fr', title: 'Fragrance', desc: 'The most personal of all beauty categories. We craft narratives that connect scent to emotion.', img: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80' },
        { id: 'bc-hc', title: 'Haircare', desc: 'Prestige hair tools and treatments demand a sophisticated social-first approach we excel at.', img: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80' },
        { id: 'bc-wl', title: 'Wellness', desc: 'Ingestibles, supplements, and the beauty-from-within space at the intersection of beauty and health.', img: 'https://images.unsplash.com/photo-1607006483224-46ab71bbeabc?w=600&q=80' },
        { id: 'bc-bb', title: 'Body & Bath', desc: 'Luxury rituals, sensorial experiences and self-care — categories built for social storytelling.', img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80' },
      ],
      ctaHeading: 'Ready to elevate your beauty brand on social?',
      ctaBody: "Let's talk about how we can help your brand grow — without compromising what makes it distinct.",
      ctaButtonLabel: 'Get In Touch',
      ctaButtonHref: '/contact',
    },
    blog: {
      headerEyebrow: 'O-Word',
      headerTitle: 'Insights for prestige beauty brands.',
      featuredEyebrowPrefix: 'Featured',
      posts: [
        { id: 'post-1', category: 'Trend Report', title: 'The Rise of Quiet Luxury in Prestige Beauty Marketing', date: 'April 2026', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80', excerpt: 'How less-is-more aesthetics are reshaping the way prestige beauty brands communicate on social platforms.', href: '/blog/post' },
        { id: 'post-2', category: 'Insights', title: 'Micro-Influencer vs. Macro: What the Data Actually Says', date: 'March 2026', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80', excerpt: 'A deep dive into campaign performance data across 200+ beauty brand partnerships.', href: '/blog/post' },
        { id: 'post-3', category: 'Strategy', title: 'Building a Creator-Led Affiliate Program That Actually Converts', date: 'March 2026', img: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=800&q=80', excerpt: 'The step-by-step framework our team uses to launch affiliate programs for prestige beauty clients.', href: '/blog/post' },
        { id: 'post-4', category: 'Trend Report', title: 'TikTok Shop and the Future of Beauty Commerce', date: 'February 2026', img: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80', excerpt: "Social commerce is reshaping the path to purchase. Here's how to position your brand.", href: '/blog/post' },
        { id: 'post-5', category: 'Insights', title: 'Why Fragrance Is the Most Exciting Category on Social Right Now', date: 'February 2026', img: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=80', excerpt: 'Scent storytelling on social media has unlocked a new era for fragrance brands.', href: '/blog/post' },
        { id: 'post-6', category: 'Strategy', title: 'Paid Social for Prestige Beauty: A Framework for Brand-Safe Scaling', date: 'January 2026', img: 'https://images.unsplash.com/photo-1607006483224-46ab71bbeabc?w=800&q=80', excerpt: "Performance marketing without sacrificing brand equity — the delicate balance we've mastered.", href: '/blog/post' },
      ],
    },
    contact: {
      eyebrow: 'Contact Us',
      heading: 'Get In Touch',
      emailLabel: 'Email',
      email: 'hello@cosmetica.com',
      findUsLabel: 'Find Us',
      address: 'NYC / LA\n6 St Johns Ln\nNew York, NY 10013',
      successHeading: "We've received your message!",
      successBody: 'A senior member of our team will be in touch within 1–2 business days.',
      formFirstNamePlaceholder: 'First Name *',
      formLastNamePlaceholder: 'Last Name *',
      formEmailPlaceholder: 'Email *',
      formCompanyPlaceholder: 'Company',
      formMessagePlaceholder: 'How Can We Help?',
      submitLabel: 'Send Message',
    },
    products: {
      heroEyebrow: 'Our Collection',
      heroTitle: 'Prestige Beauty, Curated For You',
      heroImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&q=90',
      categoriesEyebrow: 'Shop By Category',
      categoriesTitle: 'Every Corner of Beauty',
      featuredEyebrow: 'Handpicked',
      featuredTitle: 'Best Sellers',
      featuredViewAllLabel: 'View All Products',
      featuredViewAllHref: '/products/skincare',
      categoryPageEyebrow: 'Products',
    },
  },
}
