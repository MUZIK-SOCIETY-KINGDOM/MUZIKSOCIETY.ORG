import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { updateBlogPost } from '../actions'

export const dynamic = 'force-dynamic'

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('ms_blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (!post) notFound()

  return (
    <div>
      <h1 className="text-xl font-bold text-[--color-foreground] mb-8">Edit Post</h1>
      <form action={updateBlogPost.bind(null, id)} className="space-y-4">
        <input
          name="title"
          required
          defaultValue={post.title}
          placeholder="Title *"
          className="input-field"
        />
        <input
          name="excerpt"
          defaultValue={post.excerpt ?? ''}
          placeholder="Excerpt"
          className="input-field"
        />
        <input
          name="tags"
          defaultValue={post.tags?.join(', ') ?? ''}
          placeholder="Tags (comma-separated)"
          className="input-field"
        />
        <textarea
          name="body"
          required
          defaultValue={post.body}
          rows={20}
          className="input-field font-mono text-xs"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published-edit"
            name="published"
            value="true"
            defaultChecked={post.published}
          />
          <label htmlFor="published-edit" className="text-xs text-[--color-muted]">Published</label>
        </div>
        <button type="submit" className="admin-btn">Save Changes</button>
      </form>
    </div>
  )
}
