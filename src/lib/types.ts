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
  spotify_url: string | null
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

export type ConsultationTemplate = {
  id: string
  title: string
  description: string | null
  created_at: string
}

export type ConsultationQuestion = {
  id: string
  template_id: string
  section: string | null
  question: string
  type: 'text' | 'textarea' | 'select' | 'radio' | 'scale'
  options: string[] | null
  order_index: number
  required: boolean
  created_at: string
}

export type ConsultationSession = {
  id: string
  title: string
  artist_name: string
  email: string | null
  phone: string | null
  notes: string | null
  status: 'active' | 'completed' | 'archived'
  template_id: string | null
  created_at: string
}

export type ConsultationResponse = {
  id: string
  session_id: string
  question_id: string
  answer: string | null
  updated_at: string
}

export type Inquiry = {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  created_at: string
}
