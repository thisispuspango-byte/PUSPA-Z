# GANGNIAGA AI OS — MONOREPO FOUNDATION

## Monorepo Structure

```
gangniaga-ai-os/
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── deploy-staging.yml
│       └── deploy-production.yml
├── .husky/
│   ├── pre-commit
│   └── commit-msg
├── apps/
│   ├── web/                          # Next.js 15 frontend
│   ├── api/                          # NestJS backend
│   ├── admin/                        # Admin panel
│   ├── ai-worker/                    # AI processing workers
│   ├── agent-runtime/                # Agent orchestration
│   ├── browser-runtime/              # Browser automation
│   ├── workflow-engine/              # Temporal workflows
│   ├── automation-service/           # Automation service
│   └── observability/                # Observability stack
├── packages/
│   ├── ui/                           # Shared UI components
│   ├── auth/                         # Auth package
│   ├── ai/                           # AI utilities
│   ├── memory/                       # Memory engine
│   ├── workflows/                    # Workflow definitions
│   ├── orchestration/                # Orchestration logic
│   ├── forecasting/                  # Financial forecasting
│   ├── analytics/                    # Analytics engine
│   ├── skills/                       # Skill registry
│   ├── browser-tools/                # Browser automation tools
│   ├── sandbox/                      # Sandbox execution
│   ├── integrations/                 # Third-party integrations
│   ├── notifications/                # Notification system
│   └── shared/                       # Shared utilities
├── infrastructure/
│   ├── docker/
│   ├── kubernetes/
│   ├── terraform/
│   └── scripts/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seeds/
├── turbo.json
├── package.json
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── .env.example
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── docker-compose.yml
├── docker-compose.prod.yml
├── Makefile
└── README.md
```

## Root Configuration Files

### package.json
```json
{
  "name": "gangniaga-ai-os",
  "version": "0.1.0",
  "private": true,
  "description": "GangNiaga AI OS — Autonomous AI Business Operating System",
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev --parallel",
    "dev:web": "turbo run dev --filter=web",
    "dev:api": "turbo run dev --filter=api",
    "dev:all": "docker-compose up -d && turbo run dev --parallel",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "test:e2e": "turbo run test:e2e",
    "typecheck": "turbo run typecheck",
    "clean": "turbo run clean && rm -rf node_modules",
    "format": "prettier --write \"**/*.{ts,tsx,md,json,yml,yaml}\"",
    "db:migrate": "pnpm --filter @gangniaga/api db:migrate",
    "db:seed": "pnpm --filter @gangniaga/api db:seed",
    "db:studio": "pnpm --filter @gangniaga/api db:studio",
    "prepare": "husky install"
  },
  "devDependencies": {
    "@commitlint/cli": "^19.0.0",
    "@commitlint/config-conventional": "^19.0.0",
    "eslint": "^9.0.0",
    "husky": "^9.0.0",
    "lint-staged": "^15.0.0",
    "prettier": "^3.0.0",
    "turbo": "^2.0.0",
    "typescript": "^5.4.0"
  },
  "packageManager": "pnpm@9.0.0",
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=9.0.0"
  }
}
```

### pnpm-workspace.yaml
```yaml
packages:
  - "apps/*"
  - "packages/*"
```

### turbo.json
```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "test": {
      "dependsOn": ["build"]
    },
    "test:e2e": {
      "dependsOn": ["build"]
    },
    "typecheck": {},
    "clean": {
      "cache": false
    }
  }
}
```

### tsconfig.base.json
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": false,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "removeComments": true,
    "importHelpers": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "baseUrl": ".",
    "paths": {
      "@gangniaga/shared": ["packages/shared/src"],
      "@gangniaga/ui": ["packages/ui/src"],
      "@gangniaga/auth": ["packages/auth/src"],
      "@gangniaga/ai": ["packages/ai/src"],
      "@gangniaga/memory": ["packages/memory/src"],
      "@gangniaga/workflows": ["packages/workflows/src"],
      "@gangniaga/orchestration": ["packages/orchestration/src"],
      "@gangniaga/forecasting": ["packages/forecasting/src"],
      "@gangniaga/analytics": ["packages/analytics/src"],
      "@gangniaga/skills": ["packages/skills/src"],
      "@gangniaga/browser-tools": ["packages/browser-tools/src"],
      "@gangniaga/sandbox": ["packages/sandbox/src"],
      "@gangniaga/integrations": ["packages/integrations/src"],
      "@gangniaga/notifications": ["packages/notifications/src"]
    }
  },
  "exclude": ["node_modules", "dist", ".next"]
}
```

### .env.example
```env
# Application
NODE_ENV=development
APP_NAME=GangNiaga AI OS
APP_URL=http://localhost:3000
API_URL=http://localhost:4000
ADMIN_URL=http://localhost:4001

# Database
DATABASE_URL=postgresql://gangniaga:gangniaga@localhost:5432/gangniaga_ai_os?schema=public
DATABASE_POOL_MIN=2
DATABASE_POOL_MAX=10

# Redis
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=

# Auth
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRATION=7d
REFRESH_TOKEN_EXPIRATION=30d
ENCRYPTION_KEY=your-32-char-encryption-key-here

# AI
OPENAI_API_KEY=sk-...
LITELLM_BASE_URL=http://localhost:4000
LANGFUSE_PUBLIC_KEY=pk-...
LANGFUSE_SECRET_KEY=sk-...
LANGFUSE_BASE_URL=http://localhost:3000

# Storage
S3_ENDPOINT=http://localhost:9000
S3_ACCESS_KEY=minioadmin
S3_SECRET_KEY=minioadmin
S3_BUCKET=gangniaga-assets
S3_REGION=us-east-1

# Meilisearch
MEILI_HOST=http://localhost:7700
MEILI_MASTER_KEY=your-meili-master-key

# Temporal
TEMPORAL_ADDRESS=localhost:7233
TEMPORAL_NAMESPACE=default

# Browser Automation
BROWSER_WS_ENDPOINT=ws://localhost:3001
BROWSER_POOL_SIZE=5
BROWSER_TIMEOUT=30000

# Monitoring
PROMETHEUS_PORT=9090
GRAFANA_PORT=3001
LOKI_PORT=3100

# Stripe (Payments)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PRO=price_...
STRIPE_PRICE_ENTERPRISE=price_...

