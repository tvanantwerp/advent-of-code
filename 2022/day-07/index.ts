const __dirname = new URL('.', import.meta.url).pathname;
const test = await Deno.readTextFile(`${__dirname}test.txt`);
const input = await Deno.readTextFile(`${__dirname}input.txt`);

function parseInput(input: string) {
	return input.trim().split('\n');
}

function cd(path: string, newPath: string): string {
	if (newPath.match(/^\//)) return newPath;
	return newPath === '..'
		? path.split('/').slice(0, -1).join('/')
		: `${path === '/' ? '' : path}/${newPath}`;
}

function listOfFilesAndSizes(terminal: string[]) {
	let fileSystem: Record<string, number> = {};
	let pwd = '';
	const cliPattern = /^\$ cd (.*)|^(\d+) (.*)/;
	for (const line of terminal) {
		const info = line.match(cliPattern);
		if (info) {
			if (info[1]) pwd = cd(pwd, info[1]);
			if (info[2] && info[3]) {
				const dirs = pwd.split('/');
				for (let i = 0; i < dirs.length; i++) {
					const path = dirs.slice(0, i + 1).join('/');
					fileSystem[path]
						? fileSystem[path] += +info[2]
						: fileSystem[path] = +info[2];
				}
			}
		}
	}
	return fileSystem;
}

function directorySizes(files: Record<string, number>): number[] {
	return Object.values(files);
}

const part1 = (input: string) => {
	const terminal = parseInput(input);
	const files = directorySizes(listOfFilesAndSizes(terminal));
	const sum = files.reduce(
		(acc, curr) => curr <= 100000 ? acc + curr : acc,
		0,
	);

	return sum;
};

const part2 = (input: string) => {
	const terminal = parseInput(input);
	const dirs = listOfFilesAndSizes(terminal);
	delete dirs['/']; // We can't delete the root!
	const files = directorySizes(dirs);

	const totalSize = 70000000;
	const targetFreeSpace = 30000000;
	const spaceUsed = dirs['']; // sum of all file/directory sizes
	const minSizeToDelete = spaceUsed - (totalSize - targetFreeSpace);

	const sizes = files.sort((a, b) => a - b);
	for (let i = 0; i < sizes.length; i++) {
		if (sizes[i] >= minSizeToDelete) return sizes[i];
	}
};

const test1 = part1(test);
console.assert(95437 === test1, {
	expected: 95437,
	received: test1,
});
const test2 = part2(test);
console.assert(24933642 === test2, {
	expected: 24933642,
	received: test2,
});

console.log(`Part 1 answer: ${part1(input)}`);
console.log(`Part 2 answer: ${part2(input)}`);
