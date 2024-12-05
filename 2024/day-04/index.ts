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

// For double-checking my work visually
const verifiedGrid1: string[][] = Array.from({ length: yMax }, () =>
	Array.from({ length: xMax }, () => '#'),
);
const verifiedGrid2: string[][] = Array.from({ length: yMax }, () =>
	Array.from({ length: xMax }, () => '#'),
);

let validXmases = 0;
let validMasCrosses = 0;

function populateVerifiedGrid1(
	coordinates: [number, number],
	letter: Xmas,
	previous?: [number, number],
): boolean {
	const [x, y] = coordinates;
	if (letter === 'X') {
		verifiedGrid1[y][x] = letter;
		validXmases++;
		return true;
	}

	let validSequence = false;
	const nextInSequence = previousLetter[letter];
	if (nextInSequence !== undefined) {
		const neighbors = getNeighborCoordinates1(
			coordinates,
			nextInSequence,
			previous,
		);

		for (let n = 0; n < neighbors.length; n++) {
			const partOfSequence = populateVerifiedGrid1(
				neighbors[n],
				nextInSequence,
				coordinates,
			);
			if (partOfSequence) {
				verifiedGrid1[y][x] = letter;
				validSequence = true;
			}
		}
	}
	return validSequence;
}

function getNeighborCoordinates1(
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

function populateVerifiedGrid2(coordinates: [number, number]): boolean {
	const [x, y] = coordinates;
	const up = y - 1;
	const down = y + 1;
	const left = x - 1;
	const right = x + 1;

	if (up < 0 || left < 0 || down >= yMax || right >= xMax) return false;
	const upLeft = grid[up][left];
	const upRight = grid[up][right];
	const downLeft = grid[down][left];
	const downRight = grid[down][right];

	const rotation1 =
		upLeft === 'M' && upRight === 'M' && downLeft === 'S' && downRight === 'S';
	const rotation2 =
		upLeft === 'S' && upRight === 'M' && downLeft === 'S' && downRight === 'M';
	const rotation3 =
		upLeft === 'S' && upRight === 'S' && downLeft === 'M' && downRight === 'M';
	const rotation4 =
		upLeft === 'M' && upRight === 'S' && downLeft === 'M' && downRight === 'S';

	if (rotation1 || rotation2 || rotation3 || rotation4) {
		verifiedGrid2[y][x] = grid[y][x];
		verifiedGrid2[up][left] = upLeft;
		verifiedGrid2[up][right] = upRight;
		verifiedGrid2[down][left] = downLeft;
		verifiedGrid2[down][right] = downRight;
		validMasCrosses++;
		return true;
	}

	return false;
}

for (let y = 0; y < yMax; y++) {
	for (let x = 0; x < xMax; x++) {
		if (grid[y][x] === 'S') populateVerifiedGrid1([x, y], grid[y][x] as Xmas);
		if (grid[y][x] === 'A') populateVerifiedGrid2([x, y]);
	}
}

console.log(verifiedGrid2.map(row => row.join()).join('\n'));

console.log('Part 1 answer:');
console.log(validXmases);
console.log('Part 1 answer:');
console.log(validMasCrosses);