# Email
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_USER=
SMTP_PASS=
SMTP_FROM=noreply@gangniaga.ai

# Feature Flags
FEATURE_AGENT_RUNTIME=true
FEATURE_BROWSER_AUTOMATION=true
FEATURE_WORKFLOW_ENGINE=true
FEATURE_FINANCIAL_INTELLIGENCE=true
```

### .gitignore
```
# Dependencies
node_modules
.pnp
.pnp.js

# Build
dist
.next
out
build
*.tsbuildinfo

# Environment
.env
.env.local
.env.*.local

# IDE
.idea
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json

# OS
.DS_Store
Thumbs.db

# Logs
logs
*.log
npm-debug.log*

# Testing
coverage
.nyc_output

# Turbo
.turbo

# Prisma
prisma/migrations

# Docker
docker-compose.override.yml
```

### Makefile
```makefile
.PHONY: help setup dev build test lint clean db-migrate db-seed db-studio

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

setup: ## Initial setup
	pnpm install
	cp -n .env.example .env
	docker-compose up -d
	pnpm db:migrate
	pnpm db:seed

dev: ## Start development
	docker-compose up -d
	pnpm dev

dev:web: ## Start web only
	pnpm dev:web

dev:api: ## Start API only
	pnpm dev:api

build: ## Build all
	pnpm build

test: ## Run tests
	pnpm test

test:e2e: ## Run e2e tests
	pnpm test:e2e

lint: ## Lint all
	pnpm lint

typecheck: ## Typecheck all
	pnpm typecheck

clean: ## Clean all
	pnpm clean

db-migrate: ## Run migrations
	pnpm db:migrate

db-seed: ## Seed database
	pnpm db:seed

db-studio: ## Open Prisma Studio
	pnpm db:studio

docker-up: ## Start Docker services
	docker-compose up -d

docker-down: ## Stop Docker services
	docker-compose down

docker-logs: ## View Docker logs
	docker-compose logs -f

k8s-apply: ## Apply Kubernetes manifests
	kubectl apply -f infrastructure/kubernetes/

k8s-delete: ## Delete Kubernetes manifests
	kubectl delete -f infrastructure/kubernetes/
```

### docker-compose.yml
```yaml
version: '3.9'

services:
  # PostgreSQL with pgvector
  postgres:
    image: pgvector/pgvector:pg16
    container_name: gangniaga-postgres
    environment:
      POSTGRES_USER: gangniaga
      POSTGRES_PASSWORD: gangniaga
      POSTGRES_DB: gangniaga_ai_os
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U gangniaga"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Redis
  redis:
    image: redis:7-alpine
    container_name: gangniaga-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Meilisearch
  meilisearch:
    image: getmeili/meilisearch:v1.7
    container_name: gangniaga-meilisearch
    environment:
      MEILI_MASTER_KEY: your-meili-master-key
      MEILI_ENV: development
    ports:
      - "7700:7700"
    volumes:
      - meilisearch_data:/meili_data

  # MinIO (S3-compatible storage)
  minio:
    image: minio/minio:latest
    container_name: gangniaga-minio
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - minio_data:/data
    command: server /data --console-address ":9001"

  # Temporal
  temporal:
    image: temporalio/auto-setup:1.22
    container_name: gangniaga-temporal
    environment:
      - DB=postgresql
      - DB_PORT=5432
      - POSTGRES_USER=gangniaga
      - POSTGRES_PWD=gangniaga
      - POSTGRES_SEEDS=postgres
      - DYNAMIC_CONFIG_FILE_PATH=config/dynamicconfig/development-sql.yaml
    ports:
      - "7233:7233"
    depends_on:
      postgres:
        condition: service_healthy

  temporal-ui:
    image: temporalio/ui:2.21
    container_name: gangniaga-temporal-ui
    environment:
      - TEMPORAL_ADDRESS=temporal:7233
    ports:
      - "8080:8080"
    depends_on:
      - temporal

  # LiteLLM
  litellm:
    image: ghcr.io/berriai/litellm:latest
    container_name: gangniaga-litellm
    ports:
      - "4000:4000"
    volumes:
      - ./infrastructure/litellm/config.yaml:/app/config.yaml
    command: --config /app/config.yaml

  # Langfuse
  langfuse:
    image: langfuse/langfuse:2
    container_name: gangniaga-langfuse
    environment:
      DATABASE_URL: postgresql://gangniaga:gangniaga@postgres:5432/langfuse
      NEXTAUTH_SECRET: your-nextauth-secret
      NEXTAUTH_URL: http://localhost:3001
      SALT: your-salt
    ports:
      - "3001:3001"
    depends_on:
      postgres:
        condition: service_healthy

  # Prometheus
  prometheus:
    image: prom/prometheus:latest
    container_name: gangniaga-prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./infrastructure/prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
      - prometheus_data:/prometheus

  # Grafana
  grafana:
    image: grafana/grafana:latest
    container_name: gangniaga-grafana
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
    ports:
      - "3002:3000"
    volumes:
      - grafana_data:/var/lib/grafana
      - ./infrastructure/grafana/dashboards:/etc/grafana/provisioning/dashboards
      - ./infrastructure/grafana/datasources:/etc/grafana/provisioning/datasources

  # Loki
  loki:
    image: grafana/loki:latest
    container_name: gangniaga-loki
    ports:
      - "3100:3100"
    volumes:
      - ./infrastructure/loki/config.yml:/etc/loki/config.yml
      - loki_data:/loki

  # Mailpit (dev email)
  mailpit:
    image: axllent/mailpit:latest
    container_name: gangniaga-mailpit
    ports:
      - "1025:1025"
      - "8025:8025"

volumes:
  postgres_data:
  redis_data:
  meilisearch_data:
  minio_data:
  prometheus_data:
  grafana_data:
  loki_data:
```

### docker-compose.prod.yml
```yaml
version: '3.9'

