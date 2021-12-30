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

// for (let row = 0; row < test.length; row++) {
// 	for (let column = 0; column < test[row].length; column++) {
// 		if (isLowPoint(test, row, column)) testLowPoints.push(test[row][column]);
// 	}
// }

// console.log(
// 	testLowPoints.reduce((prev, curr) => prev + curr + 1),
// 	0,
// );

fs.readFile(path.join(__dirname, './input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data.split('\n').map(d => d.split('').map(d => +d));
	const lowPoints = [];

	for (let row = 0; row < input.length; row++) {
		for (let column = 0; column < input[row].length; column++) {
			if (isLowPoint(input, row, column)) lowPoints.push(input[row][column]);
		}
	}

	console.log(lowPoints.reduce((prev, curr) => prev + curr + 1, 0));
});

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
