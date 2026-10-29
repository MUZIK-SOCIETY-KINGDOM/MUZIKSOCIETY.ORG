import type { Metadata } from 'next'
import { ContactForm } from '@/components/contact-form'
import { getLang } from '@/lib/lang-server'

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getLang()) === 'en' ? 'Contact — MuzikSociety' : 'Contacto — MuzikSociety' }
}

export default async function ContactPage() {
  const en = (await getLang()) === 'en'
  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <div className="mb-16">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-(--color-accent) uppercase">
          {en ? 'Contact' : 'Contacto'}
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-(--color-foreground) md:text-6xl">
          {en ? 'Let’s work.' : 'Trabajemos.'}
        </h1>
        <p className="mt-4 text-sm text-(--color-muted)">
          {en
            ? 'Sessions, collabs, quotes or any question: write me.'
            : 'Sesiones, colaboraciones, cotizaciones o cualquier pregunta: escríbeme.'}
        </p>
      </div>
      <ContactForm />
    </div>
  )
}
