const __dirname = new URL('.', import.meta.url).pathname;
const testA = await Deno.readTextFile(`${__dirname}testA.txt`);
const testB = await Deno.readTextFile(`${__dirname}testB.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

type Direction = 'U' | 'R' | 'D' | 'L';
type Position = [number, number];

function parseInput(input: string): [Direction, number][] {
	return input.trim().split('\n').map((line) => {
		const items = line.split(' ');
		return [items[0] as Direction, +items[1]];
	});
}

function updateHead(
	direction: Direction,
	position: Position,
): Position {
	if (direction === 'L') return [position[0] - 1, position[1]];
	if (direction === 'R') return [position[0] + 1, position[1]];
	if (direction === 'U') return [position[0], position[1] - 1];
	if (direction === 'D') return [position[0], position[1] + 1];
	throw new Error(`Invalid direction: ${direction}`);
}

function updateTail(head: Position, tail: Position): Position {
	const [xDiff, yDiff] = [head[0] - tail[0], head[1] - tail[1]];
	if (Math.abs(xDiff) <= 1 && Math.abs(yDiff) <= 1) return tail;
	if (xDiff <= -2 && yDiff <= -1) return [tail[0] - 1, tail[1] - 1];
	if (xDiff <= -2 && yDiff >= 1) return [tail[0] - 1, tail[1] + 1];
	if (xDiff >= 2 && yDiff <= -1) return [tail[0] + 1, tail[1] - 1];
	if (xDiff >= 2 && yDiff >= 1) return [tail[0] + 1, tail[1] + 1];
	if (xDiff <= -1 && yDiff <= -2) return [tail[0] - 1, tail[1] - 1];
	if (xDiff <= -1 && yDiff >= 2) return [tail[0] - 1, tail[1] + 1];
	if (xDiff >= 1 && yDiff <= -2) return [tail[0] + 1, tail[1] - 1];
	if (xDiff >= 1 && yDiff >= 2) return [tail[0] + 1, tail[1] + 1];
	if (xDiff <= -2) return [tail[0] - 1, tail[1]];
	if (xDiff >= 2) return [tail[0] + 1, tail[1]];
	if (yDiff <= -2) return [tail[0], tail[1] - 1];
	if (yDiff >= 2) return [tail[0], tail[1] + 1];

	throw new Error(
		`Difference between head and tail is wrong: ${head}, ${tail}`,
	);
}

function ropeMovement(input: string, knotCount: number): number {
	const movements = parseInput(input);
	let knots: Position[] = Array.from({ length: knotCount }, () => [0, 0]);
	const tailPositions: Set<string> = new Set();
	for (const [direction, spaces] of movements) {
		for (let space = 0; space < spaces; space++) {
			knots[0] = updateHead(direction, knots[0]);
			for (let knot = 1; knot < knots.length; knot++) {
				knots[knot] = updateTail(knots[knot - 1], knots[knot]);
			}
			tailPositions.add(JSON.stringify(knots.at(-1)));
		}
	}
	return tailPositions.size;
}

const test1 = ropeMovement(testA, 2);
console.assert(13 === test1, {
	expected: 13,
	received: test1,
});
const test2 = ropeMovement(testA, 10);
console.assert(1 === test2, {
	expected: 1,
	received: test2,
});
const test3 = ropeMovement(testB, 10);
console.assert(36 === test3, {
	expected: 36,
	received: test3,
});
const test4 = ropeMovement(input, 2);
console.assert(6011 === test4, {
	expected: 6011,
	received: test4,
});

console.log(`Part 1 answer: ${ropeMovement(input, 2)}`);
console.log(`Part 2 answer: ${ropeMovement(input, 10)}`);
