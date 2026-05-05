'use client'

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { motion } from 'framer-motion'
import { RotateCcw, ZoomIn } from 'lucide-react'
import {
  SPIN360_FRAME_COUNT,
  SPIN360_INERTIA_DECAY,
  pxPerFrameSensitivity,
  spin360UrlForWidth,
} from '@/lib/spin360'

interface Props {
  frames: string[]
  productName: string
}

function useIsNarrowViewport() {
  return useSyncExternalStore(
    onStoreChange => {
      const mq = window.matchMedia('(max-width: 768px)')
      mq.addEventListener('change', onStoreChange)
      return () => mq.removeEventListener('change', onStoreChange)
    },
    () => window.matchMedia('(max-width: 768px)').matches,
    () => false,
  )
}

/** Deduped preload — one request when every frame shares the same hero URL. */
function usePreloadImages(urls: string[]) {
  const urlKey = urls.join('|')
  const unique = useMemo(() => [...new Set(urls.filter(Boolean))], [urlKey])
  const [loaded, setLoaded] = useState(0)

  useEffect(() => {
    setLoaded(0)
    if (unique.length === 0) return
    let cancelled = false
    let done = 0
    const bump = () => {
      if (cancelled) return
      done += 1
      setLoaded(done)
    }
    for (const src of unique) {
      const img = new Image()
      img.onload = bump
      img.onerror = bump
      img.src = src
    }
    return () => {
      cancelled = true
    }
  }, [unique])

  return {
    loaded,
    totalUnique: unique.length,
    allReady: unique.length === 0 || loaded >= unique.length,
  }
}

function wrapFrame(i: number, total: number) {
  const t = Math.max(total, 1)
  let x = Math.round(i) % t
  if (x < 0) x += t
  return x
}

