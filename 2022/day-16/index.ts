const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

type Valve = {
	rate: number;
	mask: bigint;
	tunnels: string[];
};

type Cave = Map<string, Valve>;

type Distances = Map<string, number>;

/**
 * Takes the raw input for the problem and returns
 * a Map with keys of valve name (e.g., 'AA') and
 * values of an object containing the flow rate and
 * a bitmask representing the valve's position in
 * the list of all valves (e.g., first valve is
 * 1, the second 10, the third 100, etc.).
 */
function parseInput(input: string): Cave {
	const cave: Cave = new Map();
	input.trim().split('\n').forEach((valve, i) => {
		const [, name, rate] = valve.match(/Valve (\w{2}) has flow rate=(\d+)/)!;
		const tunnels = valve.split(/tunnels? leads? to valves? /)[1].split(', ');

		cave.set(name, {
			rate: +rate,
			mask: 1n << BigInt(i),
			tunnels,
		});
	});

	return cave;
}

/**
 * Uses Floyd-Warshall algorithm to compute distances
 * between valves. Returns the distances as a Map with
 * a string key of the from 'AA,BB', where 'AA' and 'BB'
 * are names of valves, and values of the numeric distance.
 */
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

/**
 * Performs a depth-first search from the starting valve.
 * Continues while there is time on the clock, and if
 * the next valve to visit hasn't been opened.
 * Checks whether a value is opened by performing bitwise
 * union on the valve's mask and the 'opened' param. Newly
 * calculated flows are set to the result Map, which is the
 * eventual returned value. The keys of the result are the
 * bitwise value representing which valves are open, and the
 * value is the flow rate. The result represents the max flow
 * rate possible for all possible open/shut valve states.
 */
function visit(
	valve: string,
	minutes: number,
	opened: bigint,
	cave: Cave,
	distances: Distances,
	flow: number,
	result: Map<bigint, number> = new Map(),
) {
	// Set the result for this open/shut state to
	// the max of the newly passed flow or the cached
	// flow rate.
	const cachedFlow = result.get(opened) ?? 0;
	result.set(opened, Math.max(flow, cachedFlow));

	for (const [neighbor, { rate, mask }] of cave) {
		// Don't waste time on valves you can't open.
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

/**
 * Returns the maximum calculated value after a DFS of the caves.
 */
function part1(input: string): number {
	const cave = parseInput(input);
	const distances = getDistances(cave);
	const result = visit('AA', 30, 0n, cave, distances, 0);

	return Math.max(...result.values());
}

/**
 * After performing DFS, compares all of the results
 * with every other result. Whenever there are two
 * non-overlapping keys, it represents a state that
 * two actors independently could achieve. If the sum
 * of those two actors is greater than any seen previously,
 * set total to that sum.
 */
function part2(input: string): number {
	const cave = parseInput(input);
	const distances = getDistances(cave);
	const result = visit('AA', 26, 0n, cave, distances, 0);

	let total = 0;

	for (const [k1, v1] of result) {
		for (const [k2, v2] of result) {
			// Are k1 and k2 non-overlapping states of opened valves?
			if ((k1 & k2) === 0n) {
				// If yes, update the total if necessary
				if (v1 + v2 > total) {
					total = v1 + v2;
				}
			}
		}
	}

	return total;
}

const test1 = part1(test);
console.assert(test1 === 1651, { expected: 1651, received: test1 });
const test2 = part2(test);
console.assert(test2 === 1707, { expected: 1707, received: test2 });

console.log(`Part 1: ${part1(input)}`);
console.log(`Part 2: ${part2(input)}`);
