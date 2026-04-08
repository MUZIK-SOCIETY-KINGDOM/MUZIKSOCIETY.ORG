import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-[--color-border] bg-[--color-background] py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold tracking-[0.15em] text-[--color-foreground]">
              MUZIKSOCIETY
            </p>
            <p className="mt-1 text-xs text-[--color-muted]">
              Producer · Engineer · Developer
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            {[
              ['About', '/about'],
              ['Services', '/services'],
              ['Portfolio', '/portfolio'],
              ['Blog', '/blog'],
              ['Contact', '/contact'],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-xs text-[--color-muted] hover:text-[--color-foreground] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t border-[--color-border] pt-8">
          <p className="text-xs text-[--color-muted]">
            © {new Date().getFullYear()} MuzikSociety. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
