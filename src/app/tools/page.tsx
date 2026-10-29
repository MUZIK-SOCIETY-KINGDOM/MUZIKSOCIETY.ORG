import type { Metadata } from 'next'
import { SoftwareCard } from '@/components/software-card'
import { plugins, platforms } from '@/data/software'

export const metadata: Metadata = {
  title: 'Herramientas — MuzikSociety',
}

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-(--color-accent) uppercase">
          Herramientas
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-(--color-foreground) md:text-6xl">
          Hecho distinto.
        </h1>
        <p className="mt-4 text-sm text-(--color-muted)">
          Software y plugins para productores e ingenieros de música. Todos hechos por mí, de principio a fin.
        </p>
      </div>

      <h2 className="mb-6 text-xs font-semibold tracking-[0.25em] text-(--color-muted) uppercase">
        Plugins · {plugins.length}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {plugins.map((p) => (
          <SoftwareCard key={p.name} p={p} />
        ))}
      </div>

      <h2 className="mt-20 mb-6 text-xs font-semibold tracking-[0.25em] text-(--color-muted) uppercase">
        Plataformas
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {platforms.map((p) => (
          <SoftwareCard key={p.name} p={p} />
        ))}
      </div>
    </div>
  )
}
