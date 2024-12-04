import { readFileSync } from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const rawInput = readFileSync(join(__dirname, 'test.txt'), 'utf-8');
const rawInput = readFileSync(join(__dirname, 'input.txt'), 'utf-8');
const grid = rawInput.split('\n').map(line => line.split(''));

const xMax = grid[0].length;
const yMax = grid.length;

type Xmas = 'X' | 'M' | 'A' | 'S';

const previousLetter = {
	S: 'A',
	A: 'M',
	M: 'X',
} as const;

const verifiedGrid: string[][] = Array.from({ length: yMax }, () =>
	Array.from({ length: xMax }, () => '#'),
);

let validXmases = 0;

function populateVerifiedGrid(
	coordinates: [number, number],
	letter: Xmas,
	previous?: [number, number],
): boolean {
	const [x, y] = coordinates;
	if (letter === 'X') {
		verifiedGrid[y][x] = letter;
		validXmases++;
		return true;
	}

	let validSequence = false;
	const nextInSequence = previousLetter[letter];
	if (nextInSequence !== undefined) {
		const neighbors = getNeighborCoordinates(
			coordinates,
			nextInSequence,
			previous,
		);

		for (let n = 0; n < neighbors.length; n++) {
			const partOfSequence = populateVerifiedGrid(
				neighbors[n],
				nextInSequence,
				coordinates,
			);
			if (partOfSequence) {
				verifiedGrid[y][x] = letter;
				validSequence = true;
			}
		}
	}
	return validSequence;
}

function getNeighborCoordinates(
	coordinates: [number, number],
	neighborLetter: Xmas,
	previous?: [number, number],
): [number, number][] {
	const [x, y] = coordinates;

	if (previous) {
		const [dx, dy] = [x - previous[0], y - previous[1]];
		const next: [number, number] = [x + dx, y + dy];
		if (isValidNeighbor(next, neighborLetter)) {
			return [next];
		} else {
			return [];
		}
	}

	const up = y - 1;
	const down = y + 1;
	const left = x - 1;
	const right = x + 1;

	const naiveNeighbors: [number, number][] = [
		[left, up],
		[x, up],
		[right, up],
		[left, y],
		[right, y],
		[left, down],
		[x, down],
		[right, down],
	];

	const validNeighbors = naiveNeighbors.filter(n =>
		isValidNeighbor(n, neighborLetter),
	);

	return validNeighbors;
}

function isValidNeighbor([x, y]: [number, number], letter: Xmas): boolean {
	return x >= 0 && x < xMax && y >= 0 && y < yMax && grid[y][x] === letter;
}

for (let y = 0; y < yMax; y++) {
	for (let x = 0; x < xMax; x++) {
		if (grid[y][x] === 'S') populateVerifiedGrid([x, y], grid[y][x] as Xmas);
	}
}

// console.log(verifiedGrid.map(row => row.join()).join('\n'));

console.log('Part 1 answer:');
console.log(validXmases);
