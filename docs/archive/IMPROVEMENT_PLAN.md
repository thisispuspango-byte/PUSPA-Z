# PUSPA-Z Audit Report — 2026-08-10

**Project:** `G:\PUSPA-Z\PUSPA-Z` (PUSPA V5.3 — Pertubuhan Urus Peduli Asnaf, NGO management platform)
**Method:** codebase-audit skill (read-only), live inspection, tsc + eslint verification
**Status:** `tsc --noEmit` ✅ PASS 0 errors · `eslint src/` ✅ PASS 0 errors

---

## Executive Summary

| Dimension | Score | Verdict |
|-----------|-------|---------|
| Dokumentasi | **9/10** | Exceptional — 5,718 lines docs (AGENTS 719, ARCHITECTURE 1,131, DESIGN 1,297, PRD 1,079) |
| Arsitektur | **6/10** | Solid domain split (23 modules) tapi monster files + 30 agent dirs + dual lockfile |
| Keselamatan | **4/10** | 🔴 **2 CRITICAL unauth endpoints**, no security headers, minimal rate limiting |
| Testing | **2/10** | 🔴 Zero tests untuk app code (27 models, 20 routes, 23 modules) |
| Kemasan | **6/10** | 4.6GB nested SadTalker repo, dual lockfiles, stale env backups |
| Operasi | **7/10** | CI auto-deploy Vercel ✅, docs current; vercel CLI unpinned |
| Frontend | **6/10** | shadcn quality ✅, tapi docs/page.tsx 2,006 baris |

**Overall: 5.7/10** — Platform matang dari segi domain & docs, kritikal dari segi security & testing.

---

## 1. 🔍 Discovery Facts

| Metric | Value |
|--------|-------|
| Total src lines | 32,860 |
| Modules | 23 |
| Components | 65 |
| API routes | 20 (17 v1 + organization/institutions/aid-applications/health) |
| Prisma models | 27 |
| Tracked files | 669 |
| Git pack size | 12.28 MiB |
| Build artifacts in git | 0 (.next, tsbuildinfo, structure.txt all ignored ✅) |

**Stack:** Next.js 16 (App Router) + React 19 + Tailwind 4 + shadcn/ui + Prisma 6 + Supabase (SSR auth) + Three.js/VRM (Maria 3D avatar) + OpenRouter (AI).

---

## 2. 🔴 CRITICAL — Security Findings

### C1. `/api/organization` — TIADA AUTH (GET + POST)
`src/app/api/organization/route.ts:14,36` — route ini **di luar** `/api/v1/*` jadi middleware tak cover. GET baca semua ahli organisasi, **POST create entry DB** — **mana-mana anonymous boleh tulis ke database**.
```ts
export async function GET(...)   // no auth
export async function POST(...)  // no auth — db.organizationMember.create()
```

### C2. `/api/institutions` — TIADA AUTH (GET + POST)
`src/app/api/institutions/route.ts:13,35` — sama: query + create `db.institution` tanpa sebarang auth.

### C3. Tiada security headers
`next.config.ts` (9 baris) — kosong: **no CSP, no HSTS, no X-Frame-Options, no helmet**. Express/Next serverless standard.

### C4. Rate limiting minimal
Hanya `/api/v1/ai` ada rate limit (`ai-rate-limit.ts`, in-memory Map — tak durable across replicas). Semua 19 route lain **tiada rate limiting**. Auth endpoints tiada brute-force protection.

### C5. Role integrity via `user_metadata`
`src/lib/auth.ts:23` + `middleware.ts` — role dibaca dari `user.user_metadata?.role`. SignUp hardcode `role: 'staff'` ✅ dan tiada elevation path dalam src ✅ — **TAPI** tiada Supabase RLS policies/migrations dalam repo (`supabase/` hanya config.toml), jadi privilege boundary bergantung sepenuhnya pada app-layer. 3 routes sahaja yang ada role gate (compliance/reports/ekyc → admin).

