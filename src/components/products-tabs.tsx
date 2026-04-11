'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AudioPlayer } from '@/components/audio-player'
import type { Instrumental, SamplePack, Tool } from '@/lib/types'

type Tab = 'instrumentals' | 'packs' | 'plugins'

type Props = {
  instrumentals: Instrumental[]
  packs: SamplePack[]
  plugins: Tool[]
}

function InstrumentalRow({ beat }: { beat: Instrumental }) {
  return (
    <div className="flex gap-4 rounded-xl border border-(--color-border) bg-(--color-surface) p-4 hover:border-(--color-muted) transition-colors">
      {/* Cover */}
      <div className="shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-(--color-background) flex items-center justify-center border border-(--color-border)">
        {beat.cover_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={beat.cover_url} alt={beat.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-2xl text-(--color-border)">♪</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-bold text-sm text-(--color-foreground) truncate">{beat.title}</h3>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {beat.genre && (
                <span className="rounded border border-(--color-border) px-1.5 py-0.5 text-[10px] text-(--color-muted)">{beat.genre}</span>
              )}
              {beat.bpm && (
                <span className="rounded border border-(--color-border) px-1.5 py-0.5 text-[10px] text-(--color-muted)">{beat.bpm} BPM</span>
              )}
              {beat.key && (
                <span className="rounded border border-(--color-border) px-1.5 py-0.5 text-[10px] text-(--color-muted)">{beat.key}</span>
              )}
            </div>
          </div>
          <Link
            href={beat.external_url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-md bg-(--color-accent) px-3 py-1.5 text-xs font-semibold text-(--color-background) hover:bg-(--color-accent-dark) transition-colors"
          >
            Buy
          </Link>
        </div>
        {beat.preview_url && <AudioPlayer src={beat.preview_url} />}
      </div>
    </div>
  )
}

function PackCard({ pack }: { pack: SamplePack }) {
  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-surface) overflow-hidden hover:border-(--color-muted) transition-colors">
      <div className="aspect-square bg-(--color-background) flex items-center justify-center border-b border-(--color-border)">
        {pack.cover_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={pack.cover_url} alt={pack.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-5xl">📦</span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-sm text-(--color-foreground) mb-1">{pack.title}</h3>
        {pack.description && (
          <p className="text-xs text-(--color-muted) leading-relaxed mb-4">{pack.description}</p>
        )}
        {pack.preview_url && <AudioPlayer src={pack.preview_url} />}
        <Link
          href={pack.external_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center rounded-md bg-(--color-accent) py-2 text-xs font-semibold tracking-wide text-(--color-background) hover:bg-(--color-accent-dark) transition-colors"
        >
          Get on SampleMonsta
        </Link>
      </div>
    </div>
  )
}

function PluginCard({ tool }: { tool: Tool }) {
  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-surface) overflow-hidden hover:border-(--color-muted) transition-colors">
      {tool.cover_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={tool.cover_url}
          alt={tool.name}
          className="w-full h-48 object-cover border-b border-(--color-border)"
        />
      )}
      <div className="p-6">
        <h3 className="font-bold text-base text-(--color-foreground) mb-2">{tool.name}</h3>
        {tool.description && (
          <p className="text-sm text-(--color-muted) leading-relaxed mb-5">{tool.description}</p>
        )}
        <div className="flex gap-3">
          {tool.live_url && (
            <Link
              href={tool.live_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-(--color-accent) px-4 py-2 text-xs font-semibold text-(--color-background) hover:bg-(--color-accent-dark) transition-colors"
            >
              Try it Live →
            </Link>
          )}
          {tool.repo_url && (
            <Link
              href={tool.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-(--color-border) px-4 py-2 text-xs font-semibold text-(--color-muted) hover:text-(--color-foreground) hover:border-(--color-muted) transition-colors"
            >
              GitHub →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

const tabs: { id: Tab; label: string }[] = [
  { id: 'instrumentals', label: 'Instrumentals' },
  { id: 'packs', label: 'Sample Packs' },
  { id: 'plugins', label: 'Plugins' },
]

export function ProductsTabs({ instrumentals, packs, plugins }: Props) {
  const [active, setActive] = useState<Tab>('instrumentals')

  const counts: Record<Tab, number> = {
    instrumentals: instrumentals.length,
    packs: packs.length,
    plugins: plugins.length,
  }

  return (
    <>
      {/* Tab bar */}
      <div className="mb-10 flex gap-2 flex-wrap border-b border-(--color-border) pb-0">
        {tabs.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActive(id)}
            className={`relative pb-3 px-1 text-sm font-semibold transition-colors ${
              active === id
                ? 'text-(--color-foreground)'
                : 'text-(--color-muted) hover:text-(--color-foreground)'
            }`}
          >
            {label}
            {counts[id] > 0 && (
              <span className={`ml-2 text-xs ${active === id ? 'text-(--color-accent)' : 'text-(--color-border)'}`}>
                {counts[id]}
              </span>
            )}
            {active === id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-(--color-accent) rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Instrumentals — list rows */}
      {active === 'instrumentals' && (
        instrumentals.length === 0 ? (
          <p className="text-sm text-(--color-muted)">No instrumentals published yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {instrumentals.map((beat) => (
              <InstrumentalRow key={beat.id} beat={beat} />
            ))}
          </div>
        )
      )}

      {/* Sample Packs — square grid */}
      {active === 'packs' && (
        packs.length === 0 ? (
          <p className="text-sm text-(--color-muted)">No sample packs published yet.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {packs.map((pack) => (
              <PackCard key={pack.id} pack={pack} />
            ))}
          </div>
        )
      )}

      {/* Plugins — detail cards */}
      {active === 'plugins' && (
        plugins.length === 0 ? (
          <p className="text-sm text-(--color-muted)">No plugins published yet.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            {plugins.map((tool) => (
              <PluginCard key={tool.id} tool={tool} />
            ))}
          </div>
        )
      )}
    </>
  )
}
