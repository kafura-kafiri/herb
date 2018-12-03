from config import analytics, products
from flask import Blueprint, request, jsonify
from flask_login import current_user
from functools import wraps
from datetime import datetime
from bson import ObjectId
from tools import obj2str


def analyze(func):
    @wraps(func)
    def inner(*args,**kwargs):
        response = func(*args, **kwargs)
        print(type(response))
        if isinstance(response, str):
            try:
                collection, action = str(request.url_rule).split('/<_id>')
                collection = collection[1:]
                document = str(request.path)[len(collection) + 2:len(collection) + 2 + 24]
                _analyze(collection, document, action)
            except: pass
            return response
        else:
            return response
    return inner


def _analyze(collection, document, action):
    _document = {
        'collection': collection,
        'document': ObjectId(document),
        'action': action,
        'date': datetime.now(),
        'order': analytics.count(),
    }
    if current_user.is_authenticated:
        _document['user'] = current_user._id
    analytics.insert_one(_document)


def show_trending():
    from product import projection
    _products = products.aggregate(
        [{ '$sample': {'size': 20}},  {'$project': projection}]
    )
    _products = [obj2str(_product) for _product in _products]
    return _products


def crud():
    blue = Blueprint('analytics', __name__,template_folder='templates')
    from tools import crud
    crud(blue, analytics)

    jump_back = 5 - 1

    @blue.route('/live/', methods=['GET', 'POST'])
    @blue.route('/live/<int:limit>', methods=['GET', 'POST'])
    @blue.route('/live/<int:limit>/<int:skip>', methods=['GET', 'POST'])
    def live(limit=5, skip=None):
        if not skip:
            skip = analytics.count() - jump_back
        documents = analytics.find({'order': {"$gte": skip, "$lt": skip + limit}})
        documents = [obj2str(document) for document in documents]
        _documents = {}
        for document in documents:
            if document['collection'] not in _documents:
                _documents[document['collection']] = []
            _documents[document['collection']].append(ObjectId(document['document']))
        for _collection, _ids in _documents.items():
            from importlib import import_module
            mod = import_module('config')
            collection = getattr(mod, _collection)
            list_of_documents = collection.find({'_id': {"$in": _ids}})
            doc_dict = {}
            for d in list_of_documents:
                doc_dict[d['_id']] = d
            _documents[_collection] = [doc_dict[d] for d in _documents[_collection]]
        _list = []
        for collection_name, collection_set in _documents.items():
            _list.extend(collection_set)
        _list = {
            'list': [obj2str(d) for d in _list]
            ,
            'analytic_order': skip + limit
        }
        return jsonify(_list)

    trending = {}
    @blue.route('/trending/*')
    def clear_trending():
        trending.clear()
        return "['success', 200]", 200

    @blue.route('/trending/<_id>+')
    def insert_trending(_id):
        trending[_id] = True
        return "['success', 200]", 200

    @blue.route('/trending/-')
    def get_trending():
        return jsonify(show_trending())

    return blue