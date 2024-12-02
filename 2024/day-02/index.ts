import { readFileSync } from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const rawInput = readFileSync(join(__dirname, 'test.txt'), 'utf-8');
const rawInput = readFileSync(join(__dirname, 'input.txt'), 'utf-8');
const inputLines = rawInput.split('\n');

const records = inputLines.map(line => line.split(' ').map(d => +d));

function checkRecordSafety(
	record: number[],
	forgiveness: boolean,
	secondPass?: boolean,
): boolean {
	let recordIsSafe = true;
	let lastDifference = 0;
	for (let i = 0; i < record.length - 1; i++) {
		const nextDifference = record[i] - record[i + 1];

		// Check if record is a monotonic sequence
		if (
			i !== 0 &&
			((lastDifference > 0 && nextDifference < 0) ||
				(lastDifference < 0 && nextDifference > 0))
		) {
			recordIsSafe = false;
		}
		if (nextDifference === 0) recordIsSafe = false;
		lastDifference = nextDifference;

		// Check if the next difference is in the inclusive range 1 to 3
		const nextDifferenceAbs = Math.abs(nextDifference);
		if (nextDifferenceAbs < 1 || nextDifferenceAbs > 3) {
			recordIsSafe = false;
		}

		// Brute force check if removing any single level will
		// make the whole record safe
		if (forgiveness && !secondPass && !recordIsSafe) {
			for (let j = 0; j < record.length; j++) {
				const testRemoval = checkRecordSafety(
					record.toSpliced(j, 1),
					true,
					true,
				);
				if (testRemoval) return true;
			}
		}

		if (!recordIsSafe) break;
	}
	return recordIsSafe;
}

let safe1 = 0;
let safe2 = 0;
for (const record of records) {
	const recordIsSafe1 = checkRecordSafety(record, false);
	const recordIsSafe2 = checkRecordSafety(record, true);

	if (recordIsSafe1) safe1++;
	if (recordIsSafe2) safe2++;
}

console.log('Part 1 answer:');
console.log(safe1);
console.log('Part 2 answer:');
console.log(safe2);
