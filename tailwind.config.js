/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    screens: {
      xs: '320px',
      sm: '480px',
      md: '780px',
      lg: '1024px',
      '2lg': '1200px',
      xl: '1440px',
    },
    colors: {
      'red': 'var(--red)',
      'casal': 'var(--casal)',
      'grey': 'var(--grey)',
      'grey-light': 'var(--grey-light)',
      'concrete': 'var(--concrete)',
      'grey-dark': 'var(--grey-dark)',
      'blue': 'var(--blue)',
      'pink': 'var(--pink)',
      'orange': 'var(--orange)',
      'green': 'var(--green)',
      'white': 'var(--white)',
      'black': 'var(--black)',
      'transparent': 'var(--transparent)'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      zIndex: {
        '90': '90',
        '100': '100'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.card': {
          backgroundColor: theme('colors.white'),
          borderRadius: theme('borderRadius.lg'),
          padding: theme('spacing.6'),
          boxShadow: theme('boxShadow.xl'),
        },
        '.container': {
          padding: '0 7px'
        }
      })
    })
  ]
}
