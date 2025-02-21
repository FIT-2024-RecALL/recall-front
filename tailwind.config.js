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
        'o-white': '#FFFFEF',
        'o-gray': '#D8D8D8',
        'o-black': '#02132A',
        'o-red-sm': '#FF9B85',
        'o-red-md': '#EE6055',
        'o-red-lg': '#FF5E5B',
        'o-green-sm': '#AAF683',
        'o-green-lg': '#60D394',
        'o-yellow-sm': '#FFD97D',
        'o-yellow-lg': '#FFED66',
        'o-blue-sm': '#6CB7E6',
        'o-blue-lg': '#437bd4',
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