### 💚 Yang OK
- ✅ `src/lib/auth.ts` `requireAuth`/`requireRole` digunakan betul pada v1 routes (donations, cases, disbursements, dll)
- ✅ `/api/v1/ai/telegram` dilindungi `PUSPA_INTERNAL_API_TOKEN` header
- ✅ PII masking IC ada (`****XXXX`) di cases/disbursements/donors routes; Sentry sanitize regex
- ✅ Zero hardcoded secrets dalam src (grep sk-/ghp_/postgres:// clean)
- ✅ `.env.example` lengkap + `.env*` gitignored
- ✅ Zod validation pada body (requireBody/safeParseBody + per-route zod schemas)
- ✅ Pagination/sort sanitized (`api-utils.ts`: NaN/negative/oversize handled)

---

## 3. 🧩 Architecture Findings

| Issue | Detail |
|-------|--------|
| **Monster files** | `docs/page.tsx` 2,006L, `sedekah-jumaat/page.tsx` 1,546L, `cases` 1,082L, `members` 952L — >800L should be split (React.lazy/dynamic import) |
| **30+ agent config dirs** | `.adal .agents .augment .bob .claude .codebuddy .commandcode .continue .crush .factory .goose .junie .kilocode .kiro .kode .mcpjam .mux .neovate .openhands .pi .pochi .qoder .qwen .roo .trae .windsurf .zencoder` — noise, bukan source code |
| **Dual lockfiles** | `bun.lock` (343KB, diumumkan primary) + `package-lock.json` (336KB, stale) — supply-chain confusion risk |
| **4.6GB nested repo** | `mini-services/telegram-bot/SadTalker/` — nested `.git` (bukan submodule, bukan gitlink) — gitignored ✅ tapi bom masa: clone penuh = 4.6GB |
| **vendor submodule** | `vendor/hermes-agent` (NousResearch) — status `-` (belum checkout) |
| **`db/custom.db`** | SQLite legacy, 0 rujukan dalam src/prisma — dead artifact |
| **hermes/ embedded** | Direktori runtime Hermes penuh (state.db, config.yaml) — gitignored ✅, tapi 4KB state.db sahaja = kosong |

---

## 4. 🧪 Testing — FAIL

```bash
find src -name "*.test.ts" — ZERO (hanya tools/chrome-devtools.spec.ts + vendor tests)
```
- Tiada vitest/jest config
- 27 Prisma models, 20 API routes, 23 modules — **semua tanpa test**
- `verify:release` = lint + typecheck + build (no tests)
- **Nota:** `docs/SKILLS_REVIEW_REPORT.md` (2026-05-11) sudah flag "Tests: 0% coverage, 8 critical gaps" — **3 bulan masih belum fixed**

---

## 5. 📦 Kemasan

| Item | Status |
|------|--------|
| `bun.lock` + `package-lock.json` | ⚠️ Dual — pilih satu (CI dah pengguna bun) |
| SadTalker 4.6GB | ⚠️ Nested `.git` — perlu `rm -rf SadTalker/.git` + `.gitignore` dah ada |
| `.env.local.backup.20260508` + `.env.local.restored` | ⚠️ Stale backups — padam |
| `structure.txt` 4.8MB | ⚠️ On disk, untracked (ignored) |
| `poster-*.png` 2 files (950KB) | ⚠️ Download / posters dalam repo root |
| Caddyfile, run-*.sh, supervisor.sh | ✅ Operational scripts |
| `AGENTS.md`/`CLAUDE.md` | ✅ Comprehensive agent context |

---

## 6. 🚀 Strengths (Apa yang Bagus)

1. **Docs luar biasa** — AGENTS.md/ARCHITECTURE.md/DESIGN.md/PRD.md = 5,718 lines; kerja `docs/SKILLS_REVIEW_REPORT.md` berstruktur dengan severity
2. **Domain modelling matang** — 27 Prisma models, 23 modules bijak (asnafpreneur, ekyc, sedekah-jumaat, tapsecure = domain NGO sebenar)
3. **AI layer berfikir** — case-intelligence.ts (674L) dengan eligibility/recommendation/risk-flag/beneficiary-360 computation; openrouter.ts multi-key rotation, model fallback
4. **API validation discipline** — `api-utils.ts` standardize: pagination NaN-safe, search sanitize, sort whitelist, response envelope
5. **PII awareness** — masking IC + Sentry redact regex + `.env.example` disiplin
6. **CI auto-deploy** — push ke main → Vercel

---

## 7. Prioritized Action List

### P1 — Kritikal (lakukan segera)
| # | Fix | File |
|---|-----|------|
| 1 | Tambah `requireAuth()` ke `/api/organization` + `/api/institutions` | 2 routes |
| 2 | Tambah security headers (helmet/CSP) — satu middleware/layout | `next.config.ts` |
| 3 | Rate limit auth + semua v1 routes (Redis/KV untuk multi-instance) | api-utils / new lib |
| 4 | Setup RLS policies Supabase + migration tracked dalam repo | `supabase/migrations/` |

### P2 — Sederhana
| # | Fix |
|---|-----|
| 5 | Split `docs/page.tsx` (2,006L) + sedekah-jumaat (1,546L) via components |
| 6 | Buang `package-lock.json` (bun.lock primary), padam `db/custom.db`, stale env backups |
| 7 | `rm -rf SadTalker/.git` — buang nested repo (buang 4.6GB kecemasan clone) |
| 8 | Pin `vercel@<version>` dalam CI (bukan @latest) + tambah `bun install` step (commit dah cuba tapi file show @latest) |

### P3 — Minor
| # | Fix |
|---|-----|
| 9 | Vitest setup + test minimum: auth utils, api-utils, case-intelligence, 3 API routes |
| 10 | Bersihkan 30 dot-dirs agent config ke `agent-ctx/` atau gitignore |
| 11 | Air ganti `{ github: verified }` — centralize PII mask jadi satu util shared |

---

## 8. Verification Evidence

```bash
npx tsc --noEmit        → EXIT 0 (0 errors)
npx eslint src/         → EXIT 0 (0 errors)
git status              → 4 modified src files (page, app-header, app-sidebar, dashboard) + vendor submodule
find src -name "*.test.*" → ZERO app tests
grep secrets src/       → clean (no sk-/ghp_/postgres://)
```

*Report generated autonomously by Hermes Agent · 2026-08-10 · read-only audit (0 files modified)*