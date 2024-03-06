import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        body: ["var(--font-sans)", "sans-serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          lg: "1.5rem",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, theme }) {
      addComponents({});
      addBase({
        h1: {
          fontSize: theme("fontSize.5xl"),
          fontFamily: theme("fontFamily.display"),
          lineHeight: theme("lineHeight.tight"),
          "@screen lg": {
            fontSize: theme("fontSize.7xl"),
          },
        },
        h2: {
          fontSize: theme("fontSize.3xl"),
          fontFamily: theme("fontFamily.display"),
          "@screen lg": {
            fontSize: theme("fontSize.5xl"),
          },
        },
        h3: {
          fontSize: theme("fontSize.2xl"),
          fontFamily: theme("fontFamily.display"),
          "@screen lg": {
            fontSize: theme("fontSize.4xl"),
          },
        },
        h4: {
          fontSize: theme("fontSize.xl"),
          fontFamily: theme("fontFamily.display"),
          "@screen lg": {
            fontSize: theme("fontSize.2xl"),
          },
        },
        h5: {
          fontSize: theme("fontSize.lg"),
        },
        h6: {
          fontSize: theme("fontSize.base"),
        },
        body: {
          "font-family": theme("fontFamily.sans"),
          "font-size": theme("fontSize.base"),
          "font-weight": theme("fontWeight.normal"),
        },
      });
    }),
  ],
};
export default config;
