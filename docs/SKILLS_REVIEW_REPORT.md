# PUSPA-Z Project Review Report
**Date:** 2026-05-11
**Method:** 6 parallel skill-based audits

---

## Executive Summary

| Area | Status | Issues Found |
|------|--------|-------------|
| 🧩 Modules | ✅ PASS | 0 issues — all 23 modules fully registered |
| 🔌 API Routes | 🔴 FAIL | 12 issues (3 critical, 4 high, 5 medium) |
| 🤖 AI Tools | 🔴 FAIL | 10 issues (4 critical, 3 high, 3 medium) |
| 🔒 PII Masking | 🔴 FAIL | 14 exposure points (5 critical, 4 warning, 5 clean) |
| 🗄️ Database | ⚠️ WARN | 5 issues (all convention violations) |
| 🧪 Tests | 🔴 FAIL | 0% coverage, 32 untested files, 8 critical gaps |

**Overall: 1 area passing, 3 areas failing, 2 areas with warnings.**

---

## 1. Module Audit ✅

**Result: 100% — Zero issues.**

All 23 modules are fully registered across all 4 required locations:
- `ViewId` type in `src/lib/store.ts`
- `moduleMap` in `src/components/view-renderer.tsx`
- `viewAccess` RBAC in `src/lib/access-control.ts`
- `page.tsx` in module directory

**RBAC Distribution:**
| Role | Count | Modules |
|------|-------|---------|
| staff | 17 | dashboard, members, cases, programmes, donations, donors, disbursements, volunteers, activities, documents, asnafpreneur, sedekah-jumaat, docs, settings, carta-organisasi, institusi, permohonan-bantuan |
| admin | 5 | compliance, reports, ekyc, tapsecure, admin |
| developer | 1 | ai |

All modules use `'use client'`, demo data fallback, and shadcn/ui components correctly.

---

## 2. API Routes Audit 🔴

### CRITICAL (Must Fix)

1. **Donors route exposes raw PII** — `src/app/api/v1/donors/route.ts` returns unmasked `email`, `phone`, and `address` for all donors. **PDPA compliance violation.**

2. **Full table scans on 6 routes** — `donations`, `disbursements`, `documents`, `compliance`, `ekyc`, and `reports` fetch entire tables into memory for stats computation. Will degrade catastrophically as data grows. Replace with Prisma `aggregate`/`groupBy` or separate cached stats endpoints.

### HIGH (Should Fix)

3. **No pagination on programmes route** — Returns all records with no page/limit params.

4. **Volunteers route exposes raw PII** — `email` and `phone` returned unmasked.

5. **eKYC route exposes partial PII** — `phone` and `email` from member relation returned unmasked (IC is masked).

6. **Donations route exposes donor email** — Via `donor: { select: { email } }` join.

### MEDIUM (Consider Fixing)

7. **Inconsistent auth pattern** — `programmes`, `volunteers`, `documents` POST handlers call `requireRole('staff')` without explicit `requireAuth()`.

8. **Inconsistent response envelope keys** — Some use `data`, others use plural model names (`donations`, `donors`, `disbursements`, etc.).

9. **Error messages in English** — Project convention specifies Bahasa Melayu for user-facing errors.

10. **Activities and reports admin-only** — May be overly restrictive.

11. **Case number generation not atomic** — Uses `count() + 1`, risk of duplicates under concurrent requests.

### Summary Table

| Route | Auth | PII | Pagination | Validation | Perf |
|-------|------|-----|------------|------------|------|
| members | ✅ | ✅ | ✅ | ✅ | ✅ |
| cases | ✅ | ✅ | ✅ | ✅ | ✅ |
| donations | ✅ | ⚠️ | ✅ | ✅ | 🔴 |
| donors | ✅ | 🔴 | ✅ | ✅ | ✅ |
| disbursements | ✅ | ✅ | ✅ | ✅ | 🔴 |
| programmes | ⚠️ | ✅ | 🔴 | ✅ | ✅ |
| volunteers | ⚠️ | 🔴 | ✅ | ✅ | ✅ |
| documents | ⚠️ | ✅ | ✅ | ✅ | 🔴 |
| compliance | ✅ | ✅ | ✅ | ✅ | 🔴 |
| eKYC | ✅ | ⚠️ | ✅ | ✅ | 🔴 |
| activities | ⚠️ | ✅ | ⚠️ | N/A | ✅ |
| reports | ⚠️ | ✅ | N/A | ✅ | 🔴 |
| dashboard | ✅ | ✅ | N/A | N/A | ✅ |
| ai | ✅ | N/A | N/A | ✅ | ✅ |

