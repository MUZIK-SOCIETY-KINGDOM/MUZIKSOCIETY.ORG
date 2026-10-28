import { Hero } from '@/components/hero'
import { MarqueeStrip } from '@/components/marquee-strip'
import { SoftwareStrip } from '@/components/software-strip'
import { SectionTeasers } from '@/components/section-teasers'

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStrip />
      <SoftwareStrip />
      <SectionTeasers />
    </>
  )
}
