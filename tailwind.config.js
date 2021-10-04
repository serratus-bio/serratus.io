const colors = require('tailwindcss/colors')

module.exports = {
    theme: {
        colors: {
            black: colors.black,
            white: colors.white,
            gray: colors.blueGray,
            blue: colors.sky,
            yellow: colors.yellow,
        },
    },
    variants: {
        backgroundColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
        textColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
        cursor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
    },
    plugins: [],
}