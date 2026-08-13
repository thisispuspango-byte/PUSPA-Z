'use client'

import { CardContent, CardHeader, CardTitle, Badge, Button } from '@/components/ui'
import { GlassCard } from './glass-card'
import { Utensils, CheckCircle2, Clock, RefreshCw } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export interface SedekahDistributionItem {
  id: string
  institutionName: string
  foodBoxCount: number
  status: 'delivered' | 'processing' | 'pending'
  amount: number
}

const DEFAULT_DISTRIBUTIONS: SedekahDistributionItem[] = [
  { id: '1', institutionName: 'Maahad Tahfiz Al-Hikmah', foodBoxCount: 150, status: 'delivered', amount: 2250 },
  { id: '2', institutionName: 'Rumah Kebajikan An-Nur', foodBoxCount: 80, status: 'processing', amount: 1200 },
  { id: '3', institutionName: 'Pusat Jagaan Kasih Asnaf', foodBoxCount: 120, status: 'pending', amount: 1800 },
]

export function SedekahTracker() {
  const { setView } = useAppStore()

  const totalFoodBoxes = DEFAULT_DISTRIBUTIONS.reduce((acc, item) => acc + item.foodBoxCount, 0)
  const totalSpent = DEFAULT_DISTRIBUTIONS.reduce((acc, item) => acc + item.amount, 0)

  return (
    <GlassCard className="lg:col-span-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-emerald-500/10 p-2 text-emerald-500 dark:bg-emerald-500/20">
            <Utensils size={18} />
          </div>
          <div>
            <CardTitle className="text-base font-bold">🕌 Sedekah Jumaat — Minggu Ini</CardTitle>
            <p className="text-xs text-muted-foreground">Pengagihan Makanan & Bantuan Institusi</p>
          </div>
        </div>
        <Button id="sedekah-tracker-Button-1"
          variant="ghost"
          size="sm"
          className="text-xs text-primary hover:underline"
          onClick={() => setView('sedekah-jumaat')}
        >
          Lihat Penuh →
        </Button>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        {/* KPI Summary */}
        <div className="grid grid-cols-3 gap-2 rounded-xl bg-muted/40 p-3 text-center">
          <div>
            <span className="text-[10px] text-muted-foreground">Institusi</span>
            <p className="text-sm font-bold">{DEFAULT_DISTRIBUTIONS.length} / 14</p>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground">Kotak Makanan</span>
            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{totalFoodBoxes}</p>
          </div>
          <div>
            <span className="text-[10px] text-muted-foreground">Jumlah Perbelanjaan</span>
            <p className="text-sm font-bold">RM {totalSpent.toLocaleString('ms-MY')}</p>
          </div>
        </div>

        {/* Distribution List */}
        <div className="space-y-2">
          {DEFAULT_DISTRIBUTIONS.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-border/40 bg-background/50 p-2.5 text-xs transition-colors hover:bg-accent/40"
            >
              <div className="space-y-0.5">
                <p className="font-semibold">{item.institutionName}</p>
                <p className="text-[10px] text-muted-foreground">
                  {item.foodBoxCount} Kotak Makanan • RM {item.amount}
                </p>
              </div>
              <Badge
                variant="outline"
                className={`text-[10px] capitalize ${
                  item.status === 'delivered'
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : item.status === 'processing'
                    ? 'border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400'
                    : 'border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                }`}
              >
                {item.status === 'delivered' && <CheckCircle2 size={12} className="mr-1 inline" />}
                {item.status === 'processing' && <RefreshCw size={12} className="mr-1 inline animate-spin" />}
                {item.status === 'pending' && <Clock size={12} className="mr-1 inline" />}
                {item.status === 'delivered' ? 'Dihantar' : item.status === 'processing' ? 'Proses' : 'Menunggu'}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </GlassCard>
  )
}
