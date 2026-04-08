import { render, screen } from '@testing-library/react'
import { BeatCard } from '@/components/beat-card'
import type { Instrumental } from '@/lib/types'

const mockBeat: Instrumental = {
  id: '1',
  title: 'Dark Vibes',
  genre: 'Trap',
  bpm: 140,
  key: 'Am',
  cover_url: null,
  preview_url: null,
  external_url: 'https://samplemonsta.com/dark-vibes',
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

  it('renders a link to the external URL', () => {
    render(<BeatCard beat={mockBeat} />)
    const link = screen.getByRole('link', { name: /buy on samplemonsta/i })
    expect(link).toHaveAttribute('href', 'https://samplemonsta.com/dark-vibes')
    expect(link).toHaveAttribute('target', '_blank')
  })
})
