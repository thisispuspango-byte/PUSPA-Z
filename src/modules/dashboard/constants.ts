import { TrendItem, AsnafItem, CaseStatusItem, DashboardStats } from './types'

export const DEFAULT_TREND: TrendItem[] = [
  { name: 'Jan', sumbangan: 51500, agihan: 40200 },
  { name: 'Feb', sumbangan: 48200, agihan: 37800 },
  { name: 'Mac', sumbangan: 53400, agihan: 41900 },
  { name: 'Apr', sumbangan: 49800, agihan: 37100 },
  { name: 'Mei', sumbangan: 57600, agihan: 45300 },
  { name: 'Jun', sumbangan: 64100, agihan: 49800 },
]

export const DEFAULT_ASNAF: AsnafItem[] = [
  { name: 'Fakir', value: 320, color: '#a78bfa' },
  { name: 'Miskin', value: 240, color: '#8b5cf6' },
  { name: 'Riqab', value: 180, color: '#f97316' },
  { name: 'Gharimin', value: 140, color: '#10b981' },
  { name: 'Fisabilillah', value: 110, color: '#eab308' },
  { name: 'Ibnu Sabil', value: 90, color: '#ef4444' },
  { name: 'Muallaf', value: 60, color: '#c084fc' },
  { name: 'Amil', value: 25, color: '#94a3b8' },
]

export const DEFAULT_CASES: CaseStatusItem[] = [
  { name: 'Aktif', total: 96 },
  { name: 'Dalam Proses', total: 42 },
  { name: 'Selesai', total: 31 },
  { name: 'Ditunda', total: 5 },
]

export const DEFAULT_STATS: DashboardStats = {
  totalMembers: 1355,
  activeCases: 174,
  membersTrend: 12.5,
  casesTrend: 4.5,
  sumbanganTrend: 14.25,
  complianceTrend: 2.1,
}
