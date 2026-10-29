'use client'

import { createContext, useContext, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { LANG_COOKIE, type Lang } from '@/lib/lang'

const LangContext = createContext<Lang>('es')

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>
}

export function useLang(): Lang {
  return useContext(LangContext)
}

export function useSetLang() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  function setLang(next: Lang) {
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`
    startTransition(() => router.refresh())
  }
  return { setLang, pending }
}
