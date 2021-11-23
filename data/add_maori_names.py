import json

with open("final_bird_data.json", "r") as file_obj:
    bird_data = json.loads(file_obj.read())

with open("maori_name_lookup.json", "r") as file_obj:
    name_lookup = json.loads(file_obj.read())

birds = []
for bird in bird_data:
    if name_lookup.get(bird["name"], None):
        bird["maori_name"] = name_lookup[bird["name"]]
    birds.append(bird)

with open("final_bird_data.json", "w") as file_obj:
    file_obj.write(json.dumps(birds))
