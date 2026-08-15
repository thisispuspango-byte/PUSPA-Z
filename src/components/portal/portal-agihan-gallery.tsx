'use client'

import * as React from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Utensils, 
  Heart, 
  CheckCircle2, 
  Building2, 
  Truck, 
  Users, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Clock,
  MapPin,
  CalendarCheck,
  X
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface PortalAgihanGalleryProps {
  onOpenDonate: () => void
}

const DISTRIBUTION_STEPS = [
  {
    step: '01',
    time: '6:00 AM - 9:00 AM',
    title: 'Penyediaan Dapur Barakah',
    desc: 'Juadah tengahari segar dimasak setiap pagi Jumaat oleh pasukan tukang masak PUSPA dengan pematuhan nutrisi & kebersihan ketat.',
    icon: Utensils,
    tag: 'Penyediaan Segar',
    stats: '600+ Pek Makanan'
  },
  {
    step: '02',
    time: '9:30 AM - 10:30 AM',
    title: 'Pembungkusan Haba & Agihan Kotak',
    desc: 'Makanan dibungkus rapi dalam bekas berpateri haba bagi memastikan hidangan kekal panas, bersih dan selamat dinikmati.',
    icon: ShieldCheck,
    tag: 'Kawalan Kualiti',
    stats: '100% Bersih & Halal'
  },
  {
    step: '03',
    time: '11:00 AM - 12:30 PM',
    title: 'Konvoi Armada Sukarelawan',
    desc: 'Pasukan sukarelawan berlepas mengikut zon berjadual merentasi Selangor dan Kuala Lumpur untuk penghantaran tepat pada masanya.',
    icon: Truck,
    tag: 'Logistik Sukarela',
    stats: '8 Zon Berjadual'
  },
  {
    step: '04',
    time: '12:30 PM - 1:30 PM',
    title: 'Penyerahan Kepada 8 RK & Tahfiz',
    desc: 'Juadah diserahkan terus ke tangan penghuni rumah orang tua, anak-anak yatim dan pelajar Mahad Tahfiz sebelum solat Jumaat.',
    icon: Building2,
    tag: 'Sentuhan Kasih',
    stats: '8 RK + 1 MT'
  }
]

const BENEFICIARY_INSTITUTIONS = [
  { name: 'Rumah Kebajikan Al-Mukhlisin', location: 'Cheras', beneficiaries: '45 Penghuni', type: 'Warga Emas & Yatim', status: 'Selesai Agih' },
  { name: 'Mahad Tahfiz Al-Quran PUSPA', location: 'Bangi', beneficiaries: '60 Pelajar', type: 'Anak Tahfiz', status: 'Selesai Agih' },
  { name: 'Pusat Jagaan Kasih Nurul Hasanah', location: 'Ulu Langat', beneficiaries: '52 Penghuni', type: 'Kanak-Kanak Yatim', status: 'Selesai Agih' },
  { name: 'Rumah Titian Kasih', location: 'Titiwangsa', beneficiaries: '68 Penghuni', type: 'Ibu Tunggal & Asnaf', status: 'Selesai Agih' },
  { name: 'Pusat Jagaan Mahmudah', location: 'Semenyih', beneficiaries: '40 Penghuni', type: 'Warga Emas Terbiar', status: 'Selesai Agih' },
  { name: 'Asrama Anak Yatim Darul Izzah', location: 'Bangi', beneficiaries: '38 Pelajar', type: 'Anak Yatim Piatu', status: 'Selesai Agih' },
  { name: 'Rumah Amal Kasih Bestari', location: 'Kampung Melayu Subang', beneficiaries: '48 Penghuni', type: 'Fakir Miskin', status: 'Selesai Agih' },
  { name: 'Pusat Pemulihan Komuniti Asnaf', location: 'Kajang', beneficiaries: '35 Keluarga', type: 'Muallaf & Miskin', status: 'Selesai Agih' },
]

const GALLERY_PHOTOS = [
  { src: '/photo_2026-05-06_10-47-15.jpg', title: 'Penyediaan Pek Barakah', subtitle: 'Dapur Pusat PUSPA' },
  { src: '/photo_2026-05-06_10-47-40.jpg', title: 'Agihan Terus Kepada Asnaf', subtitle: 'Penghantaran Sukarelawan' },
  { src: '/photo_2026-05-06_10-47-44.jpg', title: 'Kotak Bantuan Dapur Ihsan', subtitle: 'Bekalan Makanan Asas' },
  { src: '/photo_2026-05-06_10-48-00.jpg', title: 'Santunan Warga Emas', subtitle: 'Rumah Kebajikan' },
  { src: '/photo_2026-05-06_10-48-04.jpg', title: 'Juadah Makanan Tengahari', subtitle: 'Sedekah Jumaat' },
  { src: '/photo_2026-05-06_10-48-08.jpg', title: 'Senyuman Anak Tahfiz', subtitle: 'Mahad Tahfiz PUSPA' },
]

