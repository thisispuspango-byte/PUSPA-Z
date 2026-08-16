'use client'

import * as React from 'react'
import { useState } from 'react'
import { Search, FileSearch, CheckCircle2, Clock, ShieldAlert } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

interface CheckStatusModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface CheckResult {
  refNo: string
  name: string
  program: string
  status: string
  statusType: 'success' | 'in_progress' | 'rejected'
  updatedAt: string
  pegawai: string
  steps: Array<{ title: string; done: boolean; date?: string; active?: boolean }>
}

export function CheckStatusModal({ open, onOpenChange }: CheckStatusModalProps) {
  const [icNumber, setIcNumber] = useState<string>('')
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const [result, setResult] = useState<CheckResult | null>(null)
  const [refNo] = useState(() => `PZ-2026-${Math.floor(1000 + Math.random() * 9000)}`)

  const handleSearch = () => {
    if (!icNumber.trim()) return
    setIsSearching(true)
    setHasSearched(false)

    setTimeout(() => {
      setIsSearching(false)
      setHasSearched(true)
      // Mock data logic for demonstration
      if (icNumber.includes('9') || icNumber.includes('8') || icNumber.length >= 10) {
        setResult({
          refNo: `PZ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          name: 'Pemohon Berdaftar',
          program: 'Bantuan Sara Hidup & Asnafpreneur',
          status: 'Dalam Semakan Lapangan',
          statusType: 'in_progress',
          updatedAt: '14 Ogos 2026',
          pegawai: 'Ustaz Hamzah (Zon Hulu Langat)',
          steps: [
            { title: 'Permohonan Diterima', done: true, date: '10 Ogos 2026' },
            { title: 'Semakan Dokumen & eKYC', done: true, date: '12 Ogos 2026' },
            { title: 'Siasatan Lapangan Pegawai', done: false, active: true },
            { title: 'Kelulusan Jawatankuasa Agihan', done: false },
          ]
        })
      } else {
        setResult(null)
      }
    }, 900)
  }

  const handleReset = () => {
    setIcNumber('')
    setResult(null)
    setHasSearched(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-background/95 backdrop-blur-2xl border-white/10 shadow-2xl p-0 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
        
        <div className="p-6 space-y-5">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="bg-primary/10 text-primary dark:text-primary/80 border-primary/20 text-xs">
                <FileSearch className="h-3 w-3 mr-1" />
                Semakan Status Permohonan
              </Badge>
            </div>
            <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
              Semak Status Bantuan Asnaf
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Masukkan No. Kad Pengenalan (12 digit) untuk menyemak peringkat terkini kelulusan bantuan anda.
            </DialogDescription>
          </DialogHeader>

          {/* Search Box */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              No. Kad Pengenalan (MyKad)
            </Label>
            <div className="flex gap-2">
              <Input
                placeholder="Contoh: 850123105432"
                value={icNumber}
                onChange={(e) => setIcNumber(e.target.value)}
                maxLength={14}
                className="h-10 text-sm font-mono tracking-wide"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button
                onClick={handleSearch}
                disabled={isSearching || !icNumber.trim()}
                className="h-11 px-4 bg-primary hover:bg-primary/90 text-white shrink-0"
              >
                {isSearching ? (
                  <Clock className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Result Area */}
          {hasSearched && (
            <div className="transition-all duration-300">
              {result ? (
                <div className="p-4 rounded-xl border bg-card/70 backdrop-blur-md space-y-3.5">
                  <div className="flex items-center justify-between border-b pb-2.5">
                    <div>
                      <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">No. Rujukan</span>
                      <span className="font-mono text-sm font-bold text-foreground">{refNo}</span>
                    </div>
                    <Badge variant="outline" className="bg-primary/10 text-primary dark:text-primary/80 border-primary/20 text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {result.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Kategori:</span>
                      <p className="font-medium text-foreground">{result.program}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Pegawai Bertanggungjawab:</span>
                      <p className="font-medium text-foreground">{result.pegawai}</p>
                    </div>
                  </div>

                  {/* Stepper Timeline */}
                  <div className="pt-2 border-t space-y-2">
                    <span className="text-[11px] font-semibold text-muted-foreground">Peringkat Proses:</span>
                    <div className="space-y-2">
                      {result.steps.map((step: { title: string; done: boolean; date?: string; active?: boolean }, idx: number) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs">
                          {step.done ? (
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                          ) : step.active ? (
                            <div className="h-4 w-4 rounded-full border-2 border-primary flex items-center justify-center shrink-0 animate-pulse">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            </div>
                          ) : (
                            <div className="h-4 w-4 rounded-full border border-muted-foreground/40 shrink-0" />
                          )}
                          <span className={`font-medium ${step.done ? 'text-foreground' : step.active ? 'text-primary dark:text-primary/80 font-semibold' : 'text-muted-foreground'}`}>
                            {step.title}
                          </span>
                          {step.date && <span className="text-[10px] text-muted-foreground ml-auto">{step.date}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-dashed text-center space-y-2 bg-muted/20">
                  <ShieldAlert className="h-8 w-8 text-primary mx-auto" />
                  <h4 className="text-sm font-semibold text-foreground">Tiada Rekod Permohonan Dijumpai</h4>
                  <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                    No. IC yang dimasukkan tiada dalam pangkalan data aktif. Sila pastikan nombor tepat atau hantar permohonan baru.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end pt-2">
            <Button variant="ghost" size="sm" onClick={handleReset} className="text-xs">
              Tutup
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
