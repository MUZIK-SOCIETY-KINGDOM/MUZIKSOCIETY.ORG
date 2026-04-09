import type { PortfolioEntry } from '@/lib/types'

const roleBadgeColor: Record<string, string> = {
  producer: 'text-(--color-accent) border-(--color-accent)',
  engineer: 'text-purple-400 border-purple-400',
  developer: 'text-green-400 border-green-400',
}

type PortfolioCardProps = {
  entry: PortfolioEntry
}

export function PortfolioCard({ entry }: PortfolioCardProps) {
  return (
    <div className="rounded-lg border border-(--color-border) bg-(--color-surface) p-6 hover:border-(--color-muted) transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-sm text-(--color-foreground)">{entry.title}</h3>
          {entry.artist && (
            <p className="text-xs text-(--color-muted) mt-0.5">{entry.artist}</p>
          )}
        </div>
        <span
          className={`rounded border px-2 py-0.5 text-xs capitalize ${roleBadgeColor[entry.role] ?? 'text-(--color-muted) border-(--color-border)'}`}
        >
          {entry.role}
        </span>
      </div>
      {entry.year && (
        <p className="text-xs text-(--color-muted) mb-3">{entry.year}</p>
      )}
      {entry.description && (
        <p className="text-xs text-(--color-muted) leading-relaxed">{entry.description}</p>
      )}
    </div>
  )
}
