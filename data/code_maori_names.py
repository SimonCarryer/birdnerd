import json

with open("final_bird_data.json", "r") as file_obj:
    bird_data = json.loads(file_obj.read())

with open("maori_name_lookup.json", "r") as file_obj:
    lookup = json.loads(file_obj.read())

try:
    for bird in bird_data:
        if bird["name"] not in lookup.keys():
            print(f"\n***{bird['name']}***")
            for idx, name in enumerate(bird.get("other_names", [])):
                print(idx + 1, name)
            selected = int(input())
            if selected == 0:
                maori_name = None
            else:
                maori_name = bird.get("other_names", [])[selected - 1]
            lookup[bird["name"]] = maori_name
finally:
    with open("maori_name_lookup.json", "w") as file_object:
        file_object.write(json.dumps(lookup))
