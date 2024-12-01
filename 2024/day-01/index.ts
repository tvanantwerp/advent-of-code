import { readFileSync } from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const rawInput = readFileSync(join(__dirname, 'test.txt'), 'utf-8');
const rawInput = readFileSync(join(__dirname, 'input.txt'), 'utf-8');
const inputLines = rawInput.split('\n');

const list1: number[] = [];
const list2: number[] = [];
const dict2: Record<number, number> = {};

const regex = /(-?\d+)\s+(-?\d+)/;

for (let i = 0; i < inputLines.length; i++) {
	const match = inputLines[i].match(regex);
	if (!match) {
		throw new Error('Invalid input');
	}
	const pairs = [match[1], match[2]];
	list1.push(+pairs[0]);
	list2.push(+pairs[1]);
	if (dict2[+pairs[1]] !== undefined) {
		dict2[+pairs[1]]++;
	} else {
		dict2[+pairs[1]] = 1;
	}
}

list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);

if (list1.length !== list2.length) {
	throw new Error('Lists are not the same length');
}

let distances = 0;
let similarityScore = 0;
for (let i = 0; i < list1.length; i++) {
	distances += Math.abs(list1[i] - list2[i]);
	similarityScore += list1[i] * (dict2[list1[i]] ?? 0);
}

console.log('Part 1 answer:');
console.log(distances);

console.log('Part 2 answer:');
console.log(similarityScore);
