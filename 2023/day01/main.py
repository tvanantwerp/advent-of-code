from os import path
import argparse
from common.reader import read_input

current_dir = path.dirname(__file__)
test1_path = path.join(current_dir, "test1.txt")
test2_path = path.join(current_dir, "test2.txt")
file_path = path.join(current_dir, "input.txt")

numbers: list[str] = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
]


def part_one(inputs: list[str]):
    values: list[int] = []
    for line in inputs:
        digits = ""
        for character in line:
            if str.isdigit(character):
                digits += character
        if len(digits) == 1:
            digits += digits
        if len(digits) > 2:
            digits = digits[:1] + digits[-1:]
        values.append(int(digits))
    return sum(values)


def part_two(inputs: list[str]):
    parsed_inputs: list[str] = []
    for line in inputs:
        start = 0
        while start < len(line):
            for number in numbers:
                if line[start:].startswith(number):
                    line = line.replace(number, str(numbers.index(number) + 1), 1)
                    start = -1
                    break
            start += 1
        parsed_inputs.append(line)

    return part_one(parsed_inputs)


def main():
    parser = argparse.ArgumentParser(description="Example Script")
    parser.add_argument("--test", action="store_true", help="Run on test input")
    args = parser.parse_args()
    test_mode = "test" if args.test else "full"
    print(f"Running day one with {test_mode} inputs...")

    if args.test:
        puzzle_test1_input = read_input(test1_path)
        puzzle_test2_input = read_input(test2_path)
        print(part_one(puzzle_test1_input))
        print(part_two(puzzle_test2_input))
    else:
        puzzle_input = read_input(file_path)
        print(part_one(puzzle_input))
        print(part_two(puzzle_input))


if __name__ == "__main__":
    main()
