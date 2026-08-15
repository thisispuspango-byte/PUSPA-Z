---
title: "PUSPA-Z — Orchestra Conductor Sub-Agent Delegation Protocol"
document_id: "PUSPA-DOC-ORCH-001"
version: "5.6.2"
last_updated: "2026-08-15T23:33:00+08:00"
maintainer: "HYPER-SOVEREIGN CONDUCTOR & ARCHITECT"
classification: "INTERNAL ORCHESTRATION"
lifecycle_status: "ACTIVE"
---

# PUSPA-Z Orchestra Conductor Protocol

> Hermes Agent v2 — Sub-Agent Delegation Protocol untuk PUSPA-Z V5.6
> Stack: Next.js 16 / React 19 / TypeScript 5 / Prisma 6 / Bun / Tailwind 4
> Location: `G:\PUSPA-Z\PUSPA-Z`

---

## 📜 Audit & Revision Ledger

| Versi | Tarikh & Masa (MYT) | Pengarang / Ejen | Kenapa (Rasional Perubahan) | Bagaimana (Kaedah & Skop Fail) | Status / Pengesahan |
| :---: | :---: | :---: | :--- | :--- | :---: |
| `5.6.2` | `2026-08-15 23:33` | `Conductor Agent` | Menguatkuasakan format standard jejak audit SMS-v1.0 bagi protokol orkestrasi | Menambah blok YAML Frontmatter dan Audit Ledger lengkap | `typecheck: 0 errors` |
| `5.6.0` | `2026-08-13 18:00` | `Conductor Agent` | Penetapan jadual penetapan model dan peraturan delegasi sub-agent | Penstrukturan profil ejen (coder, reviewer, architect) | `verified` |

---

## 1. TUJUAN

Skill ini adalah **SOP delegasi task** untuk PUSPA-Z V5. Ia menentukan:

- **Bila** delegate kepada sub-agent vs execute terus
- **Model mana** guna untuk setiap jenis task
- **Toolset mana** berikan kepada setiap sub-agent
- **Concurrency rules** — apa yang boleh jalan parallel
- **Dependency chains** — apa yang kena tunggu

---

## 2. MODEL ASSIGNMENT TABLE

Setiap task type ada model yang optimum. Jangan guna satu model untuk semua.

| Task Type | Primary Model | Context | Kenapa |
|-----------|--------------|---------|--------|
| **Code generation/editing** | `qwen/qwen3-coder:free` | 262K | Purpose-built coder, tool-calling |
| **Code review / QA** | `openai/gpt-oss-120b:free` | 131K | OpenWeights, strong reasoning |
| **Vision / image analysis** | `google/gemma-4-26b-a4b-it:free` | 262K | Multimodal, image+text+video |
| **Architecture / planning** | `nvidia/nemotron-3-super-120b-a12b:free` | 262K | 120B params, deep reasoning |
| **Documentation / marketing** | `minimax/minimax-m2.5:free` | 196K | Long context, fluent BM |
| **General / debugging** | `tencent/hy3-preview:free` | 262K | Current default, proven working |
| **OCR / text extraction** | `baidu/qianfan-ocr-fast:free` | 65K | Specialized OCR |
| **Reasoning / analysis** | `nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free` | 256K | Multi-modal reasoning |

### Model Override Format
```
model: {"model": "openrouter/qwen/qwen3-coder:free"}
```

---

## 3. DELEGATION RULES

### 3.1 Bila DELEGATE (spawn sub-agent)
- Task melibatkan **3+ file changes** atau **2+ modules**
- Task memerlukan **specialized model** (coding, vision, architecture)
- Task **boleh jalan independently** (tak bergantung output task lain)
- Task memerlukan **isolated terminal session** (build, test, deploy)

### 3.2 Bila EXECUTE LANGSUNG
- Task **1-2 file changes** sahaja
- Task memerlukan **user interaction** (clarify, confirmation)
- Task **bergantung output** sub-agent lain
- Quick queries, file reads, simple patches

### 3.3 CONCURRENCY RULES
- **Max 3 sub-agents** concurrently (token/context limits)
- **Frontend + Backend** boleh run parallel (independent domains)
- **Database → API → Frontend** adalah dependency chain (sequential)
- **Vision tasks** run sequential (single model call per image)
- **Code review** mesti tunggu **code generation** siap

---

## 4. SUB-AGENT PROFILES

### 4.1 `puspa-architect`
```
Role: orchestrator
Model: nvidia/nemotron-3-super-120b-a12b:free
Toolsets: [file, terminal, web]
Responsibility: Plan, design, delegate to other sub-agents
```

### 4.2 `puspa-coder`
```
Role: leaf
Model: qwen/qwen3-coder:free
Toolsets: [file, terminal]
Responsibility: Implement features, fix bugs, write tests
```

