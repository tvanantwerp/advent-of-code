import { readFileSync } from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const rawInput = readFileSync(join(__dirname, 'test.txt'), 'utf-8');
const rawInput = readFileSync(join(__dirname, 'input.txt'), 'utf-8');
const inputLines = rawInput.split('\n');

const correctInstructionsRegex = /mul\((\d{1,3}),(\d{1,3})\)/g;

const pairs: [number, number][] = [];
for (let i = 0; i < inputLines.length; i++) {
	const matches = inputLines[i].matchAll(correctInstructionsRegex);
	for (const match of matches) {
		pairs.push([+match[1], +match[2]]);
	}
}

let part1 = pairs.reduce((acc, curr) => acc + curr[0] * curr[1], 0);

console.log('Part 1 answer:');
console.log(part1);
