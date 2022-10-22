/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}", "./index.html"],
	theme: {
		extend: {
			colors: {
				main: "#043c48",
				accent: "#0BC4CF",
				special: "#E9ED02",
			},
		},
	},
	plugins: [],
};
