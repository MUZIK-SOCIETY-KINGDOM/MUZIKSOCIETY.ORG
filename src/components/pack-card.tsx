import Link from 'next/link'
import { AudioPlayer } from '@/components/audio-player'
import type { SamplePack } from '@/lib/types'

type PackCardProps = {
  pack: SamplePack
}

export function PackCard({ pack }: PackCardProps) {
  return (
    <div className="rounded-lg border border-(--color-border) bg-(--color-surface) overflow-hidden hover:border-(--color-muted) transition-colors">
      <div className="aspect-square bg-(--color-background) flex items-center justify-center border-b border-(--color-border)">
        {pack.cover_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={pack.cover_url}
            alt={pack.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-4xl font-black text-(--color-border)">📦</span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-sm text-(--color-foreground) mb-2">{pack.title}</h3>
        {pack.description && (
          <p className="text-xs text-(--color-muted) mb-3 leading-relaxed">{pack.description}</p>
        )}
        {pack.preview_url && <AudioPlayer src={pack.preview_url} />}
        <Link
          href={pack.external_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center rounded-md bg-(--color-accent) py-2 text-xs font-semibold tracking-wide text-(--color-background) hover:bg-(--color-accent-dark) transition-colors"
        >
          Get it on SampleMonsta
        </Link>
      </div>
    </div>
  )
}
