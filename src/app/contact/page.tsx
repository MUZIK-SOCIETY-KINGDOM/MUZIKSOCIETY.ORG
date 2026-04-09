import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Contact — MuzikSociety',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <div className="mb-16">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-(--color-accent) uppercase">
          Contact
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-(--color-foreground) md:text-6xl">
          Let's Work.
        </h1>
        <p className="mt-4 text-sm text-(--color-muted)">
          Bookings, collabs, and general inquiries — hit me directly.
        </p>
      </div>
      <ContactForm />
    </div>
  )
}
