/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./../../packages/ui/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',

	],
	theme: {
		extend: {},
	},
	plugins: [
		require("daisyui"),
		require("./gradients-plugin"),
	],
}
