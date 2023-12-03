from os import path
import argparse
import re
from typing import TypedDict
from common.reader import read_input

current_dir = path.dirname(__file__)
test_path = path.join(current_dir, "test.txt")
file_path = path.join(current_dir, "input.txt")


class PartNumber(TypedDict):
    number: int
    y: int
    x1: int
    x2: int


class Gear(TypedDict):
    x: int
    y: int


def get_numbers(inputs: list[str]) -> list[PartNumber]:
    numbers: list[PartNumber] = []
    for y, row in enumerate(inputs):
        for match in re.finditer(r"\d+", row):
            numbers.append(
                {
                    "number": int(match.group(0)),
                    "y": y,
                    "x1": match.start(),
                    "x2": match.end() - 1,
                }
            )
    return numbers


def get_gears(inputs: list[str]) -> list[Gear]:
    gears: list[Gear] = []
    for y, row in enumerate(inputs):
        for match in re.finditer(r"\*", row):
            gears.append(
                {
                    "y": y,
                    "x": match.start(),
                }
            )
    return gears


def part_one(inputs: list[str]):
    part_number_sum = 0
    symbol_pattern = re.compile(r"[^\d\.]")
    numbers = get_numbers(inputs)
    for number in numbers:
        row_above = inputs[max(number["y"] - 1, 0)][
            max(number["x1"] - 1, 0) : min(number["x2"] + 1, len(inputs[0]) - 1)
        ]
        this_row = inputs[number["y"]][
            max(number["x1"] - 1, 0) : min(number["x2"] + 1, len(inputs[0]) - 1)
        ]
        row_below = inputs[min(number["y"] + 1, len(inputs) - 1)][
            max(number["x1"] - 1, 0) : min(number["x2"] + 1, len(inputs[0]) - 1)
        ]

        if (
            symbol_pattern.search(row_above)
            or symbol_pattern.search(this_row)
            or symbol_pattern.search(row_below)
        ):
            part_number_sum += number["number"]

    return part_number_sum


def part_two(inputs: list[str]):
    gear_ratio_sum = 0
    numbers = get_numbers(inputs)
    gears = get_gears(inputs)
    for gear in gears:
        neighboring_numbers: list[PartNumber] = []
        for number in numbers:
            within_y_radius = number["y"] >= max(gear["y"] - 1, 0) and number[
                "y"
            ] <= min(gear["y"] + 1, len(inputs) - 1)
            within_x_radius = number["x2"] >= max(gear["x"] - 1, 0) and number[
                "x1"
            ] <= min(gear["x"] + 1, len(inputs[0]) - 1)
            if within_y_radius and within_x_radius:
                neighboring_numbers.append(number)
        if len(neighboring_numbers) == 2:
            gear_ratio_sum += (
                neighboring_numbers[0]["number"] * neighboring_numbers[1]["number"]
            )

    return gear_ratio_sum


def main():
    parser = argparse.ArgumentParser(description="Example Script")
    parser.add_argument("--test", action="store_true", help="Run on test input")
    args = parser.parse_args()
    test_mode = "test" if args.test else "full"
    print(f"Running day three with {test_mode} inputs...")

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
