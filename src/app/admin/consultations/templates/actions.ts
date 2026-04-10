'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createTemplate(formData: FormData) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('ms_consultation_templates')
    .insert({
      title: formData.get('title') as string,
      description: (formData.get('description') as string) || null,
    })
    .select('id')
    .single()

  if (error || !data) return
  redirect(`/admin/consultations/templates/${data.id}`)
}

export async function deleteTemplate(id: string) {
  const supabase = await createClient()
  await supabase.from('ms_consultation_templates').delete().eq('id', id)
  revalidatePath('/admin/consultations/templates')
  redirect('/admin/consultations/templates')
}
