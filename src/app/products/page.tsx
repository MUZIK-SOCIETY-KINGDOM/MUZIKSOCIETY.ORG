import type { Metadata } from 'next'
import { getInstrumentals, getSamplePacks, getTools } from '@/lib/queries'
import { ProductsTabs } from '@/components/products-tabs'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Products — MuzikSociety',
}

export default async function ProductsPage() {
  const [instrumentals, packs, plugins] = await Promise.all([
    getInstrumentals(),
    getSamplePacks(),
    getTools(),
  ])

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-(--color-accent) uppercase">
          Products
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-(--color-foreground) md:text-6xl">
          The Store.
        </h1>
        <p className="mt-4 text-sm text-(--color-muted)">
          Beats, sample packs, and tools built for producers.
        </p>
      </div>

      <ProductsTabs instrumentals={instrumentals} packs={packs} plugins={plugins} />
    </div>
  )
}
