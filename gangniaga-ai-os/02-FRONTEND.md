# GANGNIAGA AI OS — FRONTEND APPLICATION (Next.js 15)

## apps/web/ Structure

```
apps/web/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── agents/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   │   ├── page.tsx
│   │   │   │   │   └── chat/
│   │   │   │   │       └── page.tsx
│   │   │   │   └── new/
│   │   │   │       └── page.tsx
│   │   │   ├── workflows/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── builder/
│   │   │   │       └── page.tsx
│   │   │   ├── browser/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [sessionId]/
│   │   │   │       └── page.tsx
│   │   │   ├── forecasting/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx
│   │   │   ├── documents/
│   │   │   │   └── page.tsx
│   │   │   ├── integrations/
│   │   │   │   └── page.tsx
│   │   │   ├── billing/
│   │   │   │   └── page.tsx
│   │   │   ├── settings/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── profile/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── team/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── api-keys/
│   │   │   │       └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   └── health/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/                          # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── card.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── table.tsx
│   │   │   ├── select.tsx
│   │   │   ├── switch.tsx
│   │   │   ├── slider.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── tooltip.tsx
│   │   │   ├── command.tsx
│   │   │   ├── sheet.tsx
│   │   │   ├── separator.tsx
│   │   │   ├── label.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   └── resizable.tsx
│   │   ├── layout/
│   │   │   ├── sidebar.tsx
│   │   │   ├── header.tsx
│   │   │   ├── mobile-nav.tsx
│   │   │   ├── breadcrumbs.tsx
│   │   │   ├── workspace-switcher.tsx
│   │   │   ├── user-nav.tsx
│   │   │   └── notification-bell.tsx
│   │   ├── dashboard/
│   │   │   ├── stats-cards.tsx
│   │   │   ├── activity-feed.tsx
│   │   │   ├── recent-executions.tsx
│   │   │   ├── quick-actions.tsx
│   │   │   └── kpi-overview.tsx
│   │   ├── agents/
│   │   │   ├── agent-card.tsx
│   │   │   ├── agent-list.tsx
│   │   │   ├── agent-form.tsx
│   │   │   ├── agent-chat.tsx
│   │   │   ├── agent-config.tsx
│   │   │   ├── tool-selector.tsx
│   │   │   ├── skill-selector.tsx
│   │   │   └── execution-trace.tsx
│   │   ├── workflows/
│   │   │   ├── workflow-card.tsx
│   │   │   ├── workflow-list.tsx
│   │   │   ├── workflow-builder.tsx
│   │   │   ├── workflow-node.tsx
│   │   │   ├── workflow-connection.tsx
│   │   │   └── execution-timeline.tsx
│   │   ├── browser/
│   │   │   ├── browser-viewer.tsx
│   │   │   ├── browser-toolbar.tsx
│   │   │   ├── session-list.tsx
│   │   │   └── action-log.tsx
│   │   ├── forecasting/
│   │   │   ├── forecast-chart.tsx
│   │   │   ├── scenario-comparison.tsx
│   │   │   ├── kpi-card.tsx
│   │   │   └── forecast-form.tsx
│   │   ├── chat/
│   │   │   ├── chat-panel.tsx
│   │   │   ├── chat-message.tsx
│   │   │   ├── chat-input.tsx
│   │   │   ├── typing-indicator.tsx
│   │   │   └── tool-call-display.tsx
│   │   └── shared/
│   │       ├── data-table.tsx
│   │       ├── empty-state.tsx
│   │       ├── error-boundary.tsx
│   │       ├── loading-spinner.tsx
│   │       ├── pagination.tsx
│   │       ├── search-input.tsx
│   │       └── status-badge.tsx
│   ├── hooks/
│   │   ├── use-auth.ts
│   │   ├── use-workspace.ts
│   │   ├── use-websocket.ts
│   │   ├── use-execution.ts
│   │   ├── use-debounce.ts
│   │   ├── use-local-storage.ts
│   │   ├── use-media-query.ts
│   │   ├── use-toast.ts
│   │   └── use-optimistic.ts
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts
│   │   │   ├── auth.ts
│   │   │   ├── agents.ts
│   │   │   ├── workflows.ts
│   │   │   ├── executions.ts
│   │   │   ├── browser.ts
│   │   │   ├── forecasting.ts
│   │   │   └── billing.ts
│   │   ├── utils/
│   │   │   ├── cn.ts
│   │   │   ├── format.ts
│   │   │   ├── validation.ts
│   │   │   └── constants.ts
│   │   ├── stores/
│   │   │   ├── auth-store.ts
│   │   │   ├── workspace-store.ts
│   │   │   ├── ui-store.ts
│   │   │   └── execution-store.ts
│   │   └── types/
│   │       ├── api.ts
│   │       ├── agent.ts
│   │       ├── workflow.ts
│   │       ├── execution.ts
│   │       └── index.ts
│   ├── styles/
│   │   └── globals.css
│   └── middleware.ts
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── images/
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── postcss.config.js
└── Dockerfile
```

