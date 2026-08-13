'use client'

import { type ReactNode } from 'react'
import { Card } from '@/components/ui/card'
import { CustomTooltipProps } from '../types'

export const glassCard =
  'relative overflow-hidden border-none bg-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06)] ring-1 ring-white/40 backdrop-blur-xl dark:bg-white/[0.06] dark:ring-white/10'

export function GlassCard({
  className = '',
  children,
}: {
  className?: string
  children: ReactNode
}) {
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

export function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
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
            <span className="text-sm font-bold">
              {typeof entry.value === 'number'
                ? `RM ${entry.value.toLocaleString()}`
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}
