'use client'

import { type ReactNode, useState, MouseEvent } from 'react'
import { Card } from '@/components/ui/card'
import { CustomTooltipProps } from '../types'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

export const glassCard =
  'relative overflow-hidden border-none bg-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)] ring-1 ring-white/60 backdrop-blur-2xl dark:bg-white/[0.04] dark:ring-white/10 transition-all duration-500 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] hover:bg-white/70 dark:hover:bg-white/[0.08]'

export function GlassCard({
  className = '',
  children,
}: {
  className?: string
  children: ReactNode
}) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      onMouseMove={handleMouseMove}
      className={cn("group h-full", className)}
    >
      <Card className={cn(glassCard, "h-full w-full")}>
        {/* Hover Spotlight Effect */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                500px circle at ${mouseX}px ${mouseY}px,
                rgba(var(--primary-rgb, 120, 119, 198), 0.08),
                transparent 80%
              )
            `,
          }}
        />

        {/* Top glass highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/30"
        />
        
        {/* Subtle noise texture for true liquid glass feel */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.04] mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />
        
        <div className="relative z-10 h-full">{children}</div>
      </Card>
    </motion.div>
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
