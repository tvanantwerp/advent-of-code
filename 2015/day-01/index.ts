const __dirname = new URL('.', import.meta.url).pathname;
const input = await Deno.readTextFile(`${__dirname}input.txt`);

const parseInput = (input: string) => {
	return input.trim().split('');
};

const part1 = (input: string) => {
	const instructions = parseInput(input);
	let floor = 0;
	for (let i = 0; i < instructions.length; i++) {
		if (instructions[i] === '(') floor += 1;
		if (instructions[i] === ')') floor -= 1;
		if (instructions[i] !== '(' && instructions[i] !== ')') {
			throw new Error(
				`Invalid floor marker, received ${instructions[i]} at ${i}`,
			);
		}
	}
	return floor;
};

const part2 = (input: string) => {
	const instructions = parseInput(input);
	let floor = 0;
	for (let i = 0; i < instructions.length; i++) {
		if (instructions[i] !== '(' && instructions[i] !== ')') {
			throw new Error(
				`Invalid floor marker, received ${instructions[i]} at ${i}`,
			);
		}
		if (instructions[i] === '(') floor += 1;
		if (instructions[i] === ')') floor -= 1;
		if (floor < 0) {
			return i + 1;
		}
	}
};

console.log(`Input (()) should be 0, is ${part1('(())')}`);
console.log(`Input ()() should be 0, is ${part1('()()')}`);
console.log(`Input ((( should be 3, is ${part1('(((')}`);
console.log(`Input (()(()( should be 3, is ${part1('(()(()(')}`);
console.log(`Input ))((((( should be 3, is ${part1('))(((((')}`);
console.log(`Input ()) should be -1, is ${part1('())')}`);
console.log(`Input ))( should be -1, is ${part1('))(')}`);
console.log(`Input ))) should be -3, is ${part1(')))')}`);
console.log(`Input )())()) should be -3, is ${part1(')())())')}`);
console.log('---');
console.log(part1(input));
console.log(part2(input));
