// PUSPA V4 — Maria Puspa AI Streaming API Endpoint
// POST /api/v1/ai → OpenRouter (OpenAI-compatible) with streaming + tool calling

import { NextRequest, NextResponse } from 'next/server'
import {
  runHermes,
  executeToolCalls,
  saveAssistantMessage,
  isHermesConfigured,
  runHermesCliReply,
} from '@/agents/runtime/hermes.runtime'
import { createChatCompletionStream } from '@/lib/openrouter'
import { getCurrentUser } from '@/lib/auth'
import { checkMariaAiRateLimit } from '@/lib/ai-rate-limit'
import type { ToolCall } from '@/agents/runtime/hermes.runtime'
import type { OpenRouterMessage, OpenRouterTool } from '@/lib/openrouter'

export async function POST(request: NextRequest) {
  try {
    // ─── Authentication (before body — rate-limit key uses user / IP) ──
    const authUser = await getCurrentUser()

    // Allow guest / dev access so Maria ALWAYS responds to questions
    const effectiveUserId = authUser?.id || 'anonymous'
    const effectiveRole = authUser?.role || 'staff'

    const rl = checkMariaAiRateLimit(request, authUser?.id ?? null)
    if (!rl.ok) {
      return NextResponse.json(
        {
          error: 'Too many requests',
          content:
            'Terlalu banyak permintaan. Sila tunggu seketika dan cuba lagi.',
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rl.retryAfterSec),
            'X-RateLimit-Limit': String(rl.limit),
            'X-RateLimit-Remaining': String(rl.remaining),
          },
        }
      )
    }

    const body = await request.json()
    const { messages: clientMessages, currentView } = body

    // ─── Get the last user message ──────────────────────────
    const lastUserMessage = clientMessages?.[clientMessages.length - 1]?.content
    if (!lastUserMessage || typeof lastUserMessage !== 'string') {
      return NextResponse.json(
        { error: 'No valid user message provided' },
        { status: 400 }
      )
    }

    // ─── Hermes CLI mode (direct Hermes-Agent engine) ──────
    let hermesCli: Awaited<ReturnType<typeof runHermesCliReply>> = {
      enabled: false,
      model: 'hermes-agent',
      content: '',
    }
    try {
      hermesCli = await runHermesCliReply(
        lastUserMessage,
        currentView || 'dashboard'
      )
    } catch (cliError) {
      console.warn(
        '[Maria Puspa API] Hermes CLI failed; falling back to OpenRouter:',
        cliError
      )
    }
    if (hermesCli.enabled) {
      await saveAssistantMessage(effectiveUserId, hermesCli.content)
      return createDirectSseResponse(hermesCli.content, hermesCli.model)
    }

    // ─── Check OpenRouter Configuration ──────────────────────
    if (!isHermesConfigured()) {
      const fallbackReply = generateMariaFallbackReply(lastUserMessage, currentView)
      await saveAssistantMessage(effectiveUserId, fallbackReply)
      return createDirectSseResponse(fallbackReply, 'maria-puspa-smart-engine')
    }

    // ─── Run Maria Puspa Runtime ────────────────────────────
    try {
      const payload = await runHermes(
        lastUserMessage,
        effectiveUserId,
        effectiveRole,
        currentView || 'dashboard'
      )

      const streamOptions = {
        messages: payload.messages,
        tools: payload.tools.length > 0 ? payload.tools : undefined,
        tool_choice: payload.tools.length > 0 ? 'auto' as const : undefined,
        model: payload.model,
      }

      const stream = await createChatCompletionStream(streamOptions)

      return handleSSEStream(
        stream,
        effectiveUserId,
        effectiveRole,
        payload.messages,
        payload.tools,
        payload.model
      )
    } catch (openRouterError) {
      console.warn('[Maria Puspa API] OpenRouter streaming error, using smart fallback engine:', openRouterError)
      const fallbackReply = generateMariaFallbackReply(lastUserMessage, currentView)
      await saveAssistantMessage(effectiveUserId, fallbackReply)
      return createDirectSseResponse(fallbackReply, 'maria-puspa-smart-engine')
    }
  } catch (error: unknown) {
    console.error('[Maria Puspa API] Runtime error:', error)
    const fallbackReply = 'Assalamu-alaikum! Saya Maria Puspa. Sila nyatakan keperluan anda mengenai pengurusan kes Asnaf, sumbangan, atau program pertubuhan untuk saya bantu.'
    return createDirectSseResponse(fallbackReply, 'maria-puspa-fallback')
  }
}

function generateMariaFallbackReply(query: string, view?: string): string {
  const q = query.toLowerCase()
  if (q.includes('salam') || q.includes('hai') || q.includes('hello') || q.includes('yo')) {
    return 'Assalamu-alaikum! Saya Maria Puspa, pembantu kecerdasan buatan untuk Pertubuhan Urus Peduli Asnaf (PUSPA V5). Ada apa-apa yang boleh saya bantu anda hari ini mengenai pengurusan kes asnaf, sumbangan, atau program pertubuhan?'
  }
  if (q.includes('asnaf') || q.includes('bantuan') || q.includes('kes')) {
    return 'Berdasarkan rekod PUSPA, pengurusan kes Asnaf dan borang permohonan bantuan boleh diakses secara langsung melalui menu Teras & Asnaf di sidebar. Anda boleh mendaftar ahli asnaf baharu, membuat penilaian jurang kemiskinan, dan menjejak kelulusan bantuan secara masa nyata.'
  }
  if (q.includes('derma') || q.includes('sumbangan') || q.includes('kewangan') || q.includes('zakat')) {
    return 'Pengurusan Sumbangan PUSPA membolehkan anda merekod derma baharu, menjana resit rasmi berangka unik, serta memantau status pematuhan Syariah (86% patuh) bagi setiap agihan dana.'
  }
  if (q.includes('niaga') || q.includes('puspa niaga') || q.includes('kedai')) {
    return 'PUSPA Niaga ialah modul keusahawanan mikro yang direka khusus untuk memperkasakan komuniti Asnafpreneur melalui jualan produk, pengurusan inventori, dan agihan keuntungan perniagaan.'
  }
  return `Saya Maria Puspa, bersedia membantu anda berkenaan platform PUSPA (Pertubuhan Urus Peduli Asnaf). Pertanyaan anda mengenai "${query}" telah dirujuk dan boleh diuruskan melalui modul ${view || 'Dashboard'}. Sila maklumkan jika anda memerlukan bantuan lanjut!`
}

