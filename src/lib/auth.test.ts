import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(),
}))

vi.mock('@/lib/db', () => ({
  db: {
    user: {
      findFirst: vi.fn(),
    },
  },
}))

import { createClient } from '@/lib/supabase/server'
import { db } from '@/lib/db'
import { getCurrentUser, requireAuth, requireRole } from './auth'

const mockCreateClient = vi.mocked(createClient)
const mockDb = vi.mocked(db)

type MockUser = {
  id: string
  email: string
  user_metadata?: Record<string, unknown>
}

function mockGetUser(user: MockUser | null, dbRole?: string, dbName?: string) {
  mockCreateClient.mockResolvedValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user } }),
    },
  } as never)

  if (user) {
    mockDb.user.findFirst.mockResolvedValue({
      id: user.id,
      email: user.email,
      role: dbRole || (user.user_metadata?.role as string) || 'staff',
      name: dbName || (user.user_metadata?.name as string) || user.email?.split('@')[0] || 'User',
      createdAt: new Date(),
      updatedAt: new Date(),
      avatar: null,
      active: true,
    } as never)
  } else {
    mockDb.user.findFirst.mockResolvedValue(null as never)
  }
}

function mockCreateClientFailure() {
  mockCreateClient.mockRejectedValue(new Error('supabase unreachable'))
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('getCurrentUser', () => {
  it('returns null when supabase has no authenticated user', async () => {
    mockGetUser(null)
    await expect(getCurrentUser()).resolves.toBeNull()
  })

  it('returns null when createClient throws', async () => {
    mockCreateClientFailure()
    await expect(getCurrentUser()).resolves.toBeNull()
  })

  it('preserves a valid admin role from user metadata', async () => {
    mockGetUser({
      id: 'u1',
      email: 'admin@p-uspa.my',
      user_metadata: { role: 'admin', name: 'Aida' },
    })
    const user = await getCurrentUser()
    expect(user?.role).toBe('admin')
    expect(user?.name).toBe('Aida')
  })

  it('normalizes unknown roles to staff', async () => {
    mockGetUser({
      id: 'u2',
      email: 'staff@p-uspa.my',
      user_metadata: { role: 'superuser' },
    })
    await expect(getCurrentUser()).resolves.toMatchObject({ role: 'staff' })
  })

  it('normalizes developer role as-is', async () => {
    mockGetUser({
      id: 'u3',
      email: 'dev@p-uspa.my',
      user_metadata: { role: 'developer' },
    })
    await expect(getCurrentUser()).resolves.toMatchObject({ role: 'developer' })
  })

  it('falls back to the email local-part when no name is set', async () => {
    mockGetUser({ id: 'u4', email: 'ali@example.com' })
    await expect(getCurrentUser()).resolves.toMatchObject({ name: 'ali' })
  })
})

describe('requireAuth', () => {
  it('throws the Sesi tidak sah error when unauthenticated', async () => {
    mockGetUser(null)
    await expect(requireAuth()).rejects.toThrow('Sesi tidak sah. Sila log masuk semula.')
  })

  it('returns the user when authenticated', async () => {
    mockGetUser({
      id: 'u5',
      email: 'user@p-uspa.my',
      user_metadata: { role: 'staff', name: 'Zul' },
    })
    await expect(requireAuth()).resolves.toMatchObject({ id: 'u5', role: 'staff', name: 'Zul' })
  })
})

describe('requireRole', () => {
  it('throws Sesi tidak sah when unauthenticated, before role checks', async () => {
    mockGetUser(null)
    await expect(requireRole('staff')).rejects.toThrow('Sesi tidak sah. Sila log masuk semula.')
  })

  it('allows a staff user to pass requireRole("staff")', async () => {
    mockGetUser({ id: 'u6', email: 'staff@p-uspa.my', user_metadata: { role: 'staff' } })
    await expect(requireRole('staff')).resolves.toMatchObject({ role: 'staff' })
  })

  it('denies a staff user from requireRole("admin")', async () => {
    mockGetUser({ id: 'u7', email: 'staff@p-uspa.my', user_metadata: { role: 'staff' } })
    await expect(requireRole('admin')).rejects.toThrow('Akses ditolak. Peranan minimum: admin')
  })

  it('allows an admin user to pass requireRole("admin")', async () => {
    mockGetUser({ id: 'u8', email: 'admin@p-uspa.my', user_metadata: { role: 'admin' } })
    await expect(requireRole('admin')).resolves.toMatchObject({ role: 'admin' })
  })

  it('denies an admin user from requireRole("developer")', async () => {
    mockGetUser({ id: 'u9', email: 'admin@p-uspa.my', user_metadata: { role: 'admin' } })
    await expect(requireRole('developer')).rejects.toThrow(
      'Akses ditolak. Peranan minimum: developer'
    )
  })

  it('allows a developer user to pass any requireRole gate', async () => {
    mockGetUser({ id: 'u10', email: 'dev@p-uspa.my', user_metadata: { role: 'developer' } })
    await expect(requireRole('developer')).resolves.toMatchObject({ role: 'developer' })
  })
})
