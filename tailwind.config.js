/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '400': '400ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'in-out': 'cubic-bezier(0.42, 0, 0.58, 1)',
      },
      transitionDelay: {
        '200': '200ms',
        '300': '300ms',
      },
      fontFamily: {
        'sans': [Ubuntu, 'sans-serif'], 
    },
  },
  plugins: [],
}
}
