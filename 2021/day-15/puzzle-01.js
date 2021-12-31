const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, './input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data.split('\n').map(row => row.split(''));

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
