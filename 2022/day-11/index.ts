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

function monkeyBusiness(input: string, rounds: number, relief = 1): number {
	const monkeys = parseInput(input);
	if (monkeys.length <= 1) throw new Error(`Not enough monkeys!`);
	const examinations: number[] = Array.from(
		{ length: monkeys.length },
		() => 0,
	);
	for (let round = 0; round < rounds; round++) {
		for (let monkey = 0; monkey < monkeys.length; monkey++) {
			while (monkeys[monkey].items.length) {
				const item = monkeys[monkey].items.pop()!;
				examinations[monkey]
					? examinations[monkey] += 1
					: examinations[monkey] = 1;
				let worry = relief > 1
					? Math.floor(monkeys[monkey].operation(item) / relief)
					: monkeys[monkey].operation(item);
				if (monkeys[monkey].test(worry)) {
					monkeys[monkeys[monkey].ifTestTrue].items.push(worry);
				} else monkeys[monkeys[monkey].ifTestFalse].items.push(worry);
			}
		}
	}
	const topTwo = examinations.sort((a, b) => b - a).slice(0, 2);
	return topTwo[0] * topTwo[1];
}

const test1 = monkeyBusiness(test, 20, 3);
console.assert(test1 === 10605, { expected: 10605, received: test1 });
const test2 = monkeyBusiness(test, 10000);
console.assert(test2 === 2713310158, { expected: 2713310158, received: test2 });

console.log(`Part 1: ${monkeyBusiness(input, 20, 3)}`);
console.log(`Part 2: ${monkeyBusiness(input, 20)}`);
