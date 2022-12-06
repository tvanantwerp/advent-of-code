const __dirname = new URL('.', import.meta.url).pathname;
const input = await Deno.readTextFile(`${__dirname}input.txt`);

function findIndexOfNthUniques(input: string, n: number) {
	let firstUniqueIndex: number | null = null;
	for (let i = n; i < input.length; i++) {
		const allUnique = n === new Set(input.slice(i - n, i)).size;
		if (allUnique) {
			firstUniqueIndex = i;
			break;
		}
	}
	return firstUniqueIndex;
}

const part1 = (input: string) => {
	return findIndexOfNthUniques(input, 4);
};

const part2 = (input: string) => {
	return findIndexOfNthUniques(input, 14);
};

const test1 = part1('bvwbjplbgvbhsrlpgdmjqwftvncz');
console.assert(5 === test1, {
	expected: 5,
	received: test1,
});
const test2 = part1('nppdvjthqldpwncqszvftbrmjlhg');
console.assert(6 === test2, {
	expected: 6,
	received: test1,
});
const test3 = part1('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg');
console.assert(10 === test3, {
	expected: 10,
	received: test1,
});
const test4 = part1('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw');
console.assert(11 === test4, {
	expected: 11,
	received: test1,
});
const test5 = part2('mjqjpqmgbljsphdztnvjfqwrcgsmlb');
console.assert(19 === test5, {
	expected: 19,
	received: test1,
});
const test6 = part2('bvwbjplbgvbhsrlpgdmjqwftvncz');
console.assert(23 === test6, {
	expected: 23,
	received: test1,
});
const test7 = part2('nppdvjthqldpwncqszvftbrmjlhg');
console.assert(23 === test7, {
	expected: 23,
	received: test1,
});
const test8 = part2('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg');
console.assert(29 === test8, {
	expected: 29,
	received: test1,
});
const test9 = part2('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw');
console.assert(26 === test9, {
	expected: 26,
	received: test1,
});

console.log(`Part 1 answer: ${part1(input)}`);
console.log(`Part 2 answer: ${part2(input)}`);
