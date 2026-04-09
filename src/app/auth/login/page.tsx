'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/browser'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    const allowedEmail = process.env.NEXT_PUBLIC_ALLOWED_EMAIL
    if (email !== allowedEmail) {
      setError('Access denied.')
      return
    }

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (authError) {
      setError(authError.message)
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <p className="text-[--color-accent] font-bold mb-2">Check your email.</p>
          <p className="text-sm text-[--color-muted]">
            Magic link sent to {email}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <h1 className="text-xl font-bold text-[--color-foreground] mb-6">Admin Access</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="your@email.com"
          className="w-full rounded-md border border-[--color-border] bg-[--color-surface] px-4 py-3 text-sm text-[--color-foreground] placeholder:text-[--color-muted] focus:border-[--color-accent] focus:outline-none"
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
        <button
          type="submit"
          className="w-full rounded-md bg-[--color-accent] py-3 text-sm font-semibold text-[--color-background] hover:bg-[--color-accent-dark] transition-colors"
        >
          Send Magic Link
        </button>
      </form>
    </div>
  )
}
