const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '../input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data
		.split('\n')
		.map(d => d.split(' | '))
		.map(d => d.map(dd => dd.split(' ')));

	let countOfUniqueDigits = 0;
	input.forEach(d => {
		d[1].forEach(dd => {
			if (dd.length == 2 || dd.length == 4 || dd.length == 3 || dd.length == 7)
				countOfUniqueDigits += 1;
		});
	});
	console.log(countOfUniqueDigits);
});
