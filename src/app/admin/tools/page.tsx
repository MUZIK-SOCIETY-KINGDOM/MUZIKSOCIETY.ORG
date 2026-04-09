import { createClient } from '@/lib/supabase/server'
import { createTool, deleteTool } from './actions'
import type { Tool } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function AdminToolsPage() {
  const supabase = await createClient()
  const { data: tools } = await supabase
    .from('ms_tools')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-xl font-bold text-[--color-foreground] mb-8">Tools</h1>
      <form action={createTool} className="mb-10 rounded-lg border border-[--color-border] bg-[--color-surface] p-6 space-y-4">
        <h2 className="text-sm font-bold text-[--color-foreground]">Add New</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="name" required placeholder="Name *" className="input-field" />
          <input name="cover_url" placeholder="Cover URL" className="input-field" />
          <input name="live_url" placeholder="Live Demo URL" className="input-field" />
          <input name="repo_url" placeholder="GitHub URL" className="input-field" />
          <textarea name="description" placeholder="Description" className="input-field sm:col-span-2" rows={3} />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="published-t" name="published" value="true" defaultChecked />
          <label htmlFor="published-t" className="text-xs text-[--color-muted]">Published</label>
        </div>
        <button type="submit" className="admin-btn">Add Tool</button>
      </form>
      <div className="space-y-2">
        {(tools as Tool[] ?? []).map((tool) => (
          <div key={tool.id} className="flex items-center justify-between rounded border border-[--color-border] bg-[--color-surface] px-4 py-3">
            <p className="text-sm font-semibold text-[--color-foreground]">{tool.name}</p>
            <div className="flex items-center gap-3">
              <span className={`text-xs ${tool.published ? 'text-green-400' : 'text-[--color-muted]'}`}>
                {tool.published ? 'Live' : 'Draft'}
              </span>
              <form action={deleteTool.bind(null, tool.id)}>
                <button type="submit" className="text-xs text-red-400 hover:text-red-300">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
