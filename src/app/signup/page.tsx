'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '@/lib/auth'

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuthStore()
  const router = useRouter()

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.password) { setError('Please fill in all fields'); return }
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true); setError('')
    await new Promise(r => setTimeout(r, 600))
    const result = signup(form.name, form.email, form.password)
    if (result.success) router.push('/dashboard')
    else setError(result.message)
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&q=85" alt="Beauty" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.35)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 64 }}>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 44, fontWeight: 300, color: '#fafaf8', lineHeight: 1.15 }}>
            Join the world of prestige beauty.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 80 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ width: '100%', maxWidth: 400 }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, letterSpacing: '0.1em', color: '#0a0a0a', marginBottom: 48 }}>COSMÉTICA</p>
          </Link>
          <p className="label" style={{ marginBottom: 12 }}>Get Started</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 48, fontWeight: 400, marginBottom: 48 }}>Create Account</h1>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <input placeholder="Full Name *" className="input-field" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            <input type="email" placeholder="Email Address *" className="input-field" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            <div style={{ position: 'relative' }}>
              <input type={showPass ? 'text' : 'password'} placeholder="Password *" className="input-field" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
              <button onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9b9b9b' }}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <input type="password" placeholder="Confirm Password *" className="input-field" value={form.confirm} onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
            {error && <p style={{ fontFamily: 'Montserrat', fontSize: 10, color: '#c0392b', letterSpacing: '0.1em' }}>{error}</p>}
            <button onClick={handleSubmit} className="btn-primary" disabled={loading} style={{ width: '100%', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>

          <p style={{ fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9b9b9b', marginTop: 32, textAlign: 'center' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#0a0a0a', textDecoration: 'underline' }}>Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
