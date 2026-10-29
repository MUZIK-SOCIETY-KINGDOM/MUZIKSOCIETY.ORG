// Plugins y plataformas. Datos verificados contra ASSISTANT/rooms/<producto>/facts.md (2026-10-28).
// src = null: todavía no hay captura pública de la interfaz.

export type Software = {
  name: string
  line: string
  meta: string
  src: string | null
  href: string | null
}

export const plugins: Software[] = [
  {
    name: 'SampleMonsta',
    line: 'Convierte cualquier canción en un drum kit clasificado, dentro de tu DAW. Lo usan más de 12.000 productores.',
    meta: 'v2.1 · VST3 + Standalone · Win + Mac',
    src: '/software/samplemonsta.jpg',
    href: 'https://samplemonsta.com/samplemonsta',
  },
  {
    name: 'Varia',
    line: 'Genera 20 variaciones de tus drums con resíntesis espectral y varios motores de síntesis.',
    meta: 'v1.0 · VST3 + Standalone · Windows',
    src: '/software/varia.jpg',
    href: 'https://samplemonsta.com/varia',
  },
  {
    name: 'Ruido',
    line: 'Un rack de 10 módulos de efecto: ruido, textura, filtro, saturación, reverb y más. Una perilla grande por módulo.',
    meta: 'v1.0 · VST3 + Standalone · Win + Mac',
    src: '/software/ruido.jpg',
    href: 'https://samplemonsta.com/ruido',
  },
  {
    name: 'ILI',
    line: 'Supresor de resonancias espectral: 16 bandas con detección por IA. Limpia frecuencias duras o extrae voces y drums.',
    meta: 'v1.1 · VST3 · Win + Mac (Apple Silicon)',
    src: '/software/ili.jpg',
    href: 'https://samplemonsta.com/ili',
  },
]

export const platforms: Software[] = [
  {
    name: 'VibraDB',
    line: 'Base de datos de fans y contactos: captura por QR y links, analíticas, mapa y campañas.',
    meta: 'Web · vibradb.com',
    src: '/software/vibradb.png',
    href: 'https://vibradb.com',
  },
]
