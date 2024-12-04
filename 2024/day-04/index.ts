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

const validMs = new Set<string>();
const validAs = new Set<string>();
const validSs = new Set<string>();

let validXmases = 0;
for (let y = 0; y < yMax; y++) {
	for (let x = 0; x < xMax; x++) {
		if (grid[y][x] == 'X') {
			const neighbors = getNeighborCoordinates(
				[x, y],
				new Set<[number, number]>([[x, y]]),
			);
		}
	}
}

function getNeighborCoordinates(
	coordinates: [number, number],
	visited: Set<[number, number]>,
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

	const validNeighbors = naiveNeighbors.filter(n => {
		return (
			n[0] >= 0 && n[0] <= xMax && n[1] >= 0 && n[1] <= yMax && !visited.has(n)
		);
	});

	return validNeighbors;
}
