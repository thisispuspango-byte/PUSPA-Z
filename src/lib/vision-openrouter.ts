// PUSPA V5 — OpenRouter Vision Client
// Fallback for vision_analyze when Google Generative Language API is unavailable.
// Uses OpenRouter free vision-capable models.
//
// Usage:
//   import { analyzeImageWithOpenRouter } from '@/lib/vision-openrouter'
//   const description = await analyzeImageWithOpenRouter('/path/to/image.jpg', 'Describe this image')

import { readFile } from 'fs/promises'
import { createChatCompletion, getVisionModel } from './openrouter'

/**
 * Analyze an image using OpenRouter vision models.
 * Falls back to OpenRouter when Google Vision API is unavailable.
 *
 * @param imagePath - Absolute path to the image file
 * @param question   - Question to ask about the image (default: describe it)
 * @returns Analysis text from the vision model
 */
export async function analyzeImageWithOpenRouter(
  imagePath: string,
  question = 'Describe this image in detail. What does it show? Describe all visual elements including colors, text, logos, layout, and design.'
): Promise<string> {
  // Read image and convert to base64
  const imageBuffer = await readFile(imagePath)
  const base64 = imageBuffer.toString('base64')

  // Determine MIME type from file extension
  const ext = imagePath.split('.').pop()?.toLowerCase()
  const mimeType =
    ext === 'png' ? 'image/png' :
    ext === 'gif' ? 'image/gif' :
    ext === 'webp' ? 'image/webp' :
    'image/jpeg'

  const dataUrl = `data:${mimeType};base64,${base64}`

  const model = getVisionModel()

  console.log(`[Vision] Analyzing image with OpenRouter model: ${model}`)

  const result = await createChatCompletion({
    messages: [{
      role: 'user',
      content: [
        { type: 'text', text: question },
        { type: 'image_url', image_url: { url: dataUrl } },
      ] as any,
    }],
    model,
    max_tokens: 2048,
  })

  const content = result?.choices?.[0]?.message?.content || 'No response from vision model'
  console.log(`[Vision] Analysis complete (${content.length} chars)`)
  return content
}

/**
 * Get list of all free vision-capable models from OpenRouter.
 * Useful for manual model selection or A/B testing.
 */
export const FREE_VISION_MODELS = [
  { id: 'google/gemma-4-26b-a4b-it:free',    ctx: '262K', input: 'image+text+video' },
  { id: 'google/gemma-4-31b-it:free',        ctx: '262K', input: 'image+text+video' },
  { id: 'google/lyria-3-pro-preview',         ctx: '1M',   input: 'text+image' },
  { id: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free', ctx: '256K', input: 'text+audio+image+video' },
  { id: 'nvidia/nemotron-nano-12b-v2-vl:free', ctx: '128K', input: 'image+text+video' },
  { id: 'openrouter/free',                     ctx: '200K', input: 'text+image' },
  { id: 'openrouter/owl-alpha',                ctx: '1M',   input: 'text' },
  { id: 'baidu/qianfan-ocr-fast:free',         ctx: '65K',  input: 'image+text' },
]
