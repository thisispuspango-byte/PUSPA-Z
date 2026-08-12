'use client'

import { useEffect } from 'react'
import { useAppStore, type ViewId } from '@/lib/store'
import { canAccessView } from '@/lib/access-control'
import type { LucideIcon } from 'lucide-react'
import {
  LayoutDashboard,
  Users,
  FileText,
  HandCoins,
  ArrowDownToLine,
  Calendar,
  Shield,
  BarChart3,
  ScanFace,
  FolderOpen,
  Activity,
  Heart,
  Bot,
  Settings,
  Lock,
  UserCog,
  Sparkles,
  Rocket,
  UtensilsCrossed,
  BookOpen,
  Building2,
  Building,
  ClipboardList,
  Package,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar'
import { UserAvatar } from '@/components/user-avatar'

interface NavItem {
  id: ViewId
  label: string
  labelMs?: string
  icon: LucideIcon
  badge?: string
  group: string
}

const navItems: NavItem[] = [
  // Utama (PUSPA Niaga diletakkan TEPAT di bawah Dashboard)
  { id: 'dashboard', label: 'Dashboard', labelMs: 'Papan Pemuka', icon: LayoutDashboard, group: 'Utama' },
  { id: 'puspa-niaga', label: 'PUSPA Niaga', labelMs: 'PUSPA Niaga', icon: Package, badge: 'Baru', group: 'Utama' },
  { id: 'ai', label: 'PUSPA AI (Maria)', labelMs: 'AI PUSPA', icon: Bot, badge: 'AI', group: 'Utama' },

  // Teras & Asnaf
  { id: 'permohonan-bantuan', label: 'Borang Bantuan', labelMs: 'Permohonan Bantuan', icon: ClipboardList, group: 'Teras & Asnaf' },
  { id: 'members', label: 'Ahli Asnaf', labelMs: 'Ahli Asnaf', icon: Users, group: 'Teras & Asnaf' },
  { id: 'cases', label: 'Kes Asnaf', labelMs: 'Pengurusan Kes', icon: FileText, group: 'Teras & Asnaf' },
  { id: 'carta-organisasi', label: 'Carta Organisasi', labelMs: 'Carta Organisasi', icon: Building2, group: 'Teras & Asnaf' },
  { id: 'institusi', label: 'Institusi & Kawasan', labelMs: 'Institusi & Kawasan', icon: Building, group: 'Teras & Asnaf' },

  // Kewangan & Agihan
  { id: 'donations', label: 'Sumbangan', labelMs: 'Sumbangan', icon: HandCoins, group: 'Kewangan & Agihan' },
  { id: 'donors', label: 'Penderma', labelMs: 'Penderma', icon: Heart, group: 'Kewangan & Agihan' },
  { id: 'disbursements', label: 'Agihan Dana', labelMs: 'Agihan', icon: ArrowDownToLine, group: 'Kewangan & Agihan' },

  // Program & Niaga
  { id: 'asnafpreneur', label: 'Asnafpreneur', labelMs: 'Asnafpreneur', icon: Rocket, group: 'Program & Niaga' },
  { id: 'programmes', label: 'Program Asnaf', labelMs: 'Program', icon: Calendar, group: 'Program & Niaga' },
  { id: 'sedekah-jumaat', label: 'Sedekah Jumaat', labelMs: 'Sedekah Jumaat', icon: UtensilsCrossed, group: 'Program & Niaga' },
  { id: 'volunteers', label: 'Sukarelawan', labelMs: 'Sukarelawan', icon: Sparkles, group: 'Program & Niaga' },

  // Tadbir Urus & Operasi
  { id: 'documents', label: 'Pengurusan Dokumen', labelMs: 'Dokumen', icon: FolderOpen, group: 'Tadbir Urus & Operasi' },
  { id: 'activities', label: 'Log Aktiviti', labelMs: 'Aktiviti', icon: Activity, group: 'Tadbir Urus & Operasi' },
  { id: 'compliance', label: 'Pematuhan Audit', labelMs: 'Pematuhan', icon: Shield, group: 'Tadbir Urus & Operasi' },
  { id: 'reports', label: 'Laporan & Analitik', labelMs: 'Laporan', icon: BarChart3, group: 'Tadbir Urus & Operasi' },
  { id: 'ekyc', label: 'eKYC Verification', labelMs: 'eKYC', icon: ScanFace, group: 'Tadbir Urus & Operasi' },
  { id: 'tapsecure', label: 'TapSecure', labelMs: 'TapSecure', icon: Lock, group: 'Tadbir Urus & Operasi' },
  { id: 'admin', label: 'Pentadbiran', labelMs: 'Pentadbiran', icon: UserCog, group: 'Tadbir Urus & Operasi' },
  { id: 'docs', label: 'Panduan Sistem', labelMs: 'Panduan', icon: BookOpen, group: 'Tadbir Urus & Operasi' },
  { id: 'settings', label: 'Tetapan Sistem', labelMs: 'Tetapan', icon: Settings, group: 'Tadbir Urus & Operasi' },
]

export function AppSidebar() {
  const { currentView, setView, currentUser, setCurrentUser } = useAppStore()
  const { isMobile, setOpenMobile } = useSidebar()
  const userRole = currentUser?.role || 'staff'

  useEffect(() => {
    try {
      const raw = localStorage.getItem('puspa-settings')
      if (!raw) return
      const u = useAppStore.getState().currentUser
      if (!u) return
      const parsed = JSON.parse(raw) as { profileImageUrl?: string }
      const url = typeof parsed.profileImageUrl === 'string' ? parsed.profileImageUrl.trim() : ''
      if (url && u.imageUrl !== url) setCurrentUser({ ...u, imageUrl: url })
    } catch {
      /* ignore */
    }
  }, [setCurrentUser])

  // Kelompokkan navigasi mengikut kumpulan secara teratur
  const groupedItems = navItems.reduce<Record<string, NavItem[]>>((acc, item) => {
    const group = item.group
    if (!acc[group]) acc[group] = []
    acc[group].push(item)
    return acc
  }, {})

  return (
    <Sidebar collapsible="icon" className="border-r border-purple-500/30 bg-[#0f071e] text-white shadow-2xl">
      {/* Header Logo PUSPA dengan gambar Maria Assistant */}
      <SidebarHeader className="p-4 pb-3 bg-[#150a2a]/90 backdrop-blur-md border-b border-purple-500/20">
        <div className="flex items-center gap-3 min-w-0 overflow-hidden group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0">
          <div className="relative flex h-10 w-10 items-center justify-center shrink-0 rounded-xl bg-white shadow-lg ring-2 ring-purple-400/50">
            <img
              src="/puspa-logo-transparent.png"
              alt="PUSPA"
              className="h-7 w-7 object-contain"
            />
          </div>
          
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black leading-none tracking-tighter text-white">
                PUSPA
              </span>
              <span className="bg-purple-600/80 text-purple-200 text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-1 ring-purple-400/40">
                V5
              </span>
            </div>
            <span className="text-[10px] font-bold leading-tight text-purple-200 uppercase tracking-tight mt-1 truncate">
              Pertubuhan Urus Peduli Asnaf
            </span>
          </div>
        </div>
      </SidebarHeader>

      {/* Direct 1-Click Access Navigation Groups */}
      <SidebarContent className="px-2.5 py-2 scrollbar-none">
        {Object.entries(groupedItems).map(([group, items]) => {
          const accessibleItems = items.filter((item) => canAccessView(item.id, userRole))
          if (accessibleItems.length === 0) return null

          return (
            <SidebarGroup key={group} className="py-2">
              <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-wider text-purple-300/90 px-2.5 py-1 mb-1 bg-purple-950/40 rounded-md ring-1 ring-purple-500/20">
                {group}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="gap-1">
                  {accessibleItems.map((item) => {
                    const Icon = item.icon
                    const isActive = currentView === item.id
                    return (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          isActive={isActive}
                          onClick={() => {
                            setView(item.id)
                            if (isMobile) setOpenMobile(false)
                          }}
                          tooltip={`${item.label} — ${item.labelMs || item.label}`}
                          className={
                            isActive
                              ? 'relative bg-gradient-to-r from-purple-900/90 via-purple-900/60 to-indigo-950/40 text-white font-bold shadow-md ring-1 ring-purple-400/30 rounded-xl py-2.5 transition-all overflow-hidden'
                              : 'hover:bg-purple-900/30 hover:text-white text-purple-100/80 text-xs py-2 rounded-xl transition-all duration-200 group'
                          }
                        >
                          {/* Indicator Garisan Aksen Kiri (Infinitekala Style) */}
                          {isActive && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-gradient-to-b from-purple-400 via-purple-300 to-indigo-400 shadow-[0_0_10px_rgba(167,139,250,0.8)]" />
                          )}

                          {/* Kotak Ikon Mewah (Custom Glassmorphism Icon Container) */}
                          <div
                            className={
                              isActive
                                ? 'flex h-8 w-8 items-center justify-center shrink-0 rounded-lg bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700 text-white shadow-[0_0_14px_rgba(167,139,250,0.5)] ring-1 ring-purple-300/40'
                                : 'flex h-7 w-7 items-center justify-center shrink-0 rounded-lg bg-purple-950/40 text-purple-300/80 ring-1 ring-purple-500/20 group-hover:bg-purple-900/60 group-hover:text-white group-hover:ring-purple-400/40 group-hover:scale-105 transition-all duration-200'
                            }
                          >
                            <Icon className="h-4 w-4 stroke-[1.75]" />
                          </div>

                          <span className={`truncate flex-1 ml-1.5 ${isActive ? 'font-bold text-white text-sm' : 'font-medium'}`}>
                            {item.label}
                          </span>

                          {item.badge && (
                            <span className="ml-auto rounded-full bg-purple-400/20 px-2 py-0.5 text-[10px] font-bold text-purple-200 ring-1 ring-purple-300/40 shadow-sm group-data-[collapsible=icon]:hidden">
                              {item.badge}
                            </span>
                          )}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}
      </SidebarContent>

      <SidebarSeparator className="bg-purple-500/20" />

      {/* User Footer */}
      <SidebarFooter className="p-2.5 bg-[#150a2a]/90 backdrop-blur-md">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-purple-900/50 rounded-xl ring-1 ring-purple-500/30"
              tooltip={`${currentUser?.name || 'User'} (${userRole})`}
            >
              <UserAvatar
                name={currentUser?.name}
                src={currentUser?.imageUrl}
                size="sm"
                className="ring-sidebar-border"
              />
              <div className="flex flex-col gap-0.5 leading-none min-w-0 group-data-[collapsible=icon]:hidden">
                <span className="text-xs font-bold text-white truncate">{currentUser?.name || 'User'}</span>
                <span className="text-[11px] text-purple-300/80 capitalize font-medium">{userRole}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}



