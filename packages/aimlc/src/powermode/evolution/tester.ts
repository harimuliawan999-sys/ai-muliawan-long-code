/**
 * AIMLC Powerfull Mode — Test Runner
 * Jalankan test.ts dari fitur baru. Kalau ada yang gagal → fitur DITOLAK.
 */

import { spawnSync } from "child_process"
import path from "path"
import fs from "fs"

export type TestResult = {
  passed: boolean
  output: string
  duration: number
  failedTests: string[]
}

export async function runFeatureTests(featureDir: string): Promise<TestResult> {
  const testPath = path.join(featureDir, "test.ts")
  const start = Date.now()

  if (!fs.existsSync(testPath)) {
    return {
      passed: false,
      output: "✗ test.ts tidak ditemukan",
      duration: 0,
      failedTests: ["File test.ts tidak ada"],
    }
  }

  // Jalankan test dengan bun test
  const result = spawnSync(
    "bun",
    ["test", testPath, "--timeout", "10000"],
    {
      cwd: process.cwd(),
      encoding: "utf8",
      timeout: 30000,
    }
  )

  const duration = Date.now() - start
  const output = (result.stdout ?? "") + (result.stderr ?? "")
  const passed = result.status === 0

  // Ekstrak nama test yang gagal dari output bun test
  const failedTests: string[] = []
  const failPattern = /✗\s+(.+)/g
  let match
  while ((match = failPattern.exec(output)) !== null) {
    failedTests.push(match[1].trim())
  }

  return { passed, output, duration, failedTests }
}

export function formatTestReport(result: TestResult, featureName: string): string {
  const status = result.passed ? "✅ SEMUA TEST LULUS" : "❌ TEST GAGAL"
  const lines = [
    `╔══════════════════════════════════════════════╗`,
    `║     AIMLC EVOLUTION — TEST RUNNER            ║`,
    `╠══════════════════════════════════════════════╣`,
    `║  Fitur: ${featureName.padEnd(36)}║`,
    `║  Status: ${status.padEnd(35)}║`,
    `║  Durasi: ${String(result.duration + "ms").padEnd(35)}║`,
    `╚══════════════════════════════════════════════╝`,
  ]

  if (!result.passed && result.failedTests.length > 0) {
    lines.push(`\nTest yang gagal:`)
    result.failedTests.forEach((t) => lines.push(`  ✗ ${t}`))
  }

  if (result.output) {
    lines.push(`\nOutput:\n${result.output.slice(0, 500)}`)
  }

  return lines.join("\n")
}
