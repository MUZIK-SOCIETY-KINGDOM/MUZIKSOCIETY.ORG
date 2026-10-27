'use client'

import Link from 'next/link'
import { motion } from 'motion/react'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <motion.p
          className="mb-4 text-xs font-semibold tracking-[0.25em] text-(--color-accent) uppercase"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.1 }}
        >
          Productor · Ingeniero · Desarrollador · Creador
        </motion.p>

        <motion.h1
          className="text-5xl font-extrabold tracking-tight text-(--color-foreground) md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          Más de 20 años.
          <br />
          <span className="text-(--color-muted)">Un solo estándar.</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-base text-(--color-muted) leading-relaxed md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.35 }}
        >
          Más de 100 canciones publicadas, créditos con Nicky Jam, Ñengo Flow y Yaga &amp; Mackie.
          <br />
          Y el software que usan cerca de 10.000 productores.
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
            Ver servicios
          </Link>
          <Link
            href="/portfolio"
            className="rounded-md border border-(--color-border) px-6 py-3 text-sm font-semibold tracking-wide text-(--color-foreground) hover:border-(--color-muted) transition-colors"
          >
            Ver portafolio
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
