'use client'

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Repeat } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { GlassCard } from './glass-card'
import { DonorsData } from '../types'

export function DonorWidget({ data }: { data?: DonorsData }) {
  const { setView } = useAppStore()

  if (!data) return null

  const { totalActive = 0, newThisMonth = 0, retentionRate = 0, topDonors = [] } = data

  return (
    <GlassCard className="lg:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/15 text-purple-500">
            <Heart size={16} />
          </div>
          <CardTitle className="text-base font-bold">Penderma CRM</CardTitle>
        </div>
        <button
          onClick={() => setView('donors')}
          className="text-xs font-semibold text-primary hover:underline"
        >
          Lihat CRM
        </button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Inline Stats */}
        <div className="grid grid-cols-3 gap-1.5 text-center p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <div>
            <p className="text-[9px] font-semibold uppercase text-muted-foreground">Aktif</p>
            <p className="text-base font-black text-foreground">{totalActive}</p>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase text-muted-foreground">Baru</p>
            <p className="text-base font-black text-foreground">{newThisMonth}</p>
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase text-muted-foreground flex items-center justify-center gap-0.5">
              <Repeat size={10} /> Retensi
            </p>
            <p className="text-base font-black text-purple-600 dark:text-purple-400">{retentionRate}%</p>
          </div>
        </div>

        {/* Top Donors */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground">Penderma Utama</p>
          {topDonors.length > 0 ? (
            topDonors.map((d, i) => (
              <div key={d.id || i} className="flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-1.5 truncate max-w-[160px]">
                  <span className="truncate">{d.name}</span>
                  <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 uppercase">
                    {d.type === 'corporate' ? 'Korporat' : 'Individu'}
                  </Badge>
                </div>
                <span className="font-bold text-foreground">RM {d.total.toLocaleString()}</span>
              </div>
            ))
          ) : (
            <p className="text-xs text-muted-foreground italic">Tiada rekod penderma</p>
          )}
        </div>
      </CardContent>
    </GlassCard>
  )
}
