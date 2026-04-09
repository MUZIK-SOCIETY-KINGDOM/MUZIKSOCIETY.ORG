import type { Metadata } from 'next'
import { ServiceCard } from '@/components/service-card'

export const metadata: Metadata = {
  title: 'Services — MuzikSociety',
}

const services = [
  {
    icon: '🎛️',
    title: 'Music Production',
    description:
      'Full-track production from concept to master-ready. Beats, arrangements, instrumentation — built to your vision with 20+ years of sonic experience behind every decision.',
  },
  {
    icon: '🎚️',
    title: 'Mixing & Mastering',
    description:
      'Professional mix sessions that translate across all playback systems. Final stage polish that makes your record competitive without sacrificing the dynamics that make it alive.',
  },
  {
    icon: '🎙️',
    title: 'Audio Engineering',
    description:
      'Recording sessions, post-production, and sound design. Clean signal path, minimal noise floor, maximum impact.',
  },
  {
    icon: '🎨',
    title: 'Graphic Design & Content',
    description:
      'Visual identity, artwork, and content production for artists and brands. The same production philosophy applied to everything you put in front of an audience.',
  },
  {
    icon: '🌱',
    title: 'Artist Development & Consultation',
    description:
      'Career strategy, brand building, workflow optimization, and industry navigation. Two decades of hard-earned knowledge — available to you.',
  },
  {
    icon: '📚',
    title: 'Teaching & Education',
    description:
      'One-on-one and group sessions covering production, engineering, music business, and creative development. Learn the craft from someone who lives it.',
  },
  {
    icon: '⌨️',
    title: 'Software Development',
    description:
      'Custom tools, plugins, and platforms built for the music industry. If the tool you need doesn\'t exist, I build it.',
  },
]

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-16">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-(--color-accent) uppercase">
          Services
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-(--color-foreground) md:text-6xl">
          What I Do.
        </h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </div>
  )
}
