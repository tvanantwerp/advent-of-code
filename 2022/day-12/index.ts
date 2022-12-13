const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

type Cell = [number, number];

function parseInput(
	input: string,
): {
	start: [number, number];
	end: [number, number];
	grid: number[][];
} {
	let start: Cell = [0, 0], end: Cell = [0, 0];
	const grid = input.trim().split('\n').map((row, i) => {
		return row.split('').map((col, j) => {
			if (col === 'E') {
				start = [i, j];
				col = 'z';
			}
			if (col === 'S') {
				end = [i, j];
				col = 'a';
			}
			return col.charCodeAt(0) - 'a'.charCodeAt(0);
		});
	});

	return { start, end, grid };
}

function getCoordinateWithinBounds(row: number, col: number, grid: number[][]) {
	const height = grid.length;
	const width = grid[0].length;
	return row >= 0 && row < height && col >= 0 && col < width;
}

function stringToCell(cellText: string): Cell {
	return cellText.replace(/[rc]/g, '').split(',').map((d) => +d) as Cell;
}

function cellToString(cell: Cell): string {
	return `r${cell[0]},c${cell[1]}`;
}

function bfs(start: Cell, end: Cell | number, grid: number[][]): number {
	const directions = [
		[0, 1],
		[0, -1],
		[1, 0],
		[-1, 0],
	];

	const queue: [string, number][] = [[cellToString(start), 0]];
	const visited: Set<string> = new Set();

	while (queue.length > 0) {
		const [cellText, steps] = queue.shift()!;
		const [row, col] = stringToCell(cellText);

		if (visited.has(cellText)) continue;
		else visited.add(cellText);

		if (
			(typeof end === 'number' && grid[row][col] === end) ||
			(typeof end !== 'number' && row === end[0] && col === end[1])
		) return steps;

		for (const [y, x] of directions) {
			if (
				getCoordinateWithinBounds(row + y, col + x, grid) &&
				grid[row + y][col + x] >= grid[row][col] - 1 &&
				!visited.has(cellToString([row + y, col + x]))
			) queue.push([cellToString([row + y, col + x]), steps + 1]);
		}
	}
	throw new Error(`BFS failed to find graph node meeting end point criteria.`);
}

function part1(input: string): number {
	const { start, end, grid } = parseInput(input);

	return bfs(start, end, grid);
}

function part2(input: string) {
	const { start, grid } = parseInput(input);

	return bfs(start, 0, grid);
}

const test1 = part1(test);
console.assert(test1 === 31, { expected: 31, received: test1 });
const test2 = part2(test);
console.assert(test2 === 29, { expected: 29, received: test2 });

console.log(`Part 1: ${part1(input)}`);
console.log(`Part 2: ${part2(input)}`);
