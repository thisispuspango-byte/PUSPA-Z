'use client'

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  AlertTriangle,
  FileText,
  Wallet,
  ScanFace,
  Shield,
  Zap,
} from 'lucide-react'
import { useAppStore, type ViewId } from '@/lib/store'
import { GlassCard } from './glass-card'
import { PendingActionsData } from '../types'

type ActionItemConfig = {
  key: keyof PendingActionsData
  icon: typeof AlertTriangle
  colorClass: string
  bgClass: string
  targetView: ViewId
  label: string
}

const ACTION_CONFIGS: ActionItemConfig[] = [
  {
    key: 'overdueCases',
    icon: AlertTriangle,
    colorClass: 'text-red-500 dark:text-red-400',
    bgClass: 'bg-red-500/10 border-red-500/20 hover:bg-red-500/20',
    targetView: 'cases',
    label: 'Kes Overdue (>14 hari)',
  },
  {
    key: 'newApplications',
    icon: FileText,
    colorClass: 'text-amber-500 dark:text-amber-400',
    bgClass: 'bg-amber-500/10 border-amber-500/20 hover:bg-amber-500/20',
    targetView: 'permohonan-bantuan',
    label: 'Permohonan Baru',
  },
  {
    key: 'pendingDisbursements',
    icon: Wallet,
    colorClass: 'text-blue-500 dark:text-blue-400',
    bgClass: 'bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20',
    targetView: 'disbursements',
    label: 'Agihan Tertunggak',
  },
  {
    key: 'ekycPending',
    icon: ScanFace,
    colorClass: 'text-purple-500 dark:text-purple-400',
    bgClass: 'bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20',
    targetView: 'ekyc',
    label: 'eKYC Menunggu',
  },
  {
    key: 'complianceOverdue',
    icon: Shield,
    colorClass: 'text-orange-500 dark:text-orange-400',
    bgClass: 'bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20',
    targetView: 'compliance',
    label: 'Pematuhan Tertunggak',
  },
]

export function PendingActions({ data }: { data?: PendingActionsData }) {
  const { setView } = useAppStore()

  if (!data) return null

  const itemsWithCounts = ACTION_CONFIGS.filter((cfg) => (data[cfg.key] ?? 0) > 0)
  const totalPending = itemsWithCounts.reduce((acc, cfg) => acc + (data[cfg.key] ?? 0), 0)

  if (totalPending === 0) return null

  return (
    <GlassCard>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/15 text-amber-500">
            <Zap size={18} />
          </div>
          <div>
            <CardTitle className="text-base font-bold">Menunggu Tindakan</CardTitle>
            <p className="text-xs text-muted-foreground">
              Tugasan kritikal yang memerlukan tindakan segera
            </p>
          </div>
        </div>
        <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-300 font-bold text-xs">
          {totalPending} Tindakan
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3">
          {itemsWithCounts.map((cfg) => {
            const Icon = cfg.icon
            const count = data[cfg.key]
            return (
              <button
                key={cfg.key}
                onClick={() => setView(cfg.targetView)}
                className={`flex flex-col items-start justify-between p-4 rounded-xl border transition-all text-left group ${cfg.bgClass}`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <Icon className={`h-5 w-5 ${cfg.colorClass}`} />
                  <span className="text-2xl font-black tracking-tight">{count}</span>
                </div>
                <span className="text-xs font-semibold text-foreground/90 group-hover:underline line-clamp-1">
                  {cfg.label}
                </span>
              </button>
            )
          })}
        </div>
      </CardContent>
    </GlassCard>
  )
}
