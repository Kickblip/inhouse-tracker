import type { Config } from "tailwindcss"

const config = {
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
} satisfies Config

export default config
