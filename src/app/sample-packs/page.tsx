import type { Metadata } from 'next'
import { getSamplePacks } from '@/lib/queries'
import { PackCard } from '@/components/pack-card'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Sample Packs — MuzikSociety',
}

export default async function SamplePacksPage() {
  const packs = await getSamplePacks()

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-(--color-accent) uppercase">
          Sample Packs
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-(--color-foreground) md:text-6xl">
          The Arsenal.
        </h1>
        <p className="mt-4 text-sm text-(--color-muted)">
          Production-ready samples, loops, and kits. Available on SampleMonsta.
        </p>
      </div>

      {packs.length === 0 ? (
        <p className="text-sm text-(--color-muted)">No packs yet — check back soon.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {packs.map((pack) => (
            <PackCard key={pack.id} pack={pack} />
          ))}
        </div>
      )}
    </div>
  )
}
