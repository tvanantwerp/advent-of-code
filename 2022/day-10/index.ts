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

function part1(input: string): number {
	const operations = parseInput(input).reverse();
	let register = 1;
	let cycle = 1;
	let score = 0;
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
		if ((cycle - 20) % 40 === 0) {
			score += cycle * register;
		}
	}
	return score;
}

// function part2(input: string): number {}

const test1 = part1(test);
// const test2 = part1(test);
console.assert(test1 === 13140, { expected: 13140, received: test1 });

console.log(`Part 1: ${part1(input)}`);
// console.log(`Part 2: ${part1(input)}`);
