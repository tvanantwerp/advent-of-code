const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

type Stacks = Record<string, string[]>;

const parseInput = (input: string) => {
	const [initialState, initialActions] = input.split('\n\n');
	const initialStateRows = initialState.split('\n');
	const stackHeight = initialStateRows.length - 1;
	const stackCountMatch = initialStateRows[initialStateRows.length - 1].match(
		/.*(\d)\s?$/,
	)!;
	const stackCount = parseInt(
		stackCountMatch[1],
	);
	const stacks: Stacks = {};
	for (let i = 1; i < stackCount + 1; i++) {
		stacks[i] = [];
	}
	const cratePattern = /\[(\w)\]\s?/g;
	let matches: RegExpExecArray | null;
	for (let i = 0; i < stackHeight; i++) {
		while (matches = cratePattern.exec(initialStateRows[i])) {
			stacks[1 + matches.index / 4].push(matches[1]);
		}
	}

	Object.keys(stacks).forEach((key) => stacks[key] = stacks[key].reverse());

	const actions = initialActions.split('\n').map((action) => {
		const digits = action.match(/move (\d+) from (\d+) to (\d+)/)!;
		return {
			source: digits[2]!,
			destination: digits[3]!,
			count: +digits[1]!,
		};
	});

	return { stacks, actions };
};

function getTopCrates(stacks: Stacks): string {
	let topCrates = '';
	Object.keys(stacks).forEach((key) => {
		topCrates += stacks[key].at(-1);
	});
	return topCrates;
}

const part1 = (input: string) => {
	const { stacks, actions } = parseInput(input);
	for (const action of actions) {
		const crates = stacks[action.source].reverse();
		const movedCrates = crates.splice(0, action.count);
		stacks[action.source] = crates.reverse();
		stacks[action.destination].push(...movedCrates);
	}
	return getTopCrates(stacks);
};

const part2 = (input: string) => {
	const { stacks, actions } = parseInput(input);
	for (const action of actions) {
		const crates = stacks[action.source].reverse();
		const movedCrates = crates.splice(0, action.count).reverse();
		stacks[action.source] = crates.reverse();
		stacks[action.destination].push(...movedCrates);
	}
	return getTopCrates(stacks);
};

const test1 = part1(test);
console.assert('CMZ' === test1, {
	expected: 'CMZ',
	received: test1,
});
const test2 = part2(test);
console.assert('MCD' === test2, {
	expected: 'MCD',
	received: test2,
});

console.log(`Part 1 answer: ${part1(input)}`);
console.log(`Part 2 answer: ${part2(input)}`);
