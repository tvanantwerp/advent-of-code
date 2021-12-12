const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, '../input.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = data.split('\n');

	const Nodes = new Map();

	function addNode(node) {
		if (!Nodes.has(node)) Nodes.set(node, []);
	}

	function addEdge(node1, node2) {
		Nodes.get(node1).push(node2);
		Nodes.get(node2).push(node1);
	}

	input.forEach(nodes => {
		const [node1, node2] = nodes.split('-');
		addNode(node1);
		addNode(node2);
		addEdge(node1, node2);
	});

	const paths = [];
	function traverse(node, visited = new Set(), previous = null) {
		if (node === 'end') {
			paths.push([...visited, node]);
		} else {
			visited.add(node);
			const targets = Nodes.get(node).filter(
				t => !(isLowerCase(t) && visited.has(t)),
			);
			// console.table({
			// 	jump: `${previous}->${node}`,
			// 	targets: JSON.stringify(targets),
			// 	visited: JSON.stringify([...visited]),
			// });
			for (const target of targets) {
				traverse(target, new Set([...visited]), node);
			}
		}
	}

	traverse('start');

	console.log(paths.length);
});

function isLowerCase(str) {
	return str === str.toLowerCase();
}
