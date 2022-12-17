const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

function parseInput(input: string) {
	const pattern = /(\w+) to (\w+) = (\d+)/;
	const routes = input.trim().split('\n').map((route) => {
		const [, from, to, distance] = route.match(pattern)!;
		return [from, to, +distance];
	});

	return routes;
}

const part1 = (input: string): number => {
	return 0;
};

const part2 = (input: string): number => {
	return 0;
};

// const test1 = part1(test);
// console.assert(605 === test1, {
// 	expected: 605,
// 	received: test1,
// });
// const test2 = part2(test);
// console.assert(19 === test2, {
// 	expected: 19,
// 	received: test2,
// });

// console.log(`Part 1 answer: ${part1(input)}`);
// console.log(`Part 2 answer: ${part2(input)}`);
