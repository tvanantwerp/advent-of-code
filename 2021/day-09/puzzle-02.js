const fs = require('fs');
const path = require('path');

// const test = [
// 	[2, 1, 9, 9, 9, 4, 3, 2, 1, 0],
// 	[3, 9, 8, 7, 8, 9, 4, 9, 2, 1],
// 	[9, 8, 5, 6, 7, 8, 9, 8, 9, 2],
// 	[8, 7, 6, 7, 8, 9, 6, 7, 8, 9],
// 	[9, 8, 9, 9, 9, 6, 5, 6, 7, 8],
// ];

// const testLowPoints = [];
// const testBasins = [];

// for (let row = 0; row < test.length; row++) {
// 	for (let column = 0; column < test[row].length; column++) {
// 		if (isLowPoint(test, row, column)) testLowPoints.push(`r${row}c${column}`);
// 	}
// }

// testLowPoints.forEach(point => {
// 	const queue = [point];
// 	const traversed = [];
// 	while (queue.length > 0) {
// 		const point = queue.pop();
// 		const adjacent = getAdjacentPoints(test, point).filter(
// 			point => !queue.includes(point) && !traversed.includes(point),
// 		);
// 		console.log(queue, point, adjacent, traversed);
// 		queue.push(...adjacent);
// 		traversed.push(point);
// 	}
// 	testBasins.push(traversed.length);
// });

// const testTopThree = testBasins.sort((a, b) => b - a).slice(0, 3);
// console.log(
// 	testBasins,
// 	testTopThree,
// 	testTopThree.reduce((prev, curr) => prev * curr),
// );

fs.readFile(path.join(__dirname, './input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data.split('\n').map(d => d.split('').map(d => +d));
	const lowPoints = [];
	const basins = [];

	for (let row = 0; row < input.length; row++) {
		for (let column = 0; column < input[row].length; column++) {
			if (isLowPoint(input, row, column)) lowPoints.push(`r${row}c${column}`);
		}
	}

	lowPoints.forEach(point => {
		const queue = [point];
		const traversed = [];
		while (queue.length > 0) {
			const point = queue.pop();
			const adjacent = getAdjacentPoints(input, point).filter(
				point => !queue.includes(point) && !traversed.includes(point),
			);
			queue.push(...adjacent);
			traversed.push(point);
		}
		basins.push(traversed.length);
	});

	const topThree = basins.sort((a, b) => b - a).slice(0, 3);
	console.log(topThree.reduce((prev, curr) => prev * curr));
});

function getAdjacentPoints(grid, point) {
	const adjacentPoints = [];
	const [row, column] = pointTextToCoordinates(point);
	const value = grid[row][column];

	let up, down, left, right;
	if (grid[row - 1] !== undefined) {
		up = grid[row - 1][column];
	}
	if (grid[row + 1] !== undefined) {
		down = grid[row + 1][column];
	}
	if (grid[row][column - 1] !== undefined) {
		left = grid[row][column - 1];
	}
	if (grid[row][column + 1] !== undefined) {
		right = grid[row][column + 1];
	}

	if (up !== undefined && up > value && up < 9) {
		adjacentPoints.push(coordinatesToText([row - 1, column]));
	}
	if (down !== undefined && down > value && down < 9) {
		adjacentPoints.push(coordinatesToText([row + 1, column]));
	}
	if (left !== undefined && left > value && left < 9) {
		adjacentPoints.push(coordinatesToText([row, column - 1]));
	}
	if (right !== undefined && right > value && right < 9) {
		adjacentPoints.push(coordinatesToText([row, column + 1]));
	}
	return adjacentPoints;
}

function coordinatesToText(coordinates) {
	return `r${coordinates[0]}c${coordinates[1]}`;
}

function pointTextToCoordinates(point) {
	const pattern = /r(\d+)c(\d+)/;
	const match = point.match(pattern);
	return [+match[1], +match[2]];
}

function isLowPoint(grid, row, column) {
	const adjacentValues = [];
	if (grid[row - 1] !== undefined) {
		adjacentValues.push(grid[row - 1][column]);
	}
	if (grid[row + 1] !== undefined) {
		adjacentValues.push(grid[row + 1][column]);
	}
	if (grid[row][column - 1] !== undefined) {
		adjacentValues.push(grid[row][column - 1]);
	}
	if (grid[row][column + 1] !== undefined) {
		adjacentValues.push(grid[row][column + 1]);
	}
	for (let i = 0; i < adjacentValues.length; i++) {
		if (grid[row][column] >= adjacentValues[i]) return false;
	}
	return true;
}
