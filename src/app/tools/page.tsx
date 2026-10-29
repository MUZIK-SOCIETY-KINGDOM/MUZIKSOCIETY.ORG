import type { Metadata } from 'next'
import { SoftwareCard } from '@/components/software-card'
import { plugins, platforms } from '@/data/software'
import { getLang } from '@/lib/lang-server'

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getLang()) === 'en' ? 'Tools — MuzikSociety' : 'Herramientas — MuzikSociety' }
}

export default async function ToolsPage() {
  const lang = await getLang()
  const en = lang === 'en'
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-(--color-accent) uppercase">
          {en ? 'Tools' : 'Herramientas'}
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-(--color-foreground) md:text-6xl">
          {en ? 'Built different.' : 'Hecho distinto.'}
        </h1>
        <p className="mt-4 text-sm text-(--color-muted)">
          {en
            ? 'Software and plugins for music producers and engineers. All built by me, start to finish.'
            : 'Software y plugins para productores e ingenieros de música. Todos hechos por mí, de principio a fin.'}
        </p>
      </div>

      <h2 className="mb-6 text-xs font-semibold tracking-[0.25em] text-(--color-muted) uppercase">
        Plugins · {plugins.length}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {plugins.map((p) => (
          <SoftwareCard key={p.name} p={p} lang={lang} />
        ))}
      </div>

      <h2 className="mt-20 mb-6 text-xs font-semibold tracking-[0.25em] text-(--color-muted) uppercase">
        {en ? 'Platforms' : 'Plataformas'}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((p) => (
          <SoftwareCard key={p.name} p={p} lang={lang} />
        ))}
      </div>
    </div>
  )
}
