'use server'

import { createClient } from '@/lib/supabase/server'

type InquiryInput = {
  name: string
  email: string
  subject: string
  message: string
}

export async function submitInquiry(
  input: InquiryInput
): Promise<{ success: boolean; error?: string }> {
  if (!input.name || !input.email || !input.message) {
    return { success: false, error: 'Name, email, and message are required.' }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(input.email)) {
    return { success: false, error: 'Invalid email address.' }
  }

  const supabase = await createClient()
  const { error } = await supabase.from('ms_inquiries').insert({
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    subject: input.subject || 'general',
    message: input.message.trim(),
  })

  if (error) return { success: false, error: 'Failed to send. Please try again.' }
  return { success: true }
}
