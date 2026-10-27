import type { Metadata } from 'next'
import Image from 'next/image'
import { FadeIn } from '@/components/fade-in'

type TimelineItem = {
  year: string
  event: string
  image?: string
}

export const metadata: Metadata = {
  title: 'Sobre mí — MuzikSociety',
}

const timeline: TimelineItem[] = [
  { year: '2004', event: 'Empecé a producir: estudio en el cuarto, sin presupuesto, pura obsesión.', image: '/about/IMG_3791.PNG' },
  { year: '2008', event: 'Primera participación en una producción profesional. Ahí se fijó el estándar.', image: '/about/IMG_3796.PNG' },
  { year: '2010', event: 'Nace MuzikSociety como marca.', image: '/logo.png' },
  { year: '2011', event: 'Abrí mi primer estudio de grabación en Miami.', image: '/about/IMG_3801.PNG' },
  { year: '2018', event: 'Primer trabajo internacional: me mudé a Medellín, Colombia.', image: '/about/IMG_3800.PNG' },
  { year: '2023', event: 'Abrí estudio en Medellín. Entré al desarrollo y la IA, y todo cambió.', image: '/about/IMG_3790.PNG' },
  { year: '2025', event: 'Lancé SampleMonsta, mi primer software. El código ya es parte del oficio.', image: '/about/IMG_3794.PNG' },
  { year: '2026', event: 'Lancé Varia, Ruido e ILI. La próxima marca grande es la tuya.' },
]

const skills = [
  'Producción musical', 'Mezcla', 'Master', 'Ingeniería de audio',
  'Diseño sonoro', 'Composición', 'Dirección vocal', 'Diseño gráfico',
  'Producción de contenido', 'Desarrollo de artistas', 'Educación musical',
  'Desarrollo de software', 'Integración de IA', 'Agentes de IA', 'Automatización',
  'Pro Tools', 'FL Studio', 'TypeScript', 'Next.js', 'Python', 'C++', 'JUCE',
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      {/* Header */}
      <FadeIn>
        <div className="mb-16">
          <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-(--color-accent) uppercase">
            Sobre mí
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-(--color-foreground) md:text-6xl">
            El largo plazo.
          </h1>
        </div>
      </FadeIn>

      {/* Bio */}
      <FadeIn delay={0.05}>
        <div className="mb-24 max-w-2xl flex flex-col gap-5">
          <p className="text-base text-(--color-muted) leading-relaxed">
            Soy Gabriel Santiago, Santi: productor, ingeniero de audio y desarrollador de software, radicado en Medellín, Colombia. Bilingüe, español e inglés. Me especializo en géneros urbanos y fusiones urbano-tropicales.
          </p>
          <p className="text-base text-(--color-muted) leading-relaxed">
            Más de 100 canciones publicadas, producidas, mezcladas y masterizadas para más de 60 artistas, incluidos 3 álbumes completos. Créditos con Nicky Jam, Ñengo Flow, Yaga &amp; Mackie, Kario &amp; Yaret, Jadiel, Guelo Star y Juno The Hitmaker. Sesiones en Miami Recording Studios, Criteria, Circle House, Midtown y Miami Beach Studios.
          </p>
          <p className="text-base text-(--color-muted) leading-relaxed">
            Empecé en un cuarto en 2004. Primer estudio en 2011, en Miami. En 2018 un artista de Miami decidió mudar todo su proyecto a Medellín y yo tomé la llamada. Fue mi primer trabajo internacional, y nunca me fui.
          </p>
          <p className="text-base text-(--color-muted) leading-relaxed">
            Lo que me separa de un productor o ingeniero que encuentras en cualquier lado es que no solo hago canciones: construyo artistas. Mi trabajo de desarrollo de artista junta producción, ingeniería, estrategia y dirección creativa en un solo proceso. Una persona que ve el cuadro completo: el sonido, la identidad, el público y el largo plazo.
          </p>
          <p className="text-base text-(--color-muted) leading-relaxed">
            En tecnología, creé solo, de principio a fin, SampleMonsta: un plugin de audio con IA (C++/JUCE) que usan cerca de 10.000 productores, con su tienda, licencias y servidor. En 2026 lancé Varia, Ruido e ILI. Construyo sitios y plataformas como samplemonsta.com y vibradb.com, y los sistemas de IA y automatización con los que opero mi propio negocio.
          </p>
          <p className="text-base text-(--color-muted) leading-relaxed">
            Mi firma como creador es el sampleo. No como atajo, sino como lenguaje: transformar, voltear y reconstruir el sonido hasta que sea algo que nunca existió. Me llamo a mí mismo un Living Breathing Sampling Monster, y lo digo en serio.
          </p>
          <p className="text-base italic text-(--color-foreground) leading-relaxed">
            “Quiero que cada artista sea mejor artista con cada sesión que tiene conmigo.”
          </p>
          <p className="text-base text-(--color-foreground) leading-relaxed font-medium">
            Si estás construyendo algo que importa y quieres a alguien que ha estado en el cuarto, en la ciudad y en el oficio desde 2004, estás en el lugar correcto.{' '}
            <a href="/services" className="text-(--color-accent) hover:underline">Mira lo que hago →</a>
          </p>
        </div>
      </FadeIn>

      {/* Timeline */}
      <FadeIn>
        <div className="mb-24">
          <h2 className="mb-10 text-lg font-bold tracking-tight text-(--color-foreground)">
            Trayectoria
          </h2>
          <div className="relative border-l border-(--color-border) pl-8 space-y-10">
            {timeline.map((item, i) => (
              <FadeIn key={item.year} delay={i * 0.06}>
                <div className="relative">
                  <div className="absolute -left-[2.625rem] top-1 h-3 w-3 rounded-full bg-(--color-accent)" />
                  <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold tracking-widest text-(--color-accent) mb-1">
                        {item.year}
                      </p>
                      <p className="text-sm text-(--color-muted)">{item.event}</p>
                    </div>
                    {item.image && (
                      <div className={`mt-4 sm:mt-0 shrink-0 w-full sm:w-52 overflow-hidden rounded-xl border border-(--color-border) ${item.image === '/logo.png' ? 'bg-(--color-background) flex items-center justify-center p-6 h-36' : ''}`}>
                        <Image
                          src={item.image}
                          alt={`${item.year}`}
                          width={400}
                          height={300}
                          className={item.image === '/logo.png'
                            ? 'w-auto h-full object-contain opacity-80 hover:opacity-100 transition-opacity duration-500'
                            : 'w-full h-36 object-cover grayscale hover:grayscale-0 transition-all duration-500'
                          }
                        />
                      </div>
                    )}
                  </div>
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
            Herramientas y habilidades
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
