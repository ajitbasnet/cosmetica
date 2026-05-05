import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/ui/CookieBanner'
import PageTransitionProvider from '@/components/ui/PageTransitionProvider'
import { CMSHydrationGate } from '@/components/cms/CMSHydrationGate'

export const metadata: Metadata = {
  title: 'COSMÉTICA | The Social-First Beauty Agency',
  description: 'The social-first agency for prestige beauty. Social, influence, commerce — built to work together, designed to move your brand forward.',
  keywords: 'beauty agency, prestige beauty, social media marketing, influencer marketing, beauty brand',
  openGraph: {
    title: 'COSMÉTICA | The Social-First Beauty Agency',
    description: 'Building social-first ecosystems for prestige beauty brands.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet" />
      </head>
      <body>
        <CMSHydrationGate>
          <PageTransitionProvider>
            <Navbar />
            {/* No top padding — navbar is transparent, pages handle their own hero overlap */}
            <main>
              {children}
            </main>
            <Footer />
            <CookieBanner />
          </PageTransitionProvider>
        </CMSHydrationGate>
      </body>
    </html>
  )
}
