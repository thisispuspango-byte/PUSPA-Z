---
title: "PUSPA-Z — Design System & Visual Language Specification"
document_id: "PUSPA-DOC-DESIGN-001"
version: "5.6.6"
last_updated: "2026-08-16T09:30:00+08:00"
maintainer: "HYPER-SOVEREIGN CONDUCTOR & ARCHITECT"
classification: "INTERNAL UI/UX"
lifecycle_status: "ACTIVE"
---

# PUSPA V5.6 — Design System & Visual Language

> **Pertubuhan Urus Peduli Asnaf (PPM-024-10-05012022)**
> Cerdas. Mesra. Sentiasa di sisi anda.

---

## 📜 Audit & Revision Ledger

| Versi | Tarikh & Masa (MYT) | Pengarang / Ejen | Kenapa (Rasional Perubahan) | Bagaimana (Kaedah & Skop Fail) | Status / Pengesahan |
| :---: | :---: | :---: | :--- | :--- | :---: |
| `5.6.6` | `2026-08-16 09:30` | `Conductor Agent` | Menggantikan pergerakan kamera statik kepada pergerakan objek dan dinamik cecair tulen bagi semua 5 zon diorama | Menjana video procedural berbilang lapisan (wap mendidih, laser pengimbas, roda berputar, zarah barakah, radar siber) via multi-threaded Python FFmpeg pipeline | `chrome-devtools verified (5/5 live)` |
| `5.6.5` | `2026-08-16 09:10` | `Conductor Agent` | Mengesahkan kelancaran 5 video diorama (Dapur ke Hab) & membaiki pengecualian media pada middleware | Menambah `mp4` ke matcher `src/middleware.ts`, menyuntik `media-src` di `next.config.ts`, dan mengesahkan status main video via Chrome DevTools | `chrome-devtools verified (5/5 playing)` |
| `5.6.4` | `2026-08-16 08:45` | `Conductor Agent` | Menggantikan semua foto lama dengan 6 foto dokumentari berkualiti tinggi baharu bagi seksyen Galeri Lapangan | Menjana 6 foto realistik di `public/gallery-agihan-0X.jpg`, memadam foto lama, dan mengemas kini `portal-agihan-gallery.tsx` | `chrome-devtools verified` |
| `5.6.3` | `2026-08-16 08:15` | `Conductor Agent` | Mengubah semua 5 imej diorama statik kepada video animasi bergerak 2.5D sinusoidal loop | Menjana 5 fail video H.264 di `public/videos/diorama-0X.mp4` via FFmpeg & mengemas kini `portal-interactive-ecosystem.tsx` | `chrome-devtools verified` |
| `5.6.2` | `2026-08-15 23:33` | `Conductor Agent` | Menguatkuasakan standard jejak audit SMS-v1.0 bagi spesifikasi reka bentuk UI/UX | Menambah blok YAML Frontmatter dan Audit Ledger lengkap | `typecheck: 0 errors` |
| `5.6.1` | `2026-08-15 23:25` | `Conductor Agent` | Menyelaraskan reka bentuk susun atur Portal Awam dan Diorama 3D Interaktif | Mengemaskini Seksyen 4 dengan seni bina layout Dual-Layer | `doc verified` |
| `5.6.0` | `2026-08-13 18:00` | `Conductor Agent` | Pembaharuan sistem warna OKLCH dan reka bentuk Glassmorphism | Penyeragaman token warna di `src/app/globals.css` | `verified visually` |

---

## Table of Contents

