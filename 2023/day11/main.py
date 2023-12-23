from os import path
import argparse
from common.reader import read_input

current_dir = path.dirname(__file__)
test_path = path.join(current_dir, "test.txt")
file_path = path.join(current_dir, "input.txt")


def parse_inputs(inputs: list[str]) -> list[list[str]]:
    return [[*line] for line in inputs]


def grid_to_string(grid: list[list[str]]) -> str:
    """
    This is to debug drawing the grids correctly.
    """
    output = ""
    for row in grid:
        output += "".join(row) + "\n"
    return output


def empty_cols_and_rows(grid: list[list[str]]) -> tuple[list[bool], list[bool]]:
    cols = [True] * len(grid[0])
    rows = [True] * len(grid)

    for row_index, row in enumerate(grid):
        is_row_empty = True
        for col_index, col in enumerate(row):
            if col == "#":
                cols[col_index] = False
                is_row_empty = False
        rows[row_index] = is_row_empty

    return (cols, rows)


def get_galaxy_coordinates(grid: list[list[str]]) -> list[tuple[int, int]]:
    galaxies: list[tuple[int, int]] = []
    for y, row in enumerate(grid):
        for x, col in enumerate(row):
            if col == "#":
                galaxies.append((y, x))
    return galaxies


def calculate_distances(inputs: list[str], distance_multiplier: int):
    original_grid = parse_inputs(inputs)
    cols, rows = empty_cols_and_rows(original_grid)
    galaxies = get_galaxy_coordinates(original_grid)
    sum_of_distances = 0
    for g1, galaxy1 in enumerate(galaxies):
        for g2 in range(g1 + 1, len(galaxies)):
            galaxy2 = galaxies[g2]
            c_start = min(galaxy1[1], galaxy2[1])
            c_end = max(galaxy1[1], galaxy2[1])
            r_start = min(galaxy1[0], galaxy2[0])
            r_end = max(galaxy1[0], galaxy2[0])
            empty_cols = cols[c_start:c_end].count(True)
            empty_rows = rows[r_start:r_end].count(True)
            distance = (
                abs(galaxy1[0] - galaxy2[0])
                + abs(galaxy1[1] - galaxy2[1])
                + empty_cols * (distance_multiplier - 1)
                + empty_rows * (distance_multiplier - 1)
            )
            sum_of_distances += distance
    return sum_of_distances


def part_one(inputs: list[str]):
    return calculate_distances(inputs, 2)


def part_two(inputs: list[str]):
    return calculate_distances(inputs, 1000000)


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
