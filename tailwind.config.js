/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      "white": "#ffffff",
      "slate": "#121212",
      "light-gray": "#e7e6e5",
      "hover-light-gray": "#e3e3e2",
      "dark-gray": "#19171199",
      "hover-dark-gray": "#37352f14",
    },
    fontSize: {
      xs: ['0.875rem', { letterSpacing: '-0.03em'}],
      sm: ['1rem', { letterSpacing: '-0.03em'}],
      lg: ['1.5rem', { letterSpacing: '-0.03em'}],
      xl: ['2rem', { letterSpacing: '-0.03em'}],
      '2xl': ['2.5rem', { letterSpacing: '-0.032em'}],
      '3xl': ['3rem', { letterSpacing: '-0.032em'}],
      '4xl': ['3.5rem', { letterSpacing: '-0.032em'}],
      '5xl': ['4rem', { letterSpacing: '-0.032em'}]
    },
    fontFamily: {
      satoshi: 'Satoshi, sans-serif',
      inter: 'Inter, sans-serif',
    },
    extend: {
    },
  },
  plugins: [],
}
