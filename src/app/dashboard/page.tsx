'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuthStore } from '@/lib/auth'
import { LayoutDashboard, FileText, Heart, Bell, Settings, LogOut, TrendingUp, Eye, Share2, Star, ChevronRight, User } from 'lucide-react'

const metrics = [
  { label: 'Campaigns Active', value: '3', change: '+1 this month', icon: TrendingUp },
  { label: 'Content Views', value: '48.2K', change: '+12% vs last month', icon: Eye },
  { label: 'Engagements', value: '3,841', change: '+8.4% growth', icon: Share2 },
  { label: 'Saved Resources', value: '12', change: '2 new articles', icon: Heart },
]

const recentActivity = [
  { action: 'Campaign "Spring Launch" updated', time: '2 hours ago', type: 'campaign' },
  { action: 'New case study published: Lumière Paris', time: '1 day ago', type: 'content' },
  { action: 'Monthly report available for download', time: '3 days ago', type: 'report' },
  { action: 'Influencer brief approved by team', time: '5 days ago', type: 'approval' },
]

const savedArticles = [
  { title: 'The Rise of Quiet Luxury in Beauty Marketing', category: 'Trend Report', date: 'April 2026' },
  { title: 'Micro-Influencer vs. Macro: What the Data Says', category: 'Insights', date: 'March 2026' },
  { title: 'Building a Creator-Led Affiliate Program', category: 'Strategy', date: 'March 2026' },
]

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
  { icon: TrendingUp, label: 'Campaigns', id: 'campaigns' },
  { icon: FileText, label: 'Reports', id: 'reports' },
  { icon: Heart, label: 'Saved', id: 'saved' },
  { icon: Bell, label: 'Notifications', id: 'notifications' },
  { icon: Settings, label: 'Settings', id: 'settings' },
]

export default function DashboardPage() {
  const { user, logout } = useAuthStore()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    if (!user) router.push('/login')
  }, [user, router])

  if (!user) return null

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '260px 1fr', background: '#fafaf8' }}>
      {/* Sidebar */}
      <aside style={{ background: '#62664B', padding: '40px 0', display: 'flex', flexDirection: 'column', position: 'sticky', top: 80, height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
        <div style={{ padding: '0 28px 40px', borderBottom: '1px solid rgba(255, 255, 255, 0.25)' }}>
          <div style={{ width: 48, height: 48, background: '#fafaf8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
            <User size={20} color="#0a0a0a" />
          </div>
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, color: '#ffffff', marginBottom: 4 }}>{user.name}</p>
          <p style={{ fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#ffffff' }}>{user.email}</p>
          <span style={{ display: 'inline-block', marginTop: 10, fontFamily: 'Montserrat', fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', background: 'rgba(255, 255, 255, 0.18)', color: '#ffffff', padding: '4px 10px' }}>
            Client
          </span>
        </div>

        <nav style={{ padding: '24px 0', flex: 1 }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 28px', background: activeTab === item.id ? 'rgba(255, 255, 255, 0.18)' : 'transparent',
                border: 'none', cursor: 'pointer', transition: 'background 0.2s',
                borderLeft: activeTab === item.id ? '2px solid #ffffff' : '2px solid transparent',
              }}>
              <item.icon size={15} color="#ffffff" />
              <span style={{ fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#ffffff' }}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div style={{ padding: '24px 28px', borderTop: '1px solid rgba(255, 255, 255, 0.25)' }}>
          <button onClick={() => { logout(); router.push('/') }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer' }}>
            <LogOut size={14} color="#ffffff" />
            <span style={{ fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#ffffff' }}>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ padding: '48px 64px', overflowY: 'auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ marginBottom: 48 }}>
            <p className="label" style={{ marginBottom: 8 }}>Dashboard</p>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 48, fontWeight: 400 }}>
              Welcome back, {user.name.split(' ')[0]}.
            </h1>
          </div>

          {/* Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, marginBottom: 48 }}>
            {metrics.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                whileHover={{ backgroundColor: '#f5f2ec' }}
                style={{ background: '#fafaf8', border: '1px solid #ebebeb', padding: '32px 28px', transition: 'background 0.3s' }}>
                <m.icon size={16} color="#9b9b9b" style={{ marginBottom: 16 }} />
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, fontWeight: 400, marginBottom: 4 }}>{m.value}</p>
                <p className="label" style={{ marginBottom: 8 }}>{m.label}</p>
                <p style={{ fontFamily: 'DM Sans', fontSize: 12, color: '#9b9b9b' }}>{m.change}</p>
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Activity */}
            <div style={{ background: '#fafaf8', border: '1px solid #ebebeb', padding: '32px' }}>
              <p className="label" style={{ marginBottom: 24 }}>Recent Activity</p>
              {recentActivity.map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '16px 0', borderBottom: i < recentActivity.length - 1 ? '1px solid #ebebeb' : 'none', gap: 24 }}>
                  <p style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#333', lineHeight: 1.5 }}>{a.action}</p>
                  <p style={{ fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.1em', color: '#9b9b9b', whiteSpace: 'nowrap' }}>{a.time}</p>
                </motion.div>
              ))}
            </div>

            {/* Saved Articles */}
            <div style={{ background: '#fafaf8', border: '1px solid #ebebeb', padding: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <p className="label">Saved Articles</p>
                <Link href="/blog" style={{ fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#9b9b9b', textDecoration: 'none' }}>View All</Link>
              </div>
              {savedArticles.map((a, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.07 }}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < savedArticles.length - 1 ? '1px solid #ebebeb' : 'none', cursor: 'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.paddingLeft = '8px')}
                  onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0')}>
                  <div>
                    <p style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#0a0a0a', marginBottom: 4, lineHeight: 1.4 }}>{a.title}</p>
                    <p className="label">{a.category} — {a.date}</p>
                  </div>
                  <ChevronRight size={14} color="#9b9b9b" />
                </motion.div>
              ))}
            </div>

            {/* Quick Links */}
            <div style={{ background: '#888870', padding: '32px', gridColumn: '1 / -1' }}>
              <p className="label" style={{ color: '#ffffff', marginBottom: 24 }}>Quick Actions</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
                {[
                  { label: 'View Services', href: '/services', icon: Star },
                  { label: 'Case Studies', href: '/work/case-studies', icon: FileText },
                  { label: 'Blog & Insights', href: '/blog', icon: TrendingUp },
                  { label: 'Contact Team', href: '/contact', icon: Bell },
                ].map((item, i) => (
                  <Link key={i} href={item.href}
                    style={{ textDecoration: 'none', background: 'rgba(255, 255, 255, 0.14)', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 12, transition: 'background 0.3s' }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.24)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.14)')}>
                    <item.icon size={16} color="#ffffff" />
                    <span style={{ fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#ffffff' }}>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
