'use client'

import { useLang, useSetLang } from '@/contexts/lang-context'
import type { Lang } from '@/lib/lang'

const OPTIONS: Lang[] = ['es', 'en']

function FlagPR() {
  return (
    <svg viewBox="0 0 15 10" className="h-3 w-[18px] shrink-0 rounded-[1px]" aria-hidden="true">
      {[0, 2, 4].map((i) => <rect key={i} y={i * 2} width="15" height="2" fill="#ED0000" />)}
      {[1, 3].map((i) => <rect key={i} y={i * 2} width="15" height="2" fill="#fff" />)}
      <path d="M0 0 L8.66 5 L0 10 Z" fill="#0050F0" />
      <path d="M2.9 3.6 L3.23 4.62 L4.3 4.62 L3.43 5.25 L3.77 6.27 L2.9 5.64 L2.03 6.27 L2.37 5.25 L1.5 4.62 L2.57 4.62 Z" fill="#fff" />
    </svg>
  )
}

function FlagUS() {
  return (
    <svg viewBox="0 0 15 10" className="h-3 w-[18px] shrink-0 rounded-[1px]" aria-hidden="true">
      <rect width="15" height="10" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => <rect key={i} y={(i * 10) / 13} width="15" height={10 / 13} fill="#B22234" />)}
      <rect width="6" height={70 / 13} fill="#3C3B6E" />
      {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => <circle key={`${r}${c}`} cx={0.9 + c * 1.4} cy={1 + r * 1.7} r="0.3" fill="#fff" />))}
    </svg>
  )
}

const FLAG = { es: FlagPR, en: FlagUS }

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
          aria-label={option === 'es' ? 'Español' : 'English'}
          title={option === 'es' ? 'Español' : 'English'}
          className={`flex items-center rounded px-2 py-1.5 transition-colors ${
            option === lang
              ? 'bg-(--color-foreground) text-(--color-background)'
              : 'text-(--color-muted) hover:text-(--color-foreground)'
          }`}
        >
          {(() => { const F = FLAG[option]; return <F /> })()}
        </button>
      ))}
    </div>
  )
}
