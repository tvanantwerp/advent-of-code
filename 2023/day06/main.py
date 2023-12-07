from os import path
import argparse
import re
from common.reader import read_input

current_dir = path.dirname(__file__)
test_path = path.join(current_dir, "test.txt")
file_path = path.join(current_dir, "input.txt")


def parse_races(inputs: list[str]):
    times = [int(time) for time in re.findall(r"\d+", inputs[0])]
    distances = [int(distance) for distance in re.findall(r"\d+", inputs[1])]
    if len(times) != len(distances):
        raise ValueError("Invalid input")
    return list(zip(times, distances))


def binary_search(time_range: tuple[int, int], target: int, time: int, increasing=True):
    low, high = time_range
    if low > high:
        return low
    mid = (low + high) // 2
    value_at_time = mid * time - mid**2
    print(low, mid, high, value_at_time, target)
    print("----")
    if value_at_time == target:
        return mid
    if value_at_time > target:
        return binary_search((low, mid - 1), target, time)
    if value_at_time < target:
        return binary_search((mid + 1, high), target, time)


def part_one(inputs: list[str]):
    races = parse_races(inputs)
    margin = 1
    for race in races:
        time, record_distance = race
        lower_bound = binary_search((0, time // 2), record_distance, time)
        upper_bound = binary_search((time // 2 + 1, time), record_distance, time, False)
        print(lower_bound, upper_bound)
        margin *= upper_bound - lower_bound + 1
    return margin


def part_two(inputs: list[str]):
    pass


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
