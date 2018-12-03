from flask import Blueprint, request, jsonify
from config import categories
from tools import crud, request_attributes
from pymongo import DESCENDING

blue = Blueprint('categories', __name__, url_prefix='/tags')
"""
ancestors: [
    {
        title:
        _id:
    }
]
"""
crud(blue, categories, skeleton={
    'title': '',
    'ancestors': [],
})


@blue.route('/sug/')
def suggest_categories(query, size):
    query = query if query else request_attributes(request, query=str)['query']
    size = size if size else request_attributes(request, size=int)['size']
    __categories = categories.find(
        {'$or':
            [
                {'$text': {'$search': query}},
                {'title': {'$regex': query}},
            ]
        },
        {"score": {
            "$meta": "textScore"
        }},
    ).sort([(
        "score", {
            "$meta": "textScore"
        }
    )]).limit(
        size
    )
    return __categories


@blue.route('/sug/')
def suggest_brands(query, size):
    query = query if query else request_attributes(request, query=str)['query']
    size = size if size else request_attributes(request, size=int)['size']
    __brands = brands.find(
        {'$or':
            [
                {'$text': {'$search': query}},
                {'title': {'$regex': query}},
            ]
        },
        {"score": {
            "$meta": "textScore"
        }},
    ).sort([(
        "score", {
            "$meta": "textScore"
        }
    )]).limit(
        size
    )
    return __brands



_keywords = {}
_max_length = 2


def add_keyword(key):
    if key not in _keywords:
        _keywords[key] = 1
    else:
        _keywords[key] += 1
    if len(_keywords) == _max_length:
        for key, hit in _keywords.items():
            try:
                result = keywords.find_and_modify(
                    {"title": key},
                    {"$inc": { "hit": hit }},
                )
                if not result:
                    raise
            except:
                keywords.insert_one({
                    "title": key,
                    "hit": 1,
                })
        _keywords.clear()


@blue.route('/sug/')
def suggest_keywords(query, size):
    query = query if query else request_attributes(request, query=str)['query']
    size = size if size else request_attributes(request, size=int)['size']
    __keywords = keywords.find(
        {'$or':
            [
                {'$text': {'$search': query}},
                {'title': {'$regex': query}},
            ]
        }
    ).sort(
        'hit', DESCENDING
    ).limit(
        size
    )
    return __keywords