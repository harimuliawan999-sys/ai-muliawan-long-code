/**
 * AIMLC Smart Cascade
 * Port dari Python AILMC v3 APEX: coba provider secara berurutan (cascade)
 * Order: Groq (gratis, cepat) → OpenRouter free → g4f local → model lain
 *
 * Kalau satu provider gagal/habis kuota, otomatis fallback ke berikutnya.
 *
 * Author: Hari Muliawan, S.Mat
 */

/**
 * Urutan provider terbaik untuk AIMLC (dari paling direkomendasikan ke fallback):
 * 1. Groq — llama-3.3-70b-versatile, gratis, tool calling andal
 * 2. OpenRouter — banyak model gratis/murah
 * 3. AIMLC Free (g4f) — fallback ultimate, 50+ model tanpa API key
 * 4. Anthropic Claude — kalau punya API key
 * 5. OpenAI — kalau punya API key
 */
export const AIMLC_PROVIDER_PRIORITY = [
  "groq",
  "openrouter",
  "aimlc-free",
  "anthropic",
  "openai",
  "google",
  "mistral",
]

/**
 * Model terbaik per provider untuk coding tasks (dioptimasi untuk AIMLC)
 */
export const AIMLC_DEFAULT_MODELS: Record<string, string> = {
  groq: "llama-3.3-70b-versatile",
  openrouter: "meta-llama/llama-3.3-70b-instruct:free",
  "aimlc-free": "gpt-4o",
  anthropic: "claude-sonnet-4-5",
  openai: "gpt-4o",
  google: "gemini-2.0-flash",
  mistral: "mistral-large-latest",
}

/**
 * Cek apakah g4f server lokal berjalan
 */
export async function checkG4FServer(url = "http://localhost:1337/v1"): Promise<boolean> {
  try {
    const res = await fetch(`${url}/models`, { signal: AbortSignal.timeout(1500) })
    return res.ok
  } catch {
    return false
  }
}

/**
 * Instruksi startup g4f untuk user yang ingin pakai provider gratis
 */
export const G4F_STARTUP_INSTRUCTIONS = `
Untuk mengaktifkan 50+ model AI gratis (AIMLC Free Provider):

  python -m g4f.api.run

Kalau g4f belum terinstall:
  pip install g4f

Atau gunakan Groq gratis (daftar di console.groq.com):
  Atur di AIMLC: Providers > Groq > Set API Key
`
