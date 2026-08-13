'use client'

import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { GlassCard, CustomTooltip } from './glass-card'
import { CaseStatusItem } from '../types'

export function CaseStatusChart({
  data,
  activeCases,
}: {
  data: CaseStatusItem[]
  activeCases: number
}) {
  return (
    <GlassCard className="lg:col-span-7">
      <CardHeader>
        <CardTitle className="text-base font-bold">Status Kes</CardTitle>
        <CardDescription className="text-xs">
          Ringkasan Kes (Jumlah: {activeCases})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
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
  )
}
