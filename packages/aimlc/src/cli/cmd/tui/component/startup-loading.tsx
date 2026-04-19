import { createEffect, createMemo, createSignal, onCleanup, Show } from "solid-js"
import { useTheme } from "../context/theme"
import { Spinner } from "./spinner"

export function StartupLoading(props: { ready: () => boolean }) {
  const theme = useTheme().theme
  const [show, setShow] = createSignal(false)
  const [msgIdx, setMsgIdx] = createSignal(0)

  const msgs = [
    "Memuat AIMLC...",
    "Menginisialisasi sistem AI...",
    "Menyiapkan tools dan provider...",
    "Menghubungkan model AI...",
    "Memverifikasi konfigurasi...",
    "Memuat plugin...",
    "Menyiapkan sesi...",
    "Hampir siap...",
  ]

  let ticker: ReturnType<typeof setInterval> | undefined
  let wait: ReturnType<typeof setTimeout> | undefined
  let hold: ReturnType<typeof setTimeout> | undefined
  let stamp = 0

  createEffect(() => {
    if (props.ready()) {
      if (ticker) { clearInterval(ticker); ticker = undefined }
      if (wait) { clearTimeout(wait); wait = undefined }
      if (!show()) return
      if (hold) return
      const left = 1500 - (Date.now() - stamp)
      if (left <= 0) { setShow(false); return }
      hold = setTimeout(() => { hold = undefined; setShow(false) }, left)
      return
    }
    if (!ticker) {
      ticker = setInterval(() => setMsgIdx((i) => (i + 1) % msgs.length), 900)
    }
    if (hold) { clearTimeout(hold); hold = undefined }
    if (show()) return
    if (wait) return
    wait = setTimeout(() => { wait = undefined; stamp = Date.now(); setShow(true) }, 200)
  })

  onCleanup(() => {
    if (ticker) clearInterval(ticker)
    if (wait) clearTimeout(wait)
    if (hold) clearTimeout(hold)
  })

  return (
    <Show when={show()}>
      <box
        position="absolute"
        zIndex={9999}
        left={0} right={0} top={0} bottom={0}
        backgroundColor={"#0a0a0a"}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* Logo AIMLC */}
        <box flexDirection="column" alignItems="center" marginBottom={2}>
          <text fg={"#ff2222"}>  ╔══════════════════════════════╗  </text>
          <text fg={"#ff2222"}>  ║                              ║  </text>
          <text bold fg={"#ff3333"}>  ║   A  I  M  L  C             ║  </text>
          <text fg={"#ff3333"}>  ║   AI Muliawan Long Code      ║  </text>
          <text fg={"#ff2222"}>  ║                              ║  </text>
          <text fg={"#ff2222"}>  ╚══════════════════════════════╝  </text>
        </box>

        {/* Nama & author */}
        <box flexDirection="column" alignItems="center" marginBottom={3}>
          <text bold fg={"#ffffff"}>  AI Muliawan Long Code  </text>
          <text fg={"#666666"}>  by Hari Muliawan, S.Mat  </text>
        </box>

        {/* Spinner + teks loading */}
        <box flexDirection="row" alignItems="center">
          <Spinner color={"#ff3333"}>{msgs[msgIdx()]}</Spinner>
        </box>
      </box>
    </Show>
  )
}
