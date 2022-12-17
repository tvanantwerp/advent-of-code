const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

function parseInput(input: string) {
	return input.trim().split('').map((gust) => gust === '<' ? -1 : 1);
}

function visualizeChamber(chamber: string[][]) {
	function transpose(matrix) {
		const rows = matrix.length, cols = matrix[0].length;
		const grid = [];
		for (let j = 0; j < cols; j++) {
			grid[j] = Array(rows);
		}
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				grid[j][i] = matrix[i][j];
			}
		}
		return grid;
	}

	const string = transpose(chamber).map((row) => row.join('')).join('\n');
	console.log(string);
}

function part1(input: string, rounds: number): number {
	const gusts = parseInput(input);
	const chamber = Array.from({ length: 7 }, () => {
		return Array.from({ length: 3 }, () => '░');
	});
	visualizeChamber(chamber);
	return 0;
}

function part2(input: string, rounds: number): number {
	return 0;
}

const test1 = part1(test, 2022);
console.assert(test1 === 1651, { expected: 1651, received: test1 });
// const test2 = part2(test);
// console.assert(test2 === 93, { expected: 93, received: test2 });

// console.log(`Part 1: ${part1(input)}`);
// console.log(`Part 2: ${part2(input)}`);
