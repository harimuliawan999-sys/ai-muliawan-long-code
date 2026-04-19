import { createEffect, createSignal, onCleanup, Show } from "solid-js"
import { Spinner } from "./spinner"

const SHOW_DURATION = 10000 // logo tampil 10 detik

export function StartupLoading(props: { ready: () => boolean }) {
  const [show, setShow] = createSignal(true)
  const [msgIdx, setMsgIdx] = createSignal(0)
  const stamp = Date.now() // catat waktu mount — BUKAN 0!

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

  ticker = setInterval(() => setMsgIdx((i) => (i + 1) % msgs.length), 1200)

  createEffect(() => {
    if (!props.ready()) return
    if (!show()) return
    if (hold) return
    if (ticker) { clearInterval(ticker); ticker = undefined }

    const left = SHOW_DURATION - (Date.now() - stamp)
    if (left <= 0) { setShow(false); return }
    hold = setTimeout(() => { hold = undefined; setShow(false) }, left)
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
        <box flexDirection="column" alignItems="center" marginBottom={1}>
          <text bold fg={"#cc0000"}> ░█████╗░██╗███╗░░░███╗██╗░░░░░░█████╗░</text>
          <text bold fg={"#dd1111"}> ██╔══██╗██║████╗░████║██║░░░░░██╔══██╗</text>
          <text bold fg={"#ee2222"}> ███████║██║██╔████╔██║██║░░░░░██║░░╚═╝</text>
          <text bold fg={"#ff3333"}> ██╔══██║██║██║╚██╔╝██║██║░░░░░██║░░██╗</text>
          <text bold fg={"#ff5555"}> ██║░░██║██║██║░╚═╝░██║███████╗╚█████╔╝</text>
          <text bold fg={"#ff7777"}> ╚═╝░░╚═╝╚═╝╚═╝░░░░╚═╝╚══════╝░╚════╝░</text>
        </box>
        <box marginBottom={1}>
          <text fg={"#441111"}>  ════════════════════════════════════  </text>
        </box>
        <box flexDirection="column" alignItems="center" marginBottom={2}>
          <text bold fg={"#ffffff"}>  AI Muliawan Long Code  </text>
          <text fg={"#555555"}>  by Hari Muliawan, S.Mat  </text>
        </box>
        <box>
          <Spinner color={"#ff3333"}>{msgs[msgIdx()]}</Spinner>
        </box>
      </box>
    </Show>
  )
}
