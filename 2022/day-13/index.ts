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

function isArrayOfNumbers(array: unknown[]): array is number[] {
	for (let i = 0; i < array.length; i++) {
		if (typeof array[i] !== 'number') return false;
	}
	return true;
}

function arraysInOrder(array1: number[], array2: number[]): boolean {
	const shortestPacket = Math.min(array1.length, array2.length);
	for (let i = 0; i < shortestPacket; i++) {
		console.log(
			`Comparing ${JSON.stringify(array1[i])} and ${JSON.stringify(array2[i])}`,
		);

		if (array1[i] > array2[i]) {
			console.log(`${array1[i]} > ${array2[i]}, out of order`);
			return false;
		} else if (array1[i] < array2[i]) {
			console.log(`${array1[i]}  ${array2[i]}, in order`);
			return true;
		}

		if (i === shortestPacket - 1 && array1[i + 1] !== undefined) {
			console.log(`Right side ran out of items, out of order`);
			return false;
		}
	}
	return true;
}

function packetsInOrder(
	packet1: any[],
	packet2: any[],
): boolean {
	const shortestPacket = Math.min(packet1.length, packet2.length);
	let inOrder = true;
	console.log(
		`Compare ${JSON.stringify(packet1)} vs ${JSON.stringify(packet2)}`,
	);
	for (let i = 0; i < shortestPacket; i++) {
		console.log(
			`Compare ${JSON.stringify(packet1[i])} vs ${JSON.stringify(packet2[i])}`,
		);
		if (!inOrder) break;

		if (Array.isArray(packet1[i]) && Array.isArray(packet2[i])) {
			if (packet1[i].length > 0 && packet2[i].length === 0) {
				inOrder = false;
				break;
			} else {
				inOrder = packetsInOrder(packet1[i], packet2[i]);
			}
		}

		if (typeof packet1[i] === 'number' && Array.isArray(packet2[i])) {
			inOrder = packetsInOrder([packet1[i]], packet2[i]);
		}
		if (typeof packet2[i] === 'number' && Array.isArray(packet1[i])) {
			inOrder = packetsInOrder(packet1[i], [packet2[i]]);
		}

		if (typeof packet1[i] === 'number' && typeof packet2[i] === 'number') {
			if (packet1[i] < packet2[i]) break;
			if (packet1[i] > packet2[i]) {
				inOrder = false;
				break;
			}
		}

		if (
			packet1[i + 1] !== undefined &&
			packet2[i + 1] === undefined
		) {
			console.log(`Right side is smaller, packets are out of order`);
			inOrder = false;
		}
	}

	return inOrder;
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
