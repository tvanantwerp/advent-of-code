const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, './input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data.split('\n\n');
	const coordinates = input[0].split('\n').map(c => c.split(',').map(d => +d));
	const folds = input[1].split('\n').map(f => {
		const pattern = /fold along (x|y)=(\d+)/;
		const match = f.match(pattern);
		return [match[1], +match[2]];
	});

	const maxX = Math.max(...coordinates.map(c => c[0]));
	const maxY = Math.max(...coordinates.map(c => c[1]));

	const defaultRow = Array.from({ length: maxX + 1 }, () => '░');
	const grid = Array.from({ length: maxY + 1 }, () => [...defaultRow]);
	coordinates.forEach(coordinate => {
		grid[coordinate[1]][coordinate[0]] = '█';
	});

	let foldingGrid = [...grid];
	folds.forEach(fold => {
		foldingGrid =
			fold[0] === 'x'
				? foldX(foldingGrid, fold[1])
				: foldY(foldingGrid, fold[1]);
	});

	console.log(renderGrid(foldingGrid));
});

function foldX(grid, axis) {
	const leftHalf = grid.map(d => [...d.slice(0, axis)].reverse());
	const rightHalf = grid.map(d => d.slice(axis + 1));
	const foldedGrid = Array.from({ length: grid.length }, () =>
		Array.from(
			{ length: Math.max(leftHalf[0].length, rightHalf[0].length) },
			() => '░',
		),
	);
	for (let row = 0; row < foldedGrid.length; row++) {
		for (let column = 0; column < foldedGrid[row].length; column++) {
			if (
				leftHalf[row] &&
				leftHalf[row][column] &&
				leftHalf[row][column] === '█'
			) {
				foldedGrid[row][column] = '█';
			}
			if (
				rightHalf[row] &&
				rightHalf[row][column] &&
				rightHalf[row][column] === '█'
			) {
				foldedGrid[row][column] = '█';
			}
		}
	}
	return foldedGrid.map(row => [...row].reverse());
}

function foldY(grid, axis) {
	const topHalf = [...grid.slice(0, axis)].reverse();
	const bottomHalf = grid.slice(axis + 1);
	const foldedGrid = Array.from(
		{ length: Math.max(topHalf.length, bottomHalf.length) },
		() => Array.from({ length: grid[0].length }, () => '░'),
	);
	for (let row = 0; row < foldedGrid.length; row++) {
		for (let column = 0; column < foldedGrid[row].length; column++) {
			if (topHalf[row] && topHalf[row][column] === '█') {
				foldedGrid[row][column] = '█';
			}
			if (bottomHalf[row] && bottomHalf[row][column] === '█') {
				foldedGrid[row][column] = '█';
			}
		}
	}
	return [...foldedGrid].reverse();
}

function renderGrid(grid) {
	let output = '';
	grid.forEach(row => {
		row.forEach(column => {
			output += column;
		});
		output += '\n';
	});
	return output;
}
