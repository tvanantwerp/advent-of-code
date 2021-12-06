const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '../input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data.split(',').map(d => +d);
	let countOfFishAges = new Map();
	Array.from({ length: 9 }).map((_, i) => countOfFishAges.set(i, 0));
	input.forEach(fish => {
		if (countOfFishAges.has(fish)) {
			countOfFishAges.set(fish, countOfFishAges.get(fish) + 1);
		} else {
			countOfFishAges.set(fish, 1);
		}
	});

	for (let i = 0; i < 80; i++) {
		const newFishAges = new Map();
		let newSix = countOfFishAges.get(7) + countOfFishAges.get(0);
		Array.from({ length: 9 }).map((_, i) => newFishAges.set(i, 0));
		countOfFishAges.forEach((fishes, age) => {
			if (age !== 0) {
				newFishAges.set(age - 1, fishes);
			}
		});
		newFishAges.set(6, newSix);
		newFishAges.set(8, countOfFishAges.get(0));
		countOfFishAges = newFishAges;
	}

	console.log(
		Array.from(countOfFishAges.values()).reduce((prev, curr) => prev + curr),
	);
});
