const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

type Valve = {
	rate: number;
	mask: number;
	tunnels: string[];
};

type Cave = Map<string, Valve>;

type Distances = Map<string, number>;

function parseInput(input: string): Cave {
	const cave: Cave = new Map();
	input.trim().split('\n').forEach((valve, i) => {
		const [, name, rate] = valve.match(/Valve (\w{2}) has flow rate=(\d+)/)!;
		const tunnels = valve.split(/tunnels? leads? to valves? /)[1].split(', ');

		cave.set(name, {
			rate: +rate,
			mask: 1 << i,
			tunnels,
		});
	});

	return cave;
}

function getDistances(cave: Cave): Distances {
	const distances: Distances = new Map();
	for (const [key1] of cave) {
		for (const [key2] of cave) {
			if (cave.get(key1)!.tunnels.includes(key2)) {
				distances.set(`${key1},${key2}`, 1);
			} else {
				distances.set(`${key1},${key2}`, Infinity);
			}
		}
	}

	for (const [k] of cave) {
		for (const [i] of cave) {
			for (const [j] of cave) {
				const currentDistance = distances.get(`${i},${j}`)!;
				const comparableDistance = distances.get(`${i},${k}`)! +
					distances.get(`${k},${j}`)!;
				if (currentDistance > comparableDistance) {
					distances.set(`${i},${j}`, comparableDistance);
				}
			}
		}
	}

	return distances;
}

function visit(
	valve: string,
	minutes: number,
	opened: number,
	cave: Cave,
	distances: Distances,
	flow: number,
	result: Map<number, number> = new Map(),
) {
	const n = !result.has(opened) ? 0 : result.get(opened)!;
	result.set(opened, Math.max(flow, n));
	for (const [neighbor, { rate, mask }] of cave) {
		if (rate === 0) continue;
		const distance = distances.get(`${valve},${neighbor}`)!;
		const timeRemaining = minutes - distance - 1;
		if ((opened & mask) > 0 || timeRemaining < 0) continue;
		visit(
			neighbor,
			timeRemaining,
			opened | mask,
			cave,
			distances,
			flow + (timeRemaining * rate),
			result,
		);
	}

	return result;
}
function part1(input: string): number {
	const cave = parseInput(input);
	const distances = getDistances(cave);
	const result = visit('AA', 30, 0, cave, distances, 0);

	return Math.max(...result.values());
}

function part2(input: string): number {
	return 0;
}

const test1 = part1(test);
console.assert(test1 === 1651, { expected: 1651, received: test1 });
// const test2 = part2(test);
// console.assert(test2 === 93, { expected: 93, received: test2 });

console.log(`Part 1: ${part1(input)}`);
// console.log(`Part 2: ${part2(input)}`);
