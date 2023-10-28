/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js'
  ],
  theme: {
    extend: {
      backgroundColor : {
        'brand-80' : "#AE234560",
      
    },
  },
  plugins:[require('daisyui')],
}
}

