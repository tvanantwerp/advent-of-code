import { readFileSync } from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const rawInput = readFileSync(join(__dirname, 'test.txt'), 'utf-8');
const rawInput = readFileSync(join(__dirname, 'input.txt'), 'utf-8');
const inputLines = rawInput.split('\n');

const correctInstructionsRegex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;

const pairs: [number, number, boolean][] = [];
let doMul = true;
for (let i = 0; i < inputLines.length; i++) {
	const matches = inputLines[i].matchAll(correctInstructionsRegex);
	for (const match of matches) {
		if (match[0] === 'do()') doMul = true;
		else if (match[0] === "don't()") doMul = false;
		else pairs.push([+match[1], +match[2], doMul]);
	}
}

let part1 = pairs.reduce((acc, curr) => acc + curr[0] * curr[1], 0);
let part2 = pairs.reduce(
	(acc, curr) => (curr[2] ? acc + curr[0] * curr[1] : acc),
	0,
);

console.log('Part 1 answer:');
console.log(part1);
console.log('Part 2 answer:');
console.log(part2);
