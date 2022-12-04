const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

const parseInput = (input: string) => {
	return input.trim().split('\n').map((pair) =>
		pair.split(',').map((range) => range.split('-').map((d) => +d))
	);
};

const part1 = (input: string) => {
	const assignments = parseInput(input);
	let encapsulatedAssignments = 0;
	for (let i = 0; i < assignments.length; i++) {
		const [start1, end1] = assignments[i][0];
		const [start2, end2] = assignments[i][1];
		if (
			(start1 <= start2 && end1 >= end2) || (start2 <= start1 && end2 >= end1)
		) {
			encapsulatedAssignments++;
		}
	}

	return encapsulatedAssignments;
};

const part2 = (input: string) => {
	const assignments = parseInput(input);
	let overlapping = 0;
	for (let i = 0; i < assignments.length; i++) {
		const [start1, end1] = assignments[i][0];
		const [start2, end2] = assignments[i][1];
		if (
			(start1 >= start2 && start1 <= end2) ||
			(start2 >= start1 && start2 <= end1) ||
			(end1 >= start2 && end1 <= end2) ||
			(end2 >= start1 && end2 <= end1)
		) {
			overlapping++;
		}
	}

	return overlapping;
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
