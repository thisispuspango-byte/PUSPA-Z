'use client'

import { useDashboardData } from './use-dashboard-data'
import { type ViewId } from '@/lib/store'

export type InsightType = 'alert' | 'warning' | 'info' | 'success'

export type MariaInsight = {
  id: string
  type: InsightType
  message: string
  action?: {
    label: string
    view: ViewId
  }
}

const SEVERITY_ORDER: Record<InsightType, number> = {
  alert: 1,
  warning: 2,
  info: 3,
  success: 4,
}

export function useMariaInsights() {
  const { stats, pendingActions } = useDashboardData()

  const insights: MariaInsight[] = []

  if (pendingActions?.overdueCases && pendingActions.overdueCases > 0) {
    insights.push({
      id: 'overdue-cases',
      type: 'warning',
      message: `${pendingActions.overdueCases} kes telah melebihi SLA tindakan 14 hari.`,
      action: { label: 'Tinjau Kes', view: 'cases' },
    })
  }

  if (stats.sumbanganTrend !== undefined) {
    if (stats.sumbanganTrend > 10) {
      insights.push({
        id: 'donation-surge',
        type: 'success',
        message: `Sumbangan kewangan melonjak +${stats.sumbanganTrend}% berbanding bulan lalu.`,
        action: { label: 'Lihat Derma', view: 'donations' },
      })
    } else if (stats.sumbanganTrend < -10) {
      insights.push({
        id: 'donation-drop',
        type: 'alert',
        message: `Sumbangan menurun ${stats.sumbanganTrend}% bulan ini. Disyorkan kempen Infaq baharu.`,
        action: { label: 'PUSPA Niaga', view: 'puspa-niaga' },
      })
    }
  }

  if (pendingActions?.pendingDisbursements && pendingActions.pendingDisbursements > 0) {
    insights.push({
      id: 'pending-disbursements',
      type: 'info',
      message: `${pendingActions.pendingDisbursements} agihan yang diluluskan sedia untuk proses pembayaran.`,
      action: { label: 'Proses Agihan', view: 'disbursements' },
    })
  }

  if (pendingActions?.newApplications && pendingActions.newApplications > 0) {
    insights.push({
      id: 'new-applications',
      type: 'info',
      message: `${pendingActions.newApplications} permohonan bantuan baharu sedang menunggu saringan.`,
      action: { label: 'Semak Permohonan', view: 'permohonan-bantuan' },
    })
  }

  if (pendingActions?.ekycPending && pendingActions.ekycPending > 0) {
    insights.push({
      id: 'ekyc-pending',
      type: 'warning',
      message: `${pendingActions.ekycPending} imbasan eKYC memerlukan Pengesahan Identiti Asnaf.`,
      action: { label: 'Sahkan eKYC', view: 'ekyc' },
    })
  }

  insights.sort((a, b) => SEVERITY_ORDER[a.type] - SEVERITY_ORDER[b.type])

  return {
    insights: insights.slice(0, 4),
  }
}
