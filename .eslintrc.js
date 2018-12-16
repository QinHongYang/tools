module.exports = {
	root: true,
	// extends: [
	// 	'standard',
	// ],
	extends: 'standard',
	rules: {
		'comma-dangle': [
			'error',
			{
				'arrays': 'always-multiline',
				'objects': 'always-multiline',
				'imports': 'always-multiline',
				'exports': 'always-multiline',
				'functions': 'always-multiline',
			},
		],
		'indent': [
			'error',
			'tab',
			{
				'SwitchCase': 1,
			},
		],
		'no-tabs': [0],
	},
	globals: {
		jest: false,
		test: false,
		expect: false,
	},
}
