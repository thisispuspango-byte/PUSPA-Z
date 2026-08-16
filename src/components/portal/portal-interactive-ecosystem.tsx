'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion'
import {
  UtensilsCrossed,
  PackageCheck,
  Truck,
  Building2,
  Rocket,
  Plus,
  X,
  ArrowRight,
  Heart,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Compass,
  CheckCircle2,
  Info,
  Clock,
  Sparkles
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

/* ─────────────────────────────────────────────────────────── */
/*  DATA DEFINITIONS & EMONS HOTSPOT SPECIFICATIONS            */
/* ─────────────────────────────────────────────────────────── */

export interface HotspotDetail {
  id: string
  title: string
  tag: string
  desc: string
  x: number // percentage 0-100
  y: number // percentage 0-100
  status: string
  glance: { label: string; value: string }[]
  ctaText?: string
}

export interface ZoneInfo {
  id: string
  num: string
  name: string
  shortLabel: string
  subtitle: string
  desc: string
  icon: typeof UtensilsCrossed
  targetTime: number // target video timestamp in seconds (0 - 28s)
  timeRange: [number, number]
  themeColor: string
  accentGlow: string
  stats: { label: string; value: string }[]
  hotspots: HotspotDetail[]
}

const ZONES: ZoneInfo[] = [
  {
    id: 'dapur',
    num: '01',
    name: 'Dapur Pusat & Juadah Barakah',
    shortLabel: 'Dapur Barakah',
    subtitle: 'Penyediaan 600+ Pek Makanan Panas Berkhasiat',
    desc: 'Dapur berpusat PUSPA beroperasi seawal jam 6:00 pagi memasak hidangan bernutrisi tinggi dengan standard kebersihan ketat sebelum dimuatkan ke dalam armada penghantaran.',
    icon: UtensilsCrossed,
    targetTime: 2.0,
    timeRange: [0, 5.0],
    themeColor: '#7C3AED',
    accentGlow: 'rgba(124, 58, 237, 0.45)',
    stats: [
      { label: 'Kapasiti Harian', value: '800 Pek' },
      { label: 'Kawalan Suhu', value: 'Min 65°C' },
    ],
    hotspots: [
      {
        id: 'h1',
        title: 'Stesen Kuali Industri & Kawalan Nutrisi',
        tag: 'Penyediaan Makanan',
        desc: 'Memasak lauk berkhasiat secara pukal menggunakan standard kebersihan HALAL & MeSTI di bawah pengawasan chef sukarelawan terlatih.',
        x: 32,
        y: 44,
        status: 'Penyediaan Aktif',
        glance: [
          { label: 'Pensijilan', value: 'HALAL & MeSTI Patuh' },
          { label: 'Keluaran Kawah', value: '250 Hidangan / Batch' },
          { label: 'Kawalan Kualiti', value: 'Pemeriksaan Suhu & Rasa' },
        ],
        ctaText: 'Taja Bahan Mentah Dapur',
      },
      {
        id: 'h2',
        title: 'Meja Pembungkusan Pantas & Vakum',
        tag: 'Pembungkusan Mesra Alam',
        desc: 'Pembungkusan bekas mesra alam tahan haba untuk mengekalkan kesegaran dan mengelakkan tumpahan semasa perjalanan jauh ke pedalaman.',
        x: 62,
        y: 58,
        status: 'Standard Kebersihan 100%',
        glance: [
          { label: 'Jenis Bekas', value: 'Biodegradable & Tahan Haba' },
          { label: 'Kelajuan Pek', value: '12 Pek / Minit' },
          { label: 'Standard', value: 'Zero Plastic Single-Use' },
        ],
        ctaText: 'Taja Bekas Mesra Alam',
      },
    ],
  },
  {
    id: 'gudang',
    num: '02',
    name: 'Gudang Simpanan & Barangan Kering',
    shortLabel: 'Gudang Ihsan',
    subtitle: 'Pengurusan Inventori Barakah Bersistematik',
    desc: 'Gudang simpanan beras, minyak, tepung, dan bekalan keperluan asas keluarga asnaf dengan sistem kod bar pintar bagi mengelakkan pembaziran dan memastikan ketelusan stok.',
    icon: PackageCheck,
    targetTime: 8.0,
    timeRange: [5.0, 11.0],
    themeColor: '#0EA5E9',
    accentGlow: 'rgba(14, 165, 233, 0.45)',
    stats: [
      { label: 'Kotak Keperluan', value: '1,200 Kotak/Bulan' },
      { label: 'Kawalan Stok', value: 'Sistem FIFO Pintar' },
    ],
    hotspots: [
      {
        id: 'h3',
        title: 'Rak Simpanan Bertingkat & Sistem FIFO',
        tag: 'Pengurusan Stok',
        desc: 'Penyusunan berasaskan tarikh luput (First-In, First-Out) dengan kod bar bagi memastikan tiada bekalan makanan yang rosak atau terbiar.',
        x: 42,
        y: 40,
        status: 'Stok Terkawal',
        glance: [
          { label: 'Kapasiti Rak', value: '50 Tan Metrik' },
          { label: 'Sistem Jejak', value: 'Imbasan Kod Bar Real-Time' },
          { label: 'Ketepatan Stok', value: '99.8% Audit Bersih' },
        ],
        ctaText: 'Taja Barangan Asas Kering',
      },
      {
        id: 'h4',
        title: 'Zon Susun Kotak Kasih Asnaf',
        tag: 'Penyediaan Kit Kasih',
        desc: 'Sukarelawan membungkus kit makanan asas seberat 15kg yang mengandungi 10 barangan dapur penting bagi setiap keluarga penerima terpilih.',
        x: 68,
        y: 56,
        status: 'Agihan Mingguan',
        glance: [
          { label: 'Berat Kotak', value: '15 KG / Keluarga' },
          { label: 'Item Utama', value: 'Beras, Minyak, Gandum, Susu' },
          { label: 'Ketahanan', value: 'Bekalan 1 Bulan Penuh' },
        ],
        ctaText: 'Taja 1 Kotak Makanan (RM100)',
      },
    ],
  },
  {
    id: 'armada',
    num: '03',
    name: 'Logistik & Armada Konvoi Agihan',
    shortLabel: 'Konvoi Armada',
    subtitle: 'Menembusi Lorong Sempit & Komuniti Pedalaman',
    desc: 'Konvoi kenderaan pacuan empat roda dan motosikal sukarelawan menghantar makanan terus ke pintu rumah penerima tanpa perantara dengan sistem koordinat GPS.',
    icon: Truck,
    targetTime: 14.0,
    timeRange: [11.0, 17.0],
    themeColor: '#059669',
    accentGlow: 'rgba(5, 150, 105, 0.45)',
    stats: [
      { label: 'Zon Liputan', value: 'Lembah Klang & Pedalaman' },
      { label: 'Masa Sampai', value: '< 90 Minit' },
    ],
    hotspots: [
      {
        id: 'h5',
        title: 'Pusat Pelepasan Konvoi & Navigasi GPS',
        tag: 'Pusat Logistik',
        desc: 'Pemeriksaan keselamatan kenderaan dan penetapan laluan agihan melalui sistem navigasi GPS pintar bagi memaksimumkan kelajuan penghantaran.',
        x: 36,
        y: 60,
        status: 'Laluan Dioptimumkan',
        glance: [
          { label: 'Armada Aktif', value: '6 Van & 14 Motosikal' },
          { label: 'Radius Operasi', value: '120 KM Setiap Misi' },
          { label: 'Masa Respons', value: 'Penghantaran Pantas' },
        ],
        ctaText: 'Taja Kos Bahan Api Konvoi',
      },
      {
        id: 'h6',
        title: 'Skuad Motosikal Cepat Lorong Sempit',
        tag: 'Skuad Bergerak',
        desc: 'Menembusi kawasan flat bertingkat tinggi, lorong kampung berliku, dan rumah terpencil yang tidak dapat dilalui kenderaan besar.',
        x: 66,
        y: 46,
        status: 'Sedia Gerak',
        glance: [
          { label: 'Akses Laluan', value: '100% Lorong Sempit' },
          { label: 'Kapasiti Beg', value: '20 Pek Panas / Trip' },
          { label: 'Sukarelawan', value: 'Penunggang Tempatan Terlatih' },
        ],
        ctaText: 'Daftar Sukarelawan Konvoi',
      },
    ],
  },
  {
    id: 'komuniti',
    num: '04',
    name: '8 Rumah Kebajikan & Pusat Tahfiz',
    shortLabel: '8 RK & Tahfiz',
    subtitle: 'Santunan Warga Emas, Anak Yatim & Penuntut Ilmu',
    desc: 'Penerimaan agihan di lapan buah rumah kebajikan rakan kerjasama dan madrasah tahfiz terpilih setiap hari Jumaat secara berjadual dengan pemantauan nutrisi.',
    icon: Building2,
    targetTime: 20.0,
    timeRange: [17.0, 23.0],
    themeColor: '#D97706',
    accentGlow: 'rgba(217, 119, 6, 0.45)',
    stats: [
      { label: 'Penghuni Disantuni', value: '450+ Jiwa' },
      { label: 'Kekerapan', value: 'Setiap Jumaat Berterusan' },
    ],
    hotspots: [
      {
        id: 'h7',
        title: 'Dewan Selera Rumah Warga Emas',
        tag: 'Santunan Warga Emas',
        desc: 'Makanan panas dihidangkan segar oleh sukarelawan bersama sesi ramah mesra dan semakan kesihatan ringan untuk warga emas terabai.',
        x: 48,
        y: 50,
        status: 'Santunan Kasih',
        glance: [
          { label: 'Jumlah Institusi', value: '8 Rumah Rakan Kerjasama' },
          { label: 'Pakej Makanan', value: 'Diet Khas Rendah Gula/Garam' },
          { label: 'Interaksi', value: 'Bimbingan Kasih & Emosi' },
        ],
        ctaText: 'Infaq Program Warga Emas',
      },
      {
        id: 'h8',
        title: 'Pusat Tahfiz & Asrama Pelajar Asnaf',
        tag: 'Pendidikan & Nutrisi',
        desc: 'Bekalan protein dan nutrisi mencukupi untuk menyokong hafazan Al-Quran dan pembelajaran anak-anak yatim serta pelajar asnaf.',
        x: 72,
        y: 38,
        status: 'Penerima Tetap',
        glance: [
          { label: 'Pelajar Terlibat', value: '280+ Penuntut Ilmu' },
          { label: 'Jadual Agihan', value: 'Makan Tengah Hari Jumaat' },
          { label: 'Impak Nutrisi', value: 'Peningkatan Fokus Hafazan' },
        ],
        ctaText: 'Taja Makan Pelajar Tahfiz',
      },
    ],
  },
  {
    id: 'hab',
    num: '05',
    name: 'Hab Transformasi & Pengurusan Asnaf',
    shortLabel: 'Hab Transformasi',
    subtitle: 'Pusat Data Maria AI & Studio Asnafpreneur',
    desc: 'Kompleks operasi pintar PUSPA yang menempatkan bilik kawalan Maria AI, audit ketelusan dana, dan studio bimbingan modal niaga asnaf agar mandiri.',
    icon: Rocket,
    targetTime: 26.0,
    timeRange: [23.0, 28.0],
    themeColor: '#2563EB',
    accentGlow: 'rgba(37, 99, 235, 0.45)',
    stats: [
      { label: 'Usahawan Terbimbing', value: '124 Usahawan' },
      { label: 'Verifikasi eKYC', value: 'Pantas & Patuh' },
    ],
    hotspots: [
      {
        id: 'h9',
        title: 'Bilik Kawalan & Radar Maria AI Engine',
        tag: 'Pusat Data & AI',
        desc: 'Semakan integriti data pemohon, padanan had kifayah berasaskan AI, dan pemantauan live audit kutipan infaq secara telus.',
        x: 44,
        y: 42,
        status: 'Sistem Aktif 24/7',
        glance: [
          { label: 'Enjin AI', value: 'Maria Puspa Autonomous Engine' },
          { label: 'Kelajuan eKYC', value: '< 3 Minit Pengesahan' },
          { label: 'Ketelusan Audit', value: '100% Data Boleh Dijejak' },
        ],
        ctaText: 'Ketahui Mengenai Maria AI',
      },
      {
        id: 'h10',
        title: 'Studio Inkubator Asnafpreneur',
        tag: 'Bimbingan Mandiri',
        desc: 'Bimbingan modal permulaan, latihan pembungkusan produk, dan pemasaran digital agar keluarga asnaf mampu keluar dari garis kemiskinan.',
        x: 70,
        y: 62,
        status: 'Sesi Bimbingan',
        glance: [
          { label: 'Perniagaan Lahir', value: '45 Jenama Mikro' },
          { label: 'Peningkatan Hasil', value: '+180% Pendapatan Keluarga' },
          { label: 'Matlamat Utama', value: 'Asnaf Berubah Menjadi Pembayar Zakat' },
        ],
        ctaText: 'Taja Modal Asnafpreneur',
      },
    ],
  },
]

const TOTAL_VIDEO_DURATION = 28.0
const TRACK_HEIGHT_VH = 500

/* ─────────────────────────────────────────────────────────── */
/*  MAIN INTERACTIVE ECOSYSTEM COMPONENT (EMONS STANDARD)      */
/* ─────────────────────────────────────────────────────────── */

interface PortalInteractiveEcosystemProps {
  onOpenDonate?: () => void
}

export function PortalInteractiveEcosystem({ onOpenDonate }: PortalInteractiveEcosystemProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const [activeZoneIndex, setActiveZoneIndex] = useState<number>(0)
  const [selectedHotspot, setSelectedHotspot] = useState<HotspotDetail | null>(null)
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false)

  // Scroll tracking across 500vh
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Spring-damped progress for silky-smooth Emons flight
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  })

  // Synchronize master video time frame-accurately with scroll progress
  useMotionValueEvent(smoothProgress, 'change', (latestProgress) => {
    const clamped = Math.max(0, Math.min(1, latestProgress))
    const targetSeconds = clamped * TOTAL_VIDEO_DURATION

    // Scrub video currentTime frame-by-frame
    if (videoRef.current && videoLoaded) {
      if (Math.abs(videoRef.current.currentTime - targetSeconds) > 0.05) {
        videoRef.current.currentTime = targetSeconds
      }
    }

    // Determine current active zone based on timestamp
    let foundIndex = 0
    for (let i = 0; i < ZONES.length; i++) {
      const [start, end] = ZONES[i].timeRange
      if (targetSeconds >= start && targetSeconds <= end) {
        foundIndex = i
        break
      } else if (targetSeconds > end && i === ZONES.length - 1) {
        foundIndex = i
      }
    }

    if (foundIndex !== activeZoneIndex) {
      setActiveZoneIndex(foundIndex)
      // Close hotspot drawer if we scrubbed far away
      if (selectedHotspot) {
        const belongsToActive = ZONES[foundIndex].hotspots.some((h) => h.id === selectedHotspot.id)
        if (!belongsToActive) {
          setSelectedHotspot(null)
        }
      }
    }
  })

  // Navigate directly to a zone by clicking bottom tab or arrow
  const navigateToZone = useCallback((index: number) => {
    if (!containerRef.current) return
    const targetZone = ZONES[index]
    if (!targetZone) return

    // Calculate scroll offset within container
    const containerTop = containerRef.current.offsetTop
    const totalScrollableHeight = containerRef.current.scrollHeight - window.innerHeight
    const targetScrollRatio = targetZone.targetTime / TOTAL_VIDEO_DURATION
    const targetY = containerTop + totalScrollableHeight * targetScrollRatio

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    })

    // Also update video directly for instant responsiveness
    if (videoRef.current) {
      videoRef.current.currentTime = targetZone.targetTime
    }
    setActiveZoneIndex(index)
    setSelectedHotspot(null)
  }, [])

  // Keyboard arrow navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (activeZoneIndex < ZONES.length - 1) {
          navigateToZone(activeZoneIndex + 1)
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (activeZoneIndex > 0) {
          navigateToZone(activeZoneIndex - 1)
        }
      } else if (e.key === 'Escape') {
        setSelectedHotspot(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeZoneIndex, navigateToZone])

  const activeZone = ZONES[activeZoneIndex]

  return (
    <section
      id="agihan"
      ref={containerRef}
      className="relative w-full bg-black text-white"
      style={{ height: `${TRACK_HEIGHT_VH}vh` }}
    >
      {/* ── STICKY VIEWPORT (Viewport Lock-Fit) ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black select-none">

        {/* ── 1. SINGLE CONTINUOUS MASTER VIDEO (EMONS ENGINE) ── */}
        <div className="absolute inset-0 h-full w-full overflow-hidden">
          <video
            ref={videoRef}
            src="/videos/puspa-continuous-ecosystem.mp4"
            poster="/diorama-01.jpg"
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setVideoLoaded(true)}
            className="h-full w-full object-cover object-center will-change-transform"
          />

          {/* Cinematic Vignette & Atmospheric Contrast Gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/50" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/75 via-transparent to-black/45" />

          {/* Ambient Dynamic Zone Lighting Glow */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-1000 opacity-25 mix-blend-screen"
            style={{
              background: `radial-gradient(circle at 50% 60%, ${activeZone.accentGlow} 0%, transparent 70%)`,
            }}
          />
        </div>

        {/* ── 2. EMONS 3D SONAR RADAR HOTSPOTS (+ / ×) ── */}
        <AnimatePresence>
          {activeZone.hotspots.map((hs) => {
            const isOpen = selectedHotspot?.id === hs.id
            return (
              <motion.div
                key={hs.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute z-30"
                style={{ left: `${hs.x}%`, top: `${hs.y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <div className="relative flex items-center justify-center">
                  {/* Outer Sonar Pulse Ring */}
                  {!isOpen && (
                    <span
                      className="pointer-events-none absolute h-12 w-12 rounded-full border opacity-75 animate-ping"
                      style={{ borderColor: activeZone.themeColor }}
                    />
                  )}
                  {!isOpen && (
                    <span
                      className="pointer-events-none absolute h-8 w-8 rounded-full opacity-40 animate-pulse"
                      style={{ backgroundColor: activeZone.themeColor }}
                    />
                  )}

                  {/* Hotspot Toggle Button (+ to ×) */}
                  <button
                    id={`hotspot-${hs.id}`}
                    onClick={() => setSelectedHotspot(isOpen ? null : hs)}
                    className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/40 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-md"
                    style={{
                      backgroundColor: isOpen ? '#EF4444' : 'rgba(255, 255, 255, 0.95)',
                      color: isOpen ? '#FFFFFF' : '#0F172A',
                      boxShadow: `0 0 25px ${activeZone.accentGlow}`,
                    }}
                    title={hs.title}
                  >
                    {isOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4 stroke-[3]" />}
                  </button>

                  {/* Emons Mini Hover Pill Badge */}
                  {!isOpen && (
                    <div className="pointer-events-none absolute top-full mt-2 whitespace-nowrap rounded-md bg-black/80 px-2.5 py-1 text-[11px] font-semibold text-white/90 shadow-lg backdrop-blur-md border border-white/10">
                      {hs.title}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>

        {/* ── 3. EMONS FIXED LEFT GLASSMORPHISM OVERLAY CARD ── */}
        <div className="pointer-events-none absolute inset-x-0 bottom-24 top-20 z-20 flex items-end p-4 sm:p-8 md:p-12">
          <motion.div
            key={activeZone.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="pointer-events-auto max-w-lg rounded-2xl border border-white/15 bg-black/60 p-6 shadow-2xl backdrop-blur-2xl md:p-8"
          >
            {/* Top Badge & Subtitle */}
            <div className="mb-3 flex items-center gap-2">
              <Badge
                className="font-mono text-xs font-bold uppercase tracking-wider"
                style={{
                  backgroundColor: `${activeZone.themeColor}25`,
                  color: activeZone.themeColor,
                  borderColor: `${activeZone.themeColor}50`,
                }}
              >
                FASA {activeZone.num}
              </Badge>
              <span className="text-xs font-medium text-white/70 tracking-wide uppercase">
                {activeZone.subtitle}
              </span>
            </div>

            {/* Zone Main Title */}
            <h2 className="mb-3 text-2xl font-black tracking-tight text-white sm:text-3xl md:text-4xl">
              {activeZone.name}
            </h2>

            {/* Operational Story Description */}
            <p className="mb-6 text-xs sm:text-sm leading-relaxed text-zinc-300 font-normal">
              {activeZone.desc}
            </p>

            {/* Dynamic Metric Badges */}
            <div className="mb-6 grid grid-cols-2 gap-3">
              {activeZone.stats.map((st, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-md"
                >
                  <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                    {st.label}
                  </p>
                  <p className="mt-0.5 text-base sm:text-lg font-extrabold text-white">
                    {st.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-wrap items-center gap-3">
              <Button
                onClick={onOpenDonate}
                className="group relative flex-1 overflow-hidden rounded-xl font-bold shadow-lg transition-all duration-300 hover:scale-[1.02]"
                style={{
                  backgroundColor: activeZone.themeColor,
                  color: '#FFFFFF',
                  boxShadow: `0 0 20px ${activeZone.accentGlow}`,
                }}
              >
                <Heart className="mr-2 h-4 w-4 fill-white" />
                Infaq Sedekah Fasa Ini
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  if (activeZone.hotspots[0]) {
                    setSelectedHotspot(activeZone.hotspots[0])
                  }
                }}
                className="rounded-xl border-white/20 bg-white/5 text-xs text-white hover:bg-white/15"
              >
                <Info className="mr-1.5 h-3.5 w-3.5" />
                Info Lanjut
              </Button>
            </div>
          </motion.div>
        </div>

        {/* ── 4. EMONS RIGHT-SIDE FLYOUT DETAIL DRAWER (When Hotspot Clicked) ── */}
        <AnimatePresence>
          {selectedHotspot && (
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: '0%', opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 30 }}
              className="absolute right-0 top-0 bottom-24 z-40 w-full max-w-md bg-zinc-950/90 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl border-l border-white/15 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* Header with Close Button */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                  <div className="flex items-center gap-2">
                    <Badge
                      className="text-[10px] font-bold uppercase tracking-wider"
                      style={{
                        backgroundColor: `${activeZone.themeColor}30`,
                        color: activeZone.themeColor,
                        borderColor: `${activeZone.themeColor}60`,
                      }}
                    >
                      {selectedHotspot.tag}
                    </Badge>
                    <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400">
                      <CheckCircle2 className="h-3 w-3" />
                      {selectedHotspot.status}
                    </span>
                  </div>

                  <button
                    onClick={() => setSelectedHotspot(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Hotspot Title */}
                <h3 className="text-xl sm:text-2xl font-black text-white mb-3">
                  {selectedHotspot.title}
                </h3>

                {/* Hotspot Full Description */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-6">
                  {selectedHotspot.desc}
                </p>

                {/* Emons "At a glance" Key Metrics Breakdown */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-6">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5" style={{ color: activeZone.themeColor }} />
                    Spesifikasi & Audit Di Lokasi (At a glance)
                  </h4>
                  <div className="divide-y divide-white/10">
                    {selectedHotspot.glance.map((item, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                        <span className="text-zinc-400">{item.label}</span>
                        <span className="font-semibold text-white text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom CTA within Drawer */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
                <Button
                  onClick={onOpenDonate}
                  className="w-full rounded-xl font-bold shadow-lg"
                  style={{
                    backgroundColor: activeZone.themeColor,
                    color: '#FFFFFF',
                  }}
                >
                  <Heart className="mr-2 h-4 w-4 fill-white" />
                  {selectedHotspot.ctaText || 'Infaq Untuk Fasa Ini'}
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedHotspot(null)}
                  className="w-full text-xs text-zinc-400 hover:text-white"
                >
                  Tutup Paparan Terperinci
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── 5. EMONS BOTTOM TIMELINE SCRUBBER BAR ── */}
        <div className="absolute inset-x-0 bottom-0 z-30 border-t border-white/10 bg-black/80 p-3 sm:p-4 backdrop-blur-2xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-4">

            {/* Quick Step Previous Chevron */}
            <button
              onClick={() => {
                if (activeZoneIndex > 0) navigateToZone(activeZoneIndex - 1)
              }}
              disabled={activeZoneIndex === 0}
              className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none"
              title="Fasa Sebelumnya"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Emons Numbered Zone Scrubber Buttons */}
            <div className="relative flex flex-1 items-center justify-between gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
              {ZONES.map((z, idx) => {
                const isActive = activeZoneIndex === idx
                const Icon = z.icon
                return (
                  <button
                    key={z.id}
                    id={`zone-tab-${z.id}`}
                    onClick={() => navigateToZone(idx)}
                    className="group relative flex flex-1 items-center justify-center gap-1.5 sm:gap-2 rounded-xl py-2 px-2.5 sm:px-4 text-xs font-bold transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? `${z.themeColor}30` : 'transparent',
                      color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                      borderColor: isActive ? z.themeColor : 'transparent',
                    }}
                  >
                    {/* Active Bottom Glow Line Indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeZoneIndicator"
                        className="absolute inset-0 rounded-xl border"
                        style={{
                          borderColor: z.themeColor,
                          boxShadow: `0 0 15px ${z.accentGlow}`,
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      />
                    )}

                    <span className="font-mono text-[11px] opacity-75">{z.num}</span>
                    <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: isActive ? z.themeColor : undefined }} />
                    <span className="truncate hidden md:inline text-[11px] sm:text-xs">
                      {z.shortLabel}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Quick Step Next Chevron */}
            <button
              onClick={() => {
                if (activeZoneIndex < ZONES.length - 1) navigateToZone(activeZoneIndex + 1)
              }}
              disabled={activeZoneIndex === ZONES.length - 1}
              className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none"
              title="Fasa Seterusnya"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            {/* Quick Infaq Action CTA */}
            <Button
              onClick={onOpenDonate}
              size="sm"
              className="shrink-0 rounded-xl bg-fuchsia-600 px-3 sm:px-4 text-xs font-bold text-white shadow-lg hover:bg-fuchsia-500"
            >
              <Heart className="mr-1.5 h-3.5 w-3.5 fill-white" />
              <span className="hidden sm:inline">Infaq</span> Jumaat
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}
