'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'

const products = [
  {
    href: '/tools',
    name: 'SampleMonsta',
    line: 'Plugin de audio con IA. Lo usan cerca de 10.000 productores.',
    src: '/servicios/samplemonsta.jpg',
  },
  {
    href: '/tools',
    name: 'Varia',
    line: 'Lanzado en 2026, junto a Ruido e ILI.',
    src: '/servicios/varia.jpg',
  },
]

export function SoftwareStrip() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 pb-4 sm:pt-24">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-(--color-accent) uppercase">
            Software
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-(--color-foreground) md:text-4xl">
            Construyo las herramientas.
          </h2>
        </div>
        <Link
          href="/tools"
          className="text-sm font-semibold text-(--color-muted) hover:text-(--color-accent) transition-colors"
        >
          Ver todas →
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {products.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
          >
            <Link
              href={p.href}
              className="group block overflow-hidden rounded-xl border border-(--color-border) bg-(--color-surface) transition-colors hover:border-(--color-accent)/40"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={p.src}
                  alt={`Interfaz de ${p.name}`}
                  fill
                  sizes="(min-width: 640px) 560px, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <p className="font-semibold text-(--color-foreground)">{p.name}</p>
                  <p className="mt-1 text-sm text-(--color-muted)">{p.line}</p>
                </div>
                <ArrowUpRight
                  size={18}
                  strokeWidth={1.5}
                  className="mt-0.5 shrink-0 text-(--color-muted) transition-colors group-hover:text-(--color-accent)"
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
