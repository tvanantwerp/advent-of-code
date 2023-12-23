from os import path
import argparse
from common.reader import read_input
from typing import Optional

current_dir = path.dirname(__file__)
test1_path = path.join(current_dir, "test1.txt")
test2_path = path.join(current_dir, "test2.txt")
test3_path = path.join(current_dir, "test3.txt")
test4_path = path.join(current_dir, "test4.txt")
test5_path = path.join(current_dir, "test5.txt")
file_path = path.join(current_dir, "input.txt")

directions: dict[str, tuple[tuple[int, int], tuple[int, int]]] = {
    "|": ((-1, 0), (1, 0)),  # up, down
    "-": ((0, -1), (0, 1)),  # left, right
    "L": ((-1, 0), (0, 1)),  # up, right
    "J": ((-1, 0), (0, -1)),  # up, left
    "7": ((0, -1), (1, 0)),  # left, down
    "F": ((0, 1), (1, 0)),  # right, down
}


def parse_inputs(inputs: list[str]):
    return [[*line] for line in inputs]


def get_neighbor(cell: tuple[int, int], direction: tuple[int, int]):
    return (cell[0] + direction[0], cell[1] + direction[1])


def is_valid_cell(grid: list[list[str]], cell: tuple[int, int]):
    return 0 <= cell[0] < len(grid) and 0 <= cell[1] < len(grid[0])


def find_start(grid: list[list[str]]):
    # Find the starting point
    start: tuple[int, int] = (-1, -1)
    for y, row in enumerate(grid):
        for x, cell in enumerate(row):
            if cell == "S":
                start = (y, x)
                break
        if start != (-1, -1):
            break
    return start


def build_loop(grid: list[list[str]]):
    start = find_start(grid)

    queue = [start]
    visited: set[tuple[int, int]] = set()
    while queue:
        y, x = queue.pop(0)
        visited.add((y, x))
        if grid[y][x] == "S":
            start_directions: list[tuple[int, int]] = [(-1, 0), (1, 0), (0, -1), (0, 1)]
            actual_directions: list[tuple[int, int]] = []
            for direction in start_directions:
                neighbor_pipe_coords: tuple[int, int] = get_neighbor((y, x), direction)
                if is_valid_cell(grid, neighbor_pipe_coords):
                    neighbor_pipe_type = grid[neighbor_pipe_coords[0]][
                        neighbor_pipe_coords[1]
                    ]
                    if neighbor_pipe_type in directions:
                        valid_steps = directions[neighbor_pipe_type]
                        connects_to_start = False
                        for steps in valid_steps:
                            neighbor = get_neighbor(neighbor_pipe_coords, steps)
                            if neighbor == (y, x):
                                connects_to_start = True
                                break
                        if connects_to_start:
                            queue.append(neighbor_pipe_coords)
                            actual_directions.append(direction)
            if (-1, 0) in actual_directions and (1, 0) in actual_directions:
                grid[y][x] = "|"
            elif (0, -1) in actual_directions and (0, 1) in actual_directions:
                grid[y][x] = "-"
            elif (-1, 0) in actual_directions and (0, 1) in actual_directions:
                grid[y][x] = "L"
            elif (-1, 0) in actual_directions and (0, -1) in actual_directions:
                grid[y][x] = "J"
            elif (0, -1) in actual_directions and (1, 0) in actual_directions:
                grid[y][x] = "7"
            elif (0, 1) in actual_directions and (1, 0) in actual_directions:
                grid[y][x] = "F"
        else:
            pipe_type = grid[y][x]
            if pipe_type in directions:
                valid_directions = directions[pipe_type]
                neighbor_pipes: list[tuple[int, int]] = []
                for direction in valid_directions:
                    new_neighbor = get_neighbor((y, x), direction)
                    if is_valid_cell(grid, new_neighbor):
                        neighbor_pipes.append(new_neighbor)
                for pipe in neighbor_pipes:
                    if pipe not in visited:
                        queue.append(pipe)

    return visited


def part_one(inputs: list[str]):
    grid = parse_inputs(inputs)
    loop = build_loop(grid)
    return len(loop) // 2


def part_two(inputs: list[str]):
    grid = parse_inputs(inputs)
    loop = build_loop(grid)
    yMax = len(grid)
    xMax = len(grid[0])
    inside: set[tuple[int, int]] = set()
    for y in range(0, yMax):
        completed_edges = 0
        last_bend: Optional[str] = None
        for x in range(0, xMax):
            if (y, x) in loop and grid[y][x] == "|":
                completed_edges += 1
            if (y, x) in loop and grid[y][x] in ["L", "F"]:
                last_bend = grid[y][x]
            if (y, x) in loop and grid[y][x] in ["7", "J"]:
                if last_bend == "L" and grid[y][x] == "7":
                    completed_edges += 1
                elif last_bend == "F" and grid[y][x] == "J":
                    completed_edges += 1
                last_bend = None
            if (y, x) not in loop and completed_edges % 2 == 1:
                inside.add((y, x))
    return len(inside)


def main():
    parser = argparse.ArgumentParser(description="Example Script")
    parser.add_argument("--test", action="store_true", help="Run on test input")
    args = parser.parse_args()
    test_mode = "test" if args.test else "full"
    print(f"Running day twn with {test_mode} inputs...")

    if args.test:
        puzzle_test1_input = read_input(test1_path)
        puzzle_test2_input = read_input(test2_path)
        puzzle_test3_input = read_input(test3_path)
        puzzle_test4_input = read_input(test4_path)
        puzzle_test5_input = read_input(test5_path)
        print(part_one(puzzle_test1_input))
        print(part_one(puzzle_test2_input))
        print(part_two(puzzle_test3_input))
        print(part_two(puzzle_test4_input))
        print(part_two(puzzle_test5_input))
    else:
        puzzle_input = read_input(file_path)
        print(part_one(puzzle_input))
        print(part_two(puzzle_input))


if __name__ == "__main__":
    main()
