import Link from 'next/link'

const sections = [
  {
    href: '/instrumentals',
    label: 'Instrumentals',
    description: 'Original beats — listen, preview, buy.',
  },
  {
    href: '/sample-packs',
    label: 'Sample Packs',
    description: 'Production-ready samples and loops.',
  },
  {
    href: '/tools',
    label: 'Tools',
    description: 'Tools built for producers, engineers, and artists.',
  },
  {
    href: '/portfolio',
    label: 'Portfolio',
    description: '20+ years of credits, sessions, and releases.',
  },
  {
    href: '/services',
    label: 'Services',
    description: 'Production, mixing, mastering, and development.',
  },
  {
    href: '/blog',
    label: 'Blog',
    description: "Thoughts, process, and industry rambles.",
  },
]

export function SectionTeasers() {
  return (
    <section className="border-t border-(--color-border) bg-(--color-surface)">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-px bg-(--color-border) sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col gap-2 bg-(--color-surface) p-8 hover:bg-(--color-background) transition-colors"
            >
              <span className="text-xs font-semibold tracking-[0.15em] text-(--color-accent) uppercase">
                {s.label}
              </span>
              <span className="text-sm text-(--color-muted) group-hover:text-(--color-foreground) transition-colors">
                {s.description}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
