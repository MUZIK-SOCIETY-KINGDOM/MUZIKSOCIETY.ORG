import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { updatePortfolioEntry } from './actions'

export const dynamic = 'force-dynamic'

export default async function EditPortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: entry } = await supabase.from('ms_portfolio').select('*').eq('id', id).single()
  if (!entry) notFound()

  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-bold text-(--color-foreground) mb-8">Edit Portfolio Entry</h1>
      <form action={updatePortfolioEntry.bind(null, id)} className="rounded-lg border border-(--color-border) bg-(--color-surface) p-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="title" required defaultValue={entry.title} placeholder="Project Title *" className="input-field sm:col-span-2" />
          <input name="artist" defaultValue={entry.artist ?? ''} placeholder="Artist / Client" className="input-field" />
          <input name="year" type="number" defaultValue={entry.year ?? ''} placeholder="Year" className="input-field" />
          <select name="role" defaultValue={entry.role} className="input-field">
            <option value="producer">Producer</option>
            <option value="engineer">Engineer</option>
            <option value="developer">Developer</option>
          </select>
          <input name="url" defaultValue={entry.url ?? ''} placeholder="Website URL" className="input-field sm:col-span-2" />
          <input name="spotify_url" defaultValue={entry.spotify_url ?? ''} placeholder="Spotify URL" className="input-field" />
          <input name="cover_url" defaultValue={entry.cover_url ?? ''} placeholder="Cover URL" className="input-field sm:col-span-2" />
          <textarea name="description" defaultValue={entry.description ?? ''} placeholder="Description" className="input-field sm:col-span-2" rows={3} />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="pub" name="published" value="true" defaultChecked={entry.published} />
          <label htmlFor="pub" className="text-xs text-(--color-muted)">Published</label>
        </div>
        <button type="submit" className="admin-btn">Save Changes</button>
      </form>
    </div>
  )
}
