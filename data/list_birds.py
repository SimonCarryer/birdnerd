import json

with open("data/final_bird_data.json", "r") as data_file:
    bird_data = json.loads(data_file.read())


for bird in bird_data:
    print(bird["name"])