const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

type Addx = {
	instruction: 'addx';
	value: number;
};
type Noop = { instruction: 'noop' };
type Operation = Addx | Noop;

function isAddx(operation: Operation): operation is Addx {
	return operation.instruction === 'addx';
}

function parseInput(input: string): Operation[] {
	return input.trim().split('\n').map((line) => {
		const row = line.split(' ');
		if (row[0] === 'addx') {
			return { instruction: 'addx', value: +row[1] };
		} else return { instruction: 'noop' };
	});
}

function getRegisters(operations: Operation[]): number[] {
	operations.reverse();
	let register = 1;
	let cycle = 1;
	const result: number[] = [];
	const queue: Addx[] = [];
	while (operations.length > 0 || queue.length > 0) {
		console.log(cycle, register, operations.length, queue.length);
		cycle++;
		if (queue.length > 0) {
			register += queue.pop()?.value!;
		} else {
			const nextOp = operations.pop()!;
			if (isAddx(nextOp)) {
				queue.push(nextOp);
			}
		}
		result.push(register);
	}
	return result;
}

function part1(input: string): number {
	const registers = getRegisters(parseInput(input));
	let cycle = 20;
	let score = 0;
	while (registers[cycle - 1]) {
		score += registers[cycle - 1] * cycle;
		cycle += 40;
	}
	return score;
}

// function part2(input: string): number {}

const test1 = part1(test);
// const test2 = part1(test);
console.assert(test1 === 13140, { expected: 13140, received: test1 });

console.log(`Part 1: ${part1(input)}`);
// console.log(`Part 2: ${part1(input)}`);
