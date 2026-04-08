import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/lib/queries'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: `${post.title} — MuzikSociety`,
    description: post.excerpt ?? undefined,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/blog"
        className="mb-10 inline-block text-xs text-[--color-muted] hover:text-[--color-foreground] transition-colors"
      >
        ← Back to Blog
      </Link>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        {post.published_at && (
          <span className="text-xs text-[--color-muted]">{formatDate(post.published_at)}</span>
        )}
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded border border-[--color-border] px-2 py-0.5 text-xs text-[--color-muted]"
          >
            {tag}
          </span>
        ))}
      </div>

      <h1 className="mb-10 text-4xl font-extrabold tracking-tight text-[--color-foreground] md:text-5xl">
        {post.title}
      </h1>

      <div className="border-t border-[--color-border] pt-10">
        <MarkdownRenderer content={post.body} />
      </div>
    </div>
  )
}
