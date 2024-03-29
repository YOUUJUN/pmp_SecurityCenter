module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		parser: '@babel/eslint-parser',
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-unused-vars': 'off',
		'vue/multi-word-component-names': 'off',
		'valid-typeof': 'off',
		'vue/no-unused-vars': 'off',
		'prettier/prettier': 'off',
		'no-unreachable': 'off',
		'vue/no-unused-components': 'off'
	},
}
