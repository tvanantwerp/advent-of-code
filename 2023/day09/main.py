from os import path
import argparse
import re
from common.reader import read_input

current_dir = path.dirname(__file__)
test_path = path.join(current_dir, "test.txt")
file_path = path.join(current_dir, "input.txt")


def parse_inputs(inputs: list[str]):
    parsed_inputs = []
    for line in inputs:
        parsed_inputs.append([int(x) for x in line.split(" ")])
    return parsed_inputs


def recursive_result(readings: list[int], forward=True) -> int:
    if all(n == 0 for n in readings):
        return 0

    differences = [b - a for a, b in zip(readings, readings[1:])]

    return (
        recursive_result(differences) + readings[-1]
        if forward
        else readings[0] - recursive_result(differences, False)
    )


def part_one(inputs: list[str]):
    parsed_inputs = parse_inputs(inputs)
    return sum(recursive_result(x) for x in parsed_inputs)


def part_two(inputs: list[str]):
    parsed_inputs = parse_inputs(inputs)
    return sum(recursive_result(x, False) for x in parsed_inputs)


def main():
    parser = argparse.ArgumentParser(description="Example Script")
    parser.add_argument("--test", action="store_true", help="Run on test input")
    args = parser.parse_args()
    test_mode = "test" if args.test else "full"
    print(f"Running day nine with {test_mode} inputs...")

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
