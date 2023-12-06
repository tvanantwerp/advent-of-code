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


def get_overlapping_mapped_range(
    ranges: list[tuple[int, int]], mapping: tuple[int, int, int]
):
    covered = []
    not_covered = []
    for seed_range in ranges:
        seed_min = seed_range[0]
        seed_max = seed_range[0] + seed_range[1] - 1
        mapping_min = mapping[1]
        mapping_max = mapping[1] + mapping[2] - 1
        if seed_min >= mapping_min and seed_max <= mapping_max:
            covered.append((mapping[0] + (seed_min - mapping_min), seed_range[1]))
        if seed_max < mapping_min or seed_min > mapping_max:
            not_covered.append(seed_range)
        elif seed_min < mapping_min and seed_max > mapping_max:
            covered.append((mapping[0] + (seed_min - mapping_min), mapping[2]))
            not_covered.append((seed_min, mapping_min - seed_min))
            not_covered.append((mapping_max + 1, seed_max - mapping_max))
        elif seed_min < mapping_min and seed_max <= mapping_max:
            covered.append((mapping[0], seed_max - mapping_min + 1))
            not_covered.append((seed_min, mapping_min - seed_min))
        elif seed_min >= mapping_min and seed_max > mapping_max:
            covered.append(
                (mapping[0] + (seed_min - mapping_min), mapping_max - seed_min)
            )
            not_covered.append((mapping_max + 1, seed_max - mapping_max))

    return [covered, not_covered]


def get_closest_from_ranges(
    seed_pairs: list[tuple[int, int]], mappings: list[list[tuple[int, int, int]]]
) -> int:
    final_ranges_set = set()
    for pair in seed_pairs:
        check_pairs = {pair}
        for section in mappings:
            not_covered = check_pairs
            new_covered = set()
            for mapping in section:
                if len(not_covered) == 0:
                    break
                # print(f"Checking {not_covered} against {mapping}")
                c, n = get_overlapping_mapped_range(list(not_covered), mapping)
                # print(f"Covered: {c}")
                # print(f"Not Covered: {n}")
                new_covered.update(c)
                not_covered = set(n)
            check_pairs = new_covered
            check_pairs.update(not_covered)
            # print(f"Next loop: {check_pairs}")
            # print("-----")
        final_ranges_set.update(check_pairs)
    final_ranges = list(final_ranges_set)
    final_ranges.sort()
    # print(final_ranges)
    return final_ranges[0][0]


def part_one(inputs: list[str]):
    seeds, mappings = get_mappings(inputs)
    closest_location = get_closest_location(seeds, mappings)
    return closest_location


def part_two(inputs: list[str]):
    seeds, mappings = get_mappings(inputs)
    seed_pairs = []
    for i in range(0, len(seeds), 2):
        seed_pairs.append((seeds[i], seeds[i + 1]))
    closest_location = get_closest_from_ranges(seed_pairs, mappings)
    return closest_location


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
