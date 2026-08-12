'use client'

import { type ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { SkeletonLoader } from '@/components/ui/skeleton-loader'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  FileText,
  HandCoins,
  ShieldCheck,
  Users,
  Package,
  Bot,
  PlusCircle,
  TrendingUp,
  Sparkles,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store'

// ─── Types ────────────────────────────────────────────────────────────────

type TrendItem = { name: string; sumbangan: number; agihan: number }
type AsnafItem = { name: string; value: number; color: string }
type CaseStatusItem = { name: string; total: number }

type DashboardStats = {
  totalMembers: number
  activeCases: number
  sumbangan?: number
  compliance?: number
}

type DashboardData = {
  trend: TrendItem[]
  asnaf: AsnafItem[]
  caseStatus: CaseStatusItem[]
  stats: DashboardStats
}

type CustomTooltipProps = {
  active?: boolean
  payload?: Array<{ name?: string; value?: number; color?: string }>
  label?: string
}

type KpiCardProps = {
  title: string
  value: string
  sub: string
  icon: LucideIcon
  trend: number
  badgeText?: string
}

// ─── Demo fallback data (used when API is unavailable) ────────────────────

const DEFAULT_TREND: TrendItem[] = [
  { name: 'Jan', sumbangan: 51500, agihan: 40200 },
  { name: 'Feb', sumbangan: 48200, agihan: 37800 },
  { name: 'Mac', sumbangan: 53400, agihan: 41900 },
  { name: 'Apr', sumbangan: 49800, agihan: 37100 },
  { name: 'Mei', sumbangan: 57600, agihan: 45300 },
  { name: 'Jun', sumbangan: 64100, agihan: 49800 },
]

const DEFAULT_ASNAF: AsnafItem[] = [
  { name: 'Fakir', value: 320, color: '#a78bfa' },
  { name: 'Miskin', value: 240, color: '#8b5cf6' },
  { name: 'Riqab', value: 180, color: '#f97316' },
  { name: 'Gharimin', value: 140, color: '#10b981' },
  { name: 'Fisabilillah', value: 110, color: '#eab308' },
  { name: 'Ibnu Sabil', value: 90, color: '#ef4444' },
  { name: 'Muallaf', value: 60, color: '#c084fc' },
  { name: 'Amil', value: 25, color: '#94a3b8' },
]

const DEFAULT_CASES: CaseStatusItem[] = [
  { name: 'Aktif', total: 96 },
  { name: 'Dalam Proses', total: 42 },
  { name: 'Selesai', total: 31 },
  { name: 'Ditunda', total: 5 },
]

const DEFAULT_STATS: DashboardStats = { totalMembers: 1355, activeCases: 174 }

// ─── Shared glass card style for the Liquid Glass treatment ───────────────

const glassCard =
  'relative overflow-hidden border-none bg-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)] ring-1 ring-white/40 backdrop-blur-xl dark:bg-white/[0.06] dark:ring-white/10'

function GlassCard({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <Card className={`${glassCard} ${className}`}>
      {/* Top glass highlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/20"
      />
      {children}
    </Card>
  )
}

// ─── Chart tooltip ────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-white/20 bg-background/80 p-3 shadow-xl backdrop-blur-md dark:border-white/10">
        <p className="mb-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 py-0.5">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium">{entry.name}:</span>
            <span className="text-sm font-bold">RM {entry.value?.toLocaleString()}</span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

// ─── KPI Card ─────────────────────────────────────────────────────────────

const KpiCard = ({ title, value, sub, icon: Icon, trend }: KpiCardProps) => (
  <GlassCard>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-primary/10">
          <Icon size={24} />
        </div>
        <Badge
          variant={trend > 0 ? 'default' : 'destructive'}
          className="h-fit gap-1 bg-opacity-20 text-[10px] font-bold"
        >
          {trend > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(trend)}%
        </Badge>
      </div>
      <p className="mt-4 text-sm font-medium text-muted-foreground">{title}</p>
      <p className="mt-1 text-2xl font-black tracking-tight text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
    </CardContent>
  </GlassCard>
)

// ─── Dashboard ────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { setView, setAiChatOpen } = useAppStore()

  const { data: dashboardData, isLoading, error } = useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const res = await fetch('/api/v1/dashboard')
      if (!res.ok) throw new Error('Failed to fetch dashboard')
      return res.json()
    }
  })

  if (error) {
    toast.error('Gagal memuat turun data Dashboard', {
      description: error.message
    })
  }

  if (isLoading) {
    return <SkeletonLoader />
  }

  // Merge fetched data with demo fallbacks so charts never render empty
  const trendData = dashboardData?.trend?.length ? dashboardData.trend : DEFAULT_TREND
  const asnafData = dashboardData?.asnaf?.length ? dashboardData.asnaf : DEFAULT_ASNAF
  const caseData = dashboardData?.caseStatus?.length
    ? dashboardData.caseStatus
    : DEFAULT_CASES
  const stats: DashboardStats = dashboardData?.stats || DEFAULT_STATS

  const sumbangan = stats.sumbangan ?? 101000
  const compliance = stats.compliance ?? 96.8
  const totalAsnaf = stats.totalMembers || asnafData.reduce((s, i) => s + i.value, 0)

  return (
    <div className="space-y-6 pb-8">
      {/* ─── Executive Welcome Header & Quick Action Launchers ─── */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-2xl bg-gradient-to-r from-purple-950/80 via-purple-900/40 to-indigo-950/60 p-6 ring-1 ring-purple-500/30 shadow-xl backdrop-blur-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black tracking-tight text-white">
              Papan Pemuka PUSPA V5
            </h1>
            <Badge className="bg-purple-500/20 text-purple-200 ring-1 ring-purple-400/30 text-[11px] font-bold">
              LIVE OS
            </Badge>
          </div>
          <p className="text-xs text-purple-200/80 font-medium">
            Sistem Pentadbiran Terpusat Pertubuhan Urus Peduli Asnaf (PPM-024-10-05012022)
          </p>
        </div>

        {/* 1-Click Quick Action Launchers */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Button
            onClick={() => setView('permohonan-bantuan')}
            size="sm"
            className="bg-purple-600 hover:bg-purple-500 text-white font-bold gap-1.5 shadow-md rounded-xl text-xs"
          >
            <PlusCircle className="h-4 w-4" /> Borang Bantuan
          </Button>
          <Button
            onClick={() => setView('donations')}
            size="sm"
            variant="outline"
            className="border-purple-500/40 text-purple-100 hover:bg-purple-900/50 gap-1.5 rounded-xl text-xs"
          >
            <HandCoins className="h-4 w-4 text-emerald-400" /> Rekod Derma
          </Button>
          <Button
            onClick={() => setView('puspa-niaga')}
            size="sm"
            variant="outline"
            className="border-purple-500/40 text-purple-100 hover:bg-purple-900/50 gap-1.5 rounded-xl text-xs"
          >
            <Package className="h-4 w-4 text-amber-400" /> PUSPA Niaga
          </Button>
          <Button
            onClick={() => setAiChatOpen(true)}
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold gap-1.5 shadow-md rounded-xl text-xs"
          >
            <Bot className="h-4 w-4 text-purple-200" /> Maria AI
          </Button>
        </div>
      </div>

      {/* ─── 4-Column Bento KPI Cards ─── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          title="Ahli Asnaf Berdaftar"
          value={stats.totalMembers.toLocaleString()}
          sub="Profil Asnaf Sah & Terverifikasi"
          icon={Users}
          trend={12.5}
        />
        <KpiCard
          title="Pengurusan Kes Aktif"
          value={stats.activeCases.toString()}
          sub="Permohonan Memerlukan Tindakan"
          icon={ClipboardList}
          trend={4.5}
        />
        <KpiCard
          title="Sumbangan Terkumpul"
          value={`RM ${sumbangan.toLocaleString()}`}
          sub="Zakat, Infaq & Sedekah Jumaat"
          icon={HandCoins}
          trend={14.25}
        />
        <KpiCard
          title="Audit & Pematuhan Syariah"
          value={`${compliance}%`}
          sub="ROSM & LHDN Audited Clean"
          icon={ShieldCheck}
          trend={2.1}
        />
      </div>

      {/* ─── Trend + Asnaf Row ─── */}
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Trend (Sumbangan vs Agihan) */}
        <GlassCard className="lg:col-span-8">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base font-bold">Aliran Kewangan</CardTitle>
              <CardDescription className="text-xs">
                Sumbangan vs Agihan (6 Bulan)
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-background/60 text-[10px]">
              <Activity size={10} className="mr-1" /> Live
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sumbanganGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="agihanGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--chart-2)" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="var(--chart-2)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    vertical={false}
                    opacity={0.6}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v: number) => `RM ${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="sumbangan"
                    name="Sumbangan"
                    stroke="var(--chart-1)"
                    strokeWidth={2.5}
                    fill="url(#sumbanganGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="agihan"
                    name="Agihan"
                    stroke="var(--chart-2)"
                    strokeWidth={2.5}
                    fill="url(#agihanGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </GlassCard>

        {/* Asnaf Distribution */}
        <GlassCard className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-base font-bold">Agihan Mengikut Asnaf</CardTitle>
            <CardDescription className="text-xs">
              Pengagihan Zakat (8 Asnaf)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative mx-auto h-[200px] w-full max-w-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={asnafData}
                    cx="50%"
                    cy="50%"
                    innerRadius={62}
                    outerRadius={92}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                  >
                    {asnafData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Center stat — bound to live stats */}
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black tracking-tight">
                  {stats.totalMembers.toLocaleString()}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Penerima
                </span>
              </div>
            </div>

            {/* Legend — /stats.totalMembers no longer hardcoded */}
            <div className="mt-5 space-y-2">
              {asnafData.map((item) => {
                const pct = Math.round((item.value / totalAsnaf) * 100)
                return (
                  <div key={item.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-muted-foreground">{item.name}</span>
                    </div>
                    <span className="font-bold">{pct}%</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </GlassCard>
      </div>

      {/* ─── Case Status + Activity Row ─── */}
      <div className="grid gap-4 lg:grid-cols-12">
        {/* Case Status (neobrutalist bars) */}
        <GlassCard className="lg:col-span-7">
          <CardHeader>
            <CardTitle className="text-base font-bold">Status Kes</CardTitle>
            <CardDescription className="text-xs">
              Ringkasan Kes (Jumlah: {stats.activeCases})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={caseData}
                  margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                  barCategoryGap="28%"
                >
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" />
                      <stop
                        offset="100%"
                        stopColor="var(--color-puspa-dark, var(--primary))"
                        stopOpacity={0.85}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--border)"
                    vertical={false}
                    opacity={0.6}
                  />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'var(--muted-foreground)', opacity: 0.08 }}
                    content={<CustomTooltip />}
                  />
                  <Bar
                    dataKey="total"
                    name="Kes"
                    fill="url(#barGrad)"
                    radius={[8, 8, 2, 2]}
                    barSize={44}
                    className="transition-opacity hover:opacity-90"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </GlassCard>

        {/* Recent Activity */}
        <GlassCard className="lg:col-span-5">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-bold">Aktiviti Terkini</CardTitle>
            <span className="cursor-pointer text-xs font-semibold text-primary hover:underline">
              Lihat Semua Aktiviti
            </span>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {[
                {
                  icon: <HandCoins size={16} />,
                  text: 'Sumbangan baharu RM500 diterima',
                  time: 'Baru sahaja',
                },
                {
                  icon: <FileText size={16} />,
                  text: 'Kes bantuan dimulakan untuk Asnaf Fakir',
                  time: '10 minit lalu',
                },
                {
                  icon: <Users size={16} />,
                  text: 'Ahli baharu mendaftar: Ahmad Zaki',
                  time: '25 minit lalu',
                },
                {
                  icon: <Activity size={16} />,
                  text: 'Laporan bulanan dijana',
                  time: '1 jam lalu',
                },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {a.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{a.text}</p>
                    <p className="text-xs text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </GlassCard>
      </div>
    </div>
  )
}