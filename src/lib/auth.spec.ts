import { describe, it, expect, vi } from 'vitest'
import { AuthError, getCurrentUser, requireAuth, requireRole } from './auth'

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn().mockResolvedValue({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
    },
  }),
}))

describe('Auth Utilities', () => {
  it('should instantiate AuthError with default 401 status', () => {
    const err = new AuthError('Unauthorized test')
    expect(err.message).toBe('Unauthorized test')
    expect(err.status).toBe(401)
    expect(err.name).toBe('AuthError')
  })

  it('should return null from getCurrentUser when no user in session', async () => {
    const user = await getCurrentUser()
    expect(user).toBeNull()
  })

  it('should throw AuthError 401 in requireAuth when unauthenticated', async () => {
    await expect(requireAuth()).rejects.toThrow('Sesi tidak sah')
  })

  it('should throw AuthError 401 in requireRole when unauthenticated', async () => {
    await expect(requireRole('staff')).rejects.toThrow('Sesi tidak sah')
  })
})
