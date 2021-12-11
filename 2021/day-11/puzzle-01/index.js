const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '../testInput.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data.split('\n').map(d => d.split('').map(d => +d));
});
