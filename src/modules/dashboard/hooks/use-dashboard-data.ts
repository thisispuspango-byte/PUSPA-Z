'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { DashboardData, DashboardStats } from '../types'
import { DEFAULT_TREND, DEFAULT_ASNAF, DEFAULT_CASES, DEFAULT_STATS } from '../constants'

export function useDashboardData() {
  const [period, setPeriod] = useState('6m')

  const { data, isLoading, error } = useQuery<DashboardData>({
    queryKey: ['dashboard', period],
    queryFn: async () => {
      const res = await fetch(`/api/v1/dashboard?period=${period}`)
      if (!res.ok) throw new Error('Failed to fetch dashboard')
      const json = await res.json()
      return json.data || json
    },
  })

  const trendData = data?.trend?.length ? data.trend : DEFAULT_TREND
  const asnafData = data?.asnaf?.length ? data.asnaf : DEFAULT_ASNAF
  const caseData = data?.caseStatus?.length ? data.caseStatus : DEFAULT_CASES
  const stats: DashboardStats = data?.stats || DEFAULT_STATS
  const recentActivities = data?.activities || []
  const pendingActions = data?.pendingActions
  const casePipeline = data?.casePipeline
  const financialHealth = data?.financialHealth
  const programmes = data?.programmes || []
  const volunteers = data?.volunteers
  const donors = data?.donors

  const sumbangan = stats.sumbangan ?? 101000
  const compliance = stats.compliance ?? 96.8
  const totalAsnaf = stats.totalMembers || asnafData.reduce((s, i) => s + i.value, 0)

  return {
    trendData,
    asnafData,
    caseData,
    stats,
    recentActivities,
    pendingActions,
    casePipeline,
    financialHealth,
    programmes,
    volunteers,
    donors,
    sumbangan,
    compliance,
    totalAsnaf,
    period,
    setPeriod,
    isLoading,
    error,
  }
}
