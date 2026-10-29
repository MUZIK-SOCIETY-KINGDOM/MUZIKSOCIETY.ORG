import type { Metadata } from 'next'
import { getBlogPosts } from '@/lib/queries'
import { PostCard } from '@/components/post-card'
import { getLang } from '@/lib/lang-server'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog — MuzikSociety',
}

export default async function BlogPage() {
  const en = (await getLang()) === 'en'
  const posts = await getBlogPosts()

  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <div className="mb-16">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-(--color-accent) uppercase">
          Blog
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-(--color-foreground) md:text-6xl">
          {en ? 'What I think.' : 'Lo que pienso.'}
        </h1>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-(--color-muted)">
          {en ? 'No posts yet. Check back soon.' : 'Todavía no hay publicaciones. Vuelve pronto.'}
        </p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
