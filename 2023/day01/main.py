from os import path
import argparse
from common.reader import read_input

current_dir = path.dirname(__file__)
test_path = path.join(current_dir, 'test.txt')
file_path = path.join(current_dir, 'input.txt')
puzzle_test_input = read_input(test_path)
puzzle_input = read_input(file_path)

def part_one(isTest: bool):
    inputs = puzzle_test_input if isTest else puzzle_input
    print(inputs)


def part_two(isTest: bool):
    pass

def main():
    parser = argparse.ArgumentParser(description='Example Script')
    parser.add_argument('--test', action='store_true', help='Run on test input')
    args = parser.parse_args()
    test_mode = "test" if args.test else "full"
    print(f'Running day one with {test_mode} inputs...')
    print(part_one(args.test))
    print(part_two(args.test))

if __name__ == '__main__':
    main()