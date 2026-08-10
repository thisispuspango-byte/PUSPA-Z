// PUSPA V5 — OpenRouter Client
// Handles API calls to OpenRouter with automatic key rotation
// Docs: https://openrouter.ai/docs/quickstart
// OpenRouter is fully OpenAI-compatible (chat completions + tool calling + streaming)

const OPENROUTER_BASE_URL = process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1'
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL || 'openai/gpt-4o-mini'
const OPENROUTER_APP_NAME = process.env.OPENROUTER_APP_NAME || 'PUSPA V5'
const OPENROUTER_APP_URL = process.env.OPENROUTER_APP_URL || 'http://localhost:3000'

// ─── Key Rotation ────────────────────────────────────────────

// Support multiple key formats: OPENROUTER_API_KEY or OPENROUTER_API_KEY_1, _2, etc.
const API_KEYS = [
  process.env.OPENROUTER_API_KEY,  // Single key (preferred)
  process.env.OPENROUTER_API_KEY_1,
  process.env.OPENROUTER_API_KEY_2,
  process.env.OPENROUTER_API_KEY_3,
  process.env.OPENROUTER_API_KEY_4,
].filter(Boolean) as string[]

if (API_KEYS.length === 0) {
  console.warn('[OpenRouter] WARNING: No API keys configured in .env')
} else {
  console.log(`[OpenRouter] ${API_KEYS.length} API key(s) loaded`)
}

// ─── Free Model Fallback Chain ─────────────────────────────────
// All 28 free models from OpenRouter, organized by tier.
// Priority: Tier 1 (general) → Tier 2 (coding) → Tier 3 (vision) → Tier 4 (fallback)
// Selection per task type:
//   General/chat    → Tier 1 (tencent/hy3-preview:free default)
//   Coding          → Tier 2 (qwen/qwen3-coder:free)
//   Vision/image    → Tier 3 (google/gemma-4-26b-a4b-it:free)
//   Debugging       → Tier 4 (meta-llama/llama-3.3-70b-instruct:free)
//   Docs/marketing  → Tier 1 (minimax/minimax-m2.5:free)

const FREE_MODELS = [
  // ── TIER 1: General Purpose (proven working) ──
  process.env.OPENROUTER_MODEL || 'tencent/hy3-preview:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
  'minimax/minimax-m2.5:free',
  'openrouter/free',

  // ── TIER 2: Coding Specialized ──
  'qwen/qwen3-coder:free',
  'openai/gpt-oss-120b:free',
  'baidu/cobuddy:free',

  // ── TIER 3: Vision/Multimodal (image input capable) ──
  'google/gemma-4-26b-a4b-it:free',
  'google/gemma-4-31b-it:free',
  'google/lyria-3-pro-preview',
  'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
  'nvidia/nemotron-nano-12b-v2-vl:free',
  'openrouter/free',
  'baidu/qianfan-ocr-fast:free',

  // ── TIER 4: Additional Free Models ──
  'openai/gpt-oss-20b:free',
  'nousresearch/hermes-3-llama-3.1-405b:free',
  'z-ai/glm-4.5-air:free',
  'meta-llama/llama-3.2-3b-instruct:free',
  'qwen/qwen3-next-80b-a3b-instruct:free',
  'nvidia/nemotron-3-nano-30b-a3b:free',
  'nvidia/nemotron-nano-9b-v2:free',
  'poolside/laguna-xs.2:free',
  'poolside/laguna-m.1:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'liquid/lfm-2.5-1.2b-thinking:free',
  'liquid/lfm-2.5-1.2b-instruct:free',
  'cognitivecomputations/dolphin-mistral-24b-venice-edition:free',
]

// Legacy alias for backward compatibility
const MODEL_FALLBACK_CHAIN = FREE_MODELS

let currentModelIndex = 0

function getNextModel(): string {
  const model = FREE_MODELS[currentModelIndex % FREE_MODELS.length]
  return model
}

function rotateModel(): void {
  if (FREE_MODELS.length > 1) {
    currentModelIndex = (currentModelIndex + 1) % FREE_MODELS.length
    console.log(`[OpenRouter] Rotated to model: ${FREE_MODELS[currentModelIndex]}`)
  }
}

// ─── Vision Model ──────────────────────────────────────────────
// Default vision model (Tier 3). Override via OPENROUTER_VISION_MODEL env var.
// Falls back to OpenRouter vision models when Google Generative Language API is unavailable.

const VISION_MODEL = process.env.OPENROUTER_VISION_MODEL || 'google/gemma-4-26b-a4b-it:free'

export function getVisionModel(): string {
  return VISION_MODEL
}

let currentKeyIndex = 0

function getNextKey(): string {
  if (API_KEYS.length === 0) {
    throw new Error('No OpenRouter API keys configured')
  }
  const key = API_KEYS[currentKeyIndex % API_KEYS.length]
  return key
}

