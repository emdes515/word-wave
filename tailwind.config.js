/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/routes/**/*.{svelte,js,ts}',
		'./src/app.html',
		'./src/components/**/*.{svelte,js,ts}'
	],
	plugins: [require('daisyui'), require('tailwindcss-motion')],
	daisyui: {
		themes: ['light', 'dark', 'cupcake']
	}
};
