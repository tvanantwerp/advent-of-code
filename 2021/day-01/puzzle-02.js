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
		if (index > 0 && index < input.length - 2) {
			const thisWindow = measure + input[index + 1] + input[index + 2];
			const prevWindow = measure + input[index - 1] + input[index + 1];
			if (thisWindow > prevWindow) {
				count += 1;
			}
		}
	});

	console.log(count);
});
