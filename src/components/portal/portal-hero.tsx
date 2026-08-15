'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ClipboardCheck, 
  Users, 
  Building2, 
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface PortalHeroProps {
  onOpenDonate: () => void
  onOpenCheckStatus: () => void
  onNavigateToApply: () => void
}

export function PortalHero({ onOpenDonate, onOpenCheckStatus, onNavigateToApply }: PortalHeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Top Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <Badge variant="outline" className="bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/30 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 mr-1.5 text-purple-500" />
                Dikuasakan Maria AI Engine v2.5
              </Badge>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/30 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                <ShieldCheck className="h-3.5 w-3.5 mr-1.5 text-emerald-500" />
                Pertubuhan Urus Peduli Asnaf Berdaftar
              </Badge>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
              Mengurus Amanah,{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 dark:from-purple-400 dark:via-pink-400 dark:to-indigo-300 bg-clip-text text-transparent">
                Membela Asnaf
              </span>{' '}
              Secara Digital &amp; Telus.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Portal perkhidmatan digital PUSPA menghubungkan penderma, pemohon bantuan, dan institusi kebajikan. Pantas, disahkan secara eKYC, dan diselia dengan kepintaran buatan Maria AI.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Button
                onClick={onOpenDonate}
                size="lg"
                className="w-full sm:w-auto h-12 px-7 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold shadow-xl shadow-purple-600/25 transition-all text-sm gap-2 rounded-xl"
              >
                <Heart className="h-4 w-4 fill-white" />
                Infaq Sedekah Jumaat
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                onClick={onNavigateToApply}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto h-12 px-6 bg-card/60 hover:bg-card border-white/20 backdrop-blur-xl text-foreground font-semibold text-sm gap-2 rounded-xl shadow-sm"
              >
                <ClipboardCheck className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                Mohon Bantuan Asnaf
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Sifar Kos Pengantara</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Agihan 8 Rumah Kebajikan</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Audit & Penyata Terbuka</span>
              </div>
            </div>
          </motion.div>

          {/* Right 3D Visual Card Widget */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            {/* Glowing Backdrop Blur */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-20 dark:opacity-40 animate-pulse" />

            {/* Glass Container */}
            <div className="relative rounded-3xl border border-white/20 bg-background/60 dark:bg-black/40 backdrop-blur-2xl p-6 shadow-2xl space-y-5">
              
              {/* Header card info */}
              <div className="flex items-center justify-between border-b border-border/50 pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src="/maria-face-clean.png"
                      alt="Maria AI"
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full object-cover border-2 border-purple-500 shadow-md bg-purple-100"
                    />
                    <div className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 rounded-full border-2 border-background" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm text-foreground">Maria AI Assistant</h3>
                      <Badge className="bg-purple-600 text-[10px] h-4 px-1.5 text-white">Live</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Pemantauan Agihan Masa Nyata</p>
                  </div>
                </div>

                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs">
                  Aktif Hari Ini
                </Badge>
              </div>

              {/* Live Distribution Mini Cards */}
              <div className="space-y-2.5">
                <div className="p-3 rounded-2xl border border-white/10 bg-card/60 backdrop-blur-md flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Rumah Kebajikan Al-Mukhlisin</p>
                      <p className="text-[11px] text-muted-foreground">Cheras • 45 Pek Makanan Tengahari</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20 text-[10px]">
                    Selesai Agih
                  </Badge>
                </div>

                <div className="p-3 rounded-2xl border border-white/10 bg-card/60 backdrop-blur-md flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                      <Clock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">Mahad Tahfiz Al-Quran PUSPA</p>
                      <p className="text-[11px] text-muted-foreground">Bangi • 60 Peti Makanan & Minuman</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px]">
                    Dalam Perjalanan
                  </Badge>
                </div>
              </div>

              {/* Live Metric Strip inside widget */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-center">
                  <p className="text-[11px] text-purple-600 dark:text-purple-300 font-medium">Infaq Terkumpul Minggu Ini</p>
                  <p className="text-lg font-extrabold text-foreground mt-0.5">RM 14,850</p>
                </div>
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center">
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-300 font-medium">Jumlah Penerima</p>
                  <p className="text-lg font-extrabold text-foreground mt-0.5">620 Orang</p>
                </div>
              </div>

              {/* Quick Status Button */}
              <Button
                variant="outline"
                onClick={onOpenCheckStatus}
                className="w-full text-xs h-9 border-dashed border-purple-500/40 text-purple-600 dark:text-purple-300 hover:bg-purple-500/10"
              >
                Semak Status Permohonan Anda Menggunakan No. IC
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
