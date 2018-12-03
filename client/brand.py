import requests
url = 'http://localhost:5000/brands/'
headers = {'content-type': 'application/json'}

_brands = [
    {
        'title': 'ahsham',
        'link': 'www.ahsham.ir'
    }, {
        'title': 'apple',
        'link': 'www.apple.com',
    }
]


def fill():
    requests.post(url + '*')
    print()
    print('brands >>')
    for brand in _brands:
        response = requests.post(url + '+', data={'json': str(brand)})
        print(response.content)