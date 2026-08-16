'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Sparkles, LogIn, Menu, X, ArrowRight, ShieldCheck, Compass } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface PortalNavbarProps {
  onOpenDonate: () => void
  onOpenCheckStatus: () => void
}

export function PortalNavbar({ onOpenDonate, onOpenCheckStatus }: PortalNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Image
              src="/puspa-logo-official.png"
              alt="Pertubuhan Urus Peduli Asnaf official logo"
              width={42}
              height={42}
              priority
              className="h-10 w-10 object-contain rounded-full bg-white/90 p-0.5 shadow-md shadow-primary/20 group-hover:scale-105 transition-transform"
            />
            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-primary rounded-full border-2 border-background" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-foreground bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                PUSPA
              </span>
              <Badge variant="outline" className="text-[11px] h-5 px-2 py-0.5 border-primary/30 text-primary dark:text-primary/80 font-bold uppercase">
                Portal Awam
              </Badge>
            </div>
            <span className="text-sm text-muted-foreground font-medium hidden sm:inline">
              Pertubuhan Urus Peduli Asnaf
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          <a href="#tindakan" className="hover:text-foreground transition-colors">
            Bantuan & Tindakan
          </a>
          <a href="#agihan" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Heart className="h-3.5 w-3.5 text-primary" />
            Ekosistem Agihan
          </a>
          <a href="#metrik" className="hover:text-foreground transition-colors">
            Statistik Impak
          </a>
          <a href="#program" className="hover:text-foreground transition-colors">
            Program Unggulan
          </a>
          <a href="#maria" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Maria AI
          </a>
          <button
            onClick={onOpenCheckStatus}
            className="hover:text-foreground transition-colors text-xs font-semibold text-primary"
          >
            Semak Status Permohonan
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            onClick={onOpenDonate}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 text-xs font-semibold gap-1.5 h-9"
          >
            <Heart className="h-3.5 w-3.5 fill-current" />
            Infaq Sedekah Jumaat
          </Button>

          <Link href="/dashboard">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-9 gap-1.5 border-border/50 bg-background/50 hover:bg-background/80 backdrop-blur-md"
            >
              <LogIn className="h-3.5 w-3.5" />
              Sistem Staf
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <Button
            onClick={onOpenDonate}
            size="sm"
            className="bg-primary text-primary-foreground text-xs h-10 px-3"
          >
            <Heart className="h-3.5 w-3.5 fill-current mr-1" />
            Infaq
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-11 w-11 rounded-lg border bg-background/70 text-foreground flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="sm:hidden border-b border-border bg-background/95 backdrop-blur-2xl px-4 py-4 space-y-3 shadow-xl"
        >
          <nav className="flex flex-col gap-2.5 text-sm font-medium">
            <a
              href="#tindakan"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-muted"
            >
              Bantuan & Tindakan
            </a>
            <a
              href="#agihan"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-muted flex items-center gap-1.5 text-primary"
            >
              <Heart className="h-4 w-4 text-primary" />
              Ekosistem Agihan
            </a>
            <a
              href="#metrik"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-muted"
            >
              Statistik Impak
            </a>
            <a
              href="#program"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-muted"
            >
              Program Unggulan
            </a>
            <a
              href="#maria"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-1.5 rounded-md hover:bg-muted flex items-center gap-1.5 text-primary"
            >
              <Sparkles className="h-4 w-4" />
              Maria AI Assistant
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenCheckStatus()
              }}
              className="text-left px-2 py-1.5 rounded-md hover:bg-muted text-primary font-semibold"
            >
              Semak Status Permohonan
            </button>
          </nav>
          <div className="pt-2 border-t flex flex-col gap-2">
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center text-xs h-9 gap-1.5">
                <LogIn className="h-3.5 w-3.5" />
                Log Masuk Sistem Staf
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
