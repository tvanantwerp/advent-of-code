const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '../input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data.split('\n').map(d => {
		const [direction, amount] = d.split(' ');
		return { direction, amount: +amount };
	});

	let aim = 0;
	let depth = 0;
	let position = 0;
	input.forEach(command => {
		switch (command.direction) {
			case 'forward':
				position += command.amount;
				depth += aim * command.amount;
				break;
			case 'up':
				aim -= command.amount;
				break;
			case 'down':
				aim += command.amount;
		}
	});

	console.log(depth * position);
});
