const input = require('../input');

const { draw, boards } = input;
let lastDraw;
const boardsToEvaluate = [];
let bingoBoard = null;

for (let d = 0; d < draw.length; d++) {
	for (let i = 0; i < boards.length; i++) {
		const board = boards[i].flat();
		if (board.includes(draw[d]) && !boardsToEvaluate.includes(i)) {
			boardsToEvaluate.push(i);
		}
		lastDraw = draw[d];
	}
	if (d >= 5) {
		for (let b = 0; b < boardsToEvaluate.length; b++) {
			const isBingo = checkForBingo(
				boards[boardsToEvaluate[b]],
				d === 0 ? draw[0] : draw.slice(0, d + 1),
			);
			if (isBingo) {
				bingoBoard = b;
				break;
			}
		}
	}
	if (bingoBoard) break;
}
console.log(lastDraw, bingoBoard);

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
