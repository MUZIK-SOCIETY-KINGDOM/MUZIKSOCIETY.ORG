'use client'

import { useEffect, useState } from 'react'
import { usePlayer } from '@/contexts/player-context'

export function PromoPopup() {
  const { playCount } = usePlayer()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (playCount > 0 && playCount % 5 === 0) {
      setVisible(true)
    }
  }, [playCount])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
      onClick={() => setVisible(false)}
    >
      <div
        className="relative mx-auto w-full max-w-md rounded-2xl border border-(--color-border) bg-(--color-surface) p-8 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={() => setVisible(false)}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-(--color-muted) hover:text-(--color-foreground) transition-colors"
          aria-label="Cerrar"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Icon */}
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-(--color-accent)/10 text-2xl">
          🎵
        </div>

        <h2 className="mb-3 text-xl font-bold text-(--color-foreground)">
          ¿Te está gustando lo que escuchas?
        </h2>

        <p className="mb-6 text-sm leading-relaxed text-(--color-muted)">
          Estos instrumentales son solo puntos de partida — versiones en baja calidad para que te des una idea del vibe. Para la versión completa, producción a la medida y la máxima calidad de sonido, estamos aquí para ti.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="https://wa.me/573006864470"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setVisible(false)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>

          <a
            href="/contact"
            onClick={() => setVisible(false)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-(--color-accent) py-3 text-sm font-semibold text-(--color-accent) transition-colors hover:bg-(--color-accent)/10"
          >
            Contactar
          </a>
        </div>

        <p className="mt-4 text-[11px] text-(--color-border)">
          Haz clic en cualquier lugar para cerrar
        </p>
      </div>
    </div>
  )
}
