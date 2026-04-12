import { createClient } from '@/lib/supabase/server'
import { getTools, getInstrumentals, getSamplePacks } from '@/lib/queries'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  const direct = await supabase.from('ms_tools').select('id,name').eq('published', true)
  const [tools, instrumentals, packs] = await Promise.all([getTools(), getInstrumentals(), getSamplePacks()])
  return NextResponse.json({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    keyPrefix: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(0, 40),
    directData: direct.data,
    directError: direct.error,
    tools,
    instrumentals,
    packs,
  })
}