## Core Files

### apps/web/next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@gangniaga/ui', '@gangniaga/shared'],
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'app.gangniaga.ai'],
    },
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.amazonaws.com' },
      { protocol: 'https', hostname: '**.cloudflare.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: process.env.API_URL || '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization, X-API-Key' },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.API_URL || 'http://localhost:4000'}/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
```

### apps/web/tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar))',
          foreground: 'hsl(var(--sidebar-foreground))',
          border: 'hsl(var(--sidebar-border))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'slide-in': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

### apps/web/src/styles/globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 199 89% 48%;
    --chart-4: 43 76% 64%;
    --chart-5: 27 87% 67%;
    --sidebar: 0 0% 98%;
    --sidebar-foreground: 222.2 84% 4.9%;
    --sidebar-border: 214.3 31.8% 91.4%;
    --sidebar-accent: 210 40% 96.1%;
    --sidebar-accent-foreground: 222.2 84% 4.9%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%;
    --sidebar: 222.2 84% 4.9%;
    --sidebar-foreground: 210 40% 98%;
    --sidebar-border: 217.2 32.6% 17.5%;
    --sidebar-accent: 217.2 32.6% 17.5%;
    --sidebar-accent-foreground: 210 40% 98%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer utilities {
  .scrollbar-thin {
    scrollbar-width: thin;
  }
  .scrollbar-none {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
}
```

### apps/web/src/app/layout.tsx
```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GangNiaga AI OS — Autonomous AI Business Operating System',
  description: 'Enterprise AI operating system for autonomous business operations, multi-agent orchestration, and workflow automation.',
  keywords: ['AI', 'automation', 'business', 'operating system', 'agents', 'workflows'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
```

### apps/web/src/app/page.tsx
```tsx
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default function HomePage() {
  const cookieStore = cookies();
  const hasAuth = cookieStore.has('access_token');

  if (hasAuth) {
    redirect('/dashboard');
  }

  redirect('/login');
}
```

### apps/web/src/app/(dashboard)/layout.tsx
```tsx
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const hasAuth = cookieStore.has('access_token');

  if (!hasAuth) {
    redirect('/login');
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-muted/30">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### apps/web/src/app/(dashboard)/dashboard/page.tsx
```tsx
import { Suspense } from 'react';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { ActivityFeed } from '@/components/dashboard/activity-feed';
import { RecentExecutions } from '@/components/dashboard/recent-executions';
import { QuickActions } from '@/components/dashboard/quick-actions';
import { KPIOverview } from '@/components/dashboard/kpi-overview';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your AI operations.
          </p>
        </div>
        <QuickActions />
      </div>

      <Suspense fallback={<Skeleton className="h-32 w-full" />}>
        <StatsCards />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <KPIOverview />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <RecentExecutions />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<Skeleton className="h-96 w-full" />}>
            <ActivityFeed />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
```

### apps/web/src/components/layout/sidebar.tsx
```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { WorkspaceSwitcher } from './workspace-switcher';
import {
  LayoutDashboard,
  Bot,
  Workflow,
  Globe,
  TrendingUp,
  BarChart3,
  FileText,
  Puzzle,
  CreditCard,
  Settings,
  Zap,
} from 'lucide-react';

