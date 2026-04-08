import type { Metadata } from 'next'
import { getPortfolioEntries } from '@/lib/queries'
import { PortfolioGrid } from '@/components/portfolio-grid'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Portfolio — MuzikSociety',
}

export default async function PortfolioPage() {
  const entries = await getPortfolioEntries()

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[--color-accent] uppercase">
          Portfolio
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-[--color-foreground] md:text-6xl">
          The Work.
        </h1>
      </div>
      <PortfolioGrid entries={entries} />
    </div>
  )
}
