/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['NeuePlak', 'sans-serif'],
        sansBold: ['NeuePlak-Bold', 'sans-serif'],
        sansWide: ['NeuePlak-WideBold', 'sans-serif']
      },
      colors: {
        blue: 'var(--blue-color)',
        'blue-dark': 'var(--dark-blue-color)',
        yellow: 'var(--yellow-color)',
        violet: 'var(--violet-color)',
        green: 'var(--green-color)',
        redish: 'var(--redish-color)',
        grey: 'var(--grey-color)',
        'light-error': 'var(--light-error-color)',
        error: 'var(--error-color)',
        'error-secondary': 'var(--error-secondary-color)',
        success: 'var(--success-color)'
      },
      boxShadow: {
        shadow1: 'var(--shadow-1)',
        shadow2: 'var(--shadow-2)'
      },
      transitionTimingFunction: {
        cubic: 'var(--cubic-bezier)'
      },
      screens: {
        '@992': '992px',
        '@768': '768px',
        '@520': '520px'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: '1550px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: theme('spacing.4'),
          paddingRight: theme('spacing.4')
        }
      })
    })
  ]
}
