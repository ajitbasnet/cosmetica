'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuthStore } from '@/lib/auth'
import { ChevronUp, ChevronDown, Search, Eye, Edit, Trash2, Plus, X } from 'lucide-react'

const allUsers = [
  { id: '1', name: 'Jane Smith', email: 'jane@example.com', role: 'user', status: 'Active', joined: 'Jan 15, 2024', campaigns: 3 },
  { id: '2', name: 'Marc Dubois', email: 'marc@lumiere.com', role: 'user', status: 'Active', joined: 'Feb 2, 2024', campaigns: 5 },
  { id: '3', name: 'Sofia Rossi', email: 'sofia@maisoneclat.com', role: 'user', status: 'Inactive', joined: 'Mar 8, 2024', campaigns: 1 },
  { id: '4', name: 'Emma Wilson', email: 'emma@velours.com', role: 'user', status: 'Active', joined: 'Apr 1, 2024', campaigns: 7 },
  { id: '5', name: 'Lena Müller', email: 'lena@aurore.com', role: 'user', status: 'Active', joined: 'May 12, 2024', campaigns: 2 },
]

const campaigns = [
  { id: '1', name: 'Spring Skincare Launch', client: 'Lumière Paris', status: 'Active', type: 'Influencer Marketing', budget: '$24,000', start: 'Mar 1, 2026', leads: 482 },
  { id: '2', name: 'Heritage Refresh', client: 'Maison Éclat', status: 'Active', type: 'Organic Social', budget: '$12,000', start: 'Feb 10, 2026', leads: 218 },
  { id: '3', name: 'Fragrance Season', client: 'Velours Beauty', status: 'Completed', type: 'Paid Social', budget: '$36,000', start: 'Jan 5, 2026', leads: 1204 },
  { id: '4', name: 'Affiliate Program Q2', client: 'Aurore Skincare', status: 'Planning', type: 'Creator-Led Affiliate', budget: '$18,000', start: 'Apr 20, 2026', leads: 0 },
]

const siteMetrics = [
  { label: 'Total Users', value: '5', change: '+2 this month', up: true },
  { label: 'Active Campaigns', value: '2', change: '+1 this week', up: true },
  { label: 'Total Revenue', value: '$90K', change: '+18% vs last quarter', up: true },
  { label: 'Avg. Campaign ROI', value: '340%', change: '-2% vs last month', up: false },
]

export type LegacyTab = 'overview' | 'users' | 'campaigns'

