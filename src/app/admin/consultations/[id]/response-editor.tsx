'use client'

import { useState, useTransition } from 'react'
import { saveResponses, saveNotes, updateStatus, deleteSessionQuestion } from './actions'
import type { ConsultationQuestion, ConsultationResponse } from '@/lib/types'

interface Props {
  sessionId: string
  questions: ConsultationQuestion[]
  sessionQuestionIds: string[]
  existing: ConsultationResponse[]
  initialNotes: string
  initialStatus: string
}

// Group questions by section
function groupBySection(questions: ConsultationQuestion[]) {
  const groups: Record<string, ConsultationQuestion[]> = {}
  for (const q of questions) {
    const key = q.section ?? 'General'
    if (!groups[key]) groups[key] = []
    groups[key].push(q)
  }
  return groups
}

export function ResponseEditor({ sessionId, questions, sessionQuestionIds, existing, initialNotes, initialStatus }: Props) {
  const sessionQSet = new Set(sessionQuestionIds)
  const [answers, setAnswers] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {}
    for (const r of existing) {
      map[r.question_id] = r.answer ?? ''
    }
    return map
  })
  const [notes, setNotes] = useState(initialNotes)
  const [status, setStatus] = useState(initialStatus)
  const [saved, setSaved] = useState(false)
  const [isPending, startTransition] = useTransition()

  const grouped = groupBySection([...questions].sort((a, b) => a.order_index - b.order_index))

  function handleSave() {
    startTransition(async () => {
      await saveResponses(sessionId, answers)
      await saveNotes(sessionId, notes)
      setSaved(true)
      setTimeout(() => setSaved(false), 2500)
    })
  }

  function handleStatusChange(newStatus: string) {
    setStatus(newStatus)
    startTransition(async () => {
      await updateStatus(sessionId, newStatus)
    })
  }

  return (
    <div className="space-y-8">
      {/* Status + save bar */}
      <div className="flex items-center justify-between rounded-lg border border-(--color-border) bg-(--color-surface) px-5 py-3">
        <div className="flex items-center gap-3">
          <span className="text-xs text-(--color-muted)">Status:</span>
          {['active', 'completed', 'archived'].map((s) => (
            <button
              key={s}
              onClick={() => handleStatusChange(s)}
              className={`text-xs capitalize px-3 py-1 rounded-md transition-colors ${
                status === s
                  ? 'bg-(--color-accent) text-(--color-background) font-semibold'
                  : 'text-(--color-muted) hover:text-(--color-foreground)'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          onClick={handleSave}
          disabled={isPending}
          className="admin-btn disabled:opacity-50"
        >
          {isPending ? 'Saving...' : saved ? 'Saved ✓' : 'Save All'}
        </button>
      </div>

      {/* Questions grouped by section */}
      {questions.length === 0 ? (
        <div className="rounded-lg border border-(--color-border) bg-(--color-surface) p-8 text-center">
          <p className="text-sm text-(--color-muted)">No questions in this session.</p>
          <p className="text-xs text-(--color-muted) mt-1">This was created as a blank session — use the Notes section below to record your observations.</p>
        </div>
      ) : (
        Object.entries(grouped).map(([section, qs]) => (
          <div key={section} className="rounded-lg border border-(--color-border) bg-(--color-surface) overflow-hidden">
            <div className="border-b border-(--color-border) px-6 py-3 bg-(--color-background)">
              <h3 className="text-xs font-bold tracking-[0.15em] text-(--color-accent) uppercase">{section}</h3>
            </div>
            <div className="divide-y divide-(--color-border)">
              {qs.map((q) => (
                <div key={q.id} className="px-6 py-5 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <label className="text-sm text-(--color-foreground) leading-snug block">
                      {q.question}
                      {q.required && <span className="ml-1 text-red-400">*</span>}
                    </label>
                    {sessionQSet.has(q.id) && (
                      <form action={deleteSessionQuestion.bind(null, sessionId, q.id)} className="shrink-0">
                        <button type="submit" className="text-xs text-red-400 hover:text-red-300 transition-colors mt-0.5">×</button>
                      </form>
                    )}
                  </div>
                  {q.type === 'textarea' ? (
                    <textarea
                      rows={3}
                      value={answers[q.id] ?? ''}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                      placeholder="Answer..."
                      className="input-field resize-y"
                    />
                  ) : q.type === 'scale' ? (
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: String(n) }))}
                          className={`w-9 h-9 rounded-md text-xs font-semibold transition-colors ${
                            answers[q.id] === String(n)
                              ? 'bg-(--color-accent) text-(--color-background)'
                              : 'border border-(--color-border) text-(--color-muted) hover:border-(--color-accent) hover:text-(--color-foreground)'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  ) : q.type === 'select' || q.type === 'radio' ? (
                    <div className="flex flex-wrap gap-2">
                      {(q.options ?? []).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                          className={`px-3 py-1.5 rounded-md text-xs transition-colors ${
                            answers[q.id] === opt
                              ? 'bg-(--color-accent) text-(--color-background) font-semibold'
                              : 'border border-(--color-border) text-(--color-muted) hover:border-(--color-accent) hover:text-(--color-foreground)'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={answers[q.id] ?? ''}
                      onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                      placeholder="Answer..."
                      className="input-field"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Notes section */}
      <div className="rounded-lg border border-(--color-border) bg-(--color-surface) overflow-hidden">
        <div className="border-b border-(--color-border) px-6 py-3 bg-(--color-background)">
          <h3 className="text-xs font-bold tracking-[0.15em] text-(--color-accent) uppercase">Session Notes</h3>
        </div>
        <div className="p-6">
          <textarea
            rows={6}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Observations, strategy ideas, action items, follow-ups..."
            className="input-field resize-y w-full"
          />
        </div>
      </div>

      {/* Bottom save */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="admin-btn px-8 py-3 disabled:opacity-50"
        >
          {isPending ? 'Saving...' : saved ? 'Saved ✓' : 'Save All'}
        </button>
      </div>
    </div>
  )
}
