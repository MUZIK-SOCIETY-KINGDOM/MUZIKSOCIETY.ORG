import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { BlogPost } from '@/lib/types'

type PostCardProps = {
  post: BlogPost
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-lg border border-[--color-border] bg-[--color-surface] p-6 hover:border-[--color-muted] transition-colors"
    >
      <div className="flex items-center gap-3 mb-3">
        {post.published_at && (
          <span className="text-xs text-[--color-muted]">
            {formatDate(post.published_at)}
          </span>
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
      <h2 className="font-bold text-base text-[--color-foreground] group-hover:text-[--color-accent] transition-colors mb-2">
        {post.title}
      </h2>
      {post.excerpt && (
        <p className="text-sm text-[--color-muted] leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
      )}
    </Link>
  )
}
