/**
 * AIMLC Powerfull Mode — Feature Store
 * Melacak semua fitur: pending approval, approved, rejected.
 * Disimpan di ~/.local/share/aimlc/powermode-features.json
 */

import fs from "fs"
import path from "path"
import os from "os"

const STORE_PATH = path.join(os.homedir(), ".local", "share", "aimlc", "powermode-features.json")

export type FeatureStatus = "pending" | "approved" | "rejected"

export type Feature = {
  id: string
  name: string
  description: string
  dir: string
  status: FeatureStatus
  specScore: number
  testsPassed: boolean
  createdAt: string
  activatedAt?: string
  rejectedAt?: string
  rejectedReason?: string
}

function loadStore(): Feature[] {
  try {
    if (fs.existsSync(STORE_PATH)) {
      return JSON.parse(fs.readFileSync(STORE_PATH, "utf8"))
    }
  } catch {}
  return []
}

function saveStore(features: Feature[]): void {
  const dir = path.dirname(STORE_PATH)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(STORE_PATH, JSON.stringify(features, null, 2))
}

export function addFeature(feature: Omit<Feature, "createdAt">): Feature {
  const features = loadStore()
  const newFeature: Feature = { ...feature, createdAt: new Date().toISOString() }
  features.push(newFeature)
  saveStore(features)
  return newFeature
}

export function approveFeature(id: string): Feature | null {
  const features = loadStore()
  const idx = features.findIndex((f) => f.id === id)
  if (idx === -1) return null
  features[idx].status = "approved"
  features[idx].activatedAt = new Date().toISOString()
  saveStore(features)
  return features[idx]
}

export function rejectFeature(id: string, reason: string): Feature | null {
  const features = loadStore()
  const idx = features.findIndex((f) => f.id === id)
  if (idx === -1) return null
  features[idx].status = "rejected"
  features[idx].rejectedAt = new Date().toISOString()
  features[idx].rejectedReason = reason
  saveStore(features)
  return features[idx]
}

export function getPendingFeatures(): Feature[] {
  return loadStore().filter((f) => f.status === "pending")
}

export function getApprovedFeatures(): Feature[] {
  return loadStore().filter((f) => f.status === "approved")
}

export function getAllFeatures(): Feature[] {
  return loadStore()
}

export function formatFeatureList(): string {
  const features = loadStore()
  if (features.length === 0) return "Belum ada fitur yang ditambahkan ke Powerfull Mode."

  const lines = ["╔══════ AIMLC POWERFULL — EVOLUTION LOG ══════╗"]
  for (const f of features) {
    const icon = f.status === "approved" ? "✅" : f.status === "rejected" ? "❌" : "⏳"
    lines.push(`║ ${icon} ${f.name.padEnd(20)} [${f.status.padEnd(8)}] Spec: ${f.specScore}/100 ║`)
  }
  lines.push("╚══════════════════════════════════════════════╝")
  return lines.join("\n")
}
