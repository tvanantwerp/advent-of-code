const fs = require('fs');
const path = require('path');

const hexMap = {
	'0': '0000',
	'1': '0001',
	'2': '0010',
	'3': '0011',
	'4': '0100',
	'5': '0101',
	'6': '0110',
	'7': '0111',
	'8': '1000',
	'9': '1001',
	A: '1010',
	B: '1011',
	C: '1100',
	D: '1101',
	E: '1110',
	F: '1111',
} as const;

type HexDigit = keyof typeof hexMap;

const input: string = fs.readFileSync(
	path.join(__dirname, './testInput1.txt'),
	{
		encoding: 'utf8',
	},
);

function hexToBinary(hex: string) {
	return hex
		.split('')
		.map(hexDigit => hexMap[hexDigit as HexDigit])
		.join('');
}

// Test the hexToBinary function
console.assert(hexToBinary('D2FE28') === '110100101111111000101000');
console.assert(
	hexToBinary('38006F45291200') ===
		'00111000000000000110111101000101001010010001001000000000',
);
console.assert(
	hexToBinary('EE00D40C823060') ===
		'11101110000000001101010000001100100000100011000001100000',
);

function binaryToDecimal(binary: string) {
	return parseInt(binary, 2);
}

function decode(input: string): number {
	return 0;
}

console.assert(decode('8A004A801A8002F478') === 16);
console.assert(decode('620080001611562C8802118E34') === 12);
console.assert(decode('C0015000016115A2E0802F182340') === 23);
console.assert(decode('A0016C880162017C3686B18A3D4780') === 31);
