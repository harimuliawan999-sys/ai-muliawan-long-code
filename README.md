<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:00b4d8,100:0077b6&height=200&section=header&text=AIMLC&fontSize=80&fontColor=ffffff&fontAlignY=38&desc=AI%20Muliawan%20Long%20Code&descAlignY=58&descSize=24&animation=fadeIn" width="100%"/>

<br/>

# 🤖 AI Muliawan Long Code

<h3>
  <code>AI Coding Agent Terkuat — Tidak Ada yang Setara</code>
</h3>

<p><b>by Hari Muliawan, S.Mat</b></p>

<br/>

[![License](https://img.shields.io/badge/License-MIT-00b4d8?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-0077b6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-fbf0df?style=for-the-badge&logo=bun&logoColor=black)](https://bun.sh)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20Mac%20%7C%20Linux-0096c7?style=for-the-badge&logo=linux&logoColor=white)](.)
[![Models](https://img.shields.io/badge/75%2B%20AI%20Models-Supported-48cae4?style=for-the-badge&logo=openai&logoColor=white)](.)
[![Free](https://img.shields.io/badge/50%2B%20Model-GRATIS-00b4d8?style=for-the-badge&logo=googlegemini&logoColor=white)](.)

<br/>

```
  █████╗ ██╗███╗   ███╗██╗      ██████╗
 ██╔══██╗██║████╗ ████║██║     ██╔════╝
 ███████║██║██╔████╔██║██║     ██║
 ██╔══██║██║██║╚██╔╝██║██║     ██║
 ██║  ██║██║██║ ╚═╝ ██║███████╗╚██████╗
 ╚═╝  ╚═╝╚═╝╚═╝     ╚═╝╚══════╝ ╚═════╝
```

<h4>🏆 Satu-satunya AI Coding Agent yang punya <u>50+ Model Gratis</u> + <u>75+ Provider</u> + <u>Smart Cascade</u></h4>

</div>

---

## ⚡ Kenapa AIMLC Tidak Ada Tandingannya?

<div align="center">

| Fitur | 🤖 **AIMLC** | Anthropic Claude | OpenAI Codex | GitHub Copilot |
|:------|:---:|:---:|:---:|:---:|
| **Model Gratis (tanpa API key)** | ✅ **50+ model** | ❌ | ❌ | ❌ |
| **Jumlah Provider** | ✅ **75+** | 1 | 1 | 1 |
| **Smart Cascade / Auto Fallback** | ✅ | ❌ | ❌ | ❌ |
| **Jalankan Lokal (Offline)** | ✅ via Ollama | ❌ | ❌ | ❌ |
| **Multi-session** | ✅ | ✅ | ✅ | ❌ |
| **MCP Support** | ✅ | ✅ | ❌ | ❌ |
| **Git Worktree Integration** | ✅ | ❌ | ❌ | Partial |
| **Custom Plugin System** | ✅ | ❌ | ❌ | ❌ |
| **Open Source** | ✅ **MIT** | ❌ | ❌ | ❌ |
| **Harga** | 🟢 **GRATIS selamanya** | 💸 Berbayar | 💸 Berbayar | 💸 $10/bulan |

</div>

> **AIMLC** adalah satu-satunya AI coding agent yang menggabungkan kekuatan mesin TypeScript terkuat, 75+ provider AI, dan akses **50+ model gratis** — dalam satu tool.

---

## 🚀 Fitur Unggulan

<table>
<tr>
<td width="50%">

### 🆓 AIMLC Free Provider
50+ model AI **gratis tanpa API key** via gpt4free:
- GPT-4o & GPT-4o Mini
- Claude 3.5 Sonnet
- Llama 3.3 70B
- DeepSeek R1
- Gemini 1.5 Pro
- Dan puluhan lainnya...

</td>
<td width="50%">

### ⚡ Smart Cascade
Auto fallback cerdas antar provider:
1. Coba Groq (gratis, tercepat)
2. Coba OpenRouter (banyak model gratis)
3. Fallback ke AIMLC Free (g4f)
4. Provider berbayar kalau tersedia

</td>
</tr>
<tr>
<td width="50%">

### 🛠️ 75+ Provider AI
Semua provider terkemuka didukung:
- Anthropic, OpenAI, Google, Groq
- Mistral, Cohere, xAI, Perplexity
- AWS Bedrock, Azure, Vertex AI
- OpenRouter, Venice AI, dan lainnya

</td>
<td width="50%">

### 🔧 Agent Tools Lengkap
- Edit file, run shell, search kode
- Git worktree, diff, auto-commit
- LSP code intelligence real-time
- MCP (Model Context Protocol)
- Web search & browser automation
- Dan 40+ tools lainnya

</td>
</tr>
</table>

---

## 📦 Install

### Prasyarat
- [Bun](https://bun.sh) `v1.3+`
- Node.js `v22+` (opsional)
- Python `3.11+` (untuk AIMLC Free Provider)

### Install & Jalankan

```bash
# 1. Clone repo
git clone https://github.com/harimuliawan999-sys/ai-muliawan-long-code.git
cd ai-muliawan-long-code

# 2. Install dependencies
bun install

# 3. Build
bun run --cwd packages/aimlc build

# 4. Jalankan!
aimlc
```

### Atau jalankan langsung (tanpa build)

```bash
bun run dev
```

---

## 🆓 Aktifkan 50+ Model Gratis (AIMLC Free Provider)

```bash
# Install g4f (gpt4free)
pip install g4f

# Jalankan g4f server di terminal terpisah
python -m g4f.api.run

# Sekarang buka AIMLC — 50+ model gratis siap dipakai!
aimlc
```

> **Tidak perlu API key apapun!** AIMLC otomatis mendeteksi dan menggunakan g4f server.

---

## 🔑 Set API Key (Opsional — untuk model premium)

```bash
# Groq — GRATIS, tercepat (Llama 3.3 70B)
# Daftar di: console.groq.com
export GROQ_API_KEY="gsk_..."

# Anthropic Claude
export ANTHROPIC_API_KEY="sk-ant-..."

# OpenAI
export OPENAI_API_KEY="sk-..."

# Google Gemini
export GOOGLE_GENERATIVE_AI_API_KEY="AI..."
```

Atau set langsung di dalam AIMLC:
```bash
aimlc providers
```

---

## 💡 Cara Pakai

```bash
# Masuk ke folder project
cd my-project

# Mulai AIMLC
aimlc

# Langsung kasih task
aimlc run "buatkan REST API untuk autentikasi user"
aimlc run "debug error ini: [paste error kamu]"
aimlc run "optimasi query database ini"
```

### Contoh Task yang Bisa Dikerjakan AIMLC

```
✅ Buat aplikasi fullstack dari nol
✅ Fix bug kompleks secara otomatis
✅ Refactor ribuan baris kode
✅ Buat unit test otomatis
✅ Deploy ke cloud (AWS, GCP, Vercel)
✅ Analisis dan optimasi performa
✅ Convert codebase antar bahasa pemrograman
```

---

## 🏗️ Struktur Proyek

```
ai-muliawan-long-code/
├── packages/
│   ├── aimlc/              ← Core AIMLC TypeScript agent
│   │   ├── src/
│   │   │   ├── provider/
│   │   │   │   ├── aimlc-free.ts    ← AIMLC Free Provider (g4f)
│   │   │   │   └── aimlc-cascade.ts ← Smart Cascade
│   │   │   ├── cli/        ← Terminal interface
│   │   │   ├── agent/      ← Agent logic
│   │   │   └── tool/       ← 40+ tools
│   │   └── bin/aimlc       ← Binary executable
│   ├── plugin/             ← Plugin SDK (@aimuliawan/plugin)
│   └── sdk/                ← TypeScript SDK (@aimuliawan/sdk)
├── ailmc/                  ← AIMLC Python v3 APEX (bonus)
└── README.md
```

---

## 📊 Perbandingan Lengkap

<div align="center">

### AIMLC vs Kompetitor Terkuat

| | 🤖 AIMLC | Claude Code | Cursor | Windsurf |
|:--|:--:|:--:|:--:|:--:|
| **Harga** | **GRATIS** | $20-100/bln | $20/bln | $15/bln |
| **Model Gratis** | **50+** | 0 | 0 | 0 |
| **Open Source** | **✅** | ❌ | ❌ | ❌ |
| **Semua Provider** | **75+** | 1 | ~10 | ~5 |
| **Terminal Native** | **✅** | ✅ | IDE only | IDE only |
| **MCP Support** | **✅** | ✅ | ❌ | ❌ |
| **Self-hosted** | **✅** | ❌ | ❌ | ❌ |
| **Plugin System** | **✅** | ❌ | ❌ | ❌ |

</div>

---

## 📄 Lisensi

MIT License — © 2025 **Hari Muliawan, S.Mat**

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0077b6,100:00b4d8&height=100&section=footer" width="100%"/>

**AIMLC — AI Muliawan Long Code**

*Dibuat dengan ❤️ oleh **Hari Muliawan, S.Mat***

[![GitHub](https://img.shields.io/badge/GitHub-harimuliawan999--sys-0077b6?style=flat-square&logo=github)](https://github.com/harimuliawan999-sys)

</div>
