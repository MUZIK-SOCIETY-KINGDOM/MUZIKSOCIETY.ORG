'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createSession(formData: FormData) {
  const supabase = await createClient()
  const template_id = formData.get('template_id') as string | null

  const { data, error } = await supabase
    .from('ms_consultation_sessions')
    .insert({
      title: formData.get('title') as string,
      artist_name: formData.get('artist_name') as string,
      email: (formData.get('email') as string) || null,
      phone: (formData.get('phone') as string) || null,
      template_id: template_id || null,
    })
    .select('id')
    .single()

  if (error || !data) return
  redirect(`/admin/consultations/${data.id}`)
}

export async function updateSessionStatus(id: string, status: string) {
  const supabase = await createClient()
  await supabase
    .from('ms_consultation_sessions')
    .update({ status })
    .eq('id', id)
  revalidatePath('/admin/consultations')
  revalidatePath(`/admin/consultations/${id}`)
}

export async function deleteSession(id: string) {
  const supabase = await createClient()
  await supabase.from('ms_consultation_sessions').delete().eq('id', id)
  revalidatePath('/admin/consultations')
  redirect('/admin/consultations')
}
