/** Strip script tags from admin-pasted SVG markup (admin-only surface). */
export function sanitizeSvgMarkup(input: string): string {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v)
}

export function mergeDeep<T extends object>(target: T, patch: Partial<T>): T {
  const out = { ...(target as Record<string, unknown>) }
  for (const key of Object.keys(patch) as Array<keyof T>) {
    const pv = patch[key]
    if (pv === undefined) continue
    const tv = (target as Record<string, unknown>)[key as string]
    if (isRecord(tv) && isRecord(pv)) {
      out[key as string] = mergeDeep(tv, pv as Partial<Record<string, unknown>>) as Record<string, unknown>
    } else {
      out[key as string] = pv
    }
  }
  return out as T
}
