/* eslint-disable prettier/prettier */
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: theme => ({
        'fundo': "url('/img/background.jpg')"
      })
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
