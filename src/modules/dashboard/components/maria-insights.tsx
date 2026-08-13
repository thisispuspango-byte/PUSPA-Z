'use client'

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Bot,
  AlertTriangle,
  CheckCircle,
  Info,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { GlassCard } from './glass-card'
import { useMariaInsights, InsightType } from '../hooks/use-maria-insights'

function getInsightVisuals(type: InsightType) {
  switch (type) {
    case 'alert':
      return {
        icon: ShieldAlert,
        colorClass: 'text-red-500',
        bgClass: 'bg-red-500/10 border-red-500/20',
      }
    case 'warning':
      return {
        icon: AlertTriangle,
        colorClass: 'text-amber-500',
        bgClass: 'bg-amber-500/10 border-amber-500/20',
      }
    case 'success':
      return {
        icon: CheckCircle,
        colorClass: 'text-emerald-500',
        bgClass: 'bg-emerald-500/10 border-emerald-500/20',
      }
    case 'info':
    default:
      return {
        icon: Info,
        colorClass: 'text-blue-500',
        bgClass: 'bg-blue-500/10 border-blue-500/20',
      }
  }
}

export function MariaInsights() {
  const { insights } = useMariaInsights()
  const { setView, setAiChatOpen } = useAppStore()

  if (!insights || insights.length === 0) return null

  return (
    <GlassCard>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md">
            <Bot size={20} />
          </div>
          <div>
            <CardTitle className="text-base font-bold">Pandangan Maria AI</CardTitle>
            <p className="text-xs text-muted-foreground">
              Analisis automatik & cadangan tindakan pintar
            </p>
          </div>
        </div>
        <Button id="maria-insights-Button-1"
          onClick={() => setAiChatOpen(true)}
          size="sm"
          variant="outline"
          className="border-purple-500/40 text-purple-600 dark:text-purple-300 hover:bg-purple-500/10 gap-1.5 rounded-xl text-xs font-bold"
        >
          Tanya Maria <ArrowRight size={14} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {insights.map((item) => {
            const { icon: Icon, colorClass, bgClass } = getInsightVisuals(item.type)
            return (
              <div
                key={item.id}
                className={`flex flex-col justify-between p-3.5 rounded-xl border ${bgClass} transition-all`}
              >
                <div className="flex items-start gap-2.5 mb-2">
                  <Icon className={`h-4 w-4 shrink-0 mt-0.5 ${colorClass}`} />
                  <p className="text-xs font-medium text-foreground/90 leading-relaxed">
                    {item.message}
                  </p>
                </div>
                {item.action && (
                  <button
                    onClick={() => setView(item.action!.view)}
                    className={`text-[11px] font-bold ${colorClass} hover:underline text-left self-end flex items-center gap-1 mt-1`}
                  >
                    {item.action.label} <ArrowRight size={10} />
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </GlassCard>
  )
}
