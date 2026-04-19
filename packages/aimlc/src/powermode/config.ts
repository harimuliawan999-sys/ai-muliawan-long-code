/**
 * AIMLC Powerfull Mode — Konfigurasi
 * Terisolasi total dari core AIMLC. Hapus folder ini = hapus semua, tidak ada sisa.
 * Author: Hari Muliawan, S.Mat
 */

export const POWERMODE_VERSION = "1.0.0"
export const POWERMODE_TRIGGER = "/powerfullmode"
export const POWERMODE_EXIT = "/normalmode"

// Model GLM — badge khusus
export const GLM_BADGES: Record<string, { label: string; bg: string; fg: string; tier: "powerfull" | "standard" }> = {
  // GLM 5.1 tertinggi → badge Powerfull AIMLC
  "glm-5-1":        { label: "▲ POWERFULL AIMLC", bg: "#4a0080", fg: "#ffd700", tier: "powerfull" },
  "glm-z1-flash":  { label: "▲ POWERFULL AIMLC", bg: "#4a0080", fg: "#ffd700", tier: "powerfull" },
  "glm-z1":        { label: "▲ POWERFULL AIMLC", bg: "#4a0080", fg: "#ffd700", tier: "powerfull" },
  // GLM biasa → label standar
  "glm-4":          { label: "GLM",               bg: "#1a1a2e", fg: "#7b7bff", tier: "standard" },
  "glm-4-flash":    { label: "GLM",               bg: "#1a1a2e", fg: "#7b7bff", tier: "standard" },
  "glm-4-plus":     { label: "GLM",               bg: "#1a1a2e", fg: "#7b7bff", tier: "standard" },
}

// File core yang TIDAK BOLEH disentuh Powerfull Mode
export const PROTECTED_PATHS = [
  "src/agent/",
  "src/session/",
  "src/provider/provider.ts",
  "src/storage/",
  "src/server/",
  "src/index.ts",
  "src/cli/cmd/tui/",
  "src/powermode/evolution/guard.ts", // self-protect
]

// Intelligence Layers config
export const INTELLIGENCE_CONFIG = {
  chainOfThought: true,
  multiPath: 3,           // coba 3 pendekatan
  selfCritique: true,
  expertPersona: true,
  metaCognitive: true,
  verifier: true,
}
