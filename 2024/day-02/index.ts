import { readFileSync } from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const rawInput = readFileSync(join(__dirname, 'test.txt'), 'utf-8');
const rawInput = readFileSync(join(__dirname, 'input.txt'), 'utf-8');
const inputLines = rawInput.split('\n');

const records = inputLines.map(line => line.split(' ').map(d => +d));

let safe = 0;
let unsafe = 0;
for (const record of records) {
	let recordIsSafe = true;
	let lastDifference = 0;
	for (let i = 0; i < record.length - 1; i++) {
		// Must be monotonic sequence
		if (i !== 0) {
			if (
				(lastDifference > 0 && record[i] - record[i + 1] < 0) ||
				(lastDifference < 0 && record[i] - record[i + 1] > 0)
			) {
				recordIsSafe = false;
				break;
			}
		}
		lastDifference = record[i] - record[i + 1];

		const nextDifference = Math.abs(lastDifference);
		if (nextDifference < 1 || nextDifference > 3) {
			recordIsSafe = false;
			break;
		}
	}

	if (recordIsSafe) {
		safe++;
	} else {
		unsafe++;
	}
}

console.log('Part 1 answer:');
console.log(safe);
