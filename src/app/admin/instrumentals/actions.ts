'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getServiceClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  )
}

export async function createInstrumental(formData: FormData) {
  const supabase = await getServiceClient()
  await supabase.from('ms_instrumentals').insert({
    title: formData.get('title') as string,
    genre: (formData.get('genre') as string) || null,
    bpm: formData.get('bpm') ? Number(formData.get('bpm')) : null,
    key: (formData.get('key') as string) || null,
    cover_url: (formData.get('cover_url') as string) || null,
    preview_url: (formData.get('preview_url') as string) || null,
    external_url: formData.get('external_url') as string,
    published: formData.get('published') === 'true',
  })
  revalidatePath('/instrumentals')
}

export async function updateInstrumental(id: string, formData: FormData) {
  const supabase = await getServiceClient()
  await supabase.from('ms_instrumentals').update({
    title: formData.get('title') as string,
    genre: (formData.get('genre') as string) || null,
    bpm: formData.get('bpm') ? Number(formData.get('bpm')) : null,
    key: (formData.get('key') as string) || null,
    cover_url: (formData.get('cover_url') as string) || null,
    preview_url: (formData.get('preview_url') as string) || null,
    external_url: formData.get('external_url') as string,
    published: formData.get('published') === 'true',
  }).eq('id', id)
  revalidatePath('/instrumentals')
}

export async function deleteInstrumental(id: string) {
  const supabase = await getServiceClient()
  await supabase.from('ms_instrumentals').delete().eq('id', id)
  revalidatePath('/instrumentals')
}
