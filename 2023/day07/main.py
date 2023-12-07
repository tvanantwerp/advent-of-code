from os import path
import argparse
import re
from functools import cmp_to_key
from common.reader import read_input

current_dir = path.dirname(__file__)
test_path = path.join(current_dir, "test.txt")
file_path = path.join(current_dir, "input.txt")


def parse_hands(inputs: list[str]):
    return [(hand.split(" ")[0], int(hand.split(" ")[1])) for hand in inputs]


ranks = {
    "high_card": 0,
    "one_pair": 1,
    "two_pair": 2,
    "three_of_a_kind": 3,
    "full_house": 4,
    "four_of_a_kind": 5,
    "five_of_a_kind": 6,
}

card_values = {
    "A": 14,
    "K": 13,
    "Q": 12,
    "J": 11,
    "T": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2,
}


def rank_hand(hand: str):
    cards = [*hand]
    card_set = set(cards)
    if len(card_set) == 5:
        return ranks["high_card"]
    if len(card_set) == 4:
        return ranks["one_pair"]
    if len(card_set) == 3:
        for card in card_set:
            count_of_card = cards.count(card)
            if count_of_card == 3:
                return ranks["three_of_a_kind"]
        return ranks["two_pair"]
    if len(card_set) == 2:
        for card in card_set:
            count_of_card = cards.count(card)
            if count_of_card in (4, 1):
                return ranks["four_of_a_kind"]
        return ranks["full_house"]
    if len(card_set) == 1:
        return ranks["five_of_a_kind"]


def sort_hands(hand1: tuple[str, int], hand2: tuple[str, int]):
    rank1 = rank_hand(hand1[0])
    rank2 = rank_hand(hand2[0])
    if rank1 == rank2:
        for i in range(0, 5):
            card1 = card_values[hand1[0][i]]
            card2 = card_values[hand2[0][i]]
            if card1 < card2:
                return -1
            if card1 > card2:
                return 1
        return 0
    if rank1 < rank2:
        return -1
    if rank1 > rank2:
        return 1


def part_one(inputs: list[str]):
    hands = parse_hands(inputs)
    hands.sort(key=cmp_to_key(sort_hands))
    winnings = 0
    for rank, hand in enumerate(hands, start=1):
        winnings += rank * int(hand[1])
    return winnings


def part_two(inputs: list[str]):
    pass


def main():
    parser = argparse.ArgumentParser(description="Example Script")
    parser.add_argument("--test", action="store_true", help="Run on test input")
    args = parser.parse_args()
    test_mode = "test" if args.test else "full"
    print(f"Running day seven with {test_mode} inputs...")

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
