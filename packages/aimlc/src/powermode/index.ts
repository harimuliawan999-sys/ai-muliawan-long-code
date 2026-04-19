/**
 * AIMLC Powerfull Mode — Entry Point
 * Sub-mode terisolasi. Hapus folder powermode/ = hapus semua, tidak ada bekas di core.
 *
 * Cara aktifkan: ketik /powerfullmode di chat AIMLC
 * Cara keluar:   ketik /normalmode
 *
 * Author: Hari Muliawan, S.Mat
 */

export { buildPowerfullSystemPrompt } from "./intelligence/layers"
export { validateEvolutionRequest, getGuardReport, isCoreFile } from "./evolution/guard"
export { validateFeatureSpec, formatSpecReport } from "./evolution/spec"
export { runFeatureTests, formatTestReport } from "./evolution/tester"
export { submitFeature, activateFeature, denyFeature, formatFeatureList } from "./evolution/engine"
export { addFeature, approveFeature, rejectFeature, getPendingFeatures, getApprovedFeatures, getAllFeatures } from "./evolution/store"
export { POWERMODE_BANNER, POWERMODE_EXIT_BANNER, getModelBadge, printPowermodeStatus } from "./ui/banner"
export { POWERMODE_TRIGGER, POWERMODE_EXIT, POWERMODE_VERSION, INTELLIGENCE_CONFIG } from "./config"

/**
 * Cek apakah input user adalah trigger Powerfull Mode
 */
export function isPowermodeCommand(input: string): "enter" | "exit" | null {
  const trimmed = input.trim().toLowerCase()
  if (trimmed === "/powerfullmode") return "enter"
  if (trimmed === "/normalmode" || trimmed === "/exitpowermode") return "exit"
  return null
}

/**
 * Info Powerfull Mode untuk ditampilkan di /help
 */
export const POWERMODE_HELP = `
  /powerfullmode    Aktifkan AIMLC Powerfull Mode
                    → 6 Intelligence Layers (Deep Reasoning, Multi-Path, Self-Critique, dll)
                    → Evolution Engine (bisa tambah fitur sendiri, core terlindungi)
                    → Badge khusus untuk model GLM tertinggi
                    → Terisolasi total — tidak menyentuh core AIMLC

  /normalmode       Kembali ke mode normal
`
