const __dirname = new URL('.', import.meta.url).pathname;
const input = await Deno.readTextFile(`${__dirname}input.txt`);

const parseInput = (input: string) => {
	return input.trim().split('\n').map((instructions) => {
		const coordinates = instructions.match(/\d+/g)?.map((d) => +d);
		if (coordinates?.length !== 4) {
			throw new Error(
				`Failed to parse coordinates, received ${instructions} and parsed ${coordinates}`,
			);
		}
		const coordinatePairs: [[number, number], [number, number]] = [
			coordinates.slice(0, 2) as [number, number],
			coordinates.slice(2) as [number, number],
		];
		const toggle: 'on' | 'off' | 'toggle' = instructions.match('off')
			? 'off'
			: instructions.match('on')
			? 'on'
			: 'toggle';
		return { coordinatePairs, toggle };
	});
};

const part1 = (input: string) => {
	const grid: boolean[][] = Array.from(
		{ length: 1000 },
		() => Array.from({ length: 1000 }, () => false),
	);

	const instructions = parseInput(input);
	for (const instruction of instructions) {
		for (
			let i = instruction.coordinatePairs[0][1];
			i <= instruction.coordinatePairs[1][1];
			i++
		) {
			for (
				let j = instruction.coordinatePairs[0][0];
				j <= instruction.coordinatePairs[1][0];
				j++
			) {
				if (instruction.toggle === 'on') grid[i][j] = true;
				if (instruction.toggle === 'off') grid[i][j] = false;
				if (instruction.toggle === 'toggle') grid[i][j] = !grid[i][j];
			}
		}
	}

	const lightsOn = grid.flat().reduce((acc, curr) => curr ? acc + 1 : acc, 0);
	return lightsOn;
};

const part2 = (input: string) => {
	const grid: number[][] = Array.from(
		{ length: 1000 },
		() => Array.from({ length: 1000 }, () => 0),
	);

	const instructions = parseInput(input);
	for (const instruction of instructions) {
		for (
			let i = instruction.coordinatePairs[0][1];
			i <= instruction.coordinatePairs[1][1];
			i++
		) {
			for (
				let j = instruction.coordinatePairs[0][0];
				j <= instruction.coordinatePairs[1][0];
				j++
			) {
				if (instruction.toggle === 'on') grid[i][j] += 1;
				if (instruction.toggle === 'off') {
					grid[i][j] = Math.max(grid[i][j] -= 1, 0);
				}
				if (instruction.toggle === 'toggle') grid[i][j] += 2;
			}
		}
	}

	const brightness = grid.flat().reduce((acc, curr) => acc + curr, 0);
	return brightness;
};

console.assert(1000 * 1000 === part1('turn on 0,0 through 999,999'), {
	expected: 1000 * 1000,
	received: part1('turn on 0,0 through 999,999'),
});
console.assert(1000 === part1('toggle 0,0 through 999,0'), {
	expected: 1000,
	received: part1('toggle 0,0 through 999,0'),
});
console.assert(0 === part1('turn off 499,499 through 500,500'), {
	expected: 0,
	received: part1('turn off 499,499 through 500,500'),
});
console.assert(1 === part2('turn on 0,0 through 0,0'), {
	expected: 1,
	received: part2('turn on 0,0 through 0,0'),
});
console.assert(2000000 === part2('toggle 0,0 through 999,999'), {
	expected: 2000000,
	received: part2('toggle 0,0 through 999,999'),
});

console.log(`Part 1 answer: ${part1(input)}`);
console.log(`Part 2 answer: ${part2(input)}`);
