import { crypto } from 'https://deno.land/std@0.167.0/crypto/mod.ts';

const test1 = 'abcdef';
const test2 = 'pqrstuv';
const input = 'bgvyzdsv';

const day4 = async (input: string, leadingZeroes: number) => {
	let answer = -1;
	const pattern = new RegExp(`^0{${leadingZeroes}}.*$`);
	let hashHex = '';
	while (!hashHex.match(pattern)) {
		answer += 1;
		const hashBuffer = await crypto.subtle.digest(
			'MD5',
			new TextEncoder().encode(`${input}${answer}`),
		);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(
			'',
		);
	}
	return answer;
};

console.assert(609043 === await day4(test1, 5), {
	expected: 609043,
	received: await day4(test1, 5),
});
console.assert(1048970 === await day4(test2, 5), {
	expected: 1048970,
	received: await day4(test2, 5),
});

console.log(`Part 1 answer: ${await day4(input, 5)}`);
console.log(`Part 2 answer: ${await day4(input, 6)}`);
