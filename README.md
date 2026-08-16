---
title: "PUSPA-Z — Pertubuhan Urus Peduli Asnaf NGO Management Platform"
document_id: "PUSPA-DOC-README-001"
version: "5.6.4"
last_updated: "2026-08-16T08:45:00+08:00"
maintainer: "HYPER-SOVEREIGN CONDUCTOR & ARCHITECT"
classification: "PUBLIC / OPEN REPO"
lifecycle_status: "ACTIVE"
---

# PUSPA-Z

![PUSPA Logo](public/puspa-logo-official.png)

**Pertubuhan Urus Peduli Asnaf (PPM-024-10-05012022)**
*NGO Management Platform for Asnaf Welfare*

![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js) ![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript) ![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss) ![Prisma 6](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma) ![Bun](https://img.shields.io/badge/Bun-Runtime-000?logo=bun) ![OpenRouter AI](https://img.shields.io/badge/OpenRouter-AI-6366F1) ![Proprietary License](https://img.shields.io/badge/License-Proprietary-red)

[Quick Start](#-quick-start) &bull; [Modules](#-modules) &bull; [Maria Puspa AI](#-maria-puspa-ai) &bull; [API](#-api-reference) &bull; [Database](#-database-schema)

---

## 📜 Audit & Revision Ledger

| Versi | Tarikh & Masa (MYT) | Pengarang / Ejen | Kenapa (Rasional Perubahan) | Bagaimana (Kaedah & Skop Fail) | Status / Pengesahan |
| :---: | :---: | :---: | :--- | :--- | :---: |
| `5.6.4` | `2026-08-16 08:45` | `Conductor Agent` | Menggantikan semua foto lama dengan 6 foto dokumentari berkualiti tinggi baharu bagi seksyen Galeri Lapangan | Menjana 6 foto realistik di `public/gallery-agihan-0X.jpg`, memadam foto lama, dan mengemas kini `portal-agihan-gallery.tsx` | `chrome-devtools verified` |
| `5.6.3` | `2026-08-16 08:15` | `Conductor Agent` | Mengubah semua 5 imej diorama statik kepada video animasi bergerak 2.5D sinusoidal loop | Menjana 5 fail video H.264 di `public/videos/diorama-0X.mp4` via FFmpeg & mengemas kini `portal-interactive-ecosystem.tsx` | `chrome-devtools verified` |
| `5.6.2` | `2026-08-15 23:33` | `Conductor Agent` | Menguatkuasakan format standard jejak audit SMS-v1.0 bagi setiap perubahan dokumentasi | Menambah blok YAML Frontmatter dan Audit Ledger lengkap | `typecheck: 0 errors` |
| `5.6.1` | `2026-08-15 23:18` | `Conductor Agent` | Membaiki isu butang 05 hilang pada diorama ekosistem portal awam | Membuang sekatan `prefersReducedMotion` dalam `portal-interactive-ecosystem.tsx` | `chrome-devtools verified` |
| `5.6.0` | `2026-08-15 12:20` | `Conductor Agent` | Naik taraf Portal Awam bertaraf dunia & penyelarasan modul PUSPA Niaga | Penstrukturan semula landing page `/` dan pemindahan workspace ke `/dashboard` | `build clean` |

---

## Overview / Tentang Projek

**PUSPA V5** is a full-stack NGO management platform built for **Pertubuhan Urus Peduli Asnaf** (PPM-024-10-05012022), a Malaysian charitable organization serving asnaf (needy) communities in Kuala Lumpur and Selangor. The platform manages the entire lifecycle of asnaf welfare operations — from member registration and eKYC verification, through case management and disbursement, to donation tracking, compliance monitoring, and volunteer coordination.

PUSPA V5 ialah platform pengurusan NGO sepenuhnya yang dibina untuk Pertubuhan Urus Peduli Asnaf, menguruskan operasi kebajikan asnaf dari pendaftaran ahli sehingga agihan dan pematuhan.

### Key Highlights

- **Dual-Layer Architecture**: High-impact **Public Portal Landing (`/`)** + Authenticated **Internal Management Workspace (`/dashboard`)**
- **5-Zon Interactive 3D Diorama Flight**: Scroll-scrubbed interactive flight across 5 operational zones (`01 Dapur Barakah`, `02 Gudang Ihsan`, `03 Konvoi Armada`, `04 8 RK & Tahfiz`, `05 Hab Transformasi & Maria AI`) with bottom timeline navigation
- **Direct Action Hub**: Integrated quick donate (`QuickDonateModal`), real-time status tracker (`CheckStatusModal`), and PDPA-compliant aid application (`/api/aid-applications`)
- **24 integrated modules** covering the full NGO operational workflow in the management dashboard
- **Maria Puspa AI** — an AI assistant with 22 tools, RAG-powered responses, and SSE streaming
- **Live Maria Character Layer** — global floating widget, dynamic emotion state, TTS + lip-sync, 3D VRM model
- **Telegram Bot** (@MariaPuspaBot) for mobile access to Maria Puspa
- **Role-Based Access Control** (Staff, Admin, Developer) across all modules and AI tools
- **eKYC Verification** pipeline with risk assessment
- **Compliance Tracking** for ROSM, LHDN, PDPA, and internal audits
- **27 Prisma models** with full relational data integrity
- **Key rotation** for OpenRouter API with automatic failover (up to 4 keys)
- **Supabase Auth** for authentication (SSR + browser client)
- **PWA support** with service worker and web manifest

---

## Screenshots

> **Placeholder** — Add screenshots here once available.
>
> ```
> 📸 Dashboard View
> 📸 Member Management
> 📸 Maria Puspa AI Chat
> 📸 Case Workflow
> 📸 Telegram Bot
> ```

---

## Tech Stack / Teknologi

| Layer      | Technology                                                                                | Version |
| ---------- | ----------------------------------------------------------------------------------------- | ------- |
| Framework  | [Next.js](https://nextjs.org/) (App Router + Turbopack)                                   | 16.1.1  |
| Language   | [TypeScript](https://www.typescriptlang.org/)                                             | 5       |
| UI         | [React](https://react.dev/)                                                               | 19.0.0  |
| Styling    | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) (New York) | 4       |
| Database   | [Prisma ORM](https://www.prisma.io/) with PostgreSQL (managed)                            | 6.11.1  |
| Auth       | [Supabase Auth](https://supabase.com/) (SSR + browser client)                             | 2.105.3 |
| State      | [Zustand](https://zustand.docs.pmnd.rs/) with persist middleware                          | 5       |
| Server     | [TanStack Query](https://tanstack.com/query)                                              | 5.82.0  |
| Data Grid  | [TanStack Table](https://tanstack.com/table)                                              | 8.21.3  |
| Forms      | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)                 | 7.60.0 / 4.0.2 |
| Charts     | [Recharts](https://recharts.org/)                                                         | 2.15.4  |
| Maps       | [Leaflet](https://leafletjs.com/) + [react-leaflet](https://react-leaflet.js.org/)        | 1.9.4 / 5.0.0 |
| 3D         | [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://drei.pmnd.rs/) | 0.184.0 / 9.6.1 / 10.7.7 |
| Animation  | [Framer Motion](https://www.framer.com/motion/)                                           | 12.38.0 |
| AI         | [OpenRouter](https://openrouter.ai/) (OpenAI-compatible)                                  | —       |
| Toasts     | [Sonner](https://sonner.emilkowal.ski/)                                                   | 2.0.6   |
| Themes     | [next-themes](https://github.com/pacocoursey/next-themes)                                  | 0.4.6   |
| Runtime    | [Bun](https://bun.sh/)                                                                    | latest  |
| Deployment | [Vercel](https://vercel.com/) (serverless)                                                | —       |
| Telegram   | Long-polling bot                                                                          | —       |
| PWA        | Service worker + web manifest                                                             | —       |

---

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) >= 1.0
- Node.js >= 18 (for compatibility)

### Installation / Pemasangan

```bash
# Clone the repository
git clone https://github.com/thisisniagahub/PUSPA-Z.git
cd PUSPA-Z

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys (see Environment Variables below)

# Initialize the database (PostgreSQL)
bun run db:push

# Start the development server
bun run dev
```

The app will be running at **<http://localhost:3000>**.

### Telegram Bot (Separate Terminal)

```bash
cd mini-services/telegram-bot
bun run dev
```

Send `/start` to **@MariaPuspaBot** on Telegram to begin.

---

## Environment Variables / Pembolehubah Persekitaran

Create a `.env.local` file in the project root (recommended for Next.js local development):

```env
# ─── Database ───────────────────────────────────────
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?sslmode=require"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME?sslmode=require"

# ─── OpenRouter AI ──────────────────────────────────
# Supports up to 4 API keys for automatic rotation
OPENROUTER_API_KEY_1=sk-or-v1-xxx
OPENROUTER_API_KEY_2=
OPENROUTER_API_KEY_3=
OPENROUTER_API_KEY_4=
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL=tencent/hy3-preview:free
OPENROUTER_APP_NAME=PUSPA V5
OPENROUTER_APP_URL=https://puspa-v5.space-z.ai

# ─── Telegram Bot ───────────────────────────────────
TELEGRAM_BOT_TOKEN=xxx
ALLOWED_CHAT_IDS=6798585537
TELEGRAM_ADMIN_CHAT_IDS=6798585537
PUSPA_INTERNAL_API_TOKEN=replace-with-strong-shared-secret

# ─── Supabase (SSR + Browser Client) ────────────────
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx

# ─── Maria Character Flags (optional) ───────────────
# Default behavior is enabled when unset.
NEXT_PUBLIC_MARIA_WIDGET_ENABLED=true
NEXT_PUBLIC_MARIA_TTS_ENABLED=true
NEXT_PUBLIC_MARIA_LIPSYNC_ENABLED=true

# ─── Hermes-Agent Runtime Mode (optional) ────────────
# Set to "cli" to route API responses through Hermes CLI directly.
HERMES_RUNTIME_MODE=cli
HERMES_CLI_TIMEOUT_MS=45000
```

> **Note:** At least one `OPENROUTER_API_KEY_1` is required for Maria Puspa AI. The Telegram bot requires a valid `TELEGRAM_BOT_TOKEN` from [@BotFather](https://t.me/BotFather). `DIRECT_URL` is used by Prisma for migrations (bypasses connection pooling).

Run a quick Maria character smoke check:

```bash
npm run smoke:maria
```

---

## Modules / Modul

PUSPA V5 consists of **24 lazy-loaded modules**, each with its own lazy-loaded view page backed by the API layer:

| #   | Module                 | Malay              | Access    | Description                                             |
| --- | ---------------------- | ------------------ | --------- | ------------------------------------------------------- |
| 1   | **Dashboard**          | Papan Pemuka       | Staff     | Operational metrics and KPIs                            |
| 2   | **Members**            | Ahli Asnaf         | Staff     | Asnaf member registration and profiles                  |
| 3   | **Cases**              | Kes                | Staff     | Case management with 9-stage workflow                   |
| 4   | **Programmes**         | Program            | Staff     | Programme planning and beneficiary tracking             |
| 5   | **Donations**          | Derma              | Staff     | Donation tracking (zakat, sadaqah, waqf, infaq)         |
| 6   | **Donors**             | Penderma           | Staff     | Donor relationship management                           |
| 7   | **Disbursements**      | Agihan             | Staff     | Fund disbursement with approval pipeline                |
| 8   | **Volunteers**         | Sukarelawan        | Staff     | Volunteer coordination and hours tracking               |
| 9   | **Compliance**         | Pematuhan          | Admin     | ROSM, LHDN, PDPA compliance monitoring                  |
| 10  | **Reports**            | Laporan            | Admin     | Report generation and analytics                         |
| 11  | **eKYC**               | Pengesahan eKYC    | Admin     | Identity verification with risk assessment              |
| 12  | **Documents**          | Dokumen            | Staff     | Document management with versioning                     |
| 13  | **Activities**         | Aktiviti           | Staff     | Activity log and audit trail                            |
| 14  | **Asnafpreneur**       | Asnafpreneur       | Staff     | Entrepreneur development programme tracking             |
| 15  | **Sedekah Jumaat**     | Sedekah Jumaat     | Staff     | Weekly Friday charity collection with CRUD              |
| 16  | **Docs**               | Panduan            | Staff     | Comprehensive platform user documentation               |
| 17  | **AI**                 | Maria Puspa        | Developer | AI assistant with tool-calling                          |
| 18  | **Settings**           | Tetapan            | Staff     | Platform configuration                                  |
| 19  | **TapSecure**          | TapSecure          | Admin     | Secure access control management                        |
| 20  | **Admin**              | Pentadbiran        | Admin     | System administration panel                             |
| 21  | **Carta Organisasi**   | Carta Organisasi   | Staff     | Organization chart management                           |
| 22  | **Institusi**          | Institusi          | Staff     | Institution management (Rumah Kebajikan, Maahad Tahfiz) |
| 23  | **Permohonan Bantuan** | Permohonan Bantuan | Staff     | Aid application form with PDPA compliance               |
| 24  | **PUSPA Niaga**       | PUSPA Niaga        | Staff     | Asnaf entrepreneur product & sales platform (Baru)      |

---

## Maria Puspa AI

### Hermes Native Feature Mode

If you want full Hermes features without custom reimplementation, use the native Hermes commands directly from this repo:

```bash
npm run hermes:setup         # one-time setup wizard
npm run hermes:chat          # Hermes interactive chat
npm run hermes:gateway:setup # configure Telegram/Discord/etc
npm run hermes:gateway       # run messaging gateway
npm run hermes:dashboard     # web dashboard (TUI enabled)
npm run hermes:cron:list     # list scheduled jobs
npm run hermes:skills        # list installed skills
npm run hermes:mcp           # list MCP servers
```

Set this in `.env.local` to make app API use Hermes CLI directly:

```env
HERMES_RUNTIME_MODE=cli
HERMES_CLI_TIMEOUT_MS=45000
```

**Maria Puspa** is the built-in AI assistant powered by [OpenRouter](https://openrouter.ai/) with OpenAI-compatible tool calling. She speaks Bahasa Melayu (primary) and English, and is designed for direct, data-grounded responses.

### Character Runtime (Level 3)

- **Global Widget**: floating Maria assistant is available across the app shell
- **Official Avatar**: Maria surfaces use `public/maria-puspa-reference.png`
- **3D VRM Model**: Three.js-powered VRM character with blendshapes
- **Voice**: browser TTS with female-voice prioritization (BM/EN fallback)
- **Lip-sync**: amplitude-driven mouth animation connected to speech playback
- **Emotion Map**: dynamic emotion state system for character expressions
- **Feature Flags**: `NEXT_PUBLIC_MARIA_WIDGET_ENABLED`, `NEXT_PUBLIC_MARIA_TTS_ENABLED`, `NEXT_PUBLIC_MARIA_LIPSYNC_ENABLED`

### Personality / Personaliti

> _Cerdas, Mesra, Profesional, Empati, Boleh Dipercayai_
> (Intelligent, Friendly, Professional, Empathetic, Trustworthy)

### Architecture

```
User Prompt
    │
    ▼
┌─────────────────────────────┐
│  Maria Puspa Runtime        │  (hermes.runtime.ts)
│  ┌───────────────────────┐  │
│  │ System Prompt +       │  │
│  │ PUSPA Knowledge Base  │  │
│  │ + Conversation Memory │  │
│  └───────────────────────┘  │
│           │                  │
│           ▼                  │
│  ┌───────────────────────┐  │
│  │ Tool Registry (RBAC)  │  │  22 tools filtered by role
│  └───────────────────────┘  │
│           │                  │
│           ▼                  │
│  ┌───────────────────────┐  │
│  │ OpenRouter API        │  │  Key rotation + SSE streaming
│  │ (OpenAI-compatible)   │  │
│  └───────────────────────┘  │
│           │                  │
│           ▼                  │
│  Tool Execution → Response  │
└─────────────────────────────┘
```

### 22 AI Tools

#### Core / Teras (Staff+)

| Tool                       | Description                                                        |
| -------------------------- | ------------------------------------------------------------------ |
| `ping_system`              | Check system online status and database connectivity               |
| `get_recent_donations`     | Fetch latest donations with amounts and categories                 |
| `get_donation_stats`       | Monthly donation statistics by category (zakat/sadaqah/waqf/infaq) |
| `get_active_cases`         | List active cases with optional status filter                      |
| `get_case_summary`         | Detailed case info with masked IC and notes                        |
| `get_asnafpreneur_stats`   | Asnafpreneur programme statistics                                 |
| `get_member_list`          | Asnaf member directory with category filter                        |
| `get_volunteer_list`       | Volunteer directory with status filter                             |
| `update_volunteer_status`  | Update volunteer active status                                     |
| `get_sedekah_masjid_locations` | Sedekah Jumaat masjid locations (area filter)                  |
| `get_member_stats`         | Member statistics by asnaf category and eKYC status                |
| `get_active_programmes`    | Currently running programmes with dates                            |
| `get_volunteer_stats`      | Volunteer count, active/inactive breakdown                         |
| `get_compliance_status`    | Compliance overview (ROSM, LHDN, PDPA) with overdue tracking       |
| `get_disbursement_summary` | Disbursement totals by status                                      |
| `get_dashboard_overview`   | Cross-module operational summary                                   |

#### Web / Capability (Staff+)

| Tool            | Description                                                     |
| --------------- | --------------------------------------------------------------- |
| `web_search`    | Search the web for real-time information (via z-ai-web-dev-sdk) |
| `web_read`      | Extract content from web pages for RAG                          |
| `delegate_task` | Delegate complex tasks to sub-agents                            |
| `system_health` | Comprehensive system health check                               |

#### Admin / Pentadbiran (Admin+)

| Tool                   | Description                     |
| ---------------------- | ------------------------------- |
| `approve_disbursement` | Approve a pending disbursement  |
| `delete_case`          | Delete a case with audit reason |

### Mandatory RAG Rules

Maria Puspa follows strict RAG (Retrieval-Augmented Generation) rules:

1. **MUST** use tools before answering operational questions — never fabricate data
2. **MUST** use `web_search` + `web_read` for external information
3. **MUST** cite the tool/source used in every response
4. **MUST** mask IC numbers (format: `****XXXX`)
5. **MUST** format currency as RM/MYR
6. **NEVER** claim capabilities she does not have

---

## API Reference / Rujukan API

### Health Check

```
GET /api → { message: "Hello, world!" }
```

### AI Endpoints

| Method | Endpoint              | Description                    |
| ------ | --------------------- | ------------------------------ |
| `POST` | `/api/v1/ai`          | Maria Puspa AI streaming (SSE) |
| `POST` | `/api/v1/ai/telegram` | Maria Puspa for Telegram bot   |

### Module Endpoints

All module endpoints support `GET` (list/detail) and `POST` (create) operations:

| Endpoint                | Module                  |
| ----------------------- | ----------------------- |
| `/api/v1/members`       | Asnaf member management |
| `/api/v1/cases`         | Case management         |
| `/api/v1/donations`     | Donation tracking       |
| `/api/v1/donors`        | Donor management        |
| `/api/v1/disbursements` | Fund disbursements      |
| `/api/v1/programmes`    | Programme management    |
| `/api/v1/volunteers`    | Volunteer management    |
| `/api/v1/compliance`    | Compliance records      |
| `/api/v1/ekyc`          | eKYC verification       |
| `/api/v1/documents`     | Document management     |
| `/api/v1/activities`    | Activity audit log      |
| `/api/v1/settings`      | Platform configuration  |
| `/api/v1/fb-sync`       | Facebook page sync      |
| `/api/organization`     | Organization chart      |
| `/api/institutions`     | Institutions CRUD       |
| `/api/aid-applications` | Aid applications CRUD   |

### Analytics Endpoints

| Method | Endpoint            | Description                |
| ------ | ------------------- | -------------------------- |
| `GET`  | `/api/v1/dashboard` | Dashboard metrics and KPIs |
| `GET`  | `/api/v1/reports`   | Report generation          |

---

## Role-Based Access Control / Kawalan Akses

PUSPA V5 implements a three-tier role hierarchy:

```
┌──────────────────────────────────────────────────┐
│  Level 3 — Developer                             │
│  All Staff + Admin access, plus:                 │
│  • AI Module (Maria Puspa chat interface)        │
│  • Admin tools (approve_disbursement,            │
│    delete_case)                                  │
│  • System health diagnostics                     │
├──────────────────────────────────────────────────┤
│  Level 2 — Admin                                 │
│  All Staff access, plus:                         │
│  • Compliance module                             │
│  • Reports module                                │
│  • eKYC verification                             │
│  • TapSecure                                     │
│  • Admin panel                                   │
├──────────────────────────────────────────────────┤
│  Level 1 — Staff                                 │
│  • Dashboard, Members, Cases, Programmes,        │
│    Donations, Donors, Disbursements,             │
│    Volunteers, Documents, Activities,            │
│    Asnafpreneur, Sedekah Jumaat, Docs,           │
│    Settings, Carta Organisasi, Institusi,        │
│    Permohonan Bantuan                            │
│  • Core AI tools (read-only queries)             │
└──────────────────────────────────────────────────┘
```

Higher roles inherit all permissions of lower roles. AI tools are also filtered by role — staff can only use read-only tools, while admin and developer roles gain access to write operations.

---

## Database Schema / Skema Pangkalan Data

PUSPA V5 uses **27 Prisma models** with full relational integrity:

### Entity Overview

```
┌──────────────────────────────────────────────────────────────┐
│  Users & Auth                                                │
│  User ─┬─ Activity ── Programme                              │
│        └─ CaseNote ── Case                                   │
│        └─ AiConversation ── AiMessage                        │
├──────────────────────────────────────────────────────────────┤
│  Asnaf Members                                               │
│  Member ─┬─ HouseholdMember                                  │
│           ├─ Case ─┬─ CaseNote                               │
│           │        ├─ CaseProgramme ── Programme              │
│           │        └─ Disbursement                           │
│           ├─ Disbursement                                    │
│           ├─ ProgrammeBeneficiary ── Programme               │
│           ├─ Document                                        │
│           └─ EKYCVerification                                │
├──────────────────────────────────────────────────────────────┤
│  Donations & Donors                                          │
│  Donor ── Donation                                           │
├──────────────────────────────────────────────────────────────┤
│  Programmes & Volunteers                                     │
│  Programme ─┬─ ProgrammeBeneficiary                          │
│             ├─ Disbursement                                  │
│             ├─ CaseProgramme                                 │
│             ├─ Document                                      │
│             └─ Activity                                      │
│  Volunteer ─┬─ VolunteerActivity                             │
│             └─ VolunteerCertificate                          │
├──────────────────────────────────────────────────────────────┤
│  Compliance & Documents                                      │
│  ComplianceRecord                                            │
│  Document ── (Member | Case | Programme)                     │
├──────────────────────────────────────────────────────────────┤
│  AI & Ops                                                    │
│  AIMemory                                                    │
│  AiConversation ── AiMessage                                 │
│  OpsWorkItem                                                 │
│  AutomationJob                                               │
├──────────────────────────────────────────────────────────────┤
│  Asnafpreneur                                                │
│  Entrepreneur (name, category, initialCapital, status)        │
├──────────────────────────────────────────────────────────────┤
│  Organization & Institutions                                 │
│  OrganizationMember (name, role, category, position, order)   │
│  Institution (name, type, address, contact, isActive)         │
├──────────────────────────────────────────────────────────────┤
│  Aid Application                                             │
│  AidApplication (full form with PDPA consent, dependents)     │
└──────────────────────────────────────────────────────────────┘
```

### Key Enums / Status Values

| Entity           | Status Fields                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| **Member**       | `asnafCategory`: fakir, miskin, amil, muallaf, gharimin, riqab, ibnu_sabil, fisabilillah                     |
| **Member**       | `ekycStatus`: pending, verified, rejected                                                                    |
| **Case**         | `status`: draft -> intake -> verification -> assessment -> approval -> disbursement -> follow_up -> closed/rejected |
| **Case**         | `priority`: low, medium, high, urgent                                                                        |
| **Donation**     | `category`: zakat, sadaqah, waqf, infaq, general                                                             |
| **Disbursement** | `status`: pending -> approved -> disbursed -> verified -> cancelled                                          |
| **Compliance**   | `category`: rosm, lhdn, pdpa, internal, audit                                                                |
| **EKYC**         | `status`: pending -> submitted -> under_review -> verified -> rejected                                       |

---

## Project Structure / Struktur Projek

```
PUSPA-Z/
├── hermes/                     # Hermes agent skills directory
│   └── skills/                 # Agent skills (apple, creative, etc.)
├── prisma/
│   └── schema.prisma           # Database schema (27 models)
├── public/
│   ├── manifest.json           # PWA web manifest
│   ├── sw.js                   # Service worker (PWA)
│   └── puspa-logo-official.png # Logo assets
├── src/
│   ├── agents/
│   │   └── runtime/
│   │       └── hermes.runtime.ts  # Maria Puspa AI runtime engine
│   ├── app/
│   │   ├── api/
│   │   │   ├── route.ts        # Health check endpoint
│   │   │   └── v1/
│   │   │       ├── ai/
│   │   │       │   ├── route.ts       # AI streaming (SSE)
│   │   │       │   └── telegram/
│   │   │       │       └── route.ts   # Telegram AI endpoint
│   │   │       ├── members/
│   │   │       ├── cases/
│   │   │       ├── donations/
│   │   │       ├── donors/
│   │   │       ├── disbursements/
│   │   │       ├── programmes/
│   │   │       ├── volunteers/
│   │   │       ├── compliance/
│   │   │       ├── ekyc/
│   │   │       ├── documents/
│   │   │       ├── activities/
│   │   │       ├── dashboard/
│   │   │       ├── reports/
│   │   │       ├── settings/
│   │   │       └── fb-sync/
│   │   ├── organization/        # Organization chart API
│   │   ├── institutions/        # Institutions CRUD
│   │   ├── aid-applications/    # Aid applications CRUD
│   │   ├── health/              # Enhanced health check
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components (New York style)
│   │   ├── maria/              # Maria Puspa character components
│   │   │   ├── MariaAvatarUnified.tsx
│   │   │   ├── MariaVRMModel.tsx
│   │   │   ├── MariaVRMModel.module.css
│   │   │   ├── maria-character-renderer.tsx
│   │   │   ├── maria-floating-widget.tsx
│   │   │   ├── maria-vrm-blendshapes.tsx
│   │   │   └── ...
│   │   ├── app-sidebar.tsx     # Main navigation sidebar
│   │   ├── app-header.tsx      # Top header bar
│   │   ├── ai-chat-panel.tsx   # Maria Puspa chat interface
│   │   ├── auth-provider.tsx   # Supabase Auth provider
│   │   ├── query-provider.tsx  # TanStack Query provider
│   │   ├── puspa-logo.tsx      # Logo component
│   │   ├── puspa-loading-spinner.tsx
│   │   ├── view-renderer.tsx   # Lazy module renderer (24 modules)
│   │   └── theme-provider.tsx
│   ├── hooks/
│   │   ├── use-toast.ts
│   │   ├── use-mobile.ts
│   │   └── use-realtime.ts
│   ├── lib/
│   │   ├── access-control.ts   # RBAC view-level permissions
│   │   ├── ai-cache.ts         # AI response caching
│   │   ├── ai-rate-limit.ts    # AI rate limiting
│   │   ├── api-utils.ts        # API utility functions
│   │   ├── audit.ts            # Audit logging
│   │   ├── auth.ts             # Auth utilities
│   │   ├── case-intelligence.ts # Case AI intelligence
│   │   ├── client.ts           # Supabase browser client
│   │   ├── db.ts               # Prisma client singleton
│   │   ├── domain.ts           # Domain utilities
│   │   ├── donor-sync.ts       # Donor synchronization
│   │   ├── maria-avatar.ts     # Avatar asset helpers
│   │   ├── maria-emotion-map.ts # Maria emotion state map
│   │   ├── maria-lipsync.ts    # Lip-sync engine
│   │   ├── maria-quick-prompts.ts # Quick prompt templates
│   │   ├── maria-tts.ts        # Text-to-speech engine
│   │   ├── memory.ts           # AI conversation memory
│   │   ├── openrouter.ts       # OpenRouter client with key rotation
│   │   ├── puspa-brand-assets.ts
│   │   ├── puspa-knowledge.ts  # PUSPA knowledge base for RAG
│   │   ├── rate-limit.ts       # General rate limiting
│   │   ├── sentry.ts           # Sentry error tracking
│   │   ├── sequence.ts         # Sequence utilities
│   │   ├── server.ts           # Supabase server client
│   │   ├── store.ts            # App state (current view, role)
│   │   ├── utils.ts            # Utility functions
│   │   └── validation.ts       # Input validation
│   ├── modules/                # 24 lazy-loaded view pages
│   │   ├── dashboard/page.tsx
│   │   ├── members/page.tsx
│   │   ├── cases/page.tsx
│   │   ├── programmes/page.tsx
│   │   ├── donations/page.tsx
│   │   ├── donors/page.tsx
│   │   ├── disbursements/page.tsx
│   │   ├── volunteers/page.tsx
│   │   ├── compliance/page.tsx
│   │   ├── reports/page.tsx
│   │   ├── ekyc/page.tsx
│   │   ├── documents/page.tsx
│   │   ├── activities/page.tsx
│   │   ├── asnafpreneur/page.tsx
│   │   ├── sedekah-jumaat/page.tsx
│   │   ├── docs/page.tsx
│   │   ├── ai/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── tapsecure/page.tsx
│   │   ├── admin/page.tsx
│   │   ├── carta-organisasi/page.tsx
│   │   ├── institusi/page.tsx
│   │   ├── permohonan-bantuan/page.tsx
│   │   └── puspa-niaga/page.tsx
│   ├── stores/
│   │   ├── hermes-store.ts     # Zustand AI chat state
│   │   └── maria-character-store.ts # Maria character state
│   ├── tools/
│   │   ├── index.ts            # Central tool registry with RBAC
│   │   ├── donations.ts        # Donation-specific tools
│   │   ├── cases.ts            # Case-specific tools
│   │   └── web-tools.ts        # Web search, read, delegate, health
│   └── types/
│       └── index.ts            # TypeScript interfaces
├── mini-services/
│   └── telegram-bot/
│       ├── index.ts            # Long-polling Telegram bot
│       ├── package.json
│       ├── server.py           # Python server for SadTalker
│       ├── SadTalker/          # SadTalker animated avatar engine
│       ├── maria.jpg           # Bot reference image
│       ├── maria-puspa-*.png   # Bot profile images
│       └── RUN_ME.bat          # Windows launcher
├── components.json             # shadcn/ui configuration
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── bun.lock
└── package.json
```

---

## Scripts / Skrip

| Command                  | Description                                         |
| ------------------------ | --------------------------------------------------- |
| `bun run dev`            | Start Next.js dev server on port 3000               |
| `bun run build`          | Production build with standalone output             |
| `bun run start`          | Start production server                             |
| `bun run lint`           | Run ESLint                                          |
| `bun run typecheck`      | Run TypeScript type checks                          |
| `bun run verify:release` | Run release quality gate (lint + typecheck + build) |
| `npm run smoke:maria`    | Smoke-check Maria widget, TTS, and lip-sync wiring  |
| `bun run db:push`        | Push Prisma schema to database                      |
| `bun run db:generate`    | Generate Prisma client                              |
| `bun run db:migrate`     | Run Prisma migrations                               |
| `bun run db:reset`       | Reset database (development only)                   |

---

## Telegram Bot / Bot Telegram

The PUSPA Telegram bot (@MariaPuspaBot) provides mobile access to Maria Puspa AI through a long-polling architecture.

### Bot Commands

| Command                           | Description                                                 |
| --------------------------------- | ----------------------------------------------------------- |
| `/start`                          | Welcome message and capabilities overview                   |
| `/help`                           | List of available commands                                  |
| `/reset`                          | Reset conversation history                                  |
| `/role [staff|admin|developer]`   | Switch access role (admin list required for elevated roles) |
| `/status`                         | Show session status and system info                         |

### Bot Architecture

- **Long polling** (no webhook required)
- **Allowlist-based** access control via `ALLOWED_CHAT_IDS`
- **Admin role guard** via `TELEGRAM_ADMIN_CHAT_IDS` for `/role admin|developer`
- **Internal API auth** via `x-puspa-internal-token` + `PUSPA_INTERNAL_API_TOKEN`
- **Session tracking** per chat ID with role management
- **SSE stream parsing** for real-time AI responses
- **Auto-split** long messages for Telegram's 4096 char limit
- **Typing indicators** while waiting for AI response
- **Health monitoring** with 5-minute interval logging
- **SadTalker integration** for animated avatar video generation

---

## Deployment / Penggunaan

### Zero-VPS Deployment (Recommended)

PUSPA V5 is production-ready with a **no-VPS architecture**:

- **Web + API**: [Vercel](https://vercel.com/) (serverless)
- **Database**: managed PostgreSQL (Neon, Supabase, or equivalent)
- **Telegram bot worker**: hosted worker (Render/Railway/Fly.io) with auto-restart

You do **not** need to provision or maintain your own VPS.

### Live Production

- **URL**: <https://puspa.gangniaga.my>
- **CI/CD**: GitHub Actions → Vercel (auto-deploy on `main`)
- **Last verified build**: commit `28090e9` — `bun run typecheck` + `bun run build` green

### Step-by-Step (No VPS)

1. Push project to GitHub.
2. Import repository into Vercel.
3. Configure env vars in Vercel project settings.
4. Point `DATABASE_URL` to managed PostgreSQL.
5. Deploy.
6. Deploy `mini-services/telegram-bot` on a hosted worker platform.
7. Set bot env vars:
   - `TELEGRAM_BOT_TOKEN`
   - `PUSPA_API_URL` (your Vercel URL)
   - `ALLOWED_CHAT_IDS`
   - `TELEGRAM_ADMIN_CHAT_IDS`
   - `PUSPA_INTERNAL_API_TOKEN` (must match app env)

### Notes

- Vercel handles scaling and HTTPS automatically.
- Telegram endpoint `/api/v1/ai/telegram` requires `x-puspa-internal-token`.
- Use managed PostgreSQL for production (not SQLite).
- DB fallback still protects user experience when transient DB outages happen.

### Deployment Checklist (No VPS)

- [ ] Vercel project connected to main branch and production domain verified.
- [ ] Managed PostgreSQL provisioned and `DATABASE_URL` + `DIRECT_URL` set in Vercel.
- [ ] `OPENROUTER_API_KEY_1` (and optional key rotation vars) set in Vercel.
- [ ] `PUSPA_INTERNAL_API_TOKEN` set in Vercel with strong random value.
- [ ] Telegram worker deployed on Render/Railway/Fly.io (no VPS).
- [ ] Worker env configured: `TELEGRAM_BOT_TOKEN`, `PUSPA_API_URL`, `ALLOWED_CHAT_IDS`, `TELEGRAM_ADMIN_CHAT_IDS`, `PUSPA_INTERNAL_API_TOKEN`.
- [ ] `PUSPA_INTERNAL_API_TOKEN` value matches exactly between Vercel and worker.
- [ ] Smoke test passed:
  - unauthorized call to `/api/v1/ai/telegram` returns `401`
  - allowlisted non-admin cannot set `/role admin`
  - admin chat ID can set `/role admin` or `/role developer`
  - normal Telegram query receives AI response.

### First-Run Onboarding (Operator Friendly)

- [ ] Admin confirms role mapping (`staff`, `admin`, `developer`) before onboarding team.
- [ ] Staff is given quick guide for 3 common actions: create case, check disbursement, check compliance due items.
- [ ] Telegram users test `/start`, `/help`, `/status` and understand role restrictions for `/role`.
- [ ] Team verifies fallback messages are understandable in Bahasa Melayu when AI or DB is unavailable.

---

## Security / Keselamatan

- **IC Number Masking**: All AI responses mask IC numbers as `****XXXX`
- **RBAC**: Three-tier access control across UI views and AI tools
- **API Key Rotation**: Automatic OpenRouter key rotation on 429/5xx errors (up to 4 keys)
- **Telegram Allowlist**: Only authorized chat IDs can interact with the bot
- **Audit Trail**: All privileged operations are logged via the Activity model
- **eKYC Risk Assessment**: Members are classified with risk levels (low/medium/high)
- **Database Fallback**: Graceful degradation when database is unavailable
- **Supabase Auth**: Secure authentication with SSR support
- **Internal API Token**: `PUSPA_INTERNAL_API_TOKEN` protects Telegram API endpoint

---

## Contributing / Penyumbangan

This is a proprietary project for PUSPA organization. Contributions are by invitation only.

---

## Organization / Pertubuhan

### Pertubuhan Urus Peduli Asnaf (PUSPA)

|              |                                                               |
| ------------ | ------------------------------------------------------------- |
| Registration | PPM-024-10-05012022                                           |
| Focus        | Asnaf welfare in Kuala Lumpur & Selangor                      |
| Address      | 2253, Jalan Permata 22, Taman Permata, 53300 Gombak, Selangor |
| Email        | <salam.puspaKL@gmail.com>                                     |
| Phone        | +6012-3183369                                                 |

|                  |                                            |
| ---------------- | ------------------------------------------ |
| Donation Account | Maybank 562209677503                       |
| Facebook         | Pertubuhan Urus Peduli Asnaf KL & Selangor |

---

## License / Lesen

This is **proprietary software** developed exclusively for Pertubuhan Urus Peduli Asnaf (PPM-024-10-05012022). All rights reserved. Unauthorized copying, distribution, or modification is strictly prohibited.

---

![PUSPA](public/puspa-logo-official.png)

*Dibina dengan kasih sayang untuk komuniti asnaf.*
*Built with care for the asnaf community.*

---

*Updated: 2026-08-15*
