import { describe, expect, it } from 'vitest'
import {
  badRequestError,
  buildPaginationMeta,
  createdResponse,
  errorResponse,
  forbiddenError,
  internalServerError,
  notFoundError,
  parsePagination,
  parseSort,
  rateLimitError,
  requireBody,
  safeParseBody,
  sanitizeSearch,
  successResponse,
  unauthorizedError,
} from './api-utils'

describe('parsePagination', () => {
  it('returns defaults when no params are provided', () => {
    const result = parsePagination({})
    expect(result).toEqual({ page: 1, pageSize: 20, skip: 0, take: 20 })
  })

  it('falls back to page 1 for NaN, zero, and negative pages', () => {
    expect(parsePagination({ page: 'abc' }).page).toBe(1)
    expect(parsePagination({ page: '0' }).page).toBe(1)
    expect(parsePagination({ page: '-5' }).page).toBe(1)
  })

  it('caps absurdly large pages at 10000', () => {
    const result = parsePagination({ page: '999999' })
    expect(result.page).toBe(10000)
    expect(result.skip).toBe((10000 - 1) * result.pageSize)
  })

  it('falls back to default pageSize for NaN, zero, and negative sizes', () => {
    expect(parsePagination({ pageSize: 'abc' }).pageSize).toBe(20)
    expect(parsePagination({ pageSize: '0' }).pageSize).toBe(20)
    expect(parsePagination({ pageSize: '-1' }).pageSize).toBe(20)
  })

  it('caps pageSize at MAX_PAGE_SIZE (100)', () => {
    const result = parsePagination({ pageSize: '500' })
    expect(result.pageSize).toBe(100)
    expect(result.take).toBe(100)
  })

  it('computes skip and take correctly', () => {
    const result = parsePagination({ page: '3', pageSize: '10' })
    expect(result).toEqual({ page: 3, pageSize: 10, skip: 20, take: 10 })
  })

  it('accepts URLSearchParams input', () => {
    const params = new URLSearchParams('page=2&pageSize=50')
    const result = parsePagination(params)
    expect(result).toEqual({ page: 2, pageSize: 50, skip: 50, take: 50 })
  })
})

describe('buildPaginationMeta', () => {
  const params = { page: 1, pageSize: 20, skip: 0, take: 20 }

  it('returns at least 1 total page for zero items', () => {
    const meta = buildPaginationMeta(0, params)
    expect(meta.totalPages).toBe(1)
    expect(meta.hasNextPage).toBe(false)
    expect(meta.hasPreviousPage).toBe(false)
  })

  it('computes totalPages, hasNextPage and hasPreviousPage', () => {
    const meta = buildPaginationMeta(100, params)
    expect(meta.totalPages).toBe(5)
    expect(meta.hasNextPage).toBe(true)
    expect(meta.hasPreviousPage).toBe(false)
  })

  it('marks hasPreviousPage on later pages and hasNextPage false on last page', () => {
    const lastPage = buildPaginationMeta(100, { ...params, page: 5 })
    expect(lastPage.hasNextPage).toBe(false)
    expect(lastPage.hasPreviousPage).toBe(true)
  })
})

describe('sanitizeSearch', () => {
  it('returns undefined for null, undefined, and empty strings', () => {
    expect(sanitizeSearch(null)).toBeUndefined()
    expect(sanitizeSearch(undefined)).toBeUndefined()
    expect(sanitizeSearch('')).toBeUndefined()
    expect(sanitizeSearch('   ')).toBeUndefined()
  })

  it('trims surrounding whitespace', () => {
    expect(sanitizeSearch('  ali  ')).toBe('ali')
  })

  it('truncates values longer than maxLength (default 200)', () => {
    const long = 'a'.repeat(300)
    const result = sanitizeSearch(long)
    expect(result).toBe('a'.repeat(200))
    expect(result?.length).toBe(200)
  })

  it('respects a custom maxLength', () => {
    expect(sanitizeSearch('abcdef', 3)).toBe('abc')
  })
})