### 4.3 `puspa-reviewer`
```
Role: leaf
Model: openai/gpt-oss-120b:free
Toolsets: [file, terminal]
Responsibility: Code review, security scan, quality gates
```

### 4.4 `puspa-marketer`
```
Role: leaf
Model: minimax/minimax-m2.5:free
Toolsets: [file, web]
Responsibility: Marketing content, campaigns, social media
```

### 4.5 `puspa-vision`
```
Role: leaf
Model: google/gemma-4-26b-a4b-it:free
Toolsets: [file, vision]
Responsibility: Image analysis, visual QA, poster review
```

---

## 5. DEPENDENCY CHAINS

### 5.1 Standard Feature Development
```
[Plan] → [DB Schema] → [API Routes] → [Frontend] → [Review] → [Test] → [Deploy]
  ↑           ↑            ↑             ↑           ↑         ↑        ↑
Architect   Database     Backend      Frontend    Reviewer   Tester   Direct
```

### 5.2 Parallel Tracks (boleh run bersamaan)
```
Track A: [DB Schema] → [API Routes]
Track B: [UI Components] → [Frontend Pages]
         ↓ MERGE ↓
      [Integration] → [Review] → [Deploy]
```

### 5.3 Quick Fix (direct execute, no delegation)
```
[Read] → [Patch] → [Verify] → [Done]
```

---

## 6. TOOLSET ASSIGNMENT

| Toolset | Architect | Coder | Reviewer | Marketer | Vision |
|---------|-----------|-------|----------|----------|--------|
| file | ✅ | ✅ | ✅ | ✅ | ✅ |
| terminal | ✅ | ✅ | ✅ | ❌ | ❌ |
| web | ✅ | ❌ | ❌ | ✅ | ❌ |
| vision | ❌ | ❌ | ❌ | ❌ | ✅ |
| browser | ✅ | ❌ | ❌ | ✅ | ❌ |
| search | ✅ | ❌ | ✅ | ✅ | ❌ |

---

## 7. DELEGATION TEMPLATE

```typescript
// Single task delegation
delegate_task({
  goal: "Specific, self-contained task description",
  context: "All relevant file paths, error messages, constraints",
  toolsets: ["file", "terminal"],  // Minimal needed
  role: "leaf",  // or "orchestrator" for complex multi-step
})

// Batch parallel delegation
delegate_task({
  tasks: [
    {
      goal: "Task A (independent)",
      context: "Context for A",
      toolsets: ["file", "terminal"],
    },
    {
      goal: "Task B (independent)",
      context: "Context for B",
      toolsets: ["file", "web"],
    },
  ],
})
```

---

## 8. VERIFICATION CHECKLIST

Sebelum declare task done:

- [ ] All sub-agents returned `status: completed`
- [ ] No `interrupted` or `error` statuses
- [ ] Code changes pass `bun run typecheck` (no new errors)
- [ ] Code changes pass `bun run lint` (no new errors)
- [ ] Git working tree clean (no unintended changes)
- [ ] Obsidian updated with task outcome

---

## 9. ERROR HANDLING

| Error | Action |
|-------|--------|
| Sub-agent `interrupted` | Retry with smaller scope or direct execute |
| Sub-agent `error` | Read error, fix root cause, retry |
| Model 429/500 | Auto-rotate to next model in FREE_MODELS chain |
| Vision fail | Try next vision model in Tier 3 list |
| Build fail | Delegate to `puspa-debug-agent` |

---

## 10. FREE MODELS REFERENCE

> **All models are free tier via OpenRouter. Zero Google/Gemini dependency.**

**Tier 1 (General):** tencent/hy3-preview:free, nvidia/nemotron-3-super-120b-a12b:free, minimax/minimax-m2.5:free, openrouter/free

**Tier 2 (Coding):** qwen/qwen3-coder:free, openai/gpt-oss-120b:free, baidu/cobuddy:free

**Tier 3 (Vision):** google/gemma-4-26b-a4b-it:free, google/gemma-4-31b-it:free, google/lyria-3-pro-preview, nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free, nvidia/nemotron-nano-12b-v2-vl:free, baidu/qianfan-ocr-fast:free

**Tier 4 (Legacy):** openai/gpt-oss-20b:free, nousresearch/hermes-3-llama-3.1-405b:free, z-ai/glm-4.5-air:free, meta-llama/llama-3.2-3b-instruct:free, qwen/qwen3-next-80b-a3b-instruct:free, nvidia/nemotron-3-nano-30b-a3b:free, nvidia/nemotron-nano-9b-v2:free, poolside/laguna-xs.2:free, poolside/laguna-m.1:free, meta-llama/llama-3.3-70b-instruct:free, liquid/lfm-2.5-1.2b-thinking:free, liquid/lfm-2.5-1.2b-instruct:free, cognitivecomputations/dolphin-mistral-24b-venice-edition:free
