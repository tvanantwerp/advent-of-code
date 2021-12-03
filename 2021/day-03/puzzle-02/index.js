const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '../input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data.split('\n');

	let oxygen = filterValues(input, true);
	let carbonDioxide = filterValues(input, false);

	console.log(binaryToDecimal(oxygen) * binaryToDecimal(carbonDioxide));
});

function filterValues(input, matchGreaterNumber) {
	let output = input;
	for (let digit = 0; digit < input[0].length; digit++) {
		const countOfOnes = calculateFrequency(output);
		output = output.filter(num => {
			const d = +num[digit];
			const match = matchGreaterNumber
				? d === countOfOnes.get(digit)
				: d !== countOfOnes.get(digit);
			return match;
		});

		if (output.length === 1) {
			output = output[0];
			break;
		}
	}
	return output;
}

function calculateFrequency(input) {
	let length = 0;
	const countOfOnes = new Map();

	input.forEach(binaryNumber => {
		length += 1;
		const binaryArray = binaryNumber.split('');
		binaryArray.forEach((num, i) => {
			if (!countOfOnes.get(i)) {
				countOfOnes.set(i, +num);
			} else {
				const currentCount = countOfOnes.get(i);
				countOfOnes.set(i, currentCount + +num);
			}
		});
	});

	countOfOnes.forEach((value, key) => {
		if (value < length / 2) {
			countOfOnes.set(key, 0);
		} else {
			countOfOnes.set(key, 1);
		}
	});

	return countOfOnes;
}

function binaryToDecimal(binary) {
	const reversedNumbers = binary.split('').reverse();
	const decimal = reversedNumbers.reduce((prev, curr, i) => {
		return prev + curr * 2 ** i;
	}, 0);
	return decimal;
}
