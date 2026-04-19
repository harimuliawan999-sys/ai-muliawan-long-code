import { createEffect, createMemo, createSignal, onCleanup, Show } from "solid-js"
import { useTheme } from "../context/theme"
import { Spinner } from "./spinner"

export function StartupLoading(props: { ready: () => boolean }) {
  const theme = useTheme().theme
  const [show, setShow] = createSignal(false)
  const messages = ["⚡ Memuat AIMLC...", "🧠 Menginisialisasi AI...", "🔧 Menyiapkan tools...", "🚀 Hampir siap..."]
  const [msgIdx, setMsgIdx] = createSignal(0)
  let ticker: NodeJS.Timeout | undefined
  createEffect(() => {
    if (!props.ready()) {
      ticker = setInterval(() => setMsgIdx((i) => (i + 1) % messages.length), 700)
    } else {
      if (ticker) { clearInterval(ticker); ticker = undefined }
    }
  })
  onCleanup(() => { if (ticker) clearInterval(ticker) })
  const text = createMemo(() => (props.ready() ? "✅ Selamat datang di AIMLC!" : messages[msgIdx()]))
  let wait: NodeJS.Timeout | undefined
  let hold: NodeJS.Timeout | undefined
  let stamp = 0

  createEffect(() => {
    if (props.ready()) {
      if (wait) {
        clearTimeout(wait)
        wait = undefined
      }
      if (!show()) return
      if (hold) return

      const left = 3000 - (Date.now() - stamp)
      if (left <= 0) {
        setShow(false)
        return
      }

      hold = setTimeout(() => {
        hold = undefined
        setShow(false)
      }, left).unref()
      return
    }

    if (hold) {
      clearTimeout(hold)
      hold = undefined
    }
    if (show()) return
    if (wait) return

    wait = setTimeout(() => {
      wait = undefined
      stamp = Date.now()
      setShow(true)
    }, 500).unref()
  })

  onCleanup(() => {
    if (wait) clearTimeout(wait)
    if (hold) clearTimeout(hold)
  })

  return (
    <Show when={show()}>
      <box position="absolute" zIndex={5000} left={0} right={0} bottom={1} justifyContent="center" alignItems="center">
        <box backgroundColor={theme.backgroundPanel} paddingLeft={1} paddingRight={1}>
          <Spinner color={theme.textMuted}>{text()}</Spinner>
        </box>
      </box>
    </Show>
  )
}
