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

for (let y = 0; y < yMax; y++) {
	for (let x = 0; x < xMax; x++) {}
}

function getNeighborCoordinates(
	coordinates: [number, number],
): [number, number][] {
	const neighbors: [number, number][] = [];
	const x = coordinates[0];
	const y = coordinates[1];
	const upExists = y - 1 >= 0;
	const downExists = y + 1 <= yMax;
	const leftExists = x - 1 >= 0;
	const rightExists = y + 1 <= xMax;
	// up and left
	if (upExists && leftExists) {
		neighbors.push([x - 1, y - 1]);
	}
	// up
	if (upExists) {
		neighbors.push([x, y - 1]);
	}
	// up and right
	if (upExists && rightExists) {
		neighbors.push([x + 1, y - 1]);
	}
	// left
	if (leftExists) {
		neighbors.push([x - 1, y]);
	}
	// right
	if (rightExists) {
		neighbors.push([x - 1, y - 1]);
	}
	// down and left
	if (downExists && leftExists) {
		neighbors.push([x - 1, y + 1]);
	}
	// down
	if (downExists) {
		neighbors.push([x, y + 1]);
	}
	// down and right
	if (downExists && rightExists) {
		neighbors.push([x + 1, y + 1]);
	}

	return neighbors;
}
