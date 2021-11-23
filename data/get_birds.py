import urllib.request
from bs4 import BeautifulSoup
import json


def parse_result(result):
    return {
        "link": result.h3.contents[0]["href"],
        "name": result.h3.contents[0].text,
        "status": result.find(class_="search-result-status").text[21:],
    }


birds = []
for page_number in range(0, 49):
    url = f"https://nzbirdsonline.org.nz/name-search?title=&field_other_names_value=&field_search_scientific_name_value=&page={page_number}"

    with urllib.request.urlopen(url) as response:
        html = response.read()

    soup = BeautifulSoup(html, "html.parser")

    results = soup.find_all(class_="search-result-text")

    for result in results:
        birds.append(parse_result(result))

    print(page_number)

with open("birds.json", "w") as file_obj:
    file_obj.write(json.dumps(birds))
