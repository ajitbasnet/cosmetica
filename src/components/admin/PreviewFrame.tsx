'use client'

import { HomePageContent } from '@/components/pages/HomePageContent'
import type { HomePageCMS } from '@/lib/cms-types'

interface PreviewFrameProps {
  homePartial: Partial<HomePageCMS> | null
}

export function PreviewFrame({ homePartial }: PreviewFrameProps) {
  return (
    <div style={{ flex: 1, minWidth: 0, background: '#ebebeb', padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <p className="admin-label" style={{ marginBottom: 0 }}>Live preview</p>
        <a href="/" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: 9, padding: '8px 14px', textDecoration: 'none' }}>
          View live page
        </a>
      </div>
      <div style={{
        flex: 1, overflow: 'auto', border: '1px solid #ebebeb', background: '#fafaf8',
        position: 'relative',
      }}>
        <div style={{
          width: 1440, transform: 'scale(0.35)', transformOrigin: 'top left',
          pointerEvents: 'none', minHeight: 2000,
        }}>
          <HomePageContent hideCursor homePartial={homePartial} />
        </div>
      </div>
    </div>
  )
}
