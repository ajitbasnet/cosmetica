'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

type ToastKind = 'success' | 'error' | 'warning'

export interface ToastItem {
  id: string
  kind: ToastKind
  message: string
}

interface ToastCtx {
  push: (kind: ToastKind, message: string) => void
}

const Ctx = createContext<ToastCtx | null>(null)

export function useToast() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useToast outside ToastProvider')
  return v
}

const colors: Record<ToastKind, { bg: string; fg: string }> = {
  success: { bg: '#15803d', fg: '#fafaf8' },
  error: { bg: '#b91c1c', fg: '#fafaf8' },
  warning: { bg: '#ca8a04', fg: '#0a0a0a' },
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([])

  const push = useCallback((kind: ToastKind, message: string) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    setItems(t => [...t, { id, kind, message }])
    setTimeout(() => {
      setItems(t => t.filter(x => x.id !== id))
    }, 3000)
  }, [])

  return (
    <Ctx.Provider value={{ push }}>
      {children}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 100000, display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 360, pointerEvents: 'none' }}>
        <AnimatePresence>
          {items.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              style={{
                pointerEvents: 'auto',
                padding: '14px 18px',
                borderRadius: 0,
                background: colors[t.kind].bg,
                color: colors[t.kind].fg,
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 14,
                lineHeight: 1.45,
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              }}
            >
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  )
}
