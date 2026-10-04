/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Rich Terracotta / Burnt Orange
        brand: {
          50: '#FDF7F5',
          100: '#F8ECE7',
          200: '#F0D5C9',
          300: '#E4B4A1',
          400: '#D68C72',
          500: '#C85A32', // Rich Terracotta / Burnt Orange Primary
          600: '#B24A24', // Hover Terracotta
          700: '#943A1B',
          800: '#792E15',
          900: '#642613',
        },
        // Rich Charcoal Slate
        charcoal: {
          50: '#F4F5F7',
          100: '#E2E5EB',
          200: '#C5CBD6',
          300: '#9EA8B8',
          400: '#727E92',
          500: '#505D71',
          600: '#3A4555',
          700: '#2C3542',
          800: '#1C2229', // Deep Charcoal Slate
          900: '#14181E', // Rich Dark Charcoal
          950: '#0C0E12',
        },
        // Warm Off-White / Alabaster
        alabaster: {
          50: '#FAF8F5',  // Main Warm Off-White Page Background
          100: '#F5F2EB', // Warm Off-White Card / Surface
          200: '#EAE4D8', // Warm Soft Border
          300: '#DCD4C4', // Muted Alabaster
          400: '#BDB19B',
          500: '#9F9177',
        },
        slateText: '#1C2229',
        lightBg: '#FAF8F5',
        softBorder: '#EAE4D8',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card-lift': '0 14px 28px rgba(28, 34, 41, 0.08), 0 10px 10px rgba(28, 34, 41, 0.03)',
        'hero': '0 20px 40px -15px rgba(200, 90, 50, 0.15)',
        'terracotta': '0 10px 25px -5px rgba(200, 90, 50, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 1.5s infinite linear',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
