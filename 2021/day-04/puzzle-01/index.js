const input = require('../input');

const { draws, boards } = input;
let lastDraw;
const boardsToEvaluate = [];
let bingoBoard = null;
for (let d = 0; d < draws.length; d++) {
	for (let i = 0; i < boards.length; i++) {
		const board = boards[i].flat();
		if (board.includes(draws[d]) && !boardsToEvaluate.includes(i)) {
			boardsToEvaluate.push(i);
		}
		lastDraw = d;
	}
	if (d >= 4) {
		for (let b = 0; b < boardsToEvaluate.length; b++) {
			const isBingo = checkForBingo(
				boards[boardsToEvaluate[b]],
				draws.slice(0, d + 1),
			);
			if (isBingo) {
				bingoBoard = boardsToEvaluate[b];
				break;
			}
		}
	}
	if (bingoBoard) break;
}

if (bingoBoard) {
	let values = boards[bingoBoard].flat();
	const drawsUsed = draws.slice(0, lastDraw + 1);
	values = values.filter(v => !drawsUsed.includes(v));

	const sum = values.reduce((prev, curr) => prev + curr, 0);
	console.log(sum * draws[lastDraw]);
}

function checkForBingo(board, draws) {
	const downwardBingo = checkDownwardDiagonal(board, draws);
	const upwardBingo = checkUpwardDiagonal(board, draws);
	if (downwardBingo || upwardBingo) {
		return true;
	}
	for (let i = 0; i < 5; i++) {
		const rowBingo = checkRow(board[i], draws);
		const columnBingo = checkColumn(board, i, draws);
		if (rowBingo || columnBingo) return true;
	}
	return false;
}

function checkRow(row, draws) {
	return checkByFive(row, draws);
}

function checkColumn(board, i, draws) {
	const column = board.map(row => row[i]);
	return checkByFive(column, draws);
}

function checkDownwardDiagonal(board, draws) {
	const values = [
		board[0][0],
		board[1][1],
		board[2][2],
		board[3][3],
		board[4][4],
	];
	return checkByFive(values, draws);
}

function checkUpwardDiagonal(board, draws) {
	const values = [
		board[4][4],
		board[3][3],
		board[2][2],
		board[1][1],
		board[0][0],
	];
	return checkByFive(values, draws);
}

function checkByFive(values, draws) {
	let count = 0;
	values.forEach(cell => {
		if (draws.includes(cell)) {
			count += 1;
		}
	});
	return count === 5 ? true : false;
}
