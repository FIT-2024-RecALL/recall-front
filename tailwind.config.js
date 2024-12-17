/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  darkMode: 'class', // переводим в режим определения dark мода (срабатывают dark: модификаторы) по наличию класса dark у родителя
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      height: {
        '1/12': '8.333333%',
        '11/12': '91.666666%',
      },
      colors: {
        '1-1': '#178058',
        '1-2': '#2d8b67',
        '1-3': '#27a876',
        '1-4': '#53BD94',
        '1-5': '#77BFA3',
        '1-6': '#98C9A3',
        '1-7': '#BFD8BD',
        '1-8': '#DDE7C7',
        '1-9': '#EDEEC9',
        '1-10': '#F5F0C4',
        '1-11': '#FEF4D2',
        '1-12': '#f8f3e4',
        '2-1': '#02132A',
        '2-2': '#0F233F',
        '2-3': '#1D3456',
        '2-4': '#2A5D6C',
        '2-5': '#388A83',
        '2-6': '#4CCAA4',
        'o-black': '#02132A',
        'o-red': '#E63946',
        'o-white': '#F1FAEE',
        'o-blue': '#A8DADC',
        'o-mid-blue': '#457B9D',
        'o-dark-blue': '#1D3557',
      },
      keyframes: {
        appear: {
          '0%': { transform: 'scale(0.62)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        disappear: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.62)', opacity: 0 },
        },
        shake: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(1deg)' },
          '50%': { transform: 'rotate(0deg)' },
          '75%': { transform: 'rotate(-1deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        // теперь в className можно писать animate-appear animate-disappear
        appear: 'appear 100ms ease-in',
        disappear: 'disappear 100ms ease-in',
        shake: 'shake 0.3s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
