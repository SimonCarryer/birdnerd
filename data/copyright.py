import json

with open("final_bird_data.json", "r") as file_obj:
    bird_data = json.loads(file_obj.read())

new = []
for bird in bird_data:
    new_images = []
    for image in bird["images"]:
        final = image["alt"][image["alt"].index("&copy; ") + 7 :]
        if "by" in final:
            final = final[: final.index(" by")]
        if "(" in final:
            final = final[: final.index("(")]
        image["copyright"] = final.strip()
        new_images.append(image)
    bird["images"] = new_images
    new.append(bird)

with open("final_bird_data.json", "w") as file_object:
    file_object.write(json.dumps(new))
