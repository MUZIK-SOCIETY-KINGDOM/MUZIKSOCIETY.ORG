import type { Metadata } from 'next'
import Image from 'next/image'
import { FadeIn } from '@/components/fade-in'

export const metadata: Metadata = {
  title: 'About — MuzikSociety',
}

const timeline = [
  { year: '2004', event: 'Started producing — bedroom studio, no budget, full obsession.' },
  { year: '2008', event: 'First professional production participation. The standard was set.' },
  { year: '2010', event: 'MuzikSociety launches as a brand.' },
  { year: '2011', event: 'Opened first recording studio in Miami.' },
  { year: '2018', event: 'First international job — moved to Medellín, Colombia.' },
  { year: '2023', event: 'Opened studio in Medellín. Got into dev and AI — everything changed.' },
  { year: '2025', event: 'Shipped SampleMonsta — first software. Code is now part of the craft.' },
  { year: '2026', event: 'The next big mark is yours.' },
]

const skills = [
  'Music Production', 'Mixing', 'Mastering', 'Audio Engineering',
  'Sound Design', 'Graphic Design', 'Content Production',
  'Artist Development', 'Music Education', 'Software Development',
  'AI Integration', 'Ableton Live', 'Pro Tools', 'Logic Pro', 'FL Studio',
  'TypeScript', 'Next.js', 'Python',
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      {/* Header */}
      <FadeIn>
        <div className="mb-16">
          <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-(--color-accent) uppercase">
            About
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-(--color-foreground) md:text-6xl">
            The Long Game.
          </h1>
        </div>
      </FadeIn>

      {/* Two-column bio */}
      <div className="grid gap-16 md:grid-cols-2 mb-24">
        <FadeIn direction="right">
          <div className="aspect-square rounded-xl overflow-hidden bg-(--color-background) border border-(--color-border) flex items-center justify-center p-8">
            <Image
              src="/logo.png"
              alt="MuzikSociety"
              width={500}
              height={500}
              className="w-full h-full object-contain"
            />
          </div>
        </FadeIn>
        <FadeIn direction="left" delay={0.1}>
          <div className="flex flex-col justify-center gap-6">
            <p className="text-base text-(--color-muted) leading-relaxed">
              I'm Gabriel Santiago — MuzikSociety — a producer, engineer, and creator from Caguas, Puerto Rico with 20+ years across music production, mixing, mastering, development, graphic design, and content creation.
            </p>
            <p className="text-base text-(--color-muted) leading-relaxed">
              I don't separate the disciplines — everything runs through the same philosophy: intention, craft, and standard.
            </p>
            <p className="text-base text-(--color-muted) leading-relaxed">
              Music isn't what I do. It's how I think.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Timeline */}
      <FadeIn>
        <div className="mb-24">
          <h2 className="mb-10 text-lg font-bold tracking-tight text-(--color-foreground)">
            Timeline
          </h2>
          <div className="relative border-l border-(--color-border) pl-8 space-y-10">
            {timeline.map((item, i) => (
              <FadeIn key={item.year} delay={i * 0.06}>
                <div className="relative">
                  <div className="absolute -left-[2.625rem] top-1 h-3 w-3 rounded-full bg-(--color-accent)" />
                  <p className="text-xs font-semibold tracking-widest text-(--color-accent) mb-1">
                    {item.year}
                  </p>
                  <p className="text-sm text-(--color-muted)">{item.event}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Skills strip */}
      <FadeIn>
        <div>
          <h2 className="mb-6 text-lg font-bold tracking-tight text-(--color-foreground)">
            Tools & Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-(--color-border) px-3 py-1.5 text-xs text-(--color-muted) hover:border-(--color-accent) hover:text-(--color-foreground) transition-colors cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
