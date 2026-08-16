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

const SUGGESTED_QUESTIONS = [
  'Bagaimana saya boleh menderma?',
  'Apakah kategori asnaf yang diliputi?',
  'Bagaimana Maria AI membantu staf PUSPA?',
  'Terangkan proses agihan dana?',
]

const FALLBACK_RESPONSE =
  'Saya Maria AI, pembantu digital PUSPA. Saya boleh membantu anda mengenai proses infaq, agihan dana kepada asnaf, program Asnafpreneur, dan semakan status permohonan bantuan. Sila rujuk staf PUSPA untuk maklumat peribadi atau kes tertentu.'

export function PortalMariaAssistant() {
  const [activeQuestion, setActiveQuestion] = useState(SUGGESTED_QUESTIONS[0])
  const [activeAnswer, setActiveAnswer] = useState(FALLBACK_RESPONSE)
  const [isThinking, setIsThinking] = useState(false)
  const [customQuery, setCustomQuery] = useState('')

  const handleAsk = (question: string) => {
    setActiveQuestion(question)
    setIsThinking(true)
    setTimeout(() => {
      setActiveAnswer(FALLBACK_RESPONSE)
      setIsThinking(false)
    }, 1200)
  }

  const handleAskCustom = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customQuery.trim()) return
    handleAsk(customQuery)
    setCustomQuery('')
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
                    alt="Maria AI PUSPA assistant"
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-2xl object-cover border-2 border-primary shadow-xl bg-primary/10 p-0.5"
                  />
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-primary rounded-full border-2 border-background animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-lg text-foreground">Maria AI</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
                      <Sparkles className="h-3 w-3 mr-1" />
                      PUSPA Assistant
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Pembantu digital PUSPA anda</p>
                </div>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-black text-foreground leading-tight">
                  Tanya Maria AI
                  <span className="block text-primary text-lg sm:text-xl font-bold">Pembantu Digital PUSPA</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Maria AI sedia membantu jawab soalan anda mengenai program PUSPA, proses infaq,
                  dan semakan status permohonan bantuan asnaf — 24 jam sehari.
                </p>
              </div>

              {/* Quick Question Chips */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleAsk(q)}
                    className={`text-xs rounded-full px-3 py-1.5 border transition-all active:scale-95 ${
                      activeQuestion === q
                        ? 'bg-primary text-primary-foreground border-primary shadow-md'
                        : 'bg-card/60 text-muted-foreground border-border/60 hover:border-primary/40 hover:text-foreground'
                    }`}
                  >
                    {q}
                  </button>
                ))}
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

                  {/* AI Response Bubble */}
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
                    className="h-11 text-sm bg-muted/40 border-border focus-visible:ring-primary"
                  />
                  <Button
                    type="submit"
                    disabled={isThinking || !customQuery.trim()}
                    className="h-11 px-4 bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
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
