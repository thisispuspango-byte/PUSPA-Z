'use client'

import { useState } from 'react'
import { AlertTriangle, X } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export function SlaAlertStrip({
  overdueCases = 0,
  pendingDisbursements = 0,
}: {
  overdueCases?: number
  pendingDisbursements?: number
}) {
  const [dismissed, setDismissed] = useState(false)
  const { setView } = useAppStore()

  if (dismissed || (overdueCases === 0 && pendingDisbursements === 0)) {
    return null
  }

  return (
    <div className="flex items-center justify-between rounded-xl bg-amber-500/10 px-4 py-3 ring-1 ring-amber-500/30 text-amber-950 dark:text-amber-200 transition-all shadow-sm">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
          <AlertTriangle className="h-4 w-4" />
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold min-w-0">
          <span className="font-bold uppercase tracking-wider text-[10px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-700 dark:text-amber-300">
            AMARAN SLA
          </span>
          {overdueCases > 0 && (
            <button
              onClick={() => setView('cases')}
              className="hover:underline text-amber-700 dark:text-amber-300 text-left font-bold"
            >
              {overdueCases} kes melepasi SLA 14 hari
            </button>
          )}
          {overdueCases > 0 && pendingDisbursements > 0 && <span>•</span>}
          {pendingDisbursements > 0 && (
            <button
              onClick={() => setView('disbursements')}
              className="hover:underline text-amber-700 dark:text-amber-300 text-left font-bold"
            >
              {pendingDisbursements} agihan disahkan belum dibayar
            </button>
          )}
        </div>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="ml-3 rounded-lg p-1 text-amber-600/70 hover:bg-amber-500/20 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-200"
        aria-label="Dismiss alert"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
