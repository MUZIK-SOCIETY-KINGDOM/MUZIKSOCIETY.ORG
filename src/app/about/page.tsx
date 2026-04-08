import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About — MuzikSociety',
}

const timeline = [
  { year: '2004', event: 'Started producing — bedroom studio, no budget, full obsession.' },
  { year: '2008', event: 'First major label placement. The standard was set.' },
  { year: '2012', event: 'Built first DAW plugin. Code became part of the craft.' },
  { year: '2016', event: 'Launched MuzikSociety — a platform for the culture.' },
  { year: '2020', event: 'Mixed and mastered 50+ independent releases during the pandemic.' },
  { year: '2026', event: 'Still here. Still building. Still pushing.' },
]

const skills = [
  'Music Production', 'Mixing', 'Mastering', 'Sound Design',
  'Audio Engineering', 'TypeScript', 'Next.js', 'Python',
  'Ableton Live', 'Pro Tools', 'Logic Pro', 'FL Studio',
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      {/* Header */}
      <div className="mb-16">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-[--color-accent] uppercase">
          About
        </p>
        <h1 className="text-4xl font-extrabold tracking-tight text-[--color-foreground] md:text-6xl">
          The Long Game.
        </h1>
      </div>

      {/* Two-column bio */}
      <div className="grid gap-16 md:grid-cols-2 mb-24">
        <div className="aspect-square rounded-lg bg-[--color-surface] border border-[--color-border] flex items-center justify-center">
          <span className="text-6xl font-black tracking-tight text-[--color-border]">S</span>
        </div>
        <div className="flex flex-col justify-center gap-6">
          <p className="text-base text-[--color-muted] leading-relaxed">
            I'm Santi — music producer, audio engineer, and software developer based in Colombia.
            Over 20 years in this industry have taught me one thing: the standard is yours to set.
          </p>
          <p className="text-base text-[--color-muted] leading-relaxed">
            I've built sounds from scratch in bedrooms, studios, and server rooms. I write code
            the same way I approach a mix — with intention, precision, and an ear for what doesn't
            belong.
          </p>
          <p className="text-base text-[--color-muted] leading-relaxed">
            MuzikSociety is the intersection of both worlds: the craft and the tools that enable it.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-24">
        <h2 className="mb-10 text-lg font-bold tracking-tight text-[--color-foreground]">
          Timeline
        </h2>
        <div className="relative border-l border-[--color-border] pl-8 space-y-10">
          {timeline.map((item) => (
            <div key={item.year} className="relative">
              <div className="absolute -left-[2.125rem] top-1 h-3 w-3 rounded-full bg-[--color-accent]" />
              <p className="text-xs font-semibold tracking-widest text-[--color-accent] mb-1">
                {item.year}
              </p>
              <p className="text-sm text-[--color-muted]">{item.event}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills strip */}
      <div>
        <h2 className="mb-6 text-lg font-bold tracking-tight text-[--color-foreground]">
          Tools & Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-md border border-[--color-border] px-3 py-1.5 text-xs text-[--color-muted]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