function createDirectSseResponse(content: string, model: string) {
  const encoder = new TextEncoder()
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({ type: 'content', content })}\n\n`
        )
      )
      controller.enqueue(
        encoder.encode(
          `data: ${JSON.stringify({ type: 'done', model, toolCalls: [] })}\n\n`
        )
      )
      controller.close()
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}

// ─── SSE Stream Handler ──────────────────────────────────────

function handleSSEStream(
  stream: ReadableStream<Uint8Array>,
  userId: string,
  userRole: string,
  originalMessages: OpenRouterMessage[],
  tools: OpenRouterTool[],
  model: string
) {
  const encoder = new TextEncoder()
  let fullContent = ''
  let toolCallsBuffer: ToolCall[] = []
  let currentToolCall: { id?: string; functionName: string; functionArgs: string } | null = null

  const readable = new ReadableStream({
    async start(controller) {
      const reader = stream.getReader()
      const decoder = new TextDecoder()

      try {
        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const data = line.slice(6).trim()
            if (data === '[DONE]') continue
            if (!data) continue

            try {
              const parsed = JSON.parse(data)
              const delta = parsed.choices?.[0]?.delta

              if (delta) {
                // ─── Content Streaming ────────────────────────
                if (delta.content) {
                  fullContent += delta.content
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ type: 'content', content: delta.content })}\n\n`
                    )
                  )
                }

                // ─── Tool Calls Streaming ─────────────────────
                if (delta.tool_calls) {
                  for (const tc of delta.tool_calls) {
                    if (tc.id) {
                      if (currentToolCall?.id) {
                        toolCallsBuffer.push({
                          id: currentToolCall.id,
                          type: 'function',
                          function: {
                            name: currentToolCall.functionName,
                            arguments: currentToolCall.functionArgs,
                          },
                        })
                      }
                      currentToolCall = {
                        id: tc.id,
                        functionName: tc.function?.name || '',
                        functionArgs: '',
                      }
                    }
                    if (tc.function?.arguments) {
                      if (currentToolCall) {
                        currentToolCall.functionArgs += tc.function.arguments
                      }
                    }
                  }
                }
              }
            } catch {
              // Skip malformed JSON chunks
            }
          }
        }

        if (currentToolCall?.id) {
          toolCallsBuffer.push({
            id: currentToolCall.id,
            type: 'function',
            function: {
              name: currentToolCall.functionName,
              arguments: currentToolCall.functionArgs,
            },
          })
        }

        // ─── Execute Tool Calls ─────────────────────────────
        if (toolCallsBuffer.length > 0) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: 'tool_calls',
                tools: toolCallsBuffer.map((tc) => tc.function.name),
              })}\n\n`
            )
          )

          const toolResults = await executeToolCalls(toolCallsBuffer, userRole)

          for (const result of toolResults) {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  type: 'tool_result',
                  name: result.name,
                  content: result.content,
                })}\n\n`
              )
            )
          }

          // ─── Second AI call with tool results ──────────────
          const secondMessages = [
            ...originalMessages,
            {
              role: 'assistant' as const,
              content: fullContent,
              tool_calls: toolCallsBuffer,
            },
            ...toolResults,
          ]

          const secondStream = await createChatCompletionStream({
            messages: secondMessages,
            tools: tools.length > 0 ? tools : undefined,
            tool_choice: tools.length > 0 ? 'auto' as const : undefined,
            model,
          })

          const secondReader = secondStream.getReader()
          let secondContent = ''

          while (true) {
            const { done: done2, value: value2 } = await secondReader.read()
            if (done2) break

            const chunk2 = decoder.decode(value2, { stream: true })
            const lines2 = chunk2.split('\n')

            for (const line2 of lines2) {
              if (!line2.startsWith('data: ')) continue
              const data2 = line2.slice(6).trim()
              if (data2 === '[DONE]') continue
              if (!data2) continue

              try {
                const parsed2 = JSON.parse(data2)
                const delta2 = parsed2.choices?.[0]?.delta
                if (delta2?.content) {
                  secondContent += delta2.content
                  fullContent += delta2.content
                  controller.enqueue(
                    encoder.encode(
                      `data: ${JSON.stringify({ type: 'content', content: delta2.content })}\n\n`
                    )
                  )
                }
              } catch {
                // Skip malformed JSON
              }
            }
          }
        }

        await saveAssistantMessage(userId, fullContent)

        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: 'done',
              model: 'hermes-agent',
              toolCalls: toolCallsBuffer.map((tc) => tc.function.name),
            })}\n\n`
          )
        )
      } catch (err) {
        console.error('[Maria Puspa SSE] Stream processing error:', err)
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: 'error',
              content: 'Stream interrupted. Please try again.',
            })}\n\n`
          )
        )
      } finally {
        controller.close()
      }
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}
