/**
 * Application-wide constants and configuration
 */
export const config = {
  // Base URL
  baseUrl: "https://aimuliawan.dev",

  // GitHub
  github: {
    repoUrl: "https://github.com/harimuliawan999-sys/ai-muliawan-long-code",
    starsFormatted: {
      compact: "140K",
      full: "140,000",
    },
  },

  // Social links
  social: {
    twitter: "https://x.com/opencode",
    discord: "https://discord.gg/opencode",
  },

  // Static stats (used on landing page)
  stats: {
    contributors: "850",
    commits: "11,000",
    monthlyUsers: "6.5M",
  },
} as const
