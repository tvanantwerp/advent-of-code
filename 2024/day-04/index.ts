import { readFileSync } from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rawInput = readFileSync(join(__dirname, 'test.txt'), 'utf-8');
// const rawInput = readFileSync(join(__dirname, 'input.txt'), 'utf-8');
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

function populateVerifiedGrid([x, y]: [number, number], letter: Xmas): boolean {
	if (letter === 'X') {
		verifiedGrid[y][x] = letter;
		return true;
	} else if (previousLetter[letter] !== undefined) {
		const neighbors = getNeighborCoordinates([x, y], previousLetter[letter]);
		neighbors.forEach(neighbor => {
			if (verifiedGrid[neighbor[1]][neighbor[0]] === previousLetter[letter]) {
				verifiedGrid[y][x] = letter;
			} else {
				const validSequence = populateVerifiedGrid(
					neighbor,
					previousLetter[letter],
				);
				if (validSequence) verifiedGrid[y][x] = letter;
			}
		});
	}
	return false;
}

function getNeighborCoordinates(
	coordinates: [number, number],
	neighborLetter: Xmas,
): [number, number][] {
	const x = coordinates[0];
	const y = coordinates[1];
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

	const validNeighbors = naiveNeighbors.filter(([x, y]) => {
		return (
			x >= 0 && x < xMax && y >= 0 && y < yMax && grid[y][x] === neighborLetter
		);
	});

	return validNeighbors;
}

let validXmases = 0;
for (let y = 0; y < yMax; y++) {
	for (let x = 0; x < xMax; x++) {
		const validXmas = populateVerifiedGrid([x, y], grid[y][x] as Xmas);
		if (validXmas) validXmases++;
	}
}

console.log(verifiedGrid.map(row => row.join()).join('\n'));

console.log('Part 1 answer:');
console.log(validXmases);
