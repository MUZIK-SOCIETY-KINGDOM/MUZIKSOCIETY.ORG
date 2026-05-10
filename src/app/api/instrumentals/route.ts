import { createClient } from '@/lib/supabase/server'
import { fixDriveUrl, getAudioProxyUrl } from '@/lib/utils'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '50')))
  const genre = searchParams.get('genre')
  const subgenre = searchParams.get('subgenre')
  const search = searchParams.get('q')
  const offset = (page - 1) * limit

  const supabase = await createClient()
  let query = supabase
    .from('ms_instrumentals')
    .select('*', { count: 'exact' })
    .eq('published', true)

  if (genre) query = query.eq('genre', genre)
  if (subgenre) query = query.eq('subgenre', subgenre)
  if (search) query = query.ilike('title', `%${search}%`)

  const { data, error, count } = await query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const rows = (data ?? []).map((row) => ({
    ...row,
    preview_url: getAudioProxyUrl(row.preview_url),
    external_url: fixDriveUrl(row.external_url),
  }))

  return NextResponse.json({
    data: rows,
    total: count ?? 0,
    page,
    limit,
    pages: Math.ceil((count ?? 0) / limit),
  })
}