---

## 3. AI Tools Audit 🔴

### CRITICAL (Must Fix)

1. **Missing try/catch in execute()** — 14 of 18 core tools have no error handling. DB errors propagate unhandled to the AI, causing crashes instead of graceful Bahasa Melayu error messages.
   - Affected: `get_recent_donations`, `get_donation_stats`, `get_active_cases`, `get_case_summary`, `get_asnafpreneur_stats`, `get_member_list`, `get_volunteer_list`, `get_sedekah_masjid_locations`, `get_member_stats`, `get_active_programmes`, `get_volunteer_stats`, `get_compliance_status`, `get_disbursement_summary`, `get_dashboard_overview`

2. **Wrong RBAC on mutation tool** — `update_volunteer_status` allows `staff` but should be `['admin', 'developer']` only.

3. **No dedicated audit log for financial mutation** — `approve_disbursement` does not write its own Activity entry. Relies solely on generic `executeTool()` wrapper.

4. **No dedicated audit log for deletion** — `delete_case` does not write its own Activity entry. Deletion of cases is high-risk and needs its own audit trail.

### HIGH (Should Fix)

5. **Description in Bahasa Melayu** (should be English for AI comprehension) — 4 tools: `get_asnafpreneur_stats`, `get_volunteer_list`, `update_volunteer_status`, `get_sedekah_masjid_locations`

6. **Fake GPS coordinates** — `get_sedekah_masjid_locations` returns `Math.random()` coordinates. AI may present fake data as real.

7. **Misleading description** — `delete_case` says "Delete" but performs soft-delete (sets status to 'rejected').

### MEDIUM (Consider Fixing)

8. **No top-level try/catch** in `system_health`
9. **Stub tool** — `delegate_task` simulates delegation without actually spawning sub-agents
10. **Redundant `updatedAt`** in `approve_disbursement` (Prisma `@updatedAt` handles this)

---

## 4. PII Masking Audit 🔴

### PII Masking Coverage Matrix

| PII Field | Members | Donors | Volunteers | Donations | Activities | eKYC | Cases | Disbursements |
|-----------|:-------:|:------:|:----------:|:---------:|:----------:|:----:|:-----:|:-------------:|
| icNumber  | ✅ | N/A | N/A | N/A | N/A | ✅ | ✅ | ✅ |
| phone     | ❌ | ❌ | ❌ | N/A | N/A | ❌ | N/A | N/A |
| email     | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | N/A | N/A |
| address   | ❌ | ❌ | N/A | N/A | N/A | N/A | N/A | N/A |

### Key Findings

1. **IC number masking is consistent** — Applied correctly in members, cases, disbursements, eKYC routes, and cases tool.
2. **Phone, email, address are almost NEVER masked** — Donors, volunteers, and members endpoints all return these in plain text.
3. **Audit log error path is unsanitized** — `src/tools/index.ts:820-823` writes completely unsanitized params to Activity table on error.
4. **Realtime hook leaks PII to browser console** — `src/hooks/use-realtime.ts` logs full database payloads.
5. **`update_volunteer_status` tool returns full object** — Potentially exposes email/phone to AI context.

---

## 5. Database Schema Audit ⚠️

### Issues Found

1. **13 date fields use `DateTime?` when they should be `String?`** — Per convention, only `createdAt`/`updatedAt` should use `DateTime`. Affected: `Member.ekycVerifiedAt`, `Case.closedAt`, `Donor.firstDonationAt`, `Donor.lastDonationAt`, `Disbursement.verifiedAt`, `EKYCVerification.verifiedAt`, `AutomationJob.lastRunAt`, `AutomationJob.nextRunAt`, `AidApplication.appliedAt`, `AidApplication.approvedAt`, `AidApplication.signedAt`.

2. **Missing cascade deletes on most relations** — Only 6 of 20+ relations have `onDelete: Cascade`. Key missing: Member→Case, Member→Disbursement, Donor→Donation, Case→Disbursement, Programme→Disbursement, User→Activity, User→AiConversation.

