'use client'

import * as React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, MessageSquare, Send, Bot, HelpCircle, ArrowRight, ShieldCheck, Heart } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const FAQ_PROMPTS = [
  {
    question: 'Apakah syarat utama untuk memohon bantuan asnaf?',
    answer: 'Syarat utama merangkumi pendapatan isi rumah di bawah Garis Panduan Had Kifayah (Fakir/Miskin), bermastautin di kawasan liputan (Selangor & KL), dan mengemukakan dokumen pengenalan diri serta slip pendapatan/penyata sewa untuk semakan eKYC pegawai lapangan kami.'
  },
  {
    question: 'Bagaimana dana Sedekah Jumaat diagihkan?',
    answer: 'Setiap ringgit infaq Sedekah Jumaat ditukar kepada pek hidangan makanan tengahari bernutrisi lengkap. Makanan dimasak pada pagi Jumaat dan dihantar terus oleh sukarelawan ke 8 Rumah Kebajikan & Mahad Tahfiz berdaftar sebelum solat Jumaat.'
  },
  {
    question: 'Berapa lamakah tempoh kelulusan permohonan?',
    answer: 'Proses semakan awal mengambil masa 1-2 hari bekerja. Siasatan lapangan oleh pegawai zon dilakukan dalam 3-5 hari bekerja, dan keputusan kelulusan dimaklumkan melalui SMS/Portal dalam tempoh maksimum 7 hari bekerja.'
  },
  {
    question: 'Adakah PUSPA menyediakan resit pelepasan cukai?',
    answer: 'Ya, resit rasmi digital dikeluarkan serta-merta untuk setiap transaksi perbankan dalam talian / FPX, dan rekod infaq tahunan boleh dimuat turun terus melalui portal penyumbang.'
  },
]

export function PortalMariaAssistant() {
  const [selectedFaq, setSelectedFaq] = useState<number>(0)
  const [customQuery, setCustomQuery] = useState<string>('')
  const [activeAnswer, setActiveAnswer] = useState<string>(FAQ_PROMPTS[0].answer)
  const [activeQuestion, setActiveQuestion] = useState<string>(FAQ_PROMPTS[0].question)
  const [isThinking, setIsThinking] = useState<boolean>(false)

  const handleSelectFaq = (idx: number) => {
    setSelectedFaq(idx)
    setIsThinking(true)
    setTimeout(() => {
      setActiveQuestion(FAQ_PROMPTS[idx].question)
      setActiveAnswer(FAQ_PROMPTS[idx].answer)
      setIsThinking(false)
    }, 300)
  }

  const handleAskCustom = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customQuery.trim()) return

    setIsThinking(true)
    const q = customQuery
    setCustomQuery('')

    setTimeout(() => {
      setActiveQuestion(q)
      setActiveAnswer(
        `Terima kasih atas soalan anda mengenai "${q}". PUSPA mengalu-alukan sebarang pertanyaan berkaitan agihan zakat, pendaftaran sukarelawan, dan program asnaf. Untuk maklumat terperinci segera, anda juga boleh menghubungi talian khidmat pelanggan kami di 03-8920 1111 atau terus mengisi borang permohonan digital di portal ini.`
      )
      setIsThinking(false)
    }, 600)
  }

  return (
    <section id="maria" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        {/* Container Box */}
        <div className="rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background/80 to-background/60 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
         
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
         
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
           
            {/* Left Col: Maria Avatar & Intro */}
            <div className="lg:col-span-5 space-y-5 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <div className="relative">
                  <Image
                    src="/maria-face-clean.png"
                    alt="Maria AI PUSPA"
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-2xl object-cover border-2 border-primary shadow-xl bg-primary/10 p-0.5"
                  />
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-primary rounded-full border-2 border-background animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                    <h3 className="font-extrabold text-xl text-foreground">Maria AI</h3>
                    <Badge className="bg-primary text-primary-foreground text-[10px] h-4 px-1.5">v2.5</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Pegawai Maya Kepintaran Buatan PUSPA</p>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  Ada Sebarang Kemusykilan? Tanya Maria AI.
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Maria AI dilatih khusus dengan tatacara pengurusan asnaf, kriteria kelayakan, dan prosedur operasi standard (SOP) agihan PUSPA.
                </p>
              </div>

              {/* Quick FAQ buttons */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Soalan Lazim Rakyat:
                </span>
                <div className="flex flex-col gap-2">
                  {FAQ_PROMPTS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectFaq(idx)}
                      className={`text-left p-2.5 rounded-xl text-xs font-medium border transition-all duration-200 flex items-center justify-between ${
                        selectedFaq === idx
                          ? 'bg-primary/10 border-primary text-primary dark:text-primary/80 font-semibold'
                          : 'bg-card/40 hover:bg-card border-border/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span className="truncate pr-2">{item.question}</span>
                      <ArrowRight className="h-3 w-3 shrink-0 opacity-70" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Interactive Chat Bubble & Query Box */}
            <div className="lg:col-span-7 space-y-4">
             
              {/* Chat Canvas Box */}
              <div className="rounded-2xl border border-white/10 bg-card/70 backdrop-blur-xl p-5 sm:p-6 shadow-xl space-y-4 min-h-[280px] flex flex-col justify-between">
               
                <div className="space-y-4">
                  {/* User Query Bubble */}
                  <div className="flex items-start justify-end gap-2.5">
                    <div className="p-3 rounded-2xl rounded-tr-none bg-primary text-primary-foreground text-xs font-medium max-w-[85%] shadow-md">
                      {activeQuestion}
                    </div>
                  </div>

                  {/* Maria AI Response Bubble */}
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-md">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="p-4 rounded-2xl rounded-tl-none bg-muted/60 border border-border/60 text-xs sm:text-sm text-foreground leading-relaxed space-y-2 max-w-[90%]">
                      {isThinking ? (
                        <div className="flex items-center gap-1.5 py-1 text-muted-foreground">
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                          <span className="text-xs ml-1">Maria sedang merumuskan jawapan…</span>
                        </div>
                      ) : (
                        <p>{activeAnswer}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Direct Query Input */}
                <form onSubmit={handleAskCustom} className="pt-3 border-t flex gap-2">
                  <Input
                    placeholder="Taip soalan lain kepada Maria AI..."
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    className="h-10 text-xs bg-muted/40 border-border focus-visible:ring-primary"
                  />
                  <Button
                    type="submit"
                    disabled={isThinking || !customQuery.trim()}
                    className="h-10 px-4 bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>

              </div>

              <div className="flex items-center justify-between text-[11px] text-muted-foreground px-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  Privasi & data terlindung
                </span>
                <span>Respons masa nyata Maria AI</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
