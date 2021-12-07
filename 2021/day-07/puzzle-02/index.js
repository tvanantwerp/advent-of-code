const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '../input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data.split(',').map(d => +d);
	const theAverage = average(input);

	let fuelToAverage = 0;
	input.forEach(value => {
		const distance = Math.abs(value - theAverage);
		// triangular number sequence
		let fuel = triangularNumber(distance);
		fuelToAverage += fuel;
	});

	console.log('using average', fuelToAverage);

	const positions = new Map();
	const min = Math.min(...input);
	const max = Math.max(...input);
	for (let i = min; i <= max; i++) {
		positions.set(i, 0);
	}
	positions.forEach((_, position) => {
		let totalFuel = 0;
		input.forEach(crab => {
			totalFuel += triangularNumber(Math.abs(position - crab));
		});
		positions.set(position, totalFuel);
	});
	console.log(
		'using brute force',
		Array.from(positions.values()).reduce((prev, curr) =>
			curr < prev ? curr : prev,
		),
	);
});

function average(arr) {
	return Math.floor(arr.reduce((prev, curr) => prev + curr) / arr.length);
}

function triangularNumber(distance) {
	return (distance * (distance + 1)) / 2;
}
