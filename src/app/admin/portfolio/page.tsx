import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { createPortfolioEntry, deletePortfolioEntry } from './actions'
import type { PortfolioEntry } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function AdminPortfolioPage() {
  const supabase = await createClient()
  const { data: entries } = await supabase
    .from('ms_portfolio')
    .select('*')
    .order('year', { ascending: false })

  return (
    <div>
      <h1 className="text-xl font-bold text-(--color-foreground) mb-8">Portfolio</h1>
      <form action={createPortfolioEntry} className="mb-10 rounded-lg border border-(--color-border) bg-(--color-surface) p-6 space-y-4">
        <h2 className="text-sm font-bold text-(--color-foreground)">Add Entry</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="title" required placeholder="Project Title *" className="input-field" />
          <input name="artist" placeholder="Artist / Client" className="input-field" />
          <input name="year" type="number" placeholder="Year" className="input-field" />
          <select name="role" className="input-field">
            <option value="producer">Producer</option>
            <option value="engineer">Engineer</option>
            <option value="developer">Developer</option>
          </select>
          <input name="spotify_url" placeholder="Spotify Track URL or Embed URL" className="input-field sm:col-span-2" />
          <input name="cover_url" placeholder="Cover URL (optional)" className="input-field sm:col-span-2" />
          <textarea name="description" placeholder="Description" className="input-field sm:col-span-2" rows={3} />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="published-p" name="published" value="true" defaultChecked />
          <label htmlFor="published-p" className="text-xs text-(--color-muted)">Published</label>
        </div>
        <button type="submit" className="admin-btn">Add Entry</button>
      </form>
      <div className="space-y-2">
        {(entries as PortfolioEntry[] ?? []).map((entry) => (
          <div key={entry.id} className="flex items-center justify-between rounded border border-(--color-border) bg-(--color-surface) px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-(--color-foreground)">{entry.title}</p>
              <p className="text-xs text-(--color-muted)">{entry.artist} · {entry.year} · {entry.role}</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href={`/admin/portfolio/${entry.id}`} className="text-xs text-(--color-muted) hover:text-(--color-foreground) transition-colors">Edit</Link>
              <form action={deletePortfolioEntry.bind(null, entry.id)}>
                <button type="submit" className="text-xs text-red-400 hover:text-red-300">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
