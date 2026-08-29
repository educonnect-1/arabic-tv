import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F7F5F0",
          100: "#EFE9DC",
          200: "#D4C5A9",
          300: "#B8A080",
          400: "#9C7B57",
          500: "#7A5C3E",
          600: "#5C442E",
          700: "#3E2C1E",
          800: "#20160E",
          900: "#0A0705",
        },
        accent: {
          sage: "#8B9D83",
          terracotta: "#C17B5D",
          gold: "#D4AF37",
          slate: "#64748B",
        },
        success: "#6B8E6B",
        warning: "#D4A574",
        error: "#B85C5C",
        info: "#5C8B9C",
      },
      fontFamily: {
        sans: ['var(--font-ibm-plex)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-tajawal)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;