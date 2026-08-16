'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent, MotionValue } from 'framer-motion'
import {
  UtensilsCrossed,
  PackageCheck,
  Truck,
  Building2,
  Rocket,
  Plus,
  ArrowRight,
  Heart,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Compass,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

/* ─────────────────────────────────────────────────────────── */
/*  DATA DEFINITIONS                                           */
/* ─────────────────────────────────────────────────────────── */

interface Hotspot {
  id: string
  title: string
  desc: string
  x: number // percentage 0-100
  y: number // percentage 0-100
  status: string
}

interface ZoneInfo {
  id: string
  num: string
  name: string
  shortLabel: string
  subtitle: string
  desc: string
  icon: typeof UtensilsCrossed
  diorama: string
  video: string
  themeColor: string
  accentGlow: string
  stats: { label: string; value: string }[]
  hotspots: Hotspot[]
}

const ZONES: ZoneInfo[] = [
  {
    id: 'dapur',
    num: '01',
    name: 'Dapur Pusat & Juadah Barakah',
    shortLabel: 'Dapur Barakah',
    subtitle: '600+ Pek Makanan Panas Setiap Jumaat',
    desc: 'Dapur berpusat PUSPA beroperasi seawal jam 6 pagi memasak hidangan seimbang dan bernutrisi tinggi sebelum dimuatkan ke dalam armada penghantaran.',
    icon: UtensilsCrossed,
    diorama: '/diorama-01.jpg',
    video: '/videos/diorama-01.mp4',
    themeColor: '#7C3AED',
    accentGlow: 'rgba(124, 58, 237, 0.4)',
    stats: [
      { label: 'Kapasiti Harian', value: '800 Pek' },
      { label: 'Kawalan Suhu', value: 'Min 65°C' },
    ],
    hotspots: [
      { id: 'h1', title: 'Stesen Kuali Industri', desc: 'Memasak lauk berkhasiat secara pukal menggunakan standard kebersihan HALAL & MeSTI.', x: 26, y: 36, status: 'Penyediaan Aktif' },
      { id: 'h2', title: 'Meja Pembungkusan Pantas', desc: 'Pembungkusan bekas mesra alam tahan haba untuk mengekalkan kesegaran makanan.', x: 58, y: 58, status: 'Standard Kebersihan 100%' },
    ],
  },
  {
    id: 'gudang',
    num: '02',
    name: 'Gudang Simpanan & Barangan Kering',
    shortLabel: 'Gudang Ihsan',
    subtitle: 'Pengurusan Inventori Barakah Bersistematik',
    desc: 'Gudang simpanan beras, minyak, tepung, dan bekalan keperluan asas keluarga asnaf dengan sistem kod bar pintar bagi mengelakkan pembaziran.',
    icon: PackageCheck,
    diorama: '/diorama-02.jpg',
    video: '/videos/diorama-02.mp4',
    themeColor: '#0EA5E9',
    accentGlow: 'rgba(14, 165, 233, 0.4)',
    stats: [
      { label: 'Kotak Keperluan', value: '1,200 Kotak/Bulan' },
      { label: 'Kawalan Stok', value: 'Sistem FIFO Pintar' },
    ],
    hotspots: [
      { id: 'h3', title: 'Rak Simpanan Bertingkat', desc: 'Penyusunan berasaskan tarikh luput (FIFO) untuk memastikan kualiti bekalan sentiasa segar.', x: 38, y: 34, status: 'Stok Terkawal' },
      { id: 'h4', title: 'Zon Susun Kotak Kasih', desc: 'Sukarelawan membungkus kit makanan asas seberat 15kg bagi setiap keluarga penerima.', x: 64, y: 56, status: 'Agihan Mingguan' },
    ],
  },
  {
    id: 'armada',
    num: '03',
    name: 'Logistik & Armada Konvoi Agihan',
    shortLabel: 'Konvoi Armada',
    subtitle: 'Menembusi Lorong Sempit & Komuniti Pedalaman',
    desc: 'Konvoi kenderaan pacuan empat roda dan motosikal sukarelawan menghantar makanan terus ke pintu rumah penerima tanpa perantara.',
    icon: Truck,
    diorama: '/diorama-03.jpg',
    video: '/videos/diorama-03.mp4',
    themeColor: '#059669',
    accentGlow: 'rgba(5, 150, 105, 0.4)',
    stats: [
      { label: 'Zon Liputan', value: 'Lembah Klang & Pedalaman' },
      { label: 'Masa Sampai', value: '< 90 Minit' },
    ],
    hotspots: [
      { id: 'h5', title: 'Pusat Pelepasan Konvoi', desc: 'Pemeriksaan keselamatan kenderaan dan penetapan laluan agihan melalui sistem navigasi GPS.', x: 32, y: 62, status: 'Laluan Dioptimumkan' },
      { id: 'h6', title: 'Skuad Motosikal Cepat', desc: 'Menembusi kawasan flat bertingkat tinggi dan perumahan padat dengan pantas.', x: 62, y: 44, status: 'Sedia Gerak' },
    ],
  },
  {
    id: 'komuniti',
    num: '04',
    name: '8 Rumah Kebajikan & Pusat Tahfiz',
    shortLabel: '8 RK & Tahfiz',
    subtitle: 'Santunan Warga Emas, Anak Yatim & Penuntut Ilmu',
    desc: 'Penerimaan agihan di lapan buah rumah kebajikan rakan kerjasama dan madrasah tahfiz terpilih setiap hari Jumaat secara berjadual.',
    icon: Building2,
    diorama: '/diorama-04.jpg',
    video: '/videos/diorama-04.mp4',
    themeColor: '#D97706',
    accentGlow: 'rgba(217, 119, 6, 0.4)',
    stats: [
      { label: 'Penghuni Disantuni', value: '450+ Jiwa' },
      { label: 'Kekerapan', value: 'Setiap Jumaat Berterusan' },
    ],
    hotspots: [
      { id: 'h7', title: 'Dewan Selera Rumah Warga Emas', desc: 'Makanan panas dihidangkan segar oleh sukarelawan bersama sesi ramah mesra.', x: 44, y: 48, status: 'Santunan Kasih' },
      { id: 'h8', title: 'Pusat Tahfiz & Asrama', desc: 'Bekalan protein dan nutrisi mencukupi untuk menyokong pembelajaran anak-anak.', x: 66, y: 36, status: 'Penerima Tetap' },
    ],
  },
  {
    id: 'hab',
    num: '05',
    name: 'Hab Transformasi & Pengurusan Asnaf',
    shortLabel: 'Hab Transformasi',
    subtitle: 'Pusat Data Maria AI & Studio Asnafpreneur',
    desc: 'Kompleks operasi pintar PUSPA yang menempatkan bilik kawalan Maria AI dan studio bimbingan modal niaga asnaf.',
    icon: Rocket,
    diorama: '/diorama-05.jpg',
    video: '/videos/diorama-05.mp4',
    themeColor: '#2563EB',
    accentGlow: 'rgba(37, 99, 235, 0.4)',
    stats: [
      { label: 'Usahawan Terbimbing', value: '124 Usahawan' },
      { label: 'Verifikasi eKYC', value: 'Pantas & Patuh' },
    ],
    hotspots: [
      { id: 'h9', title: 'Bilik Komando Maria AI Engine', desc: 'Semakan integriti data pemohon, padanan had kifayah, dan pemantauan live kutipan infaq.', x: 42, y: 40, status: 'Sistem Aktif 24/7' },
      { id: 'h10', title: 'Studio Inkubator Asnafpreneur', desc: 'Bimbingan perniagaan mikro agar keluarga asnaf mampu berdikari.', x: 68, y: 60, status: 'Sesi Bimbingan' },
    ],
  },
]

/* ─────────────────────────────────────────────────────────── */
/*  FLIGHT CONSTANTS                                           */
/* ─────────────────────────────────────────────────────────── */

const TRACK_HEIGHT_VH = 600
const ZONE_COUNT = ZONES.length

/* ─────────────────────────────────────────────────────────── */
/*  ZONE PANEL (one diorama on the horizontal flight track)    */
/* ─────────────────────────────────────────────────────────── */

interface ZonePanelProps {
  zone: ZoneInfo
  index: number
  progress: MotionValue<number>
  active: boolean
  openHs: string | null
  onToggleHs: (id: string) => void
}

function ZonePanel({ zone, index, progress, active, openHs, onToggleHs }: ZonePanelProps) {
  const segStart = index / ZONE_COUNT
  const segEnd = (index + 1) / ZONE_COUNT

  // Emons-style silky camera dolly scale and perspective
  const scale = useTransform(
    progress,
    [segStart - 0.05, segStart + 0.1, segEnd - 0.1, segEnd + 0.05],
    [1.08, 1, 1, 1.04]
  )

  const opacity = useTransform(
    progress,
    [segStart - 0.08, segStart, segEnd, segEnd + 0.08],
    [0.25, 1, 1, 0.25]
  )

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [active])

  return (
    <div className="relative h-full w-screen shrink-0 overflow-hidden select-none">
      {/* ── Living Video Diorama with Emons Crisp Presentation ── */}
      <motion.div
        className="absolute inset-0 origin-center will-change-transform"
        style={{ scale, opacity }}
      >
        <video
          ref={videoRef}
          src={zone.video}
          poster={zone.diorama}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* ── Soft Studio Lighting & Subtle Vignette (Emons Bright Aesthetic) ── */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

      {/* Ambient Zone Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25 transition-opacity duration-1000 mix-blend-screen"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${zone.accentGlow} 0%, transparent 65%)`,
        }}
      />

      {/* ── Emons-Grade White Circular Hotspots (+) ── */}
      {zone.hotspots.map((hs) => {
        const open = active && openHs === hs.id
        return (
          <div
            key={hs.id}
            className="absolute z-30"
            style={{ left: `${hs.x}%`, top: `${hs.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <div className="relative flex items-center justify-center">
              {/* Radar pulse rings */}
              {active && !open && (
                <>
                  <span
                    className="pointer-events-none absolute h-12 w-12 rounded-full border-2 opacity-75 animate-ping"
                    style={{ borderColor: zone.themeColor }}
                  />
                  <span
                    className="pointer-events-none absolute h-14 w-14 rounded-full border border-white/50 opacity-40 animate-pulse"
                  />
                </>
              )}

              {/* Exact Emons White Circle + Button */}
              <button
                type="button"
                onClick={() => onToggleHs(hs.id)}
                aria-label={hs.title}
                className={`relative flex h-10 w-10 items-center justify-center rounded-full shadow-2xl transition-all duration-300 active:scale-90 ${
                  open
                    ? 'scale-110 bg-slate-900 text-white ring-4 ring-white/60'
                    : 'border border-slate-200/80 bg-white/95 text-slate-900 hover:scale-110 hover:bg-white'
                } ${active ? 'opacity-100 pointer-events-auto' : 'pointer-events-none opacity-0'}`}
              >
                <Plus className={`h-5 w-5 stroke-[2.5] transition-transform duration-300 ${open ? 'rotate-45 text-white' : 'text-slate-900'}`} />
              </button>
            </div>

            {/* In-place Tooltip Card right above the Hotspot */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.92 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.92 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute bottom-full left-1/2 z-40 mb-3 w-80 -translate-x-1/2 space-y-2 rounded-2xl border border-slate-200/80 bg-white/95 p-4 text-left shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-2xl text-slate-900"
                >
                  <div className="flex items-center justify-between">
                    <Badge
                      className="h-5 border-0 px-2.5 text-[10px] font-bold text-white shadow-md"
                      style={{ backgroundColor: zone.themeColor }}
                    >
                      {hs.status}
                    </Badge>
                    <span className="font-mono text-[10px] font-bold tracking-wider text-slate-500">
                      FASA {zone.num}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 tracking-tight">{hs.title}</h4>
                  <p className="text-xs leading-relaxed text-slate-600">{hs.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────── */
/*  MAIN COMPONENT (Emons-Style Scrolly Flight)                */
/* ─────────────────────────────────────────────────────────── */

interface Props {
  onOpenDonate?: () => void
}

export function PortalInteractiveEcosystem({ onOpenDonate }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const [openHs, setOpenHs] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const zone = ZONES[activeIdx]

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Buttery-smooth spring damping physics (emulates the Emons inertia flight)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 26,
    restDelta: 0.0005,
  })

  // Camera flies horizontally across the 5-panel track: total travel = 400vw
  const cameraX = useTransform(smoothProgress, [0, 1], ['0vw', `${-(ZONE_COUNT - 1) * 100}vw`])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(ZONE_COUNT - 1, Math.floor(v * ZONE_COUNT))
    if (i !== activeIdx) {
      setActiveIdx(i)
      setOpenHs(null)
      setIsTransitioning(true)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  })

  const toggleHs = useCallback((id: string) => {
    setOpenHs((cur) => (cur === id ? null : id))
  }, [])

  const scrollToZone = useCallback((i: number) => {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const scrollable = rect.height - window.innerHeight
    const target = rect.top + window.scrollY + ((i + 0.5) / ZONE_COUNT) * scrollable
    window.scrollTo({ top: target, behavior: 'smooth' })
  }, [])

  const nextZone = useCallback(() => {
    if (activeIdx < ZONE_COUNT - 1) {
      scrollToZone(activeIdx + 1)
    }
  }, [activeIdx, scrollToZone])

  const prevZone = useCallback(() => {
    if (activeIdx > 0) {
      scrollToZone(activeIdx - 1)
    }
  }, [activeIdx, scrollToZone])

  // Keyboard navigation support (Arrow keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const el = sectionRef.current
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            nextZone()
          }
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const el = sectionRef.current
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            prevZone()
          }
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextZone, prevZone])

  return (
    <section
      id="agihan"
      ref={sectionRef}
      className="relative"
      style={{ height: `${TRACK_HEIGHT_VH}vh` }}
    >
      {/* Sticky full-viewport flight stage */}
      <div className="sticky top-0 h-screen overflow-hidden bg-slate-950 select-none">
        
        {/* ── Cinematic Anamorphic Light Streak Transition ── */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.85, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 1.5 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="pointer-events-none absolute inset-y-0 z-40 w-full"
              style={{
                background: `linear-gradient(90deg, transparent 0%, ${zone.accentGlow} 50%, transparent 100%)`,
              }}
            />
          )}
        </AnimatePresence>

        {/* ── Horizontal flight track (camera flies through) ── */}
        <motion.div className="flex h-full will-change-transform" style={{ x: cameraX }}>
          {ZONES.map((z, i) => (
            <ZonePanel
              key={z.id}
              zone={z}
              index={i}
              progress={smoothProgress}
              active={i === activeIdx}
              openHs={openHs}
              onToggleHs={toggleHs}
            />
          ))}
        </motion.div>

        {/* ── Top Control HUD Bar ── */}
        <div className="absolute top-0 left-0 right-0 z-30 flex flex-wrap items-center justify-between gap-3 p-4 sm:p-6">
          <div className="flex items-center gap-2">
            <motion.div
              key={`badge-${zone.id}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Badge
                className="border-0 px-4 py-1.5 text-xs font-extrabold text-white shadow-2xl tracking-wide"
                style={{ backgroundColor: zone.themeColor }}
              >
                Fasa {zone.num} : {zone.shortLabel}
              </Badge>
            </motion.div>
            <Badge
              variant="outline"
              className="hidden border-emerald-500/40 bg-black/60 text-xs font-medium text-emerald-400 backdrop-blur-xl sm:inline-flex"
            >
              <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
              SOP Pengurusan Asnaf Terkawal
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/70 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-xl shadow-lg">
              <Compass className="h-3.5 w-3.5 text-purple-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span className="hidden sm:inline">Skrol untuk Terbang Meneroka</span>
              <span className="sm:hidden">Skrol Terbang</span>
            </span>
          </div>
        </div>

        {/* ── Quick Fly-Through Side Buttons (Emons Touch Control) ── */}
        <div className="pointer-events-none absolute inset-y-0 left-4 right-4 z-30 flex items-center justify-between sm:left-6 sm:right-6">
          <button
            type="button"
            onClick={prevZone}
            disabled={activeIdx === 0}
            aria-label="Zon Sebelumnya"
            className={`pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/90 text-slate-900 shadow-2xl backdrop-blur-2xl transition-all duration-200 active:scale-90 hover:scale-110 hover:bg-white hover:text-black ${
              activeIdx === 0 ? 'opacity-0 pointer-events-none' : 'opacity-85 hover:opacity-100'
            }`}
          >
            <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
          </button>

          <button
            type="button"
            onClick={nextZone}
            disabled={activeIdx === ZONE_COUNT - 1}
            aria-label="Zon Seterusnya"
            className={`pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/90 text-slate-900 shadow-2xl backdrop-blur-2xl transition-all duration-200 active:scale-90 hover:scale-110 hover:bg-white hover:text-black ${
              activeIdx === ZONE_COUNT - 1 ? 'opacity-0 pointer-events-none' : 'opacity-85 hover:opacity-100'
            }`}
          >
            <ChevronRight className="h-6 w-6 stroke-[2.5]" />
          </button>
        </div>

        {/* ── Floating Stats Overlay (Desktop Right View) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`stats-${zone.id}`}
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1/2 right-4 z-30 hidden -translate-y-1/2 flex-col gap-3 sm:right-8 md:flex"
          >
            {zone.stats.map((s) => (
              <div
                key={s.label}
                className="min-w-44 rounded-2xl border border-white/20 bg-black/75 p-4 shadow-2xl backdrop-blur-2xl hover:border-white/40 transition-colors"
              >
                <span className="block text-[10px] uppercase font-bold tracking-widest text-white/50">{s.label}</span>
                <span className="block text-2xl font-black text-white tracking-tight mt-0.5">{s.value}</span>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Exact Emons Floating Bottom-Left Hero Story Card ── */}
        <div className="absolute bottom-24 left-4 z-30 max-w-lg sm:bottom-28 sm:left-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`card-${zone.id}`}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 rounded-3xl border border-white/60 bg-white/95 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.3)] backdrop-blur-2xl text-slate-900"
            >
              <div className="space-y-2">
                <span
                  className="inline-block text-xs font-black uppercase tracking-wider"
                  style={{ color: zone.themeColor }}
                >
                  {zone.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight text-slate-900">
                  {zone.name}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 font-normal">{zone.desc}</p>
              </div>

              {/* Stats pill badges inside card */}
              <div className="grid grid-cols-2 gap-2.5 border-t border-slate-100 pt-3">
                {zone.stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-slate-200/70 bg-slate-50/80 p-3">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">{s.label}</span>
                    <span className="text-base font-black text-slate-900">{s.value}</span>
                  </div>
                ))}
              </div>

              {/* Dual Action Buttons exactly matching Emons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <Button
                  onClick={onOpenDonate}
                  size="default"
                  className="h-11 flex-1 gap-2 rounded-full border-0 px-6 text-xs font-bold text-white shadow-lg transition-all duration-200 active:scale-95 hover:brightness-110"
                  style={{ backgroundColor: zone.themeColor }}
                >
                  <Heart className="h-4 w-4 fill-white" />
                  Infaq Fasa Ini
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => scrollToZone((activeIdx + 1) % ZONE_COUNT)}
                  className="h-11 rounded-full border-slate-300 bg-white px-5 text-xs font-bold text-slate-800 shadow-sm hover:bg-slate-100 active:scale-95"
                >
                  Fasa Seterusnya
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Exact Emons Connected Bottom Timeline Scrubber ── */}
        <div className="absolute right-0 bottom-0 left-0 z-30 border-t border-white/20 bg-black/85 px-4 py-4 backdrop-blur-2xl sm:px-8">
          <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4">
            
            {/* Timeline navigation items with connected lines */}
            <div className="flex flex-1 items-center gap-2 overflow-x-auto scrollbar-none py-1">
              {ZONES.map((z, i) => {
                const active = i === activeIdx
                const Icon = z.icon
                return (
                  <div key={z.id} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => scrollToZone(i)}
                      className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold whitespace-nowrap transition-all duration-300 active:scale-95 ${
                        active
                          ? 'scale-105 text-white shadow-2xl ring-2 ring-white/40'
                          : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/15 hover:text-white'
                      }`}
                      style={
                        active
                          ? { backgroundColor: z.themeColor, boxShadow: `0 4px 20px ${z.accentGlow}` }
                          : undefined
                      }
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/30 font-mono text-[10px] font-black">
                        {z.num}
                      </span>
                      <Icon className="h-4 w-4" />
                      <span className="hidden md:inline">{z.shortLabel}</span>
                    </button>

                    {/* Connecting line between tabs */}
                    {i < ZONE_COUNT - 1 && (
                      <div className="hidden h-[2px] w-6 bg-white/20 sm:block" />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Right End CTA: "Semua Fasa →" */}
            <Button
              onClick={onOpenDonate}
              size="default"
              className="hidden h-10 shrink-0 gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-6 text-xs font-extrabold text-white shadow-xl hover:from-emerald-600 hover:to-teal-700 active:scale-95 sm:flex"
            >
              Semua Fasa PUSPA
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}
