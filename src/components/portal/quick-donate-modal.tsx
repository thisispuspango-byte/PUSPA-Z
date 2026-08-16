'use client'

import * as React from 'react'
import { useState } from 'react'
import { Heart, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, QrCode, CreditCard, Building } from 'lucide-react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface QuickDonateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const PRESET_AMOUNTS = [
  { amount: 10, label: '1 Pek Makanan', desc: '1 pek juadah tengahari asnaf' },
  { amount: 30, label: '3 Pek Makanan', desc: 'Makanan lengkap 1 keluarga kecil' },
  { amount: 50, label: '5 Pek Makanan', desc: 'Tajaan juadah Mahad Tahfiz' },
  { amount: 100, label: '10 Pek Makanan', desc: 'Pakej Sedekah Jumaat Korporat/Keluarga' },
]

export function QuickDonateModal({ open, onOpenChange }: QuickDonateModalProps) {
  const [selectedAmount, setSelectedAmount] = useState<number>(30)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [donorName, setDonorName] = useState<string>('')
  const [donorEmail, setDonorEmail] = useState<string>('')
  const [donorPhone, setDonorPhone] = useState<string>('')
  const [paymentMethod, setPaymentMethod] = useState<'fpx' | 'qr' | 'manual'>('fpx')
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [txnRef, setTxnRef] = useState(() => `INFAQ-${Math.floor(100000 + Math.random() * 900000)}`)

  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : selectedAmount

  const handleDonate = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1200)
  }

  const handleReset = () => {
    setIsSuccess(false)
    setIsSubmitting(false)
    setCustomAmount('')
    setSelectedAmount(30)
    setDonorName('')
    setDonorEmail('')
    setDonorPhone('')
    setPaymentMethod('fpx')
    setTxnRef(`INFAQ-${Math.floor(100000 + Math.random() * 900000)}`)
    onOpenChange(false)
  }

  // Handle modal open/close - reset state when closing
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setIsSuccess(false)
      setIsSubmitting(false)
      setCustomAmount('')
      setSelectedAmount(30)
      setDonorName('')
      setDonorEmail('')
      setDonorPhone('')
      setPaymentMethod('fpx')
      setTxnRef(`INFAQ-${Math.floor(100000 + Math.random() * 900000)}`)
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[540px] bg-background/95 backdrop-blur-2xl border-white/10 shadow-2xl p-0 overflow-hidden">
        {/* Top Gradient Banner */}
        <div className="h-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />

        <div className="p-6">
          {!isSuccess ? (
            <div className="space-y-5">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="bg-primary/10 text-primary dark:text-primary/80 border-primary/20 text-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Sedekah Jumaat Pantas
                  </Badge>
                  <Badge variant="outline" className="bg-primary/10 text-primary dark:text-primary/80 border-primary/20 text-xs">
                    <ShieldCheck className="h-3 w-3 mr-1" />
                    100% Telus
                  </Badge>
                </div>
                <DialogTitle className="text-xl font-bold tracking-tight text-foreground">
                  Infaq Makanan & Peduli Asnaf
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground">
                  Sumbangan anda diagihkan terus kepada 8 Rumah Kebajikan & Mahad Tahfiz setiap Jumaat.
                </DialogDescription>
              </DialogHeader>

              {/* Amount Selection Grid */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Pilih Jumlah Sumbangan (RM)
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PRESET_AMOUNTS.map((preset) => {
                    const isSelected = !customAmount && selectedAmount === preset.amount
                    return (
                      <button
                        key={preset.amount}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(preset.amount)
                          setCustomAmount('')
                        }}
                        aria-label={`Pilih amaun RM ${preset.amount} - ${preset.label}`}
                        className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                          isSelected
                            ? 'bg-primary text-white border-primary shadow-md shadow-primary/20 scale-[1.02]'
                            : 'bg-card/60 hover:bg-card border-border hover:border-primary/40 text-foreground'
                        }`}
                      >
                        <div className="font-bold text-base">RM {preset.amount}</div>
                        <div className={`text-[11px] leading-tight mt-0.5 ${isSelected ? 'text-primary/90' : 'text-muted-foreground'}`}>
                          {preset.label}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Custom Amount Input */}
                <div className="mt-2">
                  <div className="relative">
                    <Label htmlFor="custom-amount" className="sr-only">
                      Amaun Sumbangan Khusus (RM)
                    </Label>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
                      RM
                    </span>
                    <Input
                      id="custom-amount"
                      type="number"
                      placeholder="Atau masukkan amaun pilihan anda..."
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="pl-11 h-10 text-sm bg-muted/40 border-border focus-visible:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Donor Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="donor-name" className="text-xs font-medium">
                    Nama Penderma (Hamba Allah jika kosong)
                  </Label>
                  <Input
                    id="donor-name"
                    placeholder="Nama / Syarikat"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="h-11 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="donor-contact" className="text-xs font-medium">
                    No Telefon / Emel (Untuk Resit)
                  </Label>
                  <Input
                    id="donor-contact"
                    placeholder="012-3456789 / emel@domain.com"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="h-11 text-xs"
                  />
                </div>
              </div>

              {/* Payment Method Tabs */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Kaedah Pembayaran Pantas
                </Label>
                <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as 'fpx' | 'qr' | 'manual')}>
                  <TabsList className="grid grid-cols-3 w-full h-9">
                    <TabsTrigger value="fpx" className="text-xs gap-1.5">
                      <Building className="h-3.5 w-3.5" />
                      FPX Online
                    </TabsTrigger>
                    <TabsTrigger value="qr" className="text-xs gap-1.5">
                      <QrCode className="h-3.5 w-3.5" />
                      DuitNow QR
                    </TabsTrigger>
                    <TabsTrigger value="manual" className="text-xs gap-1.5">
                      <CreditCard className="h-3.5 w-3.5" />
                      Pindahan Bank
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="fpx" className="mt-2 text-xs text-muted-foreground bg-muted/30 p-2.5 rounded-lg border border-border/50">
                    Menyokong Maybank2u, CIMB Clicks, Bank Islam, RHB, Public Bank, Hong Leong, dan semua bank utama Malaysia.
                  </TabsContent>
                  <TabsContent value="qr" className="mt-2 text-xs text-muted-foreground bg-muted/30 p-2.5 rounded-lg border border-border/50">
                    Imbas kod QR DuitNow secara terus melalui mana-mana aplikasi e-Dompet (TnG, GrabPay, Boost) atau perbankan anda.
                  </TabsContent>
                  <TabsContent value="manual" className="mt-2 text-xs text-muted-foreground bg-muted/30 p-2.5 rounded-lg border border-border/50">
                    <p className="font-mono text-[11px] text-foreground font-semibold">Bank Islam: 1202-9010-0456-78 (PUSPA)</p>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Action Button */}
              <Button
                onClick={handleDonate}
                disabled={isSubmitting || finalAmount <= 0}
                className="w-full h-11 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold shadow-lg shadow-primary/25 transition-all text-sm gap-2"
              >
                {isSubmitting ? (
                  <>Memproses Transaksi Selamat…</>
                ) : (
                  <>
                    <Heart className="h-4 w-4 fill-white" />
                    Teruskan Infaq RM {finalAmount.toLocaleString('ms-MY', { minimumFractionDigits: 2 })}
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </>
                )}
              </Button>
            </div>
          ) : (
            /* Success State */
            <div className="py-6 text-center space-y-4">
              {/* DialogTitle/Description diperlukan oleh Radix DialogContent untuk aksesibiliti */}
              <DialogHeader className="sr-only">
                <DialogTitle>Infaq Sedekah Jumaat Berjaya</DialogTitle>
                <DialogDescription>
                  Sumbangan anda telah berjaya direkodkan. Resit rasmi digital telah dihantar.
                </DialogDescription>
              </DialogHeader>
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-xl font-bold text-foreground">Jazakallah Khairan Kathira</h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  Sumbangan Infaq Sedekah Jumaat sebanyak <span className="font-bold text-foreground">RM {finalAmount.toFixed(2)}</span> telah berjaya direkodkan. Resit rasmi digital telah dihantar.
                </p>
              </div>
              <div className="p-3 bg-muted/40 rounded-xl border text-left text-xs space-y-1">
                <div className="flex justify-between text-muted-foreground">
                  <span>No. Rujukan Infaq:</span>
                  <span className="font-mono text-foreground font-semibold">{txnRef}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Penerima Agihan:</span>
                  <span className="text-foreground font-medium">8 Rumah Kebajikan & Mahad Tahfiz</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Status:</span>
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                    Selesai & Disahkan
                  </Badge>
                </div>
              </div>
              <Button onClick={handleReset} className="w-full bg-primary hover:bg-primary/90 text-white text-xs">
                Tutup & Kembali ke Portal
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
