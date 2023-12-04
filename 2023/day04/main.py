from os import path
import argparse
import re
from common.reader import read_input

current_dir = path.dirname(__file__)
test_path = path.join(current_dir, "test.txt")
file_path = path.join(current_dir, "input.txt")


def parse_card(card: str) -> tuple[int, list[int], list[int]]:
    card_number_and_winners, card_numbers_unsplit = card.split(" | ")
    card_number_raw, card_winners_unsplit = card_number_and_winners.split(": ")
    card_number = ""
    find_card_number = re.search(r"\d+", card_number_raw)
    if find_card_number is not None:
        card_number = find_card_number.group(0)
    card_winners = re.findall(r"\d+", card_winners_unsplit)
    card_numbers = re.findall(r"\d+", card_numbers_unsplit)
    return (
        int(card_number),
        [int(x) for x in card_winners],
        [int(x) for x in card_numbers],
    )


def count_matches(card: tuple[int, list[int], list[int]]) -> int:
    matches = 0
    for card_number in card[2]:
        if card_number in card[1]:
            matches += 1
    return matches


def part_one(inputs: list[str]):
    cards = [parse_card(card) for card in inputs]
    total_points = 0
    for card in cards:
        matches = count_matches(card)
        points = int(2 ** (matches - 1))
        total_points += points
    return total_points


def part_two(inputs: list[str]):
    cards = [parse_card(card) for card in inputs]
    match_counts = [0] * len(cards)
    card_counts = [1] * len(cards)
    for card in cards:
        matches = count_matches(card)
        match_counts[card[0] - 1] = matches
    for index, match in enumerate(match_counts):
        if match == 0:
            continue

        current_card_count = card_counts[index]

        for i in range(index + 1, index + match + 1):
            card_counts[i] += current_card_count
    return sum(card_counts)


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
