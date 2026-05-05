'use client'
import { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'

// ── Context so any link can trigger the curtain ──────────────────────────────
const TransitionCtx = createContext<{ navigate: (href: string) => void }>({
  navigate: () => {},
})
export const usePageTransition = () => useContext(TransitionCtx)

// ── The black curtain overlay ─────────────────────────────────────────────────
export default function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const router      = useRouter()
  const pathname    = usePathname()
  // 'idle' | 'entering' | 'leaving'
  const [phase, setPhase]     = useState<'idle' | 'entering' | 'leaving'>('idle')
  const pendingHref = useRef<string | null>(null)
  const firstMount  = useRef(true)

  // On any real navigation, play the reveal (curtain slides UP to reveal page)
  useEffect(() => {
    if (firstMount.current) { firstMount.current = false; return }
    // New page has mounted → play curtain-UP reveal
    setPhase('entering')
    const t = setTimeout(() => setPhase('idle'), 700)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Called by TransitionLink → curtain drops DOWN, then we navigate
  const navigate = useCallback((href: string) => {
    if (href === pathname) return
    pendingHref.current = href
    setPhase('leaving')
    setTimeout(() => {
      router.push(href)
      // entering phase fires via pathname effect above
    }, 600)
  }, [pathname, router])

  // Curtain styles
  const curtainStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    height: '100vh',
    background: '#0a0a0a',
    zIndex: 99999,
    pointerEvents: phase === 'idle' ? 'none' : 'all',
    transformOrigin: 'top center',
    transform:
      phase === 'idle'    ? 'scaleY(0) translateY(-100%)'  :
      phase === 'leaving' ? 'scaleY(1) translateY(0%)'     :
                            'scaleY(1) translateY(0%)',     // entering: full cover, then slides up
    transition:
      phase === 'leaving'  ? 'transform 0.55s cubic-bezier(0.76, 0, 0.24, 1)' :
      phase === 'entering' ? 'transform 0.55s cubic-bezier(0.76, 0, 0.24, 1)' :
                             'none',
    // After entering begins → slide UP off screen
    ...(phase === 'entering' ? {
      transformOrigin: 'bottom center',
      transform: 'scaleY(0) translateY(-100%)',
    } : {}),
  }

  return (
    <TransitionCtx.Provider value={{ navigate }}>
      {/* Curtain overlay */}
      <div style={curtainStyle}>
        {/* Optional: logo mark shown on curtain */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <p style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 36, fontWeight: 400, letterSpacing: '0.2em',
            color: '#fafaf8', opacity: 0.25, textTransform: 'uppercase',
          }}>
            COSMÉTICA
          </p>
        </div>
      </div>
      {children}
    </TransitionCtx.Provider>
  )
}
