'use client'

import { createContext, useCallback, useContext, useRef, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

interface ConfirmOpts {
  title: string
  message?: string
  danger?: boolean
  confirmLabel?: string
  cancelLabel?: string
}

interface ConfirmCtx {
  confirm: (opts: ConfirmOpts) => Promise<boolean>
}

const Ctx = createContext<ConfirmCtx | null>(null)

export function useConfirm() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useConfirm outside ConfirmDialogProvider')
  return v
}

export function ConfirmDialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [opts, setOpts] = useState<ConfirmOpts | null>(null)
  const resolveRef = useRef<((v: boolean) => void) | null>(null)

  const confirm = useCallback((o: ConfirmOpts) => {
    return new Promise<boolean>(resolve => {
      resolveRef.current = resolve
      setOpts(o)
      setOpen(true)
    })
  }, [])

  const finish = (v: boolean) => {
    setOpen(false)
    resolveRef.current?.(v)
    resolveRef.current = null
    setOpts(null)
  }

  return (
    <Ctx.Provider value={{ confirm }}>
      {children}
      <Dialog.Root open={open} onOpenChange={o => { if (!o) finish(false) }}>
        <Dialog.Portal>
          <Dialog.Overlay style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.55)', zIndex: 100001 }} />
          <Dialog.Content style={{
            position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
            background: '#fafaf8', padding: 40, maxWidth: 440, width: '90%', zIndex: 100002,
            border: '1px solid #ebebeb', boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
          }}>
            <Dialog.Title style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, marginBottom: 16, color: '#0a0a0a' }}>
              {opts?.title}
            </Dialog.Title>
            <Dialog.Description style={{ fontFamily: 'DM Sans', fontSize: 15, color: '#555', lineHeight: 1.6, marginBottom: 32 }}>
              {opts?.message}
            </Dialog.Description>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button type="button" className="btn-outline" onClick={() => finish(false)} style={{ padding: '10px 20px', cursor: 'pointer' }}>
                {opts?.cancelLabel ?? 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => finish(true)}
                style={{
                  padding: '10px 22px', cursor: 'pointer', fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase',
                  background: opts?.danger ? '#dc2626' : '#0a0a0a', color: '#fafaf8', border: '1px solid', borderColor: opts?.danger ? '#dc2626' : '#0a0a0a',
                  transition: 'opacity 0.3s ease',
                }}
              >
                {opts?.confirmLabel ?? 'Confirm'}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </Ctx.Provider>
  )
}
