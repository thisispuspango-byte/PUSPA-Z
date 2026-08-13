import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getConversationHistory, saveMessage, clearConversationHistory } from './memory'
import { db } from '@/lib/db'

// Mock the db dependency
vi.mock('@/lib/db', () => {
  return {
    db: {
      aIMemory: {
        findMany: vi.fn(),
        create: vi.fn(),
        deleteMany: vi.fn(),
      }
    }
  }
})

describe('Memory Layer', () => {
  const originalConsoleWarn = console.warn

  beforeEach(() => {
    vi.useFakeTimers()
    // Suppress console.warn during tests
    console.warn = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    console.warn = originalConsoleWarn
    // Clear mock data
    vi.clearAllMocks()
  })

  it('should use DB if available', async () => {
    // Advance time to bypass DB_CHECK_TTL
    vi.setSystemTime(Date.now() + 60001)

    vi.mocked(db.aIMemory.findMany).mockResolvedValueOnce([]) // for checkDbAvailable
    vi.mocked(db.aIMemory.findMany).mockResolvedValueOnce([
      { userId: 'user1', role: 'user', content: 'hello', createdAt: new Date(), id: '1' }
    ])

    const history = await getConversationHistory('user1')

    expect(db.aIMemory.findMany).toHaveBeenCalledTimes(2)
    expect(history).toEqual([{ role: 'user', content: 'hello' }])
  })

  it('should fallback to in-memory if checkDbAvailable fails', async () => {
    // Advance time to bypass DB_CHECK_TTL
    vi.setSystemTime(Date.now() + 60001)

    // DB check fails
    vi.mocked(db.aIMemory.findMany).mockRejectedValueOnce(new Error('DB connection failed'))

    // Save a message (will use in-memory store)
    await saveMessage('user2', 'user', 'fallback message')

    // Retrieve history (will use in-memory store)
    const history = await getConversationHistory('user2')

    expect(history).toEqual([{ role: 'user', content: 'fallback message' }])
    expect(console.warn).toHaveBeenCalledWith('[Memory] Database unavailable, using in-memory fallback')
  })

  it('should fallback to in-memory if DB fails mid-query during getConversationHistory', async () => {
    // Advance time to bypass DB_CHECK_TTL
    vi.setSystemTime(Date.now() + 60001)

    vi.mocked(db.aIMemory.findMany).mockResolvedValueOnce([]) // checkDbAvailable succeeds
    vi.mocked(db.aIMemory.findMany).mockRejectedValueOnce(new Error('DB failed mid-query')) // query fails

    const history = await getConversationHistory('user3')

    expect(history).toEqual([]) // falls back to empty in-memory store
    expect(console.warn).toHaveBeenCalledWith('[Memory] DB query failed, using in-memory fallback')
  })

  it('should fallback to in-memory if DB fails during saveMessage', async () => {
    // Advance time to bypass DB_CHECK_TTL
    vi.setSystemTime(Date.now() + 60001)

    vi.mocked(db.aIMemory.findMany).mockResolvedValueOnce([]) // checkDbAvailable succeeds
    vi.mocked(db.aIMemory.create).mockRejectedValueOnce(new Error('DB write failed'))

    await saveMessage('user4', 'user', 'save fail fallback')

    // Force failure on next check as well to read from in-memory, or just let it succeed and see that it's empty in DB?
    // Actually, getConversationHistory doesn't read from in-memory if DB succeeds. So we just verify console.warn for now.
    expect(console.warn).toHaveBeenCalledWith('[Memory] DB write failed, using in-memory fallback')
  })

  it('should clear in-memory history when clearConversationHistory is called', async () => {
    // Advance time to bypass DB_CHECK_TTL
    vi.setSystemTime(Date.now() + 60001)

    vi.mocked(db.aIMemory.findMany).mockRejectedValueOnce(new Error('DB offline')) // use in-memory

    await saveMessage('user5', 'user', 'to be cleared')
    let history = await getConversationHistory('user5')
    expect(history.length).toBe(1)

    await clearConversationHistory('user5')
    history = await getConversationHistory('user5')
    expect(history.length).toBe(0)
  })

  it('should trim in-memory store when it exceeds 2x MAX_HISTORY', async () => {
    // Advance time to bypass DB_CHECK_TTL
    vi.setSystemTime(Date.now() + 60001)

    // DB check fails
    vi.mocked(db.aIMemory.findMany).mockRejectedValueOnce(new Error('DB offline'))

    // MAX_HISTORY is 50. Save 101 messages to trigger the trimming
    for (let i = 0; i < 101; i++) {
      await saveMessage('user_trim', 'user', `msg ${i}`)
    }

    const history = await getConversationHistory('user_trim')
    expect(history.length).toBe(50) // MAX_HISTORY
    expect(history[0].content).toBe('msg 51') // Trims to last 50
  })

  it('should handle DB failures in clearConversationHistory', async () => {
    // Advance time to bypass DB_CHECK_TTL
    vi.setSystemTime(Date.now() + 60001)

    vi.mocked(db.aIMemory.findMany).mockResolvedValueOnce([]) // DB available
    vi.mocked(db.aIMemory.deleteMany).mockRejectedValueOnce(new Error('DB delete error'))

    await clearConversationHistory('user_err')
    expect(console.warn).toHaveBeenCalledWith('[Memory] DB clear failed')
  })
})
