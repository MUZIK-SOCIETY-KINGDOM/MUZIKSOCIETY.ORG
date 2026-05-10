'use client'

import { usePlayer } from '@/contexts/player-context'

function fmt(secs: number): string {
  if (!isFinite(secs) || secs < 0) return '0:00'
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function BottomPlayer() {
  const { currentTrack, playing, progress, duration, shuffle, togglePlay, next, prev, seek, toggleShuffle } = usePlayer()

  if (!currentTrack) return null

  const elapsed = progress * duration

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-(--color-border) bg-(--color-surface)/95 backdrop-blur-md">
      {/* Seek bar */}
      <div
        className="h-1 w-full bg-(--color-border) cursor-pointer"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect()
          seek((e.clientX - rect.left) / rect.width)
        }}
      >
        <div
          className="h-full bg-(--color-accent) transition-none"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        {/* Track info */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--color-background) border border-(--color-border) text-base select-none">
            ♪
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-(--color-foreground) leading-tight">
              {currentTrack.title}
            </p>
            <div className="flex gap-2 mt-0.5">
              {currentTrack.genre && (
                <span className="text-[10px] text-(--color-muted)">{currentTrack.genre.replace(/_/g, ' ')}</span>
              )}
              {currentTrack.bpm && (
                <span className="text-[10px] text-(--color-muted)">{currentTrack.bpm} BPM</span>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex shrink-0 items-center gap-1">
          {/* Shuffle */}
          <button
            type="button"
            onClick={toggleShuffle}
            className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
              shuffle ? 'text-(--color-accent)' : 'text-(--color-border) hover:text-(--color-muted)'
            }`}
            aria-label="Toggle shuffle"
            title="Shuffle"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 3 21 8" />
              <line x1="4" y1="20" x2="21" y2="3" />
              <polyline points="21 16 21 21 16 21" />
              <line x1="15" y1="15" x2="21" y2="21" />
            </svg>
          </button>

          {/* Prev */}
          <button
            type="button"
            onClick={prev}
            className="flex h-8 w-8 items-center justify-center rounded-full text-(--color-muted) hover:text-(--color-foreground) transition-colors"
            aria-label="Previous"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z" />
            </svg>
          </button>

          {/* Play / Pause */}
          <button
            type="button"
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-accent) text-(--color-background) hover:opacity-90 transition-opacity"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={next}
            className="flex h-8 w-8 items-center justify-center rounded-full text-(--color-muted) hover:text-(--color-foreground) transition-colors"
            aria-label="Next"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zm2.5-6 5.5 3.9V8.1L8.5 12zM16 6h2v12h-2z" />
            </svg>
          </button>
        </div>

        {/* Time */}
        <div className="hidden shrink-0 items-center gap-1 sm:flex">
          <span className="text-xs tabular-nums text-(--color-muted)">{fmt(elapsed)}</span>
          <span className="text-xs text-(--color-border)">/</span>
          <span className="text-xs tabular-nums text-(--color-muted)">{fmt(duration)}</span>
        </div>
      </div>
    </div>
  )
}
