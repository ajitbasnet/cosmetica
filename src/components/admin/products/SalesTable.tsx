'use client'

import { EditorShell } from '@/components/admin/EditorShell'

const salesRows = [
  { id: 'S-1024', date: '2026-05-01', customer: 'Jane Smith', product: 'Hydra Serum', qty: 2, total: 178, status: 'Paid' },
  { id: 'S-1025', date: '2026-05-02', customer: 'Marc Dubois', product: 'Velvet Foundation', qty: 1, total: 96, status: 'Paid' },
  { id: 'S-1026', date: '2026-05-02', customer: 'Emma Wilson', product: 'Silk Cleanser', qty: 3, total: 204, status: 'Pending' },
  { id: 'S-1027', date: '2026-05-03', customer: 'Sofia Rossi', product: 'Radiance Oil', qty: 1, total: 72, status: 'Refunded' },
]

function statusColor(status: string) {
  if (status === 'Paid') return { bg: '#ecfdf3', fg: '#166534' }
  if (status === 'Pending') return { bg: '#fff7ed', fg: '#9a3412' }
  return { bg: '#fef2f2', fg: '#991b1b' }
}

export function SalesTable() {
  const totalRevenue = salesRows.reduce((sum, row) => sum + row.total, 0)

  return (
    <EditorShell breadcrumb={['Admin', 'Table', 'Sales table']} dirty={false} saving={false} showCheck={false} onSave={() => {}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, gap: 16, flexWrap: 'wrap' }}>
        <h2 className="admin-section-title" style={{ marginBottom: 0 }}>Sales table</h2>
        <p style={{ fontFamily: 'Montserrat', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#666' }}>
          Total revenue: NPR {totalRevenue.toFixed(2)}
        </p>
      </div>

      <div style={{ border: '1px solid #ebebeb', overflowX: 'auto', background: '#fff' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ebebeb' }}>
              {['Sale ID', 'Date', 'Customer', 'Product', 'Qty', 'Total', 'Status'].map(h => (
                <th
                  key={h}
                  style={{
                    padding: '12px 14px',
                    textAlign: 'left',
                    fontFamily: 'Montserrat',
                    fontSize: 9,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#9b9b9b',
                    fontWeight: 500,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {salesRows.map(row => {
              const c = statusColor(row.status)
              return (
                <tr key={row.id} style={{ borderBottom: '1px solid #f1f1f1' }}>
                  <td style={{ padding: '12px 14px', fontFamily: 'Montserrat', fontSize: 10 }}>{row.id}</td>
                  <td style={{ padding: '12px 14px', fontFamily: 'DM Sans', fontSize: 14 }}>{row.date}</td>
                  <td style={{ padding: '12px 14px', fontFamily: 'DM Sans', fontSize: 14 }}>{row.customer}</td>
                  <td style={{ padding: '12px 14px', fontFamily: 'DM Sans', fontSize: 14 }}>{row.product}</td>
                  <td style={{ padding: '12px 14px', fontFamily: 'DM Sans', fontSize: 14 }}>{row.qty}</td>
                  <td style={{ padding: '12px 14px', fontFamily: 'DM Sans', fontSize: 14 }}>NPR {row.total.toFixed(2)}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span
                      style={{
                        background: c.bg,
                        color: c.fg,
                        padding: '4px 10px',
                        fontFamily: 'Montserrat',
                        fontSize: 9,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </EditorShell>
  )
}
