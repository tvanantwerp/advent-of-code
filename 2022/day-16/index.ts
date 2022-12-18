const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

type Valve = {
	name: string;
	rate: number;
	paths: string[];
};

function parseInput(input: string): Valve[] {
	const valves = input.trim().split('\n').map((valve) => {
		const [, name, rate] = valve.match(/Valve (\w{2}) has flow rate=(\d+)/)!;
		const paths = valve.split(/tunnels? leads? to valves? /)[1].split(', ');

		return {
			name,
			rate: +rate,
			paths,
		};
	});

	return valves;
}

function part1(input: string): number {
	const valves = parseInput(input).filter((valve) => valve.rate > 0);
	// Start Floyd-Warshall with array for distances between nodes
	const distances = Array.from({ length: valves.length }, () => {
		return Array.from({ length: valves.length }, () => Infinity);
	});
	// Initialize distance from node to self to 0
	// and from node to neighbors to 1
	for (let i = 0; i < valves.length; i++) {
		distances[i][i] = 0;
		valves[i].paths.forEach((path) => {
			const valveIndex = valves.findIndex((valve) => valve.name === path);
			distances[i][valveIndex] = 1;
		});
	}
	for (let k = 0; k < valves.length; k++) {
		for (let i = 0; i < valves.length; i++) {
			for (let j = 0; j < valves.length; j++) {
				if (distances[i][j] > distances[i][k] + distances[k][j]) {
					distances[i][j] = distances[i][k] + distances[k][j];
				}
			}
		}
	}
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
