import { createEffect, createMemo, createSignal, onCleanup, Show } from "solid-js"
import { useTheme } from "../context/theme"
import { Spinner } from "./spinner"

export function StartupLoading(props: { ready: () => boolean }) {
  const theme = useTheme().theme
  const [show, setShow] = createSignal(false)
  const [msgIdx, setMsgIdx] = createSignal(0)
  const messages = ["⚡ Memuat AIMLC...", "🧠 Menginisialisasi AI...", "🔧 Siapkan tools...", "🚀 Hampir siap!"]
  const text = createMemo(() => (props.ready() ? "✅ Selamat datang di AIMLC!" : messages[msgIdx()]))

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
      const left = 3000 - (Date.now() - stamp)
      if (left <= 0) { setShow(false); return }
      hold = setTimeout(() => { hold = undefined; setShow(false) }, left)
      return
    }
    if (!ticker) {
      ticker = setInterval(() => setMsgIdx((i) => (i + 1) % messages.length), 700)
    }
    if (hold) { clearTimeout(hold); hold = undefined }
    if (show()) return
    if (wait) return
    wait = setTimeout(() => { wait = undefined; stamp = Date.now(); setShow(true) }, 500)
  })

  onCleanup(() => {
    if (ticker) clearInterval(ticker)
    if (wait) clearTimeout(wait)
    if (hold) clearTimeout(hold)
  })

  return (
    <Show when={show()}>
      <box position="absolute" zIndex={5000} left={0} right={0} bottom={1} justifyContent="center" alignItems="center">
        <box backgroundColor={theme.backgroundPanel} paddingLeft={1} paddingRight={1}>
          <Spinner color={"#ff4444"}>{text()}</Spinner>
        </box>
      </box>
    </Show>
  )
}
