from os import path
import argparse
from common.reader import read_input

current_dir = path.dirname(__file__)
test_path = path.join(current_dir, "test.txt")
file_path = path.join(current_dir, "input.txt")


def parse_inputs(inputs: list[str]) -> list[list[str]]:
    return [[*line] for line in inputs]


def grid_to_string(grid: list[list[str]]) -> str:
    output = ""
    for row in grid:
        output += "".join(row) + "\n"
    return output


def expand_universe(grid: list[list[str]]) -> list[list[str]]:
    cols = [True] * len(grid[0])
    rows: list[int] = []

    for row_index, row in enumerate(grid):
        is_empty = True
        for col_index, col in enumerate(row):
            if col == "#":
                cols[col_index] = False
                is_empty = False
        if is_empty:
            rows.append(row_index)

    for index, row_pos in enumerate(rows):
        grid.insert(row_pos + index, ["."] * len(grid[0]))

    cols_added = 0
    for index, col_pos in enumerate(cols):
        for row in grid:
            if col_pos:
                row.insert(index + cols_added, ".")
                cols_added += 1

    return grid


def part_one(inputs: list[str]):
    original_grid = parse_inputs(inputs)
    expanded_universe = expand_universe(original_grid)
    pass


def part_two(inputs: list[str]):
    pass


def main():
    parser = argparse.ArgumentParser(description="Example Script")
    parser.add_argument("--test", action="store_true", help="Run on test input")
    args = parser.parse_args()
    test_mode = "test" if args.test else "full"
    print(f"Running day eleven with {test_mode} inputs...")

    if args.test:
        puzzle_test_input = read_input(test_path)
        print(part_one(puzzle_test_input))
        print(part_two(puzzle_test_input))
    else:
        puzzle_input = read_input(file_path)
        print(part_one(puzzle_input))
        print(part_two(puzzle_input))


if __name__ == "__main__":
    main()
