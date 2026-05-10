import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { AmbientBackground } from '@/components/ambient-background'
import { PlayerProvider } from '@/contexts/player-context'
import { BottomPlayer } from '@/components/bottom-player'
import { PromoPopup } from '@/components/promo-popup'
import { WhatsAppButton } from '@/components/whatsapp-button'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'MuzikSociety — Producer · Engineer · Developer',
  description:
    'Santi — Music Producer, Audio Engineer, and Developer with 20+ years in the industry.',
  openGraph: {
    title: 'MuzikSociety',
    description: 'Producer · Engineer · Developer',
    url: 'https://muziksociety.org',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <PlayerProvider>
          <AmbientBackground />
          <Nav />
          <main className="pt-16 page-enter">{children}</main>
          <Footer />
          <BottomPlayer />
          <WhatsAppButton />
          <PromoPopup />
        </PlayerProvider>
      </body>
    </html>
  )
}
