'use client'

import * as React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Aurora from '@/components/Aurora'
import { PortalNavbar } from '@/components/portal/portal-navbar'
import { PortalHero } from '@/components/portal/portal-hero'
import { PortalMetrics } from '@/components/portal/portal-metrics'
import { PortalQuickActions } from '@/components/portal/portal-quick-actions'
import { PortalProgrammes } from '@/components/portal/portal-programmes'
import { PortalMariaAssistant } from '@/components/portal/portal-maria-assistant'
import { PortalInteractiveEcosystem } from '@/components/portal/portal-interactive-ecosystem'
import { PortalAgihanGallery } from '@/components/portal/portal-agihan-gallery'
import { PortalFooter } from '@/components/portal/portal-footer'
import { QuickDonateModal } from '@/components/portal/quick-donate-modal'
import { CheckStatusModal } from '@/components/portal/check-status-modal'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import PermohonanBantuanPage from '@/modules/permohonan-bantuan/page'

export default function PublicPortalHome() {
  const router = useRouter()
  const [donateModalOpen, setDonateModalOpen] = useState(false)
  const [checkStatusModalOpen, setCheckStatusModalOpen] = useState(false)
  const [applyModalOpen, setApplyModalOpen] = useState(false)

  const handleOpenDonate = () => setDonateModalOpen(true)
  const handleOpenCheckStatus = () => setCheckStatusModalOpen(true)
  const handleOpenApply = () => setApplyModalOpen(true)

  return (
    <div className="relative min-h-screen selection:bg-purple-500 selection:text-white bg-background text-foreground">
      {/* Dynamic Aurora Ambient Light Source */}
      <div aria-hidden="true" className="fixed inset-0 -z-10 pointer-events-none opacity-80 dark:opacity-60">
        <Aurora colorStops={['#6A0DAD', '#9370DB', '#3B0764']} amplitude={1.1} speed={0.4} />
      </div>

      {/* Glass Floating Navigation Bar */}
      <PortalNavbar
        onOpenDonate={handleOpenDonate}
        onOpenCheckStatus={handleOpenCheckStatus}
      />

      {/* Main Landing Sections — Naratif "Perjalanan Ihsan" */}
      <main className="space-y-4">
        {/* 1. Pendaratan: Hero Banner with 3D Preview Widget */}
        <PortalHero
          onOpenDonate={handleOpenDonate}
          onOpenCheckStatus={handleOpenCheckStatus}
          onNavigateToApply={handleOpenApply}
        />

        {/* 2. Terbang: Scroll-scrub Fly-Through 5-Zon PUSPA Ecosystem (#agihan) */}
        <PortalInteractiveEcosystem onOpenDonate={handleOpenDonate} />

        {/* 3. Kesan: Live Glassmorphic Metric Counters (#metrik) */}
        <PortalMetrics />

        {/* 4. Bukti: Real Field Photo & Institutional Distribution Gallery */}
        <PortalAgihanGallery onOpenDonate={handleOpenDonate} />

        {/* 5. Tindakan: Direct Action Service Hub (#tindakan) */}
        <PortalQuickActions
          onOpenDonate={handleOpenDonate}
          onOpenCheckStatus={handleOpenCheckStatus}
          onNavigateToApply={handleOpenApply}
        />

        {/* 6. Program: Flagship Programmes Showcase (#program) */}
        <PortalProgrammes onOpenDonate={handleOpenDonate} />

        {/* 7. Sokongan: Maria AI Public Assistant & FAQ (#maria) */}
        <PortalMariaAssistant />
      </main>

      {/* Comprehensive Footer */}
      <PortalFooter
        onOpenDonate={handleOpenDonate}
        onOpenCheckStatus={handleOpenCheckStatus}
      />

      {/* ─── Interactive Modals ─── */}
      {/* Quick Donate Modal */}
      <QuickDonateModal
        open={donateModalOpen}
        onOpenChange={setDonateModalOpen}
      />

      {/* Check Status Modal */}
      <CheckStatusModal
        open={checkStatusModalOpen}
        onOpenChange={setCheckStatusModalOpen}
      />

      {/* Apply Aid Form Modal */}
      <Dialog open={applyModalOpen} onOpenChange={setApplyModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-2xl border-white/10 p-4 sm:p-6">
          <DialogHeader className="sr-only">
            <DialogTitle>Borang Permohonan Bantuan Asnaf</DialogTitle>
            <DialogDescription>
              Borang permohonan bantuan Pertubuhan Urus Peduli Asnaf (PUSPA)
            </DialogDescription>
          </DialogHeader>
          <PermohonanBantuanPage />
        </DialogContent>
      </Dialog>
    </div>
  )
}
