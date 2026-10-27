'use client'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export type ShowcaseItem = { src: string; label: string; kind: string; href: string; color: string; w: number; h: number }

// Horizontal gallery without a visible scrollbar: edge fades + round arrows (desktop) show there is more.
export default function ShowcaseStrip({ items }: { items: ShowcaseItem[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ left: false, right: true })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () =>
      setEdge({ left: el.scrollLeft > 4, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4 })
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  // Fade only the edge that still has more to scroll; a mask works over any page background.
  const mask = `linear-gradient(to right, ${edge.left ? 'transparent' : '#000'} 0, #000 48px, #000 calc(100% - 64px), ${edge.right ? 'transparent' : '#000'} 100%)`

  const go = (dir: number) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.8, behavior: 'smooth' })

  const arrow = (dir: number, show: boolean) => (
    <button
      type="button"
      aria-label={dir < 0 ? 'Anterior' : 'Siguiente'}
      onClick={() => go(dir)}
      className={`absolute top-[5.5rem] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-(--color-border) bg-(--color-background)/80 text-lg text-(--color-foreground) backdrop-blur transition-opacity hover:border-(--color-accent) hover:text-(--color-accent) sm:top-28 sm:flex ${dir < 0 ? 'left-2' : 'right-2'} ${show ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
    >
      {dir < 0 ? '←' : '→'}
    </button>
  )

  return (
    <div className="relative -mx-4">
      <div
        ref={ref}
        className="flex snap-x gap-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        {items.map((m) => (
          <a key={m.src} href={m.href} className="group shrink-0 snap-start">
            <Image
              src={m.src}
              alt={m.label}
              width={m.w}
              height={m.h}
              className="h-44 w-auto rounded-md border object-cover transition-opacity group-hover:opacity-80 sm:h-56"
              style={{ borderColor: m.color }}
            />
            <p className="mt-2 text-sm text-(--color-foreground)">{m.label}</p>
            <p className="text-xs" style={{ color: m.color }}>
              {m.kind} →
            </p>
          </a>
        ))}
      </div>
      {arrow(-1, edge.left)}
      {arrow(1, edge.right)}
    </div>
  )
}
