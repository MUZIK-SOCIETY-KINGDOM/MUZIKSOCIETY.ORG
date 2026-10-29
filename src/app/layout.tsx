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
import { LangProvider } from '@/contexts/lang-context'
import { getLang } from '@/lib/lang-server'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const META = {
  es: {
    title: 'MuzikSociety — Productor · Ingeniero · Desarrollador',
    description:
      'Gabriel Santiago (Santi): productor, ingeniero de audio y desarrollador de software. Más de 20 años en la música, más de 100 canciones publicadas. Música, contenido y tecnología para artistas y negocios.',
    tagline: 'Productor · Ingeniero · Desarrollador',
  },
  en: {
    title: 'MuzikSociety — Producer · Engineer · Developer',
    description:
      'Gabriel Santiago (Santi): music producer, audio engineer and software developer. 20+ years in music, 100+ released songs. Music, content and technology for artists and businesses.',
    tagline: 'Producer · Engineer · Developer',
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const m = META[await getLang()]
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: 'MuzikSociety',
      description: m.tagline,
      url: 'https://muziksociety.org',
    },
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const lang = await getLang()

  return (
    <html lang={lang} className={inter.variable}>
      <body>
        <LangProvider lang={lang}>
          <PlayerProvider>
            <AmbientBackground />
            <Nav />
            <main className="pt-16 page-enter">{children}</main>
            <Footer />
            <BottomPlayer />
            <WhatsAppButton />
            <PromoPopup />
          </PlayerProvider>
        </LangProvider>
      </body>
    </html>
  )
}
