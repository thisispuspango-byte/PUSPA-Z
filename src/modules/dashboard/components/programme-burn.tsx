'use client'

import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useAppStore } from '@/lib/store'
import { GlassCard } from './glass-card'
import { ProgrammeItem } from '../types'

export function ProgrammeBurn({ programmes = [] }: { programmes?: ProgrammeItem[] }) {
  const { setView } = useAppStore()

  if (!programmes || programmes.length === 0) return null

  const totalBudget = programmes.reduce((acc, p) => acc + (p.budget || 0), 0)
  const totalSpent = programmes.reduce((acc, p) => acc + (p.spent || 0), 0)

  return (
    <GlassCard className="lg:col-span-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-base font-bold">Penggunaan Bajet Program</CardTitle>
          <CardDescription className="text-xs">
            Kadar perbelanjaan (Burn Rate) mengikut program aktif
          </CardDescription>
        </div>
        <button
          onClick={() => setView('programmes')}
          className="text-xs font-semibold text-primary hover:underline"
        >
          Semua Program
        </button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {programmes.slice(0, 4).map((p) => {
            const utilization = p.utilization || 0
            let progressColor = 'bg-emerald-500'
            if (utilization > 85) progressColor = 'bg-rose-500'
            else if (utilization > 60) progressColor = 'bg-amber-500'

            return (
              <div key={p.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="truncate max-w-[200px] text-foreground">{p.name}</span>
                  <span className="text-muted-foreground">
                    {utilization}% — RM {p.spent.toLocaleString()} / RM {p.budget.toLocaleString()}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    style={{ width: `${Math.min(utilization, 100)}%` }}
                    className={`h-full transition-all ${progressColor}`}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/40 text-xs font-bold text-muted-foreground">
          <span>Jumlah Bajet Active: RM {totalBudget.toLocaleString()}</span>
          <span>Dibelanjakan: RM {totalSpent.toLocaleString()}</span>
        </div>
      </CardContent>
    </GlassCard>
  )
}
