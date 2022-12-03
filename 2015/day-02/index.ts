const __dirname = new URL('.', import.meta.url).pathname;
const input = await Deno.readTextFile(`${__dirname}input.txt`);

const parseInput = (input: string) => {
	return input.trim().split('\n');
};

const parseDimensions = (dimensions: string): [number, number, number] => {
	const [length, width, height] = dimensions.split('x').map((d) => +d);
	return [length, width, height];
};

const parseSideAreas = (dimensions: string): [number, number, number] => {
	const [length, width, height] = dimensions.split('x').map((d) => +d);
	return [length * width, width * height, height * length];
};

const part1 = (input: string) => {
	let totalArea = 0;
	const dimensions = parseInput(input);
	for (let i = 0; i < dimensions.length; i++) {
		const faces = parseSideAreas(dimensions[i]);
		totalArea += (2 * faces[0]) + (2 * faces[1]) +
			(2 * faces[2]) +
			Math.min(...faces);
	}
	return totalArea;
};

const part2 = (input: string) => {
	let totalRibbon = 0;
	const dimensions = parseInput(input);
	for (let i = 0; i < dimensions.length; i++) {
		const sides = parseDimensions(dimensions[i]);
		const shortestSides = sides.sort((a, b) => a - b).slice(0, 2);
		const bow = sides.reduce((acc, curr) => acc * curr);
		totalRibbon += bow + shortestSides[0] * 2 + shortestSides[1] * 2;
	}
	return totalRibbon;
};

console.log(`Input 2x3x4 requires 58 sqft paper, is ${part1('2x3x4')}`);
console.log(`Input 1x1x10 requires 43 sqft paper, is ${part1('1x1x10')}`);
console.log(`Input 2x3x4 requires 34 feet of ribbon, is ${part2('2x3x4')}`);
console.log(`Input 1x1x10 requires 14 feet of ribbon, is ${part2('1x1x10')}`);
console.log('---');
console.log(`Part 1 answer: ${part1(input)}`);
console.log(`Part 2 answer: ${part2(input)}`);
