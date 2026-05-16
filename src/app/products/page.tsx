import type { Metadata } from 'next'
import { getSamplePacks, getTools } from '@/lib/queries'
import { createClient } from '@/lib/supabase/server'
import { getSignedAudioProxyUrl } from '@/lib/audio-token'
import { ProductsTabs } from '@/components/products-tabs'
import type { Instrumental } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Products — MuzikSociety',
}

export default async function ProductsPage() {
  const supabase = await createClient()

  const [
    { data: initialInstrumentals, count },
    packs,
    plugins,
  ] = await Promise.all([
    supabase
      .from('ms_instrumentals')
      .select('*', { count: 'exact' })
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(0, 49),
    getSamplePacks(),
    getTools(),
  ])

  const fixedInstrumentals = (initialInstrumentals ?? []).map((row) => ({
    ...row,
    preview_url: getSignedAudioProxyUrl(row.preview_url),
    external_url: null,
  })) as Instrumental[]

  return (
    <div className="mx-auto max-w-6xl px-6 py-24 pb-32">
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

      <ProductsTabs
        initialInstrumentals={fixedInstrumentals}
        initialTotal={count ?? 0}
        packs={packs}
        plugins={plugins}
      />
    </div>
  )
}
