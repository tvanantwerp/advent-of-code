const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

const parseInput = (input: string) => {
	const [initialState, initialActions] = input.trim().split('\n\n');
	const initialStateRows = initialState.split('\n');
	const stackHeight = initialStateRows.length - 1;
	const stackCountMatch = initialStateRows[initialStateRows.length - 1].match(
		/.*(\d)\s?$/,
	)!;
	const stackCount = parseInt(
		stackCountMatch[1],
	);
	const stacks: Record<string, string[]> = {};
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
	Object.keys(stacks).forEach((key) => {
		stacks[key] = stacks[key].reverse();
	});

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

parseInput(test);

const part1 = (input: string) => {
	const { stacks, actions } = parseInput(input);
	for (const action of actions) {
		const movedCrates = stacks[action.source].splice(0, action.count).reverse();
		stacks[action.destination].push(...movedCrates);
	}
	let topCrates = '';
	Object.keys(stacks).forEach((key) => {
		topCrates += stacks[key].at(-1);
	});
	console.log(stacks);
	return topCrates;
};

// const part2 = (input: string) => {
// };

const test1 = part1(test);
console.assert('CMZ' === test1, {
	expected: 'CMZ',
	received: test1,
});
// const test2 = part2(test);
// console.assert(4 === test2, {
// 	expected: 4,
// 	received: test2,
// });

console.log(`Part 1 answer: ${part1(input)}`);
// console.log(`Part 2 answer: ${part2(input)}`);
