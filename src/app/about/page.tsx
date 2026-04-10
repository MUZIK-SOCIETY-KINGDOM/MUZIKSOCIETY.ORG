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
              Santi is a music producer, audio engineer, and artist development strategist based in Medellín, Colombia — specializing in urban genres and tropical urban fusions.
            </p>
            <p className="text-base text-(--color-muted) leading-relaxed">
              His path started in a bedroom in 2004. First studio in 2011. In 2018, a Miami artist decided to relocate his entire project to Medellín — and Santi took the call. His first international job. He never left.
            </p>
            <p className="text-base text-(--color-muted) leading-relaxed">
              What separates him from a producer or engineer you can find anywhere is that he doesn't just make records — he builds artists. His Artist Development work folds production, engineering, strategy, and creative direction into a single process. One person who sees the full picture: the sound, the identity, the audience, and the long game.
            </p>
            <p className="text-base text-(--color-muted) leading-relaxed">
              His signature as a creator is sampling. Not as a shortcut — as a language. Morphing, flipping, reconstructing sound into something that never existed before. He calls himself a Living Breathing Sampling Monster, and he means it.
            </p>
            <p className="text-base text-(--color-muted) leading-relaxed">
              He believes creativity is the one true drug. Not for the high, but for what it demands: curiosity, discipline, exploration, and the kind of evolution that makes you genuinely better at being alive.
            </p>
            <p className="text-base text-(--color-foreground) leading-relaxed font-medium">
              If you're building something that matters and you want someone who's been in the room, in the city, and in the craft since 2004 — you're in the right place.
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
