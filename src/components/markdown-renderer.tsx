import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type MarkdownRendererProps = {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-extrabold text-[--color-foreground] mt-10 mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold text-[--color-foreground] mt-8 mb-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-bold text-[--color-foreground] mt-6 mb-2">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="text-base text-[--color-muted] leading-relaxed mb-4">{children}</p>
        ),
        a: ({ href, children }) => (
          <a href={href} className="text-[--color-accent] hover:underline" target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
        code: ({ children }) => (
          <code className="rounded bg-[--color-surface] px-1.5 py-0.5 text-sm font-mono text-[--color-accent]">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="rounded-lg bg-[--color-surface] border border-[--color-border] p-4 overflow-x-auto mb-4 text-sm">
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-[--color-accent] pl-4 italic text-[--color-muted] mb-4">
            {children}
          </blockquote>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside text-[--color-muted] mb-4 space-y-1">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside text-[--color-muted] mb-4 space-y-1">{children}</ol>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
