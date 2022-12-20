const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

const parseInput = (input: string): number[] => {
	return input.trim().split('\n').map((d) => +d);
};

const part1 = (input: string): number => {
	const digits = parseInput(input);
	const indices = digits.map((_, i) => i);
	return 0;
};

const part2 = (input: string): number => {
	return 0;
};

const test1 = part1(test);
console.assert(2 === test1, {
	expected: 2,
	received: test1,
});
const test2 = part2(test);
console.assert(4 === test2, {
	expected: 4,
	received: test2,
});

console.log(`Part 1 answer: ${part1(input)}`);
console.log(`Part 2 answer: ${part2(input)}`);
