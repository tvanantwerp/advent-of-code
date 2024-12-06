import { readFileSync } from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rawInput = readFileSync(join(__dirname, 'test.txt'), 'utf-8');
// const rawInput = readFileSync(join(__dirname, 'input.txt'), 'utf-8');
const inputSections = rawInput.split('\n\n');

console.log('Part 1 answer:');
// console.log(part1);
console.log('Part 2 answer:');
// console.log(part2);
