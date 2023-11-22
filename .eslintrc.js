module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		parser: '@typescript-eslint/parser',
		ecmaFeatures: {
			globalReturn: false,
			jsx: true,
			impliedStrict: false,
			experimentalObjectRestSpread: false,
		},
	},
	extends: [
		'eslint-config-prettier',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:vue/vue3-recommended',
		'plugin:vue/vue3-essential',
		'plugin:prettier/recommended',
	],
	plugins: [],
	globals: {
		defineProps: 'readonly',
		defineEmits: 'readonly',
		defineExpose: 'readonly',
		withDefaults: 'readonly',
		NodeJS: true,
	},
	rules: {
		// @typescript-eslint
		'@typescript-eslint/no-explicit-any': 'off', // 禁止使用该 any 类型
		// vue
		'vue/html-self-closing': 'off', // 执行自闭合的风格
		'vue/multi-word-component-names': 'off', // 文件命名强制驼峰
		'prefer-rest-params': 0,
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/no-this-alias': [
			'error',
			{
				allowDestructuring: false,
				allowedNames: ['self'],
			},
		],
		'@typescript-eslint/ban-types': [
			'error',
			{
				extendDefaults: true,
				types: {
					'{}': false,
				},
			},
		],
	},
};
