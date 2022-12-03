const __dirname = new URL('.', import.meta.url).pathname;
const test1 = await Deno.readTextFile(`${__dirname}test1.txt`);
const test2 = await Deno.readTextFile(`${__dirname}test2.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

const parseInput = (input: string) => {
	return input.trim().split('\n');
};

const part1 = (input: string) => {
	const strings = parseInput(input);
	let niceStrings = 0;
	for (let i = 0; i < strings.length; i++) {
		if (strings[i].match(/ab|cd|pq|xy/)) continue;
		if (
			strings[i].match(/(.)\1+/) &&
			strings[i].match(/(.*[aeiou]){3}/)
		) niceStrings++;
	}
	return niceStrings;
};

const part2 = (input: string) => {
	const strings = parseInput(input);
	let niceStrings = 0;
	for (let i = 0; i < strings.length; i++) {
		if (
			strings[i].match(/(..).*\1/) &&
			strings[i].match(/(.).\1/)
		) niceStrings++;
	}
	return niceStrings;
};

console.assert(2 === part1(test1), { expected: 2, received: part1(test1) });
console.assert(2 === part2(test2), { expected: 2, received: part2(test1) });
console.log(`Part 1 answer: ${part1(input)}`);
console.log(`Part 2 answer: ${part2(input)}`);
