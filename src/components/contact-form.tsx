'use client'

import { useState } from 'react'
import { submitInquiry } from '@/app/contact/actions'
import { useLang } from '@/contexts/lang-context'

const T = {
  es: {
    fail: 'Algo salió mal. Intenta de nuevo o escríbeme por WhatsApp.',
    sent: 'Mensaje enviado.', soon: 'Te respondo pronto.',
    name: 'Nombre', namePh: 'Tu nombre', emailPh: 'tu@correo.com',
    subject: 'Asunto', booking: 'Sesión', collab: 'Colaboración', general: 'Consulta general',
    message: 'Mensaje', messagePh: 'Cuéntame de tu proyecto...',
    sending: 'Enviando…', send: 'Enviar mensaje',
  },
  en: {
    fail: 'Something went wrong. Try again or message me on WhatsApp.',
    sent: 'Message sent.', soon: 'I’ll get back to you soon.',
    name: 'Name', namePh: 'Your name', emailPh: 'you@email.com',
    subject: 'Subject', booking: 'Session', collab: 'Collaboration', general: 'General inquiry',
    message: 'Message', messagePh: 'Tell me about your project...',
    sending: 'Sending…', send: 'Send message',
  },
}

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const t = T[useLang()]

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
      setErrorMsg(result.error ?? t.fail)
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg border border-(--color-accent) bg-(--color-surface) p-8">
        <p className="font-bold text-(--color-accent) mb-2">{t.sent}</p>
        <p className="text-sm text-(--color-muted)">{t.soon}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-xs font-semibold text-(--color-foreground) mb-2">
          {t.name}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full rounded-md border border-(--color-border) bg-(--color-surface) px-4 py-3 text-sm text-(--color-foreground) placeholder:text-(--color-muted) focus:border-(--color-accent) focus:outline-none transition-colors"
          placeholder={t.namePh}
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
          placeholder={t.emailPh}
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs font-semibold text-(--color-foreground) mb-2">
          {t.subject}
        </label>
        <select
          id="subject"
          name="subject"
          className="w-full rounded-md border border-(--color-border) bg-(--color-surface) px-4 py-3 text-sm text-(--color-foreground) focus:border-(--color-accent) focus:outline-none transition-colors"
        >
          <option value="booking">{t.booking}</option>
          <option value="collab">{t.collab}</option>
          <option value="general">{t.general}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-(--color-foreground) mb-2">
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full rounded-md border border-(--color-border) bg-(--color-surface) px-4 py-3 text-sm text-(--color-foreground) placeholder:text-(--color-muted) focus:border-(--color-accent) focus:outline-none transition-colors resize-none"
          placeholder={t.messagePh}
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
        {status === 'loading' ? t.sending : t.send}
      </button>
    </form>
  )
}
