import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// In-memory rate limiter — resets on cold starts but provides per-instance protection.
// For shared limits across all Vercel instances, swap for Upstash Redis.
const ipWindow = new Map<string, { count: number; reset: number }>()
const LIMIT = 30
const WINDOW_MS = 60_000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = ipWindow.get(ip)
  if (!entry || now > entry.reset) {
    ipWindow.set(ip, { count: 1, reset: now + WINDOW_MS })
    return false
  }
  if (entry.count >= LIMIT) return true
  entry.count++
  return false
}

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')

  if (!id || !/^[A-Za-z0-9_-]+$/.test(id)) {
    return new NextResponse('Bad request', { status: 400 })
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    '0.0.0.0'

  if (isRateLimited(ip)) {
    return new NextResponse('Too many requests', { status: 429 })
  }

  const rangeHeader = req.headers.get('range')
  const upstream = await fetch(
    `https://drive.usercontent.google.com/download?id=${id}&export=view`,
    { headers: rangeHeader ? { range: rangeHeader } : {} }
  )

  if (!upstream.ok && upstream.status !== 206) {
    return new NextResponse('Upstream error', { status: upstream.status })
  }

  const headers = new Headers()
  for (const h of ['content-type', 'content-length', 'content-range', 'accept-ranges']) {
    const v = upstream.headers.get(h)
    if (v) headers.set(h, v)
  }
  headers.set('cross-origin-resource-policy', 'cross-origin')
  headers.set('access-control-allow-origin', '*')
  headers.set('cache-control', 'public, max-age=3600')

  return new NextResponse(upstream.body, { status: upstream.status, headers })
}
