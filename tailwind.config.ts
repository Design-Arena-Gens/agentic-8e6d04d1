import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        night: "#0f172a",
        horizon: "#1e293b",
        aurora: "#38bdf8",
        ember: "#f97316",
        mist: "#cbd5f5"
      }
    }
  },
  plugins: []
};

export default config;
