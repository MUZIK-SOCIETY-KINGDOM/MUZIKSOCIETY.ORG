import type { Metadata } from 'next'
import Image from 'next/image'
import { FadeIn } from '@/components/fade-in'
import { getLang } from '@/lib/lang-server'

type TimelineItem = {
  year: string
  event: string
  eventEn: string
  image?: string
}

export async function generateMetadata(): Promise<Metadata> {
  return { title: (await getLang()) === 'en' ? 'About — MuzikSociety' : 'Sobre mí — MuzikSociety' }
}

const timeline: TimelineItem[] = [
  { year: '2004', event: 'Empecé a producir: estudio en el cuarto, sin presupuesto, pura obsesión.', eventEn: 'Started producing: bedroom studio, no budget, pure obsession.', image: '/about/IMG_3791.PNG' },
  { year: '2008', event: 'Primera participación en una producción profesional. Ahí se fijó el estándar.', eventEn: 'First credit on a professional production. That set the standard.', image: '/about/IMG_3796.PNG' },
  { year: '2010', event: 'Nace MuzikSociety como marca.', eventEn: 'MuzikSociety is born as a brand.', image: '/logo.png' },
  { year: '2011', event: 'Abrí mi primer estudio de grabación en Miami.', eventEn: 'Opened my first recording studio in Miami.', image: '/about/IMG_3801.PNG' },
  { year: '2018', event: 'Primer trabajo internacional: me mudé a Medellín, Colombia.', eventEn: 'First international job: moved to Medellín, Colombia.', image: '/about/IMG_3800.PNG' },
  { year: '2023', event: 'Abrí estudio en Medellín. Entré al desarrollo y la IA, y todo cambió.', eventEn: 'Opened a studio in Medellín. Got into development and AI, and everything changed.', image: '/about/IMG_3790-x2.jpg' },
  { year: '2025', event: 'Lancé SampleMonsta, mi primer software. El código ya es parte del oficio.', eventEn: 'Launched SampleMonsta, my first software. Code is now part of the craft.', image: '/about/IMG_3794.PNG' },
  { year: '2026', event: 'Lancé tres plugins más: Varia, ILI y Ruido. La próxima marca grande es la tuya.', eventEn: 'Launched three more plugins: Varia, ILI and Ruido. The next big brand is yours.' },
]

const skillsEn = [
  'Music production', 'Mixing', 'Mastering', 'Audio engineering',
  'Sound design', 'Composition', 'Vocal direction', 'Graphic design',
  'Content production', 'Artist development', 'Music education',
  'Software development', 'AI integration', 'AI agents', 'Automation',
  'Pro Tools', 'FL Studio', 'TypeScript', 'Next.js', 'Python', 'C++', 'JUCE',
]

const skills = [
  'Producción musical', 'Mezcla', 'Master', 'Ingeniería de audio',
  'Diseño sonoro', 'Composición', 'Dirección vocal', 'Diseño gráfico',
  'Producción de contenido', 'Desarrollo de artistas', 'Educación musical',
  'Desarrollo de software', 'Integración de IA', 'Agentes de IA', 'Automatización',
  'Pro Tools', 'FL Studio', 'TypeScript', 'Next.js', 'Python', 'C++', 'JUCE',
]

