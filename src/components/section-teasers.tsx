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

const sections = [
  {
    href: '/instrumentals',
    label: 'Instrumentals',
    description: 'Original beats — listen, preview, buy.',
    icon: Music2,
  },
  {
    href: '/sample-packs',
    label: 'Sample Packs',
    description: 'Production-ready samples and loops.',
    icon: Layers,
  },
  {
    href: '/tools',
    label: 'Tools',
    description: 'Tools built for producers, engineers, and artists.',
    icon: Code2,
  },
  {
    href: '/portfolio',
    label: 'Portfolio',
    description: '20+ years of credits, sessions, and releases.',
    icon: Award,
  },
  {
    href: '/services',
    label: 'Services',
    description: 'Production, mixing, mastering, and development.',
    icon: Zap,
  },
  {
    href: '/blog',
    label: 'Blog',
    description: 'Thoughts, process, and industry rambles.',
    icon: BookOpen,
  },
]

export function SectionTeasers() {
  return (
    <section className="border-t border-(--color-border)">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-16">
        <div className="grid gap-3 sm:gap-px sm:bg-(--color-border) sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((s) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.href}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                <Link
                  href={s.href}
                  className="group flex items-center gap-4 rounded-xl border border-(--color-border) bg-(--color-surface) px-5 py-5 transition-colors hover:border-(--color-accent)/40 hover:bg-(--color-background) active:bg-(--color-background) sm:rounded-none sm:border-0 sm:p-8"
                >
                  {/* Icon */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-(--color-border) bg-(--color-background) text-(--color-accent) transition-colors group-hover:border-(--color-accent)/50 group-hover:bg-(--color-accent)/10 sm:hidden">
                    <Icon size={18} strokeWidth={1.5} />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <span className="text-sm font-semibold tracking-[0.1em] text-(--color-foreground) uppercase sm:text-xs sm:tracking-[0.15em] sm:text-(--color-accent)">
                      {s.label}
                    </span>
                    <span className="text-xs text-(--color-muted) group-hover:text-(--color-foreground) transition-colors leading-relaxed">
                      {s.description}
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
