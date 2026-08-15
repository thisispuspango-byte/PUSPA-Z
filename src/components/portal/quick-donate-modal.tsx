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
    setCustomAmount('')
    setSelectedAmount(30)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[540px] bg-background/95 backdrop-blur-2xl border-white/10 shadow-2xl p-0 overflow-hidden">
        {/* Top Gradient Banner */}
        <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-500 to-amber-400" />

        <div className="p-6">
          {!isSuccess ? (
            <div className="space-y-5">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="outline" className="bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20 text-xs">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Sedekah Jumaat Pantas
                  </Badge>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs">
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
                        className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                          isSelected
                            ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20 scale-[1.02]'
                            : 'bg-card/60 hover:bg-card border-border hover:border-purple-500/40 text-foreground'
                        }`}
                      >
                        <div className="font-bold text-base">RM {preset.amount}</div>
                        <div className={`text-[11px] leading-tight mt-0.5 ${isSelected ? 'text-purple-100' : 'text-muted-foreground'}`}>
                          {preset.label}
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Custom Amount Input */}
                <div className="mt-2">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-muted-foreground">
                      RM
                    </span>
                    <Input
                      type="number"
                      placeholder="Atau masukkan amaun pilihan anda..."
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="pl-11 h-10 text-sm bg-muted/40 border-border focus-visible:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Donor Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">Nama Penderma (Hamba Allah jika kosong)</Label>
                  <Input
                    placeholder="Nama / Syarikat"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium">No Telefon / Emel (Untuk Resit)</Label>
                  <Input
                    placeholder="012-3456789 / emel@domain.com"
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              {/* Payment Method Tabs */}
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Kaedah Pembayaran Pantas
                </Label>
                <Tabs value={paymentMethod} onValueChange={(v) => setPaymentMethod(v as any)}>
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
                className="w-full h-11 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold shadow-lg shadow-purple-600/25 transition-all text-sm gap-2"
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
              <div className="w-16 h-16 rounded-full bg-green-500/10 text-green-500 border border-green-500/20 flex items-center justify-center mx-auto animate-bounce">
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
                  <span className="font-mono text-foreground font-semibold">INFAQ-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Penerima Agihan:</span>
                  <span className="text-foreground font-medium">8 Rumah Kebajikan & Mahad Tahfiz</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Status:</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/20 text-[10px]">
                    Selesai & Disahkan
                  </Badge>
                </div>
              </div>
              <Button onClick={handleReset} className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs">
                Tutup & Kembali ke Portal
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
