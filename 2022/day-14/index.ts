const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

type Coord = [number, number];
type Grid = boolean[][];

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
	grid: Grid,
	staticCoord: number,
	start: number,
	end: number,
	xOrY: 'x' | 'y',
) {
	for (let i = start; i < end + 1; i++) {
		xOrY === 'x' ? grid[staticCoord][i] = true : grid[i][staticCoord] = true;
	}
}

function addLinesToGrid(
	grid: Grid,
	start: Coord,
	end: Coord,
) {
	const isXorY = start[0] !== end[0] ? 'x' : 'y';
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

function placeSand(grid: Grid, start: Coord): Coord | null {
	let [x, y] = start;
	let falling = true;
	while (falling) {
		if (grid[y][x]) return null;
		if (grid[y + 1] === undefined) {
			return null;
		}
		if (!grid[y + 1][x]) {
			y++;
			continue;
		}
		if (grid[y + 1][x - 1] === undefined) {
			console.log('Fell off the left side');
			return null;
		}
		if (!grid[y + 1][x - 1]) {
			y++;
			x--;
			continue;
		}
		if (grid[y + 1][x + 1] === undefined) {
			console.log('Fell off the right side');
			return null;
		}
		if (!grid[y + 1][x + 1]) {
			y++;
			x++;
			continue;
		}
		if (grid[y + 1][x] && grid[y + 1][x - 1] && grid[y + 1][x + 1]) {
			falling = false;
		}
	}
	return [x, y];
}

function initializeGrid(
	lineSegments: Coord[][],
	bottomRight: Coord,
	hasFloor: boolean,
): Grid {
	const grid: Grid = Array.from({
		length: hasFloor ? bottomRight[1] + 2 : bottomRight[1],
	}, (_, i) => {
		return Array.from(
			{ length: hasFloor ? bottomRight[0] * 2 : bottomRight[0] },
			() => i === bottomRight[1] + 1 ? true : false,
		);
	});

	for (const segment of lineSegments) {
		for (let line = 0; line < segment.length - 1; line++) {
			addLinesToGrid(grid, segment[line], segment[line + 1]);
		}
	}

	return grid;
}

function visualizeGrid(grid: Grid, hasFloor: boolean) {
	const start = hasFloor
		? grid[grid.length - 2].indexOf(true)
		: grid[grid.length - 1].indexOf(true);
	const end = hasFloor
		? grid[grid.length - 2].lastIndexOf(true)
		: grid[grid.length - 1].lastIndexOf(true);
	console.log(
		grid.map((row) =>
			row.filter((_, i) => i >= start - 1 && i <= end + 1).map((cell) =>
				cell ? '▓' : '░'
			)
				.join(
					'',
				)
		).join('\n'),
	);
}

function part1(input: string): number {
	const { bottomRight, lineSegments } = parseInput(input);
	const start: Coord = [500, 0];
	const grid: Grid = initializeGrid(lineSegments, bottomRight, false);

	let count = 0;
	let sandFallsForever = false;
	while (!sandFallsForever) {
		const sand = placeSand(grid, start);
		if (!sand) sandFallsForever = true;
		else {
			grid[sand[1]][sand[0]] = true;
			count += 1;
		}
	}
	visualizeGrid(grid, false);
	return count;
}

function part2(input: string): number {
	const { bottomRight, lineSegments } = parseInput(input);
	const start: Coord = [500, 0];
	const grid: Grid = initializeGrid(lineSegments, bottomRight, true);

	let count = 0;
	let sandBlocked = false;
	while (!sandBlocked) {
		const sand = placeSand(grid, start);
		if (!sand) sandBlocked = true;
		else {
			grid[sand[1]][sand[0]] = true;
			count += 1;
		}
	}
	visualizeGrid(grid, true);
	return count;
}

const test1 = part1(test);
console.assert(test1 === 24, { expected: 24, received: test1 });
const test2 = part2(test);
console.assert(test2 === 93, { expected: 93, received: test2 });

console.log(`Part 1: ${part1(input)}`);
console.log(`Part 2: ${part2(input)}`);
