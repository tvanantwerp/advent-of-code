from os import path
import argparse
import re
from typing import Any
from math import gcd
from common.reader import read_input

current_dir = path.dirname(__file__)
test1_path = path.join(current_dir, "test1.txt")
test2_path = path.join(current_dir, "test2.txt")
test3_path = path.join(current_dir, "test3.txt")
file_path = path.join(current_dir, "input.txt")


def parse_inputs(inputs: list[str]):
    parsed_inputs: dict[str, Any] = {"directions": [], "graph": {}}
    parsed_inputs["directions"] = [*inputs[0]]
    for line in inputs[2:]:
        node_values = re.findall(r"\w+", line)
        parsed_inputs["graph"][node_values[0]] = {
            "left": node_values[1],
            "right": node_values[2],
        }
    return parsed_inputs


def part_one(inputs: list[str]):
    parsed_inputs = parse_inputs(inputs)
    current_node = "AAA"
    steps = 0
    while current_node != "ZZZ":
        for direction in parsed_inputs["directions"]:
            steps += 1
            if direction == "L":
                current_node = parsed_inputs["graph"][current_node]["left"]
            elif direction == "R":
                current_node = parsed_inputs["graph"][current_node]["right"]
            if current_node == "ZZZ":
                break
    return steps


def part_two(inputs: list[str]):
    parsed_inputs = parse_inputs(inputs)
    starting_nodes = []
    for key in parsed_inputs["graph"].keys():
        if key.endswith("A"):
            starting_nodes.append(key)
    node_steps: dict[str, int] = {}
    for node in starting_nodes:
        current_node = node
        steps = 0
        while not current_node.endswith("Z"):
            for direction in parsed_inputs["directions"]:
                steps += 1
                if direction == "L":
                    current_node = parsed_inputs["graph"][current_node]["left"]
                elif direction == "R":
                    current_node = parsed_inputs["graph"][current_node]["right"]
                if current_node.endswith("Z"):
                    break
        node_steps[node] = steps
    steps = 1
    for s in node_steps.values():
        steps = steps * s // gcd(steps, s)
    return steps


def main():
    parser = argparse.ArgumentParser(description="Example Script")
    parser.add_argument("--test", action="store_true", help="Run on test input")
    args = parser.parse_args()
    test_mode = "test" if args.test else "full"
    print(f"Running day eight with {test_mode} inputs...")

    if args.test:
        puzzle_test1_input = read_input(test1_path)
        puzzle_test2_input = read_input(test2_path)
        puzzle_test3_input = read_input(test3_path)
        print(part_one(puzzle_test1_input))
        print(part_one(puzzle_test2_input))
        print(part_two(puzzle_test3_input))
    else:
        puzzle_input = read_input(file_path)
        print(part_one(puzzle_input))
        print(part_two(puzzle_input))


if __name__ == "__main__":
    main()
