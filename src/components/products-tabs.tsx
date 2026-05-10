'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AudioPlayer } from '@/components/audio-player'
import { usePlayer } from '@/contexts/player-context'
import type { Instrumental, SamplePack, Tool } from '@/lib/types'

type Tab = 'instrumentals' | 'packs' | 'plugins'

type Props = {
  initialInstrumentals: Instrumental[]
  initialTotal: number
  packs: SamplePack[]
  plugins: Tool[]
}

// ── Instrumentals tab ─────────────────────────────────────────────────────────

const GENRES = ['Afrobeat', 'Drill', 'Fusion', 'Latin_Urbano', 'Rap', 'Reggaeton', 'Trap']
const PAGE_SIZE = 50

function TrackRow({ beat, isActive, onPlay }: { beat: Instrumental; isActive: boolean; onPlay: () => void }) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200 ${
        isActive
          ? 'border-(--color-accent)/40 bg-(--color-accent)/5'
          : 'border-(--color-border) bg-(--color-surface) hover:border-(--color-muted)'
      }`}
      onClick={onPlay}
    >
      {/* Play indicator / number */}
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm">
        {isActive ? (
          <span className="text-(--color-accent) text-base">▶</span>
        ) : (
          <span className="text-(--color-border) text-base">▷</span>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-semibold leading-tight ${isActive ? 'text-(--color-accent)' : 'text-(--color-foreground)'}`}>
          {beat.title}
        </p>
        <div className="mt-0.5 flex flex-wrap gap-1.5">
          {beat.genre && (
            <span className="rounded border border-(--color-border) px-1.5 py-0.5 text-[10px] text-(--color-muted)">
              {beat.genre.replace(/_/g, ' ')}
            </span>
          )}
          {beat.subgenre && beat.subgenre !== beat.genre && (
            <span className="rounded border border-(--color-border) px-1.5 py-0.5 text-[10px] text-(--color-muted)">
              {beat.subgenre.replace(/_/g, ' ')}
            </span>
          )}
          {beat.bpm && (
            <span className="rounded border border-(--color-border) px-1.5 py-0.5 text-[10px] text-(--color-muted)">
              {beat.bpm} BPM
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

function InstrumentalsTab({ initialTracks, initialTotal }: { initialTracks: Instrumental[]; initialTotal: number }) {
  const { currentTrack, playing, playTrack } = usePlayer()
  const [tracks, setTracks] = useState<Instrumental[]>(initialTracks)
  const [total, setTotal] = useState(initialTotal)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [genre, setGenre] = useState('')
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Debounce search input
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => setDebouncedSearch(search), 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [search])

  const fetchTracks = useCallback(async (nextPage: number, append: boolean) => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(nextPage), limit: String(PAGE_SIZE) })
    if (genre) params.set('genre', genre)
    if (debouncedSearch) params.set('q', debouncedSearch)

    try {
      const res = await fetch(`/api/instrumentals?${params}`)
      const json = await res.json()
      setTracks((prev) => append ? [...prev, ...json.data] : json.data)
      setTotal(json.total)
      setPage(nextPage)
    } finally {
      setLoading(false)
    }
  }, [genre, debouncedSearch])

  // Re-fetch when filters change
  useEffect(() => {
    fetchTracks(1, false)
  }, [genre, debouncedSearch]) // eslint-disable-line react-hooks/exhaustive-deps

  const hasMore = tracks.length < total

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search tracks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[180px] rounded-lg border border-(--color-border) bg-(--color-surface) px-3 py-2 text-sm text-(--color-foreground) placeholder:text-(--color-border) focus:border-(--color-accent) focus:outline-none transition-colors"
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="rounded-lg border border-(--color-border) bg-(--color-surface) px-3 py-2 text-sm text-(--color-muted) focus:border-(--color-accent) focus:outline-none transition-colors"
        >
          <option value="">All genres</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>{g.replace(/_/g, ' ')}</option>
          ))}
        </select>
        <span className="text-xs text-(--color-muted) shrink-0">
          {total.toLocaleString()} tracks
        </span>
      </div>

      {/* Track list */}
      {tracks.length === 0 && !loading ? (
        <p className="text-sm text-(--color-muted)">No tracks found.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {tracks.map((beat) => (
            <TrackRow
              key={beat.id}
              beat={beat}
              isActive={currentTrack?.id === beat.id}
              onPlay={() => playTrack(beat, tracks)}
            />
          ))}
        </div>
      )}

      {/* Load more */}
      {hasMore && (
        <button
          type="button"
          onClick={() => fetchTracks(page + 1, true)}
          disabled={loading}
          className="mt-6 w-full rounded-xl border border-(--color-border) py-3 text-sm text-(--color-muted) hover:border-(--color-muted) hover:text-(--color-foreground) transition-colors disabled:opacity-50"
        >
          {loading ? 'Loading...' : `Load more (${total - tracks.length} remaining)`}
        </button>
      )}
    </div>
  )
}

