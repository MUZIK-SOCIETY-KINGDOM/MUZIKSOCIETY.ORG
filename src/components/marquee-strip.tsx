'use client'

import Marquee from 'react-fast-marquee'

const items = [
  'PRODUCER',
  'ENGINEER',
  'DEVELOPER',
  'CREATOR',
  'MUZIKSOCIETY',
  '20+ YEARS',
  'ONE STANDARD',
  'MEDELLIN',
  'PUERTO RICO',
  'MUSIC PRODUCTION',
  'MIXING & MASTERING',
  'AUDIO ENGINEERING',
  'SOFTWARE DEVELOPMENT',
  'ARTIST DEVELOPMENT',
]

export function MarqueeStrip() {
  return (
    <div className="border-y border-(--color-border) bg-(--color-surface) py-3 overflow-hidden">
      <Marquee speed={35} gradient={false} pauseOnHover>
        {items.map((item) => (
          <span
            key={item}
            className="mx-8 text-[10px] font-semibold tracking-[0.25em] text-(--color-muted)"
          >
            {item}
            <span className="ml-8 text-(--color-accent) opacity-50">·</span>
          </span>
        ))}
      </Marquee>
    </div>
  )
}