const sidebarNavItems = [
  { title: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { title: 'Agents', href: '/agents', icon: Bot },
  { title: 'Workflows', href: '/workflows', icon: Workflow },
  { title: 'Browser', href: '/browser', icon: Globe },
  { title: 'Forecasting', href: '/forecasting', icon: TrendingUp },
  { title: 'Analytics', href: '/analytics', icon: BarChart3 },
  { title: 'Documents', href: '/documents', icon: FileText },
  { title: 'Integrations', href: '/integrations', icon: Puzzle },
];

const sidebarBottomItems = [
  { title: 'Billing', href: '/billing', icon: CreditCard },
  { title: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-sidebar">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">GangNiaga</span>
        </Link>
      </div>

      <div className="px-3 py-2">
        <WorkspaceSwitcher />
      </div>

      <Separator />

      <ScrollArea className="flex-1 px-3 py-2">
        <nav className="space-y-1">
          {sidebarNavItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Button
                key={item.href}
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  isActive && 'bg-sidebar-accent text-sidebar-accent-foreground'
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            );
          })}
        </nav>
      </ScrollArea>

      <Separator />

      <div className="px-3 py-2">
        <nav className="space-y-1">
          {sidebarBottomItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);
            return (
              <Button
                key={item.href}
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  isActive && 'bg-sidebar-accent text-sidebar-accent-foreground'
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
```

### apps/web/src/components/layout/header.tsx
```tsx
'use client';

import { Bell, Search, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserNav } from './user-nav';
import { NotificationBell } from './notification-bell';

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex h-14 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search agents, workflows, executions..."
            className="pl-8"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>

        <NotificationBell />

        <UserNav />
      </div>
    </header>
  );
}
```

### apps/web/src/components/agents/agent-chat.tsx
```tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useWebSocket } from '@/hooks/use-websocket';
import { useExecution } from '@/hooks/use-execution';
import { cn } from '@/lib/utils/cn';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  toolCalls?: any[];
}

export function AgentChat({ agentId }: { agentId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { socket } = useWebSocket();
  const { activeExecution } = useExecution();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    socket.on('execution:update', (data: any) => {
      if (data.agentId === agentId && data.output) {
        setMessages((prev) => [
          ...prev,
          {
            id: data.id,
            role: 'assistant',
            content: data.output,
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
      }
    });

    return () => {
      socket.off('execution:update');
    };
  }, [socket, agentId]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/agents/' + agentId + '/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) throw new Error('Failed to execute agent');

      // Response will come via WebSocket
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again.',
          timestamp: new Date(),
        },
      ]);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <Bot className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">Start a conversation</h3>
              <p className="text-muted-foreground max-w-sm">
                Ask your agent anything. It can help with analysis, automation, research, and more.
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              <div
                className={cn(
                  'rounded-lg px-4 py-2 max-w-[80%]',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-50 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
              {message.role === 'user' && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="rounded-lg px-4 py-2 bg-muted">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
```

### apps/web/src/components/workflows/workflow-builder.tsx
```tsx
'use client';

import { useState, useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { WorkflowNode } from './workflow-node';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Play, Save, Plus } from 'lucide-react';

const nodeTypes = {
  workflowNode: WorkflowNode,
};

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'workflowNode',
    position: { x: 250, y: 0 },
    data: { label: 'Start', type: 'trigger' },
  },
];

export function WorkflowBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [workflowName, setWorkflowName] = useState('New Workflow');

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = () => {
    const newNode: Node = {
      id: `${nodes.length + 1}`,
      type: 'workflowNode',
      position: { x: 250, y: nodes.length * 100 + 50 },
      data: { label: `Step ${nodes.length + 1}`, type: 'action' },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleSave = async () => {
    const workflow = {
      name: workflowName,
      definition: {
        nodes: nodes.map((n) => ({ id: n.id, data: n.data })),
        edges: edges.map((e) => ({ source: e.source, target: e.target })),
      },
    };

    await fetch('/api/v1/workflows', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workflow),
    });
  };

  const handleExecute = async () => {
    // Execute workflow
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-4">
          <Label htmlFor="name">Workflow Name</Label>
          <Input
            id="name"
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="w-64"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={addNode}>
            <Plus className="h-4 w-4 mr-2" />
            Add Step
          </Button>
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button size="sm" onClick={handleExecute}>
            <Play className="h-4 w-4 mr-2" />
            Execute
          </Button>
        </div>
      </div>

      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}
```

### apps/web/src/components/forecasting/forecast-chart.tsx
```tsx
'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ForecastChartProps {
  data: Array<{
    month: string;
    actual?: number;
    forecast: number;
    lower?: number;
    upper?: number;
  }>;
  title: string;
  showConfidence?: boolean;
}

