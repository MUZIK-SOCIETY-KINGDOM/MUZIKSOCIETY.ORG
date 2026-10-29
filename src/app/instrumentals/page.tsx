import type { Metadata } from 'next'
import { getInstrumentals } from '@/lib/queries'
import { BeatCard } from '@/components/beat-card'
import { getLang } from '@/lib/lang-server'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getLang()) === 'en' ? 'Instrumentals — MuzikSociety' : 'Instrumentales — MuzikSociety' }
}

export default async function InstrumentalsPage() {
  const en = (await getLang()) === 'en'
  const beats = await getInstrumentals()

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-(--color-accent) uppercase">
          {en ? 'Instrumentals' : 'Instrumentales'}
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-(--color-foreground) md:text-6xl">
          {en ? 'The catalog.' : 'El catálogo.'}
        </h1>
        <p className="mt-4 text-sm text-(--color-muted)">
          {en ? 'Listen and buy on SampleMonsta.' : 'Escucha y compra en SampleMonsta.'}
        </p>
      </div>

      {beats.length === 0 ? (
        <p className="text-sm text-(--color-muted)">
          {en ? 'No instrumentals yet. Check back soon.' : 'Todavía no hay instrumentales. Vuelve pronto.'}
        </p>
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
