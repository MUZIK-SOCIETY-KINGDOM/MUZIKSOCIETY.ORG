'use client'

import { useRef, useState } from 'react'

type AudioPlayerProps = {
  src: string
}

export function AudioPlayer({ src }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  function toggle() {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setPlaying(!playing)
  }

  return (
    <div className="flex items-center gap-3 mt-3">
      <button
        type="button"
        onClick={toggle}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-(--color-accent) text-(--color-background) hover:bg-(--color-accent-dark) transition-colors text-xs"
        aria-label={playing ? 'Pause preview' : 'Play preview'}
      >
        {playing ? '⏸' : '▶'}
      </button>
      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setPlaying(false)}
        className="hidden"
      />
      <span className="text-xs text-(--color-muted)">Preview</span>
    </div>
  )
}
