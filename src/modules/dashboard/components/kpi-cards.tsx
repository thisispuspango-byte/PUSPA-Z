'use client'

import { CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  ArrowUpRight,
  ArrowDownRight,
  Users,
  ClipboardList,
  HandCoins,
  ShieldCheck,
} from 'lucide-react'
import { GlassCard } from './glass-card'
import { KpiCardProps, DashboardStats } from '../types'
import { AreaChart, Area, ResponsiveContainer } from 'recharts'
import { useMediaQuery } from '@reactuses/core'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

export function KpiCard({ title, value, sub, icon: Icon, trend, sparklineData }: KpiCardProps) {
  const isPositive = trend >= 0
  return (
    <GlassCard className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-primary/10">
            <Icon size={24} />
          </div>
          <Badge
            variant={isPositive ? 'default' : 'destructive'}
            className="h-fit gap-1 bg-opacity-20 text-[10px] font-bold"
          >
            {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(trend)}%
          </Badge>
        </div>
        <p className="mt-4 text-sm font-medium text-muted-foreground">{title}</p>
        <p className="mt-1 text-2xl font-black tracking-tight text-foreground">{value}</p>
        <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
        {sparklineData && sparklineData.length > 0 && (
          <div className="mt-3 h-8 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={`spark-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="var(--primary)" strokeWidth={1.5}
                  fill={`url(#spark-${title})`} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </GlassCard>
  )
}

export function KpiCardGrid({
  stats,
  sumbangan,
  compliance,
}: {
  stats: DashboardStats
  sumbangan: number
  compliance: number
}) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  // Create mock sparkline data (7 points)
  const getMockSparkline = () => Array.from({ length: 7 }, () => ({ v: Math.floor(Math.random() * 50) + 10 }))

  const kpiCards = [
    {
      title: "Ahli Asnaf Berdaftar",
      value: stats.totalMembers.toLocaleString(),
      sub: "Profil Asnaf Sah & Terverifikasi",
      icon: Users,
      trend: stats.membersTrend ?? 12.5,
      sparklineData: getMockSparkline()
    },
    {
      title: "Pengurusan Kes Aktif",
      value: stats.activeCases.toString(),
      sub: "Permohonan Memerlukan Tindakan",
      icon: ClipboardList,
      trend: stats.casesTrend ?? 4.5,
      sparklineData: getMockSparkline()
    },
    {
      title: "Sumbangan Terkumpul",
      value: `RM ${sumbangan.toLocaleString()}`,
      sub: "Zakat, Infaq & Sedekah Jumaat",
      icon: HandCoins,
      trend: stats.sumbanganTrend ?? 14.25,
      sparklineData: getMockSparkline()
    },
    {
      title: "Audit & Pematuhan Syariah",
      value: `${compliance}%`,
      sub: "ROSM & LHDN Audited Clean",
      icon: ShieldCheck,
      trend: stats.complianceTrend ?? 2.1,
      sparklineData: getMockSparkline()
    }
  ]

  if (isMobile) {
    return (
      <Carousel className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {kpiCards.map((card, i) => (
            <CarouselItem key={i} className="pl-2 md:pl-4 basis-[85%]">
              <KpiCard {...card} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpiCards.map((card, i) => <KpiCard key={i} {...card} />)}
    </div>
  )
}
