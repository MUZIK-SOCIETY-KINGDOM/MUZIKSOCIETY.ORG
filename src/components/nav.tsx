'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/instrumentals', label: 'Instrumentals' },
  { href: '/sample-packs', label: 'Sample Packs' },
  { href: '/tools', label: 'Tools' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[--color-border] bg-[--color-background]/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-sm font-bold tracking-[0.15em] text-[--color-foreground] hover:text-[--color-accent] transition-colors"
        >
          MUZIKSOCIETY
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? 'page' : undefined}
              className={`text-xs tracking-wide transition-colors ${
                pathname === link.href
                  ? 'text-[--color-foreground]'
                  : 'text-[--color-muted] hover:text-[--color-foreground]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded-md bg-[--color-accent] px-4 py-2 text-xs font-semibold tracking-wide text-[--color-background] hover:bg-[--color-accent-dark] transition-colors"
          >
            Contact
          </Link>
        </div>
      </nav>
    </header>
  )
}
