'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function addQuestion(templateId: string, formData: FormData) {
  const supabase = await createClient()

  // Get current max order_index
  const { data: existing } = await supabase
    .from('ms_consultation_questions')
    .select('order_index')
    .eq('template_id', templateId)
    .order('order_index', { ascending: false })
    .limit(1)

  const nextIndex = ((existing?.[0]?.order_index ?? 0) as number) + 1

  const optionsRaw = formData.get('options') as string
  const options = optionsRaw
    ? optionsRaw.split('\n').map((o) => o.trim()).filter(Boolean)
    : null

  await supabase.from('ms_consultation_questions').insert({
    template_id: templateId,
    section: (formData.get('section') as string) || null,
    question: formData.get('question') as string,
    type: formData.get('type') as string,
    options: options ? options : null,
    order_index: nextIndex,
    required: formData.get('required') === 'true',
  })

  revalidatePath(`/admin/consultations/templates/${templateId}`)
}

export async function deleteQuestion(templateId: string, questionId: string) {
  const supabase = await createClient()
  await supabase.from('ms_consultation_questions').delete().eq('id', questionId)
  revalidatePath(`/admin/consultations/templates/${templateId}`)
}

export async function updateTemplate(templateId: string, formData: FormData) {
  const supabase = await createClient()
  await supabase
    .from('ms_consultation_templates')
    .update({
      title: formData.get('title') as string,
      description: (formData.get('description') as string) || null,
    })
    .eq('id', templateId)
  revalidatePath(`/admin/consultations/templates/${templateId}`)
  revalidatePath('/admin/consultations/templates')
}
