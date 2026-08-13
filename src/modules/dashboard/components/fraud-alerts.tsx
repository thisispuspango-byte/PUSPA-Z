'use client'

import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ShieldAlert, X } from 'lucide-react'
import { useAppStore } from '@/lib/store'

type MemberBasic = {
  id: string
  icNumber?: string
  name: string
  ekycRiskLevel?: string
  phone?: string
}

export function FraudAlerts() {
  const [dismissed, setDismissed] = useState(false)
  const { setView } = useAppStore()

  useEffect(() => {
    const dismissedAt = localStorage.getItem('puspa_fraud_alert_dismissed')
    if (dismissedAt) {
      const elapsed = Date.now() - parseInt(dismissedAt, 10)
      if (elapsed < 24 * 60 * 60 * 1000) {
        setDismissed(true)
      }
    }
  }, [])

  const { data: members } = useQuery<MemberBasic[]>({
    queryKey: ['fraud-alerts-members'],
    queryFn: async () => {
      const res = await fetch('/api/v1/members?limit=500')
      if (!res.ok) return []
      const json = await res.json()
      return json.data || json.members || []
    },
    staleTime: 600000,
  })

  if (dismissed || !members || members.length === 0) return null

  // 1. Detect duplicate ICs
  const icCounts: Record<string, number> = {}
  for (const m of members) {
    if (m.icNumber) {
      icCounts[m.icNumber] = (icCounts[m.icNumber] || 0) + 1
    }
  }
  const duplicateIcCount = Object.values(icCounts).filter((c) => c > 1).length

  // 2. High risk eKYC
  const highRiskEkycCount = members.filter((m) => m.ekycRiskLevel === 'high').length

  if (duplicateIcCount === 0 && highRiskEkycCount === 0) return null

  const handleDismiss = () => {
    setDismissed(true)
    localStorage.setItem('puspa_fraud_alert_dismissed', Date.now().toString())
  }

  return (
    <div className="flex items-center justify-between rounded-xl bg-red-500/10 px-4 py-3 ring-1 ring-red-500/30 text-red-950 dark:text-red-200 transition-all shadow-sm">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-500/20 text-red-600 dark:text-red-400">
          <ShieldAlert className="h-4 w-4" />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold min-w-0">
          <span className="font-bold uppercase tracking-wider text-[10px] bg-red-500/20 px-2 py-0.5 rounded text-red-700 dark:text-red-300">
            AMARAN INTEGRITI DATA
          </span>
          {duplicateIcCount > 0 && (
            <button
              onClick={() => setView('members')}
              className="hover:underline text-red-700 dark:text-red-300 text-left font-bold"
            >
              {duplicateIcCount} No. Kad Pengenalan dikesan bertindih
            </button>
          )}
          {duplicateIcCount > 0 && highRiskEkycCount > 0 && <span>•</span>}
          {highRiskEkycCount > 0 && (
            <button
              onClick={() => setView('ekyc')}
              className="hover:underline text-red-700 dark:text-red-300 text-left font-bold"
            >
              {highRiskEkycCount} profil eKYC ditanda Risiko Tinggi
            </button>
          )}
        </div>
      </div>
      <button
        onClick={handleDismiss}
        className="ml-3 rounded-lg p-1 text-red-600/70 hover:bg-red-500/20 hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
        aria-label="Dismiss fraud alert"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
