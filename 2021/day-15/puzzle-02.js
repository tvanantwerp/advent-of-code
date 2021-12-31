const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, './input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const rawInput = data.split('\n').map(row => row.split('').map(c => +c));
	const sizeMultiplier = 5;
	const grids = [rawInput];
	for (let grid = 1; grid <= (sizeMultiplier - 1) * 2; grid++) {
		const previousGrid = grids[grids.length - 1];
		const newGrid = previousGrid.map(row =>
			row.map(column => {
				return column + 1 > 9 ? 1 : column + 1;
			}),
		);
		grids.push(newGrid);
	}

	const input = [];
	for (let r = 0; r < sizeMultiplier; r++) {
		for (let row = 0; row < rawInput.length; row++) {
			const newRow = [];
			for (let c = 0; c < sizeMultiplier; c++) {
				newRow.push(grids[r + c][row]);
			}
			input.push(newRow.flat());
		}
	}

	const nodes = new Map();
	for (let row = 0; row < input.length; row++) {
		for (let column = 0; column < input[row].length; column++) {
			const adjacent = [];
			if (input[row - 1] && input[row - 1][column])
				adjacent.push(`r${row - 1}c${column}`);
			if (input[row + 1] && input[row + 1][column])
				adjacent.push(`r${row + 1}c${column}`);
			if (input[row][column - 1]) adjacent.push(`r${row}c${column - 1}`);
			if (input[row][column + 1]) adjacent.push(`r${row}c${column + 1}`);
			nodes.set(`r${row}c${column}`, {
				parent: null,
				totalCost: row === 0 && column === 0 ? 0 : Infinity,
				cost: +input[row][column],
				adjacent,
			});
		}
	}

	const nodesQueue = ['r0c0'];
	while (nodesQueue.length > 0) {
		const nodeName = nodesQueue.shift();
		const nodeValue = nodes.get(nodeName);
		nodeValue.adjacent.forEach(n => {
			const neighbor = nodes.get(n);
			if (neighbor.totalCost > nodeValue.totalCost + neighbor.cost) {
				nodes.set(n, {
					...neighbor,
					parent: nodeName,
					totalCost: nodeValue.totalCost + neighbor.cost,
				});
				if (!nodesQueue.includes(n)) nodesQueue.push(n);
			}
		});
		nodesQueue.sort((a, b) => nodes.get(a).totalCost - nodes.get(b).totalCost);
	}
	console.log(nodes.get(`r${input.length - 1}c${input[0].length - 1}`));
});
