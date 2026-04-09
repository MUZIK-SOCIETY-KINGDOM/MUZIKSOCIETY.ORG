import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import type { Inquiry } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function AdminInquiriesPage() {
  const supabase = await createClient()
  const { data: inquiries } = await supabase
    .from('ms_inquiries')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-xl font-bold text-[--color-foreground] mb-8">Inquiries</h1>
      {(inquiries as Inquiry[] ?? []).length === 0 ? (
        <p className="text-sm text-[--color-muted]">No inquiries yet.</p>
      ) : (
        <div className="space-y-4">
          {(inquiries as Inquiry[]).map((inq) => (
            <div key={inq.id} className="rounded-lg border border-[--color-border] bg-[--color-surface] p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-sm text-[--color-foreground]">{inq.name}</p>
                  <p className="text-xs text-[--color-muted]">{inq.email}</p>
                </div>
                <div className="text-right">
                  <span className="rounded border border-[--color-border] px-2 py-0.5 text-xs text-[--color-muted] capitalize">
                    {inq.subject ?? 'general'}
                  </span>
                  <p className="text-xs text-[--color-muted] mt-1">{formatDate(inq.created_at)}</p>
                </div>
              </div>
              <p className="text-sm text-[--color-muted] leading-relaxed">{inq.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
