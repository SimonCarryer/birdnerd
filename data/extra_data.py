import json
import urllib.request
from bs4 import BeautifulSoup
from collections import defaultdict

categories = [
    ("At sea (or dead on a beach)", "http://nzbirdsonline.org.nz/birds/?q=node/10279"),
    ("Coastal", "http://nzbirdsonline.org.nz/birds/?q=node/10308"),
    (
        "Harbour, estuary or rivermouth",
        "http://nzbirdsonline.org.nz/birds/?q=node/10347",
    ),
    ("Lake, river or wetland", "http://nzbirdsonline.org.nz/birds/?q=node/10364"),
    ("Urban park or garden", "http://nzbirdsonline.org.nz/birds/?q=node/10377"),
    (
        "Farmland or horticultural block",
        "http://nzbirdsonline.org.nz/birds/?q=node/10326",
    ),
    (
        "Forest (native or plantation)",
        "http://nzbirdsonline.org.nz/birds/?q=node/10335",
    ),
    ("Mountain", "http://nzbirdsonline.org.nz/birds/?q=node/10264"),
    ("Chatham Islands (not at sea)", "http://nzbirdsonline.org.nz/birds/?q=node/10295"),
]

with open("bird_data.json", "r") as data_file:
    bird_data = json.loads(data_file.read())


def get_images(url):
    try:
        with urllib.request.urlopen(url, timeout=5) as response:
            html = response.read()
        soup = BeautifulSoup(html, "html.parser")
        return soup.find_all(class_="bird-species-image")
    except:
        return []


def is_species(image):
    return image["data-next"].split("/")[-2] == "species"


extra_data = defaultdict(set)
for category, url in categories:
    print(category)
    images = get_images(url)
    for image in images:
        if is_species(image):
            name = image["data-next"].split("/")[-1]
            extra_data[name].add(category)
        else:
            images = get_images(image["data-next"])
            for image in images:
                name = image["data-next"].split("/")[-1]
                extra_data[name].add(category)


birds = []
for bird in bird_data:
    name = bird["link"].split("/")[-1]
    bird["category"] = list(extra_data.get(name, []))
    birds.append(bird)
    print(name, category)

with open("final_bird_data.json", "w") as file_obj:
    file_obj.write(json.dumps(birds))
