const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, './input.txt'), 'utf8', (err, data) => {
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
	let countOfPairs = new Map();
	const first = polymer[0];
	const last = polymer[polymer.length - 1];
	for (let i = 0; i < polymer.length - 1; i++) {
		const pair = `${polymer[i]}${polymer[i + 1]}`;
		if (countOfPairs.has(pair))
			countOfPairs.set(pair, countOfPairs.get(pair) + 1);
		else {
			countOfPairs.set(pair, 1);
		}
	}

	for (let steps = 0; steps < 40; steps++) {
		let newCountOfPairs = new Map();

		countOfPairs.forEach((count, pair) => {
			const pair1 = `${pair[0]}${instructions.get(pair)}`;
			const pair2 = `${instructions.get(pair)}${pair[1]}`;
			newCountOfPairs.set(
				pair1,
				newCountOfPairs.has(pair1) ? newCountOfPairs.get(pair1) + count : count,
			);
			newCountOfPairs.set(
				pair2,
				newCountOfPairs.has(pair2) ? newCountOfPairs.get(pair2) + count : count,
			);
		});
		countOfPairs = newCountOfPairs;
	}
	let max = 0;
	let min = Infinity;
	const countOfLetters = new Map();
	countOfPairs.forEach((count, pair) => {
		countOfLetters.set(
			pair[0],
			countOfLetters.has(pair[0]) ? countOfLetters.get(pair[0]) + count : count,
		);
		countOfLetters.set(
			pair[1],
			countOfLetters.has(pair[1]) ? countOfLetters.get(pair[1]) + count : count,
		);
	});
	countOfLetters.set(first, countOfLetters.get(first) + 1);
	countOfLetters.set(last, countOfLetters.get(last) + 1);
	countOfLetters.forEach((count, letter) => {
		countOfLetters.set(letter, count / 2);
	});
	countOfLetters.forEach(count => {
		if (count > max) max = count;
		if (count < min) min = count;
	});
	console.log(max - min);
});