describe('parseSort', () => {
  it('returns defaults when no params are provided', () => {
    expect(parseSort({})).toEqual({ sortBy: 'createdAt', sortOrder: 'desc' })
  })

  it('accepts a valid sortBy/sortOrder pair', () => {
    expect(parseSort({ sortBy: 'name', sortOrder: 'asc' })).toEqual({
      sortBy: 'name',
      sortOrder: 'asc',
    })
  })

  it('falls back to default sortOrder when the direction is invalid', () => {
    const result = parseSort({ sortBy: 'name', sortOrder: 'sideways' })
    expect(result.sortOrder).toBe('desc')
  })

  it('falls back to default sortBy when sortBy is not in the whitelist', () => {
    const result = parseSort({ sortBy: 'id; drop table' }, ['name', 'createdAt'])
    expect(result.sortBy).toBe('createdAt')
  })

  it('keeps sortBy when it is in the whitelist', () => {
    const result = parseSort({ sortBy: 'name', sortOrder: 'asc' }, ['name', 'createdAt'])
    expect(result.sortBy).toBe('name')
    expect(result.sortOrder).toBe('asc')
  })
})

describe('error responses', () => {
  it('errorResponse returns the status and error envelope', async () => {
    const res = errorResponse('not_found', 'Case not found', 404)
    expect(res.status).toBe(404)
    await expect(res.json()).resolves.toEqual({ error: 'not_found', message: 'Case not found' })
  })

  it('errorResponse includes details and code only when provided', async () => {
    const res = errorResponse('validation_error', 'Invalid input', 400, { fields: ['amount'] }, 'E100')
    const body = await res.json()
    expect(body).toEqual({
      error: 'validation_error',
      message: 'Invalid input',
      details: { fields: ['amount'] },
      code: 'E100',
    })
  })

  it('convenience helpers map to the right status codes', () => {
    expect(badRequestError().status).toBe(400)
    expect(unauthorizedError().status).toBe(401)
    expect(forbiddenError().status).toBe(403)
    expect(notFoundError().status).toBe(404)
    expect(internalServerError().status).toBe(500)
    expect(rateLimitError().status).toBe(429)
  })

  it('rateLimitError passes through headers', () => {
    const res = rateLimitError('Slow down', new Headers({ 'X-RateLimit-Remaining': '0' }))
    expect(res.headers.get('X-RateLimit-Remaining')).toBe('0')
    expect(res.headers.get('Content-Type')).toContain('application/json')
  })
})

describe('success responses', () => {
  it('successResponse wraps data and omits optional fields', async () => {
    const res = successResponse([1, 2])
    expect(res.status).toBe(200)
    await expect(res.json()).resolves.toEqual({ data: [1, 2] })
  })

  it('successResponse includes message and meta when provided', async () => {
    const res = successResponse({ id: 'x' }, 'Fetched', { total: 1 })
    const body = await res.json()
    expect(body).toEqual({ data: { id: 'x' }, message: 'Fetched', meta: { total: 1 } })
  })

  it('createdResponse returns 201', () => {
    expect(createdResponse({ id: 'y' }).status).toBe(201)
  })
})

describe('request body parsing', () => {
  it('safeParseBody parses valid JSON', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ a: 1 }),
    })
    await expect(safeParseBody(req)).resolves.toEqual({ a: 1 })
  })

  it('safeParseBody returns null for invalid JSON', async () => {
    const req = new Request('http://localhost', { method: 'POST', body: 'not json' })
    await expect(safeParseBody(req)).resolves.toBeNull()
  })

  it('requireBody returns the parsed data', async () => {
    const req = new Request('http://localhost', {
      method: 'POST',
      body: JSON.stringify({ name: 'ali' }),
    })
    const result = await requireBody(req)
    expect(result).toEqual({ data: { name: 'ali' } })
  })

  it('requireBody returns a 400 error response for invalid JSON', async () => {
    const req = new Request('http://localhost', { method: 'POST', body: 'nope' })
    const result = await requireBody(req)
    expect('error' in result).toBe(true)
    if ('error' in result) {
      expect(result.error.status).toBe(400)
      await expect(result.error.json()).resolves.toEqual({
        error: 'bad_request',
        message: 'Invalid JSON body',
      })
    }
  })
})
