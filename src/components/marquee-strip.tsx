'use client'

import Marquee from 'react-fast-marquee'

const items = [
  'NICKY JAM',
  'ÑENGO FLOW',
  'YAGA & MACKIE',
  'KARIO & YARET',
  'JADIEL',
  'GUELO STAR',
  'JUNO THE HITMAKER',
  'CRITERIA',
  'CIRCLE HOUSE',
  'MIDTOWN',
  'MIAMI BEACH STUDIOS',
  'SAMPLEMONSTA',
]

export function MarqueeStrip() {
  return (
    <div className="border-y border-(--color-border) bg-(--color-surface) py-4 overflow-hidden">
      <Marquee speed={35} gradient={false} pauseOnHover>
        {items.map((item) => (
          <span
            key={item}
            className="mx-8 text-[11px] font-semibold tracking-[0.25em] text-(--color-muted)"
          >
            {item}
            <span className="ml-8 text-(--color-accent) opacity-50">·</span>
          </span>
        ))}
      </Marquee>
    </div>
  )
}
