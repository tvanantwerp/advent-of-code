const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

const parseInput = (input: string) => {
	return input.trim().split('\n');
};

const getPriority = (character: string) => {
	if (character.length < 1 || character.length > 1) {
		throw new Error(
			`Invalid character length, should be one character. Received ${character}`,
		);
	}
	if (character.match(/[A-Z]/)) return character.charCodeAt(0) - 38;
	else if (character.match(/[a-z]/)) return character.charCodeAt(0) - 96;
	else throw new Error(`Invalid character for priority: ${character}`);
};

const compareSets = (set1: Set<string>, set2: Set<string>): string[] => {
	const shared = new Set([...set1].filter((char) => set2.has(char)));
	return [...shared];
};

const part1 = (input: string) => {
	const rucksacks = parseInput(input);
	let priorities = 0;
	for (const rucksack of rucksacks) {
		const compartment1 = rucksack.slice(0, rucksack.length / 2).split('');
		const compartment2 = rucksack.slice(rucksack.length / 2).split('');
		const sharedItem = compareSets(
			new Set(compartment1),
			new Set(compartment2),
		);
		if (sharedItem.length !== 1) {
			throw new Error(`Expected single shared item, found: ${sharedItem}`);
		}
		priorities += getPriority(sharedItem[0]);
	}
	return priorities;
};

const part2 = (input: string) => {
	const rucksacks = parseInput(input);
	const elfGroups: [string, string, string][] = [];
	if (rucksacks.length % 3 !== 0) {
		throw new Error(
			`Invalid input: expected no remainder when dividing elves into groups of three.`,
		);
	}
	for (let i = 0; i < rucksacks.length; i += 3) {
		elfGroups.push(rucksacks.slice(i, i + 3) as [string, string, string]);
	}
	let priorities = 0;
	for (const elfGroup of elfGroups) {
		const firstTwoShared = compareSets(
			new Set(elfGroup[0].split('')),
			new Set(elfGroup[1].split('')),
		);
		const allShared = compareSets(
			new Set(firstTwoShared),
			new Set(elfGroup[2].split('')),
		);
		if (allShared.length !== 1) {
			throw new Error(`Expected single shared badge, got: ${allShared}`);
		}
		priorities += getPriority(allShared[0]);
	}
	return priorities;
};

console.assert(16 === part1('vJrwpWtwJgWrhcsFMMfFFhFp'), {
	expected: 16,
	received: part1('vJrwpWtwJgWrhcsFMMfFFhFp'),
});
console.assert(38 === part1('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL'), {
	expected: 38,
	received: part1('jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL'),
});
console.assert(42 === part1('PmmdzqPrVvPwwTWBwg'), {
	expected: 42,
	received: part1('PmmdzqPrVvPwwTWBwg'),
});
console.assert(22 === part1('wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn'), {
	expected: 22,
	received: part1('wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn'),
});
console.assert(20 === part1('ttgJtRGJQctTZtZT'), {
	expected: 20,
	received: part1('ttgJtRGJQctTZtZT'),
});
console.assert(19 === part1('CrZsJsPPZsGzwwsLwLmpwMDw'), {
	expected: 19,
	received: part1('CrZsJsPPZsGzwwsLwLmpwMDw'),
});
console.assert(157 === part1(test), { expected: 157, received: part1(test) });
console.assert(70 === part2(test), { expected: 70, received: part2(test) });

console.log(`Part 1 answer: ${part1(input)}`);
console.log(`Part 2 answer: ${part2(input)}`);
