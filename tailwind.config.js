/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.js'],
  theme: {
    extend: {
      colors: {
        apple: { 50: '#fdf1ef', 100: '#fbdcd7', 500: '#ea3d33', 600: '#d02f26', 700: '#a8241d' },
        leaf: { 50: '#f1f6ec', 100: '#e0ecd5', 200: '#c3dbad', 500: '#4c8233', 600: '#3d6a29', 700: '#2f5220', 800: '#233d18', 900: '#18290f' },
        cream: { DEFAULT: '#fbf7ef', 100: '#f6efe1', 200: '#efe4cc' },
        charcoal: { DEFAULT: '#2f2f2f', 600: '#4a4a48', 400: '#6e6d68' },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
};
