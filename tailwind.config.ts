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
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          DEFAULT: "#0a1628",
          light: "#132743",
        },
        accent: {
          DEFAULT: "#1565c0",
          light: "#1e88e5",
        },
        cyan: {
          DEFAULT: "#00bcd4",
        },
        surface: "#f8fafc",
      },
    },
  },
  plugins: [],
};
export default config;
