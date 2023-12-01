from os import path
from common.reader import read_input

current_dir = path.dirname(__file__)
file_path = path.join(current_dir, 'input.txt')
puzzle_input = read_input(file_path)

def part_one():
    pass

def part_two():
    pass

if __name__ == '__main__':
    print(part_one())
    print(part_two())