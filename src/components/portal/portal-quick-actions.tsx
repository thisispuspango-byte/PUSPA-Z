'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { 
  ClipboardList, 
  Heart, 
  FileSearch, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  Zap,
  Users2,
  PhoneCall
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface PortalQuickActionsProps {
  onOpenDonate: () => void
  onOpenCheckStatus: () => void
  onNavigateToApply: () => void
}

export function PortalQuickActions({
  onOpenDonate,
  onOpenCheckStatus,
  onNavigateToApply,
}: PortalQuickActionsProps) {
  return (
    <section id="tindakan" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        {/* Section Title */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary dark:text-primary/80 border border-primary/20">
            <Zap className="h-3.5 w-3.5" />
            Tindakan Terus Warga & Penderma
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            Pusat Perkhidmatan & Tindakan Segera
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Akses pantas untuk memohon bantuan, menghulurkan infaq, atau menyemak status permohonan anda dalam beberapa saat.
          </p>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         
          {/* Card 1: Permohonan Bantuan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full relative overflow-hidden border-white/20 bg-gradient-to-b from-primary/10 via-card/80 to-card/60 backdrop-blur-2xl hover:border-primary/50 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
              <CardHeader className="p-6 pb-4">
                <div className="h-12 w-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mb-4 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                  <ClipboardList className="h-6 w-6" />
                </div>
                <Badge variant="outline" className="w-fit mb-2 bg-primary/10 text-primary dark:text-primary/80 border-primary/20 text-[11px]">
                  Borang Digital 5 Minit
                </Badge>
                <CardTitle className="text-xl font-bold text-foreground">
                  Mohon Bantuan Asnaf
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed pt-1">
                  Bantuan bulanan sara hidup, sewa rumah, kos perubatan kecemasan, atau peralatan sekolah anak.
                </CardDescription>
              </CardHeader>
             
              <CardContent className="p-6 pt-0 space-y-4">
                <ul className="text-xs text-muted-foreground space-y-2 border-t pt-3">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Kelayakan Fakir, Miskin & Muallaf</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Verifikasi eKYC selamat selaras PDPA</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Semakan siasatan lapangan pantas</span>
                  </li>
                </ul>

                <Button
                  onClick={onNavigateToApply}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs h-10 gap-1.5 shadow-md shadow-primary/20"
                >
                  Buka Borang Permohonan
                  <ArrowRight className="h-3.5 w-3.5 ml-auto" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 2: Infaq Sedekah Jumaat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="h-full relative overflow-hidden border-primary/30 bg-gradient-to-b from-primary/10 via-card/80 to-card/60 backdrop-blur-2xl hover:border-primary/60 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
              <CardHeader className="p-6 pb-4">
                <div className="h-12 w-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mb-4 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                  <Heart className="h-6 w-6 fill-current" />
                </div>
                <Badge variant="outline" className="w-fit mb-2 bg-primary/10 text-primary dark:text-primary/80 border-primary/20 text-[11px]">
                  Agihan Mingguan
                </Badge>
                <CardTitle className="text-xl font-bold text-foreground">
                  Infaq Sedekah Jumaat
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed pt-1">
                  Taja makanan tengahari bermasak untuk penghuni 8 rumah kebajikan dan anak tahfiz setiap hari Jumaat.
                </CardDescription>
              </CardHeader>
             
              <CardContent className="p-6 pt-0 space-y-4">
                <ul className="text-xs text-muted-foreground space-y-2 border-t pt-3">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Pek makanan seimbang & bersih</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Resit e-Infaq automatik & telus</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Pilihan FPX, DuitNow QR & Pindahan</span>
                  </li>
                </ul>

                <Button
                  onClick={onOpenDonate}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs h-10 gap-1.5 shadow-md shadow-primary/20"
                >
                  Infaq Segera (Mulai RM10)
                  <ArrowRight className="h-3.5 w-3.5 ml-auto" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Card 3: Semakan Status eKYC */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full relative overflow-hidden border-primary/30 bg-gradient-to-b from-primary/10 via-card/80 to-card/60 backdrop-blur-2xl hover:border-primary/60 hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
              <CardHeader className="p-6 pb-4">
                <div className="h-12 w-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mb-4 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                  <FileSearch className="h-6 w-6" />
                </div>
                <Badge variant="outline" className="w-fit mb-2 bg-primary/10 text-primary dark:text-primary/80 border-primary/20 text-[11px]">
                  Semakan Terus MyKad
                </Badge>
                <CardTitle className="text-xl font-bold text-foreground">
                  Semak Status Permohonan
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground leading-relaxed pt-1">
                  Ketahui kedudukan terkini fail bantuan anda tanpa perlu hadir fizikal ke pejabat urusan.
                </CardDescription>
              </CardHeader>
             
              <CardContent className="p-6 pt-0 space-y-4">
                <ul className="text-xs text-muted-foreground space-y-2 border-t pt-3">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Kemaskini siasatan lapangan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Jadual tarikh penyaluran tunai</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>Hubungi pegawai zon secara terus</span>
                  </li>
                </ul>

                <Button
                  onClick={onOpenCheckStatus}
                  variant="outline"
                  className="w-full border-primary/40 text-primary hover:bg-primary/10 font-semibold text-xs h-10 gap-1.5"
                >
                  Semak Sekarang
                  <ArrowRight className="h-3.5 w-3.5 ml-auto" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
