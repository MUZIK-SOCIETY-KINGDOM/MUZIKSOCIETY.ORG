'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useLang } from '@/contexts/lang-context'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  es: {
    kicker: 'Productor · Ingeniero · Desarrollador · Creador',
    title: 'Más de 20 años.',
    titleMuted: 'Un solo estándar.',
    line1: 'Más de 100 canciones publicadas, créditos con Nicky Jam, Ñengo Flow y Yaga & Mackie.',
    line2: 'Y el software que usan más de 12.000 productores.',
    services: 'Ver servicios',
    portfolio: 'Ver portafolio',
    alt: 'Santi trabajando en el estudio',
    caption: 'En el estudio',
  },
  en: {
    kicker: 'Producer · Engineer · Developer · Creator',
    title: '20+ years.',
    titleMuted: 'One standard.',
    line1: '100+ released songs, credits with Nicky Jam, Ñengo Flow and Yaga & Mackie.',
    line2: 'And the software 12,000+ producers use.',
    services: 'See services',
    portfolio: 'See portfolio',
    alt: 'Santi working in the studio',
    caption: 'In the studio',
  },
}

export function Hero() {
  const t = T[useLang()]
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
        <div>
        <motion.p
          className="mb-4 text-xs font-semibold tracking-[0.25em] text-(--color-accent) uppercase"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
        >
          {t.kicker}
        </motion.p>

        <motion.h1
          className="text-5xl font-extrabold tracking-tight text-(--color-foreground) md:text-7xl lg:text-[4.5rem] lg:leading-[1.02]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          {t.title}
          <br />
          <span className="text-(--color-muted)">{t.titleMuted}</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-base text-(--color-muted) leading-relaxed md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.35 }}
        >
          {t.line1}
          <br />
          {t.line2}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.5 }}
        >
          <Link
            href="/services"
            className="rounded-md bg-(--color-accent) px-6 py-3 text-sm font-semibold tracking-wide text-(--color-background) hover:bg-(--color-accent-dark) transition-colors"
          >
            {t.services}
          </Link>
          <Link
            href="/portfolio"
            className="rounded-md border border-(--color-border) px-6 py-3 text-sm font-semibold tracking-wide text-(--color-foreground) hover:border-(--color-muted) transition-colors"
          >
            {t.portfolio}
          </Link>
        </motion.div>
        </div>

        <motion.figure
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-(--color-border) bg-(--color-surface)">
            <Image
              src="/about/IMG_3790-x2.jpg"
              alt={t.alt}
              fill
              priority
              sizes="(min-width: 1024px) 720px, 100vw"
              quality={90}
              className="object-cover object-[45%_center] saturate-[0.85]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-(--color-background)/80 via-transparent to-transparent" />
          </div>
          <figcaption className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-semibold tracking-[0.25em] text-(--color-foreground)/80 uppercase">
            <span>{t.caption}</span>
            <span className="text-(--color-accent)">Miami → Medellín</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
