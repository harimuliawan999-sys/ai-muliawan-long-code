/**
 * AIMLC Powerfull Mode — Evolution Engine
 * Orkestrator utama: validasi spec → test → approval → load.
 * Dipanggil ketika AIMLC selesai menulis fitur baru di powermode/plugins/
 */

import path from "path"
import { validateFeatureSpec, formatSpecReport } from "./spec"
import { runFeatureTests, formatTestReport } from "./tester"
import { addFeature, approveFeature, rejectFeature, formatFeatureList } from "./store"
import { validateEvolutionRequest } from "./guard"
import crypto from "crypto"

export type EvolutionResult = {
  stage: "guard" | "spec" | "test" | "pending_approval" | "approved" | "rejected"
  message: string
  featureId?: string
  requiresApproval?: boolean
}

/**
 * Pipeline utama: AIMLC panggil ini setelah nulis fitur baru.
 * Hasilnya menentukan apakah fitur diaktifkan atau ditolak.
 */
export async function submitFeature(opts: {
  name: string
  description: string
  featureDir: string
}): Promise<EvolutionResult> {
  const { name, description, featureDir } = opts
  const absDir = path.resolve(featureDir)

  // ── STAGE 1: Guard check ──────────────────────────────────────────
  const guardCheck = validateEvolutionRequest(absDir)
  if (!guardCheck.allowed) {
    return {
      stage: "guard",
      message: `🛡️ EVOLUTION GUARD MEMBLOKIR:\n${guardCheck.reason}\n\nFitur tidak dapat ditambahkan karena menyentuh area yang dilindungi.`,
    }
  }

  // ── STAGE 2: Spec validation ──────────────────────────────────────
  const specResult = await validateFeatureSpec(absDir)
  const specReport = formatSpecReport(specResult)

  if (!specResult.passed) {
    return {
      stage: "spec",
      message: `${specReport}\n\n❌ Fitur "${name}" DITOLAK — spec tidak lulus.\nPerbaiki masalah di atas dan coba lagi.`,
    }
  }

  // ── STAGE 3: Test runner ──────────────────────────────────────────
  const testResult = await runFeatureTests(absDir)
  const testReport = formatTestReport(testResult, name)

  if (!testResult.passed) {
    return {
      stage: "test",
      message: `${specReport}\n\n${testReport}\n\n❌ Fitur "${name}" DITOLAK — test gagal.\nPerbaiki test di atas dan coba lagi.`,
    }
  }

  // ── STAGE 4: Masuk antrian approval ──────────────────────────────
  const featureId = crypto.randomBytes(4).toString("hex")
  addFeature({
    id: featureId,
    name,
    description,
    dir: absDir,
    status: "pending",
    specScore: specResult.score,
    testsPassed: true,
  })

  return {
    stage: "pending_approval",
    featureId,
    requiresApproval: true,
    message: `${specReport}\n\n${testReport}\n\n⏳ Fitur "${name}" LULUS semua pengecekan!\n\nSpec: ${specResult.score}/100 ✅\nTest: Semua passed ✅\nID: ${featureId}\n\nKetik /approve ${featureId} untuk mengaktifkan fitur ini.`,
  }
}

/**
 * User approve fitur yang pending.
 */
export function activateFeature(featureId: string): EvolutionResult {
  const feature = approveFeature(featureId)
  if (!feature) {
    return {
      stage: "rejected",
      message: `❌ Fitur dengan ID "${featureId}" tidak ditemukan.`,
    }
  }

  return {
    stage: "approved",
    featureId,
    message: `✅ Fitur "${feature.name}" DIAKTIFKAN!\n\nDitambahkan ke Powerfull Mode pada ${new Date().toLocaleString("id-ID")}.\nFitur ini sekarang tersedia di Powerfull Mode.`,
  }
}

/**
 * User reject fitur.
 */
export function denyFeature(featureId: string, reason = "Ditolak oleh user"): EvolutionResult {
  const feature = rejectFeature(featureId, reason)
  if (!feature) {
    return {
      stage: "rejected",
      message: `❌ Fitur dengan ID "${featureId}" tidak ditemukan.`,
    }
  }

  return {
    stage: "rejected",
    featureId,
    message: `❌ Fitur "${feature.name}" ditolak.\nAlasan: ${reason}`,
  }
}

export { formatFeatureList }
