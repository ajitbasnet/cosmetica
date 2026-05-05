/**
 * CMS content types — single source of truth for shape.
 * Product matches catalogue shape used across the app.
 */
export interface Product {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  categorySlug: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  description: string
  longDescription: string
  benefits: string[]
  howToUse: string
  ingredients: string
  badge?: string
  img: string
  imgs: string[]
  spin360: string[]
  variants: { label: string; value: string }[]
  inStock: boolean
  featured?: boolean
}

export interface Brand {
  id: string
  name: string
  description: string
  logo: string
  website?: string
}

export interface CatalogCategory {
  label: string
  slug: string
  desc: string
  img: string
}

export interface FooterColumn {
  title: string
  links: { label: string; href: string }[]
}

export interface SiteSettings {
  brandName: string
  brandTagline: string
  topStripText: string
  newsletterLabel: string
  newsletterHeadline: string
  newsletterSub: string
  newsletterThanks: string
  footerBrandName: string
  footerBrandTagline: string
  contactEmail: string
  contactAddress: string
  copyright: string
  footerColumns: FooterColumn[]
  socialInstagram: string
  socialLinkedin: string
  cookieLabel: string
  cookieBody: string
  cookiePrivacyLabel: string
  seoDefaultTitle: string
  seoDefaultDescription: string
  catalogCategories: CatalogCategory[]
}

export interface NavDropdownItem {
  label: string
  href: string
}

export interface NavItem {
  id: string
  label: string
  href: string
  hasDropdown: boolean
  items: NavDropdownItem[]
}

export interface NavCMS {
  items: NavItem[]
}

/** Home hero — matches admin + public contract */
export interface HomeHeroCMS {
  subheading: string
  heading: string
  bodyText: string
  ctaPrimaryLabel: string
  ctaPrimaryHref: string
  ctaSecondaryLabel: string
  ctaSecondaryHref: string
  backgroundImage: string
  overlayOpacity: number
  textColor: 'white' | 'black'
}

export interface AwardItem {
  id: string
  year: string
  title: string
  logoSvg: string
}

export interface ServiceCard {
  id: string
  num: string
  title: string
  desc: string
}

export interface CaseStudy {
  id: string
  brand: string
  title: string
  category: string
  img: string
  href: string
}

export interface HomeWeAreCMS {
  label: string
  heading: string
  ctaLabel: string
  ctaHref: string
  image: string
}

export interface HomeCaseStudiesSectionCMS {
  label: string
  heading: string
  viewMoreLabel: string
  viewMoreHref: string
  items: CaseStudy[]
}

export interface HomePageCMS {
  hero: HomeHeroCMS
  ticker: { items: string[] }
  awards: AwardItem[]
  servicesSection: {
    heading: string
    subheading: string
    items: ServiceCard[]
    ctaLabel: string
    ctaHref: string
  }
  featuredProducts: string[]
  weAre: HomeWeAreCMS
  caseStudies: HomeCaseStudiesSectionCMS
  ctaBand: { heading: string; buttonLabel: string; buttonHref: string }
}

export interface AboutHeroCMS {
  eyebrow: string
  heading: string
  bodyHtml: string
  image: string
}

export interface AboutQuoteCMS {
  label: string
  quote: string
  attributionName: string
  attributionTitle: string
  image: string
}

export interface PrincipleCard {
  id: string
  num: string
  title: string
  desc: string
}

export interface NewsItem {
  id: string
  type: string
  title: string
  href: string
}

export interface AboutPageCMS {
  hero: AboutHeroCMS
  quote: AboutQuoteCMS
  principles: PrincipleCard[]
  news: NewsItem[]
  newsSectionEyebrow: string
  newsSectionTitle: string
}

export interface ExpertiseStat {
  id: string
  num: string
  label: string
}

export interface BeautyCategory {
  id: string
  title: string
  desc: string
  img: string
}

export interface ExpertiseCMS {
  heroEyebrow: string
  heroHeading: string
  heroBody: string
  heroCtaLabel: string
  heroCtaHref: string
  heroImage: string
  stats: ExpertiseStat[]
  categoriesEyebrow: string
  categoriesHeading: string
  beautyCategories: BeautyCategory[]
  ctaHeading: string
  ctaBody: string
  ctaButtonLabel: string
  ctaButtonHref: string
}

export interface BlogPost {
  id: string
  category: string
  title: string
  date: string
  img: string
  excerpt: string
  href: string
}

export interface BlogCMS {
  headerEyebrow: string
  headerTitle: string
  featuredEyebrowPrefix: string
  posts: BlogPost[]
}

export interface ContactCMS {
  eyebrow: string
  heading: string
  emailLabel: string
  email: string
  findUsLabel: string
  address: string
  successHeading: string
  successBody: string
  formFirstNamePlaceholder: string
  formLastNamePlaceholder: string
  formEmailPlaceholder: string
  formCompanyPlaceholder: string
  formMessagePlaceholder: string
  submitLabel: string
}

export interface ProductsPageCMS {
  heroEyebrow: string
  heroTitle: string
  heroImage: string
  categoriesEyebrow: string
  categoriesTitle: string
  featuredEyebrow: string
  featuredTitle: string
  featuredViewAllLabel: string
  featuredViewAllHref: string
  categoryPageEyebrow: string
}

export interface CMSPages {
  home: HomePageCMS
  about: AboutPageCMS
  expertise: ExpertiseCMS
  blog: BlogCMS
  contact: ContactCMS
  products: ProductsPageCMS
}

export type CMSPageKey = keyof CMSPages

export interface CMSContentState {
  pages: CMSPages
  products: Product[]
  /** When set, category product order follows these ids; missing ids appended by default order */
  productOrderByCategory: Record<string, string[]>
  brands: Brand[]
  siteSettings: SiteSettings
  nav: NavCMS
  previewHighlight: string | null
}

export type CMSContentActions = {
  updatePage: <K extends CMSPageKey>(page: K, data: Partial<CMSPages[K]>) => void
  updateProduct: (id: string, data: Partial<Product>) => void
  addProduct: (product: Product) => void
  deleteProduct: (id: string) => void
  duplicateProduct: (id: string) => void
  updateBrand: (id: string, data: Partial<Brand>) => void
  addBrand: (brand: Brand) => void
  deleteBrand: (id: string) => void
  setBrands: (brands: Brand[]) => void
  updateSiteSettings: (data: Partial<SiteSettings>) => void
  updateNav: (data: Partial<NavCMS>) => void
  reorderProducts: (categorySlug: string, orderedIds: string[]) => void
  setPreviewHighlight: (id: string | null) => void
  resetSection: (path: string) => void
  /** Replace entire persisted slice with defaults (internal / dev) */
  resetAllToDefaults: () => void
}

export type CMSStore = CMSContentState & CMSContentActions
