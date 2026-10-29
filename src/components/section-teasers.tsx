'use client'

import Link from 'next/link'
import { motion } from 'motion/react'
import {
  Music2,
  Layers,
  Code2,
  Award,
  Zap,
  BookOpen,
  ChevronRight,
} from 'lucide-react'
import { useLang } from '@/contexts/lang-context'

const sections = [
  {
    href: '/instrumentals',
    label: { es: 'Instrumentales', en: 'Instrumentals' },
    description: { es: 'Beats originales: escucha, prueba y compra.', en: 'Original beats: listen, try and buy.' },
    icon: Music2,
  },
  {
    href: '/sample-packs',
    label: { es: 'Sample Packs', en: 'Sample Packs' },
    description: { es: 'Samples y loops listos para producir.', en: 'Samples and loops ready to produce with.' },
    icon: Layers,
  },
  {
    href: '/tools',
    label: { es: 'Herramientas', en: 'Tools' },
    description: { es: 'Herramientas para productores, ingenieros y artistas.', en: 'Tools for producers, engineers and artists.' },
    icon: Code2,
  },
  {
    href: '/portfolio',
    label: { es: 'Portafolio', en: 'Portfolio' },
    description: { es: 'Más de 20 años de créditos, sesiones y lanzamientos.', en: '20+ years of credits, sessions and releases.' },
    icon: Award,
  },
  {
    href: '/services',
    label: { es: 'Servicios', en: 'Services' },
    description: { es: '34 servicios: música, educación, carrera, contenido y tecnología.', en: '34 services: music, education, career, content and tech.' },
    icon: Zap,
  },
  {
    href: '/blog',
    label: { es: 'Blog', en: 'Blog' },
    description: { es: 'Ideas, proceso y la industria por dentro.', en: 'Ideas, process and the industry from the inside.' },
    icon: BookOpen,
  },
]

export function SectionTeasers() {
  const lang = useLang()
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="grid gap-3 sm:gap-px sm:bg-(--color-border) sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.href}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="h-full"
              >
                <Link
                  href={s.href}
                  className="group flex h-full items-center gap-4 rounded-xl border border-(--color-border) bg-(--color-surface) px-5 py-5 transition-colors hover:border-(--color-accent)/40 hover:bg-(--color-background) active:bg-(--color-background) sm:flex-col sm:items-start sm:gap-5 sm:rounded-none sm:border-0 sm:p-8"
                >
                  {/* Icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-(--color-border) bg-(--color-background) text-(--color-accent) transition-colors group-hover:border-(--color-accent)/50 group-hover:bg-(--color-accent)/10">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <span className="text-sm font-semibold tracking-[0.1em] text-(--color-foreground) uppercase sm:text-xs sm:tracking-[0.15em] sm:text-(--color-accent)">
                      {s.label[lang]}
                    </span>
                    <span className="text-xs text-(--color-muted) group-hover:text-(--color-foreground) transition-colors leading-relaxed">
                      {s.description[lang]}
                    </span>
                  </div>

                  {/* Arrow — mobile only */}
                  <motion.div
                    className="shrink-0 text-(--color-muted) group-hover:text-(--color-accent) transition-colors sm:hidden"
                    animate={{ x: 0 }}
                    whileHover={{ x: 3 }}
                  >
                    <ChevronRight size={18} strokeWidth={1.5} />
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
