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
