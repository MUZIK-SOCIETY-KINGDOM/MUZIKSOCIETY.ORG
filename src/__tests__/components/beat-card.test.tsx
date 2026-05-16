import { render, screen } from '@testing-library/react'
import { BeatCard } from '@/components/beat-card'
import type { Instrumental } from '@/lib/types'

const mockBeat: Instrumental = {
  id: '1',
  title: 'Dark Vibes',
  genre: 'Trap',
  subgenre: null,
  mood: null,
  bpm: 140,
  key: 'Am',
  cover_url: null,
  preview_url: null,
  external_url: null,
  published: true,
  created_at: '2026-01-01T00:00:00Z',
}

describe('BeatCard', () => {
  it('renders the beat title', () => {
    render(<BeatCard beat={mockBeat} />)
    expect(screen.getByText('Dark Vibes')).toBeInTheDocument()
  })

  it('renders genre and BPM', () => {
    render(<BeatCard beat={mockBeat} />)
    expect(screen.getByText('Trap')).toBeInTheDocument()
    expect(screen.getByText('140 BPM')).toBeInTheDocument()
  })

  it('does not render an audio player when preview_url is null', () => {
    render(<BeatCard beat={mockBeat} />)
    expect(screen.queryByRole('slider')).not.toBeInTheDocument()
  })
})
