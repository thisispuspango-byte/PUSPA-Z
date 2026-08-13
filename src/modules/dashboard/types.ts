import { type ReactNode } from 'react'
import { type LucideIcon } from 'lucide-react'

export type TrendItem = { name: string; sumbangan: number; agihan: number }
export type AsnafItem = { name: string; value: number; color: string }
export type CaseStatusItem = { name: string; total: number }

export type ActivityItem = {
  id: string
  type: string
  category: string | null
  title: string
  description: string | null
  createdAt: string
}

export type PendingActionsData = {
  overdueCases: number
  newApplications: number
  pendingDisbursements: number
  ekycPending: number
  complianceOverdue: number
}

export type FinancialHealthData = {
  totalDonated: number
  totalDisbursed: number
  netBalance: number
  collectionRatio: number
  donationsByCategory: Record<string, number>
}

export type ProgrammeItem = {
  id: string
  name: string
  category: string
  status: string
  budget: number
  spent: number
  utilization: number
  beneficiaryCount: number
}

export type VolunteerContributor = {
  id: string
  name: string
  hours: number
}

export type VolunteersData = {
  totalActive: number
  hoursThisMonth: number
  topContributors: VolunteerContributor[]
}

export type DonorItem = {
  id: string
  name: string
  total: number
  type: string
}

export type DonorsData = {
  totalActive: number
  newThisMonth: number
  retentionRate: number
  topDonors: DonorItem[]
}

export type DashboardStats = {
  totalMembers: number
  activeCases: number
  sumbangan?: number
  compliance?: number
  membersTrend?: number
  casesTrend?: number
  sumbanganTrend?: number
  complianceTrend?: number
  agihanTrend?: number
}

export type DashboardData = {
  trend: TrendItem[]
  asnaf: AsnafItem[]
  caseStatus: CaseStatusItem[]
  stats: DashboardStats
  activities?: ActivityItem[]
  pendingActions?: PendingActionsData
  casePipeline?: Record<string, number>
  financialHealth?: FinancialHealthData
  programmes?: ProgrammeItem[]
  volunteers?: VolunteersData
  donors?: DonorsData
}

export type CustomTooltipProps = {
  active?: boolean
  payload?: Array<{ name?: string; value?: number; color?: string }>
  label?: string
}

export type KpiCardProps = {
  title: string
  value: string
  sub: string
  icon: LucideIcon
  trend: number
  badgeText?: string
  sparklineData?: Array<{ v: number }>
}
