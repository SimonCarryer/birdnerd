import json
from collections import Counter

with open("final_bird_data.json", "r") as file_obj:
    bird_data = json.loads(file_obj.read())

new_birds = []
for bird in bird_data:
    new_bird = bird
    new_images = [
        image
        for image in bird["images"]
        if "egg" not in image["alt"].lower() and "clutch" not in image["alt"].lower()
    ]
    new_bird["images"] = new_images
    new_birds.append(new_bird)

print(len(new_birds))

with open("final_bird_data.json", "w") as file_obj:
    file_obj.write(json.dumps(new_birds))
