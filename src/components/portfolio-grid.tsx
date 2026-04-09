'use client'

import { useState } from 'react'
import { PortfolioCard } from '@/components/portfolio-card'
import type { PortfolioEntry } from '@/lib/types'

const filters = ['all', 'producer', 'engineer', 'developer'] as const
type Filter = typeof filters[number]

type PortfolioGridProps = {
  entries: PortfolioEntry[]
}

export function PortfolioGrid({ entries }: PortfolioGridProps) {
  const [active, setActive] = useState<Filter>('all')

  const filtered = active === 'all'
    ? entries
    : entries.filter((e) => e.role === active)

  return (
    <>
      {/* Filter tabs */}
      <div className="mb-8 flex gap-2 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            aria-label={`Filter by ${f === 'all' ? 'all roles' : f}`}
            aria-pressed={active === f}
            className={`rounded-md px-4 py-2 text-xs font-semibold capitalize transition-colors ${
              active === f
                ? 'bg-(--color-accent) text-(--color-background)'
                : 'border border-(--color-border) text-(--color-muted) hover:border-(--color-muted)'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-sm text-(--color-muted)">No entries in this category yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((entry) => (
            <PortfolioCard key={entry.id} entry={entry} />
          ))}
        </div>
      )}
    </>
  )
}
