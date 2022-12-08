const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
// const input = await Deno.readTextFile(`${__dirname}input.txt`);

type ResultType = 'VALUE';
type NegationType = 'NOT';
type ComputationType = 'AND' | 'OR' | 'LSHIFT' | 'RSHIFT';

type Instruction = { target: string; type: NegationType; inputs: [string] } | {
	target: string;
	type: ComputationType;
	inputs: [string, string];
} | { target: string; type: ResultType; inputs: [number] };

function parseOperation(operation: string, target: string): Instruction {
	const instructions = operation.split(' ');
	switch (instructions.length) {
		case 1:
			return { target, type: 'VALUE', inputs: [+instructions[0]] };
		case 2:
			return { target, type: 'NOT', inputs: [instructions[1]] };
		case 3:
			return {
				target,
				type: instructions[1] as ComputationType,
				inputs: [instructions[0], instructions[2]],
			};
		default:
			throw new Error(`Invalid operation: ${instructions}.`);
	}
}

const parseInput = (input: string): Instruction[] => {
	return input.trim().split('\n').map((line) => {
		const [operation, target] = line.split(' -> ');
		return parseOperation(operation, target);
	});
};

const part1 = (input: string, wire: string) => {
	const instructions = parseInput(input);
	const results: Map<string, number> = new Map();
	const operations: Map<string, Omit<Instruction, 'target'>> = new Map();

	for (const { type, inputs, target } of instructions) {
		if (type === 'VALUE') {
			results.set(target, inputs[0]);
		} else {
			operations.set(target, { type, inputs });
		}
	}

	return 0;
};

// const part2 = (input: string) => {
// };

const test1 = part1(test, 'd');
console.assert(72 === test1, {
	expected: 72,
	received: test1,
});
const test2 = part1(test, 'e');
console.assert(507 === test2, {
	expected: 507,
	received: test2,
});
const test3 = part1(test, 'f');
console.assert(492 === test3, {
	expected: 492,
	received: test3,
});
const test4 = part1(test, 'g');
console.assert(114 === test4, {
	expected: 114,
	received: test4,
});
const test5 = part1(test, 'h');
console.assert(65412 === test5, {
	expected: 65412,
	received: test5,
});
const test6 = part1(test, 'i');
console.assert(65079 === test6, {
	expected: 65079,
	received: test6,
});
const test7 = part1(test, 'x');
console.assert(123 === test7, {
	expected: 123,
	received: test7,
});
const test8 = part1(test, 'y');
console.assert(456 === test8, {
	expected: 456,
	received: test8,
});

// console.log(`Part 1 answer: ${part1(input)}`);
// console.log(`Part 2 answer: ${part2(input)}`);
