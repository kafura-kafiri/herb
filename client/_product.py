import requests
import json

url = 'http://localhost:5000/pr/'

headers = {'content-type': 'application/json'}
from product import pr
prs = [
    pr, pr, pr
]

prs[0]['title'] = 'یه آدم عجیب عوض کرده منو'
prs[1]['title'] = 'رفت دل من رفت مگه از دست نگاهت میشه در رفت'
prs[2]['title'] = 'با دلم میکنی بازی با اون دیوونه بازی'


def fill():
    response = requests.post(url + '*')
    print()
    print('products: >>')
    for pr in prs:
        response = requests.post(url + '+', data={'json': str(pr)})
        print(response.content)


if __name__ == '__main__':
    fill()