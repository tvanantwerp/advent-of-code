module.exports = function (plop) {
	plop.setGenerator('controller', {
		description: 'application controller logic',
		prompts: [
			{
				type: 'input',
				name: 'year',
				message: 'What year?',
			},
			{
				type: 'input',
				name: 'day',
				message: 'What day?',
			},
		],
		actions: [
			{
				type: 'add',
				path: `{{year}}/day-{{day}}/puzzle-01.js`,
				templateFile: 'puzzle.hbs',
			},
			{
				type: 'add',
				path: '{{year}}/day-{{day}}/puzzle-02.js',
				templateFile: 'puzzle.hbs',
			},
			{
				type: 'add',
				path: '{{year}}/day-{{day}}/testInput.txt',
				templateFile: 'input.hbs',
			},
			{
				type: 'add',
				path: '{{year}}/day-{{day}}/input.txt',
				templateFile: 'input.hbs',
			},
		],
	});
};
