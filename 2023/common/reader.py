def read_input(path):
    with open(path, 'r', encoding='utf-8') as file:
        lines = file.readlines()
        return [line.strip() for line in lines]