from os import path
import argparse
import re
from common.reader import read_input

current_dir = path.dirname(__file__)
test_path = path.join(current_dir, "test.txt")
file_path = path.join(current_dir, "input.txt")


def get_mappings(inputs: list[str]):
    seed_line = inputs.pop(0)
    seeds: list[int] = [int(x) for x in re.findall(r"\d+", seed_line)]
    inputs.pop(0)
    mappings: list[list[list[int]]] = []
    current_mapping: list[list[int]] = []
    for line in inputs:
        if line == "":
            mappings.append(current_mapping)
            current_mapping = []
            continue
        mapping_values = re.findall(r"\d+", line)
        if len(mapping_values) == 0:
            continue
        current_mapping.append([int(x) for x in mapping_values])
    if len(current_mapping):
        mappings.append(current_mapping)
    return seeds, mappings


def part_one(inputs: list[str]):
    seeds, mappings = get_mappings(inputs)
    print(seeds, mappings)


def part_two(inputs: list[str]):
    pass


def main():
    parser = argparse.ArgumentParser(description="Example Script")
    parser.add_argument("--test", action="store_true", help="Run on test input")
    args = parser.parse_args()
    test_mode = "test" if args.test else "full"
    print(f"Running day five with {test_mode} inputs...")

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
