/**
 * AIMLC Free Provider
 * Menghubungkan ke g4f (gpt4free) server lokal yang menyediakan 50+ model AI gratis
 * via endpoint OpenAI-compatible: http://localhost:1337/v1
 *
 * Cara pakai:
 *   1. Jalankan g4f server: python -m g4f.api.run
 *   2. aimlc akan otomatis deteksi dan pakai model gratis ini sebagai fallback
 *
 * Author: Hari Muliawan, S.Mat
 */

import type { Hooks, PluginInput } from "@aimuliawan/plugin"

const G4F_BASE_URL = process.env.AIMLC_G4F_URL ?? "http://localhost:1337/v1"
const G4F_PROVIDER_ID = "aimlc-free"

// Model gratis terbaik dari g4f untuk coding
const FREE_MODELS = [
  {
    id: "gpt-4o",
    name: "GPT-4o (Free via g4f)",
    contextLength: 128_000,
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini (Free via g4f)",
    contextLength: 128_000,
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet (Free via g4f)",
    contextLength: 200_000,
  },
  {
    id: "llama-3.3-70b",
    name: "Llama 3.3 70B (Free via g4f)",
    contextLength: 128_000,
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1 (Free via g4f)",
    contextLength: 128_000,
  },
  {
    id: "gemini-1.5-pro",
    name: "Gemini 1.5 Pro (Free via g4f)",
    contextLength: 1_000_000,
  },
]

async function isG4FRunning(): Promise<boolean> {
  try {
    const res = await fetch(`${G4F_BASE_URL}/models`, {
      signal: AbortSignal.timeout(2000),
    })
    return res.ok
  } catch {
    return false
  }
}

export async function AimlcFreePlugin(_input: PluginInput): Promise<Hooks> {
  const running = await isG4FRunning()

  if (!running) {
    // g4f belum berjalan — daftar tetapi tandai tidak tersedia
    return {
      providers: [
        {
          id: G4F_PROVIDER_ID,
          name: "AIMLC Free (g4f - tidak aktif)",
          description: "Jalankan: python -m g4f.api.run",
          models: [],
          enabled: false,
        },
      ],
    }
  }

  return {
    providers: [
      {
        id: G4F_PROVIDER_ID,
        name: "AIMLC Free (g4f)",
        description: "50+ model AI gratis via gpt4free — tanpa API key!",
        npm: "@ai-sdk/openai-compatible",
        options: {
          baseURL: G4F_BASE_URL,
          apiKey: "aimlc-free",
          name: G4F_PROVIDER_ID,
        },
        models: FREE_MODELS.map((m) => ({
          id: m.id,
          name: m.name,
          contextLength: m.contextLength,
          supports: {
            tools: true,
            attachments: false,
          },
          cost: {
            input: 0,
            output: 0,
          },
        })),
      },
    ],
  }
}
