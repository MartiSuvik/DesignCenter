import aspectRatio from '@tailwindcss/aspect-ratio';
import relumeTailwind from '@relume_io/relume-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C5A267',
        secondary: '#2D2D2D',
        gold: '#C0A960',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      transitionDuration: {
        '400': '400ms',
      },
      scale: {
        '102': '1.02',
      },
      boxShadow: {
        'elegant': '0 4px 6px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  presets: [relumeTailwind],
  plugins: [aspectRatio],
};