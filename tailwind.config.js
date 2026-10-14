/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Outfit Variable"', 'Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        maroon: { 950: '#2a0612', 900: '#3d0a1c', 800: '#560f28', 700: '#7a1a3a', 600: '#9b2450' },
        gold: { 200: '#fbeab7', 300: '#f6dd8f', 400: '#efc65a', 500: '#d9a521', 600: '#a97d12' },
        ivory: { 50: '#fdf9f0', 100: '#f8f0df', 200: '#efe3c8' },
      },
      keyframes: {
        shimmer: { '0%': { backgroundPosition: '200% 0' }, '100%': { backgroundPosition: '-200% 0' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        pulseRing: { '0%': { transform: 'scale(1)', opacity: 0.6 }, '100%': { transform: 'scale(1.8)', opacity: 0 } },
        twinkle: { '0%,100%': { opacity: 0.25, transform: 'scale(0.8)' }, '50%': { opacity: 1, transform: 'scale(1.15)' } },
      },
      animation: {
        shimmer: 'shimmer 7s linear infinite',
        marquee: 'marquee 45s linear infinite',
        pulseRing: 'pulseRing 2s ease-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
