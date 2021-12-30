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
	const points = {
		')': 1,
		']': 2,
		'}': 3,
		'>': 4,
	};
	const incompleteStacks = [];

	input.forEach(line => {
		const stack = [];
		const errors = [];
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
				}
				if (lastOpener !== '[' && character === ']') {
					errors.push(character);
				}
				if (lastOpener !== '{' && character === '}') {
					errors.push(character);
				}
				if (lastOpener !== '<' && character === '>') {
					errors.push(character);
				}
			}
			if (errors.length !== 0) {
				break;
			}
		}
		if (errors.length === 0) {
			incompleteStacks.push(stack);
		}
	});

	const completions = [];
	const scores = [];
	incompleteStacks.forEach(stack => {
		let completion = '';
		while (stack.length > 0) {
			const character = stack.pop();
			if (character === '(') completion += ')';
			if (character === '[') completion += ']';
			if (character === '{') completion += '}';
			if (character === '<') completion += '>';
		}
		completions.push(completion);
	});

	completions.forEach(completion => {
		let score = 0;
		const characters = completion.split('');
		characters.forEach(character => {
			score = score * 5 + points[character];
		});
		scores.push(score);
	});

	console.log(scores, scores.length);
	console.log(median(scores));
});

function median(arr) {
	const middle = Math.floor(arr.length / 2);
	const sortedArr = arr.sort((a, b) => a - b);
	return arr.length % 2 === 0
		? (sortedArr[middle - 1] + sortedArr[middle]) / 2
		: sortedArr[middle];
}
