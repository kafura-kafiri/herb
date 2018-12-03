import requests

url = 'http://localhost:5000/users/'

headers = {'content-type': 'application/json'}

users = [
    {
        'phone': '+989104961290',
        'first_name': 'masoud',
        'last_name': 'shakeri',
        'password': 'sh',
        'username': 'masoud',
        'email': 'shakeri.masoud@gmail.com',
        'wish_list': {
            'products': {},
            'hows': [],
        },
        'notifications': [],
        'page': {
            'title': '',
            'rank': 0,
            'img': '',
            'description': ''
        },
    },    {
        'phone': '+989104961290',
        'first_name': 'pouria',
        'last_name': 'sharifi',
        'password': 'sh',
        'username': 'pouria',
        'email': 'kafura.kafiri@gmail.com',
        'wish_list': {
            'products': {},
            'hows': [],
        },
        'notifications': [],
        'page': {
            'title': '',
            'rank': 0,
            'img': '',
            'description': ''
        },
    },     {
        'phone': '+989104961290',
        'first_name': 'ali',
        'last_name': 'sharifi',
        'password': 'sh',
        'username': 'ali',
        'email': 'ali.sharifi@gmail.com',
        'wish_list': {
            'products': {},
            'hows': [],
        },
        'notifications': [],
        'page': {
            'title': '',
            'rank': 0,
            'img': '',
            'description': ''
        },
    },     {
        'phone': '+989104961290',
        'first_name': 'admin',
        'last_name': 'admin',
        'password': 'admin',
        'username': 'admin',
        'email': 'admin@gmail.com',
        'wish_list': {
            'products': {},
            'hows': [],
        },
        'notifications': ['ba delam mikoni bazi', 'bepa nabazi', 'bia ta barat bekhunam'],
        'page': {
            'title': '',
            'rank': 0,
            'img': '',
            'description': ''
        },
    },
]


def fill():
    response = requests.post(url + '*')
    print()
    print(response.content)
    print('users >>')
    for user in users:
        response = requests.post(url + '+', data={'json': str(user)})
        print(response.content)

fill()