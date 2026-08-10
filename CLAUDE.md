# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**PUSPA V5** — Pertubuhan Urus Peduli Asnaf (PPM-024-10-05012022). A Malaysian NGO management platform with 23 integrated modules and an AI assistant named **Maria Puspa**. Built with Next.js 16 (App Router), TypeScript 5, Tailwind CSS 4, Prisma ORM, Zustand, and OpenRouter AI.

The app is a **single-page application** — no Next.js page routing. All navigation is controlled by a Zustand store (`src/lib/store.ts`) with a `ViewRenderer` that lazy-loads modules via `next/dynamic`.

## Commands

```bash
# Development
bun run dev              # Start Next.js dev server on port 3000
bun run build            # Production build (prisma generate → next build → standalone output copy)
bun run start            # Start production server (bun .next/standalone/server.js)

# Quality
bun run lint             # ESLint
bun run typecheck        # tsc --noEmit
bun run verify:release   # lint + typecheck + build (full release gate)

# Database (Prisma)
bun run db:push          # Push schema to database
bun run db:generate      # Generate Prisma client
bun run db:migrate       # Run Prisma migrations
bun run db:reset         # Reset database (development ONLY)

# Database (MCP available)
# Use mcp__plugin_prisma_Prisma-Local__migrate-dev for migrations with names
# Use mcp__plugin_prisma_Prisma-Local__migrate-reset for reset (dev ONLY)

# AI / Hermes
npm run hermes                     # Interactive Hermes chat
npm run hermes:setup               # One-time setup wizard
npm run hermes:gateway             # Run messaging gateway
npm run hermes:dashboard           # Web dashboard (TUI)
npm run smoke:maria                # Smoke-check Maria widget/TTS/lip-sync

# Telegram Bot (separate process)
cd mini-services/telegram-bot && bun run dev
```

## Architecture

### Monorepo-Style Two-Process Architecture

1. **Main Web App** — Next.js 16 (port 3000). Vercel-deployed. Handles UI, API routes, and AI runtime.
2. **Telegram Bot** — Standalone Bun process in `mini-services/telegram-bot/`. Long-polling, calls the main app's REST API.

### Frontend SPA Pattern

- Single route (`/`). `ViewRenderer` (`src/components/view-renderer.tsx`) maps `currentView` Zustand state to lazy-loaded modules.
- 23 modules in `src/modules/*/page.tsx`. New modules must be added to the `moduleMap` in `view-renderer.tsx`.
- State: `useAppStore` in `src/lib/store.ts` (persisted to localStorage). Stores `currentView`, `currentUser`, `aiChatOpen`.
- RBAC: `src/lib/access-control.ts`. Three roles: `staff` (1) < `admin` (2) < `developer` (3). Higher inherits lower.

### Backend API

- All routes under `src/app/api/v1/` (Next.js App Router).
- Each module has a `route.ts` following: parse → Prisma query → transform (PII mask, currency format) → JSON response.
- Database: Prisma singleton in `src/lib/db.ts`. Checks availability with 60s TTL cache. Falls back to in-memory/demo data on Vercel serverless.

### AI Engine (Maria Puspa)

- Runtime: `src/agents/runtime/hermes.runtime.ts` — orchestrates memory → tools → OpenRouter streaming.
- 22 tools in `src/tools/` (18 in `index.ts` + 4 in `web-tools.ts`). Each tool has RBAC (`requiredRole`). Two tools (`approve_disbursement`, `delete_case`) are admin-only.
- Streaming: SSE protocol via `src/app/api/v1/ai/route.ts`. Two-call pattern when tools are invoked.
- Telegram: `src/app/api/v1/ai/telegram/route.ts` — non-streaming JSON endpoint.
- OpenRouter client: `src/lib/openrouter.ts` — supports up to 4 API keys with round-robin rotation on 429/5xx.
- Memory: `src/lib/memory.ts` — dual-mode (Prisma AIMemory table + in-memory fallback). Max 50 messages.
- Knowledge base: `src/lib/puspa-knowledge.ts` — PUSPA org facts injected into system prompt.

### Database

- 26 Prisma models in `prisma/schema.prisma` (PostgreSQL provider). Key enum values:
  - Member: `asnafCategory` ∈ {fakir, miskin, amil, muallaf, gharimin, riqab, ibnu_sabil, fisabilillah}
  - Case: `status` ∈ {draft → intake → verification → assessment → approval → disbursement → follow_up → closed/rejected}
  - Donation: `category` ∈ {zakat, sadaqah, waqf, infaq, general}

## Environment Variables

Required in `.env.local` (see `.env.example` for full template):

```
OPENROUTER_API_KEY_1=sk-or-v1-...
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

## Key Conventions

- **Bun** as package manager and runtime (not npm/yarn for dev).
- **No `console.log`** in production code. Use proper logging.
- IC numbers always masked to `****XXXX` in tool responses and UI.
- Currency formatted as RM/MYR.
- AI responses: max 2-3 sentences, Bahasa Melayu primary, no emojis, no filler.
- All AI error messages in Bahasa Melayu.
- `metadata` fields on Prisma models must be `JSON.stringify()` before writing (field is `String?` in schema).
- `Activity.create` requires `title`, `category`, `type`, `description` fields (no `module` field).
- New modules: add to `moduleMap` in `view-renderer.tsx` with correct role annotation, and add the `ViewId` to the type in `src/lib/store.ts`.

## File Map

```
src/
├── agents/runtime/hermes.runtime.ts   # AI orchestration
├── app/
│   ├── api/v1/ai/route.ts            # SSE streaming AI endpoint
│   ├── api/v1/ai/telegram/route.ts   # Telegram AI endpoint
│   ├── api/v1/*/route.ts             # Module CRUD endpoints (13 routes)
│   ├── layout.tsx                    # Root layout
│   └── page.tsx                      # SPA shell
├── components/
│   ├── view-renderer.tsx             # Lazy module loader (central router)
│   ├── ai-chat-panel.tsx             # Maria Puspa chat UI
│   ├── maria/                        # Maria character components (VRM, avatar, TTS, lip-sync)
│   ├── ui/                           # shadcn/ui (New York style)
│   └── auth-provider.tsx             # Supabase auth context
├── lib/
│   ├── store.ts                      # App Zustand store (persisted)
│   ├── access-control.ts             # RBAC logic
│   ├── db.ts                         # Prisma singleton
│   ├── memory.ts                     # AI memory (dual-mode)
│   ├── openrouter.ts                 # OpenRouter client (key rotation)
│   ├── puspa-knowledge.ts            # PUSPA knowledge base for RAG
│   ├── ai-cache.ts                   # AI response caching
│   ├── rate-limit.ts                 # Rate limiting
│   ├── audit.ts                      # Audit logging
│   └── validation.ts                 # Zod schemas
├── modules/*/page.tsx                # 23 lazy-loaded view pages
├── stores/hermes-store.ts            # AI chat Zustand store (session-only)
├── tools/
│   ├── index.ts                      # Tool registry (18 core tools)
│   ├── donations.ts                  # Donation tool queries
│   ├── cases.ts                      # Case tool queries
│   └── web-tools.ts                  # Web search/read/delegate
prisma/schema.prisma                  # 26-model database schema
mini-services/telegram-bot/index.ts   # Long-polling Telegram bot
```
