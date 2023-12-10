from os import path
import argparse
from common.reader import read_input

current_dir = path.dirname(__file__)
test1_path = path.join(current_dir, "test1.txt")
test2_path = path.join(current_dir, "test2.txt")
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


def build_loop(grid: list[list[str]]):
    # Find the starting point
    start: tuple[int, int] = (-1, -1)
    for y, row in enumerate(grid):
        for x, cell in enumerate(row):
            if cell == "S":
                start = (y, x)
                break
        if start != (-1, -1):
            break

    queue = [start]
    visited = set()
    while queue:
        y, x = queue.pop(0)
        visited.add((y, x))
        if grid[y][x] == "S":
            start_directions: list[tuple[int, int]] = [(-1, 0), (1, 0), (0, -1), (0, 1)]
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

    return len(visited) // 2


def part_one(inputs: list[str]):
    parsed_inputs = parse_inputs(inputs)
    return build_loop(parsed_inputs)


def part_two(inputs: list[str]):
    pass


def main():
    parser = argparse.ArgumentParser(description="Example Script")
    parser.add_argument("--test", action="store_true", help="Run on test input")
    args = parser.parse_args()
    test_mode = "test" if args.test else "full"
    print(f"Running day twn with {test_mode} inputs...")

    if args.test:
        puzzle_test1_input = read_input(test1_path)
        puzzle_test2_input = read_input(test2_path)
        print(part_one(puzzle_test1_input))
        print(part_one(puzzle_test2_input))
    else:
        puzzle_input = read_input(file_path)
        print(part_one(puzzle_input))
        print(part_two(puzzle_input))


if __name__ == "__main__":
    main()
