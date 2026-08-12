// PUSPA V5 — Generic in-memory rate limiting for API route handlers.
//
// Fixed-window limiter keyed per user id (when authenticated) or per IP
// (otherwise). Dependency-free: state lives in a module-level Map, which is
// best-effort per server instance (fine for a single-instance Vercel/Node
// deployment).
//
// Multi-instance note: to make limits global across replicas, replace the
// `buckets` Map with a shared store (Vercel KV / Redis / Upstash) using the
// same `key` string returned by rateLimitKey(). The rest of the logic is
// store-agnostic.

import type { NextRequest } from 'next/server'

/** A single fixed-window bucket per key. */
interface Bucket {
  count: number
  windowStart: number
  windowMs: number
}

const buckets = new Map<string, Bucket>()

function envInt(key: string, fallback: number): number {
  const raw = process.env[key]
  if (raw === undefined || raw === '') return fallback
  const n = Number.parseInt(raw, 10)
  return Number.isFinite(n) && n > 0 ? n : fallback
}

/** Built-in presets; each can be overridden via env for tuning without a deploy. */
export function rateLimitPreset(preset: 'read' | 'write'): { limit: number; windowMs: number } {
  if (preset === 'write') {
    return {
      limit: envInt('PUSPA_RATE_WRITE_LIMIT', 20), // 20 req/min (mutations)
      windowMs: envInt('PUSPA_RATE_WRITE_WINDOW_MS', 60_000),
    }
  }
  return {
    limit: envInt('PUSPA_RATE_READ_LIMIT', 100), // 100 req/min (reads)
    windowMs: envInt('PUSPA_RATE_READ_WINDOW_MS', 60_000),
  }
}

/** Per-route override, e.g. { limit: 10, windowMs: 60_000 } for a public form. */
export interface RateLimitOptions {
  limit: number
  windowMs: number
}

export type RateLimitPresetOrOptions = 'read' | 'write' | Partial<RateLimitOptions>

export interface RateLimitResult {
  ok: boolean
  limit: number
  remaining: number
  /** Seconds until the window resets (0 when allowed). */
  retryAfterSec: number
}

function isValidIp(ip: string): boolean {
  const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){1,7}[0-9a-fA-F]{1,4}$|^::1$|^[0-9a-fA-F:]+$/
  return (ipv4Regex.test(ip) || ipv6Regex.test(ip)) && ip.length <= 45
}

/**
 * Extracts and sanitizes client IP address from request headers.
 * Prevents IP spoofing by prioritizing trusted proxy headers (cf-connecting-ip, x-real-ip)
 * and picking the rightmost valid IP address appended by trusted edge proxies in X-Forwarded-For.
 */
export function getSanitizedClientIp(request: NextRequest): string {
  const cfIp = request.headers.get('cf-connecting-ip')?.trim()
  if (cfIp && isValidIp(cfIp)) return cfIp

  const realIp = request.headers.get('x-real-ip')?.trim()
  if (realIp && isValidIp(realIp)) return realIp

  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const ips = forwarded
      .split(',')
      .map((item) => item.trim())
      .filter((ip) => ip && isValidIp(ip))

    // Use rightmost valid IP appended by trusted edge load balancer / reverse proxy
    if (ips.length > 0) {
      return ips[ips.length - 1]
    }
  }

  return 'unknown'
}

/** Key = user id when authenticated, otherwise client IP (sanitized against spoofing). */
export function rateLimitKey(
  request: NextRequest,
  userId?: string | null
): string {
  if (userId && userId !== 'anonymous') return `u:${userId}`
  const ip = getSanitizedClientIp(request)
  return `ip:${ip}`
}

let lastSweep = 0
const SWEEP_INTERVAL_MS = 60_000

/** Drop expired buckets periodically so the Map can't grow unbounded. */
function sweepExpired(now: number): void {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return
  lastSweep = now
  for (const [key, bucket] of buckets) {
    if (now - bucket.windowStart >= bucket.windowMs) {
      buckets.delete(key)
    }
  }
}

/**
 * Check the rate limit for a request. Consumes one unit when allowed.
 *
 * @example
 *   // default read preset (100 req/min per user/IP)
 *   const rl = checkRateLimit(request, 'read', user?.id)
 *   // default write preset (20 req/min)
 *   const rl = checkRateLimit(request, 'write', user?.id)
 *   // custom limits for a specific route
 *   const rl = checkRateLimit(request, { limit: 10, windowMs: 60_000 })
 */
export function checkRateLimit(
  request: NextRequest,
  presetOrOptions: RateLimitPresetOrOptions = 'read',
  userId?: string | null
): RateLimitResult {
  const { limit, windowMs } =
    presetOrOptions === 'read' || presetOrOptions === 'write'
      ? rateLimitPreset(presetOrOptions)
      : {
          limit: presetOrOptions.limit ?? 100,
          windowMs: presetOrOptions.windowMs ?? 60_000,
        }

  const key = rateLimitKey(request, userId)
  const now = Date.now()
  sweepExpired(now)

  let bucket = buckets.get(key)

  if (!bucket || now - bucket.windowStart >= bucket.windowMs) {
    bucket = { count: 0, windowStart: now, windowMs }
    buckets.set(key, bucket)
  }

  const retryAfterSec = Math.max(
    1,
    Math.ceil((bucket.windowStart + bucket.windowMs - now) / 1000)
  )

  if (bucket.count >= limit) {
    return { ok: false, limit, remaining: 0, retryAfterSec }
  }

  bucket.count += 1
  return {
    ok: true,
    limit,
    remaining: Math.max(0, limit - bucket.count),
    retryAfterSec: 0,
  }
}

/** Headers to attach to a 429 response (or any response, to advertise quota). */
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': String(result.limit),
    'X-RateLimit-Remaining': String(result.remaining),
    'Retry-After': String(Math.max(1, result.retryAfterSec)),
  }
}
