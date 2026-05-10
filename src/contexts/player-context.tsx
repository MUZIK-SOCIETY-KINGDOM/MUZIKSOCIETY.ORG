'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import type { Instrumental } from '@/lib/types'

interface PlayerContextValue {
  currentTrack: Instrumental | null
  queue: Instrumental[]
  playing: boolean
  progress: number
  duration: number
  shuffle: boolean
  playTrack: (track: Instrumental, queue?: Instrumental[]) => void
  togglePlay: () => void
  next: () => void
  prev: () => void
  seek: (pct: number) => void
  toggleShuffle: () => void
}

const PlayerContext = createContext<PlayerContextValue | null>(null)

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider')
  return ctx
}

function pickRandom(length: number, exclude: number): number {
  if (length <= 1) return 0
  let idx: number
  do { idx = Math.floor(Math.random() * length) } while (idx === exclude)
  return idx
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentTrack, setCurrentTrack] = useState<Instrumental | null>(null)
  const [queue, setQueue] = useState<Instrumental[]>([])
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [shuffle, setShuffle] = useState(false)

  const currentIndexRef = useRef(-1)
  const shuffleRef = useRef(false)

  const toggleShuffle = useCallback(() => {
    setShuffle((s) => {
      shuffleRef.current = !s
      return !s
    })
  }, [])

  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'metadata'
    audioRef.current = audio

    const onTimeUpdate = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration)
    }
    const onDurationChange = () => setDuration(audio.duration || 0)
    const onEnded = () => {
      setQueue((q) => {
        let nextIdx: number
        if (shuffleRef.current && q.length > 1) {
          nextIdx = pickRandom(q.length, currentIndexRef.current)
        } else {
          nextIdx = currentIndexRef.current + 1
          if (nextIdx >= q.length) {
            setPlaying(false)
            return q
          }
        }
        const next = q[nextIdx]
        currentIndexRef.current = nextIdx
        setCurrentTrack(next)
        audio.src = next.preview_url ?? ''
        audio.play().catch(() => {})
        setPlaying(true)
        return q
      })
    }
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('durationchange', onDurationChange)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('durationchange', onDurationChange)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
    }
  }, [])

  const playTrack = useCallback((track: Instrumental, newQueue?: Instrumental[]) => {
    const audio = audioRef.current
    if (!audio) return

    const q = newQueue ?? queue
    if (newQueue) setQueue(newQueue)

    const idx = q.findIndex((t) => t.id === track.id)
    currentIndexRef.current = idx

    setCurrentTrack(track)
    setProgress(0)
    audio.src = track.preview_url ?? ''
    audio.play().catch(() => {})
    setPlaying(true)
  }, [queue])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !currentTrack) return
    if (playing) {
      audio.pause()
    } else {
      audio.play().catch(() => {})
    }
  }, [playing, currentTrack])

  const next = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    let nextIdx: number
    if (shuffleRef.current && queue.length > 1) {
      nextIdx = pickRandom(queue.length, currentIndexRef.current)
    } else {
      nextIdx = currentIndexRef.current + 1
      if (nextIdx >= queue.length) return
    }
    const track = queue[nextIdx]
    currentIndexRef.current = nextIdx
    setCurrentTrack(track)
    setProgress(0)
    audio.src = track.preview_url ?? ''
    audio.play().catch(() => {})
    setPlaying(true)
  }, [queue])

  const prev = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.currentTime > 3) {
      audio.currentTime = 0
      return
    }
    const prevIdx = currentIndexRef.current - 1
    if (prevIdx < 0) return
    const track = queue[prevIdx]
    currentIndexRef.current = prevIdx
    setCurrentTrack(track)
    setProgress(0)
    audio.src = track.preview_url ?? ''
    audio.play().catch(() => {})
    setPlaying(true)
  }, [queue])

  const seek = useCallback((pct: number) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    audio.currentTime = pct * audio.duration
  }, [])

  return (
    <PlayerContext.Provider
      value={{ currentTrack, queue, playing, progress, duration, shuffle, playTrack, togglePlay, next, prev, seek, toggleShuffle }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
