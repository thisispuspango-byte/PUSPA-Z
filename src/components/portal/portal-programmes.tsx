'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { 
  Rocket, 
  UtensilsCrossed, 
  GraduationCap, 
  HeartHandshake, 
  ArrowRight, 
  Building2, 
  Users,
  CheckCircle2
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const PROGRAMMES = [
  {
    id: 'asnafpreneur',
    title: 'Asnafpreneur Incubator',
    tag: 'Transformasi Ekonomi',
    desc: 'Program bimbingan keusahawanan intensif dan geran mikro untuk membantu ketua keluarga asnaf membina perniagaan mampan.',
    impact: '124 Usahawan telah bebas daripada status asnaf',
    highlights: ['Geran Modal Perniagaan', 'Bimbingan Mentor Berpengalaman', 'Pemantauan Prestasi Kewangan'],
    color: 'from-purple-600 to-indigo-600',
    border: 'border-purple-500/30',
    badgeClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border-purple-500/20',
    icon: Rocket,
  },
  {
    id: 'sedekah-jumaat',
    title: 'Sedekah Jumaat & Tahfiz',
    tag: 'Kebajikan & Makanan',
    desc: 'Penyaluran makanan tengahari berkhasiat secara konsisten setiap minggu ke 8 rumah kebajikan orang tua, anak yatim dan Mahad Tahfiz.',
    impact: 'Melebihi 600 pek makanan diagihkan setiap Jumaat',
    highlights: ['8 Rumah Kebajikan Tetap', '1 Mahad Tahfiz PUSPA', 'Logistik & Penghantaran Sukarelawan'],
    color: 'from-pink-600 to-rose-600',
    border: 'border-pink-500/30',
    badgeClass: 'bg-pink-500/10 text-pink-600 dark:text-pink-300 border-pink-500/20',
    icon: UtensilsCrossed,
  },
  {
    id: 'dapur-ihsan',
    title: 'Dapur Ihsan & Barakah',
    tag: 'Bantuan Asas Dapur',
    desc: 'Kotak barangan keperluan asas (beras, minyak, tepung, makanan kering) yang dibekalkan setiap bulan kepada keluarga fakir miskin.',
    impact: 'Membantu 350+ isi rumah sebulan',
    highlights: ['Pek Makanan Bernilai RM150', 'Penghantaran Terus ke Rumah', 'Pemeriksaan Nutrisi & Keperluan'],
    color: 'from-amber-600 to-orange-600',
    border: 'border-amber-500/30',
    badgeClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-300 border-amber-500/20',
    icon: HeartHandshake,
  },
  {
    id: 'pendidikan',
    title: 'Dana Generasi Celik Asnaf',
    tag: 'Pendidikan & Masa Depan',
    desc: 'Tajaan persekolahan, beg, yuran kelas tambahan, dan kelas mengaji Al-Quran percuma untuk memastikan anak-anak asnaf tidak tercicir.',
    impact: '480 anak asnaf menerima sokongan pendidikan',
    highlights: ['Pakej Kembali Ke Sekolah', 'Kelas Bimbingan SPM/PT3', 'Tajaan Pengajian Tahfiz'],
    color: 'from-emerald-600 to-teal-600',
    border: 'border-emerald-500/30',
    badgeClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20',
    icon: GraduationCap,
  },
]

interface PortalProgrammesProps {
  onOpenDonate: () => void
}

export function PortalProgrammes({ onOpenDonate }: PortalProgrammesProps) {
  return (
    <section id="program" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20">
            <Building2 className="h-3.5 w-3.5" />
            Inisiatif Berimpak Tinggi
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground">
            Program Unggulan PUSPA
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Bukan sekadar menyalurkan bantuan jangka pendek, kami komited membina kemandirian jangka panjang buat ummah.
          </p>
        </div>

        {/* Programme Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROGRAMMES.map((prog, idx) => {
            const Icon = prog.icon
            return (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className={`h-full border ${prog.border} bg-card/60 backdrop-blur-xl hover:shadow-xl transition-all duration-300 overflow-hidden relative group`}>
                  <div className={`h-1.5 w-full bg-gradient-to-r ${prog.color}`} />
                  
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <Badge variant="outline" className={`${prog.badgeClass} text-[11px]`}>
                          {prog.tag}
                        </Badge>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors pt-1">
                          {prog.title}
                        </h3>
                      </div>
                      <div className="h-11 w-11 rounded-xl bg-muted/80 flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {prog.desc}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-1">
                      {prog.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-foreground/80">
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Impact strip */}
                    <div className="p-3 rounded-xl bg-muted/40 border border-border/50 text-xs flex items-center justify-between">
                      <span className="text-muted-foreground font-medium">Impak Semasa:</span>
                      <span className="font-semibold text-foreground">{prog.impact}</span>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <Button
                        onClick={onOpenDonate}
                        variant="ghost"
                        size="sm"
                        className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:text-purple-700 hover:bg-purple-500/10 gap-1"
                      >
                        Taja Program Ini
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
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
