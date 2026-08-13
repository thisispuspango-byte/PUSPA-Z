'use client'

import { CardContent, CardHeader, CardTitle } from '@/components/ui'
import { GlassCard } from './glass-card'
import { MapPin, Globe } from 'lucide-react'

export interface StateDistribution {
  state: string
  count: number
  lat: number
  lng: number
}

const MALAYSIA_STATES: StateDistribution[] = [
  { state: 'Selangor', count: 420, lat: 3.074, lng: 101.518 },
  { state: 'Kuala Lumpur', count: 310, lat: 3.139, lng: 101.687 },
  { state: 'Johor', count: 240, lat: 1.485, lng: 103.762 },
  { state: 'Perak', count: 190, lat: 4.592, lng: 101.09 },
  { state: 'Kedah', count: 160, lat: 6.118, lng: 100.369 },
  { state: 'Kelantan', count: 210, lat: 6.125, lng: 102.238 },
  { state: 'Terengganu', count: 140, lat: 5.312, lng: 103.132 },
  { state: 'Sabah', count: 185, lat: 5.979, lng: 116.075 },
  { state: 'Sarawak', count: 175, lat: 1.553, lng: 110.359 },
]

export function GeoMap() {
  const totalCount = MALAYSIA_STATES.reduce((acc, s) => acc + s.count, 0)

  return (
    <GlassCard className="lg:col-span-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-purple-500/10 p-2 text-purple-500 dark:bg-purple-500/20">
            <Globe size={18} />
          </div>
          <div>
            <CardTitle className="text-base font-bold">🗺️ Taburan Penerima Mengikut Negeri</CardTitle>
            <p className="text-xs text-muted-foreground">Demografi Asnaf & Bantuan Kebangsaan</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-2">
        <div className="grid grid-cols-2 gap-2 text-xs">
          {MALAYSIA_STATES.slice(0, 6).map((item) => (
            <div key={item.state} className="flex items-center justify-between rounded-lg bg-muted/30 p-2">
              <div className="flex items-center gap-1.5">
                <MapPin size={12} className="text-primary" />
                <span className="font-medium">{item.state}</span>
              </div>
              <span className="font-bold text-primary">{item.count}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border/40 pt-2 text-xs text-muted-foreground">
          <span>Jumlah Keseluruhan Penerima Negeri:</span>
          <span className="font-bold text-foreground">{totalCount.toLocaleString('ms-MY')} Orang</span>
        </div>
      </CardContent>
    </GlassCard>
  )
}
