import { describe, it, expect, vi } from 'vitest'

vi.mock('next/headers', () => ({
  cookies: vi.fn().mockResolvedValue({
    getAll: vi.fn().mockReturnValue([{ name: 'test-cookie', value: '123' }]),
    set: vi.fn().mockImplementation(() => {
      throw new Error('Server Component read-only cookies')
    }),
  }),
}))

vi.mock('@supabase/ssr', () => ({
  createServerClient: vi.fn().mockImplementation((url, key, config) => {
    // Execute cookies.setAll handler to test try/catch error path
    if (config?.cookies?.setAll) {
      config.cookies.setAll([{ name: 'session', value: 'xyz', options: {} }])
    }
    if (config?.cookies?.getAll) {
      config.cookies.getAll()
    }
    return { auth: { getUser: vi.fn() } }
  }),
}))

describe('Supabase Server Client', () => {
  it('should create server client and safely catch setAll errors in Server Components', async () => {
    const { createClient } = await import('./server')
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = 'test-key'

    const client = await createClient()
    expect(client).toBeDefined()
    expect(client.auth).toBeDefined()
  })
})
