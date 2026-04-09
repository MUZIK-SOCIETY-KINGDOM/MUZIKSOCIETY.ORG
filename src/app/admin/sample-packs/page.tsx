import { createClient } from '@/lib/supabase/server'
import { createSamplePack, deleteSamplePack } from './actions'
import type { SamplePack } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function AdminSamplePacksPage() {
  const supabase = await createClient()
  const { data: packs } = await supabase
    .from('ms_sample_packs')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-xl font-bold text-[--color-foreground] mb-8">Sample Packs</h1>
      <form action={createSamplePack} className="mb-10 rounded-lg border border-[--color-border] bg-[--color-surface] p-6 space-y-4">
        <h2 className="text-sm font-bold text-[--color-foreground]">Add New</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="title" required placeholder="Title *" className="input-field" />
          <input name="cover_url" placeholder="Cover URL" className="input-field" />
          <input name="preview_url" placeholder="Preview URL" className="input-field" />
          <input name="external_url" required placeholder="SampleMonsta URL *" className="input-field" />
          <textarea name="description" placeholder="Description" className="input-field sm:col-span-2" rows={3} />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="published-sp" name="published" value="true" defaultChecked />
          <label htmlFor="published-sp" className="text-xs text-[--color-muted]">Published</label>
        </div>
        <button type="submit" className="admin-btn">Add Sample Pack</button>
      </form>
      <div className="space-y-2">
        {(packs as SamplePack[] ?? []).map((pack) => (
          <div key={pack.id} className="flex items-center justify-between rounded border border-[--color-border] bg-[--color-surface] px-4 py-3">
            <p className="text-sm font-semibold text-[--color-foreground]">{pack.title}</p>
            <div className="flex items-center gap-3">
              <span className={`text-xs ${pack.published ? 'text-green-400' : 'text-[--color-muted]'}`}>
                {pack.published ? 'Live' : 'Draft'}
              </span>
              <form action={deleteSamplePack.bind(null, pack.id)}>
                <button type="submit" className="text-xs text-red-400 hover:text-red-300">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
