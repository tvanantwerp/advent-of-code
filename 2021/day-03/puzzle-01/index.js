const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '../input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data.split('\n');

	let length = 0;
	const countOfOnes = new Map();

	input.forEach(binaryNumber => {
		length += 1;
		const binaryArray = binaryNumber.split('');
		const binaryLength = binaryArray.length - 1;
		binaryArray.forEach((num, i) => {
			if (!countOfOnes.get(binaryLength - i)) {
				countOfOnes.set(binaryLength - i, +num);
			} else {
				const currentCount = countOfOnes.get(binaryLength - i);
				countOfOnes.set(binaryLength - i, currentCount + +num);
			}
		});
	});

	let gamma = 0;
	let epsilon = 0;
	countOfOnes.forEach((value, key) => {
		if (value > length / 2) {
			gamma += 2 ** key;
		} else {
			epsilon += 2 ** key;
		}
	});

	console.log(gamma * epsilon);
});
