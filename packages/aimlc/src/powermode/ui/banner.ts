/**
 * AIMLC Powerfull Mode — Banner & UI
 * Tampilan berbeda total dari mode normal.
 */

import { EOL } from "os"
import { GLM_BADGES } from "../config"

const GOLD   = "\x1b[38;5;220m"
const PURPLE = "\x1b[38;5;129m"
const BRIGHT = "\x1b[38;5;255m"
const DIM    = "\x1b[2m"
const BOLD   = "\x1b[1m"
const RESET  = "\x1b[0m"
const BG_PURPLE = "\x1b[48;5;54m"
const BG_GOLD   = "\x1b[48;5;58m"

export const POWERMODE_BANNER = `
${PURPLE}${BOLD}  ╔══════════════════════════════════════════════════╗${RESET}
${PURPLE}${BOLD}  ║                                                  ║${RESET}
${GOLD}${BOLD}  ║    ▲  AIMLC  POWERFULL  MODE  ▲                  ║${RESET}
${GOLD}${BOLD}  ║       AI Muliawan Long Code                       ║${RESET}
${PURPLE}${BOLD}  ║       by Hari Muliawan, S.Mat                    ║${RESET}
${PURPLE}${BOLD}  ║                                                  ║${RESET}
${DIM}  ║  6 Intelligence Layers  •  Evolution Engine      ║${RESET}
${DIM}  ║  Core Protected  •  Isolated  •  Self-Modifying  ║${RESET}
${PURPLE}${BOLD}  ╚══════════════════════════════════════════════════╝${RESET}
${DIM}  Ketik /normalmode untuk kembali ke mode normal${RESET}
`

export const POWERMODE_EXIT_BANNER = `
${GOLD}  ▲ Keluar dari AIMLC Powerfull Mode${RESET}
${DIM}  Kembali ke mode normal...${RESET}
`

export function getModelBadge(modelId: string): string {
  const id = modelId.toLowerCase()

  for (const [key, badge] of Object.entries(GLM_BADGES)) {
    if (id.includes(key.toLowerCase())) {
      if (badge.tier === "powerfull") {
        return `${BG_PURPLE}${GOLD}${BOLD} ${badge.label} ${RESET}`
      } else {
        return `\x1b[48;5;17m${BRIGHT}${BOLD} ${badge.label} ${RESET}`
      }
    }
  }

  // Model lain di powerfull mode
  return `${BG_GOLD}\x1b[38;5;0m${BOLD} ▲ POWERFULL ${RESET}`
}

export function printPowermodeStatus(modelId: string, layersActive: number): string {
  const badge = getModelBadge(modelId)
  return [
    `${PURPLE}╔═ POWERFULL MODE AKTIF ${"═".repeat(30)}╗${RESET}`,
    `${PURPLE}║${RESET} Model: ${badge}  ${DIM}${modelId}${RESET}`,
    `${PURPLE}║${RESET} Intelligence Layers: ${GOLD}${BOLD}${layersActive}/6 AKTIF${RESET}`,
    `${PURPLE}║${RESET} Core Protection: ${GOLD}${BOLD}✓ LOCKED${RESET}`,
    `${PURPLE}╚${"═".repeat(44)}╝${RESET}`,
  ].join(EOL)
}
