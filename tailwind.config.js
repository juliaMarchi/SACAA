/* eslint-disable prettier/prettier */
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'fundo': "url('/img/background.jpg')",
        'fundo2': "url('/img/background2.png')"
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
