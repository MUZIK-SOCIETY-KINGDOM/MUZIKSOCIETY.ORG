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
  title: 'MuzikSociety — Productor · Ingeniero · Desarrollador',
  description:
    'Gabriel Santiago (Santi): productor, ingeniero de audio y desarrollador de software. Más de 20 años en la música, más de 100 canciones publicadas. Música, contenido y tecnología para artistas y negocios.',
  openGraph: {
    title: 'MuzikSociety',
    description: 'Productor · Ingeniero · Desarrollador',
    url: 'https://muziksociety.org',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
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
