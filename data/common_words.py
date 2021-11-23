import json
from collections import Counter

with open("final_bird_data.json", "r") as file_obj:
    bird_data = json.loads(file_obj.read())

common_words = [
    "island",
    "new",
    "zealand",
    "common",
    "european",
    "southern",
    "south",
    "north",
    "chatham",
    "sunday",
    "australasian",
    "auckland",
    "australian",
]

birds = []
for bird in bird_data:
    other_names = bird.get("other_names", [])
    new_names = [
        " ".join([n for n in name.lower().split() if n not in common_words])
        for name in other_names
        if any(n in common_words for n in name.lower().split())
    ]
    extra_name = " ".join(
        [n for n in bird["name"].lower().split() if n not in common_words]
    )
    bird["other_names"] = other_names + new_names + [extra_name]
    birds.append(bird)

with open("final_bird_data.json", "w") as file_obj:
    file_obj.write(json.dumps(birds))
