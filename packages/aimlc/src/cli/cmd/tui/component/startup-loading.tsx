import { createEffect, createSignal, onCleanup, Show } from "solid-js"
import { Spinner } from "./spinner"

export function StartupLoading(props: { ready: () => boolean }) {
  const [show, setShow] = createSignal(true) // langsung tampil, tutup layar hitam
  const [msgIdx, setMsgIdx] = createSignal(0)

  const msgs = [
    "Memuat AIMLC...",
    "Menginisialisasi sistem AI...",
    "Menyiapkan tools dan provider...",
    "Menghubungkan model AI...",
    "Memuat konfigurasi...",
    "Menyiapkan sesi...",
    "Hampir siap...",
  ]

  let ticker: ReturnType<typeof setInterval> | undefined
  let hold: ReturnType<typeof setTimeout> | undefined
  let stamp = 0

  createEffect(() => {
    if (props.ready()) {
      if (ticker) { clearInterval(ticker); ticker = undefined }
      if (!show()) return
      if (hold) return
      // Tahan layar minimal 2.5 detik setelah ready supaya pesan terbaca
      const left = 8000 - (Date.now() - stamp)
      if (left <= 0) { setShow(false); return }
      hold = setTimeout(() => { hold = undefined; setShow(false) }, left)
      return
    }
    if (hold) { clearTimeout(hold); hold = undefined }
    if (!ticker) {
      ticker = setInterval(() => setMsgIdx((i) => (i + 1) % msgs.length), 1200)
    }
    if (show()) return
    stamp = Date.now()
    setShow(true)
  })

  onCleanup(() => {
    if (ticker) clearInterval(ticker)
    if (hold) clearTimeout(hold)
  })

  return (
    <Show when={show()}>
      <box
        position="absolute"
        zIndex={9999}
        left={0} right={0} top={0} bottom={0}
        backgroundColor={"#050505"}
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* Logo besar AIMLC */}
        <box flexDirection="column" alignItems="center" marginBottom={1}>
          <text bold fg={"#cc0000"}> ░█████╗░██╗███╗░░░███╗██╗░░░░░░█████╗░</text>
          <text bold fg={"#dd1111"}> ██╔══██╗██║████╗░████║██║░░░░░██╔══██╗</text>
          <text bold fg={"#ee2222"}> ███████║██║██╔████╔██║██║░░░░░██║░░╚═╝</text>
          <text bold fg={"#ff3333"}> ██╔══██║██║██║╚██╔╝██║██║░░░░░██║░░██╗</text>
          <text bold fg={"#ff5555"}> ██║░░██║██║██║░╚═╝░██║███████╗╚█████╔╝</text>
          <text bold fg={"#ff7777"}> ╚═╝░░╚═╝╚═╝╚═╝░░░░╚═╝╚══════╝░╚════╝░</text>
        </box>

        {/* Garis */}
        <box marginBottom={1}>
          <text fg={"#441111"}>  ════════════════════════════════════  </text>
        </box>

        {/* Nama & author */}
        <box flexDirection="column" alignItems="center" marginBottom={2}>
          <text bold fg={"#ffffff"}>  AI Muliawan Long Code  </text>
          <text fg={"#555555"}>  by Hari Muliawan, S.Mat  </text>
        </box>

        {/* Spinner loading */}
        <box>
          <Spinner color={"#ff3333"}>{msgs[msgIdx()]}</Spinner>
        </box>
      </box>
    </Show>
  )
}
