import { readFileSync } from 'node:fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rawInput = readFileSync(join(__dirname, 'test.txt'), 'utf-8');
// const rawInput = readFileSync(join(__dirname, 'input.txt'), 'utf-8');
const inputLines = rawInput.split('\n');
