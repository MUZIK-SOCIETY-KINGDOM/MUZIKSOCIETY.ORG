import 'server-only'
import { createHmac, timingSafeEqual } from 'crypto'

const SECRET = process.env.AUDIO_PROXY_SECRET ?? 'dev-secret-change-me'
const TTL = 15 * 60 // 15 minutes

export function signAudioToken(fileId: string): string {
  const exp = Math.floor(Date.now() / 1000) + TTL
  const payload = `${fileId}:${exp}`
  const sig = createHmac('sha256', SECRET).update(payload).digest('base64url')
  return Buffer.from(payload).toString('base64url') + '.' + sig
}

export function verifyAudioToken(token: string): string | null {
  const dotIdx = token.lastIndexOf('.')
  if (dotIdx === -1) return null
  const payloadB64 = token.slice(0, dotIdx)
  const sig = token.slice(dotIdx + 1)

  let payload: string
  try {
    payload = Buffer.from(payloadB64, 'base64url').toString()
  } catch {
    return null
  }

  const expected = createHmac('sha256', SECRET).update(payload).digest('base64url')

  try {
    const a = Buffer.from(sig, 'utf8')
    const b = Buffer.from(expected, 'utf8')
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null
  } catch {
    return null
  }

  const colonIdx = payload.lastIndexOf(':')
  if (colonIdx === -1) return null
  const fileId = payload.slice(0, colonIdx)
  const exp = parseInt(payload.slice(colonIdx + 1), 10)
  if (isNaN(exp) || Math.floor(Date.now() / 1000) > exp) return null

  return fileId
}

export function getSignedAudioProxyUrl(url: string | null | undefined): string | null {
  if (!url) return null
  const match = url.match(/[?&]id=([A-Za-z0-9_-]+)/)
  if (match && (url.includes('drive.google.com') || url.includes('drive.usercontent.google.com'))) {
    return `/api/audio-proxy?t=${signAudioToken(match[1])}`
  }
  return url
}
