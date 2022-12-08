const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

function parseInput(input: string) {
	return input.trim().split('\n').map((line) => line.split('').map((d) => +d));
}

function getMaxNeighbors(grid: number[][]) {
	const neighbors: (number)[][] = Array.from(
		{ length: grid.length },
		() => Array.from({ length: grid[0].length }, () => -Infinity),
	);

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			const up = Math.max(
				...grid.slice(0, y).map((row) => row[x]),
			);
			const down = Math.max(
				...grid.slice(y + 1).map((row) => row[x]),
			);
			const right = Math.max(
				...grid[y].slice(x + 1),
			);
			const left = Math.max(
				...grid[y].slice(0, x),
			);
			neighbors[y][x] = Math.min(up, down, left, right);
		}
	}

	return neighbors;
}

function getMaxView(grid: number[][]) {
	const neighbors: (number)[][] = Array.from(
		{ length: grid.length },
		() => Array.from({ length: grid[0].length }, () => -Infinity),
	);

	for (let y = 0; y < grid.length; y++) {
		for (let x = 0; x < grid[0].length; x++) {
			const upFromCell = grid.slice(0, y).map((row) => row[x]);
			const downFromCell = grid.slice(y + 1).map((row) => row[x]);
			const rightFromCell = grid[y].slice(x + 1);
			const leftFromCell = grid[y].slice(0, x);

			const upLimit = upFromCell.findLastIndex((v) => v >= grid[y][x]);
			const downLimit = downFromCell.findIndex((v) => v >= grid[y][x]);
			const rightLimit = rightFromCell.findIndex((v) => v >= grid[y][x]);
			const leftLimit = leftFromCell.findLastIndex((v) => v >= grid[y][x]);

			const up = upLimit > -1 ? upFromCell.length - upLimit : upFromCell.length;
			const down = downLimit > -1 ? 1 + downLimit : downFromCell.length;
			const right = rightLimit > -1 ? 1 + rightLimit : rightFromCell.length;
			const left = leftLimit > -1
				? leftFromCell.length - leftLimit
				: leftFromCell.length;
			neighbors[y][x] = up * down * right * left;
		}
	}

	return neighbors;
}

const part1 = (input: string): number => {
	const forest = parseInput(input);
	const neighbors = getMaxNeighbors(forest);
	let hidden = 0;
	for (let y = 0; y < forest.length; y++) {
		for (let x = 0; x < forest[0].length; x++) {
			if (forest[y][x] <= neighbors[y][x]) hidden += 1;
		}
	}

	return forest.length * forest[0].length - hidden;
};

const part2 = (input: string) => {
	const forest = parseInput(input);
	const views = getMaxView(forest);
	return Math.max(...views.flat());
};

const test1 = part1(test);
console.assert(21 === test1, {
	expected: 21,
	received: test1,
});
const test2 = part2(test);
console.assert(8 === test2, {
	expected: 8,
	received: test2,
});

console.log(`Part 1 answer: ${part1(input)}`);
console.log(`Part 2 answer: ${part2(input)}`);
