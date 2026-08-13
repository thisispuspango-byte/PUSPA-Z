'use client'

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Clock, Award } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { GlassCard } from './glass-card'
import { VolunteersData } from '../types'

export function VolunteerWidget({ data }: { data?: VolunteersData }) {
  const { setView } = useAppStore()

  if (!data) return null

  const { totalActive = 0, hoursThisMonth = 0, topContributors = [] } = data

  return (
    <GlassCard className="lg:col-span-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500/15 text-teal-500">
            <Users size={16} />
          </div>
          <CardTitle className="text-base font-bold">Sukarelawan</CardTitle>
        </div>
        <button
          onClick={() => setView('volunteers')}
          className="text-xs font-semibold text-primary hover:underline"
        >
          Lihat Semua
        </button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Inline KPIs */}
        <div className="grid grid-cols-2 gap-2 text-center p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/20">
          <div>
            <p className="text-[10px] font-semibold uppercase text-muted-foreground">Aktif</p>
            <p className="text-lg font-black text-foreground">{totalActive}</p>
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase text-muted-foreground">Jam Bulan Ini</p>
            <p className="text-lg font-black text-foreground flex items-center justify-center gap-1">
              <Clock size={14} className="text-teal-500" /> {hoursThisMonth}j
            </p>
          </div>
        </div>

        {/* Top 3 contributors */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
            <Award size={12} className="text-amber-500" /> Pengembang Utama
          </p>
          {topContributors.length > 0 ? (
            topContributors.map((c, i) => (
              <div key={c.id || i} className="flex items-center justify-between text-xs font-medium">
                <span className="truncate text-foreground/90">{c.name}</span>
                <span className="font-bold text-teal-600 dark:text-teal-400">{c.hours} jam</span>
              </div>
            ))
          ) : (
            <p className="text-xs text-muted-foreground italic">Tiada rekod jam lagi</p>
          )}
        </div>
      </CardContent>
    </GlassCard>
  )
}
