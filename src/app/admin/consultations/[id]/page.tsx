import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ResponseEditor } from './response-editor'
import { DeleteSessionButton } from './delete-button'
import type { ConsultationQuestion, ConsultationResponse } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function ConsultationSessionPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: session } = await supabase
    .from('ms_consultation_sessions')
    .select('*')
    .eq('id', id)
    .single()

  if (!session) notFound()

  // Fetch questions from the linked template
  let questions: ConsultationQuestion[] = []
  if (session.template_id) {
    const { data } = await supabase
      .from('ms_consultation_questions')
      .select('*')
      .eq('template_id', session.template_id)
      .order('order_index', { ascending: true })
    questions = (data as ConsultationQuestion[]) ?? []
  }

  // Fetch existing responses
  const { data: responses } = await supabase
    .from('ms_consultation_responses')
    .select('*')
    .eq('session_id', id)

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <Link
            href="/admin/consultations"
            className="text-xs text-(--color-muted) hover:text-(--color-foreground) transition-colors mb-3 inline-block"
          >
            ← All Sessions
          </Link>
          <h1 className="text-xl font-bold text-(--color-foreground)">{session.title}</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-sm text-(--color-accent)">{session.artist_name}</span>
            {session.email && <span className="text-xs text-(--color-muted)">{session.email}</span>}
            {session.phone && <span className="text-xs text-(--color-muted)">{session.phone}</span>}
            <span className="text-xs text-(--color-muted)">
              {new Date(session.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
        <DeleteSessionButton id={id} />
      </div>

      {/* Response editor (client component) */}
      <ResponseEditor
        sessionId={id}
        questions={questions}
        existing={(responses as ConsultationResponse[]) ?? []}
        initialNotes={session.notes ?? ''}
        initialStatus={session.status ?? 'active'}
      />
    </div>
  )
}
