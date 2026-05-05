'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '@/lib/auth'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async () => {
    if (!email || !password) { setError('Please fill in all fields'); return }
    setLoading(true); setError('')
    await new Promise(r => setTimeout(r, 600))
    const result = login(email, password)
    if (result.success) {
      const user = useAuthStore.getState().user
      router.push(user?.role === 'admin' ? '/admin' : '/dashboard')
    } else {
      setError(result.message)
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* Image Side */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1200&q=85" alt="Beauty" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 64 }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 48, fontWeight: 300, color: '#fafaf8', lineHeight: 1.1 }}>
            The social-first agency for prestige beauty.
          </p>
        </div>
      </div>

      {/* Form Side */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 80 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ width: '100%', maxWidth: 400 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, letterSpacing: '0.1em', color: '#0a0a0a', marginBottom: 48 }}>COSMÉTICA</p>
          </Link>
          <p className="label" style={{ marginBottom: 12 }}>Welcome Back</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 48, fontWeight: 400, marginBottom: 48 }}>Sign In</h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <input type="email" placeholder="Email Address" className="input-field" value={email} onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} placeholder="Password" className="input-field" value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
              <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9b9b9b' }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && <p style={{ fontFamily: 'Montserrat', fontSize: 10, color: '#c0392b', letterSpacing: '0.1em' }}>{error}</p>}
            <button onClick={handleSubmit} className="btn-primary" disabled={loading} style={{ width: '100%', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>

          <p style={{ fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9b9b9b', marginTop: 32, textAlign: 'center' }}>
            Don&apos;t have an account?{' '}
            <Link href="/signup" style={{ color: '#0a0a0a', textDecoration: 'underline' }}>Sign Up</Link>
          </p>

          <div style={{ marginTop: 32, padding: '20px', background: '#f5f2ec', fontSize: 11, fontFamily: 'Montserrat', letterSpacing: '0.08em', color: '#666' }}>
            <p style={{ marginBottom: 6 }}>Demo Accounts:</p>
            <p>Admin: admin@cosmetica.com / admin123</p>
            <p>User: jane@example.com / password123</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
