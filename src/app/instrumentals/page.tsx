import type { Metadata } from 'next'
import { getInstrumentals } from '@/lib/queries'
import { BeatCard } from '@/components/beat-card'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Instrumentals — MuzikSociety',
}

export default async function InstrumentalsPage() {
  const beats = await getInstrumentals()

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[--color-accent] uppercase">
          Instrumentals
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-[--color-foreground] md:text-6xl">
          The Catalog.
        </h1>
        <p className="mt-4 text-sm text-[--color-muted]">
          Preview and purchase on SampleMonsta.
        </p>
      </div>

      {beats.length === 0 ? (
        <p className="text-sm text-[--color-muted]">No instrumentals yet — check back soon.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {beats.map((beat) => (
            <BeatCard key={beat.id} beat={beat} />
          ))}
        </div>
      )}
    </div>
  )
}
