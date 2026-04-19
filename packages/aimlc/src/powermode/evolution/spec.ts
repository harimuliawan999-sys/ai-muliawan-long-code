/**
 * AIMLC Powerfull Mode — Spec Validator
 * Setiap fitur baru WAJIB lulus semua spec ini sebelum bisa diaktifkan.
 * Kalau gagal satu saja → ditolak total.
 */

import fs from "fs"
import path from "path"
import { PROTECTED_PATHS } from "../config"

export type SpecResult = {
  passed: boolean
  score: number       // 0-100
  checks: SpecCheck[]
  summary: string
}

export type SpecCheck = {
  name: string
  passed: boolean
  message: string
  critical: boolean   // kalau critical gagal → langsung reject
}

// __dirname = src/powermode/evolution/ → naik satu level = src/powermode/
const POWERMODE_ROOT = path.resolve(import.meta.dirname, "..")

export async function validateFeatureSpec(featureDir: string): Promise<SpecResult> {
  const checks: SpecCheck[] = []

  // ── CHECK 1: Harus di dalam powermode/ ──────────────────────────────
  const absoluteDir = path.resolve(featureDir)
  const insidePowermode = absoluteDir.startsWith(POWERMODE_ROOT)
  checks.push({
    name: "Lokasi file",
    passed: insidePowermode,
    message: insidePowermode
      ? `✓ File berada di powermode/ — aman`
      : `✗ KRITIKAL: File di luar powermode/! Hanya boleh di ${POWERMODE_ROOT}`,
    critical: true,
  })

  // ── CHECK 2: Harus ada index.ts ─────────────────────────────────────
  const indexPath = path.join(absoluteDir, "index.ts")
  const hasIndex = fs.existsSync(indexPath)
  checks.push({
    name: "File index.ts",
    passed: hasIndex,
    message: hasIndex ? `✓ index.ts ditemukan` : `✗ index.ts tidak ada — fitur wajib punya entry point`,
    critical: true,
  })

  // ── CHECK 3: Harus ada file test ────────────────────────────────────
  const testPath = path.join(absoluteDir, "test.ts")
  const hasTest = fs.existsSync(testPath)
  checks.push({
    name: "File test.ts",
    passed: hasTest,
    message: hasTest ? `✓ test.ts ditemukan` : `✗ test.ts tidak ada — setiap fitur WAJIB punya test`,
    critical: true,
  })

  // ── CHECK 4: Tidak import dari core yang dilindungi ─────────────────
  let badImports: string[] = []
  if (hasIndex) {
    const content = fs.readFileSync(indexPath, "utf8")
    badImports = PROTECTED_PATHS.filter((p) => content.includes(`from "@/${p.replace("src/", "")}`))
  }
  checks.push({
    name: "Import check (core protection)",
    passed: badImports.length === 0,
    message: badImports.length === 0
      ? `✓ Tidak ada import dari core yang dilindungi`
      : `✗ KRITIKAL: Import dari core terdeteksi: ${badImports.join(", ")}`,
    critical: true,
  })

  // ── CHECK 5: Harus ada README atau komentar deskripsi ───────────────
  const readmePath = path.join(absoluteDir, "README.md")
  const hasReadme = fs.existsSync(readmePath)
  let hasDescription = false
  if (hasIndex) {
    const content = fs.readFileSync(indexPath, "utf8")
    hasDescription = content.includes("@description") || content.includes("* Deskripsi") || content.includes("/**")
  }
  checks.push({
    name: "Dokumentasi",
    passed: hasReadme || hasDescription,
    message: hasReadme || hasDescription
      ? `✓ Dokumentasi ada`
      : `✗ Tidak ada README.md atau komentar deskripsi di index.ts`,
    critical: false,
  })

  // ── CHECK 6: Tidak ada eval() atau exec yang berbahaya ───────────────
  let hasDangerousCode = false
  if (hasIndex) {
    const content = fs.readFileSync(indexPath, "utf8")
    hasDangerousCode = /\beval\s*\(|new Function\s*\(|child_process\.exec\b/.test(content)
  }
  checks.push({
    name: "Security check",
    passed: !hasDangerousCode,
    message: !hasDangerousCode
      ? `✓ Tidak ada kode berbahaya`
      : `✗ KRITIKAL: eval(), new Function(), atau exec() terdeteksi — tidak aman`,
    critical: true,
  })

  // ── Hitung hasil ────────────────────────────────────────────────────
  const criticalFailed = checks.filter((c) => c.critical && !c.passed)
  const passed = criticalFailed.length === 0
  const score = Math.round((checks.filter((c) => c.passed).length / checks.length) * 100)

  const summary = passed
    ? `✅ SPEC LULUS (${score}/100) — Fitur siap masuk test runner`
    : `❌ SPEC GAGAL (${score}/100) — ${criticalFailed.length} check kritikal gagal:\n${criticalFailed.map((c) => `  • ${c.message}`).join("\n")}`

  return { passed, score, checks, summary }
}

export function formatSpecReport(result: SpecResult): string {
  const lines = [
    `╔══════════════════════════════════════════════╗`,
    `║     AIMLC EVOLUTION — SPEC VALIDATOR         ║`,
    `╠══════════════════════════════════════════════╣`,
    ...result.checks.map((c) => `║  ${c.passed ? "✓" : "✗"} ${c.name.padEnd(35)}║`),
    `╠══════════════════════════════════════════════╣`,
    `║  Score: ${result.score}/100                              ║`,
    `╚══════════════════════════════════════════════╝`,
    result.summary,
  ]
  return lines.join("\n")
}
