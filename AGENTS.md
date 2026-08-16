---
title: "PUSPA — Maria Puspa AI Agent System Rules & Protocol"
document_id: "PUSPA-DOC-AGENTS-001"
version: "5.8.0"
last_updated: "2026-08-16T20:30:00+08:00"
maintainer: "HYPER-SOVEREIGN CONDUCTOR & ARCHITECT"
classification: "INTERNAL AI PROTOCOL"
lifecycle_status: "ACTIVE"
---

# AGENTS.md — PUSPA V5.8 (Maria Puspa AI Agent System)

> **PUSPA V5.8** — Pertubuhan Urus Peduli Asnaf (PPM-024-10-05012022)
> **Location**: `G:\\PUSPA\\PUSPA`

---

## 📜 Audit & Revision Ledger

|| Versi | Tarikh & Masa (MYT) | Pengarang / Ejen | Kenapa (Rasional Perubahan) | Bagaimana (Kaedah & Skop Fail) | Status / Pengesahan ||
|| :---: | :---: | :---: | :--- | :--- | :---: ||
|| `5.8.0` | `2026-08-16 20:30` | `Conductor Agent (GLM-5.2)` | Penambahbaikan visual kelas Emons, palet ungu tunggal, penghijrahan Next.js Image, aksesibiliti mobile-first, dan metadata SEO | Penyeragaman palet warna ke ungu #6A0DAD + neutral, penggantian semua `<img>` ke `<Image />`, penambahan aria/keyboard/touch targets, OpenGraph/Twitter metadata, sla etika reka bentuk mobile-first, komponen cerita penerima manfaat baru' | `tsc: 0 errors, eslint: 0 errors, git pushed cf61be5` ||
|| `5.7.1` | `2026-08-16 10:44` | `Conductor Agent` | Mengundurkan panel sisi kiri/kanan dan memulihkan kad popup hotspot tepat di atas butang `+` / `×` bersama 5 video diorama hidup berasingan | Mengembalikan `portal-interactive-ecosystem.tsx` kepada kad popup mikro setempat (`bottom-full`), redaman spring inersia 5-panel, dan 5 fail video berkualiti tinggi `diorama-01.mp4` ke `05.mp4` | `typecheck: 0 errors, git pushed` ||
| `5.7.0` | `2026-08-16 10:28` | `Conductor Agent` | Mengintegrasikan satu video sinematik berterusan 28s menghubungkan semua 5 zon dengan frame-accurate scrubbing & flyout detail drawer tepat seperti Emons | Menjana `public/videos/puspa-continuous-ecosystem.mp4` via Python FFmpeg, membina `PortalInteractiveEcosystem` dengan single video scroll-scrubber, hotspot sonar 3D (+ / ×), flyout detail drawer kanan & bottom timeline scrubber | `typecheck clean, server 200 OK` |
| `5.6.9` | `2026-08-16 10:07` | `Conductor Agent` | Menjana secara autonomi 100% semua 5 video diorama hidup (watak bergerak, forklift, van, warga emas makan, radar hologram 3D) tanpa penglibatan manual | Membina dan menjalankan `render_living_dioramas.py` untuk menghasilkan video HD 720p H.264 di `public/videos/diorama-01.mp4` hingga `05.mp4` dengan web faststart | `chrome-devtools verified (5/5 live)` |
| `5.6.8` | `2026-08-16 10:00` | `Conductor Agent` | Menaik taraf transisi scrollytelling diorama ke standard EMONS (spring inertia, 3D perspective glide, anamorphic light sweep, sonar radar hotspots) | Mengemas kini `portal-interactive-ecosystem.tsx` dengan `useSpring` inertia damping, efek jalur cahaya sinematik (`AnimatePresence`), butang navigasi pantas (< >) & sokongan papan kekunci | `chrome-devtools verified` |
| `5.6.7` | `2026-08-16 09:50` | `Conductor Agent` | Mengintegrasikan video AI generative watak bergerak sebenar untuk Zon 01 Dapur Barakah | Menukar `public/videos/diorama-01.mp4` kepada video AI `create_pergerakan_yang_biasa_m.mp4` dengan optimasi `faststart` web playback | `chrome-devtools verified (live)` |
| `5.6.5` | `2026-08-16 09:10` | `Conductor Agent` | Mengesahkan kelancaran 5 video diorama (Dapur ke Hab) & membaiki pengecualian media pada middleware | Menambah `mp4` ke matcher `src/middleware.ts`, menyuntik `media-src` di `next.config.ts`, dan mengesahkan status main video via Chrome DevTools | `chrome-devtools verified (5/5 playing)` |
| `5.6.4` | `2026-08-16 08:45` | `Conductor Agent` | Menggantikan semua foto lama dengan 6 foto dokumentari berkualiti tinggi baharu bagi seksyen Galeri Lapangan | Menjana 6 foto realistik di `public/gallery-agihan-0X.jpg`, memadam foto lama, dan mengemas kini `portal-agihan-gallery.tsx` | `chrome-devtools verified` |
| `5.6.3` | `2026-08-16 08:15` | `Conductor Agent` | Mengubah semua 5 imej diorama statik kepada video animasi bergerak 2.5D sinusoidal loop | Menjana 5 fail video H.264 di `public/videos/diorama-0X.mp4` via FFmpeg & mengemas kini `portal-interactive-ecosystem.tsx` | `chrome-devtools verified` |
| `5.6.2` | `2026-08-15 23:33` | `Conductor Agent` | Menyelaraskan mandat SMS-v1.0 bagi penjejakan mikro setiap perubahan | Menambah blok YAML Frontmatter dan Audit Ledger lengkap | `typecheck: 0 errors` |
| `5.6.1` | `2026-08-15 23:25` | `Conductor Agent` | Mengemas kini status penambahbaikan terkini (CSP, API Bantuan, Diorama) | Mengemaskini jadual Seksyen 19 dengan 4 item penambahbaikan baharu | `verified` |
| `5.6.0` | `2026-08-15 12:20` | `Conductor Agent` | Pelaksanaan integrasi modul PUSPA Niaga dan 27 Prisma models | Penstrukturan modul dan kemaskini peranan RBAC | `build clean` |

