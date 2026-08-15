# PUSPA-Z Full Visual Overhaul Design Spec
Date: 2026-08-15

## Goal
To upgrade 3 main components in PUSPA-Z to meet premium international UI/UX standards, using Liquid Glass, Framer Motion, and high-fidelity aesthetics.

## Proposed Changes

### 1. Glass Card & KPI (`src/modules/dashboard/components/glass-card.tsx`, `kpi-cards.tsx`)
- Enhance glassmorphism with dynamic overlays.
- Introduce interactive border gradients that react to hover.
- Animate number values on load.
- Add micro-interactions for icons.

### 2. AI Chat Panel (`src/components/ai-chat-panel.tsx`)
- Add an expanding Aurora/glow effect behind the input field during AI streaming.
- Re-architect layout expansion to use fluid spring-based morphing.
- Staggered animations for incoming messages.

### 3. Global Navigation (`src/components/app-sidebar.tsx`, `app-header.tsx`)
- Sleek active states with glowing vertical pills in the sidebar.
- Hover micro-animations on sidebar icons.
- Dynamic scroll-based backdrop blur on the header.

## Verification
- Build and Typecheck `bun run typecheck` & `bun run build`.
- Manual verification of high-FPS animations and glassmorphism rendering on local dev server.