export function LegacyAdminPanel({ tab }: { tab: LegacyTab }) {
  const router = useRouter()
  const { user } = useAuthStore()
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [userList, setUserList] = useState(allUsers)

  const setTab = (t: LegacyTab) => {
    router.push(`/admin?section=legacy.${t}`)
  }

  const filteredUsers = userList.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()),
  )

  const deleteUser = (id: string) => setUserList(l => l.filter(u => u.id !== id))

  return (
    <div style={{ padding: '32px 40px', overflowY: 'auto', flex: 1 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 28, flexWrap: 'wrap' }}>
        {(['overview', 'users', 'campaigns'] as const).map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            style={{
              padding: '10px 18px',
              fontFamily: 'Montserrat',
              fontSize: 9,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              border: '1px solid #ebebeb',
              background: tab === t ? '#0a0a0a' : '#fff',
              color: tab === t ? '#fafaf8' : '#666',
              cursor: 'pointer',
            }}
          >
            {t === 'overview' ? 'Overview' : t === 'users' ? 'Users' : 'Campaigns'}
          </button>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p className="label" style={{ marginBottom: 8 }}>Legacy dashboard</p>
            <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, fontWeight: 400 }}>Control Center</h1>
            {user ? <p style={{ fontFamily: 'DM Sans', fontSize: 13, color: '#666', marginTop: 8 }}>{user.email}</p> : null}
          </div>
          {tab === 'campaigns' || tab === 'overview' ? (
            <button type="button" onClick={() => setShowModal(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <Plus size={12} /> New Campaign
            </button>
          ) : null}
        </div>

        {tab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2, marginBottom: 40 }}>
            {siteMetrics.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                style={{ background: '#fafaf8', border: '1px solid #ebebeb', padding: '24px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <p className="label">{m.label}</p>
                  {m.up ? <ChevronUp size={14} color="#22c55e" /> : <ChevronDown size={14} color="#ef4444" />}
                </div>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 400, marginBottom: 4 }}>{m.value}</p>
                <p style={{ fontFamily: 'DM Sans', fontSize: 12, color: m.up ? '#22c55e' : '#ef4444' }}>{m.change}</p>
              </motion.div>
            ))}
          </div>
        )}

        {(tab === 'overview' || tab === 'users') && (
          <div style={{ background: '#fafaf8', border: '1px solid #ebebeb', marginBottom: 24 }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #ebebeb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <p className="label">All Users ({filteredUsers.length})</p>
              <div style={{ position: 'relative' }}>
                <Search size={13} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9b9b9b' }} />
                <input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)}
                  style={{ paddingLeft: 36, paddingRight: 16, paddingTop: 8, paddingBottom: 8, border: '1px solid #ebebeb', background: 'transparent', fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.1em', outline: 'none', width: 220 }} />
              </div>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #ebebeb' }}>
                  {['Name', 'Email', 'Status', 'Campaigns', 'Joined', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '12px 18px', textAlign: 'left', fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9b9b9b', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u, i) => (
                  <motion.tr key={u.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
                    style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px 18px', fontFamily: 'DM Sans', fontSize: 14 }}>{u.name}</td>
                    <td style={{ padding: '12px 18px', fontFamily: 'DM Sans', fontSize: 13, color: '#666' }}>{u.email}</td>
                    <td style={{ padding: '12px 18px' }}>
                      <span style={{ fontFamily: 'Montserrat', fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 10px', background: u.status === 'Active' ? '#f0fdf4' : '#fef2f2', color: u.status === 'Active' ? '#16a34a' : '#dc2626' }}>
                        {u.status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 18px', fontFamily: 'DM Sans', fontSize: 14, textAlign: 'center' }}>{u.campaigns}</td>
                    <td style={{ padding: '12px 18px', fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.1em', color: '#9b9b9b' }}>{u.joined}</td>
                    <td style={{ padding: '12px 18px' }}>
                      <div style={{ display: 'flex', gap: 12 }}>
                        <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9b9b9b' }} aria-label="View"><Eye size={14} /></button>
                        <button type="button" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9b9b9b' }} aria-label="Edit"><Edit size={14} /></button>
                        <button type="button" onClick={() => deleteUser(u.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9b9b9b' }} aria-label="Delete"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {(tab === 'overview' || tab === 'campaigns') && (
          <div style={{ background: '#fafaf8', border: '1px solid #ebebeb' }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #ebebeb' }}>
              <p className="label">Campaigns ({campaigns.length})</p>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #ebebeb' }}>
                  {['Campaign', 'Client', 'Type', 'Budget', 'Start Date', 'Leads', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 18px', textAlign: 'left', fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#9b9b9b', fontWeight: 500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c, i) => (
                  <motion.tr key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + i * 0.05 }}
                    style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px 18px', fontFamily: 'DM Sans', fontSize: 14 }}>{c.name}</td>
                    <td style={{ padding: '12px 18px', fontFamily: 'DM Sans', fontSize: 13, color: '#666' }}>{c.client}</td>
                    <td style={{ padding: '12px 18px', fontFamily: 'Montserrat', fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9b9b9b' }}>{c.type}</td>
                    <td style={{ padding: '12px 18px', fontFamily: 'DM Sans', fontSize: 13 }}>{c.budget}</td>
                    <td style={{ padding: '12px 18px', fontFamily: 'Montserrat', fontSize: 9, color: '#9b9b9b' }}>{c.start}</td>
                    <td style={{ padding: '12px 18px', fontFamily: 'DM Sans', fontSize: 14, textAlign: 'center' }}>{c.leads.toLocaleString()}</td>
                    <td style={{ padding: '12px 18px' }}>
                      <span style={{
                        fontFamily: 'Montserrat', fontSize: 8, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '4px 10px',
                        background: c.status === 'Active' ? '#f0fdf4' : c.status === 'Completed' ? '#eff6ff' : '#fefce8',
                        color: c.status === 'Active' ? '#16a34a' : c.status === 'Completed' ? '#2563eb' : '#ca8a04',
                      }}>
                        {c.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
            onClick={() => setShowModal(false)}>
            <motion.div initial={{ opacity: 0, scale: 0.97, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#fafaf8', padding: '40px', width: '100%', maxWidth: 520, position: 'relative' }}>
              <button type="button" onClick={() => setShowModal(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
              <p className="label" style={{ marginBottom: 12 }}>Admin</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, marginBottom: 28 }}>New Campaign</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <input placeholder="Campaign Name *" className="input-field" />
                <input placeholder="Client / Brand *" className="input-field" />
                <select className="input-field" style={{ appearance: 'none' }}>
                  <option value="">Select Campaign Type</option>
                  <option>Influencer Marketing</option>
                  <option>Organic Social</option>
                  <option>Paid Social</option>
                  <option>Creator-Led Affiliate</option>
                  <option>Content Creation</option>
                </select>
                <input placeholder="Budget (USD)" className="input-field" />
                <input type="date" className="input-field" />
                <button type="button" onClick={() => setShowModal(false)} className="btn-primary" style={{ width: '100%', cursor: 'pointer' }}>
                  Create Campaign
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
