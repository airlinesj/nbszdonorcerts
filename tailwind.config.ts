import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: "#7A1B29",
        crimson: "#9E2A38",
        parchment: "#FCFBF9",
        charcoal: "#2C2C2C",
        ink: "#17191C",
        mist: "#F3F0ED"
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        sans: ["Avenir Next", "Avenir", "Helvetica Neue", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;