3. **`Entrepreneur.category` uses Bahasa Melayu** — `makanan, jahitan, perkhidmatan, pertanian, kraftangan` while convention says only `EntrepreneurStatus` should use Bahasa.

4. **`VolunteerActivity.activityId` has no relation** — Field exists but no `Activity` relation defined.

5. **`AidApplication` has no link to `Member`** — Should aid applications reference a member?

### What's Correct

- All JSON fields properly typed (`String?` with `JSON.stringify()` on write)
- `Activity` model has correct fields (no `module` field)
- `Donation` correctly has both `donorId` relation and denormalized donor fields
- `Document` polymorphic pattern uses optional FKs correctly
- All `createdAt`/`updatedAt` consistently use `DateTime`

---

## 6. Test Coverage Audit 🔴

### Current State: 0% Coverage

| Area | Files | Tested | Coverage |
|------|-------|--------|----------|
| API Routes | 15 | 0 | 0% |
| Tools | 4 | 0 | 0% |
| RBAC | 1 | 0 | 0% |
| Validation | 1 | 0 | 0% |
| Stores | 2 | 0 | 0% |
| Auth | 3 | 0 | 0% |
| Other | 6 | 0 | 0% |
| **TOTAL** | **32** | **0** | **0%** |

### Existing Test Issues

The single test file (`src/tools/chrome-devtools.spec.ts`) is:
- **Not runnable** — No `playwright.config.ts` exists
- **Brittle** — Relies on UI placeholder text
- **No AAA pattern** — Mixed setup/action/assertion
- **Happy path only** — No error path testing

### Critical Testing Gaps (by risk)

1. **RBAC enforcement** — Role hierarchy gates access to admin functions. Single regression could expose admin to staff.
2. **PII masking** — `maskIC()` function must never be bypassed. No test validates this.
3. **Auth guards** — `requireAuth()` and `requireRole()` are the security boundary. No tests verify rejection.
4. **AI rate limiting** — Per-user and per-IP limits. No tests verify enforcement.
5. **Tool RBAC** — `executeTool()` blocks staff from admin tools. No tests confirm this.
6. **Validation schemas** — Zod schemas enforce input boundaries. No tests verify rejection of invalid input.
7. **Memory fallback** — Dual-mode memory (Prisma + in-memory). No tests for DB-unavailable behavior.
8. **Telegram auth** — Token validation. No tests verify rejection.

---

## Top 10 Priority Fixes

| # | Priority | Area | Issue | Effort |
|---|----------|------|-------|--------|
| 1 | 🔴 CRITICAL | PII | Mask phone/email/address in donors, volunteers, members APIs | Medium |
| 2 | 🔴 CRITICAL | PII | Sanitize audit log error path (`executeTool` line 820) | Low |
| 3 | 🔴 CRITICAL | API | Replace full table scans with aggregations (6 routes) | High |
| 4 | 🔴 CRITICAL | Tools | Add try/catch to 14 tool execute() functions | Medium |
| 5 | 🔴 CRITICAL | Tools | Fix `update_volunteer_status` RBAC to admin-only | Low |
| 6 | 🔴 CRITICAL | Tests | Setup Vitest + write RBAC + auth guard tests | High |
| 7 | 🟠 HIGH | API | Add pagination to programmes route | Low |
| 8 | 🟠 HIGH | Tools | Translate 4 BM tool descriptions to English | Low |
| 9 | 🟠 HIGH | DB | Convert 13 DateTime fields to String | Medium |
| 10 | 🟡 MEDIUM | DB | Add missing cascade deletes to prevent FK violations | Medium |

---

## Recommended Action Plan

### Sprint 1 — Security Hardening (Week 1)
1. Mask all PII fields in API responses (phone, email, address)
2. Sanitize audit log error path
3. Fix `update_volunteer_status` RBAC
4. Add try/catch to all tool execute() functions

### Sprint 2 — Performance & Reliability (Week 2)
5. Replace full table scans with Prisma aggregations
6. Add pagination to programmes route
7. Fix case number generation (use UUID or sequence)

### Sprint 3 — Testing Foundation (Week 3)
8. Setup Vitest with proper config
9. Write RBAC unit tests (highest risk area)
10. Write auth guard tests
11. Write PII masking tests

### Sprint 4 — Schema & Conventions (Week 4)
12. Migrate DateTime fields to String
13. Add missing cascade deletes
14. Standardize response envelope keys
15. Translate error messages to Bahasa Melayu
