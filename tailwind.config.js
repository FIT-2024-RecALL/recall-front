/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss/colors')} */

const colors = require('tailwindcss/colors');

// eslint-disable-next-line no-undef
module.exports = {
  darkMode: 'class', // переводим в режим определения dark мода (срабатывают dark: модификаторы) по наличию класса dark у родителя
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      ...colors,
      '1-1': '#02132A',
      '1-2': '#0F233F',
      '1-3': '#1D3456',
      '1-4': '#2A5D6C',
      '1-5': '#388A83',
      '1-6': '#4CCAA4',
      red: '#E63946',
      '2-1': '#F1FAEE',
      '2-2': '#A8DADC',
      '2-3': '#457B9D',
      '2-4': '#1D3557',
      '2-5': '#0A0866',
    },
    extend: {
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
        shake: 'shake 0.3s infinite',
      },
    },
  },
  plugins: [],
};
