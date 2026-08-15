'use client'

import * as React from 'react'
import { useState, useRef, useCallback } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValueEvent,
  type MotionValue,
} from 'framer-motion'
import Image from 'next/image'
import {
  Utensils,
  PackageCheck,
  Truck,
  Building2,
  Rocket,
  Plus,
  Heart,
  ArrowRight,
  ShieldCheck,
  MousePointerClick,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

/* ─────────────────────────────────────────────────────────── */
/*  ZONE DATA                                                  */
/* ─────────────────────────────────────────────────────────── */

interface Hotspot {
  id: string
  title: string
  desc: string
  x: number
  y: number
  status: string
}

interface ZoneInfo {
  id: string
  num: string
  name: string
  shortLabel: string
  category: string
  subtitle: string
  desc: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  diorama: string
  themeColor: string
  stats: { label: string; value: string }[]
  hotspots: Hotspot[]
}

const ZONES: ZoneInfo[] = [
  {
    id: 'dapur-pusat',
    num: '01',
    name: 'Dapur Pusat & Juadah Barakah',
    shortLabel: 'Dapur Barakah',
    category: 'Penyediaan Makanan',
    subtitle: '600+ Pek Makanan Panas Setiap Jumaat',
    desc: 'Dapur berpusat PUSPA beroperasi seawal jam 6 pagi memasak hidangan seimbang dan bernutrisi tinggi sebelum dimuatkan ke dalam armada penghantaran.',
    icon: Utensils,
    diorama: '/diorama-01.jpg',
    themeColor: '#9333EA',
    stats: [
      { label: 'Kapasiti Harian', value: '800 Pek' },
      { label: 'Kawalan Suhu', value: 'Min 65°C' },
    ],
    hotspots: [
      { id: 'h1', title: 'Kawah Memasak Barakah', desc: 'Penyediaan nasi minyak, lauk ayam berempah dan sayur seimbang untuk 8 rumah kebajikan.', x: 28, y: 42, status: 'Memasak Aktif' },
      { id: 'h2', title: 'Stesen Pembungkusan Haba', desc: 'Juadah dipateri dalam bekas kedap udara bagi mengekalkan kehangatan dan kebersihan.', x: 68, y: 50, status: 'Penyegelan Haba' },
    ],
  },
  {
    id: 'gudang-ihsan',
    num: '02',
    name: 'Pusat Logistik & Kotak Dapur Ihsan',
    shortLabel: 'Gudang Ihsan',
    category: 'Bekalan Makanan Asas',
    subtitle: 'Pengurusan Stok & Agihan Asnaf',
    desc: 'Gudang simpanan barangan asas (beras, minyak masak, tepung, makanan kering) yang dibungkus rapi dalam Kotak Ihsan bernilai RM150/keluarga.',
    icon: PackageCheck,
    diorama: '/diorama-02.jpg',
    themeColor: '#E11D48',
    stats: [
      { label: 'Stok Kotak', value: '1,200 Kotak' },
      { label: 'Ketepatan Agihan', value: '99.8%' },
    ],
    hotspots: [
      { id: 'h3', title: 'Rak Simpanan Beras & Makanan Kering', desc: 'Inventori makanan asas berputar mengikut kaedah FIFO untuk jaminan kesegaran.', x: 35, y: 38, status: 'Inventori Terkawal' },
      { id: 'h4', title: 'Stesen Kotak RM150 Keluarga', desc: 'Sukarelawan menyusun pek makanan lengkap untuk 350+ keluarga fakir miskin setiap bulan.', x: 65, y: 58, status: 'Sedia Diedar' },
    ],
  },
  {
    id: 'armada',
    num: '03',
    name: 'Armada Van & Konvoi Lapangan PUSPA',
    shortLabel: 'Konvoi Armada',
    category: 'Logistik & Penghantaran',
    subtitle: '8 Zon Penghantaran Selangor & KL',
    desc: 'Pasukan sukarelawan berlepas serentak merentasi zon berjadual bagi memastikan makanan sampai panas ke institusi kebajikan sebelum solat Jumaat.',
    icon: Truck,
    diorama: '/diorama-03.jpg',
    themeColor: '#D97706',
    stats: [
      { label: 'Zon Liputan', value: '8 Zon Utama' },
      { label: 'Ketepatan Waktu', value: '100% On-Time' },
    ],
    hotspots: [
      { id: 'h5', title: 'Dermaga Pelepasan Van PUSPA', desc: 'Pek juadah dimuatkan terus ke van berpenebat khas bagi menjaga suhu hidangan.', x: 30, y: 55, status: 'Berlepas 11:00 AM' },
      { id: 'h6', title: 'Unit Mobiliti Bantuan Kilat', desc: 'Motosikal dan kenderaan ringan sukarelawan untuk laluan sempit dan perkampungan asnaf.', x: 72, y: 45, status: 'Siap Siaga' },
    ],
  },
  {
    id: 'institusi',
    num: '04',
    name: 'Rangkaian 8 Rumah Kebajikan & Tahfiz',
    shortLabel: '8 RK & Tahfiz',
    category: 'Santunan Warga Emas & Yatim',
    subtitle: 'Penerima Rutin Mingguan PUSPA',
    desc: 'Amanah infaq anda diraikan oleh lebih 600 penghuni rumah orang tua, anak yatim, dan pelajar tahfiz di seluruh Selangor & Lembah Klang.',
    icon: Building2,
    diorama: '/diorama-04.jpg',
    themeColor: '#059669',
    stats: [
      { label: 'Penerima Tetap', value: '8 RK + 1 MT' },
      { label: 'Jumlah Jiwa', value: '620 Orang' },
    ],
    hotspots: [
      { id: 'h7', title: 'Dewan Selera Rumah Al-Mukhlisin', desc: 'Juadah tengahari diagihkan terus kepada 45 warga emas dan pesakit uzur.', x: 40, y: 42, status: 'Penyerahan 12:30 PM' },
      { id: 'h8', title: 'Kompleks Mahad Tahfiz PUSPA', desc: '60 anak-anak tahfiz menerima sajian berkhasiat selepas tamat sesi hafazan Al-Quran.', x: 72, y: 55, status: 'Selesai Agih' },
    ],
  },
  {
    id: 'hab',
    num: '05',
    name: 'Pusat Operasi Maria AI & Asnafpreneur',
    shortLabel: 'Hab Transformasi',
    category: 'Tadbir Urus & Ekonomi Ummah',
    subtitle: 'Inkubator Keusahawanan & Audit Telus',
    desc: 'Kompleks operasi pintar PUSPA yang menempatkan bilik kawalan Maria AI dan studio bimbingan modal niaga asnaf.',
    icon: Rocket,
    diorama: '/diorama-05.jpg',
    themeColor: '#2563EB',
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

// Total scroll flight distance (5 zones × 120vh dwell each).
const TRACK_HEIGHT_VH = 600
const ZONE_COUNT = ZONES.length

/* ─────────────────────────────────────────────────────────── */
/*  ZONE PANEL  (one diorama on the horizontal flight track)   */
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
  // Dolly-in: approach 1.25→1 across the first third of the segment,
  // hold for the dwell, then a subtle push-out (1→1.04) before the cut.
  const segStart = index / ZONE_COUNT
  const segEnd = (index + 1) / ZONE_COUNT
  const scale = useTransform(
    progress,
    [segStart, segStart + 0.3, segEnd - 0.08, segEnd],
    [1.25, 1, 1, 1.04],
  )

  return (
    <div className="relative h-full w-screen shrink-0 overflow-hidden">
      {/* ── Diorama (dolly-in) ── */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src={zone.diorama}
          alt={zone.name}
          fill
          priority={index === 0}
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />
      </motion.div>

      {/* ── Vignette & gradient overlays ── */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* ── Interactive pulsing hotspots (fly with the diorama) ── */}
      {zone.hotspots.map((hs) => {
        const open = active && openHs === hs.id
        return (
          <div
            key={hs.id}
            className="absolute z-30"
            style={{ left: `${hs.x}%`, top: `${hs.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <button
              type="button"
              onClick={() => onToggleHs(hs.id)}
              aria-label={hs.title}
              className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 shadow-2xl transition-all duration-200 active:scale-[0.95] ${
                open
                  ? 'scale-110 border-white bg-white text-black ring-4 ring-white/30'
                  : 'border-white/60 bg-black/60 text-white backdrop-blur-xl hover:scale-110 hover:bg-white hover:text-black'
              } ${active ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
            >
              <Plus className={`h-5 w-5 transition-transform duration-200 ${open ? 'rotate-45' : ''}`} />
              {!open && active && (
                <span className="pointer-events-none absolute -inset-2 animate-ping rounded-full border-2 border-white/40" />
              )}
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute bottom-full left-1/2 z-40 mb-4 w-72 -translate-x-1/2 space-y-2 rounded-2xl border border-white/20 bg-black/90 p-4 text-left shadow-2xl backdrop-blur-2xl"
                >
                  <div className="flex items-center justify-between">
                    <Badge
                      className="h-5 border-0 px-2 text-[10px] text-white"
                      style={{ backgroundColor: zone.themeColor }}
                    >
                      {hs.status}
                    </Badge>
                    <span className="font-mono text-[10px] text-white/50">Fasa {zone.num}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{hs.title}</h4>
                  <p className="text-xs leading-relaxed text-white/70">{hs.desc}</p>
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
/*  COMPONENT                                                  */
/* ─────────────────────────────────────────────────────────── */

interface Props {
  onOpenDonate: () => void
}

export function PortalInteractiveEcosystem({ onOpenDonate }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [activeIdx, setActiveIdx] = useState(0)
  const [openHs, setOpenHs] = useState<string | null>(null)

  const zone = ZONES[activeIdx]

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  // Camera flies horizontally across the 5-panel track:
  // total travel = (ZONE_COUNT × 100vw) − viewport(100vw) = 400vw.
  const cameraX = useTransform(scrollYProgress, [0, 1], ['0vw', `${-(ZONE_COUNT - 1) * 100}vw`])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(ZONE_COUNT - 1, Math.floor(v * ZONE_COUNT))
    setActiveIdx(i)
    setOpenHs(null)
  })

  const toggleHs = useCallback((id: string) => {
    setOpenHs((cur) => (cur === id ? null : id))
  }, [])

  const scrollToZone = useCallback(
    (i: number) => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const target = rect.top + window.scrollY + ((i + 0.5) / ZONE_COUNT) * scrollable
      window.scrollTo({ top: target, behavior: 'smooth' })
    },
    [],
  )

  /* ── Reduced-motion fallback: static stacked zone list ── */
  if (prefersReducedMotion) {
    return (
      <section id="agihan" className="scroll-mt-20 space-y-6">
        {ZONES.map((z) => (
          <article
            key={z.id}
            className="overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-2xl backdrop-blur-xl"
          >
            <div className="relative h-56 sm:h-72">
              <Image
                src={z.diorama}
                alt={z.name}
                fill
                priority={z.id === ZONES[0].id}
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
            <div className="space-y-3 p-5">
              <div className="flex items-center gap-2">
                <Badge className="border-0 text-white" style={{ backgroundColor: z.themeColor }}>
                  Fasa {z.num} : {z.shortLabel}
                </Badge>
                <span className="text-[10px] uppercase tracking-wider text-white/50">{z.category}</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">{z.name}</h3>
              <p className="text-sm leading-relaxed text-white/70">{z.desc}</p>
              <div className="grid grid-cols-2 gap-2">
                {z.stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                    <span className="block text-[10px] text-white/50">{s.label}</span>
                    <span className="text-base font-bold text-white">{s.value}</span>
                  </div>
                ))}
              </div>
              <Button
                onClick={onOpenDonate}
                size="sm"
                className="h-9 rounded-full border-0 text-xs font-semibold text-white"
                style={{ backgroundColor: z.themeColor }}
              >
                <Heart className="h-3.5 w-3.5 fill-white" />
                Infaq Sedekah Fasa Ini
              </Button>
            </div>
          </article>
        ))}
      </section>
    )
  }

  /* ── Scroll-scrubbed fly-through stage ── */
  return (
    <section
      id="agihan"
      ref={sectionRef}
      className="relative"
      style={{ height: `${TRACK_HEIGHT_VH}vh` }}
    >
      {/* Sticky full-viewport flight stage */}
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        {/* ── Horizontal flight track (camera flies through) ── */}
        <motion.div className="flex h-full" style={{ x: cameraX }}>
          {ZONES.map((z, i) => (
            <ZonePanel
              key={z.id}
              zone={z}
              index={i}
              progress={scrollYProgress}
              active={i === activeIdx}
              openHs={openHs}
              onToggleHs={toggleHs}
            />
          ))}
        </motion.div>

        {/* ── Top control bar ── */}
        <div className="absolute top-0 left-0 right-0 z-30 flex flex-wrap items-center justify-between gap-3 p-4 sm:p-6">
          <div className="flex items-center gap-2">
            <Badge
              className="border-0 px-4 py-1.5 text-xs font-bold text-white shadow-xl"
              style={{ backgroundColor: zone.themeColor }}
            >
              Fasa {zone.num} : {zone.shortLabel}
            </Badge>
            <Badge
              variant="outline"
              className="hidden border-emerald-500/40 bg-black/50 text-xs text-emerald-400 backdrop-blur-md sm:inline-flex"
            >
              <ShieldCheck className="mr-1 h-3 w-3" />
              SOP Pengurusan Asnaf Terkawal
            </Badge>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-xl">
            <MousePointerClick className="h-3.5 w-3.5 text-amber-400" />
            Skrol untuk terbang
          </span>
        </div>

        {/* ── Floating stats overlay (Armada zone) ── */}
        <AnimatePresence>
          {zone.id === 'armada' && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="absolute top-1/2 right-4 z-30 hidden -translate-y-1/2 flex-col gap-3 sm:right-8 md:flex"
            >
              {zone.stats.map((s) => (
                <div
                  key={s.label}
                  className="min-w-40 rounded-2xl border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-2xl"
                >
                  <span className="block text-[10px] uppercase tracking-wider text-white/50">{s.label}</span>
                  <span className="block text-2xl font-extrabold text-white">{s.value}</span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Emons-style floating bottom-left card ── */}
        <div className="absolute bottom-24 left-4 z-30 max-w-md sm:bottom-28 sm:left-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={`card-${zone.id}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="space-y-3 rounded-2xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-2xl"
            >
              <div className="space-y-1.5">
                <span
                  className="block text-[10px] font-extrabold uppercase tracking-wider"
                  style={{ color: zone.themeColor }}
                >
                  {zone.subtitle}
                </span>
                <h3 className="text-lg leading-tight font-extrabold tracking-tight text-white sm:text-xl">
                  {zone.name}
                </h3>
                <p className="text-xs leading-relaxed text-white/70">{zone.desc}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-1">
                {zone.stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 p-2">
                    <span className="block text-[10px] text-white/50">{s.label}</span>
                    <span className="text-sm font-bold text-white">{s.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-1">
                <Button
                  onClick={onOpenDonate}
                  size="sm"
                  className="flex-1 h-9 gap-2 rounded-full border-0 text-xs font-semibold text-white shadow-lg transition-transform active:scale-[0.97]"
                  style={{ backgroundColor: zone.themeColor }}
                >
                  <Heart className="h-3.5 w-3.5 fill-white" />
                  Infaq Sedekah Fasa Ini
                  <ArrowRight className="ml-auto h-3.5 w-3.5" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Bottom timeline scrubber ── */}
        <div className="absolute right-0 bottom-0 left-0 z-30 border-t border-white/10 bg-black/70 px-4 py-3 backdrop-blur-2xl sm:px-6">
          <div
            className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-amber-500 transition-all duration-700"
            style={{ width: `${((activeIdx + 1) / ZONE_COUNT) * 100}%` }}
          />
          <div className="flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {ZONES.map((z, i) => {
                const active = i === activeIdx
                const Icon = z.icon
                return (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => scrollToZone(i)}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold whitespace-nowrap transition-all duration-200 active:scale-[0.97] sm:gap-2 sm:px-4 ${
                      active
                        ? 'scale-105 text-white shadow-xl'
                        : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/15 hover:text-white'
                    }`}
                    style={
                      active
                        ? { backgroundColor: z.themeColor, boxShadow: `0 4px 20px ${z.themeColor}60` }
                        : undefined
                    }
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="font-mono text-[11px] opacity-70">{z.num}</span>
                    <span className="hidden sm:inline">{z.shortLabel}</span>
                  </button>
                )
              })}
            </div>

            <Button
              onClick={onOpenDonate}
              size="sm"
              className="hidden h-9 shrink-0 gap-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-5 text-xs font-semibold text-white shadow-lg hover:from-purple-700 hover:to-pink-700 active:scale-[0.97] md:flex"
            >
              Infaq Sedekah Jumaat
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
