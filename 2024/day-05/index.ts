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

// Here we populate a map with a key of each page that should come
// before another page, and then a set of the pages that should
// come after. This simplifies look-up.
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

let part1 = 0;
let part2 = 0;
updates: for (let i = 0; i < updatSections.length; i++) {
	const section = updatSections[i];
	let validUpdate = false;
	section: for (let j = 0; j < section.length; j++) {
		const page = section[j];
		const pagesAfter = section.slice(j + 1);
		// If we've gotten to the last page in the section without
		// breaking due to invalid sorting, then we know this
		// section is valid. Update validUpdate and break;
		if (j === section.length - 1) {
			validUpdate = true;
			break;
		}
		// Check each page that comes after the current page,
		// and make sure that the current page isn't in their
		// set of pages that should come after. Break early
		// from outer loop if sort proves invalid.
		pages: for (let k = 0; k < pagesAfter.length; k++) {
			const pagesAfterSet = afterMap.get(pagesAfter[k]);
			if (pagesAfterSet?.has(page)) {
				break section;
			}
		}
	}
	// If a section had a valid sort, update the part 1 answer
	// by adding the value of the middle page.
	if (validUpdate) {
		const median = section[Math.floor(section.length / 2)];
		part1 += median;
	} else {
		// If a section was invalid, sort it correctly and then
		// update the part 2 answer by adding the middle page
		// of the sorted section instead.
		section.sort((a, b) => {
			const afterA = afterMap.get(a);
			const afterB = afterMap.get(b);
			if (afterA && afterA.has(b)) return -1;
			if (afterB && afterB.has(a)) return 1;
			return 0;
		});
		const median = section[Math.floor(section.length / 2)];
		part2 += median;
	}
}

console.log('Part 1 answer:');
console.log(part1);
console.log('Part 2 answer:');
console.log(part2);
