const input = await Deno.readTextFile("./input.txt");

const part1 = (input: string) => {
	const elfCalorieTotals = input.split(/\n\n/);
	let maxCalories = 0;
	for (let i = 0; i < elfCalorieTotals.length; i++) {
		const calorieCounts = elfCalorieTotals[i].split("\n").map((d) => +d);
		const total = calorieCounts.reduce((acc, curr) => {
			return acc + curr;
		}, 0);
		if (total > maxCalories) {
			console.log(
				`Old total was ${maxCalories}, new total is ${total} at elf ${i}`,
			);
			maxCalories = total;
		}
	}

	return maxCalories;
};

const part2 = (input: string) => {
	const elfCalorieTotals = input.split(/\n\n/);
	const calorieCounts = elfCalorieTotals.map((calories) =>
		calories.split("\n").map((d) => +d).reduce((acc, curr) => acc + curr, 0)
	);

	return calorieCounts.sort((a, b) => b - a).slice(0, 3).reduce(
		(acc, curr) => acc + curr,
		0,
	);
};

await Deno.writeTextFile("./output1.txt", JSON.stringify(part1(input)));
await Deno.writeTextFile("./output2.txt", JSON.stringify(part2(input)));
