import json
import urllib.request
from bs4 import BeautifulSoup


with open("birds.json", "r") as bird_file:
    birds = json.loads(bird_file.read())

print(len(birds))
birds = [
    bird
    for bird in birds
    if bird["status"]
    not in ("Extinct", "Vagrant", "Coloniser", "Introduced, not established")
]
print(len(birds))

bird_data = []
for bird in birds:
    url = f"https://nzbirdsonline.org.nz{bird['link']}"
    with urllib.request.urlopen(url) as response:
        html = response.read()
    soup = BeautifulSoup(html, "html.parser")
    sounds = soup.find_all(class_="bird-sound")
    sound_files = [sound.a["data-file"] for sound in sounds]
    images = soup.find(class_="sidebar-images").find_all("a")
    image_files = [
        {"href": image["href"], "alt": image["data-fresco-caption"]} for image in images
    ]
    other_names = soup.find_all(class_="bird-header-info")[-2].p
    if other_names:
        bird["other_names"] = other_names.text[13:].split(", ")
    bird["images"] = image_files
    bird["sounds"] = sound_files
    bird_data.append(bird)


with open("bird_data.json", "w") as file_obj:
    file_obj.write(json.dumps(bird_data))
