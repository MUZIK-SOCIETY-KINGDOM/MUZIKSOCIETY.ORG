'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function saveResponses(sessionId: string, responses: Record<string, string>) {
  const supabase = await createClient()

  const upserts = Object.entries(responses).map(([question_id, answer]) => ({
    session_id: sessionId,
    question_id,
    answer,
    updated_at: new Date().toISOString(),
  }))

  if (upserts.length > 0) {
    await supabase
      .from('ms_consultation_responses')
      .upsert(upserts, { onConflict: 'session_id,question_id' })
  }

  revalidatePath(`/admin/consultations/${sessionId}`)
}

export async function saveNotes(sessionId: string, notes: string) {
  const supabase = await createClient()
  await supabase
    .from('ms_consultation_sessions')
    .update({ notes })
    .eq('id', sessionId)
  revalidatePath(`/admin/consultations/${sessionId}`)
}

export async function updateStatus(sessionId: string, status: string) {
  const supabase = await createClient()
  await supabase
    .from('ms_consultation_sessions')
    .update({ status })
    .eq('id', sessionId)
  revalidatePath(`/admin/consultations/${sessionId}`)
  revalidatePath('/admin/consultations')
}

export async function addSessionQuestion(sessionId: string, formData: FormData) {
  const supabase = await createClient()

  const { data: existing } = await supabase
    .from('ms_consultation_questions')
    .select('order_index')
    .eq('session_id', sessionId)
    .order('order_index', { ascending: false })
    .limit(1)

  const nextIndex = ((existing?.[0]?.order_index ?? 0) as number) + 1

  const optionsRaw = formData.get('options') as string
  const options = optionsRaw
    ? optionsRaw.split('\n').map((o) => o.trim()).filter(Boolean)
    : null

  await supabase.from('ms_consultation_questions').insert({
    session_id: sessionId,
    template_id: null,
    section: (formData.get('section') as string) || null,
    question: formData.get('question') as string,
    type: formData.get('type') as string,
    options: options ?? null,
    order_index: nextIndex,
    required: formData.get('required') === 'true',
  })

  revalidatePath(`/admin/consultations/${sessionId}`)
}

export async function deleteSessionQuestion(sessionId: string, questionId: string) {
  const supabase = await createClient()
  await supabase.from('ms_consultation_questions').delete().eq('id', questionId).eq('session_id', sessionId)
  revalidatePath(`/admin/consultations/${sessionId}`)
}
