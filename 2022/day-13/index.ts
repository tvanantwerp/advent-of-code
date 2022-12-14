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
): boolean | undefined {
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
	let inOrder: number = 0;
	packets.forEach((pair, i) => {
		const orderedCheck = packetsInOrder(pair[0], pair[1]);

		if (orderedCheck) inOrder += i + 1;
	});

	return inOrder;
}

function part2(input: string): number {
	const packets = parseInput(input).flat();
	packets.push([[2]], [[6]]);

	packets.sort((a, b) =>
		packetsInOrder(structuredClone(a), structuredClone(b)) ? -1 : 1
	);

	const packetStrings = packets.map((p) => JSON.stringify(p));
	const spacer1 = packetStrings.indexOf('[[2]]') + 1;
	const spacer2 = packetStrings.indexOf('[[6]]') + 1;
	return spacer1 * spacer2;
}

const test1 = part1(test);
console.assert(test1 === 13, { expected: 13, received: test1 });
const test2 = part2(test);
console.assert(test2 === 140, { expected: 140, received: test2 });

console.log(`Part 1: ${part1(input)}`);
console.log(`Part 2: ${part2(input)}`);
