import type { PortfolioEntry } from '@/lib/types'

const roleBadgeColor: Record<string, string> = {
  producer: 'text-(--color-accent) border-(--color-accent)',
  engineer: 'text-purple-400 border-purple-400',
  developer: 'text-green-400 border-green-400',
}

type PortfolioCardProps = {
  entry: PortfolioEntry
}

function toSpotifyEmbedUrl(raw: string): string | null {
  // Already an embed URL
  if (raw.includes('open.spotify.com/embed/track/')) return raw.split('?')[0]
  // Regular track URL: https://open.spotify.com/track/ID
  const match = raw.match(/open\.spotify\.com\/track\/([A-Za-z0-9]+)/)
  if (match) return `https://open.spotify.com/embed/track/${match[1]}`
  return null
}

export function PortfolioCard({ entry }: PortfolioCardProps) {
  const embedUrl = entry.spotify_url ? toSpotifyEmbedUrl(entry.spotify_url) : null

  return (
    <div className="rounded-lg border border-(--color-border) bg-(--color-surface) overflow-hidden hover:border-(--color-muted) transition-colors">
      {embedUrl && (
        <iframe
          src={`${embedUrl}?utm_source=generator`}
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="block"
          style={{ borderRadius: 0 }}
        />
      )}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-sm text-(--color-foreground)">{entry.title}</h3>
            {entry.artist && (
              <p className="text-xs text-(--color-muted) mt-0.5">{entry.artist}</p>
            )}
          </div>
          <span
            className={`rounded border px-2 py-0.5 text-xs capitalize shrink-0 ml-2 ${roleBadgeColor[entry.role] ?? 'text-(--color-muted) border-(--color-border)'}`}
          >
            {entry.role}
          </span>
        </div>
        {entry.year && (
          <p className="text-xs text-(--color-muted) mb-2">{entry.year}</p>
        )}
        {entry.description && (
          <p className="text-xs text-(--color-muted) leading-relaxed">{entry.description}</p>
        )}
      </div>
    </div>
  )
}
