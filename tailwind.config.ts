import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#000000",
          }
        },
        dark: {
          colors: {
            background: "#000000",
            foreground: "#E2E2E2",
            primary: {
              50: "#FAFAFA",
              100: "#F5F5F5",
              200: "#E5E5E5",
              300: "#D4D4D4",
              400: "#A3A3A3",
              500: "#737373",
              600: "#525252",
              700: "#404040",
              800: "#262626",
              900: "#171717",
              DEFAULT: "#FFFFFF",
              foreground: "#000000",
            },
            focus: "#FF00FF",
            secondary: {
              DEFAULT: "#00FF00",
              foreground: "#000000",
            },
            success: {
              DEFAULT: "#00FFFF",
              foreground: "#000000",
            },
            warning: {
              DEFAULT: "#FF8800",
              foreground: "#000000",
            },
            danger: {
              DEFAULT: "#FF0000",
              foreground: "#000000",
            },
          }
        }
      }
    })
  ]
} satisfies Config;
