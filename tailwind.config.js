module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./source/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#11999e",
        "primary-darker": "#0c797d"
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
}