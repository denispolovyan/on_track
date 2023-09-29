/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   plugins: [],
   theme: {
      screens: {
			'start': '0px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
			'3xl': '1792px',
      }
   }
}
