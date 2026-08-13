'use client'

import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { GlassCard } from './glass-card'
import { FinancialHealthData } from '../types'

export function FinancialHealth({ data }: { data?: FinancialHealthData }) {
  if (!data) return null

  const { totalDonated = 0, totalDisbursed = 0, netBalance = 0, collectionRatio = 1.0, donationsByCategory = {} } = data

  const ratioPct = Math.min(Math.round(collectionRatio * 50), 100) // normalized percentage for progress bar

  let ratioBadgeColor = 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
  if (collectionRatio < 0.7) {
    ratioBadgeColor = 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
  } else if (collectionRatio <= 1.0) {
    ratioBadgeColor = 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
  }

  const zakat = donationsByCategory['zakat'] || 0
  const sadaqah = donationsByCategory['sadaqah'] || 0
  const waqf = donationsByCategory['waqf'] || 0
  const infaq = donationsByCategory['infaq'] || 0
  const general = donationsByCategory['general'] || 0

  const catTotal = (zakat + sadaqah + waqf + infaq + general) || 1

  return (
    <GlassCard className="lg:col-span-5">
      <CardHeader>
        <CardTitle className="text-base font-bold">Kesihatan Kewangan</CardTitle>
        <CardDescription className="text-xs">
          Nisbah kecukupan dana, baki bersih & pecahan sumber
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Indicator 1: Collection Ratio */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-muted-foreground">Nisbah Kutipan/Agihan</span>
            <Badge className={`${ratioBadgeColor} font-bold text-[10px]`}>
              {collectionRatio}x {collectionRatio >= 1.0 ? 'Sihat' : 'Tinggi Agihan'}
            </Badge>
          </div>
          <Progress value={ratioPct} className="h-2" />
        </div>

        {/* Indicator 2: Available Net Fund */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <div>
            <p className="text-[11px] font-semibold text-muted-foreground">Dana Bersih Tersedia</p>
            <p className="text-xl font-black text-foreground">
              RM {netBalance.toLocaleString('ms-MY')}
            </p>
          </div>
          <div className="text-right text-[10px] text-muted-foreground">
            <p>Dikutip: RM {totalDonated.toLocaleString('ms-MY')}</p>
            <p>Diagih: RM {totalDisbursed.toLocaleString('ms-MY')}</p>
          </div>
        </div>

        {/* Indicator 3: Category Breakdown Mini Bar */}
        <div className="space-y-2 pt-1">
          <p className="text-xs font-semibold text-muted-foreground">Pecahan Sumbangan Terkumpul</p>
          <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-secondary">
            <div
              style={{ width: `${(zakat / catTotal) * 100}%` }}
              className="bg-emerald-500 transition-all"
              title={`Zakat: RM ${zakat.toLocaleString()}`}
            />
            <div
              style={{ width: `${(sadaqah / catTotal) * 100}%` }}
              className="bg-teal-500 transition-all"
              title={`Sadaqah: RM ${sadaqah.toLocaleString()}`}
            />
            <div
              style={{ width: `${(waqf / catTotal) * 100}%` }}
              className="bg-amber-500 transition-all"
              title={`Waqf: RM ${waqf.toLocaleString()}`}
            />
            <div
              style={{ width: `${(infaq / catTotal) * 100}%` }}
              className="bg-purple-500 transition-all"
              title={`Infaq: RM ${infaq.toLocaleString()}`}
            />
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[11px] font-medium pt-1">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-muted-foreground">Zakat:</span>
              <span className="font-bold">RM {zakat.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-teal-500" />
              <span className="text-muted-foreground">Sadaqah:</span>
              <span className="font-bold">RM {sadaqah.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-muted-foreground">Waqf:</span>
              <span className="font-bold">RM {waqf.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-purple-500" />
              <span className="text-muted-foreground">Infaq:</span>
              <span className="font-bold">RM {infaq.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </GlassCard>
  )
}
