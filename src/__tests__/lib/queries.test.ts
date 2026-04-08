// @jest-environment node
// These tests verify the shape of query return values using mocked Supabase
jest.mock('@/lib/supabase/server', () => ({
  createClient: jest.fn(),
}))

import { getInstrumentals, getBlogPosts, getBlogPostBySlug } from '@/lib/queries'
import { createClient } from '@/lib/supabase/server'

describe('Query Functions', () => {
  const mockOrder = jest.fn()
  const mockSingle = jest.fn()
  const mockEq = jest.fn()
  const mockSelect = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()

    // Chain: select().eq().order()
    mockOrder.mockResolvedValue({ data: [], error: null })
    mockEq.mockReturnValue({
      order: mockOrder,
      single: mockSingle,
    })
    mockSelect.mockReturnValue({
      eq: mockEq,
    })

    ;(createClient as jest.Mock).mockResolvedValue({
      from: jest.fn().mockReturnValue({
        select: mockSelect,
      }),
    })
  })

  describe('getInstrumentals', () => {
    it('returns an empty array when no data', async () => {
      const result = await getInstrumentals()
      expect(result).toEqual([])
    })
  })

  describe('getBlogPosts', () => {
    it('returns an empty array when no data', async () => {
      const result = await getBlogPosts()
      expect(result).toEqual([])
    })
  })

  describe('getBlogPostBySlug', () => {
    it('returns null when post not found', async () => {
      mockSingle.mockResolvedValue({ data: null, error: { message: 'Not found' } })

      const result = await getBlogPostBySlug('nonexistent')
      expect(result).toBeNull()
    })
  })
})
