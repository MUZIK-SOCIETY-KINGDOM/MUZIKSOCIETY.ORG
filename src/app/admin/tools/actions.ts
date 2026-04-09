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

export async function createTool(formData: FormData) {
  const supabase = await getServiceClient()
  await supabase.from('ms_tools').insert({
    name: formData.get('name') as string,
    description: (formData.get('description') as string) || null,
    cover_url: (formData.get('cover_url') as string) || null,
    live_url: (formData.get('live_url') as string) || null,
    repo_url: (formData.get('repo_url') as string) || null,
    published: formData.get('published') === 'true',
  })
  revalidatePath('/tools')
}

export async function deleteTool(id: string) {
  const supabase = await getServiceClient()
  await supabase.from('ms_tools').delete().eq('id', id)
  revalidatePath('/tools')
}
