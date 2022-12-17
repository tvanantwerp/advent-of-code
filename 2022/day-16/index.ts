const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

function parseInput(input: string) {
	const valves = input.trim().split('\n').map((valve) => {
		const [, name, rate] = valve.match(/Valve (\w{2}) has flow rate=(\d+)/)!;
		const targets = valve.split('to valve')[1].replace(
			/^s? /,
			'',
		).split(', ');

		return {
			name,
			rate,
			targets,
		};
	});

	return valves;
}

function part1(input: string): number {
	const valves = parseInput(input);

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
