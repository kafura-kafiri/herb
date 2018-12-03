import requests
url = 'http://localhost:5000/categories/'
headers = {'content-type': 'application/json'}

_categories = [
    {
        'ancestors': ['a', 'b', 'c'],
        'title': 'd'
    }, {
        'ancestors': ['x', 'y'],
        'title': 'z'
    }
]


def fill():
    requests.post(url + '*')
    print()
    print('categories >>')
    for category in _categories:
        response = requests.post(url + '+', data={'json': str(category)})
        print(response.content)