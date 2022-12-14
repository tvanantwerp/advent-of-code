const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

function parseInput(input: string) {
	const pairs = input.trim().split('\n\n');
	const packets = pairs.map((pair) =>
		pair.split('\n').map((packet) => JSON.parse(packet))
	);
	return packets;
}

function packetsInOrder(
	left: any[],
	right: any[],
): boolean {
	while (left.length && right.length) {
		const l = left.shift(), r = right.shift();

		if ([l, r].every(Number.isInteger)) {
			if (l < r) return true;
			if (l > r) return false;
		} else if ([l, r].every(Array.isArray)) {
			const result = packetsInOrder(l, r);
			if (typeof result === 'boolean') return result;
		} else if (Number.isInteger(l) && Array.isArray(r)) {
			const result = packetsInOrder([l], r);
			if (typeof result === 'boolean') return result;
		} else if (Number.isInteger(r) && Array.isArray(l)) {
			const result = packetsInOrder(l, [r]);
			if (typeof result === 'boolean') return result;
		}
	}

	if (left.length) return false;
	if (right.length) return true;
}

function part1(input: string): number {
	const packets = parseInput(input);
	console.log(packets);
	let inOrder: number = 0;
	packets.forEach((pair, i) => {
		const orderedCheck = packetsInOrder(pair[0], pair[1]);

		if (orderedCheck) inOrder += i + 1;
	});

	return inOrder;
}

// const test1 = part1(test);
// console.assert(test1 === 13, { expected: 13, received: test1 });
// const test2 = part2(test);
// console.assert(test2 === 29, { expected: 29, received: test2 });

console.log(`Part 1: ${part1(input)}`);
// console.log(`Part 2: ${part2(input)}`);
