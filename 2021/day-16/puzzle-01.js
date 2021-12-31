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

	const input = hexToBinary(data);

	console.log(input);
});

function hexToBinary(hex) {
	return hex
		.split('')
		.map(hexDigit => hexMap[hexDigit])
		.join('');
}
