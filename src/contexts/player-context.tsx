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
  audioLoading: boolean
  playCount: number
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
  const preloadRef = useRef<HTMLAudioElement | null>(null)
  const currentIndexRef = useRef(-1)
  const shuffleRef = useRef(false)

  const [currentTrack, setCurrentTrack] = useState<Instrumental | null>(null)
  const [queue, setQueue] = useState<Instrumental[]>([])
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [shuffle, setShuffle] = useState(false)
  const [audioLoading, setAudioLoading] = useState(false)
  const [playCount, setPlayCount] = useState(0)

  // Stream straight from the proxy: playback starts after the first chunk
  // (Range requests) instead of waiting for the whole file to download
  const loadAndPlay = useCallback((audio: HTMLAudioElement, url: string) => {
    if (!url) return
    audio.pause()
    setAudioLoading(true)
    audio.src = url
    audio.play().catch(() => {})
  }, [])

  // Keep a stable ref so onEnded (created once) always calls the latest version
  const loadAndPlayRef = useRef(loadAndPlay)
  useEffect(() => { loadAndPlayRef.current = loadAndPlay }, [loadAndPlay])

  const toggleShuffle = useCallback(() => {
    setShuffle((s) => {
      shuffleRef.current = !s
      return !s
    })
  }, [])

  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'auto'
    audioRef.current = audio

    // Hidden element that warms up the next track in the queue
    const preloader = new Audio()
    preloader.preload = 'auto'
    preloader.muted = true
    preloadRef.current = preloader

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
        setProgress(0)
        setPlayCount((c) => c + 1)
        loadAndPlayRef.current(audio, next.preview_url ?? '')
        setPlaying(true)
        return q
      })
    }
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onReady = () => setAudioLoading(false)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('durationchange', onDurationChange)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('playing', onReady)
    audio.addEventListener('canplay', onReady)
    audio.addEventListener('error', onReady)

    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('durationchange', onDurationChange)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('playing', onReady)
      audio.removeEventListener('canplay', onReady)
      audio.removeEventListener('error', onReady)
      preloader.src = ''
    }
  }, [])

  // Preload the next track in order so skipping or auto-advance starts fast
  useEffect(() => {
    const preloader = preloadRef.current
    if (!preloader || !currentTrack || shuffle) return
    const idx = queue.findIndex((t) => t.id === currentTrack.id)
    const nextUrl = idx >= 0 ? queue[idx + 1]?.preview_url : null
    if (!nextUrl) return
    const timer = setTimeout(() => {
      if (preloader.src !== new URL(nextUrl, location.href).href) preloader.src = nextUrl
    }, 3000)
    return () => clearTimeout(timer)
  }, [currentTrack, queue, shuffle])

  const playTrack = useCallback((track: Instrumental, newQueue?: Instrumental[]) => {
    const audio = audioRef.current
    if (!audio) return
    const q = newQueue ?? queue
    if (newQueue) setQueue(newQueue)
    const idx = q.findIndex((t) => t.id === track.id)
    currentIndexRef.current = idx
    setCurrentTrack(track)
    setProgress(0)
    setDuration(0)
    setPlayCount((c) => c + 1)
    loadAndPlay(audio, track.preview_url ?? '')
    setPlaying(true)
  }, [queue, loadAndPlay])

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
    setDuration(0)
    setPlayCount((c) => c + 1)
    loadAndPlay(audio, track.preview_url ?? '')
    setPlaying(true)
  }, [queue, loadAndPlay])

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
    setDuration(0)
    loadAndPlay(audio, track.preview_url ?? '')
    setPlaying(true)
  }, [queue, loadAndPlay])

  const seek = useCallback((pct: number) => {
    const audio = audioRef.current
    if (!audio || !audio.duration) return
    audio.currentTime = pct * audio.duration
  }, [])

  return (
    <PlayerContext.Provider
      value={{
        currentTrack, queue, playing, progress, duration,
        shuffle, audioLoading, playCount,
        playTrack, togglePlay, next, prev, seek, toggleShuffle,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}
