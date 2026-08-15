'use client'

import * as React from 'react'
import Link from 'next/link'
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
          ? 'bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src="/puspa-logo-official.png"
              alt="PUSPA Logo"
              width={42}
              height={42}
              className="h-10 w-10 object-contain rounded-full bg-white/90 p-0.5 shadow-md shadow-purple-900/20 group-hover:scale-105 transition-transform"
            />
            <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-background" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-foreground bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-300 bg-clip-text text-transparent">
                PUSPA-Z
              </span>
              <Badge variant="outline" className="text-[10px] h-4 px-1.5 py-0 border-purple-500/30 text-purple-600 dark:text-purple-300 font-bold uppercase">
                Portal Awam
              </Badge>
            </div>
            <span className="text-[10px] text-muted-foreground font-medium hidden sm:inline">
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
            <Heart className="h-3.5 w-3.5 text-pink-500" />
            Ekosistem Agihan
          </a>
          <a href="#metrik" className="hover:text-foreground transition-colors">
            Statistik Impak
          </a>
          <a href="#program" className="hover:text-foreground transition-colors">
            Program Unggulan
          </a>
          <a href="#maria" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-purple-500" />
            Maria AI
          </a>
          <button
            onClick={onOpenCheckStatus}
            className="hover:text-foreground transition-colors text-xs font-semibold text-purple-600 dark:text-purple-400"
          >
            Semak Status Permohonan
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            onClick={onOpenDonate}
            size="sm"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md shadow-purple-600/20 text-xs font-semibold gap-1.5 h-9"
          >
            <Heart className="h-3.5 w-3.5 fill-white" />
            Infaq Sedekah Jumaat
          </Button>

          <Link href="/dashboard">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-9 gap-1.5 border-white/20 bg-background/50 hover:bg-background/80 backdrop-blur-md"
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
            className="bg-purple-600 text-white text-xs h-8 px-2.5"
          >
            <Heart className="h-3 w-3 fill-white mr-1" />
            Infaq
          </Button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border bg-background/70 text-foreground"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-border bg-background/95 backdrop-blur-2xl px-4 py-4 space-y-3 shadow-xl">
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
              className="px-2 py-1.5 rounded-md hover:bg-muted flex items-center gap-1.5 text-purple-600 dark:text-purple-400"
            >
              <Heart className="h-4 w-4 text-pink-500" />
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
              className="px-2 py-1.5 rounded-md hover:bg-muted flex items-center gap-1.5 text-purple-600 dark:text-purple-400"
            >
              <Sparkles className="h-4 w-4" />
              Maria AI Assistant
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onOpenCheckStatus()
              }}
              className="text-left px-2 py-1.5 rounded-md hover:bg-muted text-blue-600 dark:text-blue-400 font-semibold"
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
