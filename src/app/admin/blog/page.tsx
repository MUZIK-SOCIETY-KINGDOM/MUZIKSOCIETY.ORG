import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { createBlogPost, deleteBlogPost } from './actions'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function AdminBlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('ms_blog_posts')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-xl font-bold text-[--color-foreground] mb-8">Blog</h1>

      {/* New post form */}
      <form action={createBlogPost} className="mb-10 rounded-lg border border-[--color-border] bg-[--color-surface] p-6 space-y-4">
        <h2 className="text-sm font-bold text-[--color-foreground]">New Post</h2>
        <input name="title" required placeholder="Title *" className="input-field" />
        <input name="excerpt" placeholder="Excerpt (optional)" className="input-field" />
        <input name="tags" placeholder="Tags (comma-separated, optional)" className="input-field" />
        <textarea
          name="body"
          required
          placeholder="Write in Markdown..."
          rows={12}
          className="input-field font-mono text-xs"
        />
        <div className="flex items-center gap-2">
          <input type="checkbox" id="published-b" name="published" value="true" />
          <label htmlFor="published-b" className="text-xs text-[--color-muted]">Publish immediately</label>
        </div>
        <button type="submit" className="admin-btn">Create Post</button>
      </form>

      {/* Posts list */}
      <div className="space-y-2">
        {(posts as BlogPost[] ?? []).map((post) => (
          <div key={post.id} className="flex items-center justify-between rounded border border-[--color-border] bg-[--color-surface] px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-[--color-foreground]">{post.title}</p>
              <p className="text-xs text-[--color-muted]">
                {post.published_at ? formatDate(post.published_at) : 'Draft'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-xs ${post.published ? 'text-green-400' : 'text-[--color-muted]'}`}>
                {post.published ? 'Live' : 'Draft'}
              </span>
              <Link
                href={`/admin/blog/${post.id}`}
                className="text-xs text-[--color-accent] hover:text-[--color-foreground]"
              >
                Edit
              </Link>
              <form action={deleteBlogPost.bind(null, post.id)}>
                <button type="submit" className="text-xs text-red-400 hover:text-red-300">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
