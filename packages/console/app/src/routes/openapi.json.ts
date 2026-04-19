export async function GET() {
  const response = await fetch(
    "https://raw.githubusercontent.com/harimuliawan999-sys/ai-muliawan-long-code/refs/heads/dev/packages/sdk/openapi.json",
  )
  const json = await response.json()
  return json
}