1. [Brand Identity](#1-brand-identity)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Layout Architecture](#4-layout-architecture)
5. [Sidebar Design](#5-sidebar-design)
6. [Header Bar](#6-header-bar)
7. [AI Chat Panel — Maria Puspa](#7-ai-chat-panel--maria-puspa)
8. [Module Pages](#8-module-pages)
9. [Component Library](#9-component-library)
10. [Loading States](#10-loading-states)
11. [Responsive Design](#11-responsive-design)
12. [Dark Mode](#12-dark-mode)
13. [Accessibility](#13-accessibility)
14. [Custom Scrollbar](#14-custom-scrollbar)
15. [Iconography](#15-iconography)
16. [State Management & Navigation](#16-state-management--navigation)
17. [Role-Based Access Control](#17-role-based-access-control)
18. [Animation & Motion](#18-animation--motion)

---

## 1. Brand Identity

| Property        | Value                                                    |
| --------------- | -------------------------------------------------------- |
| **Organization**  | Pertubuhan Urus Peduli Asnaf (PUSPA)                     |
| **Registration**  | PPM-024-10-05012022                                      |
| **Primary Color** | PUSPA Purple `#6A0DAD`                                   |
| **Brand Symbol**  | Lotus mandala — represents care, growth, community       |
| **AI Mascot**     | Maria Puspa — female AI assistant character               |
| **Tagline**       | *Cerdas. Mesra. Sentiasa di sisi anda.* (Intelligent. Friendly. Always by your side.) |

### Brand Assets

| Asset                     | Path                                  | Usage                                    |
| ------------------------- | ------------------------------------- | ---------------------------------------- |
| PUSPA Logo                | `/public/puspa-logo-transparent.png`  | Sidebar collapsed icon, favicon, spinner |
| Brand Identity (wide)     | `/public/puspa-brand-identity.png`    | Sidebar expanded header                  |
| Brand Identity (small)    | `/public/puspa-brand-identity-sm.png` | Compact contexts                         |
| Official Logo             | `/public/puspa-logo-official.png`     | Print / formal contexts                  |
| Maria Puspa Avatar        | `/public/maria-puspa-reference.png`   | Official Maria character reference       |
| Maria Puspa Face (128px)  | `/public/maria-puspa-face-128.png`    | Thumbnail avatar                         |
| SVG Logo                  | `/public/logo.svg`                    | Scalable contexts                        |

Brand assets are managed via `@/lib/puspa-brand-assets` and `@/lib/maria-avatar`. Maria avatar now resolves to a canonical public asset path for consistency across chat panel, AI page, and floating widget.

### Brand Color Palette

| Token              | Hex         | oklch                        | Usage                       |
| ------------------ | ----------- | ---------------------------- | --------------------------- |
| `puspa-primary`    | `#6A0DAD`   | oklch(0.368 0.212 295)       | Primary brand purple        |
| `puspa-dark`       | `#4B0082`   | —                            | Deep indigo-purple          |
| `puspa-light`      | `#9370DB`   | oklch(0.581 0.154 291)       | Medium lavender             |
| `puspa-pale`       | `#E6E6FA`   | —                            | Pale lavender / highlights  |

---

## 2. Color System

The entire color system uses **oklch color space** via CSS custom properties, enabling perceptually uniform lightness across hues. All values live in `src/app/globals.css`.

### 2.1 Light Mode (`:root`)

| Token                    | oklch Value               | Visual Description                          |
| ------------------------ | ------------------------- | ------------------------------------------- |
| `--background`           | oklch(0.985 0.002 295)   | Near-white with faint purple undertone      |
| `--foreground`           | oklch(0.145 0.015 295)   | Very dark gray-purple                       |
| `--card`                 | oklch(1 0 0)             | Pure white                                  |
| `--card-foreground`      | oklch(0.145 0.015 295)   | Dark gray-purple text                       |
| `--popover`              | oklch(1 0 0)             | Pure white                                  |
| `--popover-foreground`   | oklch(0.145 0.015 295)   | Dark gray-purple text                       |
| `--primary`              | oklch(0.368 0.212 295)   | **PUSPA Purple** (#6A0DAD)                  |
| `--primary-foreground`   | oklch(0.985 0 0)         | Near-white on primary                       |
| `--secondary`            | oklch(0.918 0.034 291)   | Pale lavender background                    |
| `--secondary-foreground` | oklch(0.368 0.212 295)   | PUSPA Purple on secondary                   |
| `--muted`                | oklch(0.952 0.015 295)   | Very light purple-gray                      |
| `--muted-foreground`     | oklch(0.5 0.02 295)      | Medium gray-purple                          |
| `--accent`               | oklch(0.918 0.034 291)   | Pale lavender (same as secondary)           |
| `--accent-foreground`    | oklch(0.368 0.212 295)   | PUSPA Purple on accent                      |
| `--destructive`          | oklch(0.577 0.245 27.325)| Red for danger/delete                       |
| `--border`               | oklch(0.908 0.025 295)   | Light purple-gray border                    |
| `--input`                | oklch(0.908 0.025 295)   | Light purple-gray input border              |
| `--ring`                 | oklch(0.368 0.212 295)   | PUSPA Purple focus ring                     |

### 2.2 Dark Mode (`.dark`)

| Token                    | oklch Value               | Visual Description                          |
| ------------------------ | ------------------------- | ------------------------------------------- |
| `--background`           | oklch(0.13 0.02 295)     | Deep dark purple-black                      |
| `--foreground`           | oklch(0.965 0.01 295)    | Near-white with purple tint                 |
| `--card`                 | oklch(0.17 0.025 295)    | Slightly lighter dark card                  |
| `--card-foreground`      | oklch(0.965 0.01 295)    | Near-white text                             |
| `--primary`              | oklch(0.581 0.154 291)   | Lighter purple for dark mode contrast       |
| `--primary-foreground`   | oklch(0.247 0.208 295)   | Deep purple on primary                      |
| `--secondary`            | oklch(0.22 0.04 295)     | Dark muted purple                           |
| `--muted`                | oklch(0.22 0.04 295)     | Dark muted purple                           |
| `--muted-foreground`     | oklch(0.65 0.04 295)     | Medium gray for secondary text              |
| `--destructive`          | oklch(0.704 0.191 22.216)| Lighter red for dark mode                   |
| `--border`               | oklch(0.28 0.04 295)     | Subtle dark purple border                   |
| `--ring`                 | oklch(0.581 0.154 291)   | Lighter purple focus ring                   |

### 2.3 Chart Colors

A 5-color chart palette themed to the PUSPA brand with complementary accent hues:

| Token       | Light Mode                     | Dark Mode                      | Visual       |
| ----------- | ------------------------------ | ------------------------------ | ------------ |
| `--chart-1` | oklch(0.368 0.212 295)        | oklch(0.581 0.154 291)        | PUSPA Purple |
| `--chart-2` | oklch(0.581 0.154 291)        | oklch(0.696 0.17 162.48)      | Lavender     |
| `--chart-3` | oklch(0.646 0.222 41.116)     | oklch(0.769 0.188 70.08)      | Amber accent |
| `--chart-4` | oklch(0.6 0.118 184.704)      | oklch(0.627 0.265 303.9)      | Teal accent  |
| `--chart-5` | oklch(0.769 0.188 70.08)      | oklch(0.645 0.246 16.439)     | Gold accent  |

### 2.4 Sidebar Colors

| Token                        | Light Mode                     | Dark Mode                      |
| ---------------------------- | ------------------------------ | ------------------------------ |
| `--sidebar`                  | oklch(0.247 0.208 295)        | oklch(0.17 0.06 295)          |
| `--sidebar-foreground`       | oklch(0.965 0.01 295)         | oklch(0.965 0.01 295)         |
| `--sidebar-primary`          | oklch(0.918 0.034 291)        | oklch(0.581 0.154 291)        |
| `--sidebar-primary-foreground` | oklch(0.247 0.208 295)      | oklch(0.965 0.01 295)         |
| `--sidebar-accent`           | oklch(0.32 0.18 295)          | oklch(0.24 0.06 295)          |
| `--sidebar-accent-foreground` | oklch(0.965 0.01 295)        | oklch(0.965 0.01 295)         |
| `--sidebar-border`           | oklch(0.35 0.16 295)          | oklch(0.30 0.05 295)          |
| `--sidebar-ring`             | oklch(0.581 0.154 291)        | oklch(0.581 0.154 291)        |

The sidebar uses a **deep purple gradient** background in both themes — significantly darker than the main content area — creating a strong visual separation.

### 2.5 Border Radius

All radii derive from a single `--radius` token:

```css
--radius: 0.625rem;       /* 10px base */
--radius-sm: calc(var(--radius) - 4px);  /* 6px */
--radius-md: calc(var(--radius) - 2px);  /* 8px */
--radius-lg: var(--radius);               /* 10px */
--radius-xl: calc(var(--radius) + 4px);  /* 14px */
```

---

## 3. Typography

### 3.1 Font Stack

| Role    | Font Family    | Variable              | Source                      |
| ------- | -------------- | --------------------- | --------------------------- |
| Sans    | Geist Sans     | `--font-geist-sans`   | `next/font/google` (Geist)  |
| Mono    | Geist Mono     | `--font-geist-mono`   | `next/font/google` (Geist_Mono) |

Applied to `<body>` via Tailwind: `className="... antialiased bg-background text-foreground"`

### 3.2 Language

- **HTML `lang` attribute**: `"ms"` (Bahasa Melayu)
- **Bilingual UI**: All navigation labels, page titles, and descriptive text use **English + Bahasa Melayu** pairings
- **Primary display language**: Bahasa Melayu for labels and descriptions; English for technical/structural terms

### 3.3 Bilingual Title Pattern

Every module page displays a bilingual title in the header:

```
English Title (semibold, 14px)
Keterangan Bahasa Melayu (muted, 10px)
```

Example from header:
```tsx
<h2 className="text-sm font-semibold">{title.en}</h2>
<p className="text-[10px] text-muted-foreground">{title.ms}</p>
```

### 3.4 Type Scale (Used in Practice)

| Context               | Size        | Weight    | Color Token            |
| --------------------- | ----------- | --------- | ---------------------- |
| Page title (header)   | 14px (sm)   | semibold  | foreground             |
| Page subtitle         | 10px        | normal    | muted-foreground       |
| Card title            | base (16px) | semibold  | foreground             |
| Card description      | xs (12px)   | normal    | muted-foreground       |
| Metric value          | 2xl (24px)  | bold      | foreground             |
| Metric label          | sm (14px)   | medium    | muted-foreground       |
| Body text             | 13px        | normal    | foreground             |
| Chat message          | 13px / xs   | normal    | context-dependent      |
| Badge text            | 9–10px      | medium    | context-dependent      |
| Sidebar nav item      | sm (14px)   | truncate  | sidebar-foreground     |
| Sidebar group label   | xs          | medium    | sidebar-foreground/50  |

---

## 4. Layout Architecture

### 4.1 Dual-Layer Layout Architecture

PUSPA V5.6 is designed with a **Dual-Layer Layout Architecture**:

1. **Public Portal Landing Layer (`/`)**:
   - High-impact public landing surface with Aurora ambient glow light source.
   - Glass floating navigation header (`PortalNavbar`).
   - 7 flagship landing sections:
     - `PortalHero`: Hero banner with 3D diorama preview widget.
     - `PortalInteractiveEcosystem`: 5-Zon 3D Diorama scroll flight (`#agihan`) with persistent bottom timeline navigation scrubber.
     - `PortalMetrics`: Real-time glassmorphic metric counters (`#metrik`).
     - `PortalAgihanGallery`: Institutional & field distribution photo gallery.
     - `PortalQuickActions`: Direct service action hub (`#tindakan`).
     - `PortalProgrammes`: Flagship welfare programmes showcase (`#program`).
     - `PortalMariaAssistant`: Public-facing Maria AI assistant & FAQ (`#maria`).
   - Interactive modals: `QuickDonateModal`, `CheckStatusModal`, `PermohonanBantuanModal`.

2. **Internal Management Dashboard Layer (`/dashboard`)**:
   - Authenticated SPA workspace for Staff, Admins, and Developers.
   - Navigation controlled via Zustand store (`useAppStore`), and `ViewRenderer` dynamically imports active module across 24 feature views.
   - Persistent `AppSidebar`, `AppHeader`, and slide-over `AiChatPanel` for Maria Puspa.

```
┌─────────────────────────────────────────────────────────────────────┐
│  PUBLIC PORTAL LAYER ( / )                                          │
│  ┌────────────────────────────────────────────────────────────────┐│
│  │ <PortalNavbar />                                               ││
│  │ <PortalHero />                                                 ││
│  │ <PortalInteractiveEcosystem /> (5-Zon 3D Diorama + Scrubber)   ││
│  │ <PortalMetrics />                                              ││
│  │ <PortalAgihanGallery />                                        ││
│  │ <PortalQuickActions />                                         ││
│  │ <PortalProgrammes />                                           ││
│  │ <PortalMariaAssistant />                                       ││
│  │ <PortalFooter />                                               ││
│  └────────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────────┤
│  MANAGEMENT DASHBOARD LAYER ( /dashboard )                          │
│  ┌────────────────────────────────────────────────────────────────┐│
│  │ <SidebarProvider>                                              ││
│  │  <AppSidebar />                                                ││
│  │  <SidebarInset>                                                ││
│  │    <AppHeader />                                               ││
│  │    <main><ViewRenderer /></main>                               ││
│  │  </SidebarInset>                                               ││
│  │  <AiChatPanel />                                               ││
│  │ </SidebarProvider>                                             ││
│  └────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────┘
```

### 4.2 Main Content Area

When the AI Chat Panel is open on desktop, the main content area receives a right margin:

```tsx
<SidebarInset className={cn(
  "transition-all duration-300 ease-in-out",
  aiChatOpen ? "md:pr-96" : ""
)}>
```

### 4.3 Content Padding

```tsx
<main className="p-4 lg:p-6">
  <ViewRenderer />
</main>
```

- Mobile/Tablet: `p-4` (16px)
- Desktop (lg+): `p-6` (24px)

---

## 5. Sidebar Design

### 5.1 Structure

```
┌──────────────────────────┐
│  🪷 PUSPA Brand          │  ← SidebarHeader: Logo (collapsed) / Brand identity PNG (expanded)
│     Identity             │
├──────────────────────────┤  ← SidebarSeparator
│ UTAMA                    │  ← SidebarGroupLabel
│ 📊 Dashboard             │  ← SidebarMenuButton (isActive = bg-sidebar-primary)
│ 👥 Members               │
│ 📋 Cases                 │
│ 📅 Activities            │
├──────────────────────────┤
│ KEWANGAN                 │
│ 💰 Donations             │
│ 🏦 Donors                │
│ 💸 Disbursements         │
├──────────────────────────┤
│ PROGRAM                  │
│ 📦 Programmes            │
│ 🚀 Asnafpreneur          │
│ 🍽️ Sedekah Jumaat        │
├──────────────────────────┤
│ OPERASI                  │
│ 🤝 Volunteers            │
│ 📄 Documents             │
├──────────────────────────┤
│ TADBIR URUS              │
│ ✅ Compliance             │
│ 🔍 eKYC                  │
│ 📈 Reports               │
│ ⚙️ Admin                 │
│ 🔐 TapSecure             │
├──────────────────────────┤
│ AI & BANTUAN             │
│ 🤖 PUSPA AI              │
│ 📖 Panduan               │
├──────────────────────────┤
│ ORGANISASI               │
│ 🏢 Carta Organisasi      │
│ 🏛️ Institusi             │
│ 📋 Permohonan Bantuan    │
├──────────────────────────┤
│ SISTEM                   │
│ 🔧 Settings              │
├──────────────────────────┤  ← SidebarSeparator
│ 👤 Admin PUSPA           │  ← SidebarFooter: Avatar + Name + Role
│    admin                 │
└──────────────────────────┘
   ▲ SidebarRail (resize handle)
```

### 5.2 Configuration

```tsx
<Sidebar collapsible="icon" className="border-r-0">
```

- **Collapsible**: `"icon"` — collapses to icon-only mode on mobile/narrow screens
- **No right border**: `border-r-0` (visual separation via color contrast)
- **SidebarRail**: Drag handle at the right edge for manual resize
- **Width**: Controlled by SidebarProvider / shadcn sidebar defaults

### 5.3 Active State

Active nav items use a strong visual indicator:

```tsx
className={isActive 
  ? 'bg-sidebar-primary text-sidebar-primary-foreground font-medium shadow-sm hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground' 
  : ''}
```

In light mode this renders as a **pale lavender pill** on the deep purple sidebar. In dark mode, a **medium lavender pill**.

### 5.4 Navigation Groups & Items

| Group            | Item                | ViewId                | Icon             | Bilingual Label                                | Min Role    |
| ---------------- | ------------------- | --------------------- | ---------------- | ---------------------------------------------- | ----------- |
| **Utama**        | Dashboard           | `dashboard`           | LayoutDashboard  | Dashboard / Papan Pemuka                       | staff       |
|                  | PUSPA Niaga         | `puspa-niaga`         | Package          | PUSPA Niaga / PUSPA Niaga                      | staff       |
|                  | Members             | `members`             | Users            | Members / Ahli Asnaf                           | staff       |
|                  | Cases               | `cases`               | FileText         | Cases / Kes                                    | staff       |
|                  | Activities          | `activities`          | Activity         | Activities / Aktiviti                          | staff       |
| **Kewangan**     | Donations           | `donations`           | HandCoins        | Donations / Sumbangan                          | staff       |
|                  | Donors              | `donors`              | Heart            | Donors / Penderma                               | staff       |
|                  | Disbursements       | `disbursements`       | ArrowDownToLine  | Disbursements / Agihan                          | staff       |
| **Program**      | Programmes          | `programmes`          | Calendar         | Programmes / Program                           | staff       |
|                  | Asnafpreneur        | `asnafpreneur`        | Rocket           | Asnafpreneur / Asnafpreneur                    | staff       |
|                  | Sedekah Jumaat      | `sedekah-jumaat`      | UtensilsCrossed  | Sedekah Jumaat / Sedekah Jumaat                | staff       |
| **Operasi**      | Volunteers          | `volunteers`          | Sparkles         | Volunteers / Sukarelawan                       | staff       |
|                  | Documents           | `documents`           | FolderOpen       | Documents / Dokumen                            | staff       |
| **Tadbir Urus**  | Compliance          | `compliance`          | Shield           | Compliance / Pematuhan                         | admin       |
|                  | Reports             | `reports`             | BarChart3        | Reports / Laporan                              | admin       |
|                  | eKYC                | `ekyc`                | ScanFace         | eKYC / eKYC                                    | admin       |
|                  | Admin               | `admin`               | UserCog          | Admin / Pentadbiran                            | admin       |
|                  | TapSecure           | `tapsecure`           | Lock             | TapSecure / TapSecure                          | admin       |
| **AI & Bantuan** | PUSPA AI            | `ai`                  | Bot              | PUSPA AI / AI PUSPA                            | developer   |
|                  | Panduan             | `docs`                | BookOpen         | Panduan / Panduan Pengguna                     | staff       |
| **Organisasi**   | Carta Organisasi    | `carta-organisasi`    | Building2        | Organization Chart / Carta Organisasi          | staff       |
|                  | Institusi           | `institusi`           | Building         | Institutions / Institusi & Kawasan             | staff       |
|                  | Permohonan Bantuan  | `permohonan-bantuan`  | ClipboardList    | Aid Application / Borang Permohonan Bantuan    | staff       |
| **Sistem**       | Settings            | `settings`            | Settings         | Settings / Tetapan                             | staff       |

### 5.5 Brand Header

- **Collapsed**: White rounded square containing the PUSPA logo icon (32×32px)
- **Expanded**: Brand identity PNG image (28px height, max 180px width), hidden when collapsed via `group-data-[collapsible=icon]:hidden`

### 5.6 User Footer

- **Avatar**: `UserAvatar` component with `bg-sidebar-primary/20 text-sidebar-primary`
- **Name**: 12px font-medium, truncated
- **Role**: 11px, `text-sidebar-foreground/60`, capitalized

---

## 6. Header Bar

```
┌──────────────────────────────────────────────────────────────────┐
│ [≡] │ │ English Title              [🔍 Search...] [🔔] [🌙]     │
│     │ │ Keterangan Bahasa Melayu                                    │
└──────────────────────────────────────────────────────────────────┘
  ↑     ↑   ↑                                ↑      ↑     ↑
  │     │   │                                │      │     └─ Theme toggle (Sun/Moon)
  │     │   │                                │      └─ Notifications (toast on click)
  │     │   │                                └─ Search input (md+ only)
  │     │   └─ Bilingual title area
  │     └─ Vertical separator
  └─ SidebarTrigger
```

### Header Properties

- **Height**: `h-14` (56px)
- **Sticky**: `sticky top-0 z-30`
- **Background**: `bg-background/95 backdrop-blur` with `supports-[backdrop-filter]:bg-background/60`
- **Border**: `border-b`
- **Padding**: `px-4 lg:px-6`

### Bilingual View Titles

```typescript
const viewTitles: Record<ViewId, { en: string; ms: string }> = {
  dashboard:            { en: 'Dashboard',                   ms: 'Papan Pemuka' },
  members:              { en: 'Member Management',            ms: 'Pengurusan Ahli' },
  cases:                { en: 'Case Management',               ms: 'Pengurusan Kes' },
  programmes:           { en: 'Programme Management',          ms: 'Pengurusan Program' },
  donations:            { en: 'Donation Management',           ms: 'Pengurusan Sumbangan' },
  donors:               { en: 'Donor CRM',                     ms: 'Pengurusan Penderma' },
  disbursements:        { en: 'Disbursement Management',       ms: 'Pengurusan Agihan' },
  volunteers:           { en: 'Volunteer Management',          ms: 'Pengurusan Sukarelawan' },
  compliance:           { en: 'Compliance',                    ms: 'Pematuhan' },
  reports:              { en: 'Reports & Analytics',           ms: 'Laporan & Analitik' },
  ekyc:                 { en: 'eKYC Verification',             ms: 'Pengesahan eKYC' },
  documents:            { en: 'Document Management',           ms: 'Pengurusan Dokumen' },
  activities:           { en: 'Activity Log',                  ms: 'Log Aktiviti' },
  ai:                   { en: 'Maria Puspa AI',                ms: 'AI Maria Puspa' },
  settings:             { en: 'Settings',                      ms: 'Tetapan' },
  tapsecure:            { en: 'TapSecure',                     ms: 'TapSecure' },
  admin:                { en: 'Admin Panel',                   ms: 'Panel Pentadbir' },
  asnafpreneur:         { en: 'Asnafpreneur',                 ms: 'Asnafpreneur' },
  'sedekah-jumaat':     { en: 'Sedekah Jumaat',               ms: 'Sedekah Jumaat' },
  docs:                 { en: 'Panduan',                       ms: 'Panduan Pengguna' },
  'carta-organisasi':   { en: 'Organization Chart',           ms: 'Carta Organisasi' },
  institusi:            { en: 'Institutions & Areas',          ms: 'Institusi & Kawasan Bantuan' },
  'permohonan-bantuan': { en: 'Aid Application',               ms: 'Borang Permohonan Bantuan' },
  'puspa-niaga':         { en: 'PUSPA Niaga',                    ms: 'PUSPA Niaga' },
}
```

### Header Actions

| Action          | Icon        | Size   | Behavior                                    |
| --------------- | ----------- | ------ | ------------------------------------------- |
| Sidebar Toggle  | (built-in)  | 28px   | Expand/collapse sidebar                     |
| Search          | Search      | 32px   | `hidden md:flex` — search input 264px wide  |
| Notifications   | Bell        | 32px   | Triggers toast notification on click        |
| Theme Toggle    | Sun / Moon  | 32px   | Rotating icon swap, `next-themes`           |

---

## 7. AI Chat Panel — Maria Puspa

### 7.0 Character Runtime Notes

- Avatar source is standardized to `public/maria-puspa-reference.png`
- TTS playback prioritizes female voice profiles for Maria persona
- Lip-sync animation uses phoneme/amplitude events from speech playback
- Maria character renderer supports emotion states (warm, focus, alert, empathetic) that change based on route context
- Debug mode can be enabled via `puspa-settings` localStorage to show Hermes tool call logs

### 7.1 Panel Layout

**Desktop (md+):**
```
┌──────────────────────┐
│ [Maria Avatar] Maria │  ← Purple header bar
│  ● Online / Memproses│
│              [▼] [✕] │
├──────────────────────┤
│ ✨ Context: dashboard │  ← Context badge (desktop only)
│                 staff │
├──────────────────────┤
│ Cadangan pantas:     │  ← Quick prompt chips (when chat is new)
│ [Ringkasan] [Kes]   │
│ [Derma] [Sistem]    │
├──────────────────────┤
│                      │
│ [Maria] Hai, saya   │  ← Messages area (ScrollArea)
│  Maria Puspa...      │
│                      │
│        [User] Tanya  │  ← User messages: right-aligned, purple
│                      │
│ 🔧 2 tools  1/2     │  ← Tool call indicators
│                      │
├──────────────────────┤
│ [Tanya Maria...  →]  │  ← Input bar with send button
│ Maria Puspa — Cer-   │  ← Tagline (desktop only)
│ das. Mesra.          │
└──────────────────────┘
  Fixed right, 384px (w-96)
```

**Mobile (< md):**
```
┌──────────────────────────┐
│         ─── (drag)       │  ← Drag handle, swipe down 80px+ to dismiss
├──────────────────────────┤
│ [Maria] Maria Puspa  [▼][✕] │
│  ● Online                │
├──────────────────────────┤
│ Cadangan pantas:         │
│ [Ringkasan] [Kes] [Derma] [Sistem] │
├──────────────────────────┤
│                          │
│ [Maria] Chat messages    │
│                          │
│        [User] messages   │
│                          │
├──────────────────────────┤
│ [🎤] [Tanya Maria... ] [→]│  ← Larger touch targets (44px)
└──────────────────────────┘
  Bottom sheet: 85vh (collapsed) / 95vh (expanded)
  Full width, rounded top corners
```

### 7.2 Panel Dimensions

| Property       | Desktop                     | Mobile                              |
| -------------- | --------------------------- | ----------------------------------- |
| Position       | Fixed right, full height    | Fixed bottom, full width            |
| Width          | `w-96` (384px)              | `inset-x-0` (100%)                  |
| Height         | Full viewport height        | `85vh` / `95vh` (expandable)        |
| Border radius  | None (flush right edge)     | `rounded-t-2xl` on top              |
| Border         | `border-l`                  | `border-t`                          |
| Backdrop       | None                        | `bg-black/50` overlay behind        |
| Safe area      | N/A                         | `pb-[env(safe-area-inset-bottom)]`  |

### 7.3 Message Bubbles

| Property        | User Message                     | AI Message                           |
| --------------- | -------------------------------- | ------------------------------------ |
| Alignment       | Right (`flex-row-reverse`)       | Left                                 |
| Avatar          | User icon via `UserAvatar`       | Maria character renderer             |
| Avatar size     | small (sm)                       | 32px (h-8 w-8)                       |
| Bubble bg       | `bg-primary`                     | `bg-muted border border-border`      |
| Bubble text     | `text-primary-foreground`        | Default foreground                   |
| Border radius   | `rounded-2xl rounded-tr-sm`      | `rounded-2xl rounded-tl-sm`         |
| Max width       | 88% mobile / 85% desktop         | Same                                 |
| Font size       | 13px mobile / 12px desktop       | Same                                 |
| Streaming       | N/A                              | Blinking cursor `animate-pulse`      |

### 7.4 Streaming Indicator

When AI is generating a response:

1. **Empty content + streaming**: Spinning `Loader2` icon with "Memikir..." text
2. **Has content + streaming**: Inline blinking cursor `<span>` after text
3. **Waiting for first chunk**: Avatar pulses, spinner + "Memikir..."

### 7.5 Quick Prompts

Displayed only when `messages.length <= 1` and not streaming. Quick prompts are defined in `@/lib/maria-quick-prompts` with bilingual chip labels, icons, and full prompt text.

Styling: `rounded-full bg-primary/5 border border-primary/15 text-primary hover:bg-primary/10`, 36px min height for touch targets.

### 7.6 Tool Call Indicators

When the AI calls tools during a response, a compact indicator shows:

```
🔧 2 tools  1/2
```

- Wrench icon (3px) + count + success ratio badge
- Text size: 10px
- Badge: 10px font, outline variant
- When debug mode is enabled, full Hermes debug logs are shown instead

### 7.7 SSE Streaming Protocol

The chat communicates with `/api/v1/ai` via Server-Sent Events:

| Event Type     | Payload                             | UI Action                          |
| -------------- | ----------------------------------- | ---------------------------------- |
| `content`      | `{ type: "content", content: "..." }` | Append text to last assistant message |
| `tool_calls`   | `{ type: "tool_calls", tools: [...] }` | Log pending tool calls              |
| `tool_result`  | `{ type: "tool_result", name, content }` | Update tool call status             |
| `done`         | `{ type: "done", model, toolCalls }` | Finalize message, stop streaming    |
| `error`        | `{ type: "error", content }`        | Display error banner                |

---

## 8. Module Pages

### 8.1 View Renderer

All 24 modules are lazy-loaded via `next/dynamic` with `{ ssr: false }`:

```typescript
const moduleMap: Record<ViewId, React.ComponentType> = {
  dashboard:            dynamic(() => import('@/modules/dashboard/page'), { ssr: false }),
  members:              dynamic(() => import('@/modules/members/page'), { ssr: false }),
  cases:                dynamic(() => import('@/modules/cases/page'), { ssr: false }),
  programmes:           dynamic(() => import('@/modules/programmes/page'), { ssr: false }),
  donations:            dynamic(() => import('@/modules/donations/page'), { ssr: false }),
  donors:               dynamic(() => import('@/modules/donors/page'), { ssr: false }),
  disbursements:        dynamic(() => import('@/modules/disbursements/page'), { ssr: false }),
  volunteers:           dynamic(() => import('@/modules/volunteers/page'), { ssr: false }),
  compliance:           dynamic(() => import('@/modules/compliance/page'), { ssr: false }),
  reports:              dynamic(() => import('@/modules/reports/page'), { ssr: false }),
  ekyc:                 dynamic(() => import('@/modules/ekyc/page'), { ssr: false }),
  documents:            dynamic(() => import('@/modules/documents/page'), { ssr: false }),
  activities:           dynamic(() => import('@/modules/activities/page'), { ssr: false }),
  asnafpreneur:         dynamic(() => import('@/modules/asnafpreneur/page'), { ssr: false }),
  'sedekah-jumaat':     dynamic(() => import('@/modules/sedekah-jumaat/page'), { ssr: false }),
  docs:                 dynamic(() => import('@/modules/docs/page'), { ssr: false }),
  ai:                   dynamic(() => import('@/modules/ai/page'), { ssr: false }),
  settings:             dynamic(() => import('@/modules/settings/page'), { ssr: false }),
  tapsecure:            dynamic(() => import('@/modules/tapsecure/page'), { ssr: false }),
  admin:                dynamic(() => import('@/modules/admin/page'), { ssr: false }),
  'carta-organisasi':   dynamic(() => import('@/modules/carta-organisasi/page'), { ssr: false }),
  institusi:            dynamic(() => import('@/modules/institusi/page'), { ssr: false }),
  'permohonan-bantuan': dynamic(() => import('@/modules/permohonan-bantuan/page'), { ssr: false }),
  'puspa-niaga':        dynamic(() => import('@/modules/puspa-niaga/page'), { ssr: false }),
}
```

View transitions use `framer-motion` `AnimatePresence` with blur+fade+slide animation (300ms, custom easing curve).

### 8.2 Access Denied View

When a user lacks permission for a module:

```
┌─────────────────────────────────┐
│         🛡️ (ShieldAlert)         │
│                                 │
│      Akses Ditolak              │
│                                 │
│  You do not have permission     │
│  to access this module.         │
│  Contact your administrator.    │
│                                 │
│  [Kembali ke Dashboard]         │
└─────────────────────────────────┘
```

- Centered card with `max-w-md`
- ShieldAlert icon in `bg-destructive/10` circle
- Bilingual error message

### 8.3 Dashboard Page Pattern

The dashboard exemplifies the standard module page layout across all 24 modules:

```
┌─────────────────────────────────────────────────────────────────┐
│ ⚠️ Data demo dipaparkan... (amber info banner, if demo data)    │
├─────────────────────────────────────────────────────────────────┤
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│ │ Jumlah   │ │ Kes      │ │ Jumlah   │ │ Skor     │           │
│ │ Ahli     │ │ Aktif    │ │ Derma    │ │ Pematuhan│           │
│ │ 1,234    │ │ 56       │ │ RM45,000 │ │ 94%      │           │
│ │ ↑12.5%   │ │ ↓3.2%    │ │ ↑8.7%    │ │ ↑2.1%    │           │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐           │
│ │ Agihan   │ │ Program  │ │ Sukarela-│ │ eKYC     │           │
│ │ RM32,000 │ │ Aktif 12 │ │ wan 89   │ │ Tunggu 5 │           │
│ └──────────┘ └──────────┘ └──────────┘ └──────────┘           │
├─────────────────────────────────────────────────────────────────┤
│ ┌────────────────────────┐ ┌────────────────────────┐          │
│ │ Trend Sumbangan        │ │ Pecahan Ahli           │          │
│ │ Bulanan (Stacked Bar)  │ │ Mengikut Asnaf (Donut) │          │
│ │                        │ │                        │          │
│ │ [Recharts BarChart]    │ │ [Recharts PieChart]    │          │
│ └────────────────────────┘ └────────────────────────┘          │
├─────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────┐ ┌────────────────────┐    │
│ │ Aktiviti Terkini (2/3 width)    │ │ Tindakan Pantas   │    │
│ │                                  │ │ (1/3 width)        │    │
│ │ [Activity list with icons]       │ │ [Daftar Ahli Baru]│    │
│ │                                  │ │ [Hantar Kes]      │    │
│ │                                  │ │ [Rekod Derma]     │    │
│ │                                  │ │ [Laporan]         │    │
│ │                                  │ │                    │    │
│ │                                  │ │ Quick Stats:       │    │
│ │                                  │ │ ✅ eKYC Disahkan  │    │
│ │                                  │ │ ⚠️ eKYC Menunggu  │    │
│ │                                  │ │ 🧾 Nisbah Agihan  │    │
│ └──────────────────────────────────┘ └────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### 8.4 Metric Card Component

```
┌─────────────────────────────────┐
│  Jumlah Ahli          [📊]     │  ← Icon in colored rounded-xl square
│  1,234                          │  ← 2xl bold tracking-tight
│  ↑ 12.5% vs bulan lepas        │  ← TrendingUp (green) / TrendingDown (red)
└─────────────────────────────────┘
```

### 8.5 Category Color System

Used across dashboards for activity categories and metric icons:

| Category      | Light Mode Background    | Light Mode Icon   | Dark Mode Background       |
| ------------- | ------------------------ | ----------------- | -------------------------- |
| member        | `bg-emerald-100`         | `text-emerald-600`| `dark:bg-emerald-900/30`   |
| case          | `bg-amber-100`           | `text-amber-600`  | `dark:bg-amber-900/30`     |
| donation      | `bg-rose-100`            | `text-rose-600`   | `dark:bg-rose-900/30`      |
| disbursement  | `bg-cyan-100`            | `text-cyan-600`   | `dark:bg-cyan-900/30`      |
| programme     | `bg-purple-100`          | `text-purple-600` | `dark:bg-purple-900/30`    |
| compliance    | `bg-teal-100`            | `text-teal-600`   | `dark:bg-teal-900/30`      |
| volunteer     | `bg-orange-100`          | `text-orange-600` | `dark:bg-orange-900/30`    |
| system        | `bg-gray-100`            | `text-gray-700`   | `dark:bg-gray-800/30`      |

### 8.6 Chart Configuration

- **Library**: Recharts (BarChart, PieChart, ResponsiveContainer)
- **Colors**: Uses CSS variable references `var(--color-chart-N)` for theme-aware rendering
- **Custom Tooltip**: Branded tooltip with `rounded-lg border bg-background p-3 shadow-lg`
- **Pie Label**: `name (XX%)` format
- **Bar Radius**: Stacked bars with `radius={[4, 4, 0, 0]}` on topmost segment
- **Grid**: `strokeDasharray="3 3"` using `stroke-border` class

### 8.7 Skeleton Loading Pattern

All module pages use skeleton loading states matching their layout:

```tsx
<Skeleton className="h-4 w-24 mb-3" />   // Label
<Skeleton className="h-8 w-32 mb-2" />   // Value
<Skeleton className="h-3 w-20" />         // Change indicator
```

---

## 9. Component Library

### 9.1 shadcn/ui — New York Style

| Configuration   | Value              |
| --------------- | ------------------ |
| Style           | `new-york`         |
| Base Color      | `neutral`          |
| CSS Variables   | `true`             |
| RSC             | `true`             |
| TSX             | `true`             |
| Icon Library    | `lucide`           |

### 9.2 Installed Components (46)

| Component         | Path                                    |
| ----------------- | --------------------------------------- |
| accordion         | `src/components/ui/accordion.tsx`       |
| alert             | `src/components/ui/alert.tsx`           |
| alert-dialog      | `src/components/ui/alert-dialog.tsx`    |
| aspect-ratio      | `src/components/ui/aspect-ratio.tsx`    |
| avatar            | `src/components/ui/avatar.tsx`          |
| badge             | `src/components/ui/badge.tsx`           |
| breadcrumb        | `src/components/ui/breadcrumb.tsx`      |
| button            | `src/components/ui/button.tsx`          |
| calendar          | `src/components/ui/calendar.tsx`        |
| card              | `src/components/ui/card.tsx`            |
| carousel          | `src/components/ui/carousel.tsx`        |
| chart             | `src/components/ui/chart.tsx`           |
| checkbox          | `src/components/ui/checkbox.tsx`        |
| collapsible       | `src/components/ui/collapsible.tsx`     |
| command           | `src/components/ui/command.tsx`         |
| context-menu      | `src/components/ui/context-menu.tsx`    |
| dialog            | `src/components/ui/dialog.tsx`          |
| drawer            | `src/components/ui/drawer.tsx`          |
| dropdown-menu     | `src/components/ui/dropdown-menu.tsx`   |
| form              | `src/components/ui/form.tsx`            |
| hover-card        | `src/components/ui/hover-card.tsx`      |
| input             | `src/components/ui/input.tsx`           |
| input-otp         | `src/components/ui/input-otp.tsx`       |
| label             | `src/components/ui/label.tsx`           |
| menubar           | `src/components/ui/menubar.tsx`         |
| navigation-menu   | `src/components/ui/navigation-menu.tsx` |
| pagination        | `src/components/ui/pagination.tsx`      |
| popover           | `src/components/ui/popover.tsx`         |
| progress          | `src/components/ui/progress.tsx`        |
| radio-group       | `src/components/ui/radio-group.tsx`     |
| resizable         | `src/components/ui/resizable.tsx`       |
| scroll-area       | `src/components/ui/scroll-area.tsx`     |
| select            | `src/components/ui/select.tsx`          |
| separator         | `src/components/ui/separator.tsx`       |
| sheet             | `src/components/ui/sheet.tsx`           |
| sidebar           | `src/components/ui/sidebar.tsx`         |
| skeleton          | `src/components/ui/skeleton.tsx`        |
| slider            | `src/components/ui/slider.tsx`          |
| sonner            | `src/components/ui/sonner.tsx`          |
| switch            | `src/components/ui/switch.tsx`          |
| table             | `src/components/ui/table.tsx`           |
| tabs              | `src/components/ui/tabs.tsx`            |
| textarea          | `src/components/ui/textarea.tsx`        |
| toast             | `src/components/ui/toast.tsx`           |
| toaster           | `src/components/ui/toaster.tsx`         |
| toggle            | `src/components/ui/toggle.tsx`          |
| toggle-group      | `src/components/ui/toggle-group.tsx`    |
| tooltip           | `src/components/ui/tooltip.tsx`         |

### 9.3 Path Aliases

```json
{
  "components": "@/components",
  "utils": "@/lib/utils",
  "ui": "@/components/ui",
  "lib": "@/lib",
  "hooks": "@/hooks"
}
```

---

## 10. Loading States

### 10.1 PuspaLoadingSpinner

Custom branded spinner using the PUSPA lotus logo:

```
        🪷  (rotating lotus logo)
    Memuatkan...
```

- **Size**: Configurable (default 48px)
- **Animation**: `puspa-spin 4s linear infinite` (slow, graceful rotation)
- **Background**: White rounded circle behind logo
- **Optional text**: `animate-pulse` fade effect

### 10.2 Skeleton Components

shadcn/ui Skeleton used throughout for layout-preserving loading:

```tsx
<Skeleton className="h-4 w-24 mb-3" />   // Text placeholder
<Skeleton className="h-64 w-full" />       // Chart/image placeholder
```

### 10.3 Progress Bars

`<Progress />` component from shadcn/ui for determinate loading states.

---

## 11. Responsive Design

### 11.1 Breakpoints

| Token | Width    | Usage                                 |
| ----- | -------- | ------------------------------------- |
| `sm`  | 640px    | 2-column metric grids                 |
| `md`  | 768px    | Search bar visibility, chat panel mode switch |
| `lg`  | 1024px   | 4-column grids, content padding increase |
| `xl`  | 1280px   | Extended layouts                      |

### 11.2 Responsive Patterns

| Element            | Mobile (< md)                    | Desktop (md+)                    |
| ------------------ | -------------------------------- | -------------------------------- |
| Sidebar            | Icon-only collapsible            | Full with labels                 |
| Header search      | Hidden                           | Visible, 264px width             |
| AI Chat Panel      | Bottom sheet (85–95vh)           | Fixed right panel (384px)        |
| Metric grids       | 1 col → 2 col (sm)              | 4 col (lg)                       |
| Chart grids        | 1 col                            | 2 col (lg)                       |
| Activity + actions | Stacked                          | 2/3 + 1/3 split (lg)            |
| Content padding    | `p-4` (16px)                     | `p-6` (24px) at lg               |
| Chat input height  | 44px (h-10)                      | 40px (h-10)                      |
| Touch targets      | 44px minimum                     | Standard 32px                    |
| Chat backdrop      | Black 50% overlay                | None                             |

### 11.3 Mobile-First Principles

- All layouts start from single-column and expand
- Touch targets on mobile are minimum 44px (`touch-manipulation` class)
- Chat panel uses swipe-to-dismiss gesture (80px threshold)
- Safe area insets respected: `pb-[env(safe-area-inset-bottom)]`
- No horizontal scroll on main layout (tables may scroll independently)

---

## 12. Dark Mode

### 12.1 Implementation

- **Library**: `next-themes` with `<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange />`
- **Strategy**: CSS class-based (`class="dark"` on `<html>`)
- **Default**: System preference
- **Toggle**: Manual button in header (Sun/Moon rotating icon swap)

### 12.2 Dark Mode Adjustments

| Element            | Light                           | Dark                                |
| ------------------ | ------------------------------- | ----------------------------------- |
| Background         | Near-white (0.985 lightness)    | Deep dark (0.13 lightness)         |
| Primary            | Deep purple                     | Lighter lavender-purple             |
| Cards              | Pure white                      | Slightly elevated dark (0.17)       |
| Sidebar            | Dark purple gradient            | Even deeper purple gradient         |
| Text               | Dark gray-purple                | Near-white with purple tint         |
| Borders            | Light purple-gray               | Subtle dark purple                  |
| Metric icon bg     | `bg-{color}-100`                | `dark:bg-{color}-900/30` (translucent) |
| Demo banner        | `bg-amber-50 border-amber-200`  | `dark:bg-amber-950/30 border-amber-800` |
| Scrollbar thumb    | 30% lavender opacity            | 20% lavender opacity                |

### 12.3 Theme Transition

`disableTransitionOnChange` prevents the flash of unstyled content during theme switch, making the swap instant without color transition animations.

---

## 13. Accessibility

### 13.1 Semantic HTML

- `<html lang="ms">` — correct language declaration
- `<main>` for primary content area
- `<header>` for the app header
- `<nav>` implicit in sidebar navigation
- `<aside>` for the AI chat panel

### 13.2 ARIA Support

| Element                | ARIA Attribute                    | Purpose                              |
| ---------------------- | --------------------------------- | ------------------------------------ |
| Theme toggle           | `sr-only` span                    | "Toggle theme" for screen readers    |
| Close chat button      | `aria-label="Tutup sembang"`      | Close chat in Bahasa Melayu          |
| Expand chat button     | `aria-label` (dynamic)            | "Kecilkan" / "Besarkan"              |
| Send button            | `aria-label="Hantar mesej"`       | Send message                         |
| Voice input button     | `aria-label="Input suara"`        | Voice input                          |
| Scroll-to-bottom       | `aria-label="Tatal ke bawah"`     | Scroll down                          |
| Sidebar tooltip        | `tooltip` prop on MenuButton      | Bilingual label "Label — LabelMs"    |

### 13.3 Keyboard Navigation

- All interactive elements are focusable
- `outline-ring/50` on focus for all elements (`@apply border-border outline-ring/50`)
- Tab navigation through sidebar, header actions, and chat

### 13.4 Screen Reader Content

- `sr-only` class for icon-only button labels
- Descriptive `alt` text on images (e.g., `"PUSPA — Pertubuhan Urus Peduli Asnaf"`)
- `tooltip` props on sidebar items provide additional context

### 13.5 Touch Targets

- Mobile buttons: minimum 44px (`h-10 w-10`)
- Chat quick prompts: `min-h-[36px]`
- All touch elements use `touch-manipulation` class for reduced tap delay

---

## 14. Custom Scrollbar

WebKit-styled scrollbar with PUSPA purple accent:

```css
/* Track */
::-webkit-scrollbar-track {
  background: transparent;
}

/* Dimensions */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/* Thumb — Light Mode */
::-webkit-scrollbar-thumb {
  background: oklch(0.581 0.154 291 / 30%);   /* 30% lavender */
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: oklch(0.368 0.212 295 / 50%);   /* 50% deep purple */
}

/* Thumb — Dark Mode */
.dark ::-webkit-scrollbar-thumb {
  background: oklch(0.581 0.154 291 / 20%);   /* 20% lavender */
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: oklch(0.581 0.154 291 / 40%);   /* 40% lavender */
}
```

The scrollbar is **thin** (6px), **subtle** (low opacity), and **rounded** (3px radius), with a purple-themed hover state that reinforces the brand without being intrusive.

---

## 15. Iconography

### 15.1 Icon Library

**Lucide React** — consistent, open-source icon set used throughout.

### 15.2 Icon Usage by Module

| Icon             | Component            | Usage Context                         |
| ---------------- | -------------------- | ------------------------------------- |
| `LayoutDashboard`| Dashboard            | Main overview                         |
| `Users`          | Members              | People management                     |
| `FileText`       | Cases                | Case/file management                  |
| `Activity`       | Activities           | Activity tracking                     |
| `HandCoins`      | Donations            | Financial contributions               |
| `Heart`          | Donors               | Donor CRM                             |
| `ArrowDownToLine`| Disbursements        | Fund disbursement                     |
| `Calendar`       | Programmes           | Programme scheduling                  |
| `Rocket`         | Asnafpreneur         | Entrepreneurship program              |
| `UtensilsCrossed`| Sedekah Jumaat       | Friday charity program                |
| `Sparkles`       | Volunteers           | Volunteer management                  |
| `FolderOpen`     | Documents            | Document management                   |
| `Shield`         | Compliance           | Compliance monitoring                 |
| `BarChart3`      | Reports              | Analytics & reporting                 |
| `ScanFace`       | eKYC                 | Identity verification                 |
| `UserCog`        | Admin                | Administration                        |
| `Lock`           | TapSecure            | Security                              |
| `Bot`            | PUSPA AI             | AI assistant                          |
| `BookOpen`       | Panduan (Docs)       | User documentation                    |
| `Building2`      | Carta Organisasi     | Organization chart                    |
| `Building`       | Institusi            | Institutions & areas                  |
| `ClipboardList`  | Permohonan Bantuan   | Aid application forms                 |
| `Settings`       | Settings             | System settings                       |
| `Search`         | Header               | Global search                         |
| `Bell`           | Header               | Notifications                         |
| `Sun`/`Moon`     | Header               | Theme toggle                          |
| `Send`           | Chat                 | Send message                          |
| `Loader2`        | Chat                 | Loading/spinning                      |
| `X`              | Chat                 | Close/dismiss                         |
| `Wrench`         | Chat                 | Tool call indicator                   |
| `Mic`            | Chat                 | Voice input                           |
| `ChevronDown`    | Chat                 | Expand/collapse                       |
| `ArrowDown`      | Chat                 | Scroll to bottom                      |
| `TrendingUp`     | Dashboard            | Positive metric change                |
| `TrendingDown`   | Dashboard            | Negative metric change                |
| `UserPlus`       | Dashboard            | New member registration               |
| `Receipt`        | Dashboard            | Disbursement ratio                    |
| `CheckCircle2`   | Dashboard            | Completed/verified status             |
| `AlertCircle`    | Dashboard            | Warning/pending status                |
| `Clock`          | Dashboard            | Timestamp indicator                   |

### 15.3 Icon Sizing Convention

| Context           | Size (Tailwind)  | Pixel |
| ----------------- | ---------------- | ----- |
| Sidebar nav item  | `h-4 w-4`        | 16px  |
| Header actions    | `h-4 w-4`        | 16px  |
| Metric cards      | `h-5 w-5`        | 20px  |
| Quick actions     | `h-5 w-5`        | 20px  |
| Chat avatar icon  | `h-3.5 w-3.5`    | 14px  |
| Chat tool calls   | `h-3 w-3`        | 12px  |
| Chat send button  | `h-5 w-5` / `h-4 w-4` | 20px / 16px |
| Activity list     | `h-3.5 w-3.5`    | 14px  |

---

## 16. State Management & Navigation

### 16.1 Zustand Stores

#### App Store (`useAppStore`)

| Property        | Type                        | Default             | Persisted |
| --------------- | --------------------------- | ------------------- | --------- |
| `currentView`   | `ViewId`                    | `'dashboard'`       | Yes       |
| `aiChatOpen`    | `boolean`                   | `false`             | No        |
| `currentUser`   | `{ id, name, email, role, imageUrl? }` | Admin PUSPA object | Yes       |
| `searchQuery`   | `string`                    | `''`                | No        |

**Persistence**: `zustand/middleware/persist` with key `"puspa-app-store"`, partializing to `currentView` and `currentUser`.

#### Hermes Store (`useHermesStore`)

| Property        | Type                        | Default             |
| --------------- | --------------------------- | ------------------- |
| `messages`      | `MariaPuspaMessage[]`       | Welcome message     |
| `isStreaming`   | `boolean`                   | `false`             |
| `modelName`     | `string`                    | `'maria-puspa'`     |
| `toolCalls`     | `ToolCallLog[]`             | `[]`                |
| `lastError`     | `string \| null`            | `null`              |

**Welcome message**: *"Hai, saya Maria Puspa. AI Assistant PUSPA. Apa yang boleh saya bantu?"*

#### Maria Character Store (`useMariaCharacterStore`)

| Property         | Type                       | Default             |
| ---------------- | -------------------------- | ------------------- |
| `presenceState`  | Presence state enum        | —                   |
| `emotionState`   | Emotion state enum         | `'warm'`            |
| `speechState`    | Phoneme/speech tracking    | —                   |

### 16.2 ViewId Type

```typescript
export type ViewId = 
  | 'dashboard' | 'members' | 'cases' | 'programmes' | 'donations' 
  | 'disbursements' | 'volunteers' | 'compliance' | 'reports' | 'ekyc'
  | 'documents' | 'activities' | 'donors' | 'ai' | 'settings' 
  | 'tapsecure' | 'admin' | 'asnafpreneur' | 'sedekah-jumaat' | 'docs'
  | 'carta-organisasi' | 'institusi' | 'permohonan-bantuan' | 'puspa-niaga'
```

---

## 17. Role-Based Access Control

### 17.1 Role Hierarchy

| Role        | Level | Description           |
| ----------- | ----- | --------------------- |
| `staff`     | 1     | Basic operational access |
| `admin`     | 2     | Administrative access    |
| `developer` | 3     | Full system access        |

### 17.2 View Access Matrix

| View                 | Min Role    | Category       |
| -------------------- | ----------- | -------------- |
| dashboard            | staff       | General        |
| members              | staff       | General        |
| cases                | staff       | General        |
| programmes           | staff       | General        |
| donations            | staff       | General        |
| donors               | staff       | General        |
| disbursements        | staff       | General        |
| volunteers           | staff       | General        |
| activities           | staff       | General        |
| documents            | staff       | General        |
| asnafpreneur         | staff       | General        |
| sedekah-jumaat       | staff       | General        |
| docs                 | staff       | General        |
| settings             | staff       | General        |
| carta-organisasi     | staff       | General        |
| institusi            | staff       | General        |
| permohonan-bantuan   | staff       | General        |
| puspa-niaga          | staff       | General        |
| compliance           | admin       | Governance     |
| reports              | admin       | Governance     |
| ekyc                 | admin       | Governance     |
| admin                | admin       | Governance     |
| tapsecure            | admin       | Governance     |
| ai                   | developer   | AI & Ops       |

Higher roles inherit access from lower roles. The sidebar filters items by role, hiding inaccessible modules entirely.

---

## 18. Animation & Motion

### 18.1 Animation Library

- **CSS**: `tw-animate-css` import in globals.css
- **Tailwind Plugin**: `tailwindcss-animate`
- **Custom keyframes**: Defined inline (e.g., `puspa-spin`)
- **Framer Motion**: Used for view transitions in `ViewRenderer`

### 18.2 Motion Patterns

| Element              | Animation                       | Duration | Easing                       |
| -------------------- | ------------------------------- | -------- | ---------------------------- |
| Page transition      | blur+fade+slide (framer-motion) | 300ms    | `[0.22, 1, 0.36, 1]`        |
| PUSPA Spinner        | `puspa-spin` (360° rotation)    | 4000ms   | linear                       |
| Loading text         | `animate-pulse`                 | 2000ms   | ease-in-out                  |
| Theme toggle icon    | `rotate-0 / rotate-90 scale-0/1`| 200ms    | transition-all               |
| Chat panel open/close| `transition-all`                | 300ms    | Default                      |
| Sidebar collapse     | shadcn built-in transition      | 200ms    | Default                      |
| Streaming cursor     | `animate-pulse` (inline block)  | Default  | Default                      |
| Chat overlay fade    | `transition-opacity`            | 300ms    | Default                      |
| Active nav hover     | `hover:bg-sidebar-primary/90`   | Default  | Default                      |
| Content area margin  | `transition-all duration-300`   | 300ms    | `ease-in-out`                |

### 18.3 Reduced Motion

The app respects `prefers-reduced-motion` via Tailwind's built-in media query handling. `disableTransitionOnChange` on the theme provider prevents jarring transitions.

---

## Appendix A: File Structure Reference

```
src/
├── app/
│   ├── globals.css              ← Color system, scrollbar, theme tokens
│   ├── layout.tsx               ← Root layout (fonts, ThemeProvider, Toaster)
│   ├── page.tsx                 ← SPA shell (SidebarProvider, ViewRenderer, AiChatPanel)
│   └── api/v1/                  ← API routes (ai, dashboard, members, etc.)
├── components/
│   ├── app-sidebar.tsx          ← Sidebar with nav groups
│   ├── app-header.tsx           ← Header bar with search, actions
│   ├── view-renderer.tsx        ← Dynamic module loader with access control
│   ├── ai-chat-panel.tsx        ← Maria Puspa chat panel
│   ├── aurora.tsx               ← Aurora background effect
│   ├── auth-provider.tsx        ← Supabase auth context provider
│   ├── mobile-card.tsx          ← Mobile-optimized card component
│   ├── puspa-logo.tsx           ← SVG logo component
│   ├── puspa-loading-spinner.tsx ← Branded spinner
│   ├── theme-provider.tsx       ← next-themes wrapper
│   ├── user-avatar.tsx          ← User avatar with image fallback
│   ├── query-provider.tsx       ← React Query provider
│   ├── maria/                   ← Maria Puspa character components
│   │   ├── maria-character-renderer.tsx  ← Emotion-aware character renderer
│   │   ├── maria-floating-widget.tsx     ← Floating Maria widget
│   │   ├── MariaVRMModel.tsx             ← 3D VRM model viewer
│   │   ├── MariaVRMModel.module.css      ← VRM model styles
│   │   ├── MariaAvatarUnified.tsx        ← Unified avatar component
│   │   └── maria-vrm-blendshapes.tsx     ← VRM blendshape definitions
│   └── ui/                      ← 46 shadcn/ui components
├── modules/                     ← 24 module pages (one per ViewId)
│   ├── dashboard/page.tsx
│   ├── members/page.tsx
│   ├── cases/page.tsx
│   ├── activities/page.tsx
│   ├── donations/page.tsx
│   ├── donors/page.tsx
│   ├── disbursements/page.tsx
│   ├── programmes/page.tsx
│   ├── asnafpreneur/page.tsx
│   ├── sedekah-jumaat/page.tsx
│   ├── volunteers/page.tsx
│   ├── documents/page.tsx
│   ├── compliance/page.tsx
│   ├── reports/page.tsx
│   ├── ekyc/page.tsx
│   ├── admin/page.tsx
│   ├── tapsecure/page.tsx
│   ├── ai/page.tsx
│   ├── docs/page.tsx
│   ├── settings/page.tsx
│   ├── carta-organisasi/page.tsx
│   ├── institusi/page.tsx
│   ├── permohonan-bantuan/page.tsx
│   └── puspa-niaga/page.tsx
├── stores/
│   ├── hermes-store.ts          ← Maria Puspa AI chat state
│   └── maria-character-store.ts ← Maria emotion/presence/speech state
├── lib/
│   ├── store.ts                 ← App navigation & user state (ViewId type)
│   ├── access-control.ts        ← Role-based view access
│   ├── utils.ts                 ← cn() utility
│   ├── puspa-brand-assets.ts    ← Base64 brand image URIs
│   ├── maria-avatar.ts          ← Canonical Maria avatar path constant
│   ├── puspa-knowledge.ts       ← Organization knowledge base
│   ├── db.ts                    ← Prisma client
│   ├── memory.ts                ← AI memory store
│   ├── openrouter.ts            ← AI API configuration
│   ├── auth.ts                  ← Auth utilities
│   ├── ai-cache.ts              ← AI response caching
│   ├── ai-rate-limit.ts         ← AI rate limiting
│   ├── rate-limit.ts            ← General rate limiting
│   ├── audit.ts                 ← Audit logging
│   ├── validation.ts            ← Input validation schemas
│   ├── sentry.ts                ← Sentry error tracking
│   ├── api-utils.ts             ← API utility functions
│   ├── case-intelligence.ts     ← Case AI intelligence
│   ├── donor-sync.ts            ← Donor synchronization
│   ├── domain.ts                ← Domain types
│   ├── sequence.ts              ← Sequence utilities
│   ├── client.ts                ← Client-side Supabase
│   ├── server.ts                ← Server-side Supabase
│   ├── maria-emotion-map.ts     ← Maria emotion state mapping
│   ├── maria-lipsync.ts         ← Maria lip-sync engine
│   ├── maria-tts.ts             ← Maria text-to-speech
│   └── maria-quick-prompts.ts   ← Quick prompt definitions
├── tools/                       ← AI tool definitions
│   ├── index.ts
│   ├── web-tools.ts
│   ├── donations.ts
│   └── cases.ts
├── hooks/
│   ├── use-mobile.ts
│   ├── use-toast.ts
│   └── use-realtime.ts
└── types/
    └── index.ts

hermes/                          ← Hermes agent skills directory
├── skills/
│   ├── apple/                   ← Apple integrations (Notes, Reminders, Find My, iMessage)
│   ├── autonomous-ai-agents/    ← AI agent skill definitions
│   ├── creative/                ← Creative skills (diagrams, art, comics, infographics)
│   └── ...                      ← Additional skill packs

mini-services/
└── telegram-bot/
    ├── index.ts                 ← Telegram bot entry point
    ├── server.py                ← Python server component
    ├── package.json             ← Node dependencies
    ├── RUN_ME.bat               ← Windows launcher
    ├── maria.jpg                ← Maria profile image
    └── ...                      ← Audio temp files, SadTalker, results

scripts/
├── hermes-agent.ps1             ← PowerShell agent launcher
├── hermes-agent.py              ← Python agent script
└── maria-smoke.js               ← Maria smoke test

docs/
├── PUSPA_DATA_EXTRACTION.md     ← Data extraction guide
└── USER_GUIDELINES.md           ← User guidelines
```

---

*Document version: PUSPA V5 Design System*
*Last updated: 2026-08-15*
*Color space: oklch | Theme: Purple brand | Language: Bahasa Melayu + English*
