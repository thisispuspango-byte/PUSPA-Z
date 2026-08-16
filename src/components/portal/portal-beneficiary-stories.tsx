'use client'

import * as React from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  Heart,
  MapPin,
  Play,
  X,
  ArrowRight,
  Quote,
  Clock,
} from 'lucide-react'
import { BENEFICIARIES } from '@/data/portal/beneficiaries'

export function PortalBeneficiaryStories() {
  const [selectedStory, setSelectedStory] = React.useState<typeof BENEFICIARIES[0] | null>(null)
  const prefersReducedMotion = useReducedMotion()
  const featuredStory = BENEFICIARIES[0]
  const gridStories = BENEFICIARIES.slice(1)

  const handleOpenModal = (story: typeof BENEFICIARIES[0]) => {
    setSelectedStory(story)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseModal = () => {
    setSelectedStory(null)
    document.body.style.overflow = ''
  }

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedStory) {
        handleCloseModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedStory])

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', damping: 24, stiffness: 300 } as const },
    exit: { opacity: 0, scale: 0.96, y: 20, transition: { duration: 0.2 } },
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }

  return (
    <section id="penerima-manfaat" className="relative py-16 sm:py-24 overflow-hidden">
      {/* Subtle purple radial glow at top */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ─── Section Header ─── */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase bg-primary/10 text-primary dark:text-primary/80 border border-primary/20 backdrop-blur-md">
            <Heart className="h-3.5 w-3.5 text-primary fill-current" />
            TEMUI PENERIMA MANFAAT
          </div>
          <h2
            style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            className="font-extrabold tracking-tight text-foreground leading-tight"
          >
            Lihat ke mana amanah anda pergi
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ini bukan sekadar statistik. Ini adalah cerita sebenar keluarga-keluarga yang hidup mereka
            berubah berkat keikhlasan anda. Setiap pek makanan, setiap kotak bantuan, setiap lawatan —
            semuanya mempunyai nama, wajah, dan harapan.
          </p>
        </div>

        {/* ─── Featured Story + Grid Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Featured Story — 3 columns (60%) on desktop */}
          <motion.div
            className="lg:col-span-3"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={prefersReducedMotion ? 'visible' : 'visible'}
            variants={cardVariants}
            transition={{ delay: 0.1 }}
          >
            <div
              onClick={() => handleOpenModal(featuredStory)}
              className="group relative rounded-3xl overflow-hidden aspect-video cursor-pointer bg-slate-900 border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleOpenModal(featuredStory)
                }
              }}
              aria-label={`Lihat cerita penuh ${featuredStory.name}`}
            >
              {/* Photo */}
              <div className="absolute inset-0">
                <img
                  src={featuredStory.photo}
                  alt={`${featuredStory.name}, ${featuredStory.age} tahun, ${featuredStory.location}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                {/* Video play button overlay */}
                {featuredStory.video && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenModal(featuredStory)
                      }}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      className="h-16 w-16 rounded-full bg-primary/90 backdrop-blur-md flex items-center justify-center text-primary-foreground shadow-2xl transition-all duration-200"
                      aria-label={`Tonton video testimoni ${featuredStory.name}`}
                    >
                      <Play className="h-7 w-7 ml-1 fill-current" />
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Content overlay */}
              <div className="relative z-10 absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex items-center gap-3 text-sm sm:text-base text-white/80 mb-4">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-primary" />
                    {featuredStory.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    {featuredStory.duration}
                  </span>
                </div>
                <div className="flex items-baseline gap-3 mb-4">
                  <p className="text-xl sm:text-2xl font-bold text-white">{featuredStory.name}</p>
                  <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full border border-primary/30">
                    {featuredStory.age} tahun
                  </span>
                </div>
                <blockquote className="relative text-lg sm:text-xl text-white/90 leading-relaxed italic pr-4">
                  <Quote className="absolute left-0 top-0 h-8 w-8 text-primary/40 -ml-2 -mt-2" aria-hidden="true" />
                  <p className="relative z-10">"{featuredStory.quote}"</p>
                </blockquote>
                <div className="mt-6 flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-gap">
                  <span>Lihat Cerita</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Grid Stories — 2 columns on desktop */}
          <div className="lg:col-span-2 space-y-4">
            {gridStories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={prefersReducedMotion ? false : 'hidden'}
                animate={prefersReducedMotion ? 'visible' : 'visible'}
                variants={cardVariants}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="group"
              >
                <div
                  onClick={() => handleOpenModal(story)}
                  className="relative rounded-2xl overflow-hidden bg-slate-900 border border-white/10 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer aspect-[4/3]"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleOpenModal(story)
                    }
                  }}
                  aria-label={`Baca cerita ${story.name}`}
                >
                  <img
                    src={story.photo}
                    alt={`${story.name}, ${story.age} tahun, ${story.location}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent p-4 flex flex-col justify-end">
                    <div className="flex items-center gap-2 text-xs text-white/70 mb-2">
                      <MapPin className="h-3 w-3 text-primary" />
                      <span>{story.location}</span>
                    </div>
                    <h3 className="font-bold text-white text-sm sm:text-base leading-snug">{story.name}</h3>
                    <p className="text-xs sm:text-sm text-white/60 line-clamp-1 mt-1 italic">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-primary font-semibold text-xs group-hover:gap-2 transition-gap">
                      <span>Baca</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                  {story.video && (
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenModal(story)
                        }}
                        className="h-8 w-8 rounded-full bg-primary/90 backdrop-blur-md flex items-center justify-center text-primary-foreground shadow-lg hover:scale-110 transition-transform"
                        aria-label={`Tonton video testimoni ${story.name}`}
                      >
                        <Play className="h-4 w-4 ml-0.5 fill-current" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Story Modal ─── */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={backdropVariants}
            onClick={handleCloseModal}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 rounded-3xl border border-white/10 shadow-2xl"
              tabIndex={-1}
              ref={(el) => {
                if (el) el.focus()
              }}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Tutup cerita"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Media Area */}
              <div className="relative aspect-video overflow-hidden rounded-t-3xl">
                {selectedStory.video ? (
                  <>
                    <video
                      src={selectedStory.video}
                      poster={selectedStory.photo}
                      preload="metadata"
                      muted
                      playsInline
                      controls
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
                  </>
                ) : (
                  <img
                    src={selectedStory.photo}
                    alt={`${selectedStory.name}, ${selectedStory.age} tahun, ${selectedStory.location}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-primary" />
                      {selectedStory.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-primary" />
                      {selectedStory.duration}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-white">
                      {selectedStory.name}
                    </h2>
                    <span className="px-3 py-1 bg-primary/20 text-primary text-sm font-semibold rounded-full border border-primary/30">
                      {selectedStory.age} tahun
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full border border-primary/20">
                    {selectedStory.program}
                  </span>
                </div>

                {/* Quote */}
                <blockquote className="relative pl-6 border-l-2 border-primary/30 py-2">
                  <Quote className="absolute left-0 top-0 h-8 w-8 text-primary/30 -ml-2 -mt-1" aria-hidden="true" />
                  <p className="text-lg sm:text-xl text-white/90 leading-relaxed italic">
                    &ldquo;{selectedStory.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Before/After Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                  {/* Before */}
                  <div className="space-y-3 p-4 bg-slate-950/50 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-2 text-sm font-semibold text-red-400">
                      <Heart className="h-4 w-4 fill-current" />
                      Sebelum Menerima Bantuan
                    </div>
                    <p className="text-white/70 leading-relaxed">{selectedStory.beforeSummary}</p>
                  </div>

                  {/* After */}
                  <div className="space-y-3 p-4 bg-slate-950/50 rounded-2xl border border-white/5 relative">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-4 h-4 bg-primary rounded-full border-2 border-slate-900 hidden lg:block" aria-hidden="true" />
                    <div className="flex items-center gap-2 text-sm font-semibold text-green-400">
                      <Heart className="h-4 w-4 fill-current" />
                      Selepas Menerima Bantuan
                    </div>
                    <p className="text-white/70 leading-relaxed">{selectedStory.afterSummary}</p>
                  </div>
                </div>

                {/* Footer info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 pt-4 border-t border-white/10">
                  <span className="flex items-center gap-1.5">
                    <Heart className="h-4 w-4 text-primary fill-current" />
                    Kategori: {selectedStory.category.charAt(0).toUpperCase() + selectedStory.category.slice(1)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" />
                    Durasi: {selectedStory.duration}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}