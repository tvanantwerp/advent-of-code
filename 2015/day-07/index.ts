const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
// const input = await Deno.readTextFile(`${__dirname}input.txt`);

const parseInput = (input: string) => {
	return input.trim().split('\n');
};

const part1 = (input: string, wire: string) => {
	const instructions = parseInput(input).map((instruction) => {
		const [ops, target] = instruction.split(' -> ');
		return [ops.split(' '), target];
	}).sort((a, b) => a[0].length - b[0].length);
	console.log(instructions);
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
