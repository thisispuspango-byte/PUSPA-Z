'use client'

import { GlassCard } from './glass-card'
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Target } from 'lucide-react'

type GoalTrackerProps = {
  totalDonated: number
  totalMembers: number
}

// TODO: Move targets to DB/settings when settings module supports it
const ANNUAL_TARGETS = {
  donations: 500000,     // RM 500,000
  recipients: 2000,      // 2,000 penerima
  programmes: 12,        // 12 program
}

export function GoalTracker({ totalDonated, totalMembers }: GoalTrackerProps) {
  const goals = [
    {
      label: 'Sasaran Kutipan Tahunan',
      actual: totalDonated,
      target: ANNUAL_TARGETS.donations,
      format: (v: number) => `RM ${v.toLocaleString('ms-MY')}`,
    },
    {
      label: 'Penerima Disasarkan',
      actual: totalMembers,
      target: ANNUAL_TARGETS.recipients,
      format: (v: number) => v.toLocaleString('ms-MY'),
    },
  ]

  return (
    <GlassCard className="lg:col-span-4">
      <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-3">
        <Target className="h-4 w-4 text-primary" />
        <CardTitle className="text-base font-bold">Sasaran Tahunan 2026</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal) => {
          const pct = Math.min(100, Math.round((goal.actual / goal.target) * 100))
          return (
            <div key={goal.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-muted-foreground">{goal.label}</span>
                <span className="font-bold">{pct}%</span>
              </div>
              <Progress value={pct} className="h-2" />
              <p className="text-[10px] text-muted-foreground mt-1">
                {goal.format(goal.actual)} / {goal.format(goal.target)}
              </p>
            </div>
          )
        })}
      </CardContent>
    </GlassCard>
  )
}