---

## Table of Contents

1. [Overview](#1-overview)
2. [Identity & Persona](#2-identity--persona)
3. [Architecture Diagram](#3-architecture-diagram)
4. [Runtime Engine](#4-runtime-engine)
5. [System Prompt](#5-system-prompt)
6. [Tool System](#6-tool-system)
7. [Memory System](#7-memory-system)
8. [OpenRouter Client](#8-openrouter-client)
9. [Knowledge Base](#9-knowledge-base)
10. [PII Protection](#10-pii-protection)
11. [API Endpoints](#11-api-endpoints)
12. [SSE Stream Protocol](#12-sse-stream-protocol)
13. [Frontend: Chat Panel & Store](#13-frontend-chat-panel--store)
14. [Telegram Bot](#14-telegram-bot)
15. [Role-Based Access Control](#15-role-based-access-control)
16. [Configuration & Environment](#16-configuration--environment)
17. [File Map](#17-file-map)
18. [Advanced Features (NEW)](#18-advanced-features)
19. [Improvements (2026-08-15)](#19-improvements-2026-08-15)
20. [Multi-Agent Delegation Protocol](#20-multi-agent-delegation-protocol)
21. [Free Models Reference](#21-free-models-reference)

---

## 1. Overview

Maria Puspa is the AI assistant embedded in the PUSPA NGO management platform. She follows the **Hermes Agent architecture** — a design pattern that enforces **mandatory RAG (Retrieval-Augmented Generation)**, **tool-calling with RBAC**, and **streaming responses** through OpenRouter (OpenAI-compatible API).

### Design Principles

| Principle | Implementation |
|---|---|
| **Mandatory RAG** | AI must call tools before answering any operational data question — never fabricate |
| **Role-Based Access** | Tools are filtered by user role (staff / admin / developer) at multiple layers |
| **PII Protection** | IC numbers always masked to `****XXXX` in tool responses |
| **Short & Sharp** | Responses capped at 2–3 sentences; no filler, no emojis |
| **Dual Interface** | SSE streaming for web app; non-streaming JSON for Telegram |
| **Graceful Degradation** | In-memory fallback when database is unavailable (Vercel serverless) |
| **Key Rotation** | Up to 4 OpenRouter API keys with automatic rotation on 429/5xx errors |
| **Model Fallback** | Auto-switch between tencent/hy3-preview:free, gpt-4o-mini, gpt-3.5-turbo |
| **Response Caching** | AI responses cached (5min TTL, 1000 entry limit) |
| **Rate Limiting** | Per-user/IP limits (AI: 30/min, API: 100/min, auth: 5/min) |
| **Audit Logging** | All tool executions & user actions logged |
| **PWA Support** | Offline-capable with service worker + manifest |
| **Realtime** | Supabase Realtime hook for live data updates |
| **3D Avatar** | Maria VRM model with blendshapes, TTS, and lip-sync |

---

## 2. Identity & Persona

| Property | Value |
|---|---|
| **Name** | Maria Puspa |
| **Role** | AI Assistant for PUSPA NGO |
| **Language** | Bahasa Melayu (primary), English (secondary) |
| **Tone** | Professional, warm, concise |
| **Emoji** | Never |
| **Avatar** | 3D VRM model (`/models/maria.vrm`) with Framer Motion fallback |
| **Widget** | Floating trigger button opens chat panel |

---

## 3. Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        PUSPA V5 Platform                          │
│                                                                    │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────────┐  │
│  │   Web App    │    │  Telegram    │    │   Hermes Runtime     │  │
│  │   (Next.js)  │◄──►│  Bot Worker  │◄──►│   (CLI / Gateway)    │  │
│  └──────┬───────┘    └──────┬───────┘    └──────────┬───────────┘  │
│         │                   │                       │              │
│         ▼                   ▼                       ▼              │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │                    API Layer (App Router)                     │  │
│  │  /api/v1/ai  /api/v1/members  /api/v1/donations  /api/health │  │
│  └──────────────────────────┬───────────────────────────────────┘  │
│                             │                                      │
│         ┌───────────────────┼───────────────────┐                 │
│         ▼                   ▼                   ▼                  │
│  ┌────────────┐    ┌────────────┐    ┌────────────────────┐       │
│  │ Maria VRM  │    │  Supabase  │    │    OpenRouter      │       │
│  │ Components │    │  Auth + DB │    │    (AI Models)     │       │
│  └────────────┘    └────────────┘    └────────────────────┘       │
│                                                                    │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │              24 Feature Modules (src/modules/)               │  │
│  └──────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 4. Runtime Engine

| Component | File | Purpose |
|---|---|---|
| **Hermes Runtime** | `src/agents/runtime/hermes.runtime.ts` | AI orchestration, RAG enforcement |
| **Hermes Config** | `hermes/config.yaml` | Runtime configuration |
| **Hermes State** | `hermes/state.db` | Hermes agent state |
| **Hermes Memory** | `hermes/MEMORY.md` | Long-term agent memory |
| **Hermes Soul** | `hermes/SOUL.md` | Agent persona definition |
| **Hermes User** | `hermes/USER.md` | User profile for agent |
| **Runtime Mode** | `HERMES_RUNTIME_MODE=cli` | CLI or gateway mode |
| **CLI Timeout** | `HERMES_CLI_TIMEOUT_MS=45000` | Timeout for CLI execution |

---

## 5. System Prompt

- Bahasa Melayu as primary language
- Mandatory tool calling for operational data
- PII masking for all IC numbers
- Concise responses (2-3 sentences max)
- No emojis, no filler

---

## 6. Tool System

- 22 tools (18 core + 4 extended) with RBAC filtering
- Tool registry: `src/tools/index.ts`
- Roles: staff, admin, developer

---

## 7. Memory System

| Component | File | Purpose |
|---|---|---|
| **Memory Lib** | `src/lib/memory.ts` | Conversation history |
| **AI Memory Model** | `AIMemory` (Prisma) | Persistent message storage |
| **AI Conversations** | `AiConversation`, `AiMessage` (Prisma) | Thread management |

---

## 8. OpenRouter Client

**File**: `src/lib/openrouter.ts`

### Key Rotation (up to 4 keys)
- `OPENROUTER_API_KEY` (single key, backward-compatible)
- `OPENROUTER_API_KEY_1` through `OPENROUTER_API_KEY_4` (multi-key rotation)

### Model Fallback Chain
1. `tencent/hy3-preview:free` (default)
2. `openai/gpt-4o-mini`
3. `openai/gpt-3.5-turbo`

### Rate Limits
- 30 requests/minute per user for AI endpoints
- 100 requests/minute per IP for general API
- 5 requests/minute per IP for auth endpoints

---

## 9. Knowledge Base

- Organization info: PUSPA (Pertubuhan Urus Peduli Asnaf)
- Registration: PPM-024-10-05012022
- Knowledge lib: `src/lib/puspa-knowledge.ts`
- Brand assets: `src/lib/puspa-brand-assets.ts`

---

## 10. PII Protection

- IC numbers masked to `****XXXX` in all tool responses
- Sentry integration sanitizes PII before sending
- Audit logging tracks all data access

---

## 11. API Endpoints

| Route | Purpose |
|---|---|
| `src/app/api/v1/ai/route.ts` | Main AI endpoint (SSE streaming) |
| `src/app/api/v1/ai/telegram/route.ts` | Telegram bot AI endpoint |
| `src/app/api/v1/members/route.ts` | Members CRUD |
| `src/app/api/v1/cases/route.ts` | Cases CRUD |
| `src/app/api/v1/programmes/route.ts` | Programmes CRUD |
| `src/app/api/v1/donations/route.ts` | Donations CRUD |
| `src/app/api/v1/donors/route.ts` | Donors CRUD |
| `src/app/api/v1/disbursements/route.ts` | Disbursements CRUD |
| `src/app/api/v1/volunteers/route.ts` | Volunteers CRUD |
| `src/app/api/v1/compliance/route.ts` | Compliance CRUD |
| `src/app/api/v1/ekyc/route.ts` | eKYC CRUD |
| `src/app/api/v1/documents/route.ts` | Documents CRUD |
| `src/app/api/v1/activities/route.ts` | Activities CRUD |
| `src/app/api/v1/reports/route.ts` | Reports |
| `src/app/api/v1/dashboard/route.ts` | Dashboard metrics |
| `src/app/api/organization/route.ts` | Organization chart |
| `src/app/api/institutions/route.ts` | Institutions CRUD |
| `src/app/api/aid-applications/route.ts` | Aid applications CRUD |
| `src/app/api/health/route.ts` | Enhanced health check |
| `src/app/api/route.ts` | Root API info |
| `src/app/api/v1/settings/route.ts` | Settings CRUD |
| `src/app/api/v1/fb-sync/route.ts` | Facebook page sync |
| `src/app/auth/callback/route.ts` | Supabase OAuth callback (code exchange) |
| `src/modules/asnafpreneur/route.ts` | Asnafpreneur module API |

---

## 12. SSE Stream Protocol

- Server-Sent Events for real-time AI responses
- Web app: SSE streaming via `EventSource`
- Telegram: non-streaming JSON responses

---

## 13. Frontend: Chat Panel & Store

### 24 Feature Modules

| Module | Path | Description |
|---|---|---|
| **dashboard** | `src/modules/dashboard/` | Main dashboard |
| **members** | `src/modules/members/` | Asnaf member management |
| **cases** | `src/modules/cases/` | Case management |
| **programmes** | `src/modules/programmes/` | Programme management |
| **donations** | `src/modules/donations/` | Donation tracking |
| **donors** | `src/modules/donors/` | Donor management |
| **disbursements** | `src/modules/disbursements/` | Fund disbursement |
| **volunteers** | `src/modules/volunteers/` | Volunteer management |
| **compliance** | `src/modules/compliance/` | Regulatory compliance |
| **reports** | `src/modules/reports/` | Reports & analytics |
| **ekyc** | `src/modules/ekyc/` | Electronic KYC |
| **documents** | `src/modules/documents/` | Document management |
| **activities** | `src/modules/activities/` | Activity logging |
| **asnafpreneur** | `src/modules/asnafpreneur/` | Entrepreneur programme |
| **sedekah-jumaat** | `src/modules/sedekah-jumaat/` | Friday charity |
| **docs** | `src/modules/docs/` | Documentation module |
| **ai** | `src/modules/ai/` | AI chat module |
| **settings** | `src/modules/settings/` | App settings |
| **tapsecure** | `src/modules/tapsecure/` | Tap secure module |
| **admin** | `src/modules/admin/` | Admin panel |
| **carta-organisasi** | `src/modules/carta-organisasi/` | Organization chart |
| **institusi** | `src/modules/institusi/` | Institutions |
| **permohonan-bantuan** | `src/modules/permohonan-bantuan/` | Aid applications |
| **puspa-niaga** | `src/modules/puspa-niaga/` | Asnaf entrepreneur product & sales platform |

### Stores

| Store | File | Purpose |
|---|---|---|
| Hermes Store | `src/stores/hermes-store.ts` | Chat state, messages |
| Maria Character Store | `src/stores/maria-character-store.ts` | Maria presence, emotion, speech, lip-sync state |

### Components

| Component | File | Purpose |
|---|---|---|
| AI Chat Panel | `src/components/ai-chat-panel.tsx` | Maria Puspa chat UI |
| Maria Floating Widget | `src/components/maria/maria-floating-widget.tsx` | Floating button trigger |
| Maria Character Renderer | `src/components/maria/maria-character-renderer.tsx` | Emotion/presence renderer |
| Maria Avatar Unified | `src/components/maria/MariaAvatarUnified.tsx` | Unified avatar (Framer/VRM/Lottie) |
| Maria VRM Model | `src/components/maria/MariaVRMModel.tsx` | 3D VRM model (Three.js) |
| Maria VRM Blendshapes | `src/components/maria/maria-vrm-blendshapes.tsx` | VRM blendshape controller |
| Query Provider | `src/components/query-provider.tsx` | React Query provider |

---

## 14. Telegram Bot

**Directory**: `mini-services/telegram-bot/`

| File | Purpose |
|---|---|
| `index.ts` | Main bot handler (TypeScript/Bun) |
| `server.py` | Python server for SadTalker integration |
| `RUN_ME.bat` | Quick start script |

### Bot Features
- Non-streaming JSON responses (different from web SSE)
- SadTalker integration for animated avatar videos
- Audio/TTS support (`temp_*.wav` files)

### Allowed Users
- Controlled via `TELEGRAM_ALLOWED_USERS` env var
- Home channel: `TELEGRAM_HOME_CHANNEL`

---

## 15. Role-Based Access Control

- **Staff**: Read/write own data, view reports
- **Admin**: Full data access, user management
- **Developer**: System-level access, tool execution
- Auth via **Supabase Auth** (JWT-based)
- `src/lib/auth.ts` — Auth utilities
- `src/components/auth-provider.tsx` — Auth context provider
- `PUSPA_INTERNAL_API_TOKEN` — Internal API security token
- `GATEWAY_ALLOW_ALL_USERS` — Feature flag for open access

---

## 16. Configuration & Environment

### Required Variables (.env.local)
```env
# OpenRouter (AI)
OPENROUTER_API_KEY="sk-or-v1-..."          # Single key (backward-compatible)
OPENROUTER_API_KEY_1="sk-or-v1-..."         # Multi-key rotation (optional)
OPENROUTER_API_KEY_2="sk-or-v1-..."         # (optional)
OPENROUTER_API_KEY_3="sk-or-v1-..."         # (optional)
OPENROUTER_API_KEY_4="sk-or-v1-..."         # (optional)
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
OPENROUTER_MODEL="tencent/hy3-preview:free"
OPENROUTER_APP_NAME=PUSPA V5
OPENROUTER_APP_URL=http://localhost:3000

# Supabase Auth + Database (PostgreSQL)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
SUPABASE_SERVICE_ROLE_KEY=service_role_YOUR_SECRET_KEY
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_ID.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_ID.supabase.co:5432/postgres

# Hermes Runtime
HERMES_RUNTIME_MODE=cli
HERMES_CLI_TIMEOUT_MS=45000

# Telegram
TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN
TELEGRAM_ALLOWED_USERS=YOUR_TELEGRAM_USER_ID
TELEGRAM_HOME_CHANNEL=YOUR_TELEGRAM_USER_ID

# Internal API Security
PUSPA_INTERNAL_API_TOKEN=YOUR_RANDOM_SECRET_TOKEN_HERE

# Feature Flags
GATEWAY_ALLOW_ALL_USERS=false
WHATSAPP_ENABLED=true
PUSPA_REQUIRE_AUTH_FOR_AI=true

# Maria Widget
NEXT_PUBLIC_MARIA_WIDGET_ENABLED=true
NEXT_PUBLIC_MARIA_TTS_ENABLED=true
NEXT_PUBLIC_MARIA_LIPSYNC_ENABLED=true

# Rate Limiting
PUSPA_AI_RATE_WINDOW_MS=60000
PUSPA_AI_RATE_ANONYMOUS_MAX=15
PUSPA_AI_RATE_AUTH_MAX=45
```

**Note**: `.env*` is in `.gitignore`. Never commit real credentials.

### Database
- **PostgreSQL via Supabase** — sole database (no SQLite)
- Pooler URL for serverless (Vercel) compatibility
- `DIRECT_URL` for migrations and direct connections

### Deployment
- **Vercel** — Next.js web application
- **Telegram Bot Worker** — Separate service (`mini-services/telegram-bot/`)
- Auth via **Supabase Auth** (JWT, row-level security)

---

## 17. File Map

### Core AI System
```
src/agents/runtime/hermes.runtime.ts    — Main AI orchestration
src/lib/openrouter.ts                   — OpenRouter client (key rotation, model fallback)
src/tools/index.ts                       — Tool registry (18 core + 4 extended web tools = 22 total with RBAC)
src/lib/memory.ts                        — Conversation history & message storage
src/lib/ai-cache.ts                      — AI response caching (5min TTL, 1000 entries)
src/lib/rate-limit.ts                    — Rate limiting (AI: 30/min, API: 100/min, auth: 5/min)
src/lib/audit.ts                          — Audit logging (tool executions, user actions)
src/lib/validation.ts                     — Zod validation schemas (AI requests, donations, cases)
src/lib/sentry.ts                         — Sentry error tracking (PII sanitization)
src/lib/ai-rate-limit.ts                  — AI-specific rate limiting
```

### Maria VRM & Avatar System
```
src/stores/maria-character-store.ts      — Maria presence, emotion, speech, lip-sync state
src/components/maria/maria-floating-widget.tsx     — Floating chat trigger button
src/components/maria/maria-character-renderer.tsx  — Emotion/presence renderer
src/components/maria/MariaAvatarUnified.tsx        — Unified avatar (Framer/VRM/Lottie)
src/components/maria/MariaVRMModel.tsx             — 3D VRM model (Three.js + @pixiv/three-vrm)
src/components/maria/MariaVRMModel.module.css      — VRM canvas styles
src/components/maria/maria-vrm-blendshapes.tsx     — VRM blendshape controller
src/lib/maria-emotion-map.ts             — Emotion to animation mapping
src/lib/maria-tts.ts                     — Text-to-speech engine
src/lib/maria-lipsync.ts                 — Lip-sync engine
src/lib/maria-avatar.ts                  — Avatar utilities
src/lib/maria-quick-prompts.ts           — Quick prompt presets
```

### Frontend
```
src/app/layout.tsx                        — Root layout (Theme, Auth, QueryProvider)
src/components/query-provider.tsx          — React Query provider
src/components/ai-chat-panel.tsx          — Maria Puspa chat UI
src/hooks/use-realtime.ts                 — Supabase Realtime hook
src/stores/hermes-store.ts                — Zustand store for chat
src/stores/maria-character-store.ts       — Zustand store for Maria character state
src/components/auth-provider.tsx          — Supabase Auth context provider
src/lib/auth.ts                           — Auth utilities
src/lib/store.ts                          — App-level store
```

### PWA & Static
```
public/manifest.json                       — PWA manifest
public/sw.js                               — Service worker (app shell caching, offline fallback)
```

### Scripts
```
scripts/hermes-agent.ps1                  — Hermes agent launcher (PowerShell)
scripts/hermes-agent.py                   — Hermes agent (Python)
scripts/maria-smoke.js                    — Maria VRM smoke test
```

### Hermes Runtime
```
hermes/config.yaml                        — Runtime configuration
hermes/MEMORY.md                          — Long-term agent memory
hermes/SOUL.md                            — Agent persona definition
hermes/USER.md                            — User profile for agent
hermes/state.db                           — Agent state database
hermes/gateway_state.json                 — Gateway state
hermes/channel_directory.json             — Channel directory
hermes/kanban.db                          — Kanban state
```

### Telegram Bot Service
```
mini-services/telegram-bot/index.ts       — Main bot handler
mini-services/telegram-bot/server.py      — Python SadTalker server
mini-services/telegram-bot/package.json   — Bot dependencies
mini-services/telegram-bot/RUN_ME.bat     — Quick start script
```

### API Routes
```
src/app/api/v1/ai/route.ts               — Main AI endpoint (SSE streaming)
src/app/api/v1/ai/telegram/route.ts      — Telegram bot AI endpoint
src/app/api/v1/members/route.ts          — Members CRUD
src/app/api/v1/cases/route.ts            — Cases CRUD
src/app/api/v1/programmes/route.ts       — Programmes CRUD
src/app/api/v1/donations/route.ts        — Donations CRUD
src/app/api/v1/donors/route.ts           — Donors CRUD
src/app/api/v1/disbursements/route.ts    — Disbursements CRUD
src/app/api/v1/volunteers/route.ts       — Volunteers CRUD
src/app/api/v1/compliance/route.ts       — Compliance CRUD
src/app/api/v1/ekyc/route.ts             — eKYC CRUD
src/app/api/v1/documents/route.ts        — Documents CRUD
src/app/api/v1/activities/route.ts       — Activities CRUD
src/app/api/v1/reports/route.ts          — Reports
src/app/api/v1/dashboard/route.ts        — Dashboard metrics
src/app/api/organization/route.ts        — Organization chart
src/app/api/institutions/route.ts        — Institutions CRUD
src/app/api/aid-applications/route.ts    — Aid applications CRUD
src/app/api/health/route.ts              — Enhanced health check
src/app/api/route.ts                     — Root API info
src/app/api/v1/settings/route.ts          — Settings CRUD
src/app/api/v1/fb-sync/route.ts           — Facebook page sync
src/app/auth/callback/route.ts            — Supabase OAuth callback (code exchange)
src/modules/asnafpreneur/route.ts         — Asnafpreneur module API
```

### Shared Libraries
```
src/lib/api-utils.ts                      — API utility functions
src/lib/case-intelligence.ts              — Case AI intelligence
src/lib/db.ts                             — Database client (Prisma)
src/lib/domain.ts                         — Domain types
src/lib/donor-sync.ts                     — Donor synchronization
src/lib/sequence.ts                       — Sequence utilities
src/lib/utils.ts                          — General utilities
src/lib/access-control.ts                 — Access control helpers
src/lib/puspa-knowledge.ts                — PUSPA knowledge base
src/lib/puspa-brand-assets.ts             — Brand asset references
src/lib/client.ts                         — Supabase client
src/lib/server.ts                         — Supabase server client
```

---

## 18. Advanced Features

### 18.1 AI Response Caching
**File**: `src/lib/ai-cache.ts`
- In-memory cache for frequent AI queries
- TTL: 5 minutes
- Max entries: 1000
- Cache key: `{userId}:{query}`

### 18.2 Rate Limiting
**File**: `src/lib/rate-limit.ts`
- Per-user and per-IP rate limiting
- Different limits for AI, API, and auth endpoints
- Headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`

### 18.3 Audit Logging System
**File**: `src/lib/audit.ts`
- Tracks: tool_execution, user_login, data_create/update/delete, config_change, ai_request/response
- Stores: userId, action, resource, details, ipAddress, userAgent
- In-memory store (serverless-compatible), ready for Sentry/LogRocket integration

### 18.4 React Query Optimizations
**File**: `src/components/query-provider.tsx`
- Stale time: 5 minutes
- Cache time (gcTime): 10 minutes
- Retry: 3 attempts with exponential backoff
- Refetch on window focus: disabled (for fresh data only)

### 18.5 Validation Schemas
**File**: `src/lib/validation.ts`
- Zod schemas for AI requests, donations, cases
- `validateRequest()` helper with error formatting

### 18.6 Sentry Error Tracking (Ready)
**File**: `src/lib/sentry.ts`
- PII sanitization (IC numbers masked before sending)
- Configured for production only
- Session replay & performance monitoring ready

### 18.7 PWA Support
**Files**: `public/manifest.json`, `public/sw.js`
- App shell caching
- Offline fallback
- Install prompt for mobile

### 18.8 Supabase Realtime Hook
**File**: `src/hooks/use-realtime.ts`
- Subscribe to INSERT/UPDATE/DELETE on any table
- Client-side realtime updates
- Automatic cleanup on unmount

### 18.9 Maria 3D VRM Avatar
**Files**: `src/components/maria/MariaVRMModel.tsx`, `src/components/maria/maria-vrm-blendshapes.tsx`
- 3D VRM model rendering via Three.js + @react-three/fiber
- VRM blendshape control for expressions
- Configurable via `NEXT_PUBLIC_MARIA_WIDGET_ENABLED`

### 18.10 Maria Avatar System
**Files**: `src/components/maria/MariaAvatarUnified.tsx`, `src/components/maria/maria-character-renderer.tsx`
- Unified avatar component with Framer Motion / VRM / Lottie modes
- Emotion state mapping (`neutral`, `warm`, `focus`, `alert`, `empathetic`)
- Presence states (`idle`, `listening`, `thinking`, `speaking`)
- Floating widget trigger (`maria-floating-widget.tsx`)

### 18.11 Text-to-Speech & Lip-Sync
**Files**: `src/lib/maria-tts.ts`, `src/lib/maria-lipsync.ts`
- Browser TTS integration with voice selection
- Lip-sync driven by phoneme energy from `maria-character-store.ts`
- Toggle via `NEXT_PUBLIC_MARIA_TTS_ENABLED` and `NEXT_PUBLIC_MARIA_LIPSYNC_ENABLED`

### 18.12 Supabase Auth Integration
**Files**: `src/lib/auth.ts`, `src/components/auth-provider.tsx`
- JWT-based authentication via Supabase
- Row-level security (RLS) policies for data access
- Role-based UI rendering

---

## 19. Improvements (2026-08-15)

### Implemented by: Hermes Agent (Tencent/hy3-preview:free via OpenRouter)

| Improvement | File(s) | Status |
|---|---|---|
| Public Portal Landing (`/`) with Aurora Glow | `src/app/page.tsx`, `src/components/portal/*` | DONE |
| 5-Zon 3D Diorama Flight & Timeline Scrubber | `src/components/portal/portal-interactive-ecosystem.tsx` | DONE |
| Aid Applications API & Form Integration | `src/app/api/aid-applications/route.ts`, `src/modules/permohonan-bantuan/page.tsx` | DONE |
| Content Security Policy with 'unsafe-eval' | `next.config.ts` | DONE |
| OpenRouter model fallback chain | `src/lib/openrouter.ts` | DONE |
| AI response caching (5min TTL) | `src/lib/ai-cache.ts` | DONE |
| Rate limiting (AI/API/auth) | `src/lib/rate-limit.ts` | DONE |
| Enhanced health check | `src/app/api/health/route.ts` | DONE |
| Zod validation schemas | `src/lib/validation.ts` | DONE |
| Sentry error tracking | `src/lib/sentry.ts` | DONE |
| Audit logging system | `src/lib/audit.ts` | DONE |
| React Query optimizations | `src/components/query-provider.tsx` | DONE |
| PWA support | `public/manifest.json`, `public/sw.js` | DONE |
| Supabase Realtime hook | `src/hooks/use-realtime.ts` | DONE |
| Layout with QueryProvider | `src/app/layout.tsx` | DONE |
| OpenRouter key format fix | `src/lib/openrouter.ts` | DONE |
| OpenRouter multi-key rotation (1-4 keys) | `src/lib/openrouter.ts` | DONE |
| Supabase Auth integration | `src/lib/auth.ts`, `src/components/auth-provider.tsx` | DONE |
| Maria 3D VRM avatar | `src/components/maria/MariaVRMModel.tsx` | DONE |
| Maria avatar unified system | `src/components/maria/MariaAvatarUnified.tsx` | DONE |
| Maria floating widget | `src/components/maria/maria-floating-widget.tsx` | DONE |
| Maria character store | `src/stores/maria-character-store.ts` | DONE |
| Maria TTS & lip-sync | `src/lib/maria-tts.ts`, `src/lib/maria-lipsync.ts` | DONE |
| Maria VRM blendshapes | `src/components/maria/maria-vrm-blendshapes.tsx` | DONE |
| PostgreSQL-only (no SQLite) | `prisma/schema.prisma` | DONE |
| 24 feature modules | `src/modules/*/` | DONE |
| 27 Prisma models | `prisma/schema.prisma` | DONE |
| Telegram bot worker | `mini-services/telegram-bot/` | DONE |
| Hermes runtime CLI mode | `hermes/config.yaml` | DONE |
| Vercel deployment target | N/A | DONE |
| Internal API token security | `PUSPA_INTERNAL_API_TOKEN` | DONE |

### Environment Variables Configured
- `OPENROUTER_API_KEY` + `OPENROUTER_API_KEY_1..4` (tencent/hy3-preview:free)
- `DATABASE_URL` + `DIRECT_URL` (Supabase PostgreSQL)
- `NEXT_PUBLIC_SUPABASE_URL` + `PUBLISHABLE_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `HERMES_RUNTIME_MODE=cli`
- `HERMES_CLI_TIMEOUT_MS=45000`
- `PUSPA_INTERNAL_API_TOKEN`
- `NEXT_PUBLIC_MARIA_WIDGET_ENABLED=true`
- `NEXT_PUBLIC_MARIA_TTS_ENABLED=true`
- `NEXT_PUBLIC_MARIA_LIPSYNC_ENABLED=true`

---

## 20. Multi-Agent Delegation Protocol

> Complete delegation guidelines: `orchestrator.md`

### 20.1 Model Selection Per Task Type

| Task Type | Primary Model | Context | Rationale |
|-----------|--------------|---------|-----------|
| General/chat | `tencent/hy3-preview:free` | 262K | Proven working, default |
| Code generation | `qwen/qwen3-coder:free` | 262K | Purpose-built coder |
| Code review | `openai/gpt-oss-120b:free` | 131K | Strong reasoning |
| Vision/image | `google/gemma-4-26b-a4b-it:free` | 262K | Multimodal via OpenRouter |
| Architecture | `nvidia/nemotron-3-super-120b-a12b:free` | 262K | 120B params |
| Docs/marketing | `minimax/minimax-m2.5:free` | 196K | Long context, fluent BM |
| Debugging | `meta-llama/llama-3.3-70b-instruct:free` | 65K | 70B instruct |
| OCR | `baidu/qianfan-ocr-fast:free` | 65K | Specialized OCR |

### 20.2 When to Delegate vs Execute Direct

**DELEGATE when:**
- 3+ file changes across 2+ modules
- Specialized model needed (coding, vision, architecture)
- Independent tasks that can run in parallel
- Isolated build/test in separate terminal session

**EXECUTE DIRECT when:**
- 1-2 file changes (quick patch)
- User interaction required (clarification, confirmation)
- Sequential dependencies (waiting for sub-agent output)
- Simple queries (read file, search, status check)

### 20.3 Concurrency Rules

- **Max 3 sub-agents** concurrently (token/context limits)
- Frontend ∥ Backend can run parallel (independent domains)
- Database → API → Frontend must be sequential (dependency chain)
- Vision tasks sequential (single model call per image)
- Code review must wait for code generation to complete

### 20.4 Dependency Chains

**Standard Feature Development:**
```
[Plan] → [DB Schema] → [API Routes] → [Frontend] → [Review] → [Test] → [Deploy]
```

**Parallel Tracks:**
```
Track A: [DB Schema] → [API Routes]
Track B: [UI Components] → [Frontend Pages]
         ↓ MERGE ↓
      [Integration] → [Review] → [Deploy]
```

### 20.5 Sub-Agent Profiles

| Role | Model | Toolsets | Responsibility |
|------|-------|----------|----------------|
| architect | nvidia/nemotron-3-super-120b-a12b:free | file, terminal, web | Plan, design, delegate |
| coder | qwen/qwen3-coder:free | file, terminal | Implement, fix, test |
| reviewer | openai/gpt-oss-120b:free | file, terminal | Review, QA, security |
| marketer | minimax/minimax-m2.5:free | file, web | Content, campaigns |
| vision | google/gemma-4-26b-a4b-it:free | file, vision | Image analysis, QA |

---

## 21. Free Models Reference

All 28 free models configured in `src/lib/openrouter.ts` → `FREE_MODELS` array.

### Tier 1: General Purpose
- `tencent/hy3-preview:free` (262K) — Default, proven
- `nvidia/nemotron-3-super-120b-a12b:free` (262K, 120B)
- `minimax/minimax-m2.5:free` (196K)
- `openrouter/free` (200K, text+image)

### Tier 2: Coding Specialized
- `qwen/qwen3-coder:free` (262K)
- `openai/gpt-oss-120b:free` (131K)
- `baidu/cobuddy:free` (131K)

### Tier 3: Vision/Multimodal
- `google/gemma-4-26b-a4b-it:free` (262K, image+text+video)
- `google/gemma-4-31b-it:free` (262K, image+text+video)
- `google/lyria-3-pro-preview` (1M, text+image)
- `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free` (256K, audio+image+video)
- `nvidia/nemotron-nano-12b-v2-vl:free` (128K, image+text+video)
- `baidu/qianfan-ocr-fast:free` (65K, image+text)

### Tier 4: Additional Free Models (19 models)
- `openai/gpt-oss-20b:free`, `nousresearch/hermes-3-llama-3.1-405b:free`, `z-ai/glm-4.5-air:free`
- `meta-llama/llama-3.2-3b-instruct:free`, `qwen/qwen3-next-80b-a3b-instruct:free`
- `nvidia/nemotron-3-nano-30b-a3b:free`, `nvidia/nemotron-nano-9b-v2:free`
- `poolside/laguna-xs.2:free`, `poolside/laguna-m.1:free`
- `meta-llama/llama-3.3-70b-instruct:free`
- `liquid/lfm-2.5-1.2b-thinking:free`, `liquid/lfm-2.5-1.2b-instruct:free`
- `cognitivecomputations/dolphin-mistral-24b-venice-edition:free`

### Vision Strategy
- **All vision via OpenRouter** — Google/Gemini dependency removed
- Default vision model: `google/gemma-4-26b-a4b-it:free` (via OpenRouter)
- Client: `src/lib/vision-openrouter.ts`
- Config: `OPENROUTER_VISION_MODEL` env var
- 8 free vision-capable models available (see Free Models Reference)

*End of AGENTS.md v5.6 (2026-08-15) — OpenRouter Only*
