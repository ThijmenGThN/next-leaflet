const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './source/components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter var', ...defaultTheme.fontFamily.sans] },
      colors: {
        "primary": "#11999e"
      }
    }
  },
  plugins: []
}
