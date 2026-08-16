'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Heart, ArrowRight, ClipboardCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PortalHeroProps {
  onOpenDonate: () => void
  onOpenCheckStatus: () => void
  onNavigateToApply: () => void
}

export function PortalHero({ onOpenDonate, onNavigateToApply }: PortalHeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          {/* Main Headline */}
          <h1 className="font-black tracking-tight text-foreground leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            Mengurus Amanah,{' '}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Membela Asnaf
            </span>{' '}
            Secara Digital & Telus.
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-base sm:text-lg md:text-xl">
            Portal perkhidmatan digital PUSPA menghubungkan penderma, pemohon bantuan, dan institusi kebajikan.
          </p>

          {/* Call to Action Buttons - Exactly 2 CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={onOpenDonate}
              size="lg"
              className="w-full sm:w-auto h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xl shadow-primary/25 transition-all text-sm gap-2 rounded-xl"
            >
              <Heart className="h-4 w-4 fill-current" />
              Infaq Sekarang
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              onClick={onNavigateToApply}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-12 px-8 border-border hover:bg-accent text-foreground font-semibold text-sm gap-2 rounded-xl"
            >
              <ClipboardCheck className="h-4 w-4 text-primary" />
              Mohon Bantuan
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
