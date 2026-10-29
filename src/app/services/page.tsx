import type { Metadata } from 'next'
import Image from 'next/image'
import catalogEs from '@/data/servicios.json'
import catalogEn from '@/data/servicios.en.json'
import { getLang } from '@/lib/lang-server'
import type { Lang } from '@/lib/lang'
import OpenOnHash from './open-on-hash'
import ShowcaseStrip from './showcase-strip'

// Data comes from briefs/capabilities/build_catalogo_cliente.py (public mode), same source as the PDF.
// Edit the catalog there and re-run `python build_catalogo_cliente.py public`; never edit the JSON by hand.

export async function generateMetadata(): Promise<Metadata> {
  return (await getLang()) === 'en'
    ? {
        title: 'Services — MuzikSociety',
        description: 'Music, education, career, content and technology for artists and businesses. Custom quotes.',
      }
    : {
        title: 'Servicios — MuzikSociety',
        description: 'Música, educación, carrera, contenido y tecnología para artistas y negocios. Cotización a la medida.',
      }
}

type Extra = { title: string; body: string | string[] }
type Service = {
  code: string
  cat: string
  name: string
  promise: string
  forWho: string
  includes: string[]
  steps: string[]
  extra: Extra[]
  important?: string | null
  gallery: { src: string; caption: string }[]
  brandkits?: { pdf: string; cover: string; name: string }[]
}

const WHATSAPP = 'https://wa.me/573006864470'
const PDF = '/MuzikSociety-catalogo-servicios.pdf'
// Short line under each category title, keyed by catalog category key.
const BLURB: Record<Lang, Record<string, string>> = {
  es: {
    A: 'De la idea a la canción lista. Los splits se acuerdan por escrito desde el inicio.',
    B: 'Clases y mentoría para producir y mezclar mejor.',
    C: 'Plan, dirección y negocio para tu carrera.',
    D: 'Contenido y piezas visuales para que tu música se vea.',
    E: 'Webs, apps, IA y plugins hechos a la medida.',
  },
  en: {
    A: 'From idea to finished song. Splits are agreed in writing from day one.',
    B: 'Lessons and mentoring to produce and mix better.',
    C: 'Plan, direction and business for your career.',
    D: 'Content and visuals so your music gets seen.',
    E: 'Custom websites, apps, AI and plugins.',
  },
}

const T = {
  es: {
    forWho: 'Para quién', includes: 'Qué incluye', steps: 'Cómo funciona', important: 'Importante',
    gallery: 'Interfaces que hemos diseñado', custom: 'Cotización a la medida', tools: 'Herramientas',
    quote: 'Pedir cotización →', kicker: 'Catálogo de servicios · 2026', title: 'Lo que hago.',
    intro: 'Música, carrera, contenido y tecnología para artistas y negocios. Cotización a la medida, en Medellín o remoto, en español o inglés.',
    recent: 'Trabajo reciente', pdf: 'Descargar catálogo (PDF)', brand: 'Manuales de marca', brandOne: 'Manual de marca',
    service: 'servicio', services: 'servicios',
    brandIntro: 'Identidad completa para artistas del estudio. Toca una portada para ver el PDF.',
    brandAlt: 'Manual de marca de', viewPdf: 'Ver PDF',
    missing: '¿No ves lo que buscas?', missingSub: 'Cuéntame tu proyecto y armamos la propuesta juntos.',
    wa: 'Escríbeme por WhatsApp',
    quoteMsg: (code: string, name: string) => `Hola Santi, me interesa ${code} · ${name}. ¿Me armas una cotización?`,
  },
  en: {
    forWho: 'Who it’s for', includes: 'What’s included', steps: 'How it works', important: 'Important',
    gallery: 'Interfaces we’ve designed', custom: 'Custom quote', tools: 'Tools',
    quote: 'Get a quote →', kicker: 'Services catalog · 2026', title: 'What I do.',
    intro: 'Music, career, content and technology for artists and businesses. Custom quotes, in Medellín or remote, in English or Spanish.',
    recent: 'Recent work', pdf: 'Download catalog (PDF, Spanish)', brand: 'Brand guides', brandOne: 'Brand guide',
    service: 'service', services: 'services',
    brandIntro: 'Full identity for the studio’s artists. Tap a cover to see the PDF.',
    brandAlt: 'Brand guide for', viewPdf: 'View PDF',
    missing: 'Don’t see what you need?', missingSub: 'Tell me about your project and we’ll build the proposal together.',
    wa: 'Message me on WhatsApp',
    quoteMsg: (code: string, name: string) => `Hi Santi, I’m interested in ${code} · ${name}. Can you put together a quote?`,
  },
}
type UI = (typeof T)[Lang]

function quoteLink(s: Service, t: UI) {
  const text = t.quoteMsg(s.code, s.name)
  return `${WHATSAPP}?text=${encodeURIComponent(text)}`
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-2 text-[11px] font-semibold tracking-[0.18em] text-(--color-muted) uppercase">
      {children}
    </h3>
  )
}

