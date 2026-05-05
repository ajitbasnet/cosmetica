'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth'
import { ToastProvider } from '@/components/admin/ToastProvider'
import { ConfirmDialogProvider } from '@/components/admin/ConfirmDialog'
import '@/components/admin/tokens.css'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = useAuthStore(s => s.user)
  const router = useRouter()

  useEffect(() => {
    if (!user) router.replace('/login')
    else if (user.role !== 'admin') router.replace('/dashboard')
  }, [user, router])

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans', fontSize: 14, color: '#666' }}>
        Checking access…
      </div>
    )
  }

  return (
    <ConfirmDialogProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </ConfirmDialogProvider>
  )
}
