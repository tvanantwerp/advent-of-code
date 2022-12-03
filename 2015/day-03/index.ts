const __dirname = new URL('.', import.meta.url).pathname;
const input = await Deno.readTextFile(`${__dirname}input.txt`);

const parseInput = (input: string) => {
	return input.trim().split('');
};

const part1 = (input: string) => {
	const directions = parseInput(input);
	let lastPosition: [number, number] = [0, 0];
	const houses: Map<string, number> = new Map([['[0,0]', 1]]);
	for (let i = 0; i < directions.length; i++) {
		const direction = directions[i];
		if (direction === '^') {
			lastPosition = [lastPosition[0], lastPosition[1] + 1];
		}
		if (direction === '>') {
			lastPosition = [lastPosition[0] + 1, lastPosition[1]];
		}
		if (direction === 'v') {
			lastPosition = [lastPosition[0], lastPosition[1] - 1];
		}
		if (direction === '<') {
			lastPosition = [lastPosition[0] - 1, lastPosition[1]];
		}
		const visits = houses.get(JSON.stringify(lastPosition)) || 0;
		houses.set(JSON.stringify(lastPosition), visits + 1);
	}
	return houses.size;
};

const part2 = (input: string) => {
	const directions = parseInput(input);
	let lastSantaPosition: [number, number] = [0, 0];
	let lastRobotPosition: [number, number] = [0, 0];
	const houses: Map<string, number> = new Map([['[0,0]', 2]]);
	for (let i = 0; i < directions.length; i++) {
		const direction = directions[i];
		let position = i % 2 === 1 ? lastRobotPosition : lastSantaPosition;
		if (direction === '^') {
			position = [position[0], position[1] + 1];
		}
		if (direction === '>') {
			position = [position[0] + 1, position[1]];
		}
		if (direction === 'v') {
			position = [position[0], position[1] - 1];
		}
		if (direction === '<') {
			position = [position[0] - 1, position[1]];
		}
		const visits = houses.get(JSON.stringify(position)) || 0;
		houses.set(JSON.stringify(position), visits + 1);
		if (i % 2 === 1) lastRobotPosition = position;
		else lastSantaPosition = position;
	}
	return houses.size;
};

console.log(`Input > should be 2 houses, is ${part1('>')}`);
console.log(`Input ^>v< should be 4 houses, is ${part1('^>v<')}`);
console.log(`Input ^v^v^v^v^v should be 2 houses, is ${part1('^v^v^v^v^v')}`);
console.log(`Input ^v should be 3 houses, is ${part2('^v')}`);
console.log(`Input ^>v< should be 3 houses, is ${part2('^>v<')}`);
console.log(`Input ^v^v^v^v^v should be 11 houses, is ${part2('^v^v^v^v^v')}`);
console.log('---');
console.log(`Part 1 answer: ${part1(input)}`);
console.log(`Part 2 answer: ${part2(input)}`);
