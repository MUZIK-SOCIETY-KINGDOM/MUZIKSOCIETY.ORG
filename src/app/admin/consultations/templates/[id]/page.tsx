import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { addQuestion, deleteQuestion, updateTemplate } from './actions'
import type { ConsultationQuestion } from '@/lib/types'

export const dynamic = 'force-dynamic'

function groupBySection(questions: ConsultationQuestion[]) {
  const groups: Record<string, ConsultationQuestion[]> = {}
  for (const q of questions) {
    const key = q.section ?? 'General'
    if (!groups[key]) groups[key] = []
    groups[key].push(q)
  }
  return groups
}

export default async function TemplateEditorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  const { data: template } = await supabase
    .from('ms_consultation_templates')
    .select('*')
    .eq('id', id)
    .single()

  if (!template) notFound()

  const { data: questions } = await supabase
    .from('ms_consultation_questions')
    .select('*')
    .eq('template_id', id)
    .order('order_index', { ascending: true })

  const grouped = groupBySection((questions as ConsultationQuestion[]) ?? [])

  // Unique sections for the section autocomplete
  const sections = [...new Set((questions as ConsultationQuestion[] ?? []).map((q) => q.section).filter(Boolean))] as string[]

  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/consultations/templates"
        className="text-xs text-(--color-muted) hover:text-(--color-foreground) transition-colors mb-6 inline-block"
      >
        ← Templates
      </Link>

      {/* Template info edit */}
      <form action={updateTemplate.bind(null, id)} className="rounded-lg border border-(--color-border) bg-(--color-surface) p-6 space-y-3 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold tracking-widest text-(--color-accent) uppercase">Template Info</h2>
          <button type="submit" className="text-xs text-(--color-accent) hover:underline">Save</button>
        </div>
        <input
          name="title"
          defaultValue={template.title}
          required
          placeholder="Title *"
          className="input-field text-lg font-bold"
        />
        <textarea
          name="description"
          defaultValue={template.description ?? ''}
          placeholder="Description"
          rows={2}
          className="input-field resize-none"
        />
      </form>

      {/* Questions list */}
      <div className="mb-8 space-y-6">
        <h2 className="text-sm font-bold text-(--color-foreground)">
          Questions ({(questions ?? []).length})
        </h2>

        {Object.keys(grouped).length === 0 ? (
          <p className="text-xs text-(--color-muted)">No questions yet — add your first one below.</p>
        ) : (
          Object.entries(grouped).map(([section, qs]) => (
            <div key={section} className="rounded-lg border border-(--color-border) bg-(--color-surface) overflow-hidden">
              <div className="border-b border-(--color-border) px-5 py-2.5 bg-(--color-background)">
                <span className="text-xs font-bold tracking-[0.15em] text-(--color-accent) uppercase">{section}</span>
              </div>
              <div className="divide-y divide-(--color-border)">
                {qs.map((q, i) => (
                  <div key={q.id} className="flex items-start gap-4 px-5 py-4">
                    <span className="text-xs text-(--color-muted) w-5 shrink-0 mt-0.5">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-(--color-foreground)">{q.question}</p>
                      <p className="text-xs text-(--color-muted) mt-0.5">
                        {q.type}
                        {q.options && ` · ${q.options.join(', ')}`}
                        {q.required && ' · required'}
                      </p>
                    </div>
                    <form action={deleteQuestion.bind(null, id, q.id)}>
                      <button type="submit" className="text-xs text-red-400 hover:text-red-300 transition-colors shrink-0">
                        ×
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add question form */}
      <form action={addQuestion.bind(null, id)} className="rounded-lg border border-(--color-accent)/30 bg-(--color-surface) p-6 space-y-4">
        <h2 className="text-sm font-bold text-(--color-foreground)">Add Question</h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            name="section"
            placeholder="Section (e.g. Identity & Positioning)"
            list="section-options"
            className="input-field sm:col-span-2"
          />
          <datalist id="section-options">
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
            <label className="text-xs text-(--color-muted)">Options (one per line, for select/radio)</label>
            <textarea
              name="options"
              placeholder={"Yes\nNo\nSomewhat"}
              rows={3}
              className="input-field resize-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="required" name="required" value="true" />
          <label htmlFor="required" className="text-xs text-(--color-muted)">Required</label>
        </div>

        <button type="submit" className="admin-btn">
          Add Question
        </button>
      </form>
    </div>
  )
}
