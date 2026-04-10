import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { ConsultationSession } from '@/lib/types'

export const dynamic = 'force-dynamic'

const statusColors: Record<string, string> = {
  active: 'text-green-400',
  completed: 'text-blue-400',
  archived: 'text-(--color-muted)',
}

export default async function ConsultationsPage() {
  const supabase = await createClient()
  const { data: sessions } = await supabase
    .from('ms_consultation_sessions')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-(--color-foreground)">Consultations</h1>
          <p className="text-xs text-(--color-muted) mt-1">Artist development sessions</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/consultations/templates"
            className="rounded-md border border-(--color-border) px-4 py-2 text-xs text-(--color-muted) hover:text-(--color-foreground) transition-colors"
          >
            Templates
          </Link>
          <Link
            href="/admin/consultations/new"
            className="admin-btn"
          >
            + New Session
          </Link>
        </div>
      </div>

      {(!sessions || sessions.length === 0) ? (
        <div className="rounded-lg border border-(--color-border) bg-(--color-surface) p-12 text-center">
          <p className="text-sm text-(--color-muted)">No sessions yet.</p>
          <Link href="/admin/consultations/new" className="mt-4 inline-block text-xs text-(--color-accent) hover:underline">
            Start your first session →
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {(sessions as ConsultationSession[]).map((s) => (
            <Link
              key={s.id}
              href={`/admin/consultations/${s.id}`}
              className="flex items-center justify-between rounded-lg border border-(--color-border) bg-(--color-surface) px-5 py-4 hover:border-(--color-accent)/40 hover:bg-(--color-background) transition-colors group"
            >
              <div>
                <p className="text-sm font-semibold text-(--color-foreground) group-hover:text-(--color-accent) transition-colors">
                  {s.title}
                </p>
                <p className="text-xs text-(--color-muted) mt-0.5">
                  {s.artist_name}
                  {s.email && <> · {s.email}</>}
                  {s.phone && <> · {s.phone}</>}
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span className={`text-xs capitalize ${statusColors[s.status] ?? 'text-(--color-muted)'}`}>
                  {s.status}
                </span>
                <span className="text-xs text-(--color-muted)">
                  {new Date(s.created_at).toLocaleDateString()}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
