const config = {
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		colors: {
			ebony: "#0B0C10",
			"dark-grey": "#202833",
			shale: "#C5C6C8",
			aqua: "#66FCF1",
			marine: "#46A29F"
		},
		extend: {
			
		},
	},
	plugins: [],
};

module.exports = config;
