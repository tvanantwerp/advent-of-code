const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '../input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data.split('\n');
	const lineSegments = input
		.map(i => i.split(' -> '))
		.map(i => i.map(j => j.split(',')))
		.map(i => {
			return { x1: i[0][0], y1: i[0][1], x2: i[1][0], y2: i[1][1] };
		});
	console.log(lineSegments);
});
