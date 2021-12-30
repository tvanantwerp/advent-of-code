const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, './input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data.split('\n').map(d => +d);
	let count = 0;
	input.forEach((measure, index) => {
		if (index > 0) {
			if (measure > input[index - 1]) {
				count += 1;
			}
		}
	});

	console.log(count);
});
