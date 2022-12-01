const input = await Deno.readTextFile("./input.txt");

const part1 = (input: string) => {
	const calorieCounts = input.split(/\n\n/).map((calories) =>
		calories.split("\n").map((d) => +d).reduce((acc, curr) => acc + curr, 0)
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
		calories.split("\n").map((d) => +d).reduce((acc, curr) => acc + curr, 0)
	);

	return calorieCounts.sort((a, b) => b - a).slice(0, 3).reduce(
		(acc, curr) => acc + curr,
		0,
	);
};

await Deno.writeTextFile("./output1.txt", JSON.stringify(part1(input)));
await Deno.writeTextFile("./output2.txt", JSON.stringify(part2(input)));
