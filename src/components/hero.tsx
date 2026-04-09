import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-4 text-xs font-semibold tracking-[0.25em] text-(--color-accent) uppercase">
          Producer · Engineer · Developer · Creator
        </p>
        <h1 className="text-5xl font-extrabold tracking-tight text-(--color-foreground) md:text-7xl lg:text-8xl">
          20+ Years.
          <br />
          <span className="text-(--color-muted)">One Standard.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-(--color-muted) leading-relaxed md:text-lg">
          Crafting sounds that move people.
          <br />
          Building tools that move industries.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded-md bg-(--color-accent) px-6 py-3 text-sm font-semibold tracking-wide text-(--color-background) hover:bg-(--color-accent-dark) transition-colors"
          >
            Book a Session
          </Link>
          <Link
            href="/portfolio"
            className="rounded-md border border-(--color-border) px-6 py-3 text-sm font-semibold tracking-wide text-(--color-foreground) hover:border-(--color-muted) transition-colors"
          >
            Browse Work
          </Link>
        </div>
      </div>
    </section>
  )
}
