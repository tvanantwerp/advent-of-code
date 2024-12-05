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

const afterMap: Map<number, Set<number>> = new Map();
for (let i = 0; i < printOrderPairs.length; i++) {
	const afterSet = afterMap.get(printOrderPairs[i][0]);
	if (!afterSet) {
		afterMap.set(printOrderPairs[i][0], new Set([printOrderPairs[i][1]]));
	} else {
		afterSet.add(printOrderPairs[i][1]);
		afterMap.set(printOrderPairs[i][0], afterSet);
	}
}

console.log(afterMap.get(18));

let part1 = 0;
updates: for (let i = 0; i < updatSections.length; i++) {
	const section = updatSections[i];
	let validUpdate = false;
	section: for (let j = 0; j < section.length; j++) {
		const page = section[j];
		const pagesAfter = section.slice(j + 1);
		if (j === section.length - 1) {
			validUpdate = true;
		}
		pages: for (let k = 0; k < pagesAfter.length; k++) {
			const pagesAfterSet = afterMap.get(pagesAfter[k]);
			if (pagesAfterSet?.has(page)) {
				break section;
			}
		}
	}
	if (validUpdate) {
		const median = section[Math.floor(section.length / 2)];
		part1 += median;
	}
}

console.log('Part 1 answer:');
console.log(part1);
// console.log('Part 2 answer:');
// console.log(part2);
