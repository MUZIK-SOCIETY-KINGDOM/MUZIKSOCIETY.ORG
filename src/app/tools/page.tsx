import type { Metadata } from 'next'
import { getTools } from '@/lib/queries'
import { ToolCard } from '@/components/tool-card'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Tools — MuzikSociety',
}

export default async function ToolsPage() {
  const tools = await getTools()

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[--color-accent] uppercase">
          Tools
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-[--color-foreground] md:text-6xl">
          Built Different.
        </h1>
        <p className="mt-4 text-sm text-[--color-muted]">
          Software and plugins built for music producers and engineers.
        </p>
      </div>

      {tools.length === 0 ? (
        <p className="text-sm text-[--color-muted]">No tools published yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  )
}