export default function Product360Viewer({ frames, productName }: Props) {
  const narrow = useIsNarrowViewport()
  const targetW = narrow ? 200 : 800

  const total = frames.length > 0 ? frames.length : SPIN360_FRAME_COUNT
  const resolvedFrames = useMemo(() => {
    const list = frames.length > 0 ? frames : Array(SPIN360_FRAME_COUNT).fill('')
    return list.map(u => (u ? spin360UrlForWidth(u, targetW) : ''))
  }, [frames, targetW])

  const multiSource = useMemo(() => {
    const ok = resolvedFrames.filter(Boolean)
    return new Set(ok).size > 1
  }, [resolvedFrames])

  const { loaded, totalUnique, allReady } = usePreloadImages(resolvedFrames)

  const [frameIndex, setFrameIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const [hint, setHint] = useState(true)

  const floatIdx = useRef(0)
  const lastClientX = useRef(0)
  const lastStep = useRef(0)
  const velRef = useRef(0)
  const inertiaRaf = useRef<number | null>(null)
  const spinInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const pxPerFrame = pxPerFrameSensitivity()

  const frameKey = resolvedFrames.join('|')

  useEffect(() => {
    floatIdx.current = 0
    setFrameIndex(0)
  }, [frameKey])

  useEffect(() => {
    const t = setTimeout(() => setHint(false), 2200)
    return () => clearTimeout(t)
  }, [])

  const stopInertia = useCallback(() => {
    if (inertiaRaf.current != null) {
      cancelAnimationFrame(inertiaRaf.current)
      inertiaRaf.current = null
    }
    velRef.current = 0
  }, [])

  const syncFrameFromFloat = useCallback(() => {
    setFrameIndex(wrapFrame(floatIdx.current, total))
  }, [total])

  const startInertia = useCallback(() => {
    stopInertia()
    let v = velRef.current
    if (Math.abs(v) < 0.06) return

    const tick = () => {
      floatIdx.current += v
      syncFrameFromFloat()
      v *= SPIN360_INERTIA_DECAY
      if (Math.abs(v) < 0.018) {
        inertiaRaf.current = null
        velRef.current = 0
        return
      }
      inertiaRaf.current = requestAnimationFrame(tick)
    }
    inertiaRaf.current = requestAnimationFrame(tick)
  }, [stopInertia, syncFrameFromFloat])

  useEffect(
    () => () => {
      stopInertia()
      if (spinInterval.current) clearInterval(spinInterval.current)
    },
    [stopInertia],
  )

  useEffect(() => {
    if (spinInterval.current) {
      clearInterval(spinInterval.current)
      spinInterval.current = null
    }
    setIsSpinning(false)
  }, [frameKey])

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setIsDragging(true)
    stopInertia()
    lastClientX.current = e.clientX
    lastStep.current = 0
    velRef.current = 0
    if (spinInterval.current) {
      clearInterval(spinInterval.current)
      spinInterval.current = null
      setIsSpinning(false)
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    const dx = e.clientX - lastClientX.current
    lastClientX.current = e.clientX
    const step = -dx / pxPerFrame
    lastStep.current = step
    floatIdx.current += step
    syncFrameFromFloat()
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
    setIsDragging(false)
    velRef.current = lastStep.current * 6.5
    startInertia()
  }

  const onPointerCancel = (e: React.PointerEvent) => {
    setIsDragging(false)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
    stopInertia()
  }

  const progress = total > 1 ? (frameIndex / (total - 1)) * 100 : 0

  const toggleSpin = () => {
    if (isSpinning) {
      if (spinInterval.current) clearInterval(spinInterval.current)
      spinInterval.current = null
      setIsSpinning(false)
    } else {
      stopInertia()
      setIsSpinning(true)
      spinInterval.current = setInterval(() => {
        floatIdx.current += 0.35
        syncFrameFromFloat()
      }, 48)
    }
  }

  const src = resolvedFrames[frameIndex] || resolvedFrames[0] || ''
  const showSkeleton = !allReady && totalUnique > 0
  const degY = multiSource ? 0 : -(360 * frameIndex) / total
  const imgTransition = isDragging ? 'none' : 'transform 0.35s cubic-bezier(0.19, 1, 0.22, 1)'

  return (
    <div style={{ position: 'relative', userSelect: 'none' }}>
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        style={{
          position: 'relative',
          background: '#f5f2ec',
          aspectRatio: '1',
          overflow: 'hidden',
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'none',
          perspective: multiSource ? 'none' : 1000,
        }}
      >
        {showSkeleton && (
          <div
            className="spin360-shimmer"
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              pointerEvents: 'none',
            }}
            aria-hidden
          />
        )}

        {src ? (
          <motion.img
            src={src}
            alt={`${productName} — frame ${frameIndex + 1} of ${total}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: zoomed
                ? `scale(1.55) perspective(900px) rotateY(${degY}deg)`
                : `scale(1) perspective(900px) rotateY(${degY}deg)`,
              transition: `${imgTransition}, transform 0.4s ease`,
              opacity: allReady ? 1 : loaded > 0 ? 0.92 : 0,
              willChange: isDragging ? 'transform' : undefined,
            }}
            draggable={false}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', background: '#ebebeb' }} />
        )}

        {isSpinning && (
          <div
            style={{
              position: 'absolute',
              top: 16,
              right: 16,
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#0a0a0a',
              animation: 'pulse 0.8s ease-in-out infinite',
            }}
          />
        )}

        {hint && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              bottom: 20,
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(10,10,10,0.75)',
              color: '#fafaf8',
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 9,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              backdropFilter: 'blur(6px)',
              whiteSpace: 'nowrap',
              zIndex: 3,
            }}
          >
            <span style={{ fontSize: 14 }}>⟺</span> Drag to rotate 360°
          </motion.div>
        )}

        <div
          style={{
            position: 'absolute',
            top: 16,
            left: 16,
            background: '#0a0a0a',
            color: '#fafaf8',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.16em',
            padding: '5px 10px',
            zIndex: 3,
          }}
        >
          360°
        </div>

        {!allReady && totalUnique > 0 && (
          <div
            style={{
              position: 'absolute',
              bottom: 56,
              right: 16,
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 8,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.45)',
              zIndex: 3,
            }}
          >
            Loading {loaded}/{totalUnique}
          </div>
        )}
      </div>

      <div style={{ margin: '12px 0 0', padding: '0 4px' }}>
        <div
          style={{ position: 'relative', height: 2, background: '#ebebeb', cursor: 'pointer' }}
          onPointerDown={e => {
            e.stopPropagation()
            const el = e.currentTarget
            const apply = (clientX: number) => {
              const rect = el.getBoundingClientRect()
              const pct = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
              floatIdx.current = pct * (total - 1)
              syncFrameFromFloat()
            }
            apply(e.clientX)
            const move = (ev: PointerEvent) => apply(ev.clientX)
            const up = () => {
              window.removeEventListener('pointermove', move)
              window.removeEventListener('pointerup', up)
            }
            window.addEventListener('pointermove', move)
            window.addEventListener('pointerup', up)
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${progress}%`,
              background: '#0a0a0a',
              transition: 'width 0.05s',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: `${progress}%`,
              transform: 'translate(-50%,-50%)',
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: '#0a0a0a',
              border: '2px solid #fafaf8',
              boxShadow: '0 0 0 1px #0a0a0a',
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 8,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#9b9b9b',
            }}
          >
            Frame {frameIndex + 1}/{total}
          </span>
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontSize: 8,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#9b9b9b',
            }}
          >
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button
          type="button"
          onClick={toggleSpin}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '10px',
            border: '1px solid',
            borderColor: isSpinning ? '#0a0a0a' : '#ebebeb',
            background: isSpinning ? '#0a0a0a' : 'transparent',
            color: isSpinning ? '#fafaf8' : '#0a0a0a',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 9,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
        >
          <RotateCcw size={12} style={{ animation: isSpinning ? 'spin360-spin 1s linear infinite' : 'none' }} />
          {isSpinning ? 'Stop' : 'Auto Spin'}
        </button>
        <button
          type="button"
          onClick={() => setZoomed(z => !z)}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            padding: '10px',
            border: '1px solid',
            borderColor: zoomed ? '#0a0a0a' : '#ebebeb',
            background: zoomed ? '#0a0a0a' : 'transparent',
            color: zoomed ? '#fafaf8' : '#0a0a0a',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: 9,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.3s',
          }}
        >
          <ZoomIn size={12} />
          {zoomed ? 'Zoom Out' : 'Zoom In'}
        </button>
        <button
          type="button"
          onClick={() => {
            floatIdx.current = 0
            setFrameIndex(0)
            stopInertia()
          }}
          style={{
            padding: '10px 14px',
            border: '1px solid #ebebeb',
            background: 'transparent',
            cursor: 'pointer',
            transition: 'all 0.3s',
            color: '#0a0a0a',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = '#0a0a0a'
            e.currentTarget.style.color = '#fafaf8'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#0a0a0a'
          }}
          title="Reset"
        >
          <RotateCcw size={12} />
        </button>
      </div>
      <style>{`
        @keyframes spin360-spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
      `}</style>
    </div>
  )
}
