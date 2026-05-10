import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

// Read env vars from .env.local
const env = Object.fromEntries(
  readFileSync('.env.local', 'utf8')
    .split('\n')
    .filter(l => l.includes('='))
    .map(l => l.split('=').map(s => s.trim()))
)

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY)

const { data, error } = await supabase.from('ms_sample_packs').insert({
  title: 'CHOPMONSTA Vol. 1',
  description: 'Raw Drum Dump — chews up songs and spits drums. A free collection of raw, hard-hitting drum samples built for producers who want unprocessed heat. Grab it free on SampleMonsta.',
  cover_url: '/chopmonsta-vol1.png',
  preview_url: null,
  external_url: 'https://www.samplemonsta.com/free/chopmonsta-vol1',
  published: true,
}).select().single()

if (error) {
  console.error('Error:', error)
  process.exit(1)
}
console.log('Inserted:', data.id, data.title)
