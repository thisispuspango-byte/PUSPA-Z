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
import { motion } from 'framer-motion'

export function KpiCard({ title, value, sub, icon: Icon, trend, sparklineData }: KpiCardProps) {
  const isPositive = trend >= 0
  return (
    <GlassCard className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-primary/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-inner"
          >
            <Icon size={24} className="drop-shadow-sm" />
          </motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Badge
              variant={isPositive ? 'default' : 'destructive'}
              className="h-fit gap-1 bg-opacity-20 text-[10px] font-bold shadow-sm"
            >
              {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {Math.abs(trend)}%
            </Badge>
          </motion.div>
        </div>
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-sm font-medium text-muted-foreground"
        >
          {title}
        </motion.p>
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-1 text-2xl font-black tracking-tight text-foreground"
        >
          {value}
        </motion.p>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-1 text-xs text-muted-foreground"
        >
          {sub}
        </motion.p>
        {sparklineData && sparklineData.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-3 h-8 w-full origin-bottom"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id={`spark-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="var(--primary)" strokeWidth={2}
                  fill={`url(#spark-${title})`} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
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