export default async function AboutPage() {
  const en = (await getLang()) === 'en'
  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      {/* Header */}
      <FadeIn>
        <div className="mb-16">
          <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-(--color-accent) uppercase">
            {en ? 'About' : 'Sobre mí'}
          </p>
          <h1 className="text-4xl font-extrabold tracking-tight text-(--color-foreground) md:text-6xl">
            {en ? 'The long game.' : 'El largo plazo.'}
          </h1>
        </div>
      </FadeIn>

      {/* Bio */}
      <FadeIn delay={0.05}>
        <div className="mb-24 max-w-2xl flex flex-col gap-5">
          <p className="text-base text-(--color-muted) leading-relaxed">
            {en
              ? 'I’m Gabriel Santiago, Santi: producer, audio engineer and software developer, based in Medellín, Colombia. Bilingual, Spanish and English. I specialize in urban genres and urban-tropical fusions.'
              : 'Soy Gabriel Santiago, Santi: productor, ingeniero de audio y desarrollador de software, radicado en Medellín, Colombia. Bilingüe, español e inglés. Me especializo en géneros urbanos y fusiones urbano-tropicales.'}
          </p>
          <p className="text-base text-(--color-muted) leading-relaxed">
            {en
              ? 'Over 100 released songs produced, mixed and mastered for 60+ artists, including 3 full albums. Credits with Nicky Jam, Ñengo Flow, Yaga & Mackie, Kario & Yaret, Jadiel, Guelo Star and Juno The Hitmaker. Sessions at Miami Recording Studios, Criteria, Circle House, Midtown and Miami Beach Studios.'
              : 'Más de 100 canciones publicadas, producidas, mezcladas y masterizadas para más de 60 artistas, incluidos 3 álbumes completos. Créditos con Nicky Jam, Ñengo Flow, Yaga & Mackie, Kario & Yaret, Jadiel, Guelo Star y Juno The Hitmaker. Sesiones en Miami Recording Studios, Criteria, Circle House, Midtown y Miami Beach Studios.'}
          </p>
          <p className="text-base text-(--color-muted) leading-relaxed">
            {en
              ? 'I started in a bedroom in 2004. First studio in 2011, in Miami. In 2018 a Miami artist decided to move his whole project to Medellín and I took the call. It was my first international job, and I never left.'
              : 'Empecé en un cuarto en 2004. Primer estudio en 2011, en Miami. En 2018 un artista de Miami decidió mudar todo su proyecto a Medellín y yo tomé la llamada. Fue mi primer trabajo internacional, y nunca me fui.'}
          </p>
          <p className="text-base text-(--color-muted) leading-relaxed">
            {en
              ? 'What separates me from the producer or engineer you find anywhere is that I don’t just make songs: I build artists. My artist development work joins production, engineering, strategy and creative direction in one process. One person who sees the full picture: the sound, the identity, the audience and the long game.'
              : 'Lo que me separa de un productor o ingeniero que encuentras en cualquier lado es que no solo hago canciones: construyo artistas. Mi trabajo de desarrollo de artista junta producción, ingeniería, estrategia y dirección creativa en un solo proceso. Una persona que ve el cuadro completo: el sonido, la identidad, el público y el largo plazo.'}
          </p>
          <p className="text-base text-(--color-muted) leading-relaxed">
            {en
              ? 'In tech, I built SampleMonsta solo, start to finish: an AI audio plugin (C++/JUCE) used by 12,000+ producers, with its store, licensing and server. In 2026 I launched Varia, ILI and Ruido. I build sites and platforms like samplemonsta.com and vibradb.com, and the AI and automation systems I run my own business on.'
              : 'En tecnología, creé solo, de principio a fin, SampleMonsta: un plugin de audio con IA (C++/JUCE) que usan más de 12.000 productores, con su tienda, licencias y servidor. En 2026 lancé Varia, ILI y Ruido. Construyo sitios y plataformas como samplemonsta.com y vibradb.com, y los sistemas de IA y automatización con los que opero mi propio negocio.'}
          </p>
          <p className="text-base text-(--color-muted) leading-relaxed">
            {en
              ? 'My signature as a creator is sampling. Not as a shortcut, but as a language: transform, flip and rebuild sound until it becomes something that never existed. I call myself a Living Breathing Sampling Monster, and I mean it.'
              : 'Mi firma como creador es el sampleo. No como atajo, sino como lenguaje: transformar, voltear y reconstruir el sonido hasta que sea algo que nunca existió. Me llamo a mí mismo un Living Breathing Sampling Monster, y lo digo en serio.'}
          </p>
          <p className="text-base italic text-(--color-foreground) leading-relaxed">
            {en
              ? '“I want every artist to be a better artist after every session with me.”'
              : '“Quiero que cada artista sea mejor artista con cada sesión que tiene conmigo.”'}
          </p>
          <p className="text-base text-(--color-foreground) leading-relaxed font-medium">
            {en
              ? 'If you’re building something that matters and want someone who’s been in the room, in the city and in the craft since 2004, you’re in the right place.'
              : 'Si estás construyendo algo que importa y quieres a alguien que ha estado en el cuarto, en la ciudad y en el oficio desde 2004, estás en el lugar correcto.'}{' '}
            <a href="/services" className="text-(--color-accent) hover:underline">{en ? 'See what I do →' : 'Mira lo que hago →'}</a>
          </p>
        </div>
      </FadeIn>

      {/* Timeline */}
      <FadeIn>
        <div className="mb-24">
          <h2 className="mb-10 text-lg font-bold tracking-tight text-(--color-foreground)">
            {en ? 'Timeline' : 'Trayectoria'}
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
                      <p className="text-sm text-(--color-muted)">{en ? item.eventEn : item.event}</p>
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
            {en ? 'Tools and skills' : 'Herramientas y habilidades'}
          </h2>
          <div className="flex flex-wrap gap-2">
            {(en ? skillsEn : skills).map((skill) => (
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
