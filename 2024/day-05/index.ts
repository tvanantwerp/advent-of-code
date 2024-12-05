import { readFileSync } from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const rawInput = readFileSync(join(__dirname, 'test.txt'), 'utf-8');
const rawInput = readFileSync(join(__dirname, 'input.txt'), 'utf-8');
const inputSections = rawInput.split('\n\n');
const printOrderPairs = inputSections[0]
	.split('\n')
	.map(r => r.split('|').map(p => +p));
const updatSections = inputSections[1]
	.split('\n')
	.map(r => r.split(',').map(p => +p));

const allPages: number[] = Array.from(new Set(printOrderPairs.flatMap(p => p)));
allPages.sort((a, b) => {
	const rulesForAAndB = printOrderPairs.filter(p => p[0] === a && p[1] === b);
	const rulesForBAndA = printOrderPairs.filter(p => p[0] === b && p[1] === a);
	if (rulesForAAndB[0] !== undefined) {
		return -1;
	} else if (rulesForBAndA[0] !== undefined) {
		return 1;
	}
	return 0;
});

const afterMap: Map<number, Set<number>> = new Map();
for (let i = 0; i < allPages.length; i++) {
	afterMap.set(allPages[i], new Set(allPages.slice(i + 1)));
}

let part1 = 0;
for (let i = 0; i < updatSections.length; i++) {
	const section = updatSections[i];
	let validUpdate = true;
	for (let j = 0; j < section.length; j++) {
		const page = section[j];
		const pagesAfter = section.slice(j + 1);
		for (let k = 0; k < pagesAfter.length; k++) {
			const pagesAfterSet = afterMap.get(pagesAfter[k]);
			if (pagesAfterSet?.has(page)) validUpdate = false;
		}
	}
	if (validUpdate) {
		const median = section[Math.floor(section.length / 2)];
		part1 += median;
	}
}

console.log('Part 1 answer:');
console.log(part1);
console.log('Part 2 answer:');
// console.log(part2);
