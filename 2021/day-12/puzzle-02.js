const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, './input.txt'), 'utf8', (err, data) => {
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
	function traverse(node, path = []) {
		if (node === 'end') {
			path.push(node);
			paths.push(path);
		} else {
			path.push(node);
			const lowerCaseVisits = path.filter(n => isLowerCase(n));
			const lowerCaseSet = new Set([...lowerCaseVisits]);
			const targets = Nodes.get(node)
				.filter(t => t !== 'start')
				.filter(t => {
					if (lowerCaseVisits.length !== lowerCaseSet.size) {
						return !(isLowerCase(t) && path.includes(t));
					} else {
						return t;
					}
				});
			for (const target of targets) {
				traverse(target, [...path]);
			}
		}
	}

	traverse('start');

	console.log(paths.length);
});

function isLowerCase(str) {
	return str === str.toLowerCase();
}
