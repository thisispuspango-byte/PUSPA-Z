'use client'

import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Activity } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { GlassCard, CustomTooltip } from './glass-card'
import { TrendItem } from '../types'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function FinancialTrend({ data, period, onPeriodChange }: { data: TrendItem[], period: string, onPeriodChange: (p: string) => void }) {
  return (
    <GlassCard className="lg:col-span-8">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-base font-bold">Aliran Kewangan</CardTitle>
          <CardDescription className="text-xs">
            Sumbangan vs Agihan
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select value={period} onValueChange={onPeriodChange}>
            <SelectTrigger id="period-select" className="w-[120px] h-8 text-xs bg-muted/50 border-none">
              <SelectValue placeholder="Pilih Tempoh" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">1 Bulan</SelectItem>
              <SelectItem value="3m">3 Bulan</SelectItem>
              <SelectItem value="6m">6 Bulan</SelectItem>
              <SelectItem value="1y">1 Tahun</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className="bg-background/60 text-[10px] hidden sm:inline-flex">
            <Activity size={10} className="mr-1" /> Live
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
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
  )
}
