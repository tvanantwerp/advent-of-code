const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '../input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data.split('\n').map(d => d.split('').map(d => +d));

	let grid = input;
	let flashes = 0;

	for (let step = 0; step < 100; step++) {
		const roundResults = iterateFlashes(grid);
		flashes += roundResults.flashes;
		grid = roundResults.grid;
	}

	console.log(flashes);
});

function iterateFlashes(grid) {
	let workingGrid = grid.map(row => row.map(column => column + 1));
	let flashesThisRound = [];
	let flashesThisLoop = 0;
	do {
		flashesThisLoop = 0;
		for (let row = 0; row < workingGrid.length; row++) {
			for (let column = 0; column < workingGrid[row].length; column++) {
				if (
					workingGrid[row][column] > 9 &&
					!flashesThisRound.includes(`r${row}c${column}`)
				) {
					flashesThisLoop += 1;
					flashesThisRound.push(`r${row}c${column}`);
					if (workingGrid[row - 1] && workingGrid[row - 1][column - 1]) {
						workingGrid[row - 1][column - 1] += 1;
					}
					if (workingGrid[row - 1]) {
						workingGrid[row - 1][column] += 1;
					}
					if (workingGrid[row - 1] && workingGrid[row - 1][column + 1]) {
						workingGrid[row - 1][column + 1] += 1;
					}
					if (workingGrid[row][column - 1]) {
						workingGrid[row][column - 1] += 1;
					}
					if (workingGrid[row][column + 1]) {
						workingGrid[row][column + 1] += 1;
					}
					if (workingGrid[row + 1] && workingGrid[row + 1][column - 1]) {
						workingGrid[row + 1][column - 1] += 1;
					}
					if (workingGrid[row + 1] && workingGrid[row + 1][column]) {
						workingGrid[row + 1][column] += 1;
					}
					if (workingGrid[row + 1] && workingGrid[row + 1][column + 1]) {
						workingGrid[row + 1][column + 1] += 1;
					}
				}
			}
		}
	} while (flashesThisLoop > 0);

	workingGrid = workingGrid.map(row =>
		row.map(column => (column > 9 ? 0 : column)),
	);
	// renderGrid(workingGrid);
	return {
		flashes: flashesThisRound.length,
		grid: workingGrid,
	};
}

function renderGrid(grid) {
	let output = '';
	grid.forEach(row => {
		row.forEach(column => {
			output += column;
		});
		output += '\n';
	});
	console.log(output);
}
