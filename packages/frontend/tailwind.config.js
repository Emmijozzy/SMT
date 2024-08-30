/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
import { fontFamily } from "tailwindcss/defaultTheme";
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./public/assets/**/*.{js,ts,jsx,tsx}"],
  important: "#root",
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes").light,
          // "font-100": {
          //   "color": "#637590",
          // },
          // font200: "#344767",
          "--font-100": "216deg 18.52% 47.65%",
          ".btn-twitter": {
            "background-color": "#1EA1F1",
            "border-color": "#1EA1F1",
          },
          ".btn-twitter:hover": {
            "background-color": "#1C96E1",
            "border-color": "#1C96E1",
          },
        },
        dark: {
          ...require("daisyui/src/theming/themes").dark,
          "font-100": "#ffffff",
          "font-200": "#a9b0ba",
          ".btn-twitter": {
            "background-color": "#1EA1F1",
            "border-color": "#1EA1F1",
          },
          ".btn-twitter:hover": {
            "background-color": "#1C96E1",
            "border-color": "#1C96E1",
          },
        },
      },
      "cupcake",
      "retro",
      "synthwave",
    ],
  },
  theme: {
    extend: {
      backgroundImage: {
        "radial-gradient": "radial-gradient(var(--tw-gradient-stops))",
        "conic-gradient": "conic-gradient(from 225deg, #FFC876, #79FFF7, #9F53FF, #FF98E2, #FFC876)",
        "hero-pattern": "url('./src/assets/images/curved14.jpg')",
      },
      fontFamily: {
        sans: ["var(--font-sora)", ...fontFamily.sans],
      },
      colors: {
        "font-100": "hsl(var(--font-100) / <alpha-value>)",
      },
      transitionDuration: {
        DEFAULT: "300ms",
      },
      transitionTimingFunction: {
        DEFAULT: "linear",
        "ease-in-out": "cubic-bezier(0.42, 0, 0.58, 1)",
        "ease-in": "cubic-bezier(0.42, 0, 1, 1)",
        "in-expo": "cubic-bezier(0.95, 0.05, 0.795, 0.035)",
        "out-expo": "cubic-bezier(0.19, 1, 0.22, 1)",
      },
      spacing: {
        0.25: "0.0625rem",
        1.25: "0.3125rem",
        2.7: "0.675rem",
        5.75: "1.4375rem",
        7.5: "1.875rem",
        15: "3.75rem",
      },
      height: {
        "calc-half-vh": "calc(100% - 80px)",
        // Add more custom heights using calc() here
      },
      keyframes: {
        slideRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        slideLeft: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "slide-right": "slideRight 0.5s ease-in-out",
        "slide-left": "slideLeft 0.5s ease-in-out",
      },
    },
  },

  plugins: [
    daisyui,
    plugin(({ addBase, addComponents, addUtilities }) => {
      addBase({});
      addComponents({
        ".container": {
          "@apply relative w-full max-w-[77.5rem] mx-auto p-2 md:p-4 xl:max-w-[87.5rem] rounded-lg bg-base-100": {},
        },
        ".h1": {
          "@apply font-semibold text-[2.5rem] leading-[3.25rem] md:text-[2.75rem] md:leading-[3.75rem] lg:text-[3.25rem] lg:leading-[4.0625rem] xl:text-[3.75rem] xl:leading-[4.5rem]":
            {},
        },
        ".h2": {
          "@apply text-[1.75rem] leading-[2.5rem] md:text-[2rem] md:leading-[2.5rem] lg:text-[2.5rem] lg:leading-[3.5rem] xl:text-[3rem] xl:leading-tight":
            {},
        },
        ".h3": {
          "@apply text-[2rem] leading-normal md:text-[2.5rem]": {},
        },
        ".h4": {
          "@apply text-[2rem] leading-normal": {},
        },
        ".h5": {
          "@apply text-2xl leading-normal": {},
        },
        ".h6": {
          "@apply font-semibold text-lg leading-8": {},
        },
        ".body-1": {
          "@apply text-[0.875rem] leading-[1.5rem] md:text-[1rem] md:leading-[1.75rem] lg:text-[1.25rem] lg:leading-8":
            {},
        },
        ".body-2": {
          "@apply font-light text-[0.875rem] leading-6 md:text-xs": {},
        },
        ".body-3": {
          "@apply font-bold text-xs leading-snug md:text-xs": {},
        },
        ".caption": {
          "@apply text-sm": {},
        },
        ".tagline": {
          "@apply font-grotesk font-light text-xs tracking-tagline uppercase": {},
        },
        ".quote": {
          "@apply font-sans text-lg leading-normal": {} /* add font to it */,
        },
        ".button": {
          "@apply font-sans text-xs font-bold uppercase tracking-wider": {}, // add font to it
        },
        ".bg-pink-gradient": {
          "@apply bg-gradient-to-tl from-purple-700 to-pink-500": {},
        },
        ".bg-gray-gradient": {
          "@apply bg-gradient-to-tl from-gray-900 to-slate-800": {},
        },
        ".bg-blue-gradient": {
          "@apply bg-gradient-to-tl from-blue-600 to-cyan-400": {},
        },
        ".bg-green-gradient": {
          "@apply bg-gradient-to-tl from-green-600 to-lime-400": {},
        },
        ".bg-orange-gradient": {
          "@apply bg-gradient-to-tl from-red-500 to-yellow-400": {},
        },
        ".bg-red-gradient": {
          "@apply bg-gradient-to-tl from-red-600 to-rose-400": {},
        },
        ".MuiDataGrid-root": {
          "@apply border-none body-1 text-base-content": {},
        },
      });
      addUtilities({
        ".tap-highlight-color": {
          "-webkit-tap-highlight-color": "rgba(0, 0, 0, 0)",
        },
        ".bg-brand-gradient": {
          "background-image": "linear-gradient(#3490dc, #6574cd)",
        },
      });
    }),
  ],
};

// bg-gradient-to-r from-slate-900 to-slate-700
