const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '../input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data.split(',').map(d => +d);
	const theMedian = median(input);

	let distanceToMedian = 0;
	input.forEach(value => {
		distanceToMedian += Math.abs(value - theMedian);
	});

	console.log(distanceToMedian);
});

function median(arr) {
	const middle = Math.floor(arr.length / 2);
	const sortedArr = arr.sort((a, b) => a - b);
	return arr.length % 2 === 0
		? (sortedArr[middle - 1] + sortedArr[middle]) / 2
		: sortedArr[middle];
}