services:
  web:
    build:
      context: .
      dockerfile: apps/web/Dockerfile
    environment:
      - NODE_ENV=production
    ports:
      - "3000:3000"

  api:
    build:
      context: .
      dockerfile: apps/api/Dockerfile
    environment:
      - NODE_ENV=production
    ports:
      - "4000:4000"

  ai-worker:
    build:
      context: .
      dockerfile: apps/ai-worker/Dockerfile
    environment:
      - NODE_ENV=production
    deploy:
      replicas: 3

  agent-runtime:
    build:
      context: .
      dockerfile: apps/agent-runtime/Dockerfile
    environment:
      - NODE_ENV=production
    ports:
      - "5000:5000"

  browser-runtime:
    build:
      context: .
      dockerfile: apps/browser-runtime/Dockerfile
    environment:
      - NODE_ENV=production
    ports:
      - "6000:6000"
    shm_size: '2gb'

  workflow-engine:
    build:
      context: .
      dockerfile: apps/workflow-engine/Dockerfile
    environment:
      - NODE_ENV=production
    ports:
      - "7000:7000"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./infrastructure/nginx/nginx.conf:/etc/nginx/nginx.conf
      - ./infrastructure/nginx/ssl:/etc/nginx/ssl
    depends_on:
      - web
      - api
```

---

## DATABASE SCHEMA (Prisma)

### prisma/schema.prisma
```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["fullTextSearch", "filteredRelationCount"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// TENANT & ORGANIZATION
// ============================================

model Tenant {
  id        String   @id @default(cuid())
  name      String
  slug      String   @unique
  plan      Plan     @default(FREE)
  status    TenantStatus @default(ACTIVE)
  
  // Relations
  users        User[]
  workspaces   Workspace[]
  subscriptions Subscription[]
  auditLogs    AuditLog[]
  
  // Metadata
  settings     Json     @default("{}")
  metadata     Json     @default("{}")
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([slug])
  @@index([status])
  @@map("tenants")
}

enum Plan {
  FREE
  STARTER
  PRO
  ENTERPRISE
}

enum TenantStatus {
  ACTIVE
  SUSPENDED
  CANCELLED
}

// ============================================
// USER & AUTHENTICATION
// ============================================

model User {
  id            String    @id @default(cuid())
  tenantId      String
  email         String
  passwordHash  String?
  name          String
  avatar        String?
  role          UserRole  @default(MEMBER)
  status        UserStatus @default(ACTIVE)
  
  // Auth
  emailVerified Boolean   @default(false)
  lastLoginAt   DateTime?
  refreshTokens RefreshToken[]
  
  // Relations
  tenant       Tenant        @relation(fields: [tenantId], references: [id])
  workspaces   WorkspaceMember[]
  sessions     Session[]
  agents       Agent[]
  workflows    Workflow[]
  executions   Execution[]
  apiKeys      ApiKey[]
  
  // Metadata
  preferences  Json          @default("{}")
  metadata     Json          @default("{}")
  
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt

  @@unique([tenantId, email])
  @@index([tenantId])
  @@index([email])
  @@map("users")
}

enum UserRole {
  OWNER
  ADMIN
  MEMBER
  VIEWER
}

enum UserStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
}

