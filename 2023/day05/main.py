from os import path
import argparse
import re
from common.reader import read_input
import sys

current_dir = path.dirname(__file__)
test_path = path.join(current_dir, "test.txt")
file_path = path.join(current_dir, "input.txt")


def get_mappings(inputs: list[str]):
    seed_line = inputs[0]
    seeds: list[int] = [int(x) for x in re.findall(r"\d+", seed_line)]
    mappings: list[list[tuple[int, int, int]]] = []
    current_mapping: list[tuple[int, int, int]] = []
    for i in range(2, len(inputs)):
        line = inputs[i]
        if line == "":
            mappings.append(current_mapping)
            current_mapping = []
            continue
        mapping_values = re.findall(r"\d+", line)
        if len(mapping_values) == 0:
            continue
        values = [int(x) for x in mapping_values]
        if len(values) != 3:
            raise ValueError("Invalid mapping")
        current_mapping.append((values[0], values[1], values[2]))
    if len(current_mapping):
        mappings.append(current_mapping)
    for mapping in mappings:
        mapping.sort()
    return seeds, mappings


def get_seed_location(seed: int, mappings: list[list[tuple[int, int, int]]]):
    for section in mappings:
        for mapping in section:
            if mapping[1] + mapping[2] - 1 >= seed >= mapping[1]:
                seed = mapping[0] + seed - mapping[1]
                break
    return seed


def get_closest_location(seeds: list[int], mappings: list[list[tuple[int, int, int]]]):
    closest_location = sys.maxsize
    for seed in seeds:
        current_value = get_seed_location(seed, mappings)
        if current_value < closest_location:
            closest_location = current_value
    return closest_location


def part_one(inputs: list[str]):
    seeds, mappings = get_mappings(inputs)
    closest_location = get_closest_location(seeds, mappings)
    return closest_location


def part_two(inputs: list[str]):
    seeds, mappings = get_mappings(inputs)
    seed_pairs = []
    for i in range(0, len(seeds), 2):
        seed_pairs.append((seeds[i], seeds[i + 1]))
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
