import { describe, it, expect, vi } from 'vitest'

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn().mockImplementation((url, key, config) => {
    // Invoke cookies setAll and getAll to cover implementation
    if (config?.cookies?.getAll) {
      config.cookies.getAll()
    }
    if (config?.cookies?.setAll) {
      config.cookies.setAll([{ name: 'test', value: '123', options: {} }])
    }
    return {
      auth: {
        getUser: vi.fn().mockRejectedValue(new Error('Supabase Auth Connection Refused')),
      },
    }
  }),
}))

describe('Supabase Middleware Session Updater', () => {
  it('should gracefully handle Supabase auth getUser failure without crashing middleware', async () => {
    const { updateSession } = await import('./middleware')
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = 'test-key'

    const mockRequest = {
      nextUrl: {
        pathname: '/',
        clone: () => ({ pathname: '/' }),
      },
      cookies: {
        getAll: () => [],
        set: vi.fn(),
      },
    } as any

    const response = await updateSession(mockRequest)
    expect(response).toBeDefined()
  })
})
