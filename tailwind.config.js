/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. We extend the color palette with our custom brand colors.
      colors: {
        background: '#FFFFFF', // Clean White
        text: '#111827',       // Dark Charcoal/Almost Black
        primary: '#F9FAFB',    // Very Light Grey
        accent: '#D4AF37',     // Muted Gold
      },
      // 2. We extend the font families with our chosen elegant fonts.
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'scaleY(0.5)' },
          '50%': { transform: 'scaleY(1)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
    },
        animation: {
        'wave-1': 'wave 1s infinite alternate',
        'wave-2': 'wave 1s 0.2s infinite alternate',
        'wave-3': 'wave 1s 0.4s infinite alternate',
        'wave-4': 'wave 1s 0.6s infinite alternate',
        'wave-5': 'wave 1s 0.8s infinite alternate',
        'dropdown-slide': 'slideDown 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
}