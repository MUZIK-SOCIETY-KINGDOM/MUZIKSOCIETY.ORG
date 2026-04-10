import { createClient } from '@/lib/supabase/server'
import { createSession } from '../actions'
import type { ConsultationTemplate } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function NewConsultationPage() {
  const supabase = await createClient()
  const { data: templates } = await supabase
    .from('ms_consultation_templates')
    .select('id, title, description')
    .order('created_at', { ascending: true })

  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-bold text-(--color-foreground) mb-2">New Session</h1>
      <p className="text-xs text-(--color-muted) mb-8">Fill in the artist info and choose a template to work from.</p>

      <form action={createSession} className="space-y-6">
        {/* Session info */}
        <div className="rounded-lg border border-(--color-border) bg-(--color-surface) p-6 space-y-4">
          <h2 className="text-sm font-bold text-(--color-foreground)">Session Info</h2>
          <input
            name="title"
            required
            placeholder="Session title *  (e.g. Initial Consultation — John Doe)"
            className="input-field"
          />
          <input
            name="artist_name"
            required
            placeholder="Artist name *"
            className="input-field"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input-field"
          />
          <input
            name="phone"
            placeholder="Phone"
            className="input-field"
          />
        </div>

        {/* Template picker */}
        <div className="rounded-lg border border-(--color-border) bg-(--color-surface) p-6 space-y-3">
          <h2 className="text-sm font-bold text-(--color-foreground)">Template</h2>
          <p className="text-xs text-(--color-muted)">Pick a template to pre-load questions, or start with a blank session.</p>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="radio"
              name="template_id"
              value=""
              defaultChecked
              className="mt-0.5 accent-(--color-accent)"
            />
            <div>
              <p className="text-sm text-(--color-foreground)">Blank session</p>
              <p className="text-xs text-(--color-muted)">No questions — add them manually</p>
            </div>
          </label>

          {(templates as ConsultationTemplate[] ?? []).map((t) => (
            <label key={t.id} className="flex items-start gap-3 cursor-pointer group">
              <input
                type="radio"
                name="template_id"
                value={t.id}
                className="mt-0.5 accent-(--color-accent)"
              />
              <div>
                <p className="text-sm text-(--color-foreground) group-hover:text-(--color-accent) transition-colors">{t.title}</p>
                {t.description && (
                  <p className="text-xs text-(--color-muted)">{t.description}</p>
                )}
              </div>
            </label>
          ))}
        </div>

        <button type="submit" className="admin-btn w-full py-3">
          Create Session →
        </button>
      </form>
    </div>
  )
}
