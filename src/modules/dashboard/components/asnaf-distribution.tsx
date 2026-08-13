'use client'

import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { GlassCard } from './glass-card'
import { AsnafItem } from '../types'

export function AsnafDistribution({
  data,
  totalMembers,
  totalAsnaf,
}: {
  data: AsnafItem[]
  totalMembers: number
  totalAsnaf: number
}) {
  return (
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
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={62}
                outerRadius={92}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center stat */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black tracking-tight">
              {totalMembers.toLocaleString()}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Penerima
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-5 space-y-2">
          {data.map((item) => {
            const pct = totalAsnaf > 0 ? Math.round((item.value / totalAsnaf) * 100) : 0
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
  )
}
