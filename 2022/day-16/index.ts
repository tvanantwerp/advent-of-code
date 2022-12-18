const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

type Valves = Map<string, number>;
type Tunnels = Map<string, string[]>;
type Indices = Map<string, number>;

function parseInput(input: string) {
	const data = input.trim().split('\n').map((valve) => {
		const [, name, rate] = valve.match(/Valve (\w{2}) has flow rate=(\d+)/)!;
		const paths = valve.split(/tunnels? leads? to valves? /)[1].split(', ');

		return {
			name,
			rate: +rate,
			paths,
		};
	});

	const valves: Valves = new Map();
	const tunnels: Tunnels = new Map();
	const indices: Indices = new Map();
	data.forEach((d, i) => {
		if (d.rate > 0 || d.name === 'AA') {
			valves.set(d.name, d.rate);
			tunnels.set(d.name, d.paths);
			indices.set(d.name, i);
		}
	});

	return { valves, tunnels, indices };
}

function getDistances(tunnels: Tunnels, indices: Indices): number[][] {
	// Start Floyd-Warshall with array for distances between nodes
	const distances = Array.from({ length: indices.size }, (_, i) => {
		return Array.from(
			{ length: indices.size },
			(__, j) => i === j ? 0 : Infinity,
		);
	});
	// Initialize distance from node to neighbors to 1
	for (const [valve, neighbors] of tunnels) {
		neighbors.forEach((neighbor) => {
			if (indices.has(neighbor)) {
				distances[indices.get(valve)!][indices.get(neighbor)!] = 1;
			}
		});
	}
	for (let k = 0; k < indices.size; k++) {
		for (let i = 0; i < indices.size; i++) {
			for (let j = 0; j < indices.size; j++) {
				if (distances[i][j] > distances[i][k] + distances[k][j]) {
					distances[i][j] = distances[i][k] + distances[k][j];
				}
			}
		}
	}

	return distances;
}

function part1(input: string): number {
	const { valves, tunnels, indices } = parseInput(input);
	// const distances = getDistances(valves);
	console.log(valves, tunnels, indices);
	const distances = getDistances(tunnels, indices);
	console.log(distances);

	return 0;
}

function part2(input: string): number {
	return 0;
}

const test1 = part1(test);
console.assert(test1 === 1651, { expected: 1651, received: test1 });
// const test2 = part2(test);
// console.assert(test2 === 93, { expected: 93, received: test2 });

// console.log(`Part 1: ${part1(input)}`);
// console.log(`Part 2: ${part2(input)}`);
