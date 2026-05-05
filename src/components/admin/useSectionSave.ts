'use client'

import { useCallback, useState } from 'react'

export function useSectionSave() {
  const [saving, setSaving] = useState(false)
  const [showCheck, setShowCheck] = useState(false)

  const runSave = useCallback(async (fn: () => void) => {
    setSaving(true)
    await new Promise<void>(r => setTimeout(r, 300))
    fn()
    setSaving(false)
    setShowCheck(true)
    setTimeout(() => setShowCheck(false), 1500)
  }, [])

  return { saving, showCheck, runSave }
}
