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

// ── Genre config ──────────────────────────────────────────────────────────────

type GenreKey = 'Afrobeat' | 'Drill' | 'Fusion' | 'Latin_Urbano' | 'Rap' | 'Reggaeton' | 'Trap'

const GENRE_CONFIG: Record<GenreKey, { label: string; color: string; bg: string; glyph: string }> = {
  Afrobeat:     { label: 'Afrobeat',      color: '#f59e0b', bg: 'rgba(245,158,11,0.08)',   glyph: 'A' },
  Drill:        { label: 'Drill',         color: '#818cf8', bg: 'rgba(129,140,248,0.08)',  glyph: 'D' },
  Fusion:       { label: 'Fusion',        color: '#a78bfa', bg: 'rgba(167,139,250,0.08)',  glyph: 'F' },
  Latin_Urbano: { label: 'Latin Urbano',  color: '#f472b6', bg: 'rgba(244,114,182,0.08)', glyph: 'L' },
  Rap:          { label: 'Rap',           color: '#fbbf24', bg: 'rgba(251,191,36,0.08)',   glyph: 'R' },
  Reggaeton:    { label: 'Reggaeton',     color: '#22d3ee', bg: 'rgba(34,211,238,0.08)',   glyph: 'R' },
  Trap:         { label: 'Trap',          color: '#f87171', bg: 'rgba(248,113,113,0.08)',  glyph: 'T' },
}

const GENRE_COUNTS: Record<GenreKey, number> = {
  Afrobeat: 148, Drill: 127, Fusion: 325, Latin_Urbano: 84,
  Rap: 125, Reggaeton: 124, Trap: 112,
}

const GENRES = Object.keys(GENRE_CONFIG) as GenreKey[]

const PAGE_SIZE = 25

// ── Track row ─────────────────────────────────────────────────────────────────

