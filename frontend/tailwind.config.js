/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4ff',
          100: '#e0e8ff',
          200: '#c7d6fe',
          300: '#a4bcfd',
          400: '#789bfb',
          500: '#4f6bf6',
          600: '#384ceb',
          700: '#2d3ab7',
          800: '#293294',
          900: '#262d75',
          950: '#171a48',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      keyframes: {
        'rainbow-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'rainbow-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
        'wave-breathe': {
          '0%, 100%': { transform: 'scale(1) translateY(0px)', opacity: '0.6' },
          '50%': { transform: 'scale(1.08) translateY(-4px)', opacity: '0.85' },
        },
      },
      animation: {
        'rainbow-spin': 'rainbow-spin 15s linear infinite',
        'rainbow-shift': 'rainbow-shift 12s ease infinite',
        'pulse-subtle': 'pulse-subtle 4s ease-in-out infinite',
        'wave-breathe': 'wave-breathe 8s ease-in-out infinite',
      },
      boxShadow: {
        'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.06)',
        'glass-md': '0 8px 32px 0 rgba(31, 38, 135, 0.08)',
        'glass-lg': '0 12px 48px 0 rgba(31, 38, 135, 0.12)',
        'glass-button': '0 4px 14px 0 rgba(79, 107, 246, 0.25)',
      },
    },
  },
  plugins: [],
};
