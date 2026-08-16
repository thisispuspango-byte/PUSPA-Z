'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Heart, ShieldCheck, Mail, Phone, MapPin, ExternalLink, Lock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface PortalFooterProps {
  onOpenDonate: () => void
  onOpenCheckStatus: () => void
}

export function PortalFooter({ onOpenDonate, onOpenCheckStatus }: PortalFooterProps) {
  const [currentYear] = useState(() => new Date().getFullYear())

  return (
    <footer className="border-t border-border/50 bg-background/90 backdrop-blur-2xl text-foreground pt-14 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-border/50">
         
          {/* Brand & Organization Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/puspa-logo-official.png"
                alt="PUSPA Logo"
                width={48}
                height={48}
                className="h-12 w-12 object-contain rounded-full bg-white p-1 shadow-md"
              />
              <div>
                <h3 className="font-extrabold text-lg text-foreground">PUSPA-Z</h3>
                <p className="text-xs text-muted-foreground">Pertubuhan Urus Peduli Asnaf</p>
              </div>
            </div>
           
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
              Pertubuhan kebajikan berdaftar yang komited menyalurkan bantuan telus, membasmi kemiskinan tegar, dan memperkasa ekonomi asnaf melalui teknologi digital pintar.
            </p>

            <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/20 max-w-sm space-y-1 text-xs">
              <span className="font-semibold text-primary block">
                Akaun Rasmi Sumbangan:
              </span>
              <p className="font-mono text-foreground font-bold">Bank Islam: 1202-9010-0456-78</p>
              <p className="text-[11px] text-muted-foreground">Atas Nama: Pertubuhan Urus Peduli Asnaf</p>
            </div>
          </div>

          {/* Quick Links for Public */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Perkhidmatan Awam
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#tindakan" className="text-muted-foreground hover:text-primary transition-colors">
                  Borang Permohonan Bantuan
                </a>
              </li>
              <li>
                <button onClick={onOpenDonate} className="text-muted-foreground hover:text-primary transition-colors text-left">
                  Infaq Sedekah Jumaat Pantas
                </button>
              </li>
              <li>
                <button onClick={onOpenCheckStatus} className="text-muted-foreground hover:text-primary transition-colors text-left">
                  Semakan Status eKYC Permohonan
                </button>
              </li>
              <li>
                <a href="#program" className="text-muted-foreground hover:text-primary transition-colors">
                  Program Asnafpreneur
                </a>
              </li>
              <li>
                <a href="#maria" className="text-muted-foreground hover:text-primary transition-colors">
                  Maria AI Public FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Hubungi & Lokasi */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Ibu Pejabat & Hubungi Kami
            </h4>
            <ul className="space-y-2.5 text-xs text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>No. 1, Jalan Persiaran Ilmu, Bandar Baru Bangi, 43000 Bangi, Selangor</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>03-8920 1111 / 012-345 6789</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>info@puspa.org.my</span>
              </li>
              <li className="pt-2">
                <Link href="/dashboard" className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline">
                  <Lock className="h-3.5 w-3.5" />
                  Portal Pentadbiran & Staf PUSPA-Z
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & PDPA notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} Pertubuhan Urus Peduli Asnaf (PUSPA). Hak Cipta Terpelihara.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Pematuhan PDPA 2010
            </span>
            <span>•</span>
            <Link href="/login" className="hover:text-primary transition-colors">
              Log Masuk Staf
            </Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
