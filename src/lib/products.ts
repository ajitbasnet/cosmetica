/**
 * Product catalogue helpers — pass lists from `useCMSStore` + `DEFAULT_CMS_CONTENT` fallback.
 */
import type { CatalogCategory, Product } from '@/lib/cms-types'
import { SEED_CATALOG_CATEGORIES } from '@/lib/seed-catalog'

export type { Product, CatalogCategory } from '@/lib/cms-types'
export { SEED_PRODUCTS, SEED_CATALOG_CATEGORIES } from '@/lib/seed-catalog'

export function filterProductsByCategory(products: Product[], slug: string): Product[] {
  return products.filter(p => p.categorySlug === slug)
}

export function filterFeaturedProducts(products: Product[]): Product[] {
  return products.filter(p => p.featured)
}

export function findProductBySlug(products: Product[], slug: string): Product | null {
  return products.find(p => p.slug === slug) ?? null
}

/** Apply per-category id order; append any products missing from the order list */
export function orderProductsInCategory(
  products: Product[],
  categorySlug: string,
  orderMap: Record<string, string[]>,
): Product[] {
  const inCat = products.filter(p => p.categorySlug === categorySlug)
  const order = orderMap[categorySlug]
  if (!order?.length) return inCat
  const byId = new Map(inCat.map(p => [p.id, p]))
  const seen = new Set<string>()
  const ordered: Product[] = []
  for (const id of order) {
    const p = byId.get(id)
    if (p) {
      ordered.push(p)
      seen.add(id)
    }
  }
  for (const p of inCat) {
    if (!seen.has(p.id)) ordered.push(p)
  }
  return ordered
}

/** Default categories — prefer `useCMSStore(s => s.siteSettings.catalogCategories)` on client */
export const categories: CatalogCategory[] = SEED_CATALOG_CATEGORIES
