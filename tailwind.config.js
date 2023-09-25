/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontSize: {
      xsm: "0.7rem",
      sm: "0.8rem",
      ss: "0.9rem",
      base: "1rem",
      lg: "1.1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    screens: {
      sm: "470px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        noto: ["Noto Sans", "sans-serif"],
        open: ["Open Sans", "sans-serif"],
      },
      colors: {
        gray: {
          100: "#f1f2f3",
          200: "#d6d8db",
          300: "#bbbec4",
          400: "#a0a4ac",
          500: "#848a94",
          600: "#6b717b",
          700: "#53585f",
          750: "#43474d",
          800: "#3b3f44",
          825: "#32363a",
          850: "#2c2f32",
          900: "#242629",
          950: "#1a1c1f",
        },
        blue: {
          100: "#e6f5ff",
          200: "#b3e1ff",
          300: "#80cdfe",
          400: "#4dbafe",
          500: "#0a8ada",
          600: "#0074bd",
          700: "#016db2",
          800: "#015a8c",
          900: "#014e7f",
          950: "#002f4c",
        },
        darkBlue:{
          100: "#252d3e",
          300: "#2c3446",
          500: "#1c2536",
          600: "#192233",
        },
        lightBlue: {
          100: "rgb(99 102 241)",
          200: "rgb(82,85,248)",
        },
        red: {
          600: "rgb(239 68 68)"
        }
      },
      gridTemplateColumns: {
        15: "repeat(15, minmax(0, 1fr))",
        16: "repeat(16, minmax(0, 1fr))",
      },
    },
  },
  plugins: [],
}
