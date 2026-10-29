export type Lang = 'es' | 'en'

export const LANG_COOKIE = 'lang'

export function toLang(value: string | undefined | null): Lang {
  return value === 'en' ? 'en' : 'es'
}

// First visit: Spanish (and Portuguese) browsers get Spanish, everyone else English.
export function langFromAcceptLanguage(header: string | null): Lang {
  const first = header?.split(',')[0]?.trim().toLowerCase() ?? ''
  if (!first) return 'es'
  return first.startsWith('es') || first.startsWith('pt') ? 'es' : 'en'
}
