const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

function parseInput(input: string): string[] {
	return input.trim().split('\n');
}

const part1 = (input: string): number => {
	let stringCount = 0;
	let memoryCount = 0;
	const strip = /^"|"$/g;
	const substitute = /\\x[\d\w]{2}|\\"|\\\\/g;
	const strings = parseInput(input);
	for (const string of strings) {
		const decodedString = string.replace(strip, '').replace(substitute, '_');
		stringCount += string.length;
		memoryCount += decodedString.length;
	}
	return stringCount - memoryCount;
};

const part2 = (input: string): number => {
	let stringCount = 0;
	let memoryCount = 0;

	const strings = parseInput(input);
	for (const string of strings) {
		const characters = string.split('');
		let specialCharCount = 2; // Init with two for ""
		characters.forEach((char) => {
			if (char.match(/\\|"/)) specialCharCount++;
		});

		stringCount += string.length;
		memoryCount += string.length + specialCharCount;
		console.log(string, string.length, specialCharCount);
	}
	return memoryCount - stringCount;
};

const test1 = part1(test);
console.assert(12 === test1, {
	expected: 12,
	received: test1,
});
const test2 = part2(test);
console.assert(19 === test2, {
	expected: 19,
	received: test2,
});

console.log(`Part 1 answer: ${part1(input)}`);
console.log(`Part 2 answer: ${part2(input)}`);
