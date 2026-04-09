import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

const adminLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/instrumentals', label: 'Instrumentals' },
  { href: '/admin/sample-packs', label: 'Sample Packs' },
  { href: '/admin/tools', label: 'Tools' },
  { href: '/admin/portfolio', label: 'Portfolio' },
  { href: '/admin/blog', label: 'Blog' },
  { href: '/admin/inquiries', label: 'Inquiries' },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="min-h-screen flex">
      {/* Admin sidebar */}
      <aside className="w-56 border-r border-(--color-border) bg-(--color-surface) p-6 flex flex-col gap-2">
        <p className="text-xs font-bold tracking-widest text-(--color-accent) mb-4 uppercase">
          Admin
        </p>
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-xs text-(--color-muted) hover:text-(--color-foreground) transition-colors py-1"
          >
            {link.label}
          </Link>
        ))}
      </aside>

      {/* Admin content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  )
}
