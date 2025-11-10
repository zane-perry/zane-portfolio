import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"]
      },
      colors: {
        background: "#f8fafc",
        surface: "#ffffff",
        accent: {
          DEFAULT: "#14b8a6", /* teal */
          light: "#7dd3c6",
          dark: "#0f766e"
        }
      }
    }
  },
  plugins: []
};

export default config;
