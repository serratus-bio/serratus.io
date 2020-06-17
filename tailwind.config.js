const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.html'],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: []
      }
    },
  },
  variants: {},
  plugins: [],
}
