const plugin = require('tailwindcss/plugin')

const createBackdropFilterBlurUtilities = () => {
  const utilities = {};

  for(let i=0; i<=50; ++i) {
    utilities[`.backdrop-filter-blur-${i}`] = {
      backdropFilter: `blur(${i}px)`,
    };
  }

  return utilities;
}

const createZIndexUtilities = () => {
  const utilities = {};

  for(let i=0; i<=1000; ++i) {
    utilities[`.z-${i}`] = {
      zIndex: i,
    };
  }

  return utilities;
}

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function({ addUtilities }) {
      const newUtilities = {
        ...createBackdropFilterBlurUtilities(),
        ...createZIndexUtilities(),
      }

      addUtilities(newUtilities, ['responsive', 'hover'])
    })
  ],
}
