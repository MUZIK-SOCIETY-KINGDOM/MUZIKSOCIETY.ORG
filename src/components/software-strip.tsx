'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import { SoftwareCard } from '@/components/software-card'
import { plugins } from '@/data/software'
import { useLang } from '@/contexts/lang-context'

export function SoftwareStrip() {
  const lang = useLang()
  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 pb-4 sm:pt-24">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-(--color-accent) uppercase">
            Software
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-(--color-foreground) md:text-4xl">
            {lang === 'en' ? 'I build the tools.' : 'Construyo las herramientas.'}
          </h2>
        </div>
        <Link
          href="/tools"
          className="text-sm font-semibold text-(--color-muted) hover:text-(--color-accent) transition-colors"
        >
          {lang === 'en' ? 'See all →' : 'Ver todas →'}
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {plugins.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.08 }}
          >
            <SoftwareCard p={p} lang={lang} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
