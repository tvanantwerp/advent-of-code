const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '../input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data.split('\n').map(d => {
		const [direction, amount] = d.split(' ');
		return { direction, amount };
	});

	let depth = 0;
	let position = 0;
	input.forEach(command => {
		switch (command.direction) {
			case 'forward':
				position += +command.amount;
				break;
			case 'up':
				depth -= +command.amount;
				break;
			case 'down':
				depth += +command.amount;
		}
	});

	console.log(depth * position);
});
