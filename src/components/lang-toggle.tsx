'use client'

import { useLang, useSetLang } from '@/contexts/lang-context'
import type { Lang } from '@/lib/lang'

const OPTIONS: Lang[] = ['es', 'en']

export function LangToggle() {
  const lang = useLang()
  const { setLang, pending } = useSetLang()

  return (
    <div
      role="group"
      aria-label={lang === 'en' ? 'Language' : 'Idioma'}
      className={`flex items-center rounded-md border border-(--color-border) p-0.5 text-[11px] font-semibold tracking-wide transition-opacity ${pending ? 'opacity-60' : ''}`}
    >
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => option !== lang && setLang(option)}
          aria-pressed={option === lang}
          className={`rounded px-2 py-1 uppercase transition-colors ${
            option === lang
              ? 'bg-(--color-foreground) text-(--color-background)'
              : 'text-(--color-muted) hover:text-(--color-foreground)'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
