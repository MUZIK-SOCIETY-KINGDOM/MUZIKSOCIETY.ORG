import Link from 'next/link'
import type { Tool } from '@/lib/types'

type ToolCardProps = {
  tool: Tool
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <div className="rounded-lg border border-[--color-border] bg-[--color-surface] p-6 hover:border-[--color-muted] transition-colors">
      {tool.cover_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={tool.cover_url}
          alt={tool.name}
          className="mb-4 h-40 w-full rounded-md object-cover"
        />
      )}
      <h3 className="font-bold text-sm text-[--color-foreground] mb-2">{tool.name}</h3>
      {tool.description && (
        <p className="text-xs text-[--color-muted] mb-4 leading-relaxed">{tool.description}</p>
      )}
      <div className="flex gap-3">
        {tool.live_url && (
          <Link
            href={tool.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[--color-accent] hover:text-[--color-foreground] transition-colors"
          >
            Live Demo →
          </Link>
        )}
        {tool.repo_url && (
          <Link
            href={tool.repo_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[--color-muted] hover:text-[--color-foreground] transition-colors"
          >
            GitHub →
          </Link>
        )}
      </div>
    </div>
  )
}
