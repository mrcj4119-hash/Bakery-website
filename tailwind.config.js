/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cocoa: {
          50: '#faf6f2',
          100: '#f1e7dc',
          200: '#e0cdb8',
          300: '#c9ae92',
          400: '#a98566',
          500: '#8a6446',
          600: '#6e4d34',
          700: '#553a27',
          800: '#3d2a1d',
          900: '#2a1d14',
        },
        cream: {
          50: '#fffdf9',
          100: '#fbf6ec',
          200: '#f5ecdc',
          300: '#ebdcc2',
        },
        terracotta: {
          100: '#f7e3d9',
          300: '#e6a47f',
          500: '#c26a3f',
          600: '#a9552d',
          700: '#8c4424',
        },
        gold: {
          100: '#faf0d2',
          300: '#e7c26a',
          500: '#c9963a',
          600: '#a87c2a',
        },
        whatsapp: {
          500: '#25d366',
          600: '#1ebe5a',
          700: '#128c4a',
        },
        success: {
          100: '#e3f4e8',
          500: '#2f7d4f',
        },
        warning: {
          100: '#fdf1d8',
          500: '#a86d12',
        },
        error: {
          100: '#fbe4e1',
          500: '#b3352a',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(42, 29, 20, 0.25)',
        lift: '0 24px 50px -20px rgba(42, 29, 20, 0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'slide-in-right': 'slide-in-right 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
