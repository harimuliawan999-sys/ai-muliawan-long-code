const stage = process.env.SST_STAGE || "dev"

export default {
  url: stage === "production" ? "https://aimuliawan.dev" : `https://${stage}.aimuliawan.dev`,
  console: stage === "production" ? "https://aimuliawan.dev/auth" : `https://${stage}.aimuliawan.dev/auth`,
  email: "contact@anoma.ly",
  socialCard: "https://social-cards.sst.dev",
  github: "https://github.com/harimuliawan999-sys/ai-muliawan-long-code",
  discord: "https://aimuliawan.dev/discord",
  headerLinks: [
    { name: "app.header.home", url: "/" },
    { name: "app.header.docs", url: "/docs/" },
  ],
}
