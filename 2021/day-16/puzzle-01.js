const fs = require('fs');
const path = require('path');

const hexMap = {
	0: '0000',
	1: '0001',
	2: '0010',
	3: '0011',
	4: '0100',
	5: '0101',
	6: '0110',
	7: '0111',
	8: '1000',
	9: '1001',
	A: '1010',
	B: '1011',
	C: '1100',
	D: '1101',
	E: '1110',
	F: '1111',
};

fs.readFile(path.join(__dirname, './testInput1.txt'), 'utf8', (err, data) => {
	if (err) {
		console.error(err);
		return;
	}

	const input = hexToBinary('D2FE28');
	// const input = hexToBinary(data);

	console.log(parsePacket(input));
});

function hexToBinary(hex) {
	return hex
		.split('')
		.map(hexDigit => hexMap[hexDigit])
		.join('');
}

function binaryToDecimal(binary) {
	const binaryArray = binary.split('').reverse();
	return binaryArray.reduce((prev, curr, i) => {
		return prev + curr * 2 ** i;
	}, 0);
}

function parsePacket(binary) {
	const version = binaryToDecimal(binary.slice(0, 3));
	const type = binaryToDecimal(binary.slice(3, 6));
	if (type === 4) {
		// return parseNumberPacket(binary.slice(6));
		return version;
	} else {
		const lengthId = binary.slice(6, 7);
		if (lengthId === '0') {
			const packetLength = binaryToDecimal(binary.slice(7, 22));
		} else {
			const packetCount = binaryToDecimal(binary.slice(7, 18));
		}
	}
}

function parseNumberPacket(binary) {
	const binaryArray = binary.split('');
	console.log(binary);
	let lastSequence = false;
	let binaryNumber = '';
	do {
		const sequence = binaryArray.splice(0, 5);
		const sequenceType = sequence.splice(0, 1);
		if (sequenceType[0] === '0') lastSequence = true;
		binaryNumber += sequence.join('');
	} while (!lastSequence);
	return binaryToDecimal(binaryNumber);
}
