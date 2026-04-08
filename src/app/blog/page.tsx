import type { Metadata } from 'next'
import { getBlogPosts } from '@/lib/queries'
import { PostCard } from '@/components/post-card'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Blog — MuzikSociety',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="mx-auto max-w-4xl px-6 py-24">
      <div className="mb-16">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[--color-accent] uppercase">
          Blog
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-[--color-foreground] md:text-6xl">
          The Rambles.
        </h1>
      </div>

      {posts.length === 0 ? (
        <p className="text-sm text-[--color-muted]">No posts yet — come back soon.</p>
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
