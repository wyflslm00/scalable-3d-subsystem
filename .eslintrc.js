module.exports = {
	env: {
		browser: false,
		es6: false,
	},
	extends: "plugin:vue/essential",
	parser: "babel-eslint",
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: "module",
	},
	plugins: ["vue"],
	rules: {
		"generator-star-spacing": "off",
		"no-tabs": "off",
		"no-unused-vars": "off",
		"no-console": "off",
		"no-irregular-whitespace": "off",
		"no-debugger": "off",
	},
};
