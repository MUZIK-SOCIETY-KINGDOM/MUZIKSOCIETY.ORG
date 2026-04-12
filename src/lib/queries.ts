import { createClient } from '@/lib/supabase/server'
import type { Instrumental, SamplePack, Tool, PortfolioEntry, BlogPost } from '@/lib/types'

export async function getInstrumentals(): Promise<Instrumental[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ms_instrumentals')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
  if (error) return []
  return data ?? []
}

export async function getSamplePacks(): Promise<SamplePack[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ms_sample_packs')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
  if (error) return []
  return data ?? []
}

export async function getTools(): Promise<Tool[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ms_tools')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
  if (error) return []
  return data ?? []
}

export async function getPortfolioEntries(role?: string): Promise<PortfolioEntry[]> {
  const supabase = await createClient()
  let query = supabase
    .from('ms_portfolio')
    .select('*')
    .eq('published', true)
    .order('year', { ascending: false })
  if (role && role !== 'all') {
    query = query.eq('role', role)
  }
  const { data, error } = await query
  if (error) return []
  return data ?? []
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ms_blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })
  if (error) return []
  return data ?? []
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ms_blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  if (error) return null
  return data
}
