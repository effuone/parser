import requests
from bs4 import BeautifulSoup as soup
import os

def imagedown(url, index, img_url):
        img_data = requests.get(img_url).content
        with open((str(index) + '.jpg'), 'wb') as handler:
            handler.write(img_data)

url = 'https://yummyanime.org'

all_urls = []
all_urls.append(url)
for i in range(273):
    all_urls.append(url + f"/page/{i}/")

for i in range(len(all_urls)):
    all_links = []
    r = requests.get(url)
    soup_page = soup(r.text, 'html.parser')
    images = soup_page.find_all('div', ('class', "poster__img img-responsive img-responsive--portrait img-fit-cover js-show-info"))

    for i in range(len(images)):
        img_link = url + str(images[i]).split('src="')[1].split('\"')[0]
        all_links.append(img_link)

    folder = 'images'
    try:
        os.mkdir(os.path.join(os.getcwd(), folder))
    except:
        pass
    os.chdir(os.path.join(os.getcwd(), folder))

    for i in range(len(all_links)):
        print(f"{i}: {all_links[i]}")
        imagedown('https://yummyanime.org/', str(i), all_links[i])

