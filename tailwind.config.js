/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0D1B4C',
        'navy-deep': '#091238',
        gold: '#FFC107',
        royal: '#2563EB',
        ink: '#0F172A',
        mist: '#F8FAFC',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        display: ['Cinzel', 'serif'],
      },
      maxWidth: { '8xl': '88rem' },
    },
  },
  plugins: [],
}
