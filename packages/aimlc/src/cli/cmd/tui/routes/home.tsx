import { Prompt, type PromptRef } from "@tui/component/prompt"
import { createEffect, createSignal } from "solid-js"
import { useTheme } from "../context/theme"
import { useProject } from "../context/project"
import { useSync } from "../context/sync"
import { Toast } from "../ui/toast"
import { useArgs } from "../context/args"
import { useRouteData } from "@tui/context/route"
import { usePromptRef } from "../context/prompt"
import { useLocal } from "../context/local"
import { TuiPluginRuntime } from "../plugin"

let once = false
const placeholder = {
  normal: ["Perbaiki TODO di codebase ini", "Apa tech stack project ini?", "Perbaiki test yang gagal"],
  shell: ["ls -la", "git status", "pwd"],
}

export function Home() {
  const sync = useSync()
  const project = useProject()
  const route = useRouteData("home")
  const promptRef = usePromptRef()
  const [ref, setRef] = createSignal<PromptRef | undefined>()
  const args = useArgs()
  const local = useLocal()
  const { theme } = useTheme()
  let sent = false

  const bind = (r: PromptRef | undefined) => {
    setRef(r)
    promptRef.set(r)
    if (once || !r) return
    if (route.prompt) {
      r.set(route.prompt)
      once = true
      return
    }
    if (!args.prompt) return
    r.set({ input: args.prompt, parts: [] })
    once = true
  }

  // Wait for sync and model store to be ready before auto-submitting --prompt
  createEffect(() => {
    const r = ref()
    if (sent) return
    if (!r) return
    if (!sync.ready || !local.model.ready) return
    if (!args.prompt) return
    if (r.current.input !== args.prompt) return
    sent = true
    r.submit()
  })

  return (
    <>
      <box flexGrow={1} alignItems="center" paddingLeft={2} paddingRight={2}>
        <box flexGrow={1} minHeight={0} />
        <box height={4} minHeight={0} flexShrink={1} />
        <box flexShrink={0}>
          <TuiPluginRuntime.Slot name="home_logo" mode="replace">
            <box flexDirection="column" alignItems="center">
              <text bold fg={"#cc0000"}> ░█████╗░██╗███╗░░░███╗██╗░░░░░░█████╗░</text>
              <text bold fg={"#dd1111"}> ██╔══██╗██║████╗░████║██║░░░░░██╔══██╗</text>
              <text bold fg={"#ee2222"}> ███████║██║██╔████╔██║██║░░░░░██║░░╚═╝</text>
              <text bold fg={"#ff3333"}> ██╔══██║██║██║╚██╔╝██║██║░░░░░██║░░██╗</text>
              <text bold fg={"#ff5555"}> ██║░░██║██║██║░╚═╝░██║███████╗╚█████╔╝</text>
              <text bold fg={"#ff7777"}> ╚═╝░░╚═╝╚═╝╚═╝░░░░╚═╝╚══════╝░╚════╝░</text>
              <text fg={"#441111"}>  ══════════════════════════════════════  </text>
              <text bold fg={"#ffffff"}>   AI Muliawan Long Code   </text>
              <text fg={"#444444"}>   by Hari Muliawan, S.Mat   </text>
            </box>
          </TuiPluginRuntime.Slot>
        </box>
        <box height={1} minHeight={0} flexShrink={1} />
        <box width="100%" maxWidth={75} zIndex={1000} paddingTop={1} flexShrink={0}>
          <TuiPluginRuntime.Slot
            name="home_prompt"
            mode="replace"
            workspace_id={project.workspace.current()}
            ref={bind}
          >
            <Prompt
              ref={bind}
              workspaceID={project.workspace.current()}
              right={<TuiPluginRuntime.Slot name="home_prompt_right" workspace_id={project.workspace.current()} />}
              placeholders={placeholder}
            />
          </TuiPluginRuntime.Slot>
        </box>
        <TuiPluginRuntime.Slot name="home_bottom" />
        <box flexGrow={1} minHeight={0} />
        <Toast />
      </box>
      <box width="100%" flexShrink={0}>
        <TuiPluginRuntime.Slot name="home_footer" mode="single_winner" />
      </box>
    </>
  )
}
