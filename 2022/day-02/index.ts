const input = await Deno.readTextFile("./input.txt");
const test = await Deno.readTextFile("./test.txt");

type OpponentMoves = "A" | "B" | "C";
type PlayerActions = "X" | "Y" | "Z";

const isOpponentMove = (move: string): move is OpponentMoves => {
	return move === "A" || move === "B" || move === "C";
};

const isPlayerMove = (move: string): move is PlayerActions => {
	return move === "X" || move === "Y" || move === "Z";
};

const parseInput = (input: string) => {
	const moves = input.trim().split(/\n/).map((round) => {
		const positions = round.split(" ");
		if (!isOpponentMove(positions[0]) || !isPlayerMove(positions[1])) {
			throw new Error(`Invalid input: ${JSON.stringify(positions)}`);
		}
		return positions;
	});
	return moves;
};

const getScore = (opponent: OpponentMoves, player: PlayerActions) => {
	const playerScores = { X: 1, Y: 2, Z: 3 } as const;
	const victoryBonus = 6;
	const drawBonus = 3;
	const loseBonus = 0;
	const againstA = {X: drawBonus, Y: victoryBonus, Z: loseBonus} as const;
	const againstB = {X: loseBonus, Y: drawBonus, Z: victoryBonus} as const;
	const againstC = {X: victoryBonus, Y: loseBonus, Z: drawBonus} as const;
	let playerScore = playerScores[player];
	if (opponent === "A") playerScore += againstA[player];
	if (opponent === "B") playerScore += againstB[player];
	if (opponent === "C") playerScore += againstC[player];

	return playerScore;
};

const getPlayerMove = (opponent: OpponentMoves, outcome: PlayerActions): PlayerActions => {
	const winMap = {A: 'Y', B: 'Z', C: 'X'} as const;
	const drawMap = {A: 'X', B: 'Y', C: 'Z'} as const;
	const loseMap = {A: 'Z', B: 'X', C: 'Y'} as const;
	if (outcome === "X") return loseMap[opponent];
	else if (outcome === "Y") return drawMap[opponent];
	else if (outcome === "Z") return winMap[opponent];
	else throw new Error('Opponent move is invalid');
};

const part1 = (input: string) => {
	const moves = parseInput(input);
	const totalScore = moves.reduce(
		(acc, curr) => {
			return acc + getScore(curr[0] as OpponentMoves, curr[1] as PlayerActions);
		},
		0,
	);
	return totalScore;
};

const part2 = (input: string) => {
	const moves = parseInput(input);
	const totalScore = moves.reduce(
		(acc, curr) => {
			return acc +
				getScore(
					curr[0] as OpponentMoves,
					getPlayerMove(
						curr[0] as OpponentMoves,
						curr[1] as PlayerActions,
					) as PlayerActions,
				);
		},
		0,
	);
	return totalScore;
};

console.log(part1(test));
console.log(part2(test));
await Deno.writeTextFile("./output1.txt", JSON.stringify(part1(input)));
await Deno.writeTextFile("./output2.txt", JSON.stringify(part2(input)));
