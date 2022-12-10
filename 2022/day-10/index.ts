const __dirname = new URL('.', import.meta.url).pathname;
const testA = await Deno.readTextFile(`${__dirname}testA.txt`);
const testB = await Deno.readTextFile(`${__dirname}testB.txt`);
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

function drawPixel(register: number, cycle: number) {
	if (cycle % 40 >= register - 1 && cycle % 40 <= register + 1) return '#';
	return '.';
}

function part2(input: string): string {
	const registers = getRegisters(parseInput(input));
	let result = '';
	for (let cycle = 0; cycle < registers.length; cycle++) {
		if (cycle > 0 && cycle % 40 === 0) result += '\n';
		if (cycle === 0) {
			result += drawPixel(registers[cycle], cycle);
		} else {
			if (registers[cycle] === registers[cycle - 1]) {
				result += drawPixel(registers[cycle], cycle);
			} else result += drawPixel(registers[cycle - 1], cycle);
		}
	}
	return result;
}

const test1 = part1(testA);
const test2 = part2(testA);
console.assert(test1 === 13140, { expected: 13140, received: test1 });
console.assert(test2 === testB, { expected: testB, received: test2 });

console.log(`Part 1: ${part1(input)}`);
console.log(`Part 2:\n${part2(input)}`);
