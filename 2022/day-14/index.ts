const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

type Coord = [number, number];

function parseInput(
	input: string,
): {
	topLeft: Coord;
	bottomRight: Coord;
	lineSegments: Coord[][];
} {
	let topLeft: number[] = [Infinity, 0],
		bottomRight: number[] = [-Infinity, -Infinity];
	const lineSegments = input.trim().split('\n').map((segment) =>
		segment.split(' -> ').map((line) =>
			line.split(',').map((xy, i) => {
				if (i === 0) {
					topLeft[0]
						? topLeft[0] = Math.min(+xy, topLeft[0])
						: topLeft[0] = +xy;
					bottomRight[0]
						? bottomRight[0] = Math.max(+xy, bottomRight[0])
						: bottomRight[0] = +xy;
				}
				if (i === 1) {
					bottomRight[1]
						? bottomRight[1] = Math.max(+xy, bottomRight[1])
						: bottomRight[1] = +xy;
				}
				return +xy;
			})
		)
	);

	topLeft[0] -= 1;
	bottomRight[0] += 1;
	bottomRight[1] += 1;
	return {
		topLeft: topLeft as Coord,
		bottomRight: bottomRight as Coord,
		lineSegments: lineSegments as Coord[][],
	};
}

function addLineToGrid(
	grid: boolean[][],
	staticCoord: number,
	start: number,
	end: number,
	xOrY: 'x' | 'y',
) {
	for (let i = start; i < end + 1; i++) {
		console.log(`adding ${xOrY} ${i}`);
		xOrY === 'x' ? grid[staticCoord][i] = true : grid[i][staticCoord] = true;
	}
}

function addLinesToGrid(
	grid: boolean[][],
	start: Coord,
	end: Coord,
) {
	const isXorY = start[0] !== end[0] ? 'x' : 'y';
	console.log(`add ${isXorY} from ${start} to ${end}`);
	if (isXorY === 'x') {
		if (start[0] < end[0]) {
			addLineToGrid(grid, start[1], start[0], end[0], isXorY);
		} else {
			addLineToGrid(grid, start[1], end[0], start[0], isXorY);
		}
	}
	if (isXorY === 'y') {
		if (start[1] < end[1]) {
			addLineToGrid(grid, start[0], start[1], end[1], isXorY);
		} else {
			addLineToGrid(grid, start[0], end[1], start[1], isXorY);
		}
	}
}

function part1(input: string): number {
	const { topLeft, bottomRight, lineSegments } = parseInput(input);
	const start: Coord = [500, 0];
	const grid = Array.from({ length: bottomRight[1] }, () => {
		return Array.from({ length: bottomRight[0] }, () => false);
	});

	for (const segment of lineSegments) {
		for (let line = 0; line < segment.length - 1; line++) {
			addLinesToGrid(grid, segment[line], segment[line + 1]);
		}
	}

	console.log(
		grid.map((row) =>
			row.filter((_, i) => i > topLeft[0]).map((cell) => cell ? '▓' : '░').join(
				'',
			)
		).join('\n'),
	);
	return 0;
}

const test1 = part1(test);
console.assert(test1 === 24, { expected: 24, received: test1 });
// const test2 = part2(test);
// console.assert(test2 === 140, { expected: 140, received: test2 });

// console.log(`Part 1: ${part1(input)}`);
// console.log(`Part 2: ${part2(input)}`);
