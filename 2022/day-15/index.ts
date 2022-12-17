const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

type Coord = [number, number];
type Reading = {
	sensor: Coord;
	beacon: Coord;
	radius: number;
};

function parseInput(input: string): Reading[] {
	const readings = input.trim().split('\n');
	return readings.map((reading) => {
		const coordinates = reading.match(/(-?\d+)/g)!;
		return {
			sensor: [+coordinates[0], +coordinates[1]],
			beacon: [+coordinates[2], +coordinates[3]],
			radius: Math.abs(+coordinates[0] - +coordinates[2]) +
				Math.abs(+coordinates[1] - +coordinates[3]),
		};
	});
}

function mergeIntervals(intervals: Coord[]): Coord[] {
	intervals.sort((a, b) => {
		return a[0] - b[0];
	});

	const result: Coord[] = [intervals[0]];

	for (let i = 1; i < intervals.length; i++) {
		if (result[result.length - 1][1] < intervals[i][0]) {
			result.push(intervals[i]);
		} else {
			result[result.length - 1][1] = Math.max(
				result[result.length - 1][1],
				intervals[i][1],
			);
		}
	}

	return result;
}

function getMergedIntervals(readings: Reading[], row: number): Coord[] {
	const intervals: Coord[] = readings.map(({ sensor, radius }) => {
		const distanceFromSensor = Math.abs(sensor[1] - row);
		const start = sensor[0] - (radius - distanceFromSensor);
		const end = sensor[0] + (radius - distanceFromSensor);
		return [start, end];
	});

	return mergeIntervals(intervals);
}

function part1(input: string, row: number): number {
	const readings = parseInput(input);
	const relevantReadings = readings.filter(({ sensor, radius }) => {
		if (row >= sensor[1] - radius && row <= sensor[1] + radius) return true;
		return false;
	});

	const intervals = getMergedIntervals(relevantReadings, row);
	let result = 0;
	intervals.forEach((interval) => {
		result += interval[1] - interval[0];
	});

	return result;
}

function part2(input: string): number {
	return 0;
}

const test1 = part1(test, 10);
console.assert(test1 === 26, { expected: 26, received: test1 });
// const test2 = part2(test);
// console.assert(test2 === 93, { expected: 93, received: test2 });

console.log(`Part 1: ${part1(input, 2000000)}`);
// console.log(`Part 2: ${part2(input)}`);
