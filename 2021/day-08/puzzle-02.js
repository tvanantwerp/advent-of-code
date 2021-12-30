const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, './input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data
		.split('\n')
		.map(d => d.split(' | '))
		.map(d => d.map(dd => dd.split(' ')))
		.map(d =>
			d.map(dd =>
				dd.map(ddd => {
					return ddd.split('').sort().join('');
				}),
			),
		);

	let sumOfUniqueDigits = 0;
	input.forEach(d => {
		const [patterns, digits] = d;
		const easyPatterns = [
			...new Set(
				patterns.filter(
					pattern =>
						pattern.length === 2 ||
						pattern.length === 3 ||
						pattern.length === 4 ||
						pattern.length === 7,
				),
			),
		];
		const hardPatterns = [
			...new Set(
				patterns.filter(
					pattern =>
						pattern.length !== 2 ||
						pattern.length !== 3 ||
						pattern.length !== 4 ||
						pattern.length !== 7,
				),
			),
		];
		const numerals = new Map();
		let answer = '';
		for (let i = 0; i < 10; i++) {
			easyPatterns.forEach(pattern => {
				switch (pattern.length) {
					case 2:
						numerals.set(1, pattern);
						break;
					case 3:
						numerals.set(7, pattern);
						break;
					case 4:
						numerals.set(4, pattern);
						break;
					case 7:
						numerals.set(8, pattern);
						break;
				}
			});
			hardPatterns.forEach(pattern => {
				if (pattern.length === 6) {
					if (patternIncludesPattern(pattern, numerals.get(1))) {
						if (patternIncludesPattern(pattern, numerals.get(4))) {
							numerals.set(9, pattern);
						} else {
							numerals.set(0, pattern);
						}
					} else {
						numerals.set(6, pattern);
					}
				}
				if (pattern.length === 5) {
					if (patternIncludesPattern(pattern, numerals.get(1))) {
						numerals.set(3, pattern);
					} else {
						const patternMinusFour = subtractPattern(pattern, numerals.get(4));
						if (patternMinusFour.length === 2) numerals.set(5, pattern);
						if (patternMinusFour.length === 3) numerals.set(2, pattern);
					}
				}
			});
		}
		digits.forEach(d => {
			let digitAnswer = '?';
			numerals.forEach((value, key) => {
				if (value === d) {
					digitAnswer = key;
				}
			});
			answer += digitAnswer;
		});
		sumOfUniqueDigits += +answer;
	});
	console.log(sumOfUniqueDigits);
});

function patternIncludesPattern(pattern, comparison) {
	const patternLetters = pattern.split('');
	const comparisonLetters = comparison.split('');
	for (let i = 0; i < comparisonLetters.length; i++) {
		if (!patternLetters.includes(comparisonLetters[i])) {
			return false;
		}
	}
	return true;
}

function subtractPattern(pattern, subtractor) {
	const patternLetters = pattern.split('');
	const subtractorLetters = subtractor.split('');
	const remainder = patternLetters.filter(letter => {
		return !subtractorLetters.includes(letter);
	});
	return remainder.join('');
}