function rotateKey(): void {
  if (API_KEYS.length > 1) {
    currentKeyIndex = (currentKeyIndex + 1) % API_KEYS.length
    console.log(`[OpenRouter] Rotated to key index ${currentKeyIndex}`)
  }
}

// ─── Build Headers (per OpenRouter docs) ─────────────────────
// Authorization: Bearer <KEY>
// HTTP-Referer: <YOUR_SITE_URL> (optional, for rankings)
// X-OpenRouter-Title: <YOUR_SITE_NAME> (optional, for rankings)

function buildHeaders(apiKey: string): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  }

  // Optional headers per OpenRouter docs — for app attribution/rankings
  if (OPENROUTER_APP_URL) {
    headers['HTTP-Referer'] = OPENROUTER_APP_URL
  }
  if (OPENROUTER_APP_NAME) {
    headers['X-OpenRouter-Title'] = OPENROUTER_APP_NAME
  }

  return headers
}

// ─── Types ───────────────────────────────────────────────────

export interface OpenRouterMessage {
  role: 'system' | 'user' | 'assistant' | 'tool'
  content: string
  tool_call_id?: string
  name?: string
  tool_calls?: OpenRouterToolCall[]
}

export interface OpenRouterToolCall {
  id: string
  type: 'function'
  function: {
    name: string
    arguments: string
  }
}

export interface OpenRouterTool {
  type: 'function'
  function: {
    name: string
    description: string
    parameters: Record<string, unknown>
  }
}

export interface OpenRouterChatOptions {
  messages: OpenRouterMessage[]
  tools?: OpenRouterTool[]
  tool_choice?: 'auto' | 'none' | { type: 'function'; function: { name: string } }
  stream?: boolean
  model?: string
  temperature?: number
  max_tokens?: number
}

// ─── Retry Logic ─────────────────────────────────────────────

const MAX_RETRIES = 2

// ─── Chat Completion (Non-Streaming) ─────────────────────────

export async function createChatCompletion(options: OpenRouterChatOptions, retryCount = 0) {
  const apiKey = getNextKey()
  const model = options.model || OPENROUTER_MODEL

  const body: Record<string, unknown> = {
    model,
    messages: options.messages,
    temperature: options.temperature ?? 0.7,
    max_tokens: options.max_tokens ?? 2048,
  }

  if (options.tools && options.tools.length > 0) {
    body.tools = options.tools
    body.tool_choice = options.tool_choice || 'auto'
  }

  try {
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: buildHeaders(apiKey),
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[OpenRouter] API error ${response.status}: ${errorText}`)

      // If rate limited or server error, rotate key and retry
      if (response.status === 429 || response.status >= 500) {
        rotateKey()
        if (retryCount < MAX_RETRIES) {
          console.log(`[OpenRouter] Retrying (${retryCount + 1}/${MAX_RETRIES})...`)
          return createChatCompletion(options, retryCount + 1)
        }
      }

      throw new Error(`OpenRouter API error ${response.status}: ${errorText}`)
    }

    return await response.json()
  } catch (error) {
    console.error('[OpenRouter] Request failed:', error)
    throw error
  }
}

// ─── Chat Completion (Streaming) ─────────────────────────────
// Per OpenRouter docs: Set stream: true for SSE responses

export async function createChatCompletionStream(options: OpenRouterChatOptions, retryCount = 0) {
  const apiKey = getNextKey()
  const model = options.model || OPENROUTER_MODEL

  const body: Record<string, unknown> = {
    model,
    messages: options.messages,
    stream: true,
    temperature: options.temperature ?? 0.7,
    max_tokens: options.max_tokens ?? 2048,
  }

  if (options.tools && options.tools.length > 0) {
    body.tools = options.tools
    body.tool_choice = options.tool_choice || 'auto'
  }

  try {
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: buildHeaders(apiKey),
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[OpenRouter] Stream error ${response.status}: ${errorText}`)

      // If rate limited or server error, rotate key and retry
      if (response.status === 429 || response.status >= 500) {
        rotateKey()
        if (retryCount < MAX_RETRIES) {
          console.log(`[OpenRouter] Retrying stream (${retryCount + 1}/${MAX_RETRIES})...`)
          return createChatCompletionStream(options, retryCount + 1)
        }
      }

      throw new Error(`OpenRouter stream error ${response.status}: ${errorText}`)
    }

    return response.body as ReadableStream<Uint8Array>
  } catch (error) {
    console.error('[OpenRouter] Stream request failed:', error)
    throw error
  }
}

// ─── Utility ─────────────────────────────────────────────────

export function getConfiguredModel(): string {
  return OPENROUTER_MODEL
}

export function getKeyCount(): number {
  return API_KEYS.length
}

export function isConfigured(): boolean {
  return API_KEYS.length > 0
}
