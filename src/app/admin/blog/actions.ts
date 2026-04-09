'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { slugify } from '@/lib/utils'

async function getServiceClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: { getAll: () => cookieStore.getAll(), setAll: () => {} } }
  )
}

export async function createBlogPost(formData: FormData) {
  const supabase = await getServiceClient()
  const title = formData.get('title') as string
  const published = formData.get('published') === 'true'
  await supabase.from('ms_blog_posts').insert({
    title,
    slug: slugify(title) + '-' + Date.now(),
    body: formData.get('body') as string,
    excerpt: (formData.get('excerpt') as string) || null,
    tags: (formData.get('tags') as string)
      ? (formData.get('tags') as string).split(',').map((t) => t.trim())
      : null,
    published,
    published_at: published ? new Date().toISOString() : null,
  })
  revalidatePath('/blog')
}

export async function updateBlogPost(id: string, formData: FormData) {
  const supabase = await getServiceClient()
  const published = formData.get('published') === 'true'
  await supabase.from('ms_blog_posts').update({
    title: formData.get('title') as string,
    body: formData.get('body') as string,
    excerpt: (formData.get('excerpt') as string) || null,
    tags: (formData.get('tags') as string)
      ? (formData.get('tags') as string).split(',').map((t) => t.trim())
      : null,
    published,
    published_at: published ? new Date().toISOString() : null,
  }).eq('id', id)
  revalidatePath('/blog')
}

export async function deleteBlogPost(id: string) {
  const supabase = await getServiceClient()
  await supabase.from('ms_blog_posts').delete().eq('id', id)
  revalidatePath('/blog')
}
