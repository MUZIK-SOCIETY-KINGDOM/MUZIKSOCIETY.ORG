export type Instrumental = {
  id: string
  title: string
  genre: string | null
  bpm: number | null
  key: string | null
  cover_url: string | null
  preview_url: string | null
  external_url: string
  published: boolean
  created_at: string
}

export type SamplePack = {
  id: string
  title: string
  description: string | null
  cover_url: string | null
  preview_url: string | null
  external_url: string
  published: boolean
  created_at: string
}

export type Tool = {
  id: string
  name: string
  description: string | null
  cover_url: string | null
  live_url: string | null
  repo_url: string | null
  published: boolean
  created_at: string
}

export type PortfolioEntry = {
  id: string
  title: string
  artist: string | null
  year: number | null
  role: 'producer' | 'engineer' | 'developer'
  description: string | null
  cover_url: string | null
  published: boolean
  created_at: string
}

export type BlogPost = {
  id: string
  title: string
  slug: string
  body: string
  excerpt: string | null
  tags: string[] | null
  published: boolean
  published_at: string | null
  created_at: string
}

export type Inquiry = {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  created_at: string
}
