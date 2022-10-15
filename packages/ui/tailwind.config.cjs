/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./../../packages/ui/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',

	],
	theme: {
		extend: {},
	},
	plugins: [
		require("daisyui"),
		require("./utils/tailwindcss-gradients"),
	],
}
