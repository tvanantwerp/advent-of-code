const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, './input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data.split('\n');

	const openers = ['(', '[', '{', '<'];
	const closers = [')', ']', '}', '>'];
	const penalties = {
		')': 3,
		']': 57,
		'}': 1197,
		'>': 25137,
	};
	const stack = [];
	const errors = [];
	input.forEach(line => {
		const characters = line.split('');
		for (let i = 0; i < characters.length; i++) {
			const character = characters[i];
			if (openers.includes(character)) {
				stack.push(character);
			}
			if (closers.includes(character)) {
				const lastOpener = stack.pop();
				if (lastOpener !== '(' && character === ')') {
					errors.push(character);
					break;
				}
				if (lastOpener !== '[' && character === ']') {
					errors.push(character);
					break;
				}
				if (lastOpener !== '{' && character === '}') {
					errors.push(character);
					break;
				}
				if (lastOpener !== '<' && character === '>') {
					errors.push(character);
					break;
				}
			}
		}
	});
	console.log(
		errors
			.map(err => penalties[err])
			.reduce((prev, curr) => {
				return prev + curr;
			}),
	);
});
