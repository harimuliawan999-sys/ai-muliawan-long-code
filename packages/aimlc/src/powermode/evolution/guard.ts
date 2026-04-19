/**
 * AIMLC Evolution Guard — Penjaga Core
 * Mencegah Powerfull Mode menyentuh file core apapun.
 * File ini melindungi dirinya sendiri juga.
 */

import { PROTECTED_PATHS } from "../config"

export function isCoreFile(filePath: string): boolean {
  const normalized = filePath.replace(/\\/g, "/")
  return PROTECTED_PATHS.some((p) => normalized.includes(p))
}

export function validateEvolutionRequest(targetFile: string): {
  allowed: boolean
  reason?: string
} {
  if (isCoreFile(targetFile)) {
    return {
      allowed: false,
      reason: `❌ DITOLAK: File "${targetFile}" adalah bagian dari core AIMLC yang dilindungi. Powerfull Mode hanya boleh menulis ke packages/aimlc/src/powermode/`,
    }
  }

  if (!targetFile.includes("powermode/")) {
    return {
      allowed: false,
      reason: `❌ DITOLAK: File baru hanya boleh dibuat di dalam folder powermode/. Ini menjaga AIMLC asli tetap aman.`,
    }
  }

  return { allowed: true }
}

export function getGuardReport(): string {
  return `
╔══════════════════════════════════════════╗
║     AIMLC EVOLUTION GUARD — AKTIF        ║
╠══════════════════════════════════════════╣
║  Core terlindungi: ${PROTECTED_PATHS.length} path dikunci        ║
║  Zone aman: src/powermode/ saja          ║
║  Status: SEMUA CORE AMAN                 ║
╚══════════════════════════════════════════╝
  `.trim()
}
