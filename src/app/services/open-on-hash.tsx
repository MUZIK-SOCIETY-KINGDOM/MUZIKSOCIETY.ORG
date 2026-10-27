'use client'

import { useEffect } from 'react'

// Opens the <details> a gallery link points to (e.g. #e2), then scrolls to it.
export default function OpenOnHash() {
  useEffect(() => {
    const open = () => {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)))
      if (el instanceof HTMLDetailsElement) {
        el.open = true
        el.scrollIntoView({ block: 'start' })
      }
    }
    open()
    window.addEventListener('hashchange', open)
    return () => window.removeEventListener('hashchange', open)
  }, [])
  return null
}
