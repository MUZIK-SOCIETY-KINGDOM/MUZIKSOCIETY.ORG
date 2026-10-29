import type { Metadata } from 'next'
import { getPortfolioEntries } from '@/lib/queries'
import { PortfolioGrid } from '@/components/portfolio-grid'
import { getLang } from '@/lib/lang-server'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getLang()) === 'en' ? 'Portfolio — MuzikSociety' : 'Portafolio — MuzikSociety' }
}

export default async function PortfolioPage() {
  const en = (await getLang()) === 'en'
  const entries = await getPortfolioEntries()

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-(--color-accent) uppercase">
          {en ? 'Portfolio' : 'Portafolio'}
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-(--color-foreground) md:text-6xl">
          {en ? 'The work.' : 'El trabajo.'}
        </h1>
      </div>
      <PortfolioGrid entries={entries} />
    </div>
  )
}
