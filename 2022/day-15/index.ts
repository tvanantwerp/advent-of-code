const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

type Coord = [number, number];
type Reading = {
	sensor: Coord;
	beacon: Coord;
};

function parseInput(input: string): Reading[] {
	const readings = input.trim().split('\n');
	return readings.map((reading) => {
		const coordinates = reading.match(/(-?\d+)/g)!;
		return {
			sensor: [+coordinates[0], +coordinates[1]],
			beacon: [+coordinates[2], +coordinates[3]],
		};
	});
}

function part1(input: string): number {
	const readings = parseInput(input);
	console.log(readings);
	return 0;
}

function part2(input: string): number {
	return 0;
}

const test1 = part1(test);
console.assert(test1 === 26, { expected: 26, received: test1 });
// const test2 = part2(test);
// console.assert(test2 === 93, { expected: 93, received: test2 });

// console.log(`Part 1: ${part1(input)}`);
// console.log(`Part 2: ${part2(input)}`);
