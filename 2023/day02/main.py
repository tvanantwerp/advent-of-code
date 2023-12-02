from os import path
import argparse
import re
from common.reader import read_input

current_dir = path.dirname(__file__)
test_path = path.join(current_dir, "test.txt")
file_path = path.join(current_dir, "input.txt")

color_mapping = {"red": 0, "green": 1, "blue": 2}


def parse_games(inputs: list[str]) -> list[list[int]]:
    games: list[list[int]] = []
    for game in inputs:
        game_number, game_counts = game.split(": ")
        game_number_match = re.match(r"\d+", game_number)
        if game_number_match is not None:
            game_number = game_number_match.group(0)
        game_counts_values = game_counts.split("; ")
        max_color_counts = [0, 0, 0]
        for values in game_counts_values:
            counts = values.split(", ")
            for count in counts:
                digit, color = count.split(" ")
                if int(digit) > max_color_counts[color_mapping[color]]:
                    max_color_counts[color_mapping[color]] = int(digit)
        games.append(max_color_counts)
    return games


def part_one(inputs: list[str]):
    games = parse_games(inputs)

    possible_games = []
    for game_number, game_max_counts in enumerate(games, start=1):
        if (
            game_max_counts[0] <= 12
            and game_max_counts[1] <= 13
            and game_max_counts[2] <= 14
        ):
            possible_games.append(game_number)

    return sum(possible_games)


def part_two(inputs: list[str]):
    games = parse_games(inputs)

    game_powers = []
    for game in games:
        game_powers.append(game[0] * game[1] * game[2])

    return sum(game_powers)


def main():
    parser = argparse.ArgumentParser(description="Example Script")
    parser.add_argument("--test", action="store_true", help="Run on test input")
    args = parser.parse_args()
    test_mode = "test" if args.test else "full"
    print(f"Running day two with {test_mode} inputs...")

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
