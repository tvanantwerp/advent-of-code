const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

type ResultType = 'VALUE';
type NegationType = 'NOT';
type ComputationType = 'AND' | 'OR' | 'LSHIFT' | 'RSHIFT';

type Instruction = { target: string; type: NegationType; inputs: string } | {
	target: string;
	type: ComputationType;
	inputs: [string, string];
} | { target: string; type: ResultType; inputs: number };

function parseOperation(operation: string, target: string): Instruction {
	const instructions = operation.split(' ');
	switch (instructions.length) {
		case 1:
			return { target, type: 'VALUE', inputs: +instructions[0] };
		case 2:
			return { target, type: 'NOT', inputs: instructions[1] };
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
	const operations: Map<string, Instruction> = new Map();
	for (const instruction of instructions) {
		operations.set(instruction.target, instruction);
	}

	function findOperation(target: string): number {
		if (isNaN(+target)) return compute(operations.get(target)!);
		return +target;
	}

	function compute({ type, inputs, target }: Instruction): number {
		console.log(
			`Looking for ${target} with inputs ${inputs}. ${type} calculation.`,
		);
		if (results.has(target)) {
			return results.get(target)!;
		} else if (type === 'VALUE') {
			results.set(target, inputs);
			return inputs;
		} else if (type === 'NOT') {
			const result = ~compute(operations.get(inputs)!) & 0xffff;
			results.set(target, result);
			return result;
		} else if (type === 'AND') {
			const result = findOperation(inputs[0])! &
				findOperation(inputs[1])!;
			results.set(target, result);
			return result;
		} else if (type === 'OR') {
			const result = findOperation(inputs[0])! |
				findOperation(inputs[1])!;
			results.set(target, result);
			return result;
		} else if (type === 'LSHIFT') {
			const result = findOperation(inputs[0])! <<
				findOperation(inputs[1])!;
			results.set(target, result);
			return result;
		} else if (type === 'RSHIFT') {
			const result = findOperation(inputs[0])! >>
				findOperation(inputs[1])!;
			results.set(target, result);
			return result;
		} else {
			throw new Error(
				`Invalid instruction: ${{ target, type, inputs }}`,
			);
		}
	}
	console.log(operations.get(wire));
	return compute(operations.get(wire)!);
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

console.log(`Part 1 answer: ${part1(input, 'lx')}`);
// console.log(`Part 2 answer: ${part2(input)}`);
