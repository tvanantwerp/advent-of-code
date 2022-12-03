const __dirname = new URL('.', import.meta.url).pathname;
const input = await Deno.readTextFile(`${__dirname}input.txt`);

const part1 = (input: string) => {
	const calorieCounts = input.split(/\n\n/).map((calories) =>
		calories.split('\n').map((d) => +d).reduce((acc, curr) => acc + curr, 0)
	);
	let maxCalories = 0;
	for (let i = 0; i < calorieCounts.length; i++) {
		if (calorieCounts[i] > maxCalories) {
			maxCalories = calorieCounts[i];
		}
	}

	return maxCalories;
};

const part2 = (input: string) => {
	const calorieCounts = input.split(/\n\n/).map((calories) =>
		calories.split('\n').map((d) => +d).reduce((acc, curr) => acc + curr, 0)
	);

	return calorieCounts.sort((a, b) => b - a).slice(0, 3).reduce(
		(acc, curr) => acc + curr,
		0,
	);
};

console.log(`Part 1 answer: ${part1(input)}`);
console.log(`Part 2 answer: ${part2(input)}`);
