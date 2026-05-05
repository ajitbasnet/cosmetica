/** 36 frames @ 10° — swap URLs for CDN `frame_001.webp` … `frame_036.webp` when assets exist. */
export const SPIN360_FRAME_COUNT = 36

export const SPIN360_INERTIA_DECAY = 0.92

const PX_PER_FRAME = 14

export function pxPerFrameSensitivity() {
  return PX_PER_FRAME
}

/** Placeholder: repeat hero URL per frame (browser caches one response). Replace with real turntable URLs in CMS. */
export function buildSpin360FramesFromHero(heroUrl: string): string[] {
  return Array.from({ length: SPIN360_FRAME_COUNT }, () => heroUrl)
}

/**
 * Production CDN template: `https://cdn.example.com/sku/frame_{n}.webp` → frame_001 … frame_036
 */
export function buildSpin360FromTemplate(template: string, count = SPIN360_FRAME_COUNT): string[] {
  return Array.from({ length: count }, (_, i) =>
    template.replace(/\{n\}/g, String(i + 1).padStart(3, '0')),
  )
}

/** ~200px on mobile, ~800 desktop — Unsplash imgix params; pass through for other hosts. */
export function spin360UrlForWidth(url: string, width: number): string {
  try {
    const u = new URL(url)
    if (u.hostname === 'images.unsplash.com') {
      u.searchParams.set('w', String(width))
      u.searchParams.set('q', '85')
      u.searchParams.set('fm', 'webp')
    }
    return u.toString()
  } catch {
    return url
  }
}
