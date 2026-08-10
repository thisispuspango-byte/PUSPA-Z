# PUSPA V5 — Architecture Document

> **PERTUBUHAN URUS PEDULI ASNAF (PPM-024-10-05012022)**
> Platform pengurusan NGO dengan AI Assistant Maria Puspa
> Cerdas. Mesra. Sentiasa di sisi anda.

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [System Architecture Overview](#system-architecture-overview)
3. [Frontend Architecture](#frontend-architecture)
4. [Backend Architecture](#backend-architecture)
5. [AI Agent Architecture (Maria Puspa)](#ai-agent-architecture-maria-puspa)
6. [Database Architecture](#database-architecture)
7. [Security Architecture](#security-architecture)
8. [Telegram Bot Architecture](#telegram-bot-architecture)
9. [Deployment Architecture](#deployment-architecture)
10. [Error Handling & Resilience](#error-handling--resilience)
11. [Performance Considerations](#performance-considerations)
12. [Directory Structure](#directory-structure)

---

## Technology Stack

| Layer | Technology | Version | Notes |
|-------|-----------|---------|-------|
| **Framework** | Next.js (App Router, Turbopack) | 16.1.x | Standalone output for serverless |
| **Language** | TypeScript | 5.x | Strict mode, ES2022 target |
| **Styling** | Tailwind CSS 4 + shadcn/ui | 4.x / New York style | Radix UI primitives, CSS variables |
| **Database** | Prisma ORM + PostgreSQL (managed) | 6.11.x | Connection pooling, Supabase |
| **State Management** | Zustand 5 + persist middleware | 5.x | localStorage persistence |
| **AI Engine** | OpenRouter API (OpenAI-compatible) | — | Key rotation, SSE streaming |
| **AI SDK** | z-ai-web-dev-sdk | 0.0.17+ | Web search & page reading tools |
| **Runtime** | Bun | 1.3.x+ | Package manager + runtime |
| **Charts** | Recharts | 2.15.x | Dashboard visualisations |
| **Tables** | TanStack React Table | 8.21.x | Data grid with sorting/filtering |
| **Forms** | React Hook Form + Zod | 7.x / 4.x | Schema validation |
| **3D** | Three.js + @react-three/fiber + @react-three/drei | 0.184.x / 9.x / 10.x | Maria 3D character rendering (VRM) |
| **Auth** | Supabase Auth | — | SSR + browser client via @supabase/ssr |
| **Deployment** | Vercel (primary, no VPS) | — | Serverless web/API |
| **Telegram Bot** | Hosted worker (Render/Railway/Fly.io) | — | Long-polling, allowlist-based |

### Key Dependencies

```
@prisma/client       — ORM & database access
@supabase/supabase-js — Supabase client (browser + SSR)
@supabase/ssr        — SSR middleware for Supabase auth
zustand              — Client-side state (app + AI chat)
src/lib/openrouter.ts — Internal OpenRouter client (OpenAI-compatible)
z-ai-web-dev-sdk     — Web search & page reader for RAG tools
@pixiv/three-vrm     — VRM model loading for Maria 3D character
recharts             — Charting library
@tanstack/react-query — Server state (TanStack React Query 5)
@tanstack/react-table — Advanced data tables
react-hook-form      — Form state management
zod                  — Runtime schema validation
next-themes          — Dark/light mode
sonner               — Toast notifications
framer-motion        — Animations
lucide-react         — Icon library
leaflet              — Interactive maps (Sedekah Jumaat)
react-leaflet        — React bindings for Leaflet
@mdxeditor/editor    — Rich text / MDX editing
sharp                — Image processing
ogl                  — WebGL rendering utilities
uuid                 — UUID generation
three                — 3D rendering (Maria VRM model)
```

---

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                             │
│  ┌───────────────┐  ┌─────────────────┐  ┌──────────────────┐  │
│  │   Web App      │  │  Telegram Bot   │  │   Future:        │  │
│  │   (Next.js     │  │  (@MariaPuspa   │  │   Mobile App     │  │
│  │    SPA)        │  │   Bot)          │  │                  │  │
│  └───────┬────────┘  └───────┬─────────┘  └──────────────────┘  │
└──────────┼────────────────────┼──────────────────────────────────┘
           │                    │
           │ SSE/JSON           │ JSON
           ▼                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                     API LAYER (Next.js)                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  /api/v1/ai (SSE)          /api/v1/ai/telegram (JSON)    │  │
│  │  /api/v1/members            /api/v1/cases                 │  │
│  │  /api/v1/donations          /api/v1/donors                │  │
│  │  /api/v1/disbursements      /api/v1/programmes            │  │
│  │  /api/v1/volunteers         /api/v1/compliance            │  │
│  │  /api/v1/ekyc               /api/v1/documents             │  │
│  │  /api/v1/activities         /api/v1/dashboard             │  │
│  │  /api/v1/reports                                         │  │
│  └───────────────────────────────────────────────────────────┘  │
└────────────────────────────┬────────────────────────────────────┘
                             │
             ┌───────────────┼───────────────────┐
             ▼               ▼                   ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│  Maria Puspa     │ │    Prisma        │ │   OpenRouter     │
│  Runtime         │ │    PostgreSQL DB │ │   API            │
│                  │ │                  │ │                  │
│  • Memory        │ │  • 26 Models     │ │  • hy3-preview   │
│  • Tools (22)    │ │  • PII Masking   │ │  • Key Rotation  │
│  • RBAC          │ │  • Connection    │ │  • SSE Streaming  │
│  • RAG           │ │    Pooling       │ │  • Tool Calling   │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

### Data Flow Summary

1. **Web App** sends `POST /api/v1/ai` with conversation history → receives SSE stream
2. **Telegram Bot** sends `POST /api/v1/ai/telegram` with single message → receives JSON
3. **REST API** endpoints query Prisma directly → return JSON with aggregated stats
4. **AI Runtime** orchestrates: memory retrieval → tool execution → OpenRouter streaming → memory persistence

---

## Frontend Architecture

### SPA Architecture

PUSPA V5 uses a **single-page application** model with NO Next.js page routing. All navigation is controlled by the Zustand store — there is exactly one route (`/`) and the `ViewRenderer` component dynamically loads modules based on `currentView` state.

```
layout.tsx (root — server component)
└── page.tsx (SPA shell — client component)
    ├── QueryProvider (TanStack React Query)
    ├── SidebarProvider
    │   ├── AppSidebar (navigation sidebar)
    │   └── SidebarInset
    │       ├── AppHeader (top bar with search, user menu)
    │       ├── ViewRenderer (dynamic module loader)
    │       └── AiChatPanel (Maria Puspa slide-over panel)
    └── ThemeProvider + Toaster (sonner)
```

### Component Tree Detail

```
<RootLayout>
  <html lang="ms" suppressHydrationWarning>
    <body>
      <ThemeProvider>           ← dark/light/system themes
        <Home />                ← SPA shell (client component)
          <QueryProvider>      ← TanStack React Query context
            <SidebarProvider>     ← shadcn sidebar context
              <AppSidebar />      ← navigation with role-filtered links
              <SidebarInset>     ← main content area
                <AppHeader />     ← breadcrumb, search, user avatar
                <main>
                  <ViewRenderer />  ← lazy-loaded module renderer
                </main>
              </SidebarInset>
              <AiChatPanel />    ← Maria Puspa chat (resizable)
            </SidebarProvider>
          </QueryProvider>
        <Toaster />            ← sonner toast notifications
      </ThemeProvider>
    </body>
  </html>
</RootLayout>
```

### State Management

#### App Store (`src/lib/store.ts`)

Persisted to `localStorage` via `zustand/middleware/persist`. Key: `puspa-app-store`.

| State Key | Type | Default | Persisted |
|-----------|------|---------|-----------|
| `currentView` | `ViewId` (23 options) | `'dashboard'` | Yes |
| `aiChatOpen` | `boolean` | `false` | No |
| `currentUser` | `{ id, name, email, role, imageUrl }` | Admin PUSPA (admin) | Yes |
| `searchQuery` | `string` | `''` | No |

```typescript
// Only these fields survive page reload
partialize: (state) => ({
  currentView: state.currentView,
  currentUser: state.currentUser,
})
```

#### AI Chat Store (`src/stores/hermes-store.ts`)

Session-only (NOT persisted). Manages the Maria Puspa chat experience.

| State Key | Type | Purpose |
|-----------|------|---------|
| `messages` | `MariaPuspaMessage[]` | Full conversation with streaming support |
| `isStreaming` | `boolean` | Whether AI is currently responding |
| `modelName` | `string` | Current model identifier |
| `toolCalls` | `ToolCallLog[]` | Log of tool calls with status tracking |
| `lastError` | `string \| null` | Last error message |
| `sendMessage()` | `function` | Triggers SSE fetch to `/api/v1/ai` |

Welcome message: `"Hai, saya Maria Puspa. AI Assistant PUSPA. Apa yang boleh saya bantu?"`

#### Maria Character Store (`src/stores/maria-character-store.ts`)

Shared live-character state for the global Maria widget, TTS, and lip-sync.

### Module Loading (`src/components/view-renderer.tsx`)

The `ViewRenderer` dynamically imports **23 modules** based on `currentView` from the Zustand store. Each module is loaded with `next/dynamic` and `ssr: false`:

| View ID | Module Path | Min Role |
|---------|-------------|----------|
| `dashboard` | `@/modules/dashboard/page` | staff |
| `members` | `@/modules/members/page` | staff |
| `cases` | `@/modules/cases/page` | staff |
| `programmes` | `@/modules/programmes/page` | staff |
| `donations` | `@/modules/donations/page` | staff |
| `donors` | `@/modules/donors/page` | staff |
| `disbursements` | `@/modules/disbursements/page` | staff |
| `volunteers` | `@/modules/volunteers/page` | staff |
| `activities` | `@/modules/activities/page` | staff |
| `documents` | `@/modules/documents/page` | staff |
| `settings` | `@/modules/settings/page` | staff |
| `asnafpreneur` | `@/modules/asnafpreneur/page` | staff |
| `sedekah-jumaat` | `@/modules/sedekah-jumaat/page` | staff |
| `docs` | `@/modules/docs/page` | staff |
| `carta-organisasi` | `@/modules/carta-organisasi/page` | staff |
| `institusi` | `@/modules/institusi/page` | staff |
| `permohonan-bantuan` | `@/modules/permohonan-bantuan/page` | staff |
| `compliance` | `@/modules/compliance/page` | admin |
| `reports` | `@/modules/reports/page` | admin |
| `ekyc` | `@/modules/ekyc/page` | admin |
| `tapsecure` | `@/modules/tapsecure/page` | admin |
| `admin` | `@/modules/admin/page` | admin |
| `ai` | `@/modules/ai/page` | developer |

When a user lacks the required role, an `AccessDenied` component renders with a "Kembali ke Dashboard" button.

### RBAC Implementation (`src/lib/access-control.ts`)

```typescript
const roleHierarchy: Record<Role, number> = {
  staff: 1,
  admin: 2,
  developer: 3,
}

// canAccessView checks: roleHierarchy[userRole] >= roleHierarchy[requiredRole]
```

This is a **cumulative permission model** — admin inherits all staff permissions, developer inherits all admin + staff permissions.

---

## Backend Architecture

### API Route Structure

All API routes live under `src/app/api/v1/` following Next.js App Router conventions:

```
src/app/api/v1/
├── ai/
│   ├── route.ts              # SSE streaming AI endpoint
│   └── telegram/route.ts     # JSON AI endpoint for Telegram
├── members/route.ts          # CRUD: Asnaf members
├── cases/route.ts            # CRUD: Welfare cases
├── donations/route.ts        # CRUD: Donation records
├── donors/route.ts           # CRUD: Donor profiles
├── disbursements/route.ts    # CRUD: Disbursement records
├── programmes/route.ts       # CRUD: Programmes
├── volunteers/route.ts       # CRUD: Volunteer records
├── compliance/route.ts       # CRUD: Compliance records
├── ekyc/route.ts             # CRUD: eKYC verifications
├── documents/route.ts        # CRUD: Document management
├── activities/route.ts       # CRUD: Activity/audit log
├── dashboard/route.ts        # Aggregated dashboard metrics
└── reports/route.ts          # Report generation
```

### API Route Pattern

Each REST endpoint follows a consistent pattern:

```
1. Parse request
   ├── GET  → URL query parameters
   └── POST → JSON request body

2. Database query via Prisma
   ├── findMany() with filters, pagination, ordering
   ├── aggregate() for stats
   ├── create() / update() for mutations
   └── Graceful fallback if DB unavailable

3. Data transformation
   ├── PII masking (IC numbers → ****XXXX)
   ├── Currency formatting (RM/MYR)
   ├── Date formatting (ISO 8601)
   └── Aggregation & grouping

4. JSON response
   ├── { data, stats?, total?, page? }
   └── Error: { error, message, status }
```

### Prisma Singleton (`src/lib/db.ts`)

```typescript
// Cached in development to prevent connection pool exhaustion
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({ log: ['query'] })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db
```

---

## AI Agent Architecture (Maria Puspa)

Maria Puspa is the AI assistant powering the PUSPA platform. It uses an agent-style architecture with tool calling, memory management, role-based access control, and a shared live-character layer (global widget + TTS + lip-sync state).

### High-Level Flow

```
User Input
    │
    ▼
hermes-store.ts (Zustand, client-side)
    │
    │  fetch POST /api/v1/ai
    │  Body: { messages, currentView }
    ▼
api/v1/ai/route.ts (Next.js server route)
    │
    ├─ isMariaPuspaConfigured() → checks OPENROUTER_API_KEY env vars
    │   └─ If not configured → 503 response with fallback message in Bahasa Melayu
    │
    ├─ runMariaPuspa() [hermes.runtime.ts]
    │   ├─ getConversationHistory(userId) → DB or in-memory
    │   ├─ Build system prompt + PUSPA knowledge base
    │   ├─ getToolsForRole(userRole) → 22 tools filtered by RBAC
    │   └─ saveMessage(userId, 'user', prompt)
    │
    ├─ createChatCompletionStream() → OpenRouter API
    │
    ├─ SSE Stream Processing
    │   ├─ Content deltas → stream to client as { type: 'content', content }
    │   └─ Tool calls → buffered until complete
    │       └─ executeToolCalls() → RBAC check → tool.execute()
    │           └─ Results sent as { type: 'tool_result', name, content }
    │
    ├─ Second OpenRouter call (with tool results appended)
    │   └─ Stream second response to client
    │
    └─ saveAssistantMessage(userId, content)
        └─ Send { type: 'done', model: 'maria-puspa', toolCalls }
```

### System Prompt Architecture

The system prompt is assembled from three components:

```
1. MARIA_PUSPA_SYSTEM_PROMPT (hardcoded in hermes.runtime.ts)
   ├── Identity: Name, role, personality traits
   ├── Core Rules: Mandatory RAG — must use tools before answering
   ├── Response Format: SHORT & SHARP (2-3 sentences max)
   ├── Project Editing: Full database + system access
   ├── Tool Usage Priority: DB tools → web search → system → admin
   └── Security Rules: IC masking, scope limiting, access checks

2. PUSPA_KNOWLEDGE_BASE (src/lib/puspa-knowledge.ts)
   ├── Registration & identity (PPM-024-10-05012022)
   ├── Leadership (publicly observed 2023)
   ├── Verified partners & funders
   ├── Verified programmes (with dates)
   ├── Self-reported metrics (with disclaimers)
   └── Transparency assessment

3. Current Module Context (dynamic per request)
   └── "The user is currently viewing: **{currentView}** module."
```

### Tool Registry

**22 tools** organised by domain, each with RBAC metadata:

| # | Tool Name | Category | Min Role | Description |
|---|-----------|----------|----------|-------------|
| 1 | `ping_system` | System | staff | Check system online status |
| 2 | `system_health` | System | staff | Comprehensive health check |
| 3 | `get_dashboard_overview` | Dashboard | staff | Key metrics across all modules |
| 4 | `get_member_list` | Members | staff | List asnaf members with filters |
| 5 | `get_member_stats` | Members | staff | Member statistics & breakdown |
| 6 | `get_active_cases` | Cases | staff | Active cases with status filter |
| 7 | `get_case_summary` | Cases | staff | Detailed case by ID |
| 8 | `get_recent_donations` | Donations | staff | Recent donation records |
| 9 | `get_donation_stats` | Donations | staff | Donation statistics by category |
| 10 | `get_active_programmes` | Programmes | staff | Active programmes list |
| 11 | `get_volunteer_list` | Volunteers | staff | List volunteers with filters |
| 12 | `get_volunteer_stats` | Volunteers | staff | Volunteer statistics |
| 13 | `update_volunteer_status` | Volunteers | staff | Update volunteer status |
| 14 | `get_asnafpreneur_stats` | Asnafpreneur | staff | Asnafpreneur programme statistics |
| 15 | `get_sedekah_masjid_locations` | Sedekah Jumaat | staff | Masjid locations with GPS coordinates |
| 16 | `get_compliance_status` | Compliance | staff | Compliance overview |
| 17 | `get_disbursement_summary` | Disbursements | staff | Disbursement totals by status |
| 18 | `web_search` | RAG | staff | Web search via z-ai-web-dev-sdk |
| 19 | `web_read` | RAG | staff | Web page content extraction |
| 20 | `delegate_task` | Delegation | staff | Sub-agent task delegation |
| 21 | `approve_disbursement` | Admin | admin | Approve pending disbursement |
| 22 | `delete_case` | Admin | admin | Delete case with audit reason |

#### Tool RBAC Enforcement

```typescript
// In executeTool() — server-side RBAC check using role hierarchy
const userLevel = roleHierarchy[userRole as Role] || 0
const minRequiredLevel = tool.requiredRole.length > 0
  ? Math.min(...tool.requiredRole.map(r => roleHierarchy[r as Role] || 1))
  : 1

if (userLevel < minRequiredLevel) {
  return { result: null, error: `Access denied: Role "${userRole}" cannot execute tool "${name}"` }
}
```

#### Database Fallback in Tools

Every database-dependent tool checks availability before executing:

```typescript
async function isDbReady(): Promise<boolean> { ... }

// In each tool:
if (!(await isDbReady())) return dbFallback('tool_name')
// dbFallback returns Bahasa Melayu message about unavailability
```

### Memory Layer (`src/lib/memory.ts`)

Dual-mode persistence with automatic fallback:

```
┌─────────────────────────────────────────┐
│          Memory Layer                    │
│                                          │
│  Primary: Prisma → AIMemory table        │
│  ├─ getConversationHistory(userId)       │
│  ├─ saveMessage(userId, role, content)   │
│  └─ clearConversationHistory(userId)     │
│                                          │
│  Fallback: In-memory Map                 │
│  ├─ Key: userId → MemoryMessage[]        │
│  ├─ Max: 50 messages per user            │
│  └─ Auto-trim when > 100 messages        │
│                                          │
│  DB availability check: cached boolean   │
│  └─ Checked once, then cached for life   │
└─────────────────────────────────────────┘
```

**MAX_HISTORY = 50** — prevents token overflow in AI conversations.

### SSE Stream Protocol

The client-server SSE protocol uses structured JSON events:

| Event Type | Direction | Payload | Purpose |
|------------|-----------|---------|---------|
| `content` | Server → Client | `{ type: 'content', content: string }` | Incremental text delta |
| `tool_calls` | Server → Client | `{ type: 'tool_calls', tools: string[] }` | Tool names being executed |
| `tool_result` | Server → Client | `{ type: 'tool_result', name: string, content: string }` | Individual tool result |
| `done` | Server → Client | `{ type: 'done', model: string, toolCalls: string[] }` | Stream complete |
| `error` | Server → Client | `{ type: 'error', content: string }` | Error occurred |

### Two-Call AI Pattern

When the AI requests tool calls, the system makes **two sequential OpenRouter API calls**:

```
Call 1: messages + tools → AI decides to call tools
         │
         ▼
    executeToolCalls() → results collected
         │
         ▼
Call 2: messages + [assistant_with_tool_calls] + [tool_results]
         │
         ▼
    AI generates final response based on tool results
```

This follows the OpenAI function calling protocol exactly.

---

## Database Architecture

### Prisma Configuration

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Production deployment uses PostgreSQL with connection pooling (via Supabase). The `DIRECT_URL` environment variable provides a direct connection for migrations.

### Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PUSPA V5 Data Model                             │
│                                                                          │
│  User ────────────────────────────────────────────────────┐             │
│    │ activities (1:N)                                      │             │
│    │ caseNotes (1:N)                                       │             │
│    │ aiConversations (1:N)                                 │             │
│    ▼                                                       │             │
│  Activity ◄──── Programme (N:1)                            │             │
│                                                          AiConversation │
│  Member ─────────────────────────────────────┐              │ (1:N)      │
│    │ householdMembers (1:N)                   │              ▼            │
│    │ cases (1:N)                              │         AiMessage        │
│    │ disbursements (1:N)                      │                          │
│    │ programmeEnrolments (1:N)                │  AIMemory (standalone)   │
│    │ documents (1:N)                          │   userId + createdAt     │
│    │ ekycRecords (1:N)                        │   index                  │
│    ▼                                          │                          │
│  HouseholdMember                              │  OpsWorkItem            │
│                                                │  AutomationJob          │
│  Case ─────────────────────────────┐          │                          │
│    │ notes (1:N) → CaseNote        │          │                          │
│    │ disbursements (1:N)           │          │                          │
│    │ documents (1:N)               │          │                          │
│    │ programmes (N:M) → CaseProgramme        │                          │
│    ▼                                │          │                          │
│  Disbursement ◄── Programme (N:1)  │          │                          │
│    └── member (N:1) → Member       │          │                          │
│                                     │          │                          │
│  Donor ── donations (1:N) ──► Donation       │                          │
│                                                          │              │
│  Programme ── beneficiaries (1:N) ──► ProgrammeBeneficiary│             │
│           ── disbursements (1:N)                          │             │
│           ── cases (N:M via CaseProgramme)                │             │
│           ── documents (1:N)                              │             │
│           ── activities (1:N)                             │             │
│                                                          │             │
│  Volunteer ── activities (1:N) ──► VolunteerActivity     │             │
│           ── certificates (1:N) ──► VolunteerCertificate │             │
│                                                          │             │
│  ComplianceRecord    EKYCVerification    Document        │             │
│                                                          │             │
│  Entrepreneur    OrganizationMember    Institution        │             │
│                                                          │             │
│  AidApplication (full aid application form)              │             │
└─────────────────────────────────────────────────────────────────────────┘
```

### 26 Prisma Models

#### Core (3 models)
| Model | Purpose | Key Fields |
|-------|---------|------------|
| `User` | System users | email (unique), role, active |
| `Member` | Asnaf members | icNumber (unique), asnafCategory, ekycStatus |
| `HouseholdMember` | Member household | relationship, monthlyIncome |

#### Operations (4 models)
| Model | Purpose | Key Fields |
|-------|---------|------------|
| `Case` | Welfare cases | caseNumber (unique), type, priority, status, riskIndicator |
| `CaseNote` | Case notes | type (note/action/decision/follow_up), authorId |
| `CaseProgramme` | Case-programme link | Composite junction table |
| `Programme` | Programmes | category, budget, spent, targetBeneficiaries |

#### Finance (3 models)
| Model | Purpose | Key Fields |
|-------|---------|------------|
| `Donor` | Donor profiles | type (individual/corporate/government) |
| `Donation` | Donation records | category (zakat/sadaqah/waqf/infaq), amount, shariahCompliant |
| `Disbursement` | Fund disbursements | status, paymentMethod, verifiedBy |

#### People (3 models)
| Model | Purpose | Key Fields |
|-------|---------|------------|
| `Volunteer` | Volunteers | skills, availability, totalHours |
| `VolunteerActivity` | Activity log | hours, role, status (logged/approved/rejected) |
| `VolunteerCertificate` | Certificates | title, certificateUrl |

#### Governance (4 models)
| Model | Purpose | Key Fields |
|-------|---------|------------|
| `ComplianceRecord` | Compliance tracking | category (rosm/lhdn/pdpa/internal/audit), status |
| `EKYCVerification` | Identity verification | ocrExtracted (JSON), faceMatchScore, riskLevel |
| `Document` | Document management | version, tags, polymorphic (member/case/programme) |
| `Activity` | Audit log | type, category, metadata (JSON) |

#### Asnafpreneur (1 model)
| Model | Purpose | Key Fields |
|-------|---------|------------|
| `Entrepreneur` | Asnafpreneur usahawan | name, category, initialCapital, status |

#### AI (3 models)
| Model | Purpose | Key Fields |
|-------|---------|------------|
| `AIMemory` | Conversation memory | userId, role, content, @@index([userId, createdAt]) |
| `AiConversation` | Conversation sessions | userId, title, model |
| `AiMessage` | Individual messages | toolCalls (JSON), toolResults (JSON), tokens |

#### DevOps (2 models)
| Model | Purpose | Key Fields |
|-------|---------|------------|
| `OpsWorkItem` | Dev task tracking | type (task/bug/improvement/automation), executionTrace (JSON) |
| `AutomationJob` | Scheduled jobs | type, schedule (cron), config (JSON), lastRunAt |

#### Organization (1 model)
| Model | Purpose | Key Fields |
|-------|---------|------------|
| `OrganizationMember` | Carta organisasi | name, role, category, position, order |

#### Institutions (1 model)
| Model | Purpose | Key Fields |
|-------|---------|------------|
| `Institution` | Rumah kebajikan, maahad tahfiz | name, type, address, contact |

#### Aid Application (1 model)
| Model | Purpose | Key Fields |
|-------|---------|------------|
| `AidApplication` | Borang permohonan bantuan lengkap | applicantName, applicantIC, dependents (JSON), applicantConsent |

### Fallback Strategy (Serverless)

When the database is unavailable (common on Vercel serverless):

| Component | Primary | Fallback |
|-----------|---------|----------|
| AI Memory | Prisma `AIMemory` table | In-memory `Map<string, MemoryMessage[]>` (50-msg limit) |
| AI Tools | Prisma queries | Bahasa Melayu fallback messages |
| Dashboard | Aggregated DB queries | Demo data with hardcoded values |
| DB Check | `db.$queryRaw\`SELECT 1\`` | Cached boolean, checked once |

---

## Security Architecture

### RBAC Levels

```
┌──────────────────────────────────────────────────────────┐
│                     RBAC Hierarchy                       │
│                                                          │
│  Level 3: developer                                      │
│  ├─ All admin modules                                    │
│  ├─ AI module (ai)                                       │
│  └─ All tool access (including admin-only tools)         │
│                                                          │
│  Level 2: admin                                          │
│  ├─ All staff modules                                    │
│  ├─ Compliance (compliance)                              │
│  ├─ Reports (reports)                                    │
│  ├─ eKYC (ekyc)                                         │
│  ├─ TapSecure (tapsecure)                                │
│  ├─ Admin panel (admin)                                  │
│  └─ Admin tools (approve_disbursement, delete_case)      │
│                                                          │
│  Level 1: staff                                          │
│  ├─ Dashboard, Members, Cases, Programmes                │
│  ├─ Donations, Donors, Disbursements                     │
│  ├─ Volunteers, Activities, Documents                    │
│  ├─ Asnafpreneur, Sedekah Jumaat, Docs                   │
│  ├─ Carta Organisasi, Institusi, Permohonan Bantuan      │
│  ├─ Settings                                             │
│  └─ Read-only tools + web search/RAG                     │
└──────────────────────────────────────────────────────────┘
```

### PII Protection

| Data Type | Protection | Implementation |
|-----------|-----------|----------------|
| IC Numbers | Masked to `****XXXX` | Enforced in AI tool responses + case summary queries |
| Case Details | No full IC exposure | AI tool responses strip sensitive fields |
| AI Memory | Content stored as-is | Tool response layer enforces masking before display |
| Household IC | Optional field | Not included in member list tool results |

### API Key Security

```
┌────────────────────────────────────────────────┐
│          OpenRouter Key Rotation                │
│                                                │
│  Keys: OPENROUTER_API_KEY (single key)         │
│  ├─ Configurable via environment variable      │
│  ├─ Round-robin on 429 (rate limit) errors     │
│  ├─ Round-robin on 5xx (server error)          │
│  └─ Logged: "[OpenRouter] Rotated to key N"    │
│                                                │
│  Storage: Environment variables only           │
│  ├─ .env excluded from git via .gitignore      │
│  └─ Vercel: Dashboard environment variables    │
└────────────────────────────────────────────────┘
```

### Input Validation

- **API routes**: JSON body parsing with type guards (`typeof` checks)
- **AI endpoint**: Validates message existence and type before processing
- **Tool parameters**: Type-checked via Zod schemas in `execute()` functions
- **Telegram bot**: Allowlist + admin-role guard + internal-token authentication

---

## Telegram Bot Architecture

```
┌────────────────────────────────────────────────────────────┐
│              Telegram Bot (Standalone Bun Process)          │
│  mini-services/telegram-bot/index.ts                       │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │ Long Polling  │  │  Allowlist   │  │  Session Mgmt    │ │
│  │ getUpdates()  │  │  Chat IDs    │  │  Per-chat Map    │ │
│  │ 30s timeout   │  │  from env    │  │  userId, role    │ │
│  └──────┬────────┘  └──────────────┘  └──────────────────┘ │
│         │                                                   │
│         ▼                                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Commands                                            │  │
│  │  /start   → Welcome message (Bahasa Melayu)          │  │
│  │  /help    → Command list                              │  │
│  │  /reset   → Clear session & conversation memory       │  │
│  │  /role    → staff for all; admin/developer limited to  │  │
│  │             TELEGRAM_ADMIN_CHAT_IDS                    │  │
│  │  /status  → Session info + system status              │  │
│  └──────────────────────────────────────────────────────┘  │
│         │                                                   │
│         ▼                                                   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  AI Bridge                                          │  │
│  │  Primary: POST /api/v1/ai/telegram (JSON)            │  │
│  │  ├─ Non-streaming for Telegram compatibility         │  │
│  │  └─ Returns: { content, model, toolCalls, success }  │  │
│  │                                                      │  │
│  │  Fallback: Parse SSE from /api/v1/ai                 │  │
│  │  └─ Accumulates content deltas into full response    │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

### Session Tracking

```typescript
interface UserSession {
  chatId: number          // Telegram chat ID
  userId: string          // "telegram-{telegramUserId}"
  firstName?: string      // From Telegram user object
  lastName?: string
  username?: string
  role: string            // Default: 'staff', changeable via /role
  lastActivity: Date
  messageCount: number
}
```

### Resilience Features

- **Auto-restart**: After 10+ consecutive poll errors, resets error counter
- **Health check**: Logs uptime, session count, allowlist status every 5 minutes
- **Message splitting**: Long responses split at paragraph/sentence boundaries (max 4000 chars)
- **Markdown fallback**: If Telegram can't parse Markdown, re-sends as plain text
- **Typing indicator**: Sends `typing` action every 4 seconds while waiting for AI response
- **Pending update skip**: On startup, skips previously queued updates to avoid reprocessing

---

## Deployment Architecture

### Zero-VPS Reference Architecture (Primary)

```
┌──────────────────────────────────────────────────┐
│  Vercel Deployment (No VPS)                       │
│                                                   │
│  Build: next build                                │
│  ├─ Static: main page HTML/CSS/JS                 │
│  └─ Serverless: API routes as functions           │
│                                                   │
│  Environment Variables (via Dashboard):           │
│  ├─ OPENROUTER_API_KEY                            │
│  ├─ OPENROUTER_MODEL                              │
│  ├─ DATABASE_URL (managed PostgreSQL)             │
│  ├─ DIRECT_URL (direct connection for migrations) │
│  ├─ NEXT_PUBLIC_SUPABASE_URL                      │
│  ├─ NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY          │
│  ├─ SUPABASE_SERVICE_ROLE_KEY                     │
│  ├─ HERMES_RUNTIME_MODE                           │
│  ├─ HERMES_CLI_TIMEOUT_MS                         │
│  └─ PUSPA_INTERNAL_API_TOKEN                      │
└──────────────────────────────────────────────────┘
```

### Telegram Bot Worker (No VPS)

```
┌──────────────────────────────────────────────────┐
│  Managed Worker Deployment                        │
│                                                   │
│  Runtime: bun --hot index.ts / bun index.ts       │
│  Host: Render / Railway / Fly.io                  │
│                                                   │
│  Required env:                                    │
│  ├─ TELEGRAM_BOT_TOKEN                            │
│  ├─ PUSPA_API_URL (Vercel URL)                    │
│  ├─ ALLOWED_CHAT_IDS                              │
│  ├─ TELEGRAM_ADMIN_CHAT_IDS                       │
│  └─ PUSPA_INTERNAL_API_TOKEN                      │
│                                                   │
│  Security:                                        │
│  └─ Sends x-puspa-internal-token to API           │
└──────────────────────────────────────────────────┘
```

### Local Development

```
┌──────────────────────────────────────────────────┐
│  Local Development (Bun)                          │
│                                                   │
│  Commands:                                        │
│  ├─ bun run dev       → Next.js dev server :3000  │
│  ├─ bun run db:push   → Push schema to PostgreSQL │
│  ├─ bun run db:generate → Generate Prisma client  │
│  └─ cd mini-services/telegram-bot && bun run dev  │
│                                                   │
│  Database: PostgreSQL (local or Supabase)         │
│  Telegram: Separate Bun process                   │
│  Supervisor: supervisor.sh / start-services.sh    │
└──────────────────────────────────────────────────┘
```

### Next.js Configuration

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  output: "standalone",           // Self-contained server bundle
  // Keep type errors blocking for safer production releases
  reactStrictMode: false,         // Relaxed for compatibility
}
```

---

## Error Handling & Resilience

### Error Handling Matrix

| Scenario | Detection | Response | User Message |
|----------|-----------|----------|-------------|
| **DB Unavailable** | `isDbReady()` / `checkDbAvailable()` | Fallback to in-memory/demo data | "Pangkalan data tidak tersedia sekarang" |
| **API Key Rate Limit** | HTTP 429 from OpenRouter | Rotate to next key | Transparent (automatic) |
| **API Server Error** | HTTP 5xx from OpenRouter | Rotate to next key + retry | Transparent (automatic) |
| **No API Keys** | `isConfigured()` returns false | 503 response | "Maria Puspa tidak dikonfigurasi" |
| **Stream Interruption** | Error in SSE reader | Error event to client | "Stream interrupted. Please try again." |
| **Tool Execution Failure** | try/catch in `executeTool()` | Error result in tool response | "Tool execution failed: {message}" |
| **RBAC Denial** | Role check in `executeTool()` | Error result | "Access denied: Role X cannot execute tool Y" |
| **Invalid Tool Call** | Tool not found in registry | Error result | "Tool not found" |
| **Telegram Poll Error** | Consecutive failures > 10 | Auto-restart polling | Transparent |
| **Module Not Found** | Missing entry in `moduleMap` | "Module not found" message | Visible in ViewRenderer |
| **Access Denied** | `canAccessView()` returns false | AccessDenied component | "Akses Ditolak" |

### AI Error Response Pattern

All AI error messages are in **Bahasa Melayu**:

```
"Maaf, Maria Puspa mengalami masalah: {error}. Sila cuba lagi nanti."
"Maaf, terdapat ralat: {error}. Sila cuba lagi."
"Pangkalan data tidak tersedia sekarang. Sila cuba lagi nanti."
```

---

## Performance Considerations

### Optimisation Strategies

| Strategy | Implementation | Impact |
|----------|---------------|--------|
| **Standalone Output** | `output: "standalone"` in next.config.ts | Smaller deployment bundle, no node_modules needed |
| **Lazy Module Loading** | `next/dynamic` with `ssr: false` for all 23 modules | Only loaded module's JS is fetched |
| **SSE Streaming** | Real-time content deltas via ReadableStream | Users see AI responses immediately, no wait for completion |
| **Key Rotation** | OpenRouter key rotation on errors | Distributes API rate limits |
| **Max History 50** | `MAX_HISTORY` in memory layer | Prevents token overflow in AI conversations |
| **Prisma Singleton** | Cached in `globalThis` during development | Prevents connection pool exhaustion from hot reloading |
| **DB Availability Cache** | `dbAvailable` boolean, checked once | Avoids repeated failed connection attempts |
| **In-Memory Fallback** | Map-based storage when DB unavailable | System remains functional without database |
| **Tool Result Caching** | DB queries use Prisma's built-in optimisation | Efficient aggregate/groupBy operations |
| **Parallel Queries** | `Promise.all()` for dashboard & stats | Multiple DB queries run concurrently |

### Bundle Considerations

- **shadcn/ui**: Tree-shakable — only imported components are bundled
- **Radix UI**: Individual packages — no full Radix import
- **Recharts**: Only loaded in dashboard/reports modules (lazy)
- **MDXEditor**: Heavy editor loaded only in modules that need it
- **Three.js / VRM**: Heavy 3D libraries loaded only for Maria character rendering

---

## Directory Structure

```
my-project/
├── prisma/
│   └── schema.prisma              # 26 Prisma models on PostgreSQL
├── public/                        # Static assets
│   ├── puspa-logo*.png            # Brand logos (multiple variants)
│   ├── maria-puspa-*.png          # Maria character images
│   ├── manifest.json              # PWA manifest
│   ├── sw.js                      # Service worker
│   ├── robots.txt
│   └── ...
├── docs/
│   ├── PUSPA_DATA_EXTRACTION.md
│   └── USER_GUIDELINES.md
├── hermes/                        # Hermes Agent runtime
│   ├── config.yaml                # Hermes configuration
│   ├── SOUL.md                    # Agent identity
│   ├── USER.md                    # User profile
│   ├── MEMORY.md                  # Agent memory
│   ├── state.db                   # Agent state database
│   ├── kanban.db                  # Task tracking
│   ├── gateway_state.json         # Gateway state
│   ├── channel_directory.json     # Channel directory
│   └── skills/                    # Hermes skill definitions
│       ├── apple/                 # Apple integrations
│       ├── autonomous-ai-agents/  # AI agent skills
│       ├── creative/              # Creative skills (comics, infographics, etc.)
│       └── ...
├── mini-services/
│   └── telegram-bot/
│       ├── index.ts               # Standalone Telegram bot (Bun)
│       ├── package.json
│       ├── RUN_ME.bat             # Windows launcher
│       ├── server.py              # Python server (SadTalker integration)
│       ├── maria.jpg              # Bot profile image
│       ├── maria-puspa-*.png      # Bot profile images
│       ├── SadTalker/             # SadTalker face animation
│       └── *.wav                  # Temporary audio files
├── scripts/
│   ├── hermes-agent.ps1           # Hermes agent launcher (PowerShell)
│   ├── hermes-agent.py            # Hermes agent launcher (Python)
│   └── maria-smoke.js             # Maria smoke test
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (ThemeProvider, Toaster)
│   │   ├── page.tsx               # SPA shell (SidebarProvider)
│   │   ├── globals.css            # Tailwind + CSS variables
│   │   └── api/v1/                # API routes
│   │       ├── ai/route.ts        # SSE streaming AI endpoint
│   │       ├── ai/telegram/route.ts  # JSON AI endpoint
│   │       ├── members/route.ts
│   │       ├── cases/route.ts
│   │       ├── donations/route.ts
│   │       ├── donors/route.ts
│   │       ├── disbursements/route.ts
│   │       ├── programmes/route.ts
│   │       ├── volunteers/route.ts
│   │       ├── compliance/route.ts
│   │       ├── ekyc/route.ts
│   │       ├── documents/route.ts
│   │       ├── activities/route.ts
│   │       ├── dashboard/route.ts
│   │       └── reports/route.ts
│   ├── agents/
│   │   └── runtime/
│   │       └── hermes.runtime.ts  # Maria Puspa AI runtime engine
│   ├── components/
│   │   ├── app-sidebar.tsx        # Navigation sidebar
│   │   ├── app-header.tsx         # Top bar with search/user
│   │   ├── view-renderer.tsx      # Dynamic module loader
│   │   ├── ai-chat-panel.tsx      # Maria Puspa chat panel
│   │   ├── query-provider.tsx     # TanStack React Query provider
│   │   ├── auth-provider.tsx      # Supabase Auth provider
│   │   ├── user-avatar.tsx        # User avatar component
│   │   ├── mobile-card.tsx        # Mobile card component
│   │   ├── Aurora.tsx             # Aurora background effect
│   │   ├── puspa-logo.tsx         # Animated logo component
│   │   ├── puspa-loading-spinner.tsx
│   │   ├── theme-provider.tsx     # Dark/light mode provider
│   │   ├── maria/                 # Maria character UI components
│   │   │   ├── MariaAvatarUnified.tsx      # Unified avatar (2D/3D)
│   │   │   ├── MariaVRMModel.tsx           # 3D VRM model renderer
│   │   │   ├── MariaVRMModel.module.css    # VRM model styles
│   │   │   ├── maria-vrm-blendshapes.tsx   # VRM blendshape controls
│   │   │   ├── maria-floating-widget.tsx   # Global floating widget
│   │   │   └── maria-character-renderer.tsx # Character renderer
│   │   └── ui/                    # shadcn/ui components (30+)
│   ├── hooks/
│   │   ├── use-toast.ts           # Toast notifications hook
│   │   ├── use-mobile.ts          # Mobile detection hook
│   │   └── use-realtime.ts        # Realtime subscription hook
│   ├── lib/
│   │   ├── store.ts               # App Zustand store (persisted)
│   │   ├── access-control.ts      # RBAC logic
│   │   ├── db.ts                  # Prisma singleton
│   │   ├── memory.ts              # AI memory with fallback
│   │   ├── openrouter.ts          # OpenRouter client + key rotation
│   │   ├── puspa-knowledge.ts     # RAG knowledge base
│   │   ├── puspa-brand-assets.ts  # Brand identity constants
│   │   ├── maria-avatar.ts        # Maria avatar path constants
│   │   ├── maria-emotion-map.ts   # Context-to-emotion mapper
│   │   ├── maria-lipsync.ts       # Lip-sync controller
│   │   ├── maria-tts.ts           # Browser TTS engine (female-voice priority)
│   │   ├── maria-quick-prompts.ts # Quick prompt templates
│   │   ├── ai-cache.ts            # AI response caching
│   │   ├── ai-rate-limit.ts       # AI rate limiting
│   │   ├── rate-limit.ts          # General rate limiting
│   │   ├── audit.ts               # Audit logging utilities
│   │   ├── validation.ts          # Input validation utilities
│   │   ├── sentry.ts              # Sentry error tracking
│   │   ├── auth.ts                # Supabase Auth helpers
│   │   ├── client.ts              # Supabase browser client
│   │   ├── server.ts              # Supabase SSR client
│   │   ├── api-utils.ts           # API utility functions
│   │   ├── case-intelligence.ts   # Case intelligence utilities
│   │   ├── domain.ts              # Domain constants
│   │   ├── donor-sync.ts          # Donor synchronisation
│   │   ├── sequence.ts            # Sequence utilities
│   │   └── utils.ts               # cn() + helpers
│   ├── stores/
│   │   ├── hermes-store.ts        # AI chat Zustand store (session-only)
│   │   └── maria-character-store.ts # Shared live character state
│   ├── modules/                   # Lazy-loaded view modules (23)
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
│   │   └── permohonan-bantuan/page.tsx
│   ├── tools/
│   │   ├── index.ts               # Tool registry (18 core + 4 extended)
│   │   ├── donations.ts           # Donation-specific tool queries
│   │   ├── cases.ts               # Case-specific tool queries
│   │   ├── web-tools.ts           # web_search, web_read, delegate_task, system_health
│   │   └── chrome-devtools.spec.ts # Chrome DevTools MCP spec
│   └── types/
│       └── index.ts               # Shared TypeScript types
├── next.config.ts                  # Next.js runtime/build configuration
├── tailwind.config.ts              # Tailwind CSS 4 config
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies & scripts
├── Caddyfile                       # Reverse proxy config
├── supervisor.sh                   # Process supervisor script
├── start-services.sh               # Service launcher script
└── run-telegram.sh                 # Telegram bot launcher
```

---

## Appendix: Environment Variables

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `DATABASE_URL` | Yes | — | PostgreSQL connection string (pooled) |
| `DIRECT_URL` | Yes | — | Direct PostgreSQL connection for migrations |
| `OPENROUTER_API_KEY` | Yes | — | OpenRouter API key |
| `OPENROUTER_BASE_URL` | No | `https://openrouter.ai/api/v1` | API base URL |
| `OPENROUTER_MODEL` | No | `tencent/hy3-preview:free` | AI model identifier |
| `OPENROUTER_APP_NAME` | No | `PUSPA V5` | App attribution header |
| `OPENROUTER_APP_URL` | No | `http://localhost:3000` | App URL header |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | — | Supabase project URL for browser + SSR client |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes | — | Supabase publishable API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | — | Supabase service role key (server-side only) |
| `HERMES_RUNTIME_MODE` | No | `cli` | Hermes runtime mode (`cli` or `gateway`) |
| `HERMES_CLI_TIMEOUT_MS` | No | `45000` | Hermes CLI timeout in milliseconds |
| `NEXT_PUBLIC_MARIA_WIDGET_ENABLED` | No | `true` | Toggle global Maria floating widget |
| `NEXT_PUBLIC_MARIA_TTS_ENABLED` | No | `true` | Toggle Maria auto-voice playback |
| `NEXT_PUBLIC_MARIA_LIPSYNC_ENABLED` | No | `true` | Toggle lip-sync animation engine |
| `TELEGRAM_BOT_TOKEN` | Telegram only | — | Telegram Bot API token |
| `PUSPA_API_URL` | Telegram only | `http://localhost:3000` | PUSPA API base URL |
| `ALLOWED_CHAT_IDS` | Telegram only | (empty = open) | Comma-separated allowed chat IDs |
| `TELEGRAM_ADMIN_CHAT_IDS` | Telegram only | (empty) | Chat IDs allowed to set admin/developer role |
| `PUSPA_INTERNAL_API_TOKEN` | Telegram + API | — | Shared secret for `/api/v1/ai/telegram` |
| `GATEWAY_ALLOW_ALL_USERS` | No | `false` | Allow all users to access gateway |
| `WHATSAPP_ENABLED` | No | `true` | Enable WhatsApp integration |
| `PUSPA_REQUIRE_AUTH_FOR_AI` | No | `true` | Require authentication for AI endpoint |
| `PUSPA_AI_RATE_WINDOW_MS` | No | `60000` | Rate limit window in milliseconds |
| `PUSPA_AI_RATE_ANONYMOUS_MAX` | No | `15` | Max anonymous requests per window |
| `PUSPA_AI_RATE_AUTH_MAX` | No | `45` | Max authenticated requests per window |
| `NODE_ENV` | Auto | `development` | Environment mode |

---

*Document generated for PUSPA V5 — Pertubuhan Urus Peduli Asnaf (PPM-024-10-05012022)*
*Last updated: 2026-05-08*
