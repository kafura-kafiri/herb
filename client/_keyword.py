import requests
url = 'http://localhost:5000/keywords/'
headers = {'content-type': 'application/json'}

_keywords = [
    {
        'title': 're',
        'hit': 2,
    }, {
        'title': 'apple',
        'hit': 0,
    }
]


def fill():
    response = requests.post(url + '*')
    print()
    print(response.content)
    print('keywords >>')
    for keyword in _keywords:
        response = requests.post(url + '+', data={'json': str(keyword)})
        print(response.content)