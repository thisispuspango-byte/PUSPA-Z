'use client'

import { useAppStore, type ViewId } from '@/lib/store'
import { Search, Moon, Sun, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { useTheme } from 'next-themes'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { formatDistanceToNow } from 'date-fns'
const viewTitles: Record<ViewId, { en: string; ms: string }> = {
  dashboard: { en: 'Dashboard', ms: 'Papan Pemuka' },
  members: { en: 'Member Management', ms: 'Pengurusan Ahli' },
  cases: { en: 'Case Management', ms: 'Pengurusan Kes' },
  programmes: { en: 'Programme Management', ms: 'Pengurusan Program' },
  donations: { en: 'Donation Management', ms: 'Pengurusan Sumbangan' },
  donors: { en: 'Donor CRM', ms: 'Pengurusan Penderma' },
  disbursements: { en: 'Disbursement Management', ms: 'Pengurusan Agihan' },
  volunteers: { en: 'Volunteer Management', ms: 'Pengurusan Sukarelawan' },
  compliance: { en: 'Compliance', ms: 'Pematuhan' },
  reports: { en: 'Reports & Analytics', ms: 'Laporan & Analitik' },
  ekyc: { en: 'eKYC Verification', ms: 'Pengesahan eKYC' },
  documents: { en: 'Document Management', ms: 'Pengurusan Dokumen' },
  activities: { en: 'Activity Log', ms: 'Log Aktiviti' },
  ai: { en: 'Maria Puspa AI', ms: 'AI Maria Puspa' },
  settings: { en: 'Settings', ms: 'Tetapan' },
  tapsecure: { en: 'TapSecure', ms: 'TapSecure' },
  admin: { en: 'Admin Panel', ms: 'Panel Pentadbir' },
  asnafpreneur: { en: 'Asnafpreneur', ms: 'Asnafpreneur' },
  'sedekah-jumaat': { en: 'Sedekah Jumaat', ms: 'Sedekah Jumaat' },
  docs: { en: 'Panduan', ms: 'Panduan Pengguna' },
  'carta-organisasi': { en: 'Organization Chart', ms: 'Carta Organisasi' },
  institusi: { en: 'Institutions & Areas', ms: 'Institusi & Kawasan Bantuan' },
  'permohonan-bantuan': { en: 'Aid Application', ms: 'Borang Permohonan Bantuan' },
  'puspa-niaga': { en: 'PUSPA Niaga', ms: 'PUSPA Niaga' },
}

export function AppHeader() {
  const { currentView, searchQuery, setSearchQuery } = useAppStore()
  const { theme, setTheme } = useTheme()
  
  const title = viewTitles[currentView] || { en: currentView, ms: currentView }

  const { data: notifications } = useQuery({
    queryKey: ['header-notifications'],
    queryFn: async () => {
      const res = await fetch('/api/v1/activities?limit=5&sort=createdAt&order=desc')
      if (!res.ok) return { data: [], total: 0 }
      return res.json()
    },
    refetchInterval: 60000,
  })
  const notifCount = notifications?.total ?? 0

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-white/20 bg-background/70 px-4 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 lg:px-6 dark:border-white/10">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <SidebarTrigger className="-ml-1 size-7" />
      <Separator orientation="vertical" className="mr-2 h-4" />

      <div className="flex-1 min-w-0">
        <h2 className="text-sm font-semibold truncate">{title.en}</h2>
        <p className="text-xs text-muted-foreground truncate">{title.ms}</p>
      </div>

      <div className="hidden md:flex items-center gap-2 w-64">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            placeholder="Cari… / Search…"
            className="pl-8 h-8 text-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button id="app-header-Button-1" variant="ghost" size="icon" className="h-8 w-8 relative">
              <Bell className="h-4 w-4" aria-hidden="true" />
              {notifCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                  {notifCount > 9 ? '9+' : notifCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-3 border-b">
              <h4 className="text-sm font-bold">Pemberitahuan</h4>
              <p className="text-xs text-muted-foreground">{notifCount} aktiviti terkini</p>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {(notifications?.data ?? []).map((n: any) => (
                <div key={n.id} className="flex items-start gap-3 p-3 hover:bg-muted/50 border-b last:border-0">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{n.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
              {(notifications?.data ?? []).length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-6">Tiada pemberitahuan</p>
              )}
            </div>
          </PopoverContent>
        </Popover>

        <Button id="app-header-Button-2"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  )
}
