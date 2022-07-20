import requests
from bs4 import BeautifulSoup as soup
import os

def imagedown(url, index, img_url):
        img_data = requests.get(img_url).content
        with open((str(index) + '.jpg'), 'wb') as handler:
            handler.write(img_data)

url = 'https://hdi.zetfix.online/skam/'

all_urls = []
all_urls.append(url)

page_counter = 2
for i in range(1):
    all_urls.append(url + f"/page/{page_counter}/")
    page_counter=page_counter+1
    print(all_urls[i])

base_url = 'https://hdi.zetfix.online'

counter = 1

folder = 'images'
try:
    os.mkdir(os.path.join(os.getcwd(), folder))
except:
    pass
os.chdir(os.path.join(os.getcwd(), folder))

for i in range(1):
    r = requests.get(all_urls[i])
    soup_page = soup(r.text, 'html.parser')
    images = soup_page.find_all('a', ('class', "vi-img img-resp-h"))
    
    img_url_store = []

    for j in range(len(images)):
        img_url = str(images[j]).split('img')[3].split('src="')[1].split('"')[0]
        img_url_store.append(base_url + img_url)

    folder = 'images'

    for j in range(len(img_url_store)):
        print(f"{counter}: {img_url_store[j]}")
        counter = counter + 1
        imagedown(all_urls[i], str(counter), img_url_store[j])

