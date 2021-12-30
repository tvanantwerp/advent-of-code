const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, './input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data.split('\n');
	const lineSegments = input
		.map(i => i.split(' -> '))
		.map(i => i.map(j => j.split(',')))
		.map(i => {
			return { x1: +i[0][0], y1: +i[0][1], x2: +i[1][0], y2: +i[1][1] };
		});

	const overlappingCoordinates = new Map();
	lineSegments.forEach(segment => {
		const xDiff = Math.abs(segment.x1 - segment.x2);
		const yDiff = Math.abs(segment.y1 - segment.y2);
		if (xDiff === 0 || yDiff === 0) {
			const staticX = xDiff === 0 ? true : false;
			const lineCoordinates = staticX
				? getLineCoordinates(segment.y1, segment.y2, yDiff)
				: getLineCoordinates(segment.x1, segment.x2, xDiff);
			lineCoordinates.forEach(coordinate => {
				const coordRef = `x${staticX ? segment.x1 : coordinate}y${
					!staticX ? segment.y1 : coordinate
				}`;
				if (overlappingCoordinates.has(coordRef)) {
					const currentValue = overlappingCoordinates.get(coordRef);
					overlappingCoordinates.set(coordRef, currentValue + 1);
				} else {
					overlappingCoordinates.set(coordRef, 1);
				}
			});
			console.log(segment, lineCoordinates);
		}
	});

	let count = 0;
	overlappingCoordinates.forEach(value => {
		if (value >= 2) {
			count += 1;
		}
	});
	console.log(count);
});

function getLineCoordinates(one, two, diff) {
	return Array.from(
		{ length: diff + 1 },
		(x, i) => i + (one > two ? two : one),
	);
}
