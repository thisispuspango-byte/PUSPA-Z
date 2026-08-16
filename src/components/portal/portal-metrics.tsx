'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { HandCoins, Users, Building2, Rocket, TrendingUp, HeartHandshake } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const STATS = [
  {
    id: 'dana',
    title: 'Jumlah Dana Diagihkan',
    value: 'RM 1,420,500',
    sub: 'Sejak penubuhan PUSPA',
    change: '+18.4% tahun ini',
    icon: HandCoins,
    gradient: 'from-primary/20 via-primary/5 to-transparent',
    border: 'border-primary/30',
    iconBg: 'bg-primary/10 text-primary dark:text-primary/80',
  },
  {
    id: 'asnaf',
    title: 'Keluarga Asnaf Dibantu',
    value: '4,850+',
    sub: 'Menerima bantuan bulanan & sara hidup',
    change: 'Sifar tunggakan',
    icon: Users,
    gradient: 'from-primary/20 via-primary/5 to-transparent',
    border: 'border-primary/30',
    iconBg: 'bg-primary/10 text-primary dark:text-primary/80',
  },
  {
    id: 'institusi',
    title: 'Institusi Kebajikan Rutin',
    value: '8 RK + 1 MT',
    sub: 'Agihan Sedekah Jumaat berterusan',
    change: '100% tepat masa',
    icon: Building2,
    gradient: 'from-primary/20 via-primary/5 to-transparent',
    border: 'border-primary/30',
    iconBg: 'bg-primary/10 text-primary dark:text-primary/80',
  },
  {
    id: 'asnafpreneur',
    title: 'Usahawan Asnaf Berjaya',
    value: '124 Usahawan',
    sub: 'Transformasi keluar daripada garis kemiskinan',
    change: '86% kadar kelulusan modul',
    icon: Rocket,
    gradient: 'from-primary/20 via-primary/5 to-transparent',
    border: 'border-primary/30',
    iconBg: 'bg-primary/10 text-primary dark:text-primary/80',
  },
]

export function PortalMetrics() {
  return (
    <section id="metrik" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:text-primary/80 border border-primary/20">
            <TrendingUp className="h-3.5 w-3.5" />
            Impak & Ketelusan Masa Nyata
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            Setiap Sen Anda Menyentuh Jiwa Asnaf
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Statistik agihan dan impak sebenar yang direkodkan secara langsung dalam ekosistem sistem pengurusan PUSPA-Z.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className={`relative overflow-hidden border ${stat.border} bg-card/60 dark:bg-black/30 backdrop-blur-xl hover:shadow-xl hover:scale-[1.02] transition-all duration-300`}>
                  {/* Subtle top glow */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${stat.gradient} pointer-events-none`} />
                 
                  <CardContent className="p-6 relative space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`h-12 w-12 rounded-2xl ${stat.iconBg} flex items-center justify-center shadow-inner`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-muted/60 text-muted-foreground border">
                        {stat.change}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {stat.title}
                      </p>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
                        {stat.value}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                        {stat.sub}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
