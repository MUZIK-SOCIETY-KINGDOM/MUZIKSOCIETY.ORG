import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { LANG_COOKIE, langFromAcceptLanguage } from '@/lib/lang'

export async function middleware(request: NextRequest) {
  // First visit: pick the language from the browser, so this render already uses it.
  const newLang = request.cookies.has(LANG_COOKIE)
    ? null
    : langFromAcceptLanguage(request.headers.get('accept-language'))
  if (newLang) request.cookies.set(LANG_COOKIE, newLang)

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session — keeps auth tokens alive
  await supabase.auth.getUser()

  if (newLang) {
    supabaseResponse.cookies.set(LANG_COOKIE, newLang, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    })
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
