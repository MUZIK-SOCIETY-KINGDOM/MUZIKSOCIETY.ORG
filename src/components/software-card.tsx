import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { Software } from '@/data/software'
import type { Lang } from '@/lib/lang'

export function SoftwareCard({ p, lang = 'es' }: { p: Software; lang?: Lang }) {
  const body = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden bg-(--color-background)">
        {p.src ? (
          <Image
            src={p.src}
            alt={lang === 'en' ? `${p.name} interface` : `Interfaz de ${p.name}`}
            fill
            sizes="(min-width: 1024px) 370px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-2xl font-extrabold tracking-tight text-(--color-border)">{p.name}</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 items-start justify-between gap-4 p-5">
        <div>
          <p className="font-semibold text-(--color-foreground)">{p.name}</p>
          <p className="mt-1 text-sm text-(--color-muted)">{lang === 'en' ? p.lineEn : p.line}</p>
          <p className="mt-3 text-xs text-(--color-muted)/70">{p.meta}</p>
        </div>
        {p.href && (
          <ArrowUpRight
            size={18}
            strokeWidth={1.5}
            className="mt-0.5 shrink-0 text-(--color-muted) transition-colors group-hover:text-(--color-accent)"
          />
        )}
      </div>
    </>
  )
  const cls =
    'group flex h-full flex-col overflow-hidden rounded-xl border border-(--color-border) bg-(--color-surface) transition-colors'
  return p.href ? (
    <a href={p.href} target="_blank" rel="noopener noreferrer" className={`${cls} hover:border-(--color-accent)/40`}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  )
}
