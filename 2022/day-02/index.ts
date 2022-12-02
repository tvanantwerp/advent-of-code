const input = await Deno.readTextFile("./input.txt");
const test = await Deno.readTextFile("./test.txt");

const isOpponentMove = (move: string): move is OpponentMoves => {
	return move === "A" || move === "B" || move === "C";
};

const isPlayerMove = (move: string): move is PlayerMoves => {
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

type OpponentMoves = "A" | "B" | "C";
type PlayerMoves = "X" | "Y" | "Z";

const getScore = (opponent: OpponentMoves, player: PlayerMoves) => {
	const playerScores = { X: 1, Y: 2, Z: 3 } as const;
	const victoryBonus = 6;
	const drawBonus = 3;
	let playerScore = playerScores[player];
	if (opponent === "A") {
		if (player === "Y") playerScore += victoryBonus;
		if (player === "X") playerScore += drawBonus;
	}
	if (opponent === "B") {
		if (player === "Z") playerScore += victoryBonus;
		if (player === "Y") playerScore += drawBonus;
	}
	if (opponent === "C") {
		if (player === "X") playerScore += victoryBonus;
		if (player === "Z") playerScore += drawBonus;
	}

	return playerScore;
};

const getPlayerMove = (opponent: OpponentMoves, outcome: PlayerMoves) => {
	if (outcome === "X") {
		if (opponent === "A") return "Z";
		if (opponent === "B") return "X";
		if (opponent === "C") return "Y";
	}
	if (outcome === "Y") {
		if (opponent === "A") return "X";
		if (opponent === "B") return "Y";
		if (opponent === "C") return "Z";
	}
	if (outcome === "Z") {
		if (opponent === "A") return "Y";
		if (opponent === "B") return "Z";
		if (opponent === "C") return "X";
	}
};

const part1 = (input: string) => {
	const moves = parseInput(input);
	const totalScore = moves.reduce(
		(acc, curr) => {
			return acc + getScore(curr[0] as OpponentMoves, curr[1] as PlayerMoves);
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
						curr[1] as PlayerMoves,
					) as PlayerMoves,
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
