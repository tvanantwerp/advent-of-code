const __dirname = new URL('.', import.meta.url).pathname;
const input = await Deno.readTextFile(`${__dirname}input.txt`);

function parseInput(input: string) {
	return input.split(/\n\n/).map((calories) =>
		calories.split('\n').map((d) => +d).reduce((acc, curr) => acc + curr, 0)
	);
}

const part1 = (input: string) => {
	return Math.max(
		...parseInput(input),
	);
};

const part2 = (input: string) => {
	const calorieCounts = parseInput(input);

	let first = 0, second = 0, third = 0;
	calorieCounts.forEach((count) => {
		if (count > first) {
			third = second;
			second = first;
			first = count;
		} else if (count > second) {
			third = second;
			second = count;
		} else if (count > third) third = count;
	});
	// return calorieCounts.sort((a, b) => b - a).slice(0, 3).reduce(
	// 	(acc, curr) => acc + curr,
	// 	0,
	// );
	return first + second + third;
};

console.log(`Part 1 answer: ${part1(input)}`);
console.log(`Part 2 answer: ${part2(input)}`);
