import { slugify, formatDate } from '@/lib/utils'

describe('slugify', () => {
  it('converts a title to a URL slug', () => {
    expect(slugify('My New Blog Post')).toBe('my-new-blog-post')
  })
  it('strips special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world')
  })
  it('collapses multiple spaces', () => {
    expect(slugify('Too   Many   Spaces')).toBe('too-many-spaces')
  })
})

describe('formatDate', () => {
  it('formats an ISO date string to Month DD, YYYY', () => {
    expect(formatDate('2026-01-15T00:00:00Z')).toBe('January 15, 2026')
  })
})