function TrackRow({ beat, isActive, onPlay }: { beat: Instrumental; isActive: boolean; onPlay: () => void }) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-150 ${
        isActive
          ? 'border-(--color-accent)/40 bg-(--color-accent)/5'
          : 'border-(--color-border) bg-(--color-surface) hover:border-(--color-muted)/60 hover:bg-(--color-background)'
      }`}
      onClick={onPlay}
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center text-sm">
        {isActive ? (
          <span className="text-(--color-accent) text-base">▶</span>
        ) : (
          <span className="text-(--color-border) text-base">▷</span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-semibold leading-tight ${isActive ? 'text-(--color-accent)' : 'text-(--color-foreground)'}`}>
          {beat.title}
        </p>
        <div className="mt-0.5 flex flex-wrap gap-1.5">
          {beat.subgenre && beat.subgenre !== beat.genre && (
            <span className="rounded border border-(--color-border) px-1.5 py-0.5 text-[10px] text-(--color-muted)">
              {beat.subgenre}
            </span>
          )}
          {beat.mood && (
            <span className="rounded border border-(--color-border) px-1.5 py-0.5 text-[10px] text-(--color-muted)">
              {beat.mood}
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

// ── Genre grid ────────────────────────────────────────────────────────────────

function GenreCard({
  genreKey,
  onBrowse,
  onPlay,
}: {
  genreKey: GenreKey
  onBrowse: () => void
  onPlay: () => void
}) {
  const cfg = GENRE_CONFIG[genreKey]
  const count = GENRE_COUNTS[genreKey]
  return (
    <div
      className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-xl border p-5 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
      style={{ borderColor: cfg.color + '33', backgroundColor: cfg.bg }}
      onClick={onBrowse}
    >
      {/* Background glyph */}
      <span
        className="pointer-events-none absolute -right-2 -bottom-4 text-8xl font-black opacity-[0.06] select-none"
        style={{ color: cfg.color }}
        aria-hidden
      >
        {cfg.glyph}
      </span>

      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-bold text-(--color-foreground)">{cfg.label}</p>
          <p className="mt-0.5 text-xs text-(--color-muted)">{count.toLocaleString()} tracks</p>
        </div>
        {/* Play button */}
        <button
          type="button"
          aria-label={`Play ${cfg.label}`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-150 opacity-60 group-hover:opacity-100"
          style={{ borderColor: cfg.color + '66', color: cfg.color }}
          onClick={(e) => { e.stopPropagation(); onPlay() }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>

      <div className="mt-4 h-0.5 w-full rounded-full opacity-20" style={{ backgroundColor: cfg.color }} />
    </div>
  )
}

function GenreGrid({
  totalTracks,
  onBrowseAll,
  onPlayAll,
  onBrowseGenre,
  onPlayGenre,
}: {
  totalTracks: number
  onBrowseAll: () => void
  onPlayAll: () => void
  onBrowseGenre: (g: GenreKey) => void
  onPlayGenre: (g: GenreKey) => void
}) {
  return (
    <div>
      {/* Top actions */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={onBrowseAll}
          className="rounded-lg border border-(--color-border) bg-(--color-surface) px-4 py-2 text-sm text-(--color-muted) hover:border-(--color-muted) hover:text-(--color-foreground) transition-colors"
        >
          All {totalTracks.toLocaleString()} tracks
        </button>
        <button
          type="button"
          onClick={onPlayAll}
          className="flex items-center gap-2 rounded-lg bg-(--color-accent) px-4 py-2 text-sm font-semibold text-(--color-background) hover:opacity-90 transition-opacity"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
          Shuffle All
        </button>
      </div>

      {/* Genre cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {GENRES.map((g) => (
          <GenreCard
            key={g}
            genreKey={g}
            onBrowse={() => onBrowseGenre(g)}
            onPlay={() => onPlayGenre(g)}
          />
        ))}
      </div>
    </div>
  )
}

// ── Track browser ─────────────────────────────────────────────────────────────

function TrackBrowser({
  initialTracks,
  initialTotal,
  genre,
  onBack,
}: {
  initialTracks: Instrumental[]
  initialTotal: number
  genre: GenreKey | ''
  onBack: () => void
}) {
  const { currentTrack, playTrack, shuffle, toggleShuffle } = usePlayer()
  const [tracks, setTracks] = useState<Instrumental[]>(initialTracks)
  const [total, setTotal] = useState(initialTotal)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isFirstRender = useRef(true)
  const listRef = useRef<HTMLDivElement>(null)

  const cfg = genre ? GENRE_CONFIG[genre] : null
  const totalPages = Math.ceil(total / PAGE_SIZE)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => setDebouncedSearch(search), 300)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [search])

  const fetchTracks = useCallback(async (nextPage: number) => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(nextPage), limit: String(PAGE_SIZE) })
    if (genre) params.set('genre', genre)
    if (debouncedSearch) params.set('q', debouncedSearch)
    try {
      const res = await fetch(`/api/instrumentals?${params}`)
      const json = await res.json()
      setTracks(json.data)
      setTotal(json.total)
      setPage(nextPage)
      listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } finally {
      setLoading(false)
    }
  }, [genre, debouncedSearch])

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return }
    fetchTracks(1)
  }, [debouncedSearch]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    isFirstRender.current = true
    setSearch('')
    setDebouncedSearch('')
    fetchTracks(1)
  }, [genre]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleShufflePlay = () => {
    if (tracks.length === 0) return
    if (!shuffle) toggleShuffle()
    const idx = Math.floor(Math.random() * tracks.length)
    playTrack(tracks[idx], tracks)
  }

  return (
    <div ref={listRef}>
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-3 flex-wrap">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-(--color-muted) hover:text-(--color-foreground) transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m15 18-6-6 6-6" />
          </svg>
          All Genres
        </button>
        {cfg && (
          <>
            <span className="text-(--color-border)">/</span>
            <span className="text-sm font-semibold" style={{ color: cfg.color }}>{cfg.label}</span>
          </>
        )}
        <span className="ml-auto text-xs text-(--color-muted)">{total.toLocaleString()} tracks</span>
      </div>

      {/* Controls */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[160px] rounded-lg border border-(--color-border) bg-(--color-surface) px-3 py-2 text-sm text-(--color-foreground) placeholder:text-(--color-border) focus:border-(--color-accent) focus:outline-none transition-colors"
        />
        <button
          type="button"
          onClick={handleShufflePlay}
          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
            shuffle
              ? 'border-(--color-accent)/40 bg-(--color-accent)/10 text-(--color-accent)'
              : 'border-(--color-border) bg-(--color-surface) text-(--color-muted) hover:border-(--color-muted) hover:text-(--color-foreground)'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" />
            <polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" />
          </svg>
          Shuffle
        </button>
      </div>

      {/* Track list */}
      {loading ? (
        <div className="flex flex-col gap-2">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={i} className="h-[62px] rounded-xl border border-(--color-border) bg-(--color-surface) animate-pulse" />
          ))}
        </div>
      ) : tracks.length === 0 ? (
        <p className="py-12 text-center text-sm text-(--color-muted)">No tracks found.</p>
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={page <= 1 || loading}
            onClick={() => fetchTracks(page - 1)}
            className="flex items-center gap-1.5 rounded-lg border border-(--color-border) px-4 py-2.5 text-sm text-(--color-muted) transition-colors hover:border-(--color-muted) hover:text-(--color-foreground) disabled:pointer-events-none disabled:opacity-30"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Prev
          </button>
          <span className="text-xs text-(--color-muted)">
            {page} / {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages || loading}
            onClick={() => fetchTracks(page + 1)}
            className="flex items-center gap-1.5 rounded-lg border border-(--color-border) px-4 py-2.5 text-sm text-(--color-muted) transition-colors hover:border-(--color-muted) hover:text-(--color-foreground) disabled:pointer-events-none disabled:opacity-30"
          >
            Next
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

// ── Instrumentals tab ─────────────────────────────────────────────────────────

function InstrumentalsTab({ initialTracks, initialTotal }: { initialTracks: Instrumental[]; initialTotal: number }) {
  const { playTrack, toggleShuffle } = usePlayer()
  const [view, setView] = useState<'genres' | 'tracks'>('genres')
  const [selectedGenre, setSelectedGenre] = useState<GenreKey | ''>('')
  const [browserTracks, setBrowserTracks] = useState<Instrumental[]>(initialTracks)
  const [browserTotal, setBrowserTotal] = useState(initialTotal)

  const fetchAndPlay = async (genre: GenreKey | '', startShuffle = false) => {
    const params = new URLSearchParams({ page: '1', limit: String(PAGE_SIZE) })
    if (genre) params.set('genre', genre)
    const res = await fetch(`/api/instrumentals?${params}`)
    const json = await res.json()
    if (json.data.length > 0) {
      if (startShuffle) {
        toggleShuffle()
        const idx = Math.floor(Math.random() * json.data.length)
        playTrack(json.data[idx], json.data)
      } else {
        playTrack(json.data[0], json.data)
      }
    }
  }

  const handleBrowseGenre = (g: GenreKey) => {
    setSelectedGenre(g)
    setBrowserTracks([])
    setBrowserTotal(GENRE_COUNTS[g])
    setView('tracks')
  }

  const handleBrowseAll = () => {
    setSelectedGenre('')
    setBrowserTracks(initialTracks)
    setBrowserTotal(initialTotal)
    setView('tracks')
  }

  const handleBack = () => {
    setView('genres')
  }

  if (view === 'genres') {
    return (
      <GenreGrid
        totalTracks={initialTotal}
        onBrowseAll={handleBrowseAll}
        onPlayAll={() => fetchAndPlay('', true)}
        onBrowseGenre={handleBrowseGenre}
        onPlayGenre={(g) => fetchAndPlay(g, true)}
      />
    )
  }

  return (
    <TrackBrowser
      key={selectedGenre}
      initialTracks={browserTracks}
      initialTotal={browserTotal}
      genre={selectedGenre}
      onBack={handleBack}
    />
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
          <span className="text-5xl select-none">📦</span>
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
          className="mt-4 flex w-full items-center justify-center rounded-md bg-(--color-accent) py-2 text-xs font-semibold tracking-wide text-(--color-background) hover:opacity-90 transition-opacity"
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
                  {count.toLocaleString()}
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