function Bullets({ items, color }: { items: string[]; color: string }) {
  return (
    <ul className="space-y-1.5">
      {items.map((x) => (
        <li key={x} className="relative pl-4 text-sm leading-relaxed text-(--color-foreground)/90">
          <span className="absolute left-0 top-[0.55em] h-1.5 w-1.5" style={{ background: color }} />
          {x}
        </li>
      ))}
    </ul>
  )
}

function ServiceBlock({ s, color, tools, open, t }: { s: Service; color: string; tools: string; open?: boolean; t: UI }) {
  return (
    <details
      open={open}
      id={s.code.toLowerCase()}
      className="group scroll-mt-24 rounded-lg sm:open:col-span-2 border border-(--color-border) bg-(--color-surface) transition-[border-color,background-color,scale] duration-150 ease-out hover:border-(--c)/80! open:border-(--c)! [&:not([open])]:hover:scale-[1.01] [&:not([open])]:hover:bg-(--color-background) [&:not([open])]:active:scale-[0.98]"
      style={{ '--c': color } as React.CSSProperties}
    >
      <summary className="flex cursor-pointer list-none items-start gap-4 p-6 select-none [&::-webkit-details-marker]:hidden">
        <span className="mt-1 text-xs font-bold tracking-wider" style={{ color }}>
          {s.code}
        </span>
        <span className="flex-1">
          <span className="block text-lg font-semibold text-(--color-foreground)">{s.name}</span>
          <span className="mt-1 block text-sm text-(--color-muted) transition-colors group-hover:text-(--color-foreground)">{s.promise}</span>
        </span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-(--color-border) bg-(--color-background) text-(--color-muted) transition-[color,border-color,background-color,rotate] duration-150 group-hover:border-(--c)/60! group-hover:bg-(--c)/10 group-hover:text-(--c) group-open:rotate-45 group-open:text-(--c)">+</span>
      </summary>

      <div className="space-y-6 border-t border-(--color-border) px-6 pt-6 pb-6">
        <div>
          <Label>{t.forWho}</Label>
          <p className="text-sm leading-relaxed text-(--color-foreground)/90">{s.forWho}</p>
        </div>
        {s.includes.length > 0 && (
          <div>
            <Label>{t.includes}</Label>
            <Bullets items={s.includes} color={color} />
          </div>
        )}
        {s.steps.length > 0 && (
          <div>
            <Label>{t.steps}</Label>
            <ol className="grid gap-2 sm:grid-cols-2">
              {s.steps.map((x, i) => (
                <li key={x} className="text-sm leading-relaxed text-(--color-foreground)/90">
                  <span className="mr-2 font-semibold" style={{ color }}>
                    {i + 1}
                  </span>
                  {x}
                </li>
              ))}
            </ol>
          </div>
        )}
        {s.extra.map((x) => (
          <div key={x.title}>
            <Label>{x.title}</Label>
            {Array.isArray(x.body) ? (
              <Bullets items={x.body} color={color} />
            ) : (
              <p className="text-sm leading-relaxed text-(--color-foreground)/90">{x.body}</p>
            )}
          </div>
        ))}
        {s.important && (
          <div className="rounded-md border border-l-4 p-4" style={{ borderColor: color }}>
            <p className="mb-1 text-[11px] font-semibold tracking-[0.18em] uppercase" style={{ color }}>
              {t.important}
            </p>
            <p className="text-sm leading-relaxed text-(--color-foreground)/90">{s.important}</p>
          </div>
        )}
        {s.gallery.length > 0 && (
          <div>
            <Label>{t.gallery}</Label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {s.gallery.map((g) => (
                <figure key={g.src}>
                  <Image
                    src={g.src}
                    alt={g.caption}
                    width={480}
                    height={300}
                    className="h-32 w-full rounded-md object-cover"
                  />
                  <figcaption className="mt-1 text-xs text-(--color-muted)">{g.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
        <div className="flex flex-col gap-4 border-t pt-5 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: color }}>
          <div>
            <p className="text-sm font-semibold text-(--color-foreground)">{t.custom}</p>
            <p className="mt-1 text-xs text-(--color-muted)">{t.tools}: {tools}</p>
          </div>
          <a
            href={quoteLink(s, t)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-md px-5 py-2.5 text-center text-sm font-semibold text-(--color-background) transition-opacity hover:opacity-85"
            style={{ background: color }}
          >
            {t.quote}
          </a>
        </div>
      </div>
    </details>
  )
}

export default async function ServicesPage() {
  const lang = await getLang()
  const t = T[lang]
  const catalog = lang === 'en' ? catalogEn : catalogEs
  const services = catalog.services as Service[]

  const colorOf = (cat: string) => catalog.categories.find((c) => c.key === cat)?.color ?? '#F2B705'
  const brandkits = services.flatMap((s) => (s.brandkits ?? []).map((b) => ({ ...b, color: colorOf(s.cat) })))
  // Top-of-page gallery: every image the catalog shows, each linking to its section.
  const showcase = services.flatMap((s) => [
    ...(s.brandkits ?? []).map((b) => ({ src: b.cover, label: b.name, kind: t.brandOne, href: '#marcas', color: colorOf(s.cat), w: 340, h: 440 })),
    ...s.gallery.map((g) => ({ src: g.src, label: g.caption, kind: s.name, href: `#${s.code.toLowerCase()}`, color: colorOf(s.cat), w: 704, h: 440 })),
  ])

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-(--color-accent) uppercase">
        {t.kicker}
      </p>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-(--color-foreground) md:text-5xl">
        {t.title}
      </h1>
      <p className="max-w-2xl text-base leading-relaxed text-(--color-muted)">
        {t.intro}
      </p>

      <OpenOnHash />
      <div className="mt-8">
        <p className="mb-3 text-xs tracking-[0.18em] text-(--color-muted) uppercase">{t.recent}</p>
        <ShowcaseStrip items={showcase} />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={PDF}
          download
          className="rounded-md bg-(--color-accent) px-5 py-2.5 text-sm font-semibold text-(--color-background) transition-colors hover:bg-(--color-accent-dark)"
        >
          {t.pdf}
        </a>
        <a
          href="#marcas"
          className="rounded-md border border-(--color-accent) px-4 py-2 text-xs tracking-wider text-(--color-accent) uppercase transition-colors hover:text-(--color-foreground)"
        >
          {t.brand}
        </a>
        {catalog.categories.map((c) => (
          <a
            key={c.key}
            href={`#cat-${c.key.toLowerCase()}`}
            className="flex items-center gap-2 rounded-md border border-(--color-border) px-4 py-2 text-xs tracking-wider text-(--color-muted) uppercase transition-colors hover:text-(--color-foreground)"
          >
            <span className="h-2.5 w-2.5" style={{ background: c.color }} />
            {c.name}
            <span className="text-(--color-muted)/60">{services.filter((s) => s.cat === c.key).length}</span>
          </a>
        ))}
      </div>

      {catalog.categories.map((c, ci) => {
        const list = services.filter((s) => s.cat === c.key)
        return (
          <section key={c.key} id={`cat-${c.key.toLowerCase()}`} className="mt-24 scroll-mt-24">
            <div className="mb-8 flex flex-col gap-2 border-b border-(--color-border) pb-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="border-l-4 pl-4" style={{ borderColor: c.color }}>
                <h2 className="text-2xl font-bold tracking-tight text-(--color-foreground) md:text-3xl">{c.name}</h2>
                {BLURB[lang][c.key] && <p className="mt-2 max-w-xl text-sm text-(--color-muted)">{BLURB[lang][c.key]}</p>}
              </div>
              <p className="text-xs tracking-[0.18em] text-(--color-muted) uppercase">
                {list.length} {list.length === 1 ? t.service : t.services}
              </p>
            </div>
            <div className="grid items-start gap-3 sm:grid-cols-2">
              {list.map((s, i) => (
                <ServiceBlock key={s.code} s={s} color={c.color} tools={c.tools} open={ci === 0 && i === 0} t={t} />
              ))}
            </div>
          </section>
        )
      })}

      {brandkits.length > 0 && (
        <section id="marcas" className="mt-24 scroll-mt-24">
          <div className="mb-8 border-b border-(--color-border) pb-5">
            <h2 className="text-2xl font-bold tracking-tight text-(--color-foreground) md:text-3xl">{t.brand}</h2>
            <p className="mt-2 max-w-xl text-sm text-(--color-muted)">
              {t.brandIntro}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {brandkits.map((b) => (
              <a key={b.pdf} href={b.pdf} target="_blank" rel="noopener noreferrer" className="group block">
                <Image
                  src={b.cover}
                  alt={`${t.brandAlt} ${b.name}`}
                  width={480}
                  height={620}
                  className="aspect-[17/22] w-full rounded-md border object-cover transition-opacity group-hover:opacity-80"
                  style={{ borderColor: b.color }}
                />
                <p className="mt-2 text-sm text-(--color-foreground)">
                  {b.name} · <span style={{ color: b.color }}>{t.viewPdf}</span>
                </p>
              </a>
            ))}
          </div>
        </section>
      )}

      <div className="mt-24 rounded-lg border border-(--color-border) bg-(--color-surface) p-8 text-center">
        <p className="text-xl font-semibold text-(--color-foreground)">{t.missing}</p>
        <p className="mt-2 text-sm text-(--color-muted)">
          {t.missingSub}
        </p>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-md bg-(--color-accent) px-6 py-3 text-sm font-semibold text-(--color-background) transition-colors hover:bg-(--color-accent-dark)"
        >
          {t.wa}
        </a>
      </div>
    </div>
  )
}
