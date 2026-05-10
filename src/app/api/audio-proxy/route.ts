import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id')

  if (!id || !/^[A-Za-z0-9_-]+$/.test(id)) {
    return new NextResponse('Bad request', { status: 400 })
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
