import Image from 'next/image'
import type { PortfolioEntry } from '@/lib/types'

const roleBadgeColor: Record<string, string> = {
  producer: 'text-(--color-accent) border-(--color-accent)',
  developer: 'text-green-400 border-green-400',
}

type PortfolioCardProps = {
  entry: PortfolioEntry
}

function toSpotifyEmbedUrl(raw: string): string | null {
  if (raw.includes('open.spotify.com/embed/track/')) return raw.split('?')[0]
  const match = raw.match(/open\.spotify\.com\/track\/([A-Za-z0-9]+)/)
  if (match) return `https://open.spotify.com/embed/track/${match[1]}`
  return null
}

function BrowserCard({ entry }: { entry: PortfolioEntry }) {
  const domain = entry.url
    ? entry.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : entry.title.toLowerCase().replace(/\s+/g, '') + '.com'

  return (
    <a
      href={entry.url ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl border border-(--color-border) bg-(--color-surface) overflow-hidden hover:border-green-400/40 transition-all duration-300 group"
    >
      {/* Browser chrome */}
      <div className="bg-(--color-background) border-b border-(--color-border) px-4 py-2.5 flex items-center gap-3">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/60 group-hover:bg-red-500 transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60 group-hover:bg-yellow-400 transition-colors" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/60 group-hover:bg-green-400 transition-colors" />
        </div>
        <div className="flex-1 rounded-md bg-(--color-surface) border border-(--color-border) px-3 py-1 text-xs text-(--color-muted) font-mono truncate">
          {domain}
        </div>
        <svg className="w-3.5 h-3.5 text-(--color-muted) shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>

      {/* Screenshot */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <Image
          src={entry.cover_url ?? `https://image.thum.io/get/width/1200/crop/675/noanimate/${entry.url}`}
          alt={entry.title}
          fill
          unoptimized={!entry.cover_url}
          className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-(--color-background)/30 pointer-events-none" />
      </div>

      {/* Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h3 className="font-bold text-sm text-(--color-foreground)">{entry.title}</h3>
            {entry.year && <p className="text-xs text-(--color-muted) mt-0.5">{entry.year}</p>}
          </div>
          <span className="rounded border border-green-400 text-green-400 px-2 py-0.5 text-xs shrink-0 ml-2">
            developer
          </span>
        </div>
        {entry.description && (
          <p className="text-xs text-(--color-muted) leading-relaxed mt-2">{entry.description}</p>
        )}
      </div>
    </a>
  )
}

export function PortfolioCard({ entry }: PortfolioCardProps) {
  if (entry.role === 'developer') return <BrowserCard entry={entry} />

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
