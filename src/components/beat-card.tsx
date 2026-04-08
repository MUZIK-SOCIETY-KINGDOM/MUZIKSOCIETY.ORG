import Link from 'next/link'
import { AudioPlayer } from '@/components/audio-player'
import type { Instrumental } from '@/lib/types'

type BeatCardProps = {
  beat: Instrumental
}

export function BeatCard({ beat }: BeatCardProps) {
  return (
    <div className="rounded-lg border border-[--color-border] bg-[--color-surface] overflow-hidden hover:border-[--color-muted] transition-colors">
      {/* Cover */}
      <div className="aspect-square bg-[--color-background] flex items-center justify-center border-b border-[--color-border]">
        {beat.cover_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={beat.cover_url}
            alt={beat.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl font-black text-[--color-border]">♪</span>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-bold text-sm text-[--color-foreground] mb-2">{beat.title}</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {beat.genre && (
            <span className="rounded-sm border border-[--color-border] px-2 py-0.5 text-xs text-[--color-muted]">
              {beat.genre}
            </span>
          )}
          {beat.bpm && (
            <span className="rounded-sm border border-[--color-border] px-2 py-0.5 text-xs text-[--color-muted]">
              {beat.bpm} BPM
            </span>
          )}
          {beat.key && (
            <span className="rounded-sm border border-[--color-border] px-2 py-0.5 text-xs text-[--color-muted]">
              {beat.key}
            </span>
          )}
        </div>

        {beat.preview_url && <AudioPlayer src={beat.preview_url} />}

        <Link
          href={beat.external_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center rounded-md bg-[--color-accent] py-2 text-xs font-semibold tracking-wide text-[--color-background] hover:bg-[--color-accent-dark] transition-colors"
        >
          Buy on SampleMonsta
        </Link>
      </div>
    </div>
  )
}
