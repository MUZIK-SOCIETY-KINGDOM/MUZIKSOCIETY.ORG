import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { deleteTemplate } from './actions'

export const dynamic = 'force-dynamic'

export default async function TemplatesPage() {
  const supabase = await createClient()

  const { data: templates } = await supabase
    .from('ms_consultation_templates')
    .select('id, title, description, created_at')
    .order('created_at', { ascending: true })

  // Get question counts per template
  const { data: counts } = await supabase
    .from('ms_consultation_questions')
    .select('template_id')

  const countMap: Record<string, number> = {}
  for (const row of counts ?? []) {
    countMap[row.template_id] = (countMap[row.template_id] ?? 0) + 1
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-(--color-foreground)">Templates</h1>
          <p className="text-xs text-(--color-muted) mt-1">Reusable question sets for consultations</p>
        </div>
        <Link href="/admin/consultations/templates/new" className="admin-btn">
          + New Template
        </Link>
      </div>

      <div className="space-y-2">
        {(templates ?? []).map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between rounded-lg border border-(--color-border) bg-(--color-surface) px-5 py-4"
          >
            <div>
              <Link
                href={`/admin/consultations/templates/${t.id}`}
                className="text-sm font-semibold text-(--color-foreground) hover:text-(--color-accent) transition-colors"
              >
                {t.title}
              </Link>
              {t.description && (
                <p className="text-xs text-(--color-muted) mt-0.5 max-w-xl truncate">{t.description}</p>
              )}
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <span className="text-xs text-(--color-muted)">
                {countMap[t.id] ?? 0} questions
              </span>
              <Link
                href={`/admin/consultations/templates/${t.id}`}
                className="text-xs text-(--color-accent) hover:underline"
              >
                Edit
              </Link>
              <form action={deleteTemplate.bind(null, t.id)}>
                <button
                  type="submit"
                  className="text-xs text-red-400 hover:text-red-300 transition-colors"
                >
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link
          href="/admin/consultations"
          className="text-xs text-(--color-muted) hover:text-(--color-foreground) transition-colors"
        >
          ← Back to Sessions
        </Link>
      </div>
    </div>
  )
}
