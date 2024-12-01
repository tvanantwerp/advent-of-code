// @ts-check

import eslint from '@eslint/js';
import eslintPrettierPlugin from 'eslint-plugin-prettier';
import tseslint from 'typescript-eslint';

export default [
	eslint.configs.recommended,
	eslintPrettierPlugin,
	...tseslint.configs.strict,
];
