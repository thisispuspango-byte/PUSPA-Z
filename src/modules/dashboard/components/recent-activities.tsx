'use client'

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Activity,
  ArrowDownRight,
  FileText,
  HandCoins,
  Users,
} from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { ms } from 'date-fns/locale'
import { useAppStore } from '@/lib/store'
import { GlassCard } from './glass-card'
import { ActivityItem } from '../types'

function getActivityIcon(type: string) {
  switch (type) {
    case 'donation':
      return <HandCoins size={16} />
    case 'case':
      return <FileText size={16} />
    case 'member':
      return <Users size={16} />
    case 'disbursement':
      return <ArrowDownRight size={16} />
    default:
      return <Activity size={16} />
  }
}

const STATIC_FALLBACK_ACTIVITIES = [
  {
    id: '1',
    type: 'donation',
    title: 'Sumbangan baharu RM500 diterima',
    timeText: 'Baru sahaja',
  },
  {
    id: '2',
    type: 'case',
    title: 'Kes bantuan dimulakan untuk Asnaf Fakir',
    timeText: '10 minit lalu',
  },
  {
    id: '3',
    type: 'member',
    title: 'Ahli baharu mendaftar: Ahmad Zaki',
    timeText: '25 minit lalu',
  },
  {
    id: '4',
    type: 'activity',
    title: 'Laporan bulanan dijana',
    timeText: '1 jam lalu',
  },
]

export function RecentActivities({ activities }: { activities?: ActivityItem[] }) {
  const { setView } = useAppStore()

  const hasLiveActivities = activities && activities.length > 0

  return (
    <GlassCard className="lg:col-span-5">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-bold">Aktiviti Terkini</CardTitle>
        <span
          className="cursor-pointer text-xs font-semibold text-primary hover:underline"
          onClick={() => setView('activities')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setView('activities')}
        >
          Lihat Semua Aktiviti
        </span>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {hasLiveActivities ? (
            activities.slice(0, 5).map((a) => {
              let timeFormatted = ''
              try {
                timeFormatted = formatDistanceToNow(new Date(a.createdAt), {
                  addSuffix: true,
                  locale: ms,
                })
              } catch {
                timeFormatted = a.createdAt
              }
              return (
                <div key={a.id} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {getActivityIcon(a.type)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{timeFormatted}</p>
                  </div>
                </div>
              )
            })
          ) : (
            STATIC_FALLBACK_ACTIVITIES.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {getActivityIcon(a.type)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.timeText}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </GlassCard>
  )
}
