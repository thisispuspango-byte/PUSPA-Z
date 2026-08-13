'use client'

import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { GlassCard } from './glass-card'

type PipelineStageConfig = {
  key: string
  label: string
  color: string
  bg: string
  border: string
}

const MAIN_STAGES: PipelineStageConfig[] = [
  { key: 'draft', label: 'Draf', color: 'text-slate-400', bg: 'bg-slate-400/10', border: 'border-slate-400/30' },
  { key: 'intake', label: 'Intake', color: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30' },
  { key: 'verification', label: 'Semakan', color: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/30' },
  { key: 'assessment', label: 'Penilaian', color: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30' },
  { key: 'approval', label: 'Kelulusan', color: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30' },
  { key: 'disbursement', label: 'Agihan', color: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/30' },
]

export function CasePipeline({ data }: { data?: Record<string, number> }) {
  const { setView } = useAppStore()

  const followUpCount = data?.['follow_up'] ?? 0
  const closedCount = data?.['closed'] ?? 0
  const rejectedCount = data?.['rejected'] ?? 0

  return (
    <GlassCard className="lg:col-span-7">
      <CardHeader>
        <CardTitle className="text-base font-bold">Pipeline Pengurusan Kes (9 Peringkat)</CardTitle>
        <CardDescription className="text-xs">
          Visualisasi aliran status permohonan dari Draf ke Agihan & Penutupan
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Main 6 Connected Pipeline Steps */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-between">
          {MAIN_STAGES.map((stage, idx) => {
            const count = data?.[stage.key] ?? 0
            return (
              <div key={stage.key} className="flex items-center gap-1.5 flex-1 min-w-0">
                <button
                  onClick={() => setView('cases')}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border w-full transition-all hover:scale-105 ${stage.bg} ${stage.border}`}
                  title={`${stage.label}: ${count} kes`}
                >
                  <span className={`text-lg font-black ${stage.color}`}>{count}</span>
                  <span className="text-[10px] font-semibold text-muted-foreground truncate w-full text-center">
                    {stage.label}
                  </span>
                </button>
                {idx < MAIN_STAGES.length - 1 && (
                  <ChevronRight className="hidden sm:block h-4 w-4 shrink-0 text-muted-foreground/40" />
                )}
              </div>
            )
          })}
        </div>

        {/* Summary Row below main pipeline */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/40 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-indigo-500" />
            <span className="text-muted-foreground">Susulan Berperingkat:</span>
            <span className="font-bold text-foreground">{followUpCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-muted-foreground">Selesai/Ditutup:</span>
            <span className="font-bold text-foreground">{closedCount}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            <span className="text-muted-foreground">Ditolak:</span>
            <span className="font-bold text-foreground">{rejectedCount}</span>
          </div>
        </div>
      </CardContent>
    </GlassCard>
  )
}
