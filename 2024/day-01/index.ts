import { readFileSync } from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const rawInput = readFileSync('input.txt', 'utf-8');
const rawInput = readFileSync(join(__dirname, 'test.txt'), 'utf-8');
const inputLines = rawInput.split('\n');

const list1: number[] = [];
const list2: number[] = [];

const regex = /(-?\d+)\s+(-?\d+)/;

for (let i = 0; i < inputLines.length; i++) {
	const match = inputLines[i].match(regex);
	if (!match) {
		throw new Error('Invalid input');
	}
	const pairs = [match[1], match[2]];
	console.log(pairs);
	list1.push(+pairs[0]);
	list2.push(+pairs[1]);
}

list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);

if (list1.length !== list2.length) {
	throw new Error('Lists are not the same length');
}

let distances = 0;
for (let i = 0; i < list1.length; i++) {
	distances += Math.abs(list1[i] - list2[i]);
}

console.log('Part 1 answer:');
console.log(distances);
