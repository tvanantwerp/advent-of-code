def read_input(path):
    with open(path, 'r', encoding='utf-8') as file:
        lines = file.readlines()
        return [line for line in lines]