export function ForecastChart({ data, title, showConfidence = true }: ForecastChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => [`RM ${value.toLocaleString()}`, '']}
            />
            <Legend />
            {showConfidence && (
              <Area
                type="monotone"
                dataKey="upper"
                stroke="none"
                fill="hsl(var(--primary))"
                fillOpacity={0.1}
                name="Upper Bound"
              />
            )}
            {showConfidence && (
              <Area
                type="monotone"
                dataKey="lower"
                stroke="none"
                fill="hsl(var(--background))"
                name="Lower Bound"
              />
            )}
            <Line
              type="monotone"
              dataKey="actual"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Actual"
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 4 }}
              name="Forecast"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
```

### apps/web/src/hooks/use-websocket.ts
```typescript
'use client';

import { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export function useWebSocket() {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:4000/executions', {
      transports: ['websocket'],
      autoConnect: true,
    });

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, []);

  return { socket: socketRef.current, isConnected };
}
```

### apps/web/src/lib/api/client.ts
```typescript
import axios, { AxiosInstance, AxiosError } from 'axios';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use((config) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle token refresh or logout
          if (typeof window !== 'undefined') {
            localStorage.removeItem('access_token');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, params?: any): Promise<T> {
    const response = await this.client.get(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.put(url, data);
    return response.data;
  }

  async patch<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.patch(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete(url);
    return response.data;
  }
}

export const api = new ApiClient();
```

### apps/web/src/lib/stores/auth-store.ts
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: string;
}

interface AuthState {
  user: User | null;
  tenant: Tenant | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  setAuth: (data: { user: User; tenant: Tenant; accessToken: string; refreshToken: string }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tenant: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      setAuth: (data) =>
        set({
          user: data.user,
          tenant: data.tenant,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          user: null,
          tenant: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'gangniaga-auth',
    }
  )
);
```

### apps/web/package.json
```json
{
  "name": "@gangniaga/web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^15.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@tanstack/react-query": "^5.18.0",
    "zustand": "^4.5.0",
    "axios": "^1.6.0",
    "socket.io-client": "^4.7.0",
    "react-hook-form": "^7.50.0",
    "@hookform/resolvers": "^3.3.0",
    "zod": "^3.22.0",
    "reactflow": "^11.10.0",
    "recharts": "^2.12.0",
    "framer-motion": "^11.0.0",
    "next-themes": "^0.3.0",
    "lucide-react": "^0.323.0",
    "date-fns": "^3.3.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "tailwindcss-animate": "^1.0.7",
    "@radix-ui/react-dialog": "^1.0.0",
    "@radix-ui/react-dropdown-menu": "^2.0.0",
    "@radix-ui/react-scroll-area": "^1.0.0",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.0",
    "@radix-ui/react-tabs": "^1.0.0",
    "@radix-ui/react-toast": "^1.0.0",
    "@radix-ui/react-tooltip": "^1.0.0",
    "@radix-ui/react-avatar": "^1.0.0",
    "@radix-ui/react-separator": "^1.0.0",
    "@radix-ui/react-label": "^2.0.0",
    "@radix-ui/react-switch": "^1.0.0",
    "@radix-ui/react-progress": "^1.0.0",
    "@radix-ui/react-popover": "^1.0.0",
    "@radix-ui/react-slider": "^1.0.0",
    "cmdk": "^0.2.0",
    "sonner": "^1.4.0",
    "vaul": "^0.9.0"
  },
  "devDependencies": {
    "@types/node": "^20.11.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "typescript": "^5.4.0",
    "eslint": "^9.0.0",
    "eslint-config-next": "^15.0.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

---

*Generated: 2026-05-10*
*Component: Frontend Application (Next.js 15)*
*Status: Complete — Production-Ready Architecture*
