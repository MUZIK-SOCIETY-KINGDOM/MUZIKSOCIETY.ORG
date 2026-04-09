import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t border-(--color-border) bg-(--color-background) py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="MuzikSociety"
              width={40}
              height={40}
              className="rounded-sm opacity-80"
            />
            <div>
              <p className="text-sm font-bold tracking-[0.15em] text-(--color-foreground)">
                MUZIKSOCIETY
              </p>
              <p className="mt-0.5 text-xs text-(--color-muted)">
                Producer · Engineer · Developer · Creator
              </p>
            </div>
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
                className="text-xs text-(--color-muted) hover:text-(--color-foreground) transition-colors"
              >
                {label}
              </Link>
            ))}
            <a
              href="https://instagram.com/muziksociety"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-(--color-muted) hover:text-(--color-foreground) transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-(--color-border) pt-8">
          <p className="text-xs text-(--color-muted)">
            © {new Date().getFullYear()} MuzikSociety. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
