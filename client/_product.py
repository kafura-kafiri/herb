import requests
import json
from product import pr

url = 'http://localhost:5000/pr/'

headers = {'content-type': 'application/json'}


if __name__ == '__main__':
    response = requests.post(url + '*')
    print('products: >>')
    with open('herbs.json') as f:
        herbs = json.loads(f.read())
        for herb in herbs:
            pr['title'] = herb['title']
            pr['img'] = [herb['raw_img']]
            pr['hybrid'] = {
                'title': herb['title'],
                'img': herb['img'],
                'img_x': herb['img_x']
            }
            response = requests.post(url + '+', data={'json': str(pr)})
            print(response.content)
