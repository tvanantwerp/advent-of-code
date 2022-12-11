const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

type Operation = (item: number) => number;
type Operand = '+' | '-' | '*' | '/';

type Monkey = {
	items: number[];
	operation: Operation;
	test: (item: number) => boolean;
	ifTestTrue: number;
	ifTestFalse: number;
};

function isValidOperation(operand: Operand): operand is Operand {
	if (
		operand === '+' || operand === '-' || operand === '*' || operand === '/'
	) return true;
	return false;
}

function getOperation(
	left: string | number,
	right: string | number,
	operand: Operand,
): Operation {
	if (!isValidOperation(operand)) {
		throw new Error(`Invalid operand: ${operand}`);
	}
	if (left === 'old' && right === 'old') {
		return (item: number) => eval(`${item} ${operand} ${item}`);
	}
	if (left === 'old' && !isNaN(+right)) {
		return (item: number) => eval(`${item} ${operand} ${right}`);
	}
	if (right === 'old' && !isNaN(+left)) {
		return (item: number) => eval(`${left} ${operand} ${item}`);
	}
	throw new Error(
		`Invalid left or right operation: ${left} ${operand} ${right}`,
	);
}

function parseInput(input: string) {
	const monkeys: Monkey[] = [];
	const rawMonkeys = input.trim().split('\n\n').map((monkey) =>
		monkey.split('\n')
	);
	rawMonkeys.forEach((monkey) => {
		const whichMonkey = monkey[0].match(/^Monkey (\d+)/)![1];
		const items = monkey[1].match(/\d+/g)!.map((item) => +item);
		const operationText = monkey[2].match(/(\w+|\d+) (\+|-|\/|\*) (\w+|\d+)/)!;
		const operation = getOperation(
			operationText[1],
			operationText[3],
			operationText[2] as Operand,
		);
		const test = (item: number) => (item % +monkey[3].match(/\d+/)![0]) === 0;

		monkeys[+whichMonkey] = {
			items,
			operation,
			test,
			ifTestTrue: +monkey[4].match(/\d+/)![0],
			ifTestFalse: +monkey[5].match(/\d+/)![0],
		};
	});
	return monkeys;
}

function part1(input: string): number {
	const monkeys = parseInput(input);
	console.log(monkeys);
	return 0;
}

function part2(input: string): number {
	return 0;
}

const test1 = part1(test);
console.assert(test1 === 10605, { expected: 10605, received: test1 });