export function PortalAgihanGallery({ onOpenDonate }: PortalAgihanGalleryProps) {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  return (
    <section id="galeri-agihan" className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20 backdrop-blur-md">
            <Heart className="h-3.5 w-3.5 text-pink-500 fill-pink-500" />
            Ketelusan Lapangan PUSPA
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
            Perjalanan Agihan Sedekah Jumaat &amp; Kebajikan Lapangan
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Setiap hari Jumaat, amanah infaq anda disalurkan secara langsung melalui operasi teratur kami — daripada dapur penyediaan hingga ke meja makan anak yatim dan warga emas.
          </p>
        </div>

        {/* ─── 4-Step Distribution Workflow ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DISTRIBUTION_STEPS.map((item, idx) => {
            const Icon = item.icon
            const isSelected = activeStep === idx
            return (
              <div
                key={item.step}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 text-left space-y-3 relative group active:scale-[0.98] ${
                  isSelected
                    ? 'bg-purple-600/10 border-purple-500 shadow-lg shadow-purple-500/10'
                    : 'bg-card/60 hover:bg-card border-border/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">
                    Langkah {item.step}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span>{item.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-bold shrink-0 transition-transform ${
                    isSelected ? 'bg-purple-600 text-white scale-105' : 'bg-muted text-foreground'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground leading-tight">{item.title}</h3>
                    <span className="text-[11px] text-purple-600 dark:text-purple-300 font-semibold">{item.stats}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* ─── Real Field Photo Gallery Grid ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                Galeri Foto Lapangan &amp; Aktiviti Agihan
              </h3>
              <p className="text-xs text-muted-foreground">Dokumentasi telus penyerahan sumbangan dan aktiviti kebajikan asnaf.</p>
            </div>
            <Badge variant="outline" className="hidden sm:inline-flex bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border-emerald-500/20 text-xs">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              100% Dokumentasi Sebenar
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {GALLERY_PHOTOS.map((photo, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedPhoto(photo.src)}
                className="group relative rounded-2xl overflow-hidden border border-white/10 shadow-md bg-muted/40 aspect-[4/3] cursor-pointer"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2.5 flex flex-col justify-end">
                  <p className="text-[11px] font-bold text-white leading-tight">{photo.title}</p>
                  <p className="text-[9px] text-white/80">{photo.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── 8 Beneficiary Welfare Homes Grid ─── */}
        <div className="rounded-3xl border border-white/10 bg-card/60 backdrop-blur-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/50 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                <h3 className="text-lg font-bold text-foreground">
                  8 Rumah Kebajikan &amp; Mahad Tahfiz Penerima Rutin
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Institusi berdaftar yang menerima tajaan makanan Sedekah Jumaat PUSPA setiap minggu.
              </p>
            </div>
            <Button
              onClick={onOpenDonate}
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-xs h-9 px-4 rounded-xl gap-1.5 shadow-md active:scale-[0.97] transition-transform"
            >
              <Heart className="h-3.5 w-3.5 fill-white" />
              Taja Makanan Jumaat Ini
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {BENEFICIARY_INSTITUTIONS.map((inst, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-border/60 bg-muted/30 hover:bg-muted/60 transition-colors space-y-2 text-left"
              >
                <div className="flex items-start justify-between gap-1">
                  <h4 className="text-xs font-bold text-foreground leading-snug">{inst.name}</h4>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[10px] shrink-0">
                    {inst.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-border/40">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-purple-500" />
                    {inst.location}
                  </span>
                  <span className="font-semibold text-foreground">{inst.beneficiaries}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ─── Photo Lightbox Modal ─── */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full"
            >
              <img
                src={selectedPhoto}
                alt={GALLERY_PHOTOS.find((p) => p.src === selectedPhoto)?.title ?? 'Foto Agihan'}
                className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl"
              />
              <div className="mt-3 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white leading-tight">
                    {GALLERY_PHOTOS.find((p) => p.src === selectedPhoto)?.title}
                  </p>
                  <p className="text-xs text-white/70">
                    {GALLERY_PHOTOS.find((p) => p.src === selectedPhoto)?.subtitle}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedPhoto(null)}
                  aria-label="Tutup foto"
                  className="shrink-0 h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 text-white"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
