/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: "#ffffff",
      slate: "#121212",
      "light-gray": "#e7e6e5",
      "hover-light-gray": "#d6d6d5",
      "input-background": "rgba(242, 241, 238, 0.6)",
      "sign-in": "rgb(235,87,87)",
      "sign-in-background": "rgb(253,245,242)",
      "dark-gray": "#979794",
    },
    fontSize: {
      xs: ["0.875rem", { letterSpacing: "-0.03em" }],
      sm: ["1rem", { letterSpacing: "-0.03em" }],
      lg: ["1.5rem", { letterSpacing: "-0.03em" }],
      xl: ["2rem", { letterSpacing: "-0.03em" }],
      "2xl": ["2.5rem", { letterSpacing: "-0.032em" }],
      "3xl": ["3rem", { letterSpacing: "-0.032em" }],
      "4xl": ["3.5rem", { letterSpacing: "-0.032em" }],
      "5xl": ["4rem", { letterSpacing: "-0.032em" }],
    },
    fontFamily: {
      satoshi: "Satoshi, sans-serif",
      inter: "Inter, sans-serif",
    },
    extend: {},
  },
  plugins: [],
};
