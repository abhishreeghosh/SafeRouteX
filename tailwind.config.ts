import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#05070d",
        foreground: "#eef7ff",
        muted: "#8fa4b8",
        border: "rgba(255,255,255,0.12)",
        cyber: {
          cyan: "#23f5ff",
          mint: "#45ffb4",
          amber: "#ffd36e",
          red: "#ff4f79",
          violet: "#9d7bff",
          ink: "#07111f"
        }
      },
      boxShadow: {
        glow: "0 0 45px rgba(35,245,255,0.24)",
        danger: "0 0 38px rgba(255,79,121,0.28)",
        mint: "0 0 32px rgba(69,255,180,0.18)"
      },
      backgroundImage: {
        "radial-grid": "radial-gradient(circle at 20% 10%, rgba(35,245,255,0.22), transparent 28%), radial-gradient(circle at 80% 0%, rgba(157,123,255,0.22), transparent 30%), linear-gradient(180deg, #05070d 0%, #07111f 52%, #030407 100%)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"]
      },
      keyframes: {
        pulseHeat: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.65" },
          "50%": { transform: "scale(1.16)", opacity: "0.95" }
        },
        scan: {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(120%)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        }
      },
      animation: {
        "pulse-heat": "pulseHeat 2.8s ease-in-out infinite",
        scan: "scan 5s linear infinite",
        float: "float 7s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
