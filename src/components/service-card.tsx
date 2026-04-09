import Link from 'next/link'

type ServiceCardProps = {
  icon: string
  title: string
  description: string
}

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="group rounded-lg border border-(--color-border) bg-(--color-surface) p-8 hover:border-(--color-muted) transition-colors">
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="mb-3 text-base font-bold text-(--color-foreground)">{title}</h3>
      <p className="mb-6 text-sm text-(--color-muted) leading-relaxed">{description}</p>
      <Link
        href="/contact"
        className="text-xs font-semibold tracking-wide text-(--color-accent) hover:text-(--color-foreground) transition-colors"
      >
        Let's Talk →
      </Link>
    </div>
  )
}
