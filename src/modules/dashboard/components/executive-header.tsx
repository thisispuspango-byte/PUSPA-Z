'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PlusCircle, HandCoins, Package, Bot } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export function ExecutiveHeader() {
  const { setView, setAiChatOpen } = useAppStore()

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-2xl bg-gradient-to-r from-purple-950/80 via-purple-900/40 to-indigo-950/60 p-6 ring-1 ring-purple-500/30 shadow-xl backdrop-blur-xl">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-2xl font-black tracking-tight text-white">
            Papan Pemuka PUSPA V5
          </h1>
          <Badge className="bg-purple-500/20 text-purple-200 ring-1 ring-purple-400/30 text-[11px] font-bold">
            LIVE OS
          </Badge>
        </div>
        <p className="text-xs text-purple-200/80 font-medium">
          Sistem Pentadbiran Terpusat Pertubuhan Urus Peduli Asnaf (PPM-024-10-05012022)
        </p>
      </div>

      {/* 1-Click Quick Action Launchers */}
      <div className="flex flex-wrap items-center gap-2 shrink-0">
        <Button id="executive-header-Button-1"
          onClick={() => setView('permohonan-bantuan')}
          size="sm"
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold gap-1.5 shadow-md rounded-xl text-xs"
        >
          <PlusCircle className="h-4 w-4" /> Borang Bantuan
        </Button>
        <Button id="executive-header-Button-2"
          onClick={() => setView('donations')}
          size="sm"
          variant="outline"
          className="border-purple-500/40 text-purple-100 hover:bg-purple-900/50 gap-1.5 rounded-xl text-xs"
        >
          <HandCoins className="h-4 w-4 text-emerald-400" /> Rekod Derma
        </Button>
        <Button id="executive-header-Button-3"
          onClick={() => setView('puspa-niaga')}
          size="sm"
          variant="outline"
          className="border-purple-500/40 text-purple-100 hover:bg-purple-900/50 gap-1.5 rounded-xl text-xs"
        >
          <Package className="h-4 w-4 text-amber-400" /> PUSPA Niaga
        </Button>
        <Button id="executive-header-Button-4"
          onClick={() => setAiChatOpen(true)}
          size="sm"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold gap-1.5 shadow-md rounded-xl text-xs"
        >
          <Bot className="h-4 w-4 text-purple-200" /> Maria AI
        </Button>
      </div>
    </div>
  )
}
