const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

type Stacks = string[][];

const parseInput = (input: string) => {
	const [initialState, initialActions] = input.split('\n\n');
	const initialStateRows = initialState.split('\n');
	const stackHeight = initialStateRows.length - 1;
	const stackCount = parseInt(
		initialStateRows[initialStateRows.length - 1].match(
			/.*(\d)\s?$/,
		)![1],
	);
	const stacks = Array.from({ length: stackCount }, (): string[] => []);
	const cratePattern = /\[(\w)\]\s?/g;
	let matches: RegExpExecArray | null;
	for (let i = 0; i < stackHeight; i++) {
		while (matches = cratePattern.exec(initialStateRows[i])) {
			stacks[matches.index / 4].push(matches[1]);
		}
	}

	stacks.forEach((stack, i) => stacks[i] = stack.reverse());

	const actions = initialActions.split('\n').map((action) => {
		const digits = action.match(/move (\d+) from (\d+) to (\d+)/)!;
		return {
			source: +digits[2]! - 1,
			destination: +digits[3]! - 1,
			count: +digits[1]!,
		};
	});

	return { stacks, actions };
};

function getTopCrates(stacks: Stacks): string {
	return stacks.map((stack) => stack[stack.length - 1]).join('');
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
