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
      'Full-track production from concept to master-ready. Beats, arrangements, instrumentation — built to your vision with 20 years of sonic experience behind every decision.',
  },
  {
    icon: '🎚️',
    title: 'Mixing',
    description:
      'Professional mix sessions that translate across all playback systems. Analog warmth meets digital precision. Every element in its place.',
  },
  {
    icon: '💿',
    title: 'Mastering',
    description:
      'Final stage polish that makes your record competitive, consistent, and loud — without sacrificing the dynamics that make it alive.',
  },
  {
    icon: '🎙️',
    title: 'Audio Engineering',
    description:
      'Recording sessions, live sound reinforcement, post-production. Clean signal path, minimal noise floor, maximum impact.',
  },
  {
    icon: '⌨️',
    title: 'Software Development',
    description:
      'Custom tools, plugins, and platforms built for the music industry. If the tool you need doesn\'t exist, I build it.',
  },
  {
    icon: '🎓',
    title: 'Consultation',
    description:
      'Studio setup, workflow optimization, career strategy. Two decades of hard-earned knowledge — available by the hour.',
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
