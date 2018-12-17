from gridfs import GridFS
from pymongo import MongoClient
from flask import jsonify
import demjson


def configure(app):
    app.config['DEBUG'] = True
    app.config['SECRET_KEY'] = 'very secret key'
    app.config['TESTING'] = True

    from tools.trans import trans, update
    update()
    app.jinja_env.globals.update(_=trans)
    app.jinja_env.globals.update(loads=lambda x: demjson.decode(x, encoding='utf8'))
    import html
    app.jinja_env.globals.update(unescape=lambda x: html.unescape(x))

    @app.after_request
    def after_request(response):
        response.headers.add('Accept-Ranges', 'bytes')
        return response

    @app.route('/__api__')
    def __api__():
        l = []
        for key in app.url_map.iter_rules():
            l.append(str(key))
        return jsonify(sorted(l))


client = MongoClient(unicode_decode_error_handler='ignore')
db_name = 'herb'
db = client[db_name]
fs = GridFS(client[db_name + '_FS'])

users = db['USERS']
users.create_index([('username', 1)], unique=True, sparse=True)
users.create_index([('email', 1)], unique=True, sparse=True)

products = db['PRODUCTS']
products.drop_indexes()
products.create_index([("$**", "text")], weights={"$**": 1, "title": 3})
products.create_index([("title", 1)])
pr = products

hybrids = db['HYBRIDS']

hows = db['HOWS']
hows.drop_indexes()
hows.create_index([("$**", "text")], weights={"$**": 1, "title": 3})
hows.create_index([("title", 1)])

users = db['USERS']

keywords = db['KEYWORDS']
keywords.drop_indexes()
keywords.create_index([("title", "text")])
keywords.create_index([("title", 1)])

brands = db['BRANDS']
brands.drop_indexes()
brands.create_index([("title", "text")])
brands.create_index([("title", 1)])

categories = db['CATEGORIES']
categories.drop_indexes()
categories.create_index([("title", "text")])
categories.create_index([("title", 1)])

topics = db['TOPICS']

pages = db['PAGES']

orders = db['ORDERS']

analytics = db['ANALYTICS']

states = db['STATES']
states.drop_indexes()
# states.create_index([('reviews.type', 1)], sparse=True)
states.create_index([('reviews._author', 1), ('reviews.type', 1)], sparse=True)

places = db['PLACES']
places.drop_indexes()
places.create_index([('description', 'text'), ('description', 1)])
places.create_index([('place_id', 1)])  # , sparce=True)
places.create_index([('id', 1)])  # , sparce=True)
places.create_index([('location', '2d')])
places.create_index([('location', '2dsphere')])

tags = db['TAGS']
tags.drop_indexes()
tags.create_index([("$**", "text")], weights={"$**": 1, "title": 3})
tags.create_index([("title", 1)])
tags_buffer = []
tags_buffer_capacity = 1

faces = db['FACES']

symlinks = db['SYMLINKS']
from tools.symlink import boot as boot_symlink
boot_symlink()