model RefreshToken {
  id        String   @id @default(cuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  revoked   Boolean  @default(false)
  
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt DateTime @default(now())

  @@index([userId])
  @@index([token])
  @@map("refresh_tokens")
}

model ApiKey {
  id          String   @id @default(cuid())
  userId      String
  name        String
  key         String   @unique
  permissions String[] @default([])
  lastUsedAt  DateTime?
  expiresAt   DateTime?
  
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([userId])
  @@index([key])
  @@map("api_keys")
}

model Session {
  id           String   @id @default(cuid())
  userId       String
  token        String   @unique
  ipAddress    String?
  userAgent    String?
  lastActiveAt DateTime @default(now())
  
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  createdAt    DateTime @default(now())
  expiresAt    DateTime

  @@index([userId])
  @@index([token])
  @@map("sessions")
}

// ============================================
// WORKSPACE
// ============================================

model Workspace {
  id          String   @id @default(cuid())
  tenantId    String
  name        String
  description String?
  icon        String?
  color       String?
  
  tenant      Tenant           @relation(fields: [tenantId], references: [id])
  members     WorkspaceMember[]
  agents      Agent[]
  workflows   Workflow[]
  executions  Execution[]
  memories    Memory[]
  documents   Document[]
  
  settings    Json             @default("{}")
  metadata    Json             @default("{}")
  
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt

  @@index([tenantId])
  @@map("workspaces")
}

model WorkspaceMember {
  id          String        @id @default(cuid())
  workspaceId String
  userId      String
  role        WorkspaceRole @default(MEMBER)
  
  workspace   Workspace     @relation(fields: [workspaceId], references: [id], onDelete: Cascade)
  user        User          @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  joinedAt    DateTime      @default(now())

  @@unique([workspaceId, userId])
  @@index([workspaceId])
  @@index([userId])
  @@map("workspace_members")
}

enum WorkspaceRole {
  OWNER
  ADMIN
  MEMBER
  VIEWER
}

// ============================================
// AGENT SYSTEM
// ============================================

model Agent {
  id          String      @id @default(cuid())
  workspaceId String
  userId      String
  name        String
  description String?
  type        AgentType   @default(GENERAL)
  status      AgentStatus @default(ACTIVE)
  
  // Configuration
  model       String      @default("gpt-4o")
  temperature Float       @default(0.7)
  maxTokens   Int         @default(4096)
  systemPrompt String?
  
  // Relations
  workspace   Workspace   @relation(fields: [workspaceId], references: [id])
  user        User        @relation(fields: [userId], references: [id])
  tools       AgentTool[]
  skills      AgentSkill[]
  executions  Execution[]
  memories    Memory[]
  
  // Metadata
  config      Json        @default("{}")
  metadata    Json        @default("{}")
  
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt

  @@index([workspaceId])
  @@index([userId])
  @@index([type])
  @@map("agents")
}

enum AgentType {
  GENERAL
  PLANNING
  EXECUTION
  BROWSER
  FINANCIAL
  RESEARCH
  WORKFLOW
  CUSTOM
}

enum AgentStatus {
  ACTIVE
  INACTIVE
  PAUSED
  ERROR
}

model AgentTool {
  id       String @id @default(cuid())
  agentId  String
  toolId   String
  
  agent    Agent  @relation(fields: [agentId], references: [id], onDelete: Cascade)
  tool     Tool   @relation(fields: [toolId], references: [id], onDelete: Cascade)
  
  config   Json   @default("{}")

  @@unique([agentId, toolId])
  @@index([agentId])
  @@map("agent_tools")
}

model AgentSkill {
  id       String @id @default(cuid())
  agentId  String
  skillId  String
  
  agent    Agent  @relation(fields: [agentId], references: [id], onDelete: Cascade)
  skill    Skill  @relation(fields: [skillId], references: [id], onDelete: Cascade)
  
  config   Json   @default("{}")

  @@unique([agentId, skillId])
  @@index([agentId])
  @@map("agent_skills")
}

// ============================================
// TOOL SYSTEM
// ============================================

model Tool {
  id          String   @id @default(cuid())
  name        String   @unique
  description String
  category    ToolCategory
  type        ToolType
  
  // Configuration
  schema      Json     // JSON Schema for tool parameters
  handler     String   // Handler identifier
  
  // Relations
  agents      AgentTool[]
  
  // Metadata
  icon        String?
  config      Json     @default("{}")
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([category])
  @@index([type])
  @@map("tools")
}

enum ToolCategory {
  BROWSER
  CRM
  FORECASTING
  EXPORT
  COMMUNICATION
  STORAGE
  SEARCH
  COMPUTATION
  CUSTOM
}

enum ToolType {
  BUILT_IN
  PLUGIN
  CUSTOM
}

// ============================================
// SKILL SYSTEM
// ============================================

model Skill {
  id          String   @id @default(cuid())
  name        String   @unique
  description String
  category    String
  
  // Configuration
  prompt      String   // Skill prompt template
  parameters  Json     // Parameter schema
  
  // Relations
  agents      AgentSkill[]
  
  // Metadata
  icon        String?
  tags        String[]
  version     String   @default("1.0.0")
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([category])
  @@map("skills")
}

// ============================================
// WORKFLOW SYSTEM
// ============================================

model Workflow {
  id          String         @id @default(cuid())
  workspaceId String
  userId      String
  name        String
  description String?
  type        WorkflowType   @default(MANUAL)
  status      WorkflowStatus @default(DRAFT)
  
  // Configuration
  definition  Json            // Workflow DAG definition
  triggers    WorkflowTrigger[]
  
  // Relations
  workspace   Workspace       @relation(fields: [workspaceId], references: [id])
  user        User            @relation(fields: [userId], references: [id])
  executions  WorkflowExecution[]
  
  // Schedule (for cron workflows)
  cron        String?
  timezone    String          @default("UTC")
  
  // Metadata
  config      Json            @default("{}")
  metadata    Json            @default("{}")
  
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt

  @@index([workspaceId])
  @@index([userId])
  @@index([status])
  @@index([type])
  @@map("workflows")
}

enum WorkflowType {
  MANUAL
  SCHEDULED
  EVENT_DRIVEN
  RECURRING
}

enum WorkflowStatus {
  DRAFT
  ACTIVE
  PAUSED
  ARCHIVED
}

model WorkflowTrigger {
  id         String   @id @default(cuid())
  workflowId String
  type       TriggerType
  config     Json
  
  workflow   Workflow @relation(fields: [workflowId], references: [id], onDelete: Cascade)

  @@index([workflowId])
  @@map("workflow_triggers")
}

enum TriggerType {
  WEBHOOK
  SCHEDULE
  EVENT
  MANUAL
  API
}

model WorkflowExecution {
  id           String            @id @default(cuid())
  workflowId   String
  status       ExecutionStatus   @default(PENDING)
  
  // Execution data
  input        Json?
  output       Json?
  error        Json?
  
  // Relations
  workflow     Workflow          @relation(fields: [workflowId], references: [id])
  
  // Timing
  startedAt    DateTime?
  completedAt  DateTime?
  duration     Int?              // milliseconds
  
  // Metadata
  metadata     Json              @default("{}")
  
  createdAt    DateTime          @default(now())
  updatedAt    DateTime          @updatedAt

  @@index([workflowId])
  @@index([status])
  @@map("workflow_executions")
}

// ============================================
// EXECUTION SYSTEM
// ============================================

model Execution {
  id          String         @id @default(cuid())
  workspaceId String
  userId      String
  agentId     String?
  type        ExecutionType
  status      ExecutionStatus @default(PENDING)
  
  // Execution data
  input       Json?
  output      Json?
  error       Json?
  
  // Relations
  workspace   Workspace      @relation(fields: [workspaceId], references: [id])
  user        User           @relation(fields: [userId], references: [id])
  agent       Agent?         @relation(fields: [agentId], references: [id])
  steps       ExecutionStep[]
  
  // Timing
  startedAt   DateTime?
  completedAt DateTime?
  duration    Int?
  
  // Token usage
  tokensIn    Int            @default(0)
  tokensOut   Int            @default(0)
  cost        Float          @default(0)
  
  // Metadata
  metadata    Json           @default("{}")
  
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt

  @@index([workspaceId])
  @@index([userId])
  @@index([agentId])
  @@index([status])
  @@index([type])
  @@map("executions")
}

enum ExecutionType {
  AGENT_RUN
  WORKFLOW
  BROWSER
  API
  MANUAL
}

enum ExecutionStatus {
  PENDING
  RUNNING
  COMPLETED
  FAILED
  CANCELLED
  TIMEOUT
}

model ExecutionStep {
  id          String         @id @default(cuid())
  executionId String
  stepNumber  Int
  type        StepType
  status      ExecutionStatus @default(PENDING)
  
  // Step data
  name        String
  input       Json?
  output      Json?
  error       Json?
  
  // Relations
  execution   Execution      @relation(fields: [executionId], references: [id], onDelete: Cascade)
  
  // Timing
  startedAt   DateTime?
  completedAt DateTime?
  duration    Int?
  
  // Token usage
  tokensIn    Int            @default(0)
  tokensOut   Int            @default(0)
  
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt

  @@index([executionId])
  @@map("execution_steps")
}

enum StepType {
  THINKING
  TOOL_CALL
  BROWSER_ACTION
  MEMORY_RETRIEVAL
  LLM_CALL
  CONDITION
  PARALLEL
  WAIT
}

// ============================================
// MEMORY SYSTEM
// ============================================

model Memory {
  id          String       @id @default(cuid())
  workspaceId String
  agentId     String?
  userId      String?
  type        MemoryType
  
  // Content
  content     String
  embedding   Unsupported("vector(1536)")?
  
  // Relations
  workspace   Workspace    @relation(fields: [workspaceId], references: [id])
  agent       Agent?       @relation(fields: [agentId], references: [id])
  
  // Metadata
  importance  Float        @default(0.5)
  accessCount Int          @default(0)
  lastAccessedAt DateTime?
  tags        String[]
  metadata    Json         @default("{}")
  
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  @@index([workspaceId])
  @@index([agentId])
  @@index([type])
  @@index([embedding], type: Hnsw)
  @@map("memories")
}

enum MemoryType {
  CONVERSATION
  FACT
  PREFERENCE
  WORKFLOW
  FORECAST
  RESEARCH
  DOCUMENT
  CUSTOM
}

// ============================================
// DOCUMENT SYSTEM
// ============================================

model Document {
  id          String   @id @default(cuid())
  workspaceId String
  name        String
  type        DocumentType
  mimeType    String
  size        Int
  url         String
  
  // Content (for text-based)
  content     String?
  embedding   Unsupported("vector(1536)")?
  
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
  
  // Metadata
  tags        String[]
  metadata    Json     @default("{}")
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([workspaceId])
  @@index([type])
  @@map("documents")
}

enum DocumentType {
  PDF
  DOCX
  XLSX
  PPTX
  TEXT
  MARKDOWN
  HTML
  JSON
  CSV
  IMAGE
}

// ============================================
// BROWSER AUTOMATION
// ============================================

model BrowserSession {
  id          String              @id @default(cuid())
  workspaceId String
  status      BrowserSessionStatus @default(ACTIVE)
  
  // Session data
  url         String?
  title       String?
  
  workspace   Workspace           @relation(fields: [workspaceId], references: [id])
  actions     BrowserAction[]
  
  // Metadata
  userAgent   String?
  viewport    Json?
  metadata    Json                @default("{}")
  
  createdAt   DateTime            @default(now())
  updatedAt   DateTime            @updatedAt
  closedAt    DateTime?

  @@index([workspaceId])
  @@index([status])
  @@map("browser_sessions")
}

enum BrowserSessionStatus {
  ACTIVE
  PAUSED
  CLOSED
  ERROR
}

model BrowserAction {
  id              String        @id @default(cuid())
  browserSessionId String
  type            BrowserActionType
  status          ExecutionStatus @default(PENDING)
  
  // Action data
  selector        String?
  value           String?
  url             String?
  result          Json?
  screenshot      String?
  error           Json?
  
  browserSession  BrowserSession @relation(fields: [browserSessionId], references: [id], onDelete: Cascade)
  
  // Timing
  startedAt       DateTime?
  completedAt     DateTime?
  duration        Int?
  
  createdAt       DateTime      @default(now())

  @@index([browserSessionId])
  @@index([type])
  @@map("browser_actions")
}

enum BrowserActionType {
  NAVIGATE
  CLICK
  TYPE
  SCREENSHOT
  EXTRACT
  SCROLL
  WAIT
  EVALUATE
  UPLOAD
  DOWNLOAD
  FORM_FILL
}

// ============================================
// FINANCIAL INTELLIGENCE
// ============================================

model Forecast {
  id          String   @id @default(cuid())
  workspaceId String
  name        String
  type        ForecastType
  status      ForecastStatus @default(DRAFT)
  
  // Configuration
  config      Json     // Forecast parameters
  data        Json     // Input data
  results     Json?    // Forecast results
  
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
  
  // Metadata
  period      String   // e.g., "2026-Q1"
  notes       String?
  metadata    Json     @default("{}")
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([workspaceId])
  @@index([type])
  @@map("forecasts")
}

enum ForecastType {
  REVENUE
  EXPENSE
  CASH_FLOW
  BURN_RATE
  RUNWAY
  SCENARIO
  CUSTOM
}

enum ForecastStatus {
  DRAFT
  RUNNING
  COMPLETED
  FAILED
}

model KPIData {
  id          String   @id @default(cuid())
  workspaceId String
  name        String
  category    String
  value       Float
  target      Float?
  unit        String   // e.g., "RM", "%", "users"
  
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
  
  // Time period
  period      String   // e.g., "2026-01"
  
  metadata    Json     @default("{}")
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([workspaceId])
  @@index([category])
  @@index([period])
  @@map("kpi_data")
}

// ============================================
// SUBSCRIPTION & BILLING
// ============================================

model Subscription {
  id               String             @id @default(cuid())
  tenantId         String
  plan             Plan
  status           SubscriptionStatus @default(ACTIVE)
  
  // Stripe
  stripeCustomerId String?            @unique
  stripeSubscriptionId String?        @unique
  
  // Billing
  currentPeriodStart DateTime
  currentPeriodEnd   DateTime
  cancelAtPeriodEnd  Boolean          @default(false)
  
  tenant           Tenant             @relation(fields: [tenantId], references: [id])
  
  createdAt        DateTime           @default(now())
  updatedAt        DateTime           @updatedAt

  @@index([tenantId])
  @@map("subscriptions")
}

enum SubscriptionStatus {
  ACTIVE
  PAST_DUE
  CANCELLED
  UNPAID
  TRIALING
}

// ============================================
// AUDIT LOG
// ============================================

model AuditLog {
  id        String   @id @default(cuid())
  tenantId  String
  userId    String?
  action    String
  resource  String
  resourceId String?
  
  // Details
  oldValue  Json?
  newValue  Json?
  ipAddress String?
  userAgent String?
  
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
  
  metadata  Json     @default("{}")
  
  createdAt DateTime @default(now())

  @@index([tenantId])
  @@index([userId])
  @@index([action])
  @@index([resource])
  @@index([createdAt])
  @@map("audit_logs")
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

model Notification {
  id        String           @id @default(cuid())
  userId    String
  type      NotificationType
  title     String
  message   String
  read      Boolean          @default(false)
  
  // Action
  actionUrl String?
  metadata  Json             @default("{}")
  
  createdAt DateTime         @default(now())
  readAt    DateTime?

  @@index([userId])
  @@index([read])
  @@map("notifications")
}

enum NotificationType {
  INFO
  SUCCESS
  WARNING
  ERROR
  AGENT_COMPLETE
  WORKFLOW_COMPLETE
  SYSTEM
}

// ============================================
// INTEGRATIONS
// ============================================

model Integration {
  id          String           @id @default(cuid())
  workspaceId String
  type        IntegrationType
  name        String
  status      IntegrationStatus @default(ACTIVE)
  
  // Credentials (encrypted)
  credentials Json
  
  workspace   Workspace        @relation(fields: [workspaceId], references: [id])
  
  // Metadata
  config      Json             @default("{}")
  metadata    Json             @default("{}")
  
  createdAt   DateTime         @default(now())
  updatedAt   DateTime         @updatedAt

  @@index([workspaceId])
  @@index([type])
  @@map("integrations")
}

enum IntegrationType {
  STRIPE
  SLACK
  DISCORD
  TELEGRAM
  GOOGLE
  HUBSPOT
  SALESFORCE
  SHOPIFY
  WOOCOMMERCE
  CUSTOM
}

enum IntegrationStatus {
  ACTIVE
  INACTIVE
  ERROR
  PENDING
}
```

---

## DATABASE INDEXES & OPTIMIZATION

### prisma/migrations/001_init.sql
```sql
-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgvector";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Row Level Security for multi-tenancy
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY tenant_isolation ON tenants
  USING (id = current_setting('app.current_tenant')::text);

CREATE POLICY user_tenant_isolation ON users
  USING (tenant_id = current_setting('app.current_tenant')::text);

CREATE POLICY workspace_tenant_isolation ON workspaces
  USING (tenant_id = current_setting('app.current_tenant')::text);

-- HNSW index for vector search (better performance than IVFFlat)
CREATE INDEX idx_memories_embedding_hnsw ON memories
  USING hnsw (embedding vector_cosine_ops)
  WITH (m = 16, ef_construction = 64);

-- Trigram indexes for text search
CREATE INDEX idx_users_email_trgm ON users USING gin (email gin_trgm_ops);
CREATE INDEX idx_agents_name_trgm ON agents USING gin (name gin_trgm_ops);
CREATE INDEX idx_workflows_name_trgm ON workflows USING gin (name gin_trgm_ops);

-- Composite indexes for common queries
CREATE INDEX idx_executions_workspace_status ON executions(workspace_id, status);
CREATE INDEX idx_executions_agent_created ON executions(agent_id, created_at DESC);
CREATE INDEX idx_memories_workspace_type ON memories(workspace_id, type);
CREATE INDEX idx_workflows_workspace_status ON workflows(workspace_id, status);
CREATE INDEX idx_audit_logs_tenant_created ON audit_logs(tenant_id, created_at DESC);

-- Partitioning for large tables (executions, audit_logs)
-- This would be done via Prisma migrations in production
```

---

## SEED DATA

### prisma/seed.ts
```typescript
import { PrismaClient, Plan, UserRole, AgentType, ToolCategory, ToolType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create default tenant
  const tenant = await prisma.tenant.create({
    data: {
      name: 'GangNiaga Demo',
      slug: 'gangniaga-demo',
      plan: Plan.PRO,
      status: 'ACTIVE',
    },
  });

  // Create admin user
  const passwordHash = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.create({
    data: {
      tenantId: tenant.id,
      email: 'admin@gangniaga.ai',
      passwordHash,
      name: 'Admin',
      role: UserRole.OWNER,
      status: 'ACTIVE',
      emailVerified: true,
    },
  });

  // Create default workspace
  const workspace = await prisma.workspace.create({
    data: {
      tenantId: tenant.id,
      name: 'Main Workspace',
      description: 'Default workspace for GangNiaga AI OS',
    },
  });

  // Add user to workspace
  await prisma.workspaceMember.create({
    data: {
      workspaceId: workspace.id,
      userId: admin.id,
      role: 'OWNER',
    },
  });

  // Create default tools
  const tools = [
    { name: 'web_search', description: 'Search the web for information', category: ToolCategory.SEARCH, type: ToolType.BUILT_IN },
    { name: 'web_scrape', description: 'Extract content from web pages', category: ToolCategory.BROWSER, type: ToolType.BUILT_IN },
    { name: 'browser_navigate', description: 'Navigate browser to URL', category: ToolCategory.BROWSER, type: ToolType.BUILT_IN },
    { name: 'browser_click', description: 'Click on browser elements', category: ToolCategory.BROWSER, type: ToolType.BUILT_IN },
    { name: 'browser_screenshot', description: 'Take browser screenshots', category: ToolCategory.BROWSER, type: ToolType.BUILT_IN },
    { name: 'file_read', description: 'Read file contents', category: ToolCategory.STORAGE, type: ToolType.BUILT_IN },
    { name: 'file_write', description: 'Write to files', category: ToolCategory.STORAGE, type: ToolType.BUILT_IN },
    { name: 'code_execute', description: 'Execute code in sandbox', category: ToolCategory.COMPUTATION, type: ToolType.BUILT_IN },
    { name: 'forecast_revenue', description: 'Generate revenue forecasts', category: ToolCategory.FORECASTING, type: ToolType.BUILT_IN },
    { name: 'forecast_expense', description: 'Generate expense forecasts', category: ToolCategory.FORECASTING, type: ToolType.BUILT_IN },
    { name: 'export_pdf', description: 'Export data as PDF', category: ToolCategory.EXPORT, type: ToolType.BUILT_IN },
    { name: 'export_xlsx', description: 'Export data as Excel', category: ToolCategory.EXPORT, type: ToolType.BUILT_IN },
    { name: 'send_email', description: 'Send email notifications', category: ToolCategory.COMMUNICATION, type: ToolType.BUILT_IN },
    { name: 'memory_search', description: 'Search agent memory', category: ToolCategory.SEARCH, type: ToolType.BUILT_IN },
    { name: 'memory_store', description: 'Store information in memory', category: ToolCategory.STORAGE, type: ToolType.BUILT_IN },
  ];

  for (const tool of tools) {
    await prisma.tool.create({ data: tool });
  }

  // Create default skills
  const skills = [
    { name: 'business_analysis', description: 'Analyze business data and metrics', category: 'business' },
    { name: 'market_research', description: 'Conduct market research and analysis', category: 'research' },
    { name: 'financial_modeling', description: 'Build financial models and forecasts', category: 'finance' },
    { name: 'content_writing', description: 'Write professional content', category: 'content' },
    { name: 'data_analysis', description: 'Analyze datasets and generate insights', category: 'data' },
    { name: 'browser_automation', description: 'Automate browser tasks', category: 'automation' },
    { name: 'report_generation', description: 'Generate business reports', category: 'reporting' },
    { name: 'competitive_analysis', description: 'Analyze competitors', category: 'research' },
  ];

  for (const skill of skills) {
    await prisma.skill.create({ data: skill });
  }

  // Create default agent
  await prisma.agent.create({
    data: {
      workspaceId: workspace.id,
      userId: admin.id,
      name: 'General Assistant',
      description: 'Default general-purpose AI agent',
      type: AgentType.GENERAL,
      model: 'gpt-4o',
      systemPrompt: 'You are GangNiaga AI, an autonomous business operating system assistant. You help users manage their business operations, analyze data, automate workflows, and make informed decisions.',
    },
  });

  console.log('✅ Seed data created successfully');
  console.log(`   Tenant: ${tenant.slug}`);
  console.log(`   User: ${admin.email} / admin123`);
  console.log(`   Workspace: ${workspace.name}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## OBSERVABILITY CONFIGURATION

### infrastructure/prometheus/prometheus.yml
```yaml
global:
  scrape_interval: 15s
  evaluation_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'api'
    static_configs:
      - targets: ['api:4000']
    metrics_path: '/metrics'

  - job_name: 'ai-worker'
    static_configs:
      - targets: ['ai-worker:5000']
    metrics_path: '/metrics'

  - job_name: 'agent-runtime'
    static_configs:
      - targets: ['agent-runtime:5001']
    metrics_path: '/metrics'

  - job_name: 'browser-runtime'
    static_configs:
      - targets: ['browser-runtime:6000']
    metrics_path: '/metrics'

  - job_name: 'workflow-engine'
    static_configs:
      - targets: ['workflow-engine:7000']
    metrics_path: '/metrics'

  - job_name: 'web'
    static_configs:
      - targets: ['web:3000']
    metrics_path: '/metrics'
```

### infrastructure/loki/config.yml
```yaml
auth_enabled: false

server:
  http_listen_port: 3100

common:
  path_prefix: /loki
  storage:
    filesystem:
      chunks_directory: /loki/chunks
      rules_directory: /loki/rules
  replication_factor: 1
  ring:
    kvstore:
      store: inmemory

schema_config:
  configs:
    - from: 2024-01-01
      store: tsdb
      object_store: filesystem
      schema: v13
      index:
        prefix: index_
        period: 24h

limits_config:
  retention_period: 30d
```

### infrastructure/grafana/datasources/datasources.yml
```yaml
apiVersion: 1

datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    url: http://prometheus:9090
    isDefault: true

  - name: Loki
    type: loki
    access: proxy
    url: http://loki:3100

  - name: PostgreSQL
    type: postgres
    url: postgres:5432
    database: gangniaga_ai_os
    user: gangniaga
    secureJsonData:
      password: gangniaga
    jsonData:
      sslmode: disable
      maxOpenConns: 10
      maxIdleConns: 5
      connMaxLifetime: 14400
```

---

## CI/CD PIPELINE

### .github/workflows/ci.yml
```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '20'
  PNPM_VERSION: '9'

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm typecheck

  test:
    runs-on: ubuntu-latest
    needs: lint
    services:
      postgres:
        image: pgvector/pgvector:pg16
        env:
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
          POSTGRES_DB: test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test
        env:
          DATABASE_URL: postgresql://test:test@localhost:5432/test
          REDIS_URL: redis://localhost:6379

  build:
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: actions/upload-artifact@v4
        with:
          name: build-artifacts
          path: |
            apps/web/.next
            apps/api/dist
            apps/admin/dist

  e2e:
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: ${{ env.PNPM_VERSION }}
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test:e2e
```

### .github/workflows/deploy-staging.yml
```yaml
name: Deploy Staging

on:
  push:
    branches: [develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      
      - name: Deploy to staging
        run: |
          echo "Deploying to staging environment..."
          # Add your deployment commands here
          # e.g., kubectl, helm, or cloud provider CLI
```

### .github/workflows/deploy-production.yml
```yaml
name: Deploy Production

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      
      - name: Deploy to production
        run: |
          echo "Deploying to production environment..."
          # Add your deployment commands here
```

---

## KUBERNETES MANIFESTS

### infrastructure/kubernetes/namespace.yml
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: gangniaga
  labels:
    app: gangniaga-ai-os
```

### infrastructure/kubernetes/api-deployment.yml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api
  namespace: gangniaga
  labels:
    app: gangniaga-ai-os
    component: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: gangniaga-ai-os
      component: api
  template:
    metadata:
      labels:
        app: gangniaga-ai-os
        component: api
    spec:
      containers:
        - name: api
          image: gangniaga/api:latest
          ports:
            - containerPort: 4000
          envFrom:
            - configMapRef:
                name: gangniaga-config
            - secretRef:
                name: gangniaga-secrets
          resources:
            requests:
              memory: "512Mi"
              cpu: "250m"
            limits:
              memory: "1Gi"
              cpu: "500m"
          livenessProbe:
            httpGet:
              path: /health
              port: 4000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /health/ready
              port: 4000
            initialDelaySeconds: 5
            periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: api
  namespace: gangniaga
spec:
  selector:
    app: gangniaga-ai-os
    component: api
  ports:
    - port: 4000
      targetPort: 4000
  type: ClusterIP
```

### infrastructure/kubernetes/web-deployment.yml
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
  namespace: gangniaga
  labels:
    app: gangniaga-ai-os
    component: web
spec:
  replicas: 2
  selector:
    matchLabels:
      app: gangniaga-ai-os
      component: web
  template:
    metadata:
      labels:
        app: gangniaga-ai-os
        component: web
    spec:
      containers:
        - name: web
          image: gangniaga/web:latest
          ports:
            - containerPort: 3000
          envFrom:
            - configMapRef:
                name: gangniaga-config
            - secretRef:
                name: gangniaga-secrets
          resources:
            requests:
              memory: "256Mi"
              cpu: "100m"
            limits:
              memory: "512Mi"
              cpu: "250m"
---
apiVersion: v1
kind: Service
metadata:
  name: web
  namespace: gangniaga
spec:
  selector:
    app: gangniaga-ai-os
    component: web
  ports:
    - port: 3000
      targetPort: 3000
  type: ClusterIP
```

### infrastructure/kubernetes/ingress.yml
```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: gangniaga-ingress
  namespace: gangniaga
  annotations:
    kubernetes.io/ingress.class: nginx
    cert-manager.io/cluster-issuer: letsencrypt-prod
    nginx.ingress.kubernetes.io/rate-limit: "100"
    nginx.ingress.kubernetes.io/rate-limit-window: "1m"
spec:
  tls:
    - hosts:
        - app.gangniaga.ai
        - api.gangniaga.ai
      secretName: gangniaga-tls
  rules:
    - host: app.gangniaga.ai
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: web
                port:
                  number: 3000
    - host: api.gangniaga.ai
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: api
                port:
                  number: 4000
```

### infrastructure/kubernetes/configmap.yml
```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: gangniaga-config
  namespace: gangniaga
data:
  NODE_ENV: "production"
  APP_NAME: "GangNiaga AI OS"
  APP_URL: "https://app.gangniaga.ai"
  API_URL: "https://api.gangniaga.ai"
  DATABASE_POOL_MIN: "2"
  DATABASE_POOL_MAX: "10"
  REDIS_URL: "redis://redis:6379"
  MEILI_HOST: "http://meilisearch:7700"
  TEMPORAL_ADDRESS: "temporal:7233"
  BROWSER_POOL_SIZE: "5"
  BROWSER_TIMEOUT: "30000"
```

### infrastructure/kubernetes/secrets.yml
```yaml
apiVersion: v1
kind: Secret
metadata:
  name: gangniaga-secrets
  namespace: gangniaga
type: Opaque
stringData:
  DATABASE_URL: "postgresql://gangniaga:CHANGE_ME@postgres:5432/gangniaga_ai_os"
  JWT_SECRET: "CHANGE_ME"
  ENCRYPTION_KEY: "CHANGE_ME_32_CHARS"
  OPENAI_API_KEY: "sk-..."
  LANGFUSE_PUBLIC_KEY: "pk-..."
  LANGFUSE_SECRET_KEY: "sk-..."
  S3_ACCESS_KEY: "CHANGE_ME"
  S3_SECRET_KEY: "CHANGE_ME"
  STRIPE_SECRET_KEY: "sk_live_..."
  STRIPE_WEBHOOK_SECRET: "whsec_..."
```

---

## DOCKERFILES

### apps/api/Dockerfile
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9 --activate

# Copy workspace files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/api ./apps/api
COPY packages ./packages

# Install dependencies
RUN pnpm install --frozen-lockfile

# Generate Prisma client
RUN cd apps/api && npx prisma generate

# Build
RUN pnpm build --filter=@gangniaga/api

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9 --activate

# Copy built artifacts
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json ./
COPY --from=builder /app/apps/api/prisma ./prisma
COPY --from=builder /app/node_modules/.pnpm ./node_modules

# Install production dependencies only
RUN pnpm install --prod --frozen-lockfile

EXPOSE 4000

CMD ["node", "dist/main.js"]
```

### apps/web/Dockerfile
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/web ./apps/web
COPY packages ./packages

RUN pnpm install --frozen-lockfile
RUN pnpm build --filter=web

# Production stage
FROM node:20-alpine AS production
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9 --activate

COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/package.json ./
COPY --from=builder /app/apps/web/next.config.js ./

RUN pnpm install --prod --frozen-lockfile

EXPOSE 3000

CMD ["pnpm", "start"]
```

### apps/browser-runtime/Dockerfile
```dockerfile
FROM mcr.microsoft.com/playwright:v1.42.0-jammy

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@9 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/browser-runtime ./apps/browser-runtime
COPY packages ./packages

RUN pnpm install --frozen-lockfile
RUN pnpm build --filter=browser-runtime

# Install Playwright browsers
RUN npx playwright install chromium

EXPOSE 6000

CMD ["node", "dist/main.js"]
```

---

## ENGINEERING EXECUTION PLAN

### Phase 1: Foundation (Week 1-2)
| Task | Priority | Owner |
|------|----------|-------|
| Monorepo setup | P0 | Platform |
| Database schema | P0 | Backend |
| Auth system | P0 | Backend |
| API scaffolding | P0 | Backend |
| Web scaffolding | P0 | Frontend |
| Docker setup | P0 | DevOps |
| CI/CD pipeline | P1 | DevOps |

### Phase 2: Core Platform (Week 3-4)
| Task | Priority | Owner |
|------|----------|-------|
| Workspace management | P0 | Full-stack |
| Agent CRUD | P0 | Full-stack |
| Tool registry | P0 | Backend |
| Skill registry | P0 | Backend |
| Dashboard UI | P1 | Frontend |
| Real-time updates | P1 | Full-stack |

### Phase 3: Agent Runtime (Week 5-6)
| Task | Priority | Owner |
|------|----------|-------|
| LangGraph integration | P0 | AI |
| Agent execution engine | P0 | AI |
| Memory system | P0 | AI |
| Tool execution | P0 | AI |
| Execution tracing | P1 | AI |
| Agent monitoring UI | P1 | Frontend |

### Phase 4: Browser Automation (Week 7-8)
| Task | Priority | Owner |
|------|----------|-------|
| Playwright runtime | P0 | Platform |
| Browser pool management | P0 | Platform |
| Session management | P0 | Platform |
| Action orchestration | P0 | Platform |
| Screenshot pipeline | P1 | Platform |
| Browser console UI | P1 | Frontend |

### Phase 5: Workflow Engine (Week 9-10)
| Task | Priority | Owner |
|------|----------|-------|
| Temporal integration | P0 | Platform |
| Workflow builder | P0 | Full-stack |
| DAG orchestration | P0 | Platform |
| Cron scheduling | P1 | Platform |
| Event triggers | P1 | Platform |
| Workflow monitoring | P1 | Frontend |

### Phase 6: Financial Intelligence (Week 11-12)
| Task | Priority | Owner |
|------|----------|-------|
| Forecasting engine | P0 | AI |
| KPI dashboard | P0 | Frontend |
| Revenue models | P1 | AI |
| Scenario analysis | P1 | AI |
| Investor reports | P1 | Full-stack |

### Phase 7: Production Hardening (Week 13-14)
| Task | Priority | Owner |
|------|----------|-------|
| Security audit | P0 | Platform |
| Performance optimization | P0 | Platform |
| Load testing | P1 | DevOps |
| Documentation | P1 | All |
| Production deployment | P0 | DevOps |

---

*Generated: 2026-05-10*
*Status: Foundation Complete — Ready for Implementation*
