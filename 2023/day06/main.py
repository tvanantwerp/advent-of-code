from os import path
import argparse
import re
from common.reader import read_input
from math import sqrt, ceil, floor

current_dir = path.dirname(__file__)
test_path = path.join(current_dir, "test.txt")
file_path = path.join(current_dir, "input.txt")


def parse_races(inputs: list[str]):
    times = [int(time) for time in re.findall(r"\d+", inputs[0])]
    distances = [int(distance) for distance in re.findall(r"\d+", inputs[1])]
    if len(times) != len(distances):
        raise ValueError("Invalid input")
    return list(zip(times, distances))


def quadratic_formula(time: int, distance: int):
    a = -1
    b = time
    c = -1 * distance
    discriminant = sqrt(b**2 - 4 * a * c)
    left_answer = floor((-b + discriminant) / (2 * a)) + 1
    right_answer = ceil((-b - discriminant) / (2 * a)) - 1
    return left_answer, right_answer


def part_one(inputs: list[str]):
    races = parse_races(inputs)
    margin = 1
    for race in races:
        l, r = quadratic_formula(race[0], race[1])
        margin *= r - l + 1
    return margin


def part_two(inputs: list[str]):
    races = parse_races(inputs)
    time_string = ""
    distance_string = ""
    for race in races:
        t, d = race
        time_string += f"{t}"
        distance_string += f"{d}"
    time = int(time_string)
    distance = int(distance_string)
    l, r = quadratic_formula(time, distance)
    return r - l + 1


def main():
    parser = argparse.ArgumentParser(description="Example Script")
    parser.add_argument("--test", action="store_true", help="Run on test input")
    args = parser.parse_args()
    test_mode = "test" if args.test else "full"
    print(f"Running day six with {test_mode} inputs...")

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
