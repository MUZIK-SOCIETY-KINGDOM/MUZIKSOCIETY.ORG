import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { ResponseEditor } from './response-editor'
import { DeleteSessionButton } from './delete-button'
import { addSessionQuestion } from './actions'
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
  let templateQuestions: ConsultationQuestion[] = []
  if (session.template_id) {
    const { data } = await supabase
      .from('ms_consultation_questions')
      .select('*')
      .eq('template_id', session.template_id)
      .order('order_index', { ascending: true })
    templateQuestions = (data as ConsultationQuestion[]) ?? []
  }

  // Fetch session-specific questions (added directly to this session)
  const { data: sessionQuestionsData } = await supabase
    .from('ms_consultation_questions')
    .select('*')
    .eq('session_id', id)
    .order('order_index', { ascending: true })
  const sessionQuestions = (sessionQuestionsData as ConsultationQuestion[]) ?? []
  const sessionQuestionIds = new Set(sessionQuestions.map((q) => q.id))

  const questions = [...templateQuestions, ...sessionQuestions]

  // Fetch existing sections for autocomplete
  const sections = [...new Set(questions.map((q) => q.section).filter(Boolean))] as string[]

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
        sessionQuestionIds={[...sessionQuestionIds]}
        existing={(responses as ConsultationResponse[]) ?? []}
        initialNotes={session.notes ?? ''}
        initialStatus={session.status ?? 'active'}
      />

      {/* Add question to this session */}
      <form action={addSessionQuestion.bind(null, id)} className="mt-10 rounded-lg border border-(--color-accent)/30 bg-(--color-surface) p-6 space-y-4">
        <h2 className="text-sm font-bold text-(--color-foreground)">Add Question to This Session</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            name="section"
            placeholder="Section (optional)"
            list="session-section-options"
            className="input-field sm:col-span-2"
          />
          <datalist id="session-section-options">
            {sections.map((s) => <option key={s} value={s} />)}
          </datalist>

          <textarea
            name="question"
            required
            placeholder="Question text *"
            rows={2}
            className="input-field resize-none sm:col-span-2"
          />

          <div className="flex flex-col gap-1">
            <label className="text-xs text-(--color-muted)">Type</label>
            <select name="type" className="input-field">
              <option value="textarea">Long answer (textarea)</option>
              <option value="text">Short answer (text)</option>
              <option value="scale">Scale 1–10</option>
              <option value="select">Select / Radio (options below)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-(--color-muted)">Options (one per line)</label>
            <textarea name="options" rows={3} className="input-field resize-none" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="sq-required" name="required" value="true" />
          <label htmlFor="sq-required" className="text-xs text-(--color-muted)">Required</label>
        </div>

        <button type="submit" className="admin-btn">Add Question</button>
      </form>
    </div>
  )
}
