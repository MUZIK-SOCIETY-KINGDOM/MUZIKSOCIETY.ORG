'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

async function getServiceClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  )
}

export async function createPortfolioEntry(formData: FormData) {
  const supabase = await getServiceClient()
  await supabase.from('ms_portfolio').insert({
    title: formData.get('title') as string,
    artist: (formData.get('artist') as string) || null,
    year: formData.get('year') ? Number(formData.get('year')) : null,
    role: formData.get('role') as string,
    description: (formData.get('description') as string) || null,
    cover_url: (formData.get('cover_url') as string) || null,
    published: formData.get('published') === 'true',
  })
  revalidatePath('/portfolio')
}

export async function deletePortfolioEntry(id: string) {
  const supabase = await getServiceClient()
  await supabase.from('ms_portfolio').delete().eq('id', id)
  revalidatePath('/portfolio')
}
