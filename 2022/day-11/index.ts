const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

type Operation = (item: number) => number;
type Operand = '+' | '-' | '*' | '/';

type Monkey = {
	items: number[];
	operation: Operation;
	test: number;
	ifTestTrue: number;
	ifTestFalse: number;
};

function gcdPair(m: number, n: number): number {
	if (!n) return n === 0 ? m : NaN;
	return gcdPair(n, m % n);
}

function lcmPair(m: number, n: number): number {
	return m * n / gcdPair(m, n);
}

function lcm(numbers: number[]): number {
	var n = 1;
	for (var i = 0; i < numbers.length; ++i) {
		n = lcmPair(numbers[i], n);
	}
	return n;
}

function operate(left: number, right: number, operand: Operand) {
	if (operand === '+') return left + right;
	if (operand === '-') return left - right;
	if (operand === '*') return left * right;
	if (operand === '/') return left / right;
	throw new Error(`Invalid operand: ${operand}`);
}

function getOperation(
	left: string | number,
	right: string | number,
	operand: Operand,
): Operation {
	if (left === 'old' && right === 'old') {
		return (item: number) => operate(item, item, operand);
	}
	if (left === 'old' && !isNaN(+right)) {
		return (item: number) => operate(item, +right, operand);
	}
	if (right === 'old' && !isNaN(+left)) {
		return (item: number) => operate(+left, item, operand);
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
		const test = +monkey[3].match(/\d+/)![0];

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
	const modulus = lcm(monkeys.map((monkey) => monkey.test));
	const examinations: number[] = Array.from(
		{ length: monkeys.length },
		() => 0,
	);
	for (let round = 0; round < rounds; round++) {
		monkeys.forEach((monkey, i) => {
			while (monkey.items.length) {
				const item = monkey.items.pop()!;
				examinations[i] ? examinations[i] += 1 : examinations[i] = 1;
				const worry = relief > 1
					? Math.floor(monkey.operation(item) / relief)
					: monkey.operation(item) % modulus;
				if (worry % monkey.test === 0) {
					monkeys[monkey.ifTestTrue].items.push(worry);
				} else monkeys[monkey.ifTestFalse].items.push(worry);
			}
		});
	}

	const topTwo = examinations.sort((a, b) => b - a).slice(0, 2);
	return Number(topTwo[0] * topTwo[1]);
}

const test1 = monkeyBusiness(test, 20, 3);
console.assert(test1 === 10605, { expected: 10605, received: test1 });
const test2 = monkeyBusiness(test, 10000);
console.assert(test2 === 2713310158, { expected: 2713310158, received: test2 });

console.log(`Part 1: ${monkeyBusiness(input, 20, 3)}`);
console.log(`Part 2: ${monkeyBusiness(input, 10000)}`);
