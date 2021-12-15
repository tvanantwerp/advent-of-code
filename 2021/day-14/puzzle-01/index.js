const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '../input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data.split('\n\n');
	let polymer = input[0];
	const instructions = new Map();
	input[1]
		.split('\n')
		.map(d => d.split(' -> '))
		.forEach(instruction => instructions.set(instruction[0], instruction[1]));

	for (let steps = 0; steps < 10; steps++) {
		let newPolymer = '';
		for (let i = 0; i < polymer.length - 1; i++) {
			const section = polymer.charAt(i) + polymer.charAt(i + 1);
			const newChar = instructions.get(section);
			newPolymer += polymer.charAt(i) + newChar;
			if (i === polymer.length - 2) newPolymer += polymer.charAt(i + 1);
		}
		polymer = newPolymer;
	}

	const countOfLetters = new Map();
	polymer
		.split('')
		.forEach(p =>
			countOfLetters.set(
				p,
				countOfLetters.get(p) ? countOfLetters.get(p) + 1 : 1,
			),
		);

	let max = 0;
	let min = Infinity;
	countOfLetters.forEach(value => {
		if (value > max) max = value;
		if (value < min) min = value;
	});
	console.log(max - min);
});
