import requests
import json

url = 'http://localhost:5000/hows/'

headers = {'content-type': 'application/json'}
from crud.how.instance import how
hows = [
    how, how, how
]

hows[0]['meta']['title'] = 'اسمت چی چیه؟ استادیوم چمنه'
hows[0]['meta']['title'] = 'نه نمیشه از تو دس کشیدو'
hows[0]['meta']['title'] = 'با دلم میکنی بازی با اون دیوونه بازی'


def fill():
    response = requests.post(url + '*')
    print()
    print(response.content)
    print('hows >>')
    for how in hows:
        response = requests.post(url + '+', data={'json': str(how)})
        print(response.content)


def show_one():
    from config import hows as collection
    import json
    how = collection.find_one()
    from utility import obj2str
    how = obj2str(how)
    print(json.dumps(how, indent=3))

