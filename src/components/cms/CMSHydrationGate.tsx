'use client'

import { useEffect } from 'react'
import { useCMSStore } from '@/lib/cms-store'

/** Rehydrates persisted CMS after mount (skipHydration). Children always render. */
export function CMSHydrationGate({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    void useCMSStore.persist.rehydrate()
  }, [])
  return <>{children}</>
}
