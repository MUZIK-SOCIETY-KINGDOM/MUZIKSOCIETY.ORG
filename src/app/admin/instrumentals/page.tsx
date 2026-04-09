import { createClient } from '@/lib/supabase/server'
import { createInstrumental, deleteInstrumental } from './actions'
import type { Instrumental } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function AdminInstrumentalsPage() {
  const supabase = await createClient()
  const { data: beats } = await supabase
    .from('ms_instrumentals')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-xl font-bold text-[--color-foreground] mb-8">Instrumentals</h1>

      {/* Create form */}
      <form action={createInstrumental} className="mb-10 rounded-lg border border-[--color-border] bg-[--color-surface] p-6 space-y-4">
        <h2 className="text-sm font-bold text-[--color-foreground]">Add New</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="title" required placeholder="Title *" className="input-field" />
          <input name="genre" placeholder="Genre" className="input-field" />
          <input name="bpm" type="number" placeholder="BPM" className="input-field" />
          <input name="key" placeholder="Key (e.g. Am)" className="input-field" />
          <input name="cover_url" placeholder="Cover URL" className="input-field" />
          <input name="preview_url" placeholder="Preview URL" className="input-field" />
          <input name="external_url" required placeholder="SampleMonsta URL *" className="input-field sm:col-span-2" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="published" name="published" value="true" defaultChecked />
          <label htmlFor="published" className="text-xs text-[--color-muted]">Published</label>
        </div>
        <button type="submit" className="admin-btn">Add Instrumental</button>
      </form>

      {/* Table */}
      <div className="space-y-2">
        {(beats as Instrumental[] ?? []).map((beat) => (
          <div
            key={beat.id}
            className="flex items-center justify-between rounded border border-[--color-border] bg-[--color-surface] px-4 py-3"
          >
            <div>
              <p className="text-sm font-semibold text-[--color-foreground]">{beat.title}</p>
              <p className="text-xs text-[--color-muted]">
                {[beat.genre, beat.bpm && `${beat.bpm} BPM`, beat.key].filter(Boolean).join(' · ')}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs ${beat.published ? 'text-green-400' : 'text-[--color-muted]'}`}>
                {beat.published ? 'Live' : 'Draft'}
              </span>
              <form action={deleteInstrumental.bind(null, beat.id)}>
                <button type="submit" className="text-xs text-red-400 hover:text-red-300 transition-colors">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