// ── Sample packs ──────────────────────────────────────────────────────────────

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

// ── Plugins ───────────────────────────────────────────────────────────────────

function PluginCard({ tool }: { tool: Tool }) {
  const domain = tool.live_url
    ? tool.live_url.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : tool.name.toLowerCase().replace(/\s+/g, '') + '.com'

  return (
    <a
      href={tool.live_url ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl border border-(--color-border) bg-(--color-surface) overflow-hidden hover:border-green-400/40 transition-all duration-300 group"
    >
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

      {tool.cover_url && (
        <div className="relative overflow-hidden border-b border-(--color-border)" style={{ aspectRatio: '16/9' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tool.cover_url}
            alt={tool.name}
            className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-(--color-background)/30 pointer-events-none" />
        </div>
      )}

      <div className="p-5">
        <h3 className="font-bold text-sm text-(--color-foreground) mb-1">{tool.name}</h3>
        {tool.description && (
          <p className="text-xs text-(--color-muted) leading-relaxed mt-1">{tool.description}</p>
        )}
        {tool.repo_url && (
          <span onClick={(e) => e.stopPropagation()} className="inline-block mt-3">
            <a
              href={tool.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-(--color-muted) hover:text-(--color-foreground) transition-colors"
            >
              GitHub →
            </a>
          </span>
        )}
      </div>
    </a>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

const tabs: { id: Tab; label: string }[] = [
  { id: 'instrumentals', label: 'Instrumentals' },
  { id: 'packs', label: 'Sample Packs' },
  { id: 'plugins', label: 'Plugins' },
]

export function ProductsTabs({ initialInstrumentals, initialTotal, packs, plugins }: Props) {
  const [active, setActive] = useState<Tab>('instrumentals')

  return (
    <>
      {/* Tab bar */}
      <div className="mb-10 flex gap-2 flex-wrap border-b border-(--color-border) pb-0">
        {tabs.map(({ id, label }) => {
          const count = id === 'instrumentals' ? initialTotal : id === 'packs' ? packs.length : plugins.length
          return (
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
              {count > 0 && (
                <span className={`ml-2 text-xs ${active === id ? 'text-(--color-accent)' : 'text-(--color-border)'}`}>
                  {count}
                </span>
              )}
              {active === id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-(--color-accent) rounded-full" />
              )}
            </button>
          )
        })}
      </div>

      {active === 'instrumentals' && (
        <InstrumentalsTab initialTracks={initialInstrumentals} initialTotal={initialTotal} />
      )}

      {active === 'packs' && (
        packs.length === 0 ? (
          <p className="text-sm text-(--color-muted)">No sample packs published yet.</p>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {packs.map((pack) => <PackCard key={pack.id} pack={pack} />)}
          </div>
        )
      )}

      {active === 'plugins' && (
        <>
          <p className="text-sm text-(--color-muted) leading-relaxed mb-8 max-w-2xl">
            Software built from real workflows. These are tools I use, built to solve problems I had —
            available for other producers and developers to use and build on.
          </p>
          {plugins.length === 0 ? (
            <p className="text-sm text-(--color-muted)">No plugins published yet.</p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {plugins.map((tool) => <PluginCard key={tool.id} tool={tool} />)}
            </div>
          )}
        </>
      )}
    </>
  )
}
