'use client'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { DEFAULT_CMS_CONTENT } from '@/lib/cms-defaults'
import { mergeDeep, sanitizeSvgMarkup } from '@/lib/cms-utils'
import type { AwardItem, BlogCMS, CMSPageKey, CMSStore, ContactCMS, ExpertiseCMS, HomePageCMS, Product } from '@/lib/cms-types'

function clone<T>(v: T): T {
  return structuredClone(v)
}

function normalizeAwards(items: AwardItem[]): AwardItem[] {
  return items.map(a => ({ ...a, logoSvg: sanitizeSvgMarkup(a.logoSvg) }))
}

type HomeSectionKey = keyof HomePageCMS

const HOME_RESET_KEYS: HomeSectionKey[] = [
  'hero',
  'ticker',
  'awards',
  'servicesSection',
  'featuredProducts',
  'weAre',
  'caseStudies',
  'ctaBand',
]

export const useCMSStore = create<CMSStore>()(
  persist(
    (set, get) => ({
      ...clone(DEFAULT_CMS_CONTENT),
      previewHighlight: null,

      updatePage: <K extends CMSPageKey>(page: K, data: Partial<(typeof DEFAULT_CMS_CONTENT.pages)[K]>) => {
        set(s => ({
          pages: {
            ...s.pages,
            [page]: mergeDeep(s.pages[page], data) as (typeof s.pages)[K],
          },
        }))
      },

      updateProduct: (id, data) => {
        set(s => ({ products: s.products.map(p => (p.id === id ? { ...p, ...data } : p)) }))
      },

      addProduct: product => {
        set(s => {
          const cat = product.categorySlug
          const fallback = s.products.filter(x => x.categorySlug === cat).map(x => x.id)
          const order = [...(s.productOrderByCategory[cat] ?? fallback)]
          if (!order.includes(product.id)) order.push(product.id)
          return {
            products: [...s.products, product],
            productOrderByCategory: { ...s.productOrderByCategory, [cat]: order },
          }
        })
      },

      deleteProduct: id => {
        set(s => ({
          products: s.products.filter(p => p.id !== id),
          pages: {
            ...s.pages,
            home: {
              ...s.pages.home,
              featuredProducts: s.pages.home.featuredProducts.filter(pid => pid !== id),
            },
          },
          productOrderByCategory: Object.fromEntries(
            Object.entries(s.productOrderByCategory).map(([slug, ids]) => [slug, ids.filter(i => i !== id)]),
          ),
        }))
      },

      duplicateProduct: id => {
        const p = get().products.find(x => x.id === id)
        if (!p) return
        const nid = `dup-${Date.now()}`
        const copy: Product = {
          ...clone(p),
          id: nid,
          slug: `${p.slug}-copy-${nid.slice(-6)}`,
          name: `${p.name} (Copy)`,
        }
        set(s => {
          const cat = p.categorySlug
          const fallback = s.products.filter(x => x.categorySlug === cat).map(x => x.id)
          const order = [...(s.productOrderByCategory[cat] ?? fallback)]
          const idx = order.indexOf(id)
          const nextOrder = idx >= 0 ? [...order.slice(0, idx + 1), nid, ...order.slice(idx + 1)] : [...order, nid]
          return {
            products: [...s.products, copy],
            productOrderByCategory: { ...s.productOrderByCategory, [cat]: nextOrder },
          }
        })
      },

      updateBrand: (id, data) => {
        set(s => ({ brands: s.brands.map(b => (b.id === id ? { ...b, ...data } : b)) }))
      },

      addBrand: brand => {
        set(s => ({ brands: [...s.brands, brand] }))
      },

      deleteBrand: id => {
        set(s => ({ brands: s.brands.filter(b => b.id !== id) }))
      },

      setBrands: brands => {
        set({ brands })
      },

      updateSiteSettings: data => {
        set(s => ({
          siteSettings: mergeDeep(s.siteSettings, data),
        }))
      },

      updateNav: data => {
        set(s => ({
          nav: mergeDeep(s.nav, data),
        }))
      },

      reorderProducts: (categorySlug, orderedIds) => {
        set(s => ({
          productOrderByCategory: { ...s.productOrderByCategory, [categorySlug]: orderedIds },
        }))
      },

      setPreviewHighlight: id => {
        set({ previewHighlight: id })
      },

      resetSection: path => {
        const parts = path.split('.')
        if (parts[0] === 'home' && parts.length === 2) {
          const key = parts[1] as HomeSectionKey
          if (!HOME_RESET_KEYS.includes(key)) return
          let slice = clone(DEFAULT_CMS_CONTENT.pages.home[key])
          if (key === 'awards') slice = normalizeAwards(slice as AwardItem[]) as (typeof DEFAULT_CMS_CONTENT.pages.home)[typeof key]
          set(s => ({
            pages: {
              ...s.pages,
              home: { ...s.pages.home, [key]: slice },
            },
          }))
          return
        }
        if (path === 'about.hero' || path === 'about.quote') {
          const key = path.split('.')[1] as 'hero' | 'quote'
          set(s => ({
            pages: {
              ...s.pages,
              about: { ...s.pages.about, [key]: clone(DEFAULT_CMS_CONTENT.pages.about[key]) },
            },
          }))
          return
        }
        if (path === 'about.principles') {
          set(s => ({
            pages: {
              ...s.pages,
              about: { ...s.pages.about, principles: clone(DEFAULT_CMS_CONTENT.pages.about.principles) },
            },
          }))
          return
        }
        if (path === 'about.news') {
          set(s => ({
            pages: {
              ...s.pages,
              about: {
                ...s.pages.about,
                news: clone(DEFAULT_CMS_CONTENT.pages.about.news),
                newsSectionEyebrow: DEFAULT_CMS_CONTENT.pages.about.newsSectionEyebrow,
                newsSectionTitle: DEFAULT_CMS_CONTENT.pages.about.newsSectionTitle,
              },
            },
          }))
          return
        }
        if (path === 'expertise') {
          set(s => ({ pages: { ...s.pages, expertise: clone(DEFAULT_CMS_CONTENT.pages.expertise) } }))
          return
        }
        if (path === 'blog') {
          set(s => ({ pages: { ...s.pages, blog: clone(DEFAULT_CMS_CONTENT.pages.blog) } }))
          return
        }
        if (path === 'contact') {
          set(s => ({ pages: { ...s.pages, contact: clone(DEFAULT_CMS_CONTENT.pages.contact) } }))
          return
        }
        if (path === 'products') {
          set(s => ({ pages: { ...s.pages, products: clone(DEFAULT_CMS_CONTENT.pages.products) } }))
          return
        }
        if (path === 'siteSettings') {
          set({ siteSettings: clone(DEFAULT_CMS_CONTENT.siteSettings) })
          return
        }
        if (path === 'nav') {
          set({ nav: clone(DEFAULT_CMS_CONTENT.nav) })
          return
        }
        if (path === 'brands') {
          set({ brands: clone(DEFAULT_CMS_CONTENT.brands) })
          return
        }
        if (path === 'productsCatalog') {
          set({
            products: clone(DEFAULT_CMS_CONTENT.products),
            productOrderByCategory: clone(DEFAULT_CMS_CONTENT.productOrderByCategory),
          })
        }
      },

      resetAllToDefaults: () => {
        set({ ...clone(DEFAULT_CMS_CONTENT), previewHighlight: null })
      },
    }),
    {
      name: 'cosmetica-cms',
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      version: 1,
      partialize: s => ({
        pages: s.pages,
        products: s.products,
        productOrderByCategory: s.productOrderByCategory,
        brands: s.brands,
        siteSettings: s.siteSettings,
        nav: s.nav,
      }),
    },
  ),
)

export function getDefaultPageSlice<K extends CMSPageKey>(page: K): (typeof DEFAULT_CMS_CONTENT.pages)[K] {
  return clone(DEFAULT_CMS_CONTENT.pages[page])
}

export function getDefaultContact(): ContactCMS {
  return clone(DEFAULT_CMS_CONTENT.pages.contact)
}

export function getDefaultBlog(): BlogCMS {
  return clone(DEFAULT_CMS_CONTENT.pages.blog)
}

export function getDefaultExpertise(): ExpertiseCMS {
  return clone(DEFAULT_CMS_CONTENT.pages.expertise)
}
