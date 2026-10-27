'use client'

import { useState } from 'react'
import { submitInquiry } from '@/app/contact/actions'

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as {
      name: string
      email: string
      subject: string
      message: string
    }

    const result = await submitInquiry(data)
    if (result.success) {
      setStatus('success')
      form.reset()
    } else {
      setStatus('error')
      setErrorMsg(result.error ?? 'Algo salió mal. Intenta de nuevo o escríbeme por WhatsApp.')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-(--color-accent) bg-(--color-surface) p-8">
        <p className="font-bold text-(--color-accent) mb-2">Message sent.</p>
        <p className="text-sm text-(--color-muted)">I'll get back to you soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-xs font-semibold text-(--color-foreground) mb-2">
          Nombre
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-md border border-(--color-border) bg-(--color-surface) px-4 py-3 text-sm text-(--color-foreground) placeholder:text-(--color-muted) focus:border-(--color-accent) focus:outline-none transition-colors"
          placeholder="Tu nombre"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-semibold text-(--color-foreground) mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-(--color-border) bg-(--color-surface) px-4 py-3 text-sm text-(--color-foreground) placeholder:text-(--color-muted) focus:border-(--color-accent) focus:outline-none transition-colors"
          placeholder="tu@correo.com"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs font-semibold text-(--color-foreground) mb-2">
          Asunto
        </label>
        <select
          id="subject"
          name="subject"
          className="w-full rounded-md border border-(--color-border) bg-(--color-surface) px-4 py-3 text-sm text-(--color-foreground) focus:border-(--color-accent) focus:outline-none transition-colors"
        >
          <option value="booking">Sesión</option>
          <option value="collab">Colaboración</option>
          <option value="general">Consulta general</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-(--color-foreground) mb-2">
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full rounded-md border border-(--color-border) bg-(--color-surface) px-4 py-3 text-sm text-(--color-foreground) placeholder:text-(--color-muted) focus:border-(--color-accent) focus:outline-none transition-colors resize-none"
          placeholder="Cuéntame de tu proyecto..."
        />
      </div>

      {status === 'error' && (
        <p className="text-xs text-red-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-md bg-(--color-accent) py-3 text-sm font-semibold tracking-wide text-(--color-background) hover:bg-(--color-accent-dark) disabled:opacity-50 transition-colors"
      >
        {status === 'loading' ? 'Enviando…' : 'Enviar mensaje'}
      </button>
    </form>
  )
}
