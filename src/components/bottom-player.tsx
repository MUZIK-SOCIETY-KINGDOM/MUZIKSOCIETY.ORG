'use client'

import { usePlayer } from '@/contexts/player-context'

function fmt(secs: number): string {
  if (!isFinite(secs) || secs < 0) return '0:00'
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function BottomPlayer() {
  const { currentTrack, playing, progress, duration, togglePlay, next, prev, seek } = usePlayer()

  if (!currentTrack) return null

  const elapsed = progress * duration
  const remaining = duration - elapsed

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-(--color-border) bg-(--color-surface)/95 backdrop-blur-md">
      {/* Seek bar — full width strip at top */}
      <div
        className="h-0.5 w-full bg-(--color-border) cursor-pointer group"
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

      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        {/* Track info */}
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--color-background) border border-(--color-border) text-lg">
            ♪
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-(--color-foreground) leading-tight">
              {currentTrack.title}
            </p>
            <div className="flex gap-2 mt-0.5">
              {currentTrack.genre && (
                <span className="text-[10px] text-(--color-muted) truncate">{currentTrack.genre}</span>
              )}
              {currentTrack.bpm && (
                <span className="text-[10px] text-(--color-muted)">{currentTrack.bpm} BPM</span>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex shrink-0 items-center gap-2">
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

          <button
            type="button"
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-accent) text-(--color-background) hover:bg-(--color-accent)/90 transition-colors"
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
          <span className="text-xs tabular-nums text-(--color-muted)">{fmt(duration || remaining)}</span>
        </div>
      </div>
    </div>
  )
}
