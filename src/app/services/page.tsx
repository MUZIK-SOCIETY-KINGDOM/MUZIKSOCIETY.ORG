import type { Metadata } from 'next'
import Image from 'next/image'
import catalog from '@/data/servicios.json'
import OpenOnHash from './open-on-hash'
import ShowcaseStrip from './showcase-strip'

// Data comes from briefs/capabilities/build_catalogo_cliente.py (public mode), same source as the PDF.
// Edit the catalog there and re-run `python build_catalogo_cliente.py public`; never edit the JSON by hand.

export const metadata: Metadata = {
  title: 'Servicios — MuzikSociety',
  description:
    'Música, educación, carrera, contenido y tecnología para artistas y negocios. Cotización a la medida.',
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
const BLURB: Record<string, string> = {
  A: 'De la idea a la canción lista. Los splits se acuerdan por escrito desde el inicio.',
  B: 'Clases y mentoría para producir y mezclar mejor.',
  C: 'Plan, dirección y negocio para tu carrera.',
  D: 'Contenido y piezas visuales para que tu música se vea.',
  E: 'Webs, apps, IA y plugins hechos a la medida.',
}

function quoteLink(s: Service) {
  const text = `Hola Santi, me interesa ${s.code} · ${s.name}. ¿Me armas una cotización?`
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

function ServiceBlock({ s, color, tools, open }: { s: Service; color: string; tools: string; open?: boolean }) {
  return (
    <details
      open={open}
      id={s.code.toLowerCase()}
      className="group scroll-mt-24 rounded-lg sm:open:col-span-2 border border-(--color-border) bg-(--color-surface) transition-colors hover:border-(--c)/50 open:border-(--c)"
      style={{ '--c': color } as React.CSSProperties}
    >
      <summary className="flex cursor-pointer list-none items-start gap-4 p-6 [&::-webkit-details-marker]:hidden">
        <span className="mt-1 text-xs font-bold tracking-wider" style={{ color }}>
          {s.code}
        </span>
        <span className="flex-1">
          <span className="block text-lg font-semibold text-(--color-foreground)">{s.name}</span>
          <span className="mt-1 block text-sm text-(--color-muted)">{s.promise}</span>
        </span>
        <span className="mt-1 text-(--color-muted) transition-transform group-open:rotate-45">+</span>
      </summary>

      <div className="space-y-6 border-t border-(--color-border) px-6 pt-6 pb-6">
        <div>
          <Label>Para quién</Label>
          <p className="text-sm leading-relaxed text-(--color-foreground)/90">{s.forWho}</p>
        </div>
        {s.includes.length > 0 && (
          <div>
            <Label>Qué incluye</Label>
            <Bullets items={s.includes} color={color} />
          </div>
        )}
        {s.steps.length > 0 && (
          <div>
            <Label>Cómo funciona</Label>
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
              Importante
            </p>
            <p className="text-sm leading-relaxed text-(--color-foreground)/90">{s.important}</p>
          </div>
        )}
        {s.gallery.length > 0 && (
          <div>
            <Label>Interfaces que hemos diseñado</Label>
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
            <p className="text-sm font-semibold text-(--color-foreground)">Cotización a la medida</p>
            <p className="mt-1 text-xs text-(--color-muted)">Herramientas: {tools}</p>
          </div>
          <a
            href={quoteLink(s)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-md px-5 py-2.5 text-center text-sm font-semibold text-(--color-background) transition-opacity hover:opacity-85"
            style={{ background: color }}
          >
            Pedir cotización →
          </a>
        </div>
      </div>
    </details>
  )
}

export default function ServicesPage() {
  const services = catalog.services as Service[]

  const colorOf = (cat: string) => catalog.categories.find((c) => c.key === cat)?.color ?? '#F2B705'
  const brandkits = services.flatMap((s) => (s.brandkits ?? []).map((b) => ({ ...b, color: colorOf(s.cat) })))
  // Top-of-page gallery: every image the catalog shows, each linking to its section.
  const showcase = services.flatMap((s) => [
    ...(s.brandkits ?? []).map((b) => ({ src: b.cover, label: b.name, kind: 'Manual de marca', href: '#marcas', color: colorOf(s.cat), w: 340, h: 440 })),
    ...s.gallery.map((g) => ({ src: g.src, label: g.caption, kind: s.name, href: `#${s.code.toLowerCase()}`, color: colorOf(s.cat), w: 704, h: 440 })),
  ])

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-(--color-accent) uppercase">
        Catálogo de servicios · 2026
      </p>
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-(--color-foreground) md:text-5xl">
        Lo que hago.
      </h1>
      <p className="max-w-2xl text-base leading-relaxed text-(--color-muted)">
        Música, carrera, contenido y tecnología para artistas y negocios. Cotización a la medida, en
        Medellín o remoto, en español o inglés.
      </p>

      <OpenOnHash />
      <div className="mt-8">
        <p className="mb-3 text-xs tracking-[0.18em] text-(--color-muted) uppercase">Trabajo reciente</p>
        <ShowcaseStrip items={showcase} />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a
          href={PDF}
          download
          className="rounded-md bg-(--color-accent) px-5 py-2.5 text-sm font-semibold text-(--color-background) transition-colors hover:bg-(--color-accent-dark)"
        >
          Descargar catálogo (PDF)
        </a>
        <a
          href="#marcas"
          className="rounded-md border border-(--color-accent) px-4 py-2 text-xs tracking-wider text-(--color-accent) uppercase transition-colors hover:text-(--color-foreground)"
        >
          Manuales de marca
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
                {BLURB[c.key] && <p className="mt-2 max-w-xl text-sm text-(--color-muted)">{BLURB[c.key]}</p>}
              </div>
              <p className="text-xs tracking-[0.18em] text-(--color-muted) uppercase">
                {list.length} {list.length === 1 ? 'servicio' : 'servicios'}
              </p>
            </div>
            <div className="grid items-start gap-3 sm:grid-cols-2">
              {list.map((s, i) => (
                <ServiceBlock key={s.code} s={s} color={c.color} tools={c.tools} open={ci === 0 && i === 0} />
              ))}
            </div>
          </section>
        )
      })}

      {brandkits.length > 0 && (
        <section id="marcas" className="mt-24 scroll-mt-24">
          <div className="mb-8 border-b border-(--color-border) pb-5">
            <h2 className="text-2xl font-bold tracking-tight text-(--color-foreground) md:text-3xl">Manuales de marca</h2>
            <p className="mt-2 max-w-xl text-sm text-(--color-muted)">
              Identidad completa para artistas del estudio. Toca una portada para ver el PDF.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {brandkits.map((b) => (
              <a key={b.pdf} href={b.pdf} target="_blank" rel="noopener noreferrer" className="group block">
                <Image
                  src={b.cover}
                  alt={`Manual de marca de ${b.name}`}
                  width={480}
                  height={620}
                  className="aspect-[17/22] w-full rounded-md border object-cover transition-opacity group-hover:opacity-80"
                  style={{ borderColor: b.color }}
                />
                <p className="mt-2 text-sm text-(--color-foreground)">
                  {b.name} · <span style={{ color: b.color }}>Ver PDF</span>
                </p>
              </a>
            ))}
          </div>
        </section>
      )}

      <div className="mt-24 rounded-lg border border-(--color-border) bg-(--color-surface) p-8 text-center">
        <p className="text-xl font-semibold text-(--color-foreground)">¿No ves lo que buscas?</p>
        <p className="mt-2 text-sm text-(--color-muted)">
          Cuéntame tu proyecto y armamos la propuesta juntos.
        </p>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded-md bg-(--color-accent) px-6 py-3 text-sm font-semibold text-(--color-background) transition-colors hover:bg-(--color-accent-dark)"
        >
          Escríbeme por WhatsApp
        </a>
      </div>
    </div>
  )
